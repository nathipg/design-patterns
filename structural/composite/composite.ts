enum NumberType {
  ALL = 'ALL',
  ODD = 'ODD',
  EVEN = 'EVEN',
}

abstract class SelectableItem {
  protected selected: boolean = false;
  protected label: string;
  protected id: number;

  constructor(label: string) {
    this.label = label;
  }

  public getLabel() {
    return this.label;
  }

  public getId(): number {
    return this.id;
  }

  public setSelected(selected: boolean) {
    this.selected = selected;
  }

  public isSelected() {
    return this.selected;
  }

  public isComposite() {
    return false;
  }

  public getText(item: SelectableItem, lvl = 0): string {
    const selected = item.isSelected() ? '[X] ' : '[ ] ';
    const itemSelection = item.isComposite() ? '' : selected;
    const id = item.isComposite() ? '' : ` [ID: ${this.getId()}]`;
    const prefix = Array(lvl * 2)
      .fill(' ')
      .join('');

    return `${prefix}${itemSelection}${item.getLabel()}${id}`;
  }

  public abstract getValue(): number[];
}

class SelectItem extends SelectableItem {
  constructor(label: string, id: number) {
    super(label);

    this.id = id;
  }

  public getValue(): number[] {
    return this.isSelected() ? [this.id] : [];
  }
}

class GroupSelectItem extends SelectableItem {
  private children: SelectableItem[] = [];

  public isComposite() {
    return true;
  }

  public addChild(child: SelectableItem) {
    this.children.push(child);
  }

  public getValue(): number[] {
    // child => child.getValue()
    const selectedChildrenId = this.children.reduce<number[]>(
      (allIds, child) => [...allIds, ...child.getValue()],
      []
    );

    return selectedChildrenId;
  }

  public getChildren() {
    return this.children;
  }
}

class SelectTreeBuilder {
  private tree: GroupSelectItem;
  private id: number = 0;
  private activeGroup: GroupSelectItem;

  constructor() {
    this.tree = new GroupSelectItem('');
    this.activeGroup = this.tree;
  }

  private getNewItem(label: string, group: boolean) {
    return group
      ? new GroupSelectItem(label)
      : new SelectItem(label, ++this.id);
  }

  private add(container: GroupSelectItem, label: string, group: boolean) {
    const newItem = this.getNewItem(label, group);
    container.addChild(newItem);

    if (newItem.isComposite()) {
      this.activeGroup = newItem as GroupSelectItem;
    }
  }

  public addRootItem(label: string, group: boolean = false): SelectTreeBuilder {
    this.add(this.tree, label, group);

    return this;
  }

  public addItem(label: string, group: boolean = false): SelectTreeBuilder {
    this.add(this.activeGroup, label, group);

    return this;
  }

  public build() {
    return this.tree;
  }
}

const treeIterator = function* (tree: GroupSelectItem) {
  const helper = function* (tree: GroupSelectItem, lvl = 0) {
    for (const child of tree.getChildren()) {
      yield child.getText(child, lvl);

      if (child.isComposite()) {
        yield* helper(child as GroupSelectItem, lvl + 1);
      }
    }
  };

  return yield* helper(tree);
};

const selectItemsFilter = (id: number, numberType: NumberType) => {
  if (numberType === NumberType.ODD) {
    return id % 2 !== 0;
  }

  if (numberType === NumberType.EVEN) {
    return id % 2 === 0;
  }

  return true;
};

const selectItems = (
  tree: GroupSelectItem,
  numberType: NumberType = NumberType.ALL
) => {
  tree.getChildren().forEach((child) => {
    if (child.isComposite()) {
      selectItems(child as GroupSelectItem, numberType);
      return;
    }

    const selected = selectItemsFilter(
      (child as SelectItem).getId(),
      numberType
    );

    child.setSelected(selected);
  });
};

const selectTreeBuilder = new SelectTreeBuilder();

selectTreeBuilder
  .addRootItem('Group 1', true)
  .addItem('Item 1.1')
  .addItem('Item 1.2')
  .addItem('Item 1.3')
  .addItem('Item 1.4')
  .addItem('Group 1.5', true)
  .addItem('Item 1.5.1')
  .addRootItem('Item 1')
  .addRootItem('Group 2', true)
  .addItem('Item 2.1')
  .addItem('Item 2.2');

const selectTree = selectTreeBuilder.build();

selectItems(selectTree, NumberType.EVEN);

for (let item of treeIterator(selectTree)) {
  console.log(item);
}

console.log(selectTree.getValue());
