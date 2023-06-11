enum RideEvents {
  LEFT = 'RIDE_LEFT',
  ARRIVED = 'RIDE_ARRIVED',
}

interface EventSubscriber {
  event: string;
  subscriber: ISubscriber;
}

interface IPublisher {
  subscribers: EventSubscriber[];
  addEventListener(subscriber: ISubscriber, event: string): void;
  removerEventListener(subscriber: ISubscriber, event: string): void;
  notify(event: string): void;
}

interface ISubscriber {
  id: string;
  notificationHandler(event: string): void;
}

class Ride implements IPublisher {
  subscribers: EventSubscriber[] = [];

  addEventListener(subscriber: ISubscriber, event: string): void {
    this.subscribers.push({
      event,
      subscriber,
    });
  }

  removerEventListener(subscriber: ISubscriber, event: string): void {
    this.subscribers = this.subscribers.filter(
      (eventSubscriber) =>
        !(
          eventSubscriber.event === event &&
          eventSubscriber.subscriber.id === subscriber.id
        )
    );
  }

  notify(event: string): void {
    this.subscribers
      .filter((eventSubscriber) => eventSubscriber.event === event)
      .map((eventSubscriber) =>
        eventSubscriber.subscriber.notificationHandler(event)
      );
  }

  leftStartingPoint() {
    console.log('Ride: * left *');
    this.notify(RideEvents.LEFT);
  }

  arrivedAtTheMeetingPoint() {
    console.log('Ride: * arrived *');
    this.notify(RideEvents.ARRIVED);
  }
}

class FreeRider implements ISubscriber {
  id: string;

  constructor() {
    this.id = `FreeRider_${Math.random()}`;
  }

  notificationHandler(event: string): void {
    if (event === RideEvents.LEFT) {
      console.log('Your ride is coming, go to the meeting point');
    }

    if (event === RideEvents.ARRIVED) {
      console.log('Your ride arrived, get in the car');
    }
  }
}

const app = () => {
  const ride = new Ride();
  const freeRider = new FreeRider();

  ride.addEventListener(freeRider, RideEvents.LEFT);
  ride.addEventListener(freeRider, RideEvents.ARRIVED);

  ride.leftStartingPoint();
  ride.arrivedAtTheMeetingPoint();

  ride.removerEventListener(freeRider, RideEvents.LEFT);
  ride.removerEventListener(freeRider, RideEvents.ARRIVED);

  ride.leftStartingPoint();
  ride.arrivedAtTheMeetingPoint();
};

app();
