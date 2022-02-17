const { RotaryEncoder } = require("./index");

const clkPin = 0;
const dtPin = 1;
const swPin = 2;

pinMode(clkPin, INPUT);
pinMode(dtPin, INPUT);
pinMode(swPin, INPUT_PULLUP);

const encoder = new RotaryEncoder(clkPin, dtPin, swPin);

encoder.on("rotate", (value) => {
  console.log(value);
});

encoder.on("click", () => {
  console.log("click");
});
