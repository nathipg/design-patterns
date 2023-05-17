class User {
  private id: number;
  private name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
}

const users = [
  new User(1, 'User1'),
  new User(2, 'User2'),
];

export { User, users };