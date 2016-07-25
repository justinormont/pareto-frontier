'use strict';

const pointComparators = Object.freeze({
    topRight:    (a, b) => (b[0] < a[0] ? -1 : (b[0] > a[0] ? 1 : (b[1] < a[1] ? -1 : (b[1] > a[1] ? 1 : 0)))),
    topLeft:     (a, b) => (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : (a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0)))),
    bottomRight: (a, b) => (b[0] < a[0] ? -1 : (b[0] > a[0] ? 1 : (b[1] < a[1] ? 1 : (b[1] > a[1] ? -1 : 0)))),
    bottomLeft:  (a, b) => (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)))),
});

const getParetoFrontier = (points, options) => {
    if (!Array.isArray(points) || !points.every(p => Array.isArray(p) && p.length >= 2)) { throw new TypeError('Require array of points as input'); }

    const pointComparator = options && pointComparators[options.optimize] || pointComparators.topRight;
    const findMax = (pointComparator([0, 1], [0, 0]) < 0); // Optimize +y

    let last;
    return Array.from(points).sort(pointComparator).filter((p, i) => {
        if (i === 0 || findMax && p[1] > last || !findMax && p[1] < last) { last = p[1]; return true; }

        return false;
    });
}

exports.getParetoFrontier = getParetoFrontier;
