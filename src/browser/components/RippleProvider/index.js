/**
 * Render props component that adds water ripple effects
 * to a component (e.g. on clicking on a button)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Colors from 'CONSTANTS/Colors';
import { ANIMATION_DURATION } from './Ripple';

export default class RippleProvider extends React.PureComponent {
  constructor (props) {
    super(props);

    this.counter = 1;
    this.deactivateRippleTimeouts = {};
    this.state = {
      ripples: {},
      activeRippleId: null
    }
  }

  componentWillUnmount () {
    // We clear all the timeouts to avoid changing state
    // of an unmounted component
    Object.keys(this.deactivateRippleTimeouts).forEach((id) => {
      clearTimeout(this.deactivateRippleTimeouts[id]);
    });
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
    const {
      activeRippleId,
      ripples
    } = this.state;

    // No ripple is active, don't do anything
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
    // + store the timeout so if the component unmounts
    // we can clear it before it setState onto an unmounted component
    this.deactivateRippleTimeouts[activeRippleId] = setTimeout(() => {
      this.setState({
        ripples: Object.keys(this.state.ripples).reduce((acc, currentId) => {

          // weak equal is necessary here
          if (currentId == activeRippleId) {
            return acc;
          }

          acc[currentId] = this.state.ripples[currentId];
          return acc;
        }, {})

      // Ripples state has been cleaned up
      // We resolve the promise and clean up the cancel fn
      // Since it doesn't need to be canceled anymore
        // TODO: check if the deactivateRippleTimeouts[activeRippleId] key doesnt
        // TODO: make a memory leak
      });
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
