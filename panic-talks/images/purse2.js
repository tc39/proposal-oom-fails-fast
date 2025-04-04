const Nat = n => {
  if (n >= 0) { return n; }
  throw RangeError(`not Nat ${n}`);
};

class Purse {
  #value; #worth;
  constructor(value, worth) {
    this.#value = Nat(value); this.#worth = Nat(worth);
  }

  toString() { return `${this.#value} * ${this.#worth}`; }

  deposit(myDelta, src) {
    Nat(src.#value * src.#worth - Nat(myDelta) * this.#worth);
    try { // COMMIT POINT
      this.#value += myDelta;
      src.#value -= myDelta * this.#worth / src.#worth;
    } catch (err) {
      console.log('logs', err);
      throw err;
    }
  }
}

const mine = new Purse(10n, 1000n);
const src = new Purse(20n, 0n);
try {
  mine.deposit(0n, src);          // logs RangeError: Division by zero
  console.log(`${mine}, ${src}`); // not reached
} catch (err) {
  console.log('caught', err);     // caught RangeError: Division by zero
  // Zalgo laughs
}
