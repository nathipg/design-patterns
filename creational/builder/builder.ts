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
  addType(type: EFieldType): IFieldBuilder;
  addName(name: string): IFieldBuilder;
  addOptions(options: string[]): IFieldBuilder;
  build(): HTMLInputElement | HTMLSelectElement;
}

class Field {
  public type: EFieldType = EFieldType.text;
  public name: string = '';
  public options: string[] = [];

  public setType(type: EFieldType) {
    this.type = type;
  }

  public setName(name: string) {
    this.name = name;
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

  public addType(type: EFieldType): IFieldBuilder {
    this.field.setType(type);
    return this;
  }

  public addName(name: string): IFieldBuilder {
    this.field.setName(name);
    return this;
  }

  public addOptions(options: string[]): IFieldBuilder {
    this.field.setOptions(options);
    return this;
  }

  public build(): HTMLInputElement | HTMLSelectElement {
    const { name, options, type } = this.field;

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

    return element;
  }
}

const fieldBuilder = new FieldBuilder();

const input = fieldBuilder
  .addName('input-name')
  .addType(EFieldType.text)
  .build();

const fieldBuilder2 = new FieldBuilder();

const select = fieldBuilder2
  .addName('select-name')
  .addType(EFieldType.select)
  .addOptions(['opt1', 'opt2'])
  .build();
