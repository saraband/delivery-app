import React from 'react';
import PropTypes from 'prop-types';
import Colors from 'CONSTANTS/Colors';
import { ANIMATION_DURATION } from './Ripple';

export default class RippleProvider extends React.PureComponent {
  constructor (props) {
    super(props);

    this.counter = 1;
    this.state = {
      ripples: {},
      activeRippleId: null
    }
  }

  addRipple = ({
    x,
    y,
    color = Colors.WHITE,
    size = 200
  }) => {
    // We add a ripple where the user clicked
    const rippleId = this.counter++;
    this.setState({
      activeRippleId: rippleId,
      ripples: {
        ...this.state.ripples,
        [rippleId]: {
          x,
          y,
          color,
          size,
          active: true
        }
      }
    })
  }

  deactivateActiveRipple = () => {
    const { activeRippleId, ripples } = this.state;
    if (activeRippleId === null) {
      return;
    }

    // We set the active property of the active ripple to false
    // making it slowly fading away
    this.setState({
      ripples: Object.keys(ripples).reduce((acc, currentId) => {
        if (currentId == activeRippleId) {
          acc[currentId] = {
            ...ripples[currentId],
            active: false
          };
        } else {
          acc[currentId] = ripples[currentId];
        }

        return acc;
      }, {}),
      activeRippleId: null
    });

    // We let the fading animation complete and we remove the
    // ripple when it's totally faded
    setTimeout(() => {
      this.setState({
        ripples: Object.keys(this.state.ripples).reduce((acc, currentId) => {
          if (currentId == activeRippleId) {
            return acc;
          }

          acc[currentId] = this.state.ripples[currentId];
          return acc;
        }, {})
      })
    }, ANIMATION_DURATION * 1000);
  };

  render () {
    return this.props.children({
      ripples: this.state.ripples,
      addRipple: this.addRipple,
      deactivateActiveRipple: this.deactivateActiveRipple
    });
  }
};

RippleProvider.propTypes = {
  children: PropTypes.func.isRequired
};