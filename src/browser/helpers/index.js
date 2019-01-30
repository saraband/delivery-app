// This helper creates an input handler that needs to be bound
// to the React class component in the constructor
// It returns a promise for more convenience
export const createInputHandler = (args) => function updateInput (event) {
  return new Promise((resolve) => {

    // TODO: Rework this maybe ?
    // TODO: messy, might not work properly
    const stateKey = args && args.stateKey;
    const eventKey = (args && args.eventKey) || 'name';

    // If we need to update the state at a specific
    // place (i.e. somewhere not on top-level state
    if (stateKey !== undefined) {
      this.setState({
        [stateKey]: {
          ...this.state[stateKey],
          [event[eventKey]]: event.value
        }
      }, () => resolve());

    // We update top-level state
    } else {
      this.setState({
        [event[eventKey]]: event.value
      }, () => resolve());
    }
  });
};

// Transforms an hex color into rgb
// e.g. ('#FF0000') => { r: 255, g: 0, b: 0 }
// Thank you stack overflow
export function hexToRgb (hex) {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    console.error(`${hex} is not a valid color.`);
    return;
  }

  let c = hex.substring(1).split('');
  if (c.length === 3) {
    c = [
      c[0], c[0],
      c[1], c[1],
      c[2], c[2]
    ];
  }

  c = '0x' + c.join('');

  return {
    r: (c >> 16) & 255,
    g: (c >> 8) & 255,
    b: c & 255
  };
}

// Transforms an hex color into rgba string
// e.g. ('#FF0000', 0.5) => 'rgba(255, 0, 0, 0.5)'
export function hexToRgbaString (hex, alpha) {
  const c = hexToRgb(hex);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}

const daysMapping = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

export function getCurrentDay () {
  return daysMapping[new Date().getDay()];
}