interface IAnimal {
  sound: string;

  speak(): void;
}

class Animal implements IAnimal {
  sound: string;

  constructor() {
    this.sound = '...';
  }

  speak() {
    console.log(this.sound);
  }
}

class Dog extends Animal {
  constructor() {
    super();
    this.sound = 'Woof woof';
  }
}

class Cat extends Animal {
  constructor() {
    super();
    this.sound = 'Meow';
  }
}

class AnimalCreator {
  static factory(type: string): IAnimal {
      if (type === 'dog') {
          return new Dog();
      } else if (type === 'cat') {
          return new Cat();
      } else {
          return new Animal();
      }
  }
}

AnimalCreator.factory('').speak();
AnimalCreator.factory('dog').speak();
AnimalCreator.factory('cat').speak();
