import { TCallback } from '/shared/types';

type TListener<T> = { action: T; callback: TCallback };

export class EventBus<T> {
  private _listeners: TListener<T>[];

  constructor() {
    this._listeners = [];
  }

  public on = (action: T, callback: TCallback) => {
    this._listeners.push({ action, callback });
  };

  public off = (action: T, callback: TCallback) => {
    this._listeners = this._listeners.filter(
      listener => listener.action !== action && listener.callback !== callback,
    );
  };

  public emit = (action: T, ...args: unknown[]) => {
    this._listeners
      .filter(listener => listener.action === action)
      .forEach(listener => listener.callback(...args));
  };
}
