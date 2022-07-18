class UnprocessableEntityException extends Error {
  constructor(message) {
    super(message);
    this.name = "UnprocessableEntityException";
    this.msg = message;
  }
}

module.exports = UnprocessableEntityException;
