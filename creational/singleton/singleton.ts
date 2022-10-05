class Product {
  private name: string;
  private price: number;

  public constructor(name, price) {
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

class CartItem {
  private product: Product;
  private qty: number;

  public constructor(product, qty) {
    this.product = product;
    this.qty = qty;
  }

  public getProduct() {
    return this.product;
  }

  public getQty() {
    return this.qty;
  }
}

class Cart {
  private static instance: Cart;
  private items: CartItem[];

  private constructor() {
    this.items = [];
  }

  public static getInstance(): Cart {
    if(!Cart.instance) {
      Cart.instance = new Cart();
    }

    return Cart.instance;
  }

  public addItems(item: CartItem) {
    this.items.push(item);
  }

  public getItems(): CartItem[] {
    return this.items;
  }

  public getTotal(): number {
    return this.items.reduce((previousValue: number, currentValue: CartItem) => {
      const price = currentValue.getProduct().getPrice();
      const qty = currentValue.getQty();
      return previousValue + price * qty;
    }, 0);
  }
}

const prod1 = new Product('Juice', 10);
const prod2 = new Product('Folded Bread', 5);

const cart1 = Cart.getInstance();
const cart2 = Cart.getInstance();

const item1 = new CartItem(prod1, 1);
const item2 = new CartItem(prod2, 5);

cart1.addItems(item1);
cart2.addItems(item2);

console.log('--- Cart 1 ---');
console.log('Items:');
console.log(cart1.getItems());
console.log('Total:');
console.log(cart1.getTotal());

console.log('--- Cart 2 ---');
console.log('Items:');
console.log(cart2.getItems());
console.log('Total:');
console.log(cart2.getTotal());
