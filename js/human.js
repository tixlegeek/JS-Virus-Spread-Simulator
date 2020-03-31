var HUMANCOUNTER = 0;
var CLANSN = [];

var HUMAN = function(x, y, conf = {}){
  this.id=HUMANCOUNTER++;
  this.x = x;                                     // x position of the emitter on the canvas.
  this.y = y;                                     // y position of the emitter on the canvas.
  this.a = conf.a || .0;                          // angle
  this.v = conf.v || 3.0;                         // Velocity
  this.r = conf.r || 10;                          // Action radius
  this.health = conf.health || 100;
  this.clan = conf.clan || 0;//(uirand(3))|0;    // Clan
  this.spritesheet = conf.spritesheet || SPRITE.sheets[this.clan];
  this.customBehaviour = conf.behaviour || {};
  this.spriteAngle = 0;                 // Sprite row
  this.spriteFrame = 0;                 // Sprite col

  this.waiting = 0;                     // Waiting counter
  this.dead = false;
  this.life = 1;                        // Inner counter

  if(!CLANSN[this.clan])
    CLANSN[this.clan]=0;
  CLANSN[this.clan]++;

  this.dxr = 0;                         // Computed next x position
  this.dyr = 0;                         // Computed next y position

  this.dx = 0;                          // Computed x direction
  this.dy = 0;                          // Computed y direction

  this.sxr = 0;                         // Sensor x position
  this.syr = 0;                         // Sensor y position

  // Draws emitter's controls
  this.drawControls = function(){
    var self=this;
    /*
    new CONTROL(this,"checkbox",this.checked, {},"active","Activate :", "click",function(e){self.checked = this.value = this.input.checked;this.changed();});
    new CONTROL(this,"checkbox",this.animate, {},"animate","Animated :", "click",function(e){self.animate = this.value = this.input.checked;this.changed();});
    new CONTROL(this,"range",this.f, {max:500, min:1, step:0.5},"f","Frequency :", "input",function(e){self.f = this.input.value * 1;this.changed();});
    new CONTROL(this,"range",this.phase, {max:2*Math.PI*100, min:0, step:0.05},"phase","Phase :", "input",function(e){self.phase = this.input.value * 1;this.changed();});
    new CONTROL(this,"range",this.a, {max:100, min:0, step:1},"a","Amplification :", "input",function(e){self.a = this.input.value * 1;this.changed();});
    document.getElementById("controls").appendChild(this.div);
    */
  }

  this.step = function(world) {
    if(this.dead)
      return;
    this.life++;

    if(typeof this.virus == "object")
      this.virus.step(world, this);

    if(this.waiting>0)
    this.waiting--;
    else
    {
      this.compute_direction();
      this.behaviour(world);
    }
  };

  // Calling custom behaviour.
  this.behaviour = function(world){
    if(typeof this.customBehaviour == "function")
      this.customBehaviour.call(this, world);
  };

  // Render the human
  this.render = function(world){
    if(this.dead)
    {
       world.displayObject("shadows",tombStoneSprite, this.x - 40,this.y-20, 0,0)
       return;
    }
    world.displayObject("shadows",shadowSprite, this.x - 40,this.y-20, 0,0)
    world.displayObject("elements",this.spritesheet, this.x - this.spritesheet.ew/2,this.y-this.spritesheet.eh+10, this.spriteFrame, this.spriteAngle )
    world.ctx.lineWidth="5";
    world.ctx.strokeStyle="#ddd";
    world.ctx.beginPath();
    world.ctx.moveTo(this.x,this.y*this.viewAngle);
    world.ctx.lineTo(this.sxr,this.syr*this.viewAngle);
    world.ctx.stroke();
    world.ctx.fillStyle="#222";
    world.ctx.fillText(this.id+"", this.x+10,this.y*this.viewAngle+10);
    //this.spritesheet.stepx();
  };

  this.checkCollisions = function(world){
    // Compute an array which contains every other humans.
    var others = world.humans.filter(function(other){
      return ( other.id != this.id );
    }, this);

    // Check if it's bumping on one of them.
    var bumpOnSomeone = others.filter(function(other){
      var d = Math.ceil(Math.sqrt(Math.pow(other.x - this.sxr , 2)+Math.pow(other.y - this.syr, 2 )));
      return (d <= this.r )?true:false;
    }, this);

    var bumpOnWalls = world.walls.filter(function(wall){
      return fastIntersection(
        this.x, this.y,
        this.sxr, this.syr,
        wall.a.x, wall.a.y,
        wall.b.x, wall.b.y
      )?true:false;
    }, this);

    return {
      bumping: bumpOnSomeone.length + bumpOnWalls.length,
      others: others,
      bumpOnSomeone: bumpOnSomeone,
      bumpOnWalls: bumpOnWalls
    };

  };

  this.compute_direction = function(){
    /*
    Gives dx & dy, from the angle and speed of the body.
    */
    var comp = deg2rad(100);
    this.dx = /*Math.round*/( Math.cos(this.a)*1.000);
    this.dy = /*Math.round*/( Math.sin(this.a)*1.000);
    this.dxr = this.x + ( this.dx * this.v );
    this.dyr = this.y + ( this.dy * this.v );
    this.sxr = this.x + ( this.dx * this.r );
    this.syr = this.y + ( this.dy * this.r );

    this.spriteAngle = (16-Math.floor((rad2deg(this.a+comp)+180)/360*8))%8;
    this.spriteFrame = this.waiting?4:((this.life>>3) % this.spritesheet.col);

  };

  /*
  Helpers and endpoints
  */

  this.setAngle = function(a){
    this.a = normalizeAngleRad(a);
    this.compute_direction();

  };

  this.addAngle = function(a){
    this.setAngle(this.a + a);
  };

  this.setPos = function(p){
    this.x = p.x;
    this.y = p.y;
    this.compute_direction();
  };

  this.setSpeed = function(v){
    this.v = v;
    this.compute_direction();
  };

  this.changeAngle = function(a){
    this.addAngle(deg2rad(5 * (Math.random()*10>5)?-1:1));
  }

  this.drawControls();
  return this;

}
