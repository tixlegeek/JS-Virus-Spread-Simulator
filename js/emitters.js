
  var EMITTER = function(x,y,step, phase=0, f=100, a=50, active=false){
    // set default value to highlight
    let hightlightStatus = true;

    this.x = x;           // x position of the emitter on the canvas.
    this.y = y;           // y position of the emitter on the canvas.

    this.f = f;           // Frequency
    this.a = a;           // Amplitude
    this.phase = phase;   // Phase
    this.step = step;     // Callback (not used for now)
    this.d = 0;           // Used in rendering. It stores the d value when rasterizing the interferences
    this.hl = false;      // Is the emitter selected?
    this.animate = false; // Is the emitter animated?
    this.checked = active;// Is the emitter activated?

    this.checkedinput=document.createElement("INPUT");  // DOM Input tweaking emitter's checkbox
    this.animateinput=document.createElement("INPUT");  // DOM Input tweaking emitter's animation state

    this.ainput=document.createElement("INPUT");        // DOM Input tweaking emitter's amplitude value
    this.adiv=document.createElement("DIV");            // DOM Div containing amplitude control.

    this.finput=document.createElement("INPUT");        // DOM Input tweaking emitter's frequency value
    this.fdiv=document.createElement("DIV");            // DOM Div containing frequency control.

    this.pinput=document.createElement("INPUT");        // DOM Input tweaking emitter's phase value
    this.pdiv=document.createElement("DIV");            // DOM Div containing phase control.

    this.div=document.createElement("DIV");             // DOM Div containing the controls

    // Draws emitter's controls
    this.drawControls = function(){
      var self=this;
      this.div.classList.add("rangeCombo");
      new CONTROL(this,"checkbox",this.checked, {},"active","Activate :", "click",function(e){self.checked = this.value = this.input.checked;this.changed();});
      new CONTROL(this,"checkbox",this.animate, {},"animate","Animated :", "click",function(e){self.animate = this.value = this.input.checked;this.changed();});
      new CONTROL(this,"range",this.f, {max:500, min:1, step:0.5},"f","Frequency :", "input",function(e){self.f = this.input.value * 1;this.changed();});
      new CONTROL(this,"range",this.phase, {max:2*Math.PI*100, min:0, step:0.05},"phase","Phase :", "input",function(e){self.phase = this.input.value * 1;this.changed();});
      new CONTROL(this,"range",this.a, {max:100, min:0, step:1},"a","Amplification :", "input",function(e){self.a = this.input.value * 1;this.changed();});
      document.getElementById("controls").appendChild(this.div);
    }

    // Highlights the control oh the emitter.
    this.highlight = function(hightlightStatus){
      this.hl = hightlightStatus|false;
      if(hightlightStatus)
      this.div.classList.add("selectedCombo");
      else
      this.div.classList.remove("selectedCombo");
    }

    // Create and apply controls to the page.
    this.drawControls();
    return this;
  }
