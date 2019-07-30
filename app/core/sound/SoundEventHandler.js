import getLogger from '../Logger';

export default class SoundEventHandler {
  constructor(sound: *, availableEvents: Array<string>) {
    this.sound = sound;
    this.availableEvents = availableEvents;

    this.eventSubscribers = {};
    this.logger = getLogger(`SoundEventHandler:${this.sound.id}`);
  }

  validateEventName = (eventName: string) => {
    if (!this.availableEvents.includes(eventName)) {
      throw new Error(`Event doesn't exist: ${eventName}`);
    }
  };

  eventHasSubscribers = (eventName: string) => {
    return Object.prototype.hasOwnProperty.call(
      this.eventSubscribers,
      eventName
    );
  };

  subscribeToEvent = (eventName: string, callback: () => void) => {
    this.validateEventName(eventName);

    if (!this.eventHasSubscribers(eventName)) {
      this.eventSubscribers[eventName] = [callback];
    } else {
      this.eventSubscribers[eventName].push(callback);
    }
    this.logger.debug(`Subscribed to event: ${eventName}`);
  };

  unsubscribeFromEvent = (eventName: string, callbackToRemove: () => void) => {
    this.validateEventName(eventName);

    if (!this.eventHasSubscribers(eventName)) {
      const index = this.eventSubscribers[eventName].indexOf(callbackToRemove);

      if (index > -1) {
        delete this.eventSubscribers[eventName][index];
      }
    }
    this.logger.debug(`Unsubscribed from event: ${eventName}`);
  };

  emitEvent = (eventName: string) => {
    this.validateEventName(eventName);
    this.logger.debug(`Emitting event: ${eventName}`);

    if (this.eventHasSubscribers(eventName)) {
      const callbacks = this.eventSubscribers[eventName];
      callbacks.forEach(cb => cb());
    }
  };
}
