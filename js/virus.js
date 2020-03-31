var VIRUSCOUNTER = 0;

var VIRUS = function(conf={}){
  this.id = VIRUSCOUNTER++;
  this.life= 0;
  this.activated=conf.activated || true;
  this.killRate=conf.killRate || 10;
  this.spreadRate=conf.spreadRate || 10;
  this.spreadTime=conf.spreadTime || 10;

  this.step=function(world, human){
    if(this.life>this.spreadTime )
    {
      if(uirand(100)<this.killRate+this.spreadRate)
      {
        human.dead = true;
      }
      human.spritesheet = SPRITE.sheets[4];
      this.dies();
    }
    else
    {
      human.spritesheet = SPRITE.sheets[1];
    }
    this.life++;
  };

  this.dies = function(){
    VIRUSCOUNTER--;
    console.log(this.id + " is dead");
    this.spread = function(){};
    this.step = function(){};
  }

  this.spread=function(human){
    if(typeof human.virus == "undefined")
    {
      if(uirand(100)<this.spreadRate)
      {
        human.virus = new VIRUS(
          {
            life: this.life ,
            activated: this,
            killRate: this.killRate ,
            spreadRate: this.spreadRate ,
            spreadTime: this.spreadTime,
          }
        );
        console.log("SPREAD to !" + human.id)
      }
    }
  };
  return this;
}
