import React from 'react';
import styled, { keyframes } from 'styled-components';
import Colors from '../constants/Colors';

const RotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
    clip-path: polygon(0% 0%, 0% 100%, 50% 100%, 50% 50%, 100% 50%, 100% 0%);
  } to {
    transform: rotate(359deg);
  }
`;

const StyledLoader = styled.div`
  border: ${p => Math.ceil(p.size / 8)}px solid ${Colors.BLUE};
  border-radius: 100%;
  clip-path: polygon(0% 0%, 0% 100%, 50% 100%, 50% 50%, 100% 50%, 100% 0%);
  animation ${RotateKeyframes} 2s ease-in-out infinite;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
`;

export default ({ size = 50 }) => <StyledLoader size={size} />;