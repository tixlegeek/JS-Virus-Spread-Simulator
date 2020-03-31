// This canvas will display the interference pattern
var canvas =  document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
/*
// Create global controls.
new CONTROL(globalControlScope,"range",globalControlScope.rate, { 'max':1,'min':-1, 'step':.01},"globalControlScope.rate","Animation Rate:", "input",function(e){globalControlScope.rate = this.value*1;this.changed();});
new CONTROL(globalControlScope,"checkbox",globalControlScope.drawNullPattern, {},"globalControlScope.drawNullPattern","Draw Null Pattern :", "click",function(e){globalControlScope.drawNullPattern = this.value = this.input.checked;this.changed();});
new CONTROL(globalControlScope,"range",globalControlScope.nullPatternWidth, { 'max':20,'min':1, 'step':.01},"globalControlScope.drawNullPatternTrigz","Null Pattern width :", "input",function(e){globalControlScope.nullPatternWidth = this.value*1;this.changed();});
*/

// Create the canvas obj.
var wda = 900;
var world = new WORLD(canvas,
  {
    frameDuration: 100,
    walls: [
      {
        a:{x: 100, y: 100},
        b:{x: 500, y: 100},
        color:"#fff",
      },
      {
        a:{x: 100, y: 100},
        b:{x: 100, y: 500},
        color:"#fff",
      },
      {
        a:{x: 100, y: 500},
        b:{x: 200, y: 500},
        color:"#fff",
      },
      {
        a:{x: 500, y: 500},
        b:{x: 300, y: 500},
        color:"#fff",
      },
      {
        a:{x: 500, y: 100},
        b:{x: 500, y: 500},
        color:"#fff",
      },
      {
        a:{x: 100 + wda, y: 100},
        b:{x: 500 + wda, y: 100},
        color:"#f00",
      },
      {
        a:{x: 100 + wda, y: 100},
        b:{x: 100 + wda, y: 500},
        color:"#f00",
      },
      {
        a:{x: 100 + wda, y: 500},
        b:{x: 200 + wda, y: 500},
        color:"#f00",
      },
      {
        a:{x: 500 + wda, y: 500},
        b:{x: 300 + wda, y: 500},
        color:"#f00",
      },
      {
        a:{x: 500 + wda, y: 100},
        b:{x: 500 + wda, y: 500},
        color:"#f00",
      },
      {
        a:{x: 50, y: 50},
        b:{x: 50, y: this.canvas.height - 50},
        color:"#000",
      },
      {
        a:{x: 50, y: this.canvas.height - 50},
        b:{x: this.canvas.width - 50, y: this.canvas.height - 50},
        color:"#000",
      },
      {
        a:{x: this.canvas.width - 50, y: this.canvas.height - 50},
        b:{x: this.canvas.width - 50, y: 50},
        color:"#000",
      },
      {
        a:{x: this.canvas.width - 50, y: 50},
        b:{x: 50, y: 50},
        color:"#000",
      }
    ],
    boardColor: "#ddd",
    viewAngle: 1,
  }
);
// Create n humans.
for(var i = 0; i< DEFAULT.nHumans; i++){
  // Create random coordinates inside the boundaries set by borderSize
  var x = DEFAULT.borderSize + uirand(this.canvas.width-(DEFAULT.borderSize<<1));
  var y = DEFAULT.borderSize + uirand(this.canvas.height-(DEFAULT.borderSize<<1));
  world.createNewRobot(x, y,
    {
      a:   uirand(600)/100,
      v: uirand(3),
      r: 30,
      clan: 0,
      spritesheet: SPRITE.sheets[0],
      health:100,
      behaviour: HUMAN_DEFAULT_BEHAVIOUR,
    }
  );
}
world.humans[0].virus=new VIRUS(
  {
    life: 0,
    activated: false,
    killRate: 10,
    spreadRate: 10,
    spreadTime: 1000,
  }
);

// start rendering.
world.step(0);
