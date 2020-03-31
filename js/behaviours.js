var HUMAN_DEFAULT_BEHAVIOUR = function(world){
  var collisions = this.checkCollisions(world);
  /*this.addAngle(deg2rad(180));
  this.compute_direction();*/

  if(collisions.bumpOnSomeone.length>0)
  {
    collisions.bumpOnSomeone.map(function(other){
      if(typeof this.virus == "object")
        this.virus.spread(other);
      other.addAngle(-deg2rad(5)* (Math.random()*10>5)?-1:1);
      other.compute_direction();
    }.bind(this));
    this.addAngle(deg2rad(5)* (Math.random()*10>5)?-1:1);
  }

  if(collisions.bumpOnWalls.length>0)
  {
    this.addAngle(deg2rad(180)* (Math.random()*10>5)?-1:1);
  }

  if(collisions.bumping==0)
  {
    this.compute_direction();
    this.x = this.dxr;
    this.y = this.dyr;
  }
};
