// Abstract factory
interface UIElementsFactory {
  createGraph(): Graph;
  createTable(): Table;
}

// Concrete factories
class WinUIElementsFactory implements UIElementsFactory {
  public createGraph(): Graph {
    return new WinGraph();
  }

  public createTable(): Table {
    return new WinTable();
  }
}

class MacUIElementsFactory implements UIElementsFactory {
  public createGraph(): Graph {
    return new MacGraph();
  }

  public createTable(): Table {
    return new MacTable();
  }
}

// Abstract UI Elements
interface Graph {
  plot(): string;
}

interface Table {
  render(): string;
}

// Concrete UI Elements
class WinGraph implements Graph {
  public plot() {
    return 'Plot Win Graph';
  }
}

class WinTable implements Table {
  public render() {
    return 'Render Win Table';
  }
}

class MacGraph implements Graph {
  public plot() {
    return 'Plot Mac Graph';
  }
}

class MacTable implements Table {
  public render() {
    return 'Render Mac Table';
  }
}

// App code
function app(uiElementsFactory: UIElementsFactory) {
  const graph = uiElementsFactory.createGraph();
  const table = uiElementsFactory.createTable();

  console.log(graph.plot());
  console.log(table.render());
}

console.log('App: Lauched with Win Elements');
app(new WinUIElementsFactory());
console.log('------------------------------');
console.log('App: Lauched with Mac Elements');
app(new MacUIElementsFactory());
