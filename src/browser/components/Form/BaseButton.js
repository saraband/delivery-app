import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import PropTypes from 'prop-types';
import RippleProvider from 'COMPONENTS/RippleProvider';
import Ripple from 'COMPONENTS/RippleProvider/Ripple';
import nullFunction from 'MISC/NullFunction';

export const ButtonTypes = {
  EMPTY: Symbol(),
  BORDERED: Symbol(),
  FULL: Symbol()
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
  background-color: ${p => p.buttonType === ButtonTypes.FULL
    ? p.color
    : 'transparent'
  };
  
  /* BORDER */
  ${p => p.buttonType === ButtonTypes.BORDERED
    ? 'border: 1px solid ' + p.color + ';'
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
  }
  
  /* ACTIVE EFFECT */
  ${p => p.buttonType === ButtonTypes.FULL
    ? `
      &:active {
        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      }
    `
    : ''
  };
  

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
    
    &:hover { /* TODO: do here */
      opacity: unset;
      cursor: not-allowed;
    }
  }
`;


export default class BaseButton extends React.PureComponent {
  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    // We store the maximum size of
    // the button, so we can create ripples large enough
    const bounds = this.ref.current.getBoundingClientRect();
    this.size = bounds.width > bounds.height
      ? bounds.width * 2
      : bounds.height * 2;
  }

  handleMouseDown = (event, addRipple) => {
    // We calculate the relative pos of the mouse
    this.props.onMouseDown(event);
    const bounds = this.ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    // We add a ripple there
    addRipple({
      x,
      y,
      color: this.props.type === ButtonTypes.FULL
        ? Colors.WHITE
        : this.props.color,
      size: this.size || 200
    })
  };

  handleMouseOut = (event, deactivateActiveRipple) => {
    this.props.onMouseOut(event);
    deactivateActiveRipple();
  };

  handleMouseUp = (event, deactivateActiveRipple) => {
    this.props.onMouseUp(event);
    deactivateActiveRipple();
  };

  render () {
    const {
      // We don't wanna pass down these props
      // so we extract them here
      onMouseDown,
      onMouseUp,
      onMouseOut,
      children,
      icon,
      type,
      color,
      ...rest
    } = this.props;

    return (
      <RippleProvider>
        {({ ripples, addRipple, deactivateActiveRipple }) => (
          <StyledButton
            ref={this.ref}
            onMouseDown={() => this.handleMouseDown(event, addRipple)}
            onMouseOut={() => this.handleMouseOut(event, deactivateActiveRipple)}
            onMouseUp={() => this.handleMouseUp(event, deactivateActiveRipple)}
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
        )}
      </RippleProvider>
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
};

BaseButton.defaultProps = {
  onMouseDown: nullFunction,
  onMouseOut: nullFunction,
  onMouseUp: nullFunction,
  type: ButtonTypes.BORDERED,
  color: Colors.BLACK,
  icon: null
};