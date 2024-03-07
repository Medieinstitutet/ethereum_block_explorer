export class Transaction {
  from;
  to;
  value;

  constructor(from, to, value) {
    this.from = from;
    this.to = to;
    this.value = value;
  }
}