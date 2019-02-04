import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import PropTypes from 'prop-types';
import { withRipples } from 'HOCS';
import Ripple from 'COMPONENTS/RippleProvider/Ripple';
import nullFunction from 'MISC/NullFunction';
import { hexToRgb, hexToRgbaString } from 'HELPERS';

export const ButtonTypes = {
  EMPTY: Symbol(),
  BORDERED: Symbol(),
  FULL: Symbol()
};

export const TextContainer = styled.div`
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  transition: all 0.15s ease-in-out;
  width: 100%;
  height: 100%;
  padding: 8px 12px 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/*
  OLD SHADOW :active / :focus
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
*/

const blueRgb = hexToRgb(Colors.BLUE);
const StyledButton = styled.button`
  border-radius: ${p => p.round ? '100%' : '5px'};
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${FontSizes.NORMAL};
  transition: all 0.15s ease-in-out;
  position: relative;
  overflow: hidden;
  font-family: Roboto, Arial; // TODO: why doesnt this work ffs
  font-weight: 300;
  text-transform: uppercase;
  
  /* BACKGROUND COLOR */
  background-color: ${p => p.buttonType === ButtonTypes.FULL
    ? p.color
    : 'transparent'
  };
  
  /* BORDER */
  ${p => p.buttonType === ButtonTypes.BORDERED
    ? 'border: 1px solid ' + hexToRgbaString(p.color, 0.2) + ';'
    : 'border: 0;'
  };
  
  /* FONT COLOR */
  color: ${p => p.buttonType === ButtonTypes.FULL
    ? Colors.WHITE
    : p.color
  };
 
  /* BOX SHADOW AND TEXT-SHADOW */
  ${p => p.buttonType === ButtonTypes.FULL
    ? `
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
      text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
    `
    : ''
  };
  
  &:focus,
  &:active {
    outline: 0;
    box-shadow: 0 0 0px 3px rgba(${blueRgb.r}, ${blueRgb.g}, ${blueRgb.b}, 0.3);
  }

  &:hover {
    ${TextContainer} {
      background-color: rgba(0, 0, 0, ${p => p.buttonType === ButtonTypes.FULL
        ? '0.1'
        : '0.04'
      });
    }
  }
  
  &:disabled {
    filter: grayscale(100%);
    opacity: 0.5;
    
    &:hover {
      cursor: not-allowed;
      ${TextContainer} {
        background-color: unset;
      }
    }
    
    &:active {
      box-shadow: unset;
    }
  }
`;


class BaseButton extends React.PureComponent {
  constructor (props) {
    super(props);
    this.ref = React.createRef();
    this.size = 200;
  }

  componentDidMount () {
    // We store the maximum distance inside the button (which is the diagonal)
    // so we can create ripples large enough
    const { width, height } = this.ref.current.getBoundingClientRect();
    this.size = Math.sqrt(width * width + height * height);

    // If the parent of the button needs it ref, we pass it
    if (this.props.retrieveRef) {
      this.props.retrieveRef(this.ref.current);
    }
  }

  handleMouseDown = (event) => {
    const disabled = false; // TODO: compute disabled
    if (disabled) {
      return;
    }

    // We calculate the relative pos of the mouse
    this.props.onMouseDown(event);
    let x, y;
    const bounds = this.ref.current.getBoundingClientRect();

    // Round button, add the ripple at the center
    if (this.props.round) {
      x = bounds.width / 2;
      y = bounds.height / 2;
    } else {
      x = event.clientX - bounds.left;
      y = event.clientY - bounds.top;
    }

    // We add a ripple there
    this.props.addRipple({
      x,
      y,
      color: this.props.type === ButtonTypes.FULL
        ? Colors.WHITE
        : this.props.color,
      size: this.size * 2
    })
  };

  handleMouseOut = (event) => {
    this.props.onMouseOut(event);

    /* check if the mouseout event is not triggered by a child of the button */
    if (!this.ref.current.contains(event.relatedTarget)) {
      this.props.deactivateActiveRipple();
    }
  };

  handleMouseUp = (event) => {
    this.props.onMouseUp(event);
    this.props.deactivateActiveRipple();
  };

  render () {
    const {
      // We don't wanna pass down these props
      // so we extract them here
      retrieveRef,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      ripples,
      addRipple,
      deactivateActiveRipple,

      children,
      icon,
      type,
      color,
      ...rest
    } = this.props;

    return (
      <StyledButton
        ref={this.ref}
        onMouseDown={this.handleMouseDown}
        onMouseOut={this.handleMouseOut}
        onMouseUp={this.handleMouseUp}
        buttonType={type}
        color={color}
        {...rest}
        >

        {/* We render there the ripples */}
        {Object.keys(ripples).map((rId) => (
          <Ripple
            key={rId}
            {...ripples[rId]}
            />
        ))}

        <TextContainer>
          {icon}
          {children}
        </TextContainer>
      </StyledButton>
    );
  }
};

BaseButton.propTypes = {
  onMouseDown: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseUp: PropTypes.func,
  type: PropTypes.symbol,
  color: PropTypes.string,
  icon: PropTypes.any,
  round: PropTypes.bool
};

BaseButton.defaultProps = {
  onMouseDown: nullFunction,
  onMouseOut: nullFunction,
  onMouseUp: nullFunction,
  type: ButtonTypes.BORDERED,
  color: Colors.BLUE,
  icon: null,
  round: false
};

export default withRipples(BaseButton);
