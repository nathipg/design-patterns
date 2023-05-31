interface PaymentStrategy {
  pay(value: number, description: string): boolean;
}

class CreditCard implements PaymentStrategy {
  pay(value: number, description: string): boolean {
    console.log(`Credit Card payment: $${value} ${description}`);
    return true;
  }
}

class DebitCard implements PaymentStrategy {
  pay(value: number, description: string): boolean {
    console.log(`Debit Card payment: $${value} ${description}`);
    return true;
  }
}

class Pix implements PaymentStrategy {
  pay(value: number, description: string): boolean {
    console.log(`Pix payment: $${value} ${description}`);
    return true;
  }
}

class Payment {
  value: number;
  description: string;

  constructor(value: number, description: string) {
    this.value = value;
    this.description = description;
  }

  pay(paymentStrategy: PaymentStrategy) {
    console.log('');
    console.log('===========================');
    console.log('Processing your payment...');

    const status = paymentStrategy.pay(this.value, this.description);

    console.log(status ? 'Payment accepted' : 'Error, please try again');
    console.log('===========================');
    console.log('');
  }
}

const app = () => {
  const payment = new Payment(50, 'Wristbands');

  const creditCardStrategy = new CreditCard();
  const debitCardStrategy = new DebitCard();
  const pixStrategy = new Pix();

  console.log('*Customer chose credit card*');
  payment.pay(creditCardStrategy);
  console.log('*Customer chose debit card*');
  payment.pay(debitCardStrategy);
  console.log('*Customer chose pix*');
  payment.pay(pixStrategy);
};

app();
