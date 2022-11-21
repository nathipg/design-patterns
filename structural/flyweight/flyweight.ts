class FruitType {
  private name: string;
  private icon: string;

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }

  public getIcon() {
    return this.icon;
  }

  public getName() {
    return this.name;
  }

  public print(x: number, y: number) {
    console.log(`${this.name}(${this.icon}) at [${x}, ${y}]`);
  }
}

class FruitTypeFactory {
  private static fruitTypes: FruitType[] = [];
  
  public static getFruitType(name: string): FruitType {
    const type = this.find(name);

    if(!type) {
      const newType = new FruitType(name, `${name}_icon`);
      this.fruitTypes.push(newType);

      return newType;
    }

    return type;
  }

  private static find(name: string) {
    return this.fruitTypes.find(fruit => fruit.getName() === name);
  }
}

class Fruit {
  private x: number;
  private y: number;
  private type: FruitType;

  constructor(type: FruitType, x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  public print() {
    this.type.print(this.x, this.y);
  }
}

// Some fruits name
const FRUITS = {
  STRAWBERRY: 'strawberry',
  GRAPE: 'grape',
  APPLE: 'apple',
  PINEAPPLE: 'pineapple',
};

class Game {
  private fruits: Fruit[] = [];

  public addFruit(name: string, x: number, y: number) {
    const fruitType = FruitTypeFactory.getFruitType(name);
    const fruit = new Fruit(fruitType, x, y);
    this.fruits.push(fruit);
  }

  public print() {
    this.fruits.forEach(fruit => {
      fruit.print();
    });
  }
}

const game = new Game();

game.addFruit(FRUITS.STRAWBERRY, 1, 1);
game.addFruit(FRUITS.STRAWBERRY, 1, 2);
game.addFruit(FRUITS.STRAWBERRY, 1, 3);
game.addFruit(FRUITS.GRAPE, 2, 1);
game.addFruit(FRUITS.GRAPE, 2, 2);
game.addFruit(FRUITS.GRAPE, 2, 3);
game.addFruit(FRUITS.APPLE, 3, 1);
game.addFruit(FRUITS.APPLE, 3, 2);
game.addFruit(FRUITS.APPLE, 3, 3);
game.addFruit(FRUITS.PINEAPPLE, 4, 1);
game.addFruit(FRUITS.PINEAPPLE, 4, 2);
game.addFruit(FRUITS.PINEAPPLE, 4, 3);

game.print();
