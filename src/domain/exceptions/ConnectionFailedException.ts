export class ConnectionFailedException extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
