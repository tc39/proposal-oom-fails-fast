# Don't Remember Panicking

A TC39 proposal for both

- A `HostFaultHandler` hook for optionally immediately terminating the enclosing unit of computation.
- A builtin `panic` method for explicitly invoking `HostFaultHandler`

## Status

[The TC39 Process](https://tc39.es/process-document/)

Achieved Stage 1 as [OOM Must Fail-Fast](./oom-must-fail-fast-README.md)

Co-Champions
- Mark S. Miller, Agoric (@erights)
- Peter Hoddie, Moddable (@phoddie)
- Zbyszek Tenerowicz (@naugtur)
- Christopher Hiller (@boneskull)

## Presentations

- ***for stage 1*** - October 2019 plenary - "OOM Must Fail-Fast" ([pdf slides](./panic-talks/oom-fails-fast-for-stage1.pdf), [video](https://www.youtube.com/watch?v=wNM2B4GFf3s&list=PLzDw4TTug5O0ywHrOz4VevVTYr6Kj_KtW))

- ***stage 1 update*** - April 2025 plenary - "Don't Remember Panicking" ([keynote slides](./panic-talks/dont-remember-panicking.key), [pdf slides](./panic-talks/dont-remember-panicking.pdf), [video](https://www.youtube.com/watch?v=nhsnssvp1vI&list=PLzDw4TTug5O3vIAd4IR1Gp5t_46co_dv9&index=26))

## What

- A new Host Hook
```js
HostFaultHandler(faultType, arg = undefined)
```
to be invoked for various from various internal fault conditions, so the host can react according to the host's policy. Including sudden termination of "Minimal Abortable Unit of Computation", such as an Agent cluster.

- A new built-in
```js
Reflect.panic(arg = undefined)
```
so JavaScript code can directly fault to `HostFaultHandler`.

See [`@endo/panic`](https://github.com/endojs/endo/tree/master/packages/panic) for an imperfect ponyfill of the `panic` function from this proposal.

## Why

See [OOM Must Fail-Fast](./oom-must-fail-fast-README.md) for the original motivation and rationale, most of which is still interesting and valid.

See "Don't Remember Panicking" Stage 1 Update ([keynote slides](./panic-talks/dont-remember-panicking.key), [pdf slides](./panic-talks/dont-remember-panicking.pdf)) for the expanded motivation and rationale

## Acknowledgements

Thanks to Felipe Natal for bring our attention to a problem that
- revived our interest in this old "OOM Must Fail Fast" proposal.
- needed the addition of a user `panic` operation to solve.
