/*
    Control object. This method will create and bind a control to
    an object's value.
*/
var CONTROL = function(parent, type="range", def=0, args={}, name="value", text="Control:", eventId, callback)
{
  this.type = type;         // Control type ( range/checkbox )
  this.parent = parent;     // Parent of the control. must contain Name as value
  this.args = args;         // Arguments used by the control
  this.name = name;         // Name of the binded value.
  this.text = text;         // Text to be displayed.
  this.value=def;           // Value

  this.eventId = eventId;   // eventId triggering the callback.
  this.callback = callback; // Callback, triggered on enventId.

  this.input = document.createElement("INPUT"); // DOM Input manipulated by the user
  this.mon = document.createElement("INPUT");   // DOM Input monitoring the value
  this.div=document.createElement("DIV");       // DOM Div, which contains everything
  this.label=document.createElement("LABEL");   // DOM Label, used to display the control name.

  // Show and hide the control
  this.switchVisibility = (elem) => {
    if (elem.input.checked) {
      this.parent.div.classList.add('active')
    } else if (!elem.input.checked && elem.name === 'active') {
      this.parent.div.classList.remove('active')
    }
  }

  // Updates the control value when changed.
  this.changed = function(){
    switch (this.type) {
      case 'checkbox':
        this.value = this.input.checked?"true":"false";
        this.mon.value = this.value;
        if (this.name == 'active') {
          this.switchVisibility(this);
        }
      break;
      default:
        this.value = this.input.value;
        this.mon.value = this.value;
      break;
    }
  };

  // Draw the control on parent.div
  this.draw = function(){

    this.div.classList.add("inputCombo");
    // Setup the monitor input
    this.mon.setAttribute("type", "text");
    this.mon.setAttribute("name", this.name+"_mon");
    this.mon.value = this.value;
    this.mon.classList.add("mon_input");
    // Setup the label
    this.label.setAttribute("for", this.name);
    this.label.innerHTML = this.text;

    switch (this.type) {
      case "range":
        // Setup the range input
        this.input.setAttribute("type", "range");
        this.input.setAttribute("name", this.name);
        this.input.setAttribute("max", this.args.max || 100);
        this.input.setAttribute("min", this.args.min || 0);
        this.input.setAttribute("step", this.args.step || 1);
        this.input.value = this.value;
        // Callback of the input
        this.input.addEventListener(this.eventId, callback.bind(this));
        // update the slider from mon input.
        this.mon.addEventListener("keyup", function(e){ this.parent[this.name] = this.input.value = this.mon.value;this.changed(); }.bind(this));
        // Fills the div with created elements
        this.div.appendChild(this.label);
        this.div.appendChild(this.input);
        this.div.appendChild(this.mon);
      break;
      case "checkbox":
        // Setup the checkbox input
        this.input.setAttribute("type", "checkbox");
        this.input.setAttribute("name", this.name);
        this.input.checked = (this.value==false)?false:true;
        // Callback of the input
        this.input.addEventListener(this.eventId, callback.bind(this));
        // Fills the div with created elements
        this.div.appendChild(this.label);
        this.div.appendChild(this.input);
        this.switchVisibility(this);
      break;
      default:
    }


  }
  // Draws and apply the control to the parent.
  this.draw();
  if(this.parent.div)
    this.parent.div.appendChild(this.div);
  return this;
};
