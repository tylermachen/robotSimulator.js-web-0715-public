'use strict';

function Robot() {
  this.orient = function(currentDirection) {
    var directions = [ 'east', 'west', 'north', 'south' ];
    if (directions.join(' ').includes(currentDirection)) {
      this.bearing = currentDirection;
    } else {
      throw new Error('Invalid Robot Bearing');
    }
  }
  this.turnRight = function() {
    switch(this.bearing) {
      case 'east':
        this.bearing = 'south';
        break;
      case 'west':
        this.bearing = 'north';
        break;
      case 'north':
        this.bearing = 'east';
        break;
      case 'south':
        this.bearing = 'west';
        break;
    }
  }
  this.turnLeft = function() {
    switch(this.bearing) {
      case 'east':
        this.bearing = 'north';
        break;
      case 'west':
        this.bearing = 'south';
        break;
      case 'north':
        this.bearing = 'west';
        break;
      case 'south':
        this.bearing = 'east';
        break;
    }
  }
  this.at = function(x, y) {
    this.coordinates = [x, y];
  }
  this.advance = function() {
    switch(this.bearing) {
      case 'east':
        this.coordinates = [this.coordinates[0] + 1, this.coordinates[1]];
        break;
      case 'west':
        this.coordinates = [this.coordinates[0] - 1, this.coordinates[1]];
        break;
      case 'north':
        this.coordinates = [this.coordinates[0], this.coordinates[1] + 1];
        break;
      case 'south':
        this.coordinates = [this.coordinates[0], this.coordinates[1] - 1];
        break;
    }
  }
  this.instructions = function(instructions) {
    var instructArray = instructions.split('');
    var parsedInstructions = instructArray.map(function(i) {
      if (i === 'L') {
        return 'turnLeft';
      } else if (i === 'R') {
        return 'turnRight';
      } else if (i === 'A') {
        return 'advance';
      }
    })
    return parsedInstructions;
  }
  this.place = function(obj) {
    var x, y, direction;
    for (var key in obj) {
      if (key === 'x') {
        var x = obj[key];
      } else if (key === 'y') {
        var y = obj[key];
      } else if (key === 'direction') {
        var direction = obj[key];
      }
    }
    this.coordinates = [x, y];
    this.bearing = direction;
  }
  this.evaluate = function(instructString) {
    var instructArray = this.instructions(instructString);
    instructArray.forEach(function(i) {
      this[i]();
    }.bind(this))
  }
}
