interface IState {
  context?: PhoneContext;
  setContext: (context: PhoneContext) => void;
  alert: (alertText: string) => void;
  next: () => void;
}

class PhoneContext {
  private state: IState;

  constructor(state: IState) {
    this.state = state;
    state.setContext(this);
  }

  public transitionTo(state: IState): void {
    this.state = state;
    this.state.setContext(this);
  }

  public receiveAlert(alertText: string) {
    this.state.alert(alertText);
  }

  public changeMode() {
    this.state.next();
  }
}

class RingMode implements IState {
  context?: PhoneContext;

  public setContext(context: PhoneContext) {
    this.context = context;
  }

  public alert(alertText: string): void {
    console.log(`* Alert with sound and vibration * - ${alertText}`);
  }

  public next() {
    this.context?.transitionTo(new VibrateMode());
  }
}

class VibrateMode implements IState {
  context?: PhoneContext;

  public setContext(context: PhoneContext) {
    this.context = context;
  }

  public alert(alertText: string) {
    console.log(`* Alert with vibration * - ${alertText}`);
  }

  public next() {
    this.context?.transitionTo(new SilenceMode());
  }
}

class SilenceMode implements IState {
  context?: PhoneContext;

  public setContext(context: PhoneContext) {
    this.context = context;
  }

  public alert(alertText: string) {
    console.log(`* Alert without sound or vibration * - ${alertText}`);
  }

  public next() {
    this.context?.transitionTo(new RingMode());
  }
}

const app = (phoneContext: PhoneContext) => {
  phoneContext.receiveAlert('Alert 1');
  phoneContext.changeMode();

  phoneContext.receiveAlert('Alert 2');
  phoneContext.changeMode();

  phoneContext.receiveAlert('Alert 3');
  phoneContext.changeMode();

  phoneContext.receiveAlert('Alert 4');
};

const phoneContext = new PhoneContext(new RingMode());

app(phoneContext);
