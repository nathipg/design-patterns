interface Handler {
  setNext(handler: Handler): Handler;
  handle(amount: number): void;
}

abstract class NotesHandler implements Handler {
  protected next: Handler;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(amount: number): void {
    if(this.next) {
      this.next.handle(amount);
    }

    console.log('Can\'t give you money');
  }
}

class FiftyNotesHandler extends NotesHandler {
  handle(amount: number): void {
    let currentAmount = amount;

    if(amount >= 50) {
      const qty = Math.trunc(amount / 50);
      currentAmount -= qty * 50;

      console.log(`Dropping ${qty} fifty dollars bills`);
    }
    
    if(currentAmount > 0 && this.next) {
      return this.next.handle(currentAmount);
    }    
  }
}

class TwentyNotesHandler extends NotesHandler {
  handle(amount: number): void {
    let currentAmount = amount;

    if(amount >= 20) {
      const qty = Math.trunc(amount / 20);
      currentAmount -= qty * 20;

      console.log(`Dropping ${qty} twenty dollars bills`);
    }
    
    if(currentAmount > 0 && this.next) {
      return this.next.handle(currentAmount);
    }
  }
}

class TenNotesHandler extends NotesHandler {
  handle(amount: number): void {
    let currentAmount = amount;

    if(amount >= 10) {
      const qty = Math.trunc(amount / 10);
      currentAmount -= qty * 10;

      console.log(`Dropping ${qty} ten dollars bills`);
    }
    
    if(currentAmount > 0 && this.next) {
      return this.next.handle(amount);
    }
  }
}

class ValidateNotesHandler extends NotesHandler {
  handle(amount: number): void {
    if(amount % 10 !== 0) {
      console.log('Can\'t give you money');
      return;
    } 
    
    if(this.next) {
      return this.next.handle(amount);
    }
  }
}

const app = (handler: Handler) => {
  const helper = (amount) => {
    console.log(`\n=== ${amount} Dollars ===`);
    handler.handle(amount);
  };

  helper(150);
  helper(40);
  helper(10);
  helper(80);
  helper(5);
  helper(155);
};

const validateNotesHandler = new ValidateNotesHandler();
const fiftyNotesHandler = new FiftyNotesHandler();
const twentyNotesHandler = new TwentyNotesHandler();
const tenNotesHandler = new TenNotesHandler();

validateNotesHandler.setNext(fiftyNotesHandler).setNext(twentyNotesHandler).setNext(tenNotesHandler);

app(validateNotesHandler);
