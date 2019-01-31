/**
 * Miscellaneous styled components
 */

import styled, { css } from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${p => p.direction || 'initial'};
  justify-content: ${p => p.justify || 'initial'};
  align-items: ${p => p.align || 'initial'};
`;

export const NoSelect = css`
  -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
`;

export const BoxShadow = css`
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.12);
`;