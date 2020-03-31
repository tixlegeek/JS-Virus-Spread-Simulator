
var SPRITESHEET = function(src, ew, eh, col, row, ex=0, ey=0){
  this.src = src;
  this.img = document.createElement('img');
  this.loaded = false;

  this.col = col;
  this.row = row;

  this.ex = ex;
  this.ey = ey;

  this.ew = ew;
  this.eh = eh;

  this.setElement=function(x, y){
    this.ex = x;
    this.ey = y;
  }

  this.stepx=function(){
    this.ex = (this.ex +1)%this.col;
  }
  this.stepy=function(){
    this.ey = (this.ey +1)%this.row;
  }

  this.blit=function(screen,x,y){
    screen.drawImage(this.img,
      this.ex*this.ew, this.ey*this.eh,
      this.ew, this.eh,
      x, y,
      this.ew, this.eh);
    }

    this.img.addEventListener('load', function(event) {
      this.loaded=true;
      console.log(this.src + " has been loaded.");
    }.bind(this));
    this.img.src = this.src;
    return this;
  }
  var shadowSprite = new SPRITESHEET("img/shadow.png",70, 49, 1, 1, 0, 0);
  var tombStoneSprite = new SPRITESHEET("img/tombstone.png",70, 49, 1, 1, 0, 0);
  var SPRITES = function(){
    this.sheets=[
      new SPRITESHEET("img/sprite0.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite1.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite2.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite3.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite4.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite5.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite6.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite7.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite8.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite9.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite10.png",75, 75, 8, 8, 0, 0),
      new SPRITESHEET("img/sprite11.png",75, 75, 8, 8, 0, 0),

    ];

    this.isLoaded = function(){
      for(var i in this.sheets)
      {
        if(!this.sheets[i].loaded)
        return false;
      }
      return true;
    }

    return this;
  }

  var SPRITE = new SPRITES();
