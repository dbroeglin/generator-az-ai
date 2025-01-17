# 3. Use UV for Python dependency management

Date: 2024-12-08

## Status

Accepted

## Context

[`uv`](https://docs.astral.sh/uv/) fixes many of the drawbacks of the traditional Python stack:
  - `requirements.txt` files have many limitations and overall `pip` is slow.
  - another tool is needed for Python version management (conda, miniconda, etc.)
  - Python project management is included.
  - etc.

`uv` is a fast and modern way to solve those issues. It stays compatible with `pip` should we need that for integration with other tools.

## Decision

We will use `uv` to manage Python, Python projects and their dependencies. We will make sure that the template is already ready to run with `uv` providing many examples of how to use it to reduce the cost of learning it for people new to it.

## Consequences

No need for `pip install` or `conda`, etc. Everything is managed by `uv`. There is a bit of learning involved, see [UV documentation](https://docs.astral.sh/uv/) for more information. 
