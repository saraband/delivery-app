import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import PropTypes from 'prop-types';
import nullFunction from 'MISC/NullFunction'
import { hexToRgb } from '../../helpers';

export const ButtonTypes = {
  EMPTY: 0,
  BORDERED: 1,
  FULL: 2
};

const TextContainer = styled.div`
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  transition: all 0.25s ease-in-out;
  width: 100%;
  height: 100%;
  padding: 8px 12px 8px 12px;
`;

const StyledButton = styled.button`
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${FontSizes.MEDIUM};
  transition: all 0.25s ease-in-out;
  position: relative;
  overflow: hidden;
  font-family: Roboto, Arial; // TODO: why doesnt this work ffs
  font-weight: 300;
  text-transform: uppercase;
  
  /* BACKGROUND COLOR */
  background-color: ${p => p.type === ButtonTypes.FULL
    ? p.color
    : 'transparent'
  };
  
  /* BORDER */
  ${p => p.type === ButtonTypes.BORDERED
    ? 'border: 1px solid ' + p.color + ';'
    : 'border: 0;'
  };
  
  /* FONT COLOR */
  color: ${p => p.type === ButtonTypes.FULL
    ? Colors.WHITE
    : p.color
  };
 
  /* BOX SHADOW AND TEXT-SHADOW */
  ${p => p.type === ButtonTypes.FULL
    ? `
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
      text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
    `
    : ''
  };
  
  &:focus,
  &:active {
    outline: 0;
  }
  
  /* ACTIVE EFFECT */
  ${p => p.type === ButtonTypes.FULL
    ? `
      &:active {
        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      }
    `
    : ''
  };
  

  &:hover {
    ${TextContainer} {
      background-color: rgba(0, 0, 0, ${p => p.type === ButtonTypes.FULL
        ? '0.1'
        : '0.04'
      });
    }
  }
  
  &:disabled {
    filter: grayscale(100%);
    
    &:hover { /* TODO: do here */
      opacity: unset;
      cursor: not-allowed;
    }
  }
`;

const RIPPLE_SIZE = 200;
const ANIMATION_DURATION = 0.5;

const RippleAnimation = keyframes`
  from {
    transform: translate3d(-50%, -50%, 0) scale(0);
  } to {
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
`;

const StyledRipple = styled.div`
  border-radius: 100%;
  position: absolute;
  width: ${RIPPLE_SIZE}px;
  height: ${RIPPLE_SIZE}px;
  top: ${p => p.top}px;
  left: ${p => p.left}px;
  transition: all 1s ease-out;
  transform-origin: 50% 50%;
  transform: translate3d(-50%, -50%, 0);
  overflow: hidden;
  opacity: 0.3;
  animation: ${RippleAnimation} ${ANIMATION_DURATION}s forwards ease-out};
`;

const FadeAnimation = keyframes`
  to {
    opacity: 0;
  }
`;

const RippleFadeCss = css`
  animation: ${FadeAnimation} ${ANIMATION_DURATION}s forwards ease-out;
`;

const RippleFilling = styled.div`
  width: 100%;
  height: 100%;
  opacity: 1;
  
  /* FILLING COLOR */
  background-color: ${p => p.type === ButtonTypes.FULL
    ? Colors.WHITE
    : p.color
  };
  
  /* FADING CSS */
  ${p => !p.active ? RippleFadeCss : ''}
`;

function Ripple (props) {
  return (
    <StyledRipple {...props}>
      <RippleFilling {...props} />
    </StyledRipple>
  );
}

export default class BaseButton extends React.PureComponent {
  constructor (props) {
    super(props);

    this.ref = React.createRef();
    this.counter = 1;
    this.state = {
      ripples: {},
      activeRippleId: null
    }
  }

  handleMouseDown = (event) => {
    // We calculate the relative pos of the mouse
    this.props.onMouseDown(event);
    const bounds = this.ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    // We add a ripple where the user clicked
    const rippleId = this.counter++;
    this.setState({
      activeRippleId: rippleId,
      ripples: {
        ...this.state.ripples,
        [rippleId]: {
          x,
          y,
          active: true
        }
      }
    })
  };

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

  handleMouseUp = (event) => {
    this.props.onMouseUp(event);
    this.deactivateActiveRipple();
  };

  handleMouseOut = (event) => {
    this.props.onMouseOut(event);
    this.deactivateActiveRipple();
  };

  render () {
    const {
      // We don't wanna pass down these props
      // so we extract them here
      children,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      type,
      color,
      ...rest
    } = this.props;
    const { ripples, activeRippleId } = this.state;

    return (
      <StyledButton
        onMouseDown={this.handleMouseDown}
        onMouseOut={this.handleMouseOut}
        onMouseUp={this.handleMouseUp}
        ref={this.ref}
        type={type}
        color={color}
        {...rest}
        >

        {/* We render the ripples */}
        {Object.keys(ripples).map(rId => (
          <Ripple
            key={rId}
            top={ripples[rId].y}
            left={ripples[rId].x}
            active={ripples[rId].active}
            color={color}
            type={type}
            />
        ))}
        <TextContainer>
          {this.props.children}
        </TextContainer>
      </StyledButton>
    );
  }
};

BaseButton.propTypes = {
  onMouseDown: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseUp: PropTypes.func,
  type: PropTypes.number,
  color: PropTypes.string
};

BaseButton.defaultProps = {
  onMouseDown: nullFunction,
  onMouseOut: nullFunction,
  onMouseUp: nullFunction,
  type: ButtonTypes.BORDERED,
  color: Colors.BLACK
};