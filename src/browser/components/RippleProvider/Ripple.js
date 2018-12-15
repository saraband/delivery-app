import React from 'react';
import styled, { css, keyframes } from 'styled-components';

export const ANIMATION_DURATION = 0.5;
const RIPPLE_Z_INDEX = 50;

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
  z-index: ${RIPPLE_Z_INDEX};
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  top: ${p => p.y}px;
  left: ${p => p.x}px;
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
  background-color: ${p => p.color};
  
  /* FADING CSS */
  ${p => !p.active ? RippleFadeCss : ''}
`;

export default class Ripple extends React.PureComponent {
  render () {
    return (
      <StyledRipple {...this.props}>
        <RippleFilling {...this.props} />
      </StyledRipple>
    );
  }
};