'use strict';

const pointComparator = (a, b) => (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : (a[1] < b[1] ? 1 : -1)));

let max;
const getParetoFrontier = (points) => {
    if (!Array.isArray(points) || !points.every(p => Array.isArray(p) && p.length === 2)) { throw new TypeError('Require array of points as input'); }
    return Array.from(points).sort(pointComparator).filter((p, i) => {
        if (i === 0 || p[1] > max) { max = p[1]; return true; }
        return false;
    });
}
exports.getParetoFrontier = getParetoFrontier;
