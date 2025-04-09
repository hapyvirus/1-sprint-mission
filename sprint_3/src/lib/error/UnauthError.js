class UnauthError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthError";
  }
}

export default UnauthError;
