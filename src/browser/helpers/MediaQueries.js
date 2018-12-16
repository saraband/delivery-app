/*
 *  This is taken from styled-components website
 *  https://www.styled-components.com/docs/advanced#media-templates
 */

import { css } from 'styled-components';

export const Breakpoints = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

export const media = Object.keys(Breakpoints).reduce((acc, key) => {
  acc[label] = (...args) => css`
    @media (max-width: ${Breakpoints[key] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});