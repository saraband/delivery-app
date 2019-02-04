import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import RippleProvider from 'COMPONENTS/RippleProvider';
import { hexToRgb, hexToRgbaString } from 'HELPERS';

// TODO: this is redundant
const blueRgb = hexToRgb(Colors.BLUE);
const Container = styled.li`
  padding: 10px;
  font-size: ${FontSizes.MEDIUM};
  color: ${Colors.BLACK};
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  
  /* native focus */
  &:focus,
  &:active {
    border-color: ${Colors.DARK_GREY};
    box-shadow: 0 0 0px 3px rgba(${blueRgb.r}, ${blueRgb.g}, ${blueRgb.b}, 0.3);
    outline: 0;
    background-color: ${hexToRgbaString(Colors.BLUE, 0.2)};
  }
`;

const Tag = ({
  value,
  children,
  onSelect
}) => (
  <Container
    tabIndex={0}
    onClick={onSelect}
    onKeyPress={({ key }) => key === 'Enter' && onSelect()}
    >
    {children}
  </Container>
);

Tag.propTypes = {
  onSelect: PropTypes.func
};

export default memo(Tag);
