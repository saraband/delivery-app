// This helper creates an input handler that needs to be bound
// to the React class component in the constructor
// It returns a promise for more convenience
export const createInputHandler = (args) => function updateInput (event) {
  return new Promise((resolve) => {

    // TODO: Rework this maybe ?
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