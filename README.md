Pareto Frontier
===
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

The [Pareto Frontier](https://en.wikipedia.org/wiki/Pareto_efficiency), or Pareto set, is the set of choices which optimizes a system. This package calculates the optimal set of points in a 2D system.

For a given system, the Pareto frontier or Pareto set is the set of parameterizations (allocations) that are all Pareto efficient. Finding Pareto frontiers is particularly useful in engineering. By yielding all of the potentially optimal solutions, a designer can make focused tradeoffs within this constrained set of parameters, rather than needing to consider the full ranges of parameters.

The Pareto frontier, P(Y), may be more formally described as follows. Consider a system with function <div class="equation" align="center" data-raw-text="f: \mathbb{R}^n \rightarrow \mathbb{R}^m" data-equation="eq:paretofrontier"> </div>, where ''X'' is a compact set of feasible decisions in the metric space <div class="equation" align="center" data-raw-text="\mathbb{R}^n" data-equation=""> </div>, and ''Y'' is the feasible set of criterion vectors in <div class="equation" align="center" data-raw-text="\mathbb{R}^m" data-equation=""> </div>, such that <div class="equation" align="center" data-raw-text="Y = \{ y \in \mathbb{R}^m:\; y = f(x), x \in X\;\}" data-equation=""> </div>.

We assume that the preferred directions of criteria values are known. A point <div class="equation" align="center" data-raw-text="y^{\prime\prime} \in \mathbb{R}^m\;" data-equation=""> </div> is preferred to (strictly dominates) another point <div class="equation" align="center" data-raw-text="y^{\prime} \in \mathbb{R}^m\;" data-equation=""> </div>, written as <div class="equation" align="center" data-raw-text="y^{\prime\prime} \succ y^{\prime}" data-equation=""> </div>. The Pareto frontier is thus written as:

<div class="equation" align="center" data-raw-text="P(Y) = \{ y^\prime \in Y: \; \{y^{\prime\prime} \in Y:\; y^{\prime\prime} \succ y^\prime, y^{\prime\prime} \neq y^\prime \; \} = \empty \}." data-equation="eq:paretofrontier">
</div>

## Installation

``` bash
$ npm install --save pareto-frontier
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
const pf = require('pareto-frontier');
```

#### pf.getParetoFrontier(graph)

Evaluates the [Pareto Frontier](https://en.wikipedia.org/wiki/Pareto_efficiency). `graph` must be an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of points. Each point must be an array of length two (or more). Additional information can be stored in each point and will pass through. Eg: `[55, 42, 'red']`.

Returned points are the Pareto Optimal set sorted to form a line.



``` javascript
const graph = [
    [55, 42],
    [60, 22],
    [83, 20],
    [20, 81],
    [41, 35],
    [12, 32],
    [29, 17],
    [64, 55],
    [47, 31],
    [89, 10],
    [68, 66],
    [33, 35],
    [72, 47],
    [33, 90],
    [49, 25],
];

const out = pf.getParetoFrontier(graph);

/* returns:
[
    [89, 10],
    [83, 20],
    [72, 47],
    [68, 66],
    [33, 90]
]
*/
```

##### Direction of Pareto Frontier
Optional `options` object may be pass to `getParetoFrontier(graph, options)` to specify which direction to optimize.

| Top Left Pareto Frontier |
| ------ |
| <center><img src="images/top-left.png?raw=true" width="342" alt="Top Left Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'topLeft' });``` |

| Top Right Pareto Frontier |
| ------ |
| <center><img src="images/top-right.png?raw=true" width="342" alt="Top Left Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'topRight'} );``` |

| Bottom Right Pareto Frontier |
| ------ |
| <center><img src="images/bottom-right.png?raw=true" width="342" alt="Bottom Right Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'bottomRight'} );``` |

| Bottom Left Pareto Frontier |
| ------ |
| <center><img src="images/bottom-left.png?raw=true" width="342" alt="Bottom Right Pareto Frontier"></center> |
| ```pf.getParetoFrontier(graph, { optimize: 'bottomLeft'} );``` |

##### Bad inputs
For non-wellformed inputs, a `TypeError` will be thrown.

``` javascript
const graph = [
	[0,-4],
	[1],  // Missing second dimension
	[2,0],
];

// Throws a TypeError
const out = pf.getParetoFrontier(graph);
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ npm test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ npm run test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [pareto-frontier](https://github.com/justinormont/pareto-frontier) Authors.

Description text partially via [Wikipedia](https://en.wikipedia.org/wiki/Pareto_efficiency).


[npm-image]: https://img.shields.io/npm/v/pareto-frontier.svg
[npm-url]: https://npmjs.org/package/pareto-frontier

[travis-image]: http://img.shields.io/travis/justinormont/pareto-frontier/master.svg
[travis-url]: https://travis-ci.org/justinormont/pareto-frontier

[codecov-image]: https://img.shields.io/codecov/c/github/justinormont/pareto-frontier/master.svg
[codecov-url]: https://codecov.io/github/justinormont/pareto-frontier?branch=master

[dependencies-image]: http://img.shields.io/david/justinormont/pareto-frontier.svg
[dependencies-url]: https://david-dm.org/justinormont/pareto-frontier

[dev-dependencies-image]: http://img.shields.io/david/dev/justinormont/pareto-frontier.svg
[dev-dependencies-url]: https://david-dm.org/dev/justinormont/pareto-frontier

[github-issues-image]: http://img.shields.io/github/issues/justinormont/pareto-frontier.svg
[github-issues-url]: https://github.com/justinormont/pareto-frontier/issues
