enum EElementCategory {
  input = 'input',
  select = 'select',
}

enum EFieldElementType {
  text = 'text',
}

enum EFieldType {
  text = 'text',
  select = 'select',
}

interface IFieldBuilder {
  setType(type: EFieldType): void;
  setName(name: string): void;
  setRequirement(required: boolean): void;
  setOptions(options: string[]): void;
  getField(): HTMLInputElement | HTMLSelectElement;
}

class Field {
  public type: EFieldType = EFieldType.text;
  public name: string = '';
  public required: boolean = false;
  public options: string[] = [];

  public setType(type: EFieldType) {
    this.type = type;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setRequirement(required: boolean) {
    this.required = required;
  }

  public setOptions(options: string[]) {
    this.options = options;
  }
}

class FieldBuilder implements IFieldBuilder {
  private field: Field;

  constructor() {
    this.field = new Field();
  }

  public setType(type: EFieldType): void {
    this.field.setType(type);
  }

  public setName(name: string): void {
    this.field.setName(name);
  }

  public setRequirement(required: boolean): void {
    this.field.setRequirement(required);
  }

  public setOptions(options: string[]): void {
    this.field.setOptions(options);
  }

  public getField(): HTMLInputElement | HTMLSelectElement {
    const { name, options, required, type } = this.field;

    const elementCategory = type === EFieldType.select ? EElementCategory.select : EElementCategory.input;

    const element = document.createElement(elementCategory);

    if(elementCategory === EElementCategory.input) {
      element.setAttribute('type', type ?? EFieldElementType.text);
    }

    if(elementCategory === EElementCategory.select) {
      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', option);
        optionElement.text = option;
        element.appendChild(optionElement);
      });
    }

    element.setAttribute('name', name);
    element.setAttribute('required', `${required}`);
    
    element.toString = () => {
      const optionsText = options.length ? `options: ${options.map(option => option).join(', ')};` : '';
      return `[${elementCategory}] name: ${name}; type: ${type}; required: ${required}; ${optionsText}`;
    };

    return element;
  }
}

interface IBuildInputParams {
  name: string;
  required?: boolean;
}

interface IBuildSelectParams {
  name: string;
  required?: boolean;
  options?: string[];
}

class FieldDirector {
  private builder: IFieldBuilder;

  constructor(builder: IFieldBuilder) {
    this.builder = builder;
  }

  public buildInput(params: IBuildInputParams) {
    const { name, required = false } = params;

    this.builder.setName(name);
    this.builder.setType(EFieldType.text);
    this.builder.setRequirement(required);

    return this.builder.getField();
  }

  public buildSelect(params: IBuildSelectParams) {
    const { name, required = false, options = [] } = params;

    this.builder.setName(name);
    this.builder.setType(EFieldType.select);
    this.builder.setRequirement(required);
    this.builder.setOptions(options);

    return this.builder.getField();
  }
}

const fieldDirector = new FieldDirector(new FieldBuilder());

const input = fieldDirector.buildInput({ name: 'input-name' });
const select = fieldDirector.buildSelect({ name: 'select-name', options: ['opt1', 'opt2'] });

console.log(input.toString());
console.log(select.toString());
