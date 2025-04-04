# Don't Remember Panicking

A TC39 proposal for both

- A `HostFaultHandler` hook for optionally immediately terminating the enclosing unit of computation.
- A builtin `panic` method for explicitly invoking `HostFaultHandler`

```js
const Nat = n => {
  if (n >= 0) { return n; }
  throw RangeError(...);
}

class Purse {
  #value; #worth;
  constructor(value, worth) {
    this.#value = Nat(value); this.#worth = Nat(worth);
  }

  deposit(myDelta, src) {
    // prepare phase: all tests, no effects
    Nat(src.#value * src.#worth - Nat(myDelta) * this.#worth);
    // COMMIT POINT: no tests, all effects
    try {
      this.#value += myDelta;
      // bug unnoticed in development, testing, review
      src.#value -= myDelta * this.#worth / src.#worth;
    } catch (err) {
      // unexpected corruption unrepairable
      Reflect.panic(err);
    }
  }
}
```
