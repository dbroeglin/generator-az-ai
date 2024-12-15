# generator-aigbb [![NPM version][npm-image]][npm-url]
> AI GBB Scaffolding Tool

## Installation

First, install [Yeoman](http://yeoman.io) and generator-aigbb using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-aigbb
```

Then generate your new project:

```bash
yo aigbb
```

Local development:
```
npm link
```

Simple testing: 

```bash
( 
  rm -rf /tmp/foobar; cd /tmp; yo aigbb foobar && cd foobar && \
  AZURE_ENV_NAME=test azd up
  read
  azd down --purge --force
)
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

 © Dominique Broeglin

[npm-image]: https://badge.fury.io/js/generator-aigbb.svg
[npm-url]: https://npmjs.org/package/generator-aigbb
