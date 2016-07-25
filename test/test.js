'use strict';

/* Modules */
const chai = require('chai');

/* Local module */
const paretoFrontier = require('..');

/* Variables */
const expect = chai.expect;
const assert = chai.assert;

/* Helper functions for tests */
function reflectGraph(graph, reflectX, reflectY) {
    return cloneGraph(graph).map(p => reflectPoint(p, reflectX, reflectY));
}

function reflectPoint(p, reflectX, reflectY) {
    if (reflectX) { p[0] = -p[0]; }
    if (reflectY) { p[1] = -p[1]; }
    return p;
}

function cloneGraph(graph) {
    return graph.map(p => Array.from(p));
}

/* Tests */
describe('pareto-frontier', function tests(){

    it('should export a function', function test(){
        expect(paretoFrontier.getParetoFrontier).to.be.a('function');
    });

    it('should throw an error if provided an invalid option', function test(){
        const badValues = [
            '5',
            5,
            true,
            undefined,
            () => true,
            null,
            NaN,
            {},
            [[1]],
            [1, 2, 3],
            [[1, 2], [1]],
        ];

        badValues.forEach(v => expect(() => paretoFrontier.getParetoFrontier(v)).to.throw(TypeError));
    });

    it('should return an empty array if provided an empty array', function test() {
        expect(paretoFrontier.getParetoFrontier([])).to.deep.equal([]);
    });

    const graph = [
        [43, 16],
        [43, 15],
        [97, 16],
        [23, 29],
        [52, 32],
        [52, 74],
        [46, 66],
        [39, 16],
        [39, 16],
        [86, 3],
        [22, 30],
        [92, 77],
        [35, 67],
        [4, 59],
        [85, 14],
        [49, 7],
        [37, 73],
    ];

    // Expected is a for a top left optimization
    const expected = [
        [4, 59],
        [35, 67],
        [37, 73],
        [52, 74],
        [92,77],
    ];

    it('should calculate the pareto frontier for topLeft', function test() {
        expect(paretoFrontier.getParetoFrontier(graph, { optimize: 'topLeft' })).to.deep.equal(expected);
    });

    it('should calculate the pareto frontier for topRight', function test() {
        expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, true, false), { optimize: 'topRight' })).to.deep.equal(reflectGraph(expected, true, false));
    });

    it('should calculate the pareto frontier for bottomRight', function test() {
        expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, true, true), { optimize: 'bottomRight' })).to.deep.equal(reflectGraph(expected, true, true));
    });

    it('should calculate the pareto frontier for bottomLeft', function test() {
        expect(paretoFrontier.getParetoFrontier(reflectGraph(graph, false, true), { optimize: 'bottomLeft' })).to.deep.equal(reflectGraph(expected, false, true));
    });

    it('should default to the topRight pareto frontier', function test() {
        expect(paretoFrontier.getParetoFrontier(graph)).to.deep.equal(paretoFrontier.getParetoFrontier(graph, { optimize: 'topRight' }));
    });

    it('should allow extra data stored in the points', function test() {
        const graphWithData = cloneGraph(graph).concat([[0, 0, 'green', 100]]);
        expect(paretoFrontier.getParetoFrontier(graphWithData, { optimize: 'topLeft' })).to.deep.equal([[0, 0, 'green', 100]].concat(expected));
    });
    
});
