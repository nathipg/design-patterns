// Abstract creator
abstract class ProductCreator {
  public abstract factoryMethod(): Product;

  public exampleDefaultActions(): string {
    const product = this.factoryMethod();
    return `Creator: ${product.print()}`;
  }
}

// Concrete creators
class SoapCreator extends ProductCreator {
  public factoryMethod(): Product {
      return new Soap();
  }
}

class JamCreator extends ProductCreator {
  public factoryMethod(): Product {
      return new Jam();
  }
}

// Product interface
interface Product {
  print(): string;
}

// Concrete products
class Soap implements Product {
  public print(): string {
      return 'Printing soap';
  }
}

class Jam implements Product {
  public print(): string {
      return 'Printing jam';
  }
}

// App code
function app(creator: ProductCreator) {
  console.log(creator.exampleDefaultActions());
}

console.log('App: Launched with soap creator.');
app(new SoapCreator());
console.log('');

console.log('App: Launched with jam creator.');
app(new JamCreator());
