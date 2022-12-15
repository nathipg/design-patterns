// Abstract creator
abstract class GraphCreator {
  public abstract factoryMethod(data: any[]): Graph;

  public render(data: any[]): string {
    const graph = this.factoryMethod(data);
    return `Creator: ${graph.print()}`;
  }
}

// Concrete creators
class PieGraphCreator extends GraphCreator {
  public factoryMethod(data: []): Graph {
      return new PieGraph(data);
  }
}

class BarGraphCreator extends GraphCreator {
  public factoryMethod(data: []): Graph {
      return new BarGraph(data);
  }
}

// Graph interface
interface Graph {
  print(): string;
}

// Concrete graphs
class PieGraph implements Graph {
  constructor(data: []) {
    // Do something
  }

  public print(): string {
      return 'Printing pie data';
  }
}

class BarGraph implements Graph {
  constructor(data: []) {
    // Do something
  }

  public print(): string {
      return 'Printing bar data';
  }
}

// App code
function app(creator: GraphCreator) {
  const data = [{ data: 'Fake 1' }];

  console.log(creator.render(data));
  
  const anotherGraph = creator.factoryMethod(data);
  console.log(anotherGraph.print());
}

console.log('App: Launched with pie graph creator.');
app(new PieGraphCreator());
console.log('--------------------------------');

console.log('App: Launched with bar graph creator.');
app(new BarGraphCreator());
