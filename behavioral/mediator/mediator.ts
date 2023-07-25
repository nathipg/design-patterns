interface IEvent {
  action: string;
  data?: unknown;
  origin?: Component;
}

interface IMediator {
  notify(event: IEvent): void;
}

interface IComponentProps {
  mediator?: IMediator;
}

abstract class Component {
  children: Component[] = [];
  mediator?: IMediator;

  constructor(mediator?: IMediator) {
    this.mediator = mediator;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }
  
  abstract render(): HTMLElement;
}

interface IDOMElementProps {
  tag: string;
  children?: (HTMLElement | string)[];
  [key: string]: unknown;
}

class DOMElement {
  static get(props: IDOMElementProps): HTMLElement {
    const { tag, children, ...otherAttributes } = props;

    const el = document.createElement(tag);
    children && (el.append(...children));

    Object.keys(otherAttributes).forEach(attr => {
      el[attr] = otherAttributes[attr];
    });

    return el;
  }
}

interface IListProps extends IComponentProps {
  name: string;
  items: string[];
}

class List extends Component {
  name: string;
  value: string = '';
  items: string[];

  constructor(props: IListProps) {
    const { items, mediator, name } = props;

    super(mediator);

    this.name = name;
    this.items = items;
  }

  addItem(item: string) {
    item && this.items.indexOf(item) === -1 && this.items.push(item);
  }

  render() {
    const title = DOMElement.get({
      tag: 'span',
      className: 'title',
      children: [this.name],
    });

    const items = this.items.map(item => {
      const itemId = item.toLowerCase().replace(/\s/, '-');

      const radio = DOMElement.get({
        tag: 'input',
        type: 'radio',
        name: this.name,
        id: itemId
      }) as HTMLInputElement;

      radio.addEventListener('click', (event) => {
        this.value = (event.target as HTMLInputElement).nextSibling?.textContent || '';
        this.mediator?.notify({
          action: 'click.ListRadio',
        });
      });

      radio.checked = this.value === item;

      return DOMElement.get({
        tag: 'div',
        className: 'group',
        children: [
          radio,
          DOMElement.get({
            tag: 'label',
            htmlFor: itemId,
            children: [
              item,
            ],
          }),
        ],
      });
    });

    return DOMElement.get({
      tag: 'div',
      className: 'list',
      children: [
        title,
        ...items,
      ],
    });
  }
}

interface IButtonProps extends IComponentProps {
  text: string;
}

class Button extends Component {
  text: string;

  constructor(props: IButtonProps) {
    const { mediator, text } = props;

    super(mediator);

    this.text = text;
  }

  render() {
    const button = DOMElement.get({
      tag: 'button',
      children: [
        this.text,
      ],
    });

    button.addEventListener('click', (event) => this.mediator?.notify({
      action: `click.${this.text.replace(/\s/, '')}`,
      origin: this,
    }));

    return button;
  }
}

interface IInputProps extends IComponentProps {
  name: string;
  value?: string;
}

class Input extends Component {
  name: string;
  value: string;

  constructor(props: IInputProps) {
    const { mediator, name, value = '' } = props;

    super(mediator);

    this.name = name;
    this.value = value;
  }

  render(): HTMLElement {
    const input = DOMElement.get({
      tag: 'input',
      type: 'text',
      name: this.name,
      value: this.value,
    });

    input.addEventListener('change', (event) => {
      this.value = (event.target as HTMLInputElement).value;
    });

    return input;
  }
}

interface IDisplayProps extends IComponentProps {
  text: string;
}

class Display extends Component {
  text: string;

  constructor(props: IDisplayProps) {
    const { mediator, text } = props;

    super(mediator);

    this.text = text;
  }

  render() {
    return DOMElement.get({
      tag: 'div',
      className: 'display',
      children: [
        this.text,
      ],
    });
  }
}

abstract class PageComponent extends Component {
  constructor() {
    super();
    this.addRenderListener();
    this.pageRender();
  }

  addRenderListener() {
    const body = document.querySelector('body');
    body?.addEventListener('pageRender', (event) => {
      // @ts-ignore
      const page = event.detail.page;
      body.innerHTML = '';
      body.append(page.render());
    });
  }

  pageRender() {
    const body = document.querySelector('body');

    body?.dispatchEvent(new CustomEvent('pageRender', {
      detail: {
        page: this,
      },
    }));
  }

  addChild(child: Component) {
    child.setMediator(this);
    this.children.push(child);
    this.pageRender();
  }

}

class Page extends PageComponent implements IMediator {
  list: List;
  input: Input;
  button: Button;
  display: Display;

  setList(list: List) {
    this.list = list;
    this.addChild(list);
  }

  setInput(input: Input) {
    this.input = input;
    this.addChild(input);
  }

  setButton(button: Button) {
    this.button = button;
    this.addChild(button);
  }

  setDisplay(display: Display) {
    this.display = display;
    this.addChild(display);
  }

  notify(event: IEvent): void {
    if(event.action === 'click.AddItem') {
      this.list.addItem(this.input.value);
      this.input.value = '';
    }

    if(event.action === 'click.ListRadio') {
      this.display.text = `Selected item: ${this.list.value}`;
    }

    this.pageRender();
  }

  render() {
    return DOMElement.get({
      tag: 'div',
      children: [...this.children.map(child => child.render())],
    });
  }
}

const page = new Page();

const list = new List({
  items: ['Item 1', 'Item 2'], 
  name: 'List',
});
const button = new Button({
  text: 'Add Item'
});
const input = new Input({
  name: 'add-item',
});
const display = new Display({
  text: 'No item selected'
});

page.setList(list);
page.setInput(input);
page.setButton(button);
page.setDisplay(display);
