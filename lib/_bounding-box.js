// Generated by CoffeeScript 1.10.0
(function() {
  var BoundingBox;

  BoundingBox = (function() {
    function BoundingBox(viewBox) {
      if (viewBox != null) {
        this.xMin = viewBox[0];
        this.yMin = viewBox[1];
        this.xMax = viewBox[0] + viewBox[2];
        this.yMax = viewBox[1] + viewBox[3];
      } else {
        this.xMin = Infinity;
        this.yMin = Infinity;
        this.xMax = -Infinity;
        this.yMax = -Infinity;
      }
    }

    BoundingBox.prototype.add = function(bBox) {
      if (bBox.xMin < this.xMin) {
        this.xMin = bBox.xMin;
      }
      if (bBox.yMin < this.yMin) {
        this.yMin = bBox.yMin;
      }
      if (bBox.xMax > this.xMax) {
        this.xMax = bBox.xMax;
      }
      if (bBox.yMax > this.yMax) {
        this.yMax = bBox.yMax;
      }
      return this;
    };

    BoundingBox.prototype.addViewBox = function(vBox) {
      var vxMax, vyMax;
      vxMax = vBox[2] + vBox[0];
      vyMax = vBox[3] + vBox[1];
      if (vBox[0] < this.xMin) {
        this.xMin = vBox[0];
      }
      if (vBox[1] < this.yMin) {
        this.yMin = vBox[1];
      }
      if (vxMax > this.xMax) {
        this.xMax = vxMax;
      }
      if (vyMax > this.yMax) {
        this.yMax = vyMax;
      }
      return this;
    };

    BoundingBox.prototype.offset = function(amount) {
      this.xMin -= amount;
      this.yMin -= amount;
      this.xMax += amount;
      this.yMax += amount;
      return this;
    };

    BoundingBox.prototype.width = function() {
      if (this.xMin === Infinity || this.xMax === -Infinity) {
        return 0;
      } else {
        return this.xMax - this.xMin;
      }
    };

    BoundingBox.prototype.height = function() {
      if (this.yMin === Infinity || this.yMax === -Infinity) {
        return 0;
      } else {
        return this.yMax - this.yMin;
      }
    };

    BoundingBox.prototype.rect = function(fill) {
      if (fill == null) {
        fill = 'currentColor';
      }
      return {
        rect: {
          x: this.xMin,
          y: this.yMin,
          width: this.width(),
          height: this.height(),
          fill: fill
        }
      };
    };

    return BoundingBox;

  })();

  module.exports = BoundingBox;

}).call(this);
