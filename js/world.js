var WORLD = function(canvas, conf={}){
  this.canvas = canvas;
  this.humans = [];
  // Timing
  this.start = null;

  this.frameDuration = 1000 / (conf.fps || 24);
  this.walls = conf.walls || [];
  this.boardColor = conf.boardColor || "#aaa";
  this.viewAngle = conf.viewAngle || 1;

  this.displayStack = {};

  this.ctx = this.canvas.getContext("2d");
  this.ctx.fillStyle = "#222";
  this.ctx.fillRect(0, 0, this.canvas.width,  this.canvas.height);
  this.ctx.lineCap = "round";
  this.ctx.lineJoin = 'miter';
  this.ctx.miterLimit = 2; // fiddle around until u find the miterLimit that looks best to you.

  // Handle clicks.
  this.canvas.addEventListener('mousedown', function(e){

  }.bind(this));

  // Handle mouseUp.
  this.canvas.addEventListener('mouseup', function(e){

  }.bind(this));

  // Handle dragging
  this.canvas.addEventListener('mousemove', function(e){
    var rect = this.canvas.getBoundingClientRect();
    var x = (e.clientX - rect.left) * this.canvas.width / this.canvas.clientWidth;
    var y = (e.clientY - rect.top) * this.canvas.height / this.canvas.clientHeight;
  }.bind(this));

  this.clear = function(){
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width,  this.canvas.height);
  }

  this.step = function(delta){
    // COmputes the delta time
    if (!this.start) this.start = delta;
    var progress = delta - this.start;

    // Steps all humans.
    for(var i in this.humans)
    {
      this.humans[i].step(this);
    }

    // if in frame, renders everything.
    if(progress>this.frameDuration){
      this.render();
      this.start = delta;
    }

    requestAnimationFrame(this.step.bind(this));
  }
  // The renderer makes a pass, draw some things on the canvas, and call for the next rendering.
  this.render = function (){
    this.clear();
    // Renders the walls.
    this.ctx.beginPath();
    this.ctx.lineWidth="10";
    this.ctx.strokeStyle = "#f00";
    var walls = this.walls;
    for( i in walls )
    {
      if(typeof walls[i].color !=="undefined" )
      {
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.strokeStyle = walls[i].color;
        this.ctx.beginPath();
      }
      this.ctx.moveTo(walls[i].a.x,walls[i].a.y*this.viewAngle);
      this.ctx.lineTo(walls[i].b.x,walls[i].b.y*this.viewAngle);

    }
    this.ctx.stroke();
    this.ctx.closePath();

    // Renders humans
    for(var i in this.humans)
    {
      this.humans[i].render(this);
    }

    // Display all sprites
    for(var i in this.displayStack)
    {
      // Z-index calibration
      this.displayStack[i].sort(zbuffSort());
      for(var j in this.displayStack[i])
      {
        var dobject = this.displayStack[i][j];
        if(dobject.spritesheet.loaded)
        {
          dobject.spritesheet.setElement(dobject.col, dobject.row);
          dobject.spritesheet.blit(this.ctx, dobject.x, dobject.y*this.viewAngle);
        }
      }
    }

    // Remove all sprites
    this.displayStack=[];
  }

  // Add a sprite to the stack (to be displayed after z-index calibration)
  this.displayObject = function(bank, spritesheet, x, y, col, row){
    if(!this.displayStack[bank])
    this.displayStack[bank]=[];
    this.displayStack[bank].push({spritesheet: spritesheet, x: x, y: y, col: col, row: row});
  }
  this.createNewRobot = function(x, y, conf){
    var human = new HUMAN( x, y,conf);
    this.humans.push(human);
    return human;
  };

  return this;
}
