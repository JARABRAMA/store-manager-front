export class ConnectionFailedException extends Error {
  constructor() {
    super("Error de conexion por favor intenta más tarde");
  }
}
