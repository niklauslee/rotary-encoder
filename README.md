# Rotary Encoder

Kaluma library for rotary encoder with a push switch (KY-040)

# Wiring

Here is a wiring example.

| Raspberry Pi Pico | Rotary Encoder | 
| ----------------- | -------------- |
| 3V3               | +              |
| GND               | GND            |
| GP0               | CLK            |
| GP1               | DT             |
| GP2               | SW             |

# Install

```sh
npm install https://github.com/niklauslee/rotary-encoder
```

# Usage

```js
const {RotaryEncoder} = require('rotary-encoder');

const clkPin = 0;
const dtPin = 1;
const swPin = 2;

pinMode(clkPin, INPUT); // external pull-up.
pinMode(dtPin, INPUT); // external pull-up.
pinMode(swPin, INPUT_PULLUP); // interal pull-up.

const encoder = new RotaryEncoder(clkPin, dtPin, swPin);

encoder.on('rotate', (value) => {
  console.log(value);
});

encoder.on('click', () => {
  console.log('click');
});
```

# API
 
## Class: RotaryEncoder
 
A class encapulating a rotary encoder.
 
### new RotaryEncoder(clkPin, dtPin[, swPin])
 
Create an instance of RotaryEncoder class. You have to set pin mode before creating an instance.

- **`clkPin`** `<number>` Pin number of CLK.
- **`dtPin`** `<number>` Pin number of DT.
- **`swPin`** `<number>` Pin number of SW (switch).

### encoder.close()

Close the rotary encoder. It closes all watchers and timer for detecting signal changes of the encoder.

### Event: 'rotate'

- **`value`** `1` when rotates clockwise, `-1` when rotates anti-clockwise.

Emitted when the rotary encoder rotates.

### Event: 'click'

Emitted when the switch is pressed.
