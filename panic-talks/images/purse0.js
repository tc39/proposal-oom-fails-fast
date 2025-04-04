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
    // COMMIT POINT
    this.#value += myDelta;
    src.#value -= myDelta * this.#worth / src.#worth; // Zalgo beckons
  }
}





const mine = new Purse(10, 1000);
const src = new Purse(20, 500);
try {
  mine.deposit(3, src);
  console.log(`${mine}, ${src}`); // 13 * 1000, 14 * 500
} catch (err) {
  console.log('caught', err);     // not reached
}
