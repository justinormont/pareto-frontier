'use strict';

/* Modules */
const chai = require('chai');

/* Local module */
const paretoFrontier = require('..');

/* Variables */
const expect = chai.expect;
const assert = chai.assert;


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
            [[1, 2, 3]],
            [[1, 2], [1]],
		];

		badValues.forEach(v => expect(() => paretoFrontier.getParetoFrontier(v)).to.throw(TypeError));
	});

	it('should return an empty array if provided an empty array', function test() {
        expect(paretoFrontier.getParetoFrontier([])).to.deep.equal([]);
	});

    it('should calculate the pareto frontier', function test() {
        const data = [
            [43, 16],
            [97, 16],
            [23, 29],
            [52, 32],
            [52, 74],
            [46, 66],
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

        const expected = [
            [4, 59],
            [35, 67],
            [37, 73],
            [52, 74],
            [92,77],
        ];

        expect(paretoFrontier.getParetoFrontier(data)).to.deep.equal(expected);
	});

});
