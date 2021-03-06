// Generated by CoffeeScript 1.10.0
(function() {
  var remove, traversePoints;

  remove = require('lodash.remove');

  traversePoints = function(points) {
    var draw, lastPoint, manifold, newPath, nextPoint, path, pathStart;
    path = [];
    pathStart = null;
    nextPoint = points != null ? points[0] : void 0;
    newPath = true;
    manifold = (points != null ? points.length : void 0) ? true : false;
    while (points != null ? points.length : void 0) {
      if (newPath) {
        pathStart = nextPoint;
        path.push('M', nextPoint.x, nextPoint.y);
        newPath = false;
      }
      draw = nextPoint.drawToAdjacent();
      lastPoint = nextPoint;
      nextPoint = draw.point;
      if (nextPoint === pathStart && draw.path[0] !== 'A') {
        draw.path = ['Z'];
        newPath = true;
      }
      if (lastPoint.edges.length === 0) {
        remove(points, lastPoint);
      }
      if (nextPoint.edges.length === 0) {
        if (nextPoint !== pathStart) {
          manifold = false;
        }
        remove(points, nextPoint);
        nextPoint = points[0];
        newPath = true;
      }
      path = path.concat(draw.path);
    }
    return {
      manifold: manifold,
      path: path
    };
  };

  module.exports = traversePoints;

}).call(this);
