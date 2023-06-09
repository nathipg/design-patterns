interface IVisitor {
  visitCharacter(element: Character): void;
  visitMonster(element: Monster): void;
}

interface ICreature {
  attack: number;
  defense: number;
  healthPoints: number;

  accept(visitor: IVisitor): void;
}

class Character implements ICreature {
  age: number;
  attack: number;
  defense: number;
  healthPoints: number;
  name: string;

  constructor(data: {
    age: number;
    attack: number;
    defense: number;
    healthPoints: number;
    name: string;
  }) {
    const { age, attack, defense, healthPoints, name } = data;

    this.age = age;
    this.attack = attack;
    this.defense = defense;
    this.healthPoints = healthPoints;
    this.name = name;
  }

  accept(visitor: IVisitor): void {
    visitor.visitCharacter(this);
  }
}

class Monster implements ICreature {
  attack: number;
  defense: number;
  healthPoints: number;
  species: string;

  constructor(data: {
    attack: number;
    defense: number;
    healthPoints: number;
    species: string;
  }) {
    const { attack, defense, healthPoints, species } = data;

    this.attack = attack;
    this.defense = defense;
    this.healthPoints = healthPoints;
    this.species = species;
  }

  accept(visitor: IVisitor): void {
    visitor.visitMonster(this);
  }
}

class ShowStatusVisitor implements IVisitor {
  visitCharacter(element: Character): void {
    console.log('=== Character Status ===');
    console.log(`Name: ${element.name}`);
    console.log(`Age: ${element.age}`);
    console.log(`HP: ${element.healthPoints}`);
    console.log(`Attack: ${element.attack}`);
    console.log(`Defense: ${element.defense}`);
  }

  visitMonster(element: Monster): void {
    console.log('=== Monster Status ===');
    console.log(`Species: ${element.species}`);
    console.log(`HP: ${element.healthPoints}`);
    console.log(`Attack: ${element.attack}`);
    console.log(`Defense: ${element.defense}`);
  }
}

const app = () => {
  const showStatusVisitor = new ShowStatusVisitor();

  const battle: ICreature[] = [
    new Character({
      age: 40,
      attack: 4,
      defense: 1,
      healthPoints: 100,
      name: 'Old man',
    }),
    new Monster({
      attack: 2,
      defense: 1,
      healthPoints: 20,
      species: 'Ghost',
    }),
    new Monster({
      attack: 5,
      defense: 3,
      healthPoints: 50,
      species: 'Butcher',
    }),
  ];

  battle.forEach((creature: ICreature) => {
    creature.accept(showStatusVisitor);
  });
};

app();
