# proposal-oom-fails-fast
## Out of memory MUST immediately terminate the agent cluster

The ECMAScript specification nowhere mentions the possibility of running out of memory (OOM), and so cannot be correctly implemented on finite memory machines. Allocation in JavaScript is pervasive and implicit, implying that an OOM may happen anywhere in the execution of the program. If OOM threw a catchable error, computation within the agent would continue in an inconsistent state. Instead, we should immediately terminate the agent cluster, in order to abandon all unrepairable inconsistent state.

## Background

JavaScript programs, like programs in any conventional imperative programming language, must bring about state change one step at a time. Between these steps, invariants are suspended, to be restored by later steps. Consider splicing into a doubly-linked list. No matter how it is written, part way through the splice, the doubly-linked list is in an ill-formed state. Were the remaining steps skipped unpredictably, and computation to continue elsewhere with the ill-formed list still reachable, [Zalgo would be unleased](https://blog.izs.me/2013/08/designing-apis-for-asynchrony).

Erlang and [Joe-E](https://people.eecs.berkeley.edu/~daw/papers/joe-e-ndss10.pdf) instead implement the fail-fast approach, in which a computational unit containing all such potentially inconsistent state, is immediately terminated. Let's call this computation unit the Unit of Preemptive Termination (UOPT). No further code executes within the UOPT. The potentially unrepaired inconsistent state is abandoned, no longer reachable by any computational path that may continue. In Erlang, the UOPT is tiny: the Erlang process. This is possible because processes are only asynchronously coupled to each other by messages, and only synchronously coupled to each other through transactional database abstractions.

In JavaScript, the minimal UOPT is the agent cluster. Following OOM, the agent cluster must be immediately terminated, without any further execution of user code within the agent cluster. Any recovery of an overall computational system must occur in other code, in reaction to the termination of this agent cluster. Erlang shows this approach is practical for writing systems that maintain consistency.

----

From  [Joe-E: A Security-Oriented Subset of Java](https://people.eecs.berkeley.edu/~daw/papers/joe-e-ndss10.pdf), Adrian Mettler, David Wagner, and Tyler Close; January 2010:

> ... an object’s invariants can be violated if an error (such as running out of memory) is encountered during execution right when the object is in a temporarily inconsistent state. In many cases, these errors can be intentionally triggered by the invoking software component, for example by allocating a lot of memory or recursing deeply to use up stack space before invoking the object under attack. If a malicious caller could catch such an error, the caller would be
well-positioned to exploit the violated invariant.
