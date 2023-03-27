// Common type
interface Item {
  product: ProductItem;
  qty: number;
}

// Sub system #1 - Product
class ProductItem {
  private name: string;
  private price: number;

  public constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getName() {
    return this.name;
  }

  public getPrice() {
    return this.price;
  }
}

class Product {
  private static instance: Product;
  private items: ProductItem[];

  private constructor() {
    this.items = [];
  }

  public static getInstance() : Product {
    if(!Product.instance) {
      Product.instance = new Product();
    }

    return Product.instance;
  }

  public addProduct(name: string, price: number) {
    this.items.push(new ProductItem(name, price));
  }

  public getProducts() {
    return this.items;
  }
}

// Fake info pre added in "database"
Product.getInstance().addProduct('Rubber band', 10.99);
Product.getInstance().addProduct('Red Ribbon', 2.99);

// Sub system #2 - Stock
class StockItem {
  private product: ProductItem;
  private qty: number;

  public constructor(product: ProductItem, qty: number) {
    this.product = product;
    this.qty = qty;
  }

  public getProduct() {
    return this.product;
  }

  public getQty() {
    return this.qty;
  }

  public setQty(qty: number) {
    this.qty = qty > 0 ? qty : 0;
  }
}

class Stock {
  private static instance: Stock;
  private items: StockItem[];

  private constructor() {
    this.items = [];
  }

  public static getInstance(): Stock {
    if(!Stock.instance) {
      Stock.instance = new Stock();
    }

    return Stock.instance;
  }

  public getItems() {
    return this.items;
  }

  public addItem(product: ProductItem, qty: number) {
    const productIndex = this.items.findIndex(item => item.getProduct().getName() === product.getName());

    if(productIndex !== -1) {
      const item = this.items[productIndex];
      item.setQty(item.getQty() + qty);
    } else {
      const item = new StockItem(product, qty);
      this.items.push(item);
    }
  }

  public removeItem(product: ProductItem, qty: number) {
    const productIndex = this.items.findIndex(item => item.getProduct().getName() === product.getName());

    if(productIndex !== -1) {
      const item = this.items[productIndex];
      item.setQty(item.getQty() - qty);
    }
  }
}

// Fake info pre added in "database"
Stock.getInstance().addItem(Product.getInstance().getProducts()[0], 5);

// Sub system #3 - Invoice
class Invoice {
  private client: Client;
  private items: Item[];

  public constructor(client: Client, items: Item[]) {
    this.client = client;
    this.items = [];
  }

  public emit() {
    // Code to emit invoice
    console.log(`Client ${this.client.getName()} invoice emitted`);
  }
}

// Sub system #4 - Client
class Client {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }
}

// Facade
class Order {
  private static getDetails(items: Item[]) {
    return 
  }

  public static placeOrder(client: Client, items: Item[]) {
    // Change stock
    items.forEach(item => {
      Stock.getInstance().removeItem(item.product, item.qty);
    });

    // Emit invoice
    const invoice = new Invoice(client, items);
    invoice.emit();

    // Register order
    // ... code here ...

    // Print order details
    const itemsDetails = items.reduce((details, item) => {
      const text = `\n      - ${item.qty} ${item.product.getName()} ... $${(item.qty * item.product.getPrice()).toFixed(2)}`;
      const total = item.qty * item.product.getPrice();

      return {
        text: details.text + text,
        total: details.total + total,
      };
    }, {
      text: '',
      total: 0,
    });

    console.log(`
      \nOrder #321456
      \nClient: ${client.getName()}
      \n\nItems: ${itemsDetails.text}
      \n\nTotal: $${itemsDetails.total}
    `);
  }
}

// Program code
const client = new Client('Apollo');
const products = Product.getInstance().getProducts();
const items = [
  { product: products[0], qty: 2 },
  { product: products[1], qty: 5 },
];

Order.placeOrder(client, items);
