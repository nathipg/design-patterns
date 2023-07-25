enum OPERATION {
  PLUS = '+',
  MINUS = '-',
  MULTIPLE = '*',
  DIVIDE = '/',
}

const OPERATIONS: ReadonlyArray<string> = ['+', '-', '*', '/'];

// Memento interface
interface Memento {
  getState(): string;
}

// Originator interface
interface Originator {
  backup(): Memento;
  restore(memento: Memento): void;
}

// Concrete Memento
class CalculatorMemento implements Memento {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}

// Originator
class Calculator implements Originator {
  private calculation: string = '';

  addNewPart(part: string | number) {
    const normalizedPart = part.toString();
    const lastPart = this.calculation[this.calculation.length - 1];

    if(OPERATIONS.includes(lastPart) && OPERATIONS.includes(normalizedPart)) {
      return;
    }

    this.calculation += normalizedPart;
  }

  result() {
    const result = eval(this.calculation);
    
    console.log(`${this.calculation} = ${result}`);

    this.calculation = '';
  }

  print() {
    console.log(`Current calculation: ${this.calculation}`);
  }

  backup(): Memento {
    return new CalculatorMemento(this.calculation);
  }

  restore(memento: Memento): void {
    this.calculation = memento.getState();
  }
}

// Caretaker
class CalculationHistory {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  backup() {
    this.mementos.push(this.originator.backup());
  }

  undo() {
    if(!this.mementos.length) {
      return;
    }

    const memento = this.mementos.pop();

    memento && this.originator.restore(memento);
  }

  print() {
    console.log(this.mementos);
  }
}

const calc = new Calculator();
const calcHistory = new CalculationHistory(calc);

// Backup original state
calcHistory.backup();

// 1 + 2
console.log('\nCalc #1');
calc.addNewPart(1);
calc.addNewPart(OPERATION.PLUS);
calc.addNewPart(2);

calcHistory.backup();
calc.result();

// 3 + 4
console.log('\nCalc #2');
calc.addNewPart(3);
calc.addNewPart(OPERATION.PLUS);
calc.addNewPart(4);

calcHistory.backup();
calc.result();

// 5 + 6
console.log('\nCalc #3');
calc.addNewPart(5);
calc.addNewPart(OPERATION.PLUS);
calc.addNewPart(6);

calcHistory.backup();
calc.result();

// Calculation before undo
console.log('\nCalculation after calcs, before undo');
calc.print();

// Undo #1
console.log('\nUndo #1');
calcHistory.undo();
calc.print();

// Undo #2
console.log('\nUndo #2');
calcHistory.undo();
calc.print();

// Undo #3
console.log('\nUndo #3');
calcHistory.undo();
calc.print();

// Undo #4
console.log('\nUndo #4');
calcHistory.undo();
calc.print();
