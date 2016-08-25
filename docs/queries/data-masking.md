# Data masking

> Understand how it works and why it's important.

Relay embraces data masking: a powerful concept that leads to better encapsulation and reduces the appearance of subtle errors.

## What you don't know won't hurt you.

Data masking is a concept that can be summarized in one sentence:

> Every component is only exposed to the data it explicitely requires and does not implicitely depend on the data required by its parent or one of its children.
