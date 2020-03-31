var VIRUSCOUNTER = 0;

var VIRUS = function(conf={}){
  this.id = VIRUSCOUNTER++;
  this.life= 0;
  this.activated=conf.activated || true;
  this.killRate=conf.killRate || 10;
  this.spreadRate=conf.spreadRate || 10;
  this.spreadTime=conf.spreadTime || 10;
  this.mutationRate=conf.mutationRate || 100;
  this.hasMutated=false;
  this.face = conf.face || 2;
  this.step=function(world, human){
    if(this.life>this.spreadTime )
    {
      if(uirand(100)<this.killRate+this.spreadRate)
      {
        human.dead = true;
      }
      human.spritesheet = SPRITE.sheets[1];
      this.dies();
    }
    else
    {
      human.spritesheet = SPRITE.sheets[this.face];
    }
    this.life++;
  };

  this.dies = function(){
    VIRUSCOUNTER--;
    console.log(this.id + " is dead");
    this.spread = function(){};
    this.step = function(){};
  }

  this.mutate = function(){
    this.killRate += ((uirand(100)-50)/100);
    this.spreadRate += ((uirand(100)-50)/100);
    this.spreadTime += (uirand(100)-50);
    this.mutationRate += ((uirand(100)-50)/100);
    this.face++;
    if(this.face>=32)
    this.face=2;
    this.hasMutated=true;
  }

  this.spread=function(human){
    if(typeof human.virus == "undefined")
    {
      if(uirand(100)<this.spreadRate)
      {
        if(!this.hasMutated)
        if(uirand(100)<this.mutationRate)
        {
          this.mutate();
        }
        human.virus = new VIRUS(
          {
            life: this.life ,
            killRate: this.killRate ,
            spreadRate: this.spreadRate ,
            spreadTime: this.spreadTime ,
            face: this.face ,
          }
        );
        console.log("SPREAD to !" + human.id)
      }
    }
  };
  return this;
}
