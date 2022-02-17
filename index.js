const { EventEmitter } = require("events");

class RotaryEncoder extends EventEmitter {
  constructor(clkPin, dtPin, swPin, options) {
    super();
    this.dt = 0;
    this.clk = 0;
    this.sw = 0;
    options = options || {};
    var onChange = () => {
      var _clk = digitalRead(clkPin);
      var _dt = digitalRead(dtPin);
      if (this.dt !== _dt || this.clk !== _clk) {
        if (this.dt === LOW && _dt === HIGH) {
          var val = this.clk * 2 - 1;
          this.emit("rotate", val);
        }
      }
      this.clk = _clk;
      this.dt = _dt;
    };
    this.clkId = setWatch(onChange, clkPin, CHANGE);
    this.dtId = setWatch(onChange, dtPin, CHANGE);
    if (typeof swPin === "number") {
      this.swId = setWatch(
        () => {
          this.emit("click");
        },
        swPin,
        FALLING,
        10
      );
    }
  }

  close() {
    clearWatch(this.clkId);
    clearWatch(this.dtId);
    if (this.swId) clearWatch(this.swId);
  }
}

exports.RotaryEncoder = RotaryEncoder;
