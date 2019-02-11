import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import { hexToRgb, hexToRgbaString } from 'HELPERS';

// TODO: this is redundant
const LightBlue = hexToRgbaString(Colors.BLUE, 0.1);
const Container = styled.li`
  padding: 10px;
  font-size: ${FontSizes.NORMAL};
  color: ${Colors.DARK_BLUE_2};
  cursor: pointer;
  
  &:hover,
  &:focus {
    background-color: ${LightBlue};
  }
  
  /* selected tag */
  ${p => p.selected
    ? `
        background-color: ${LightBlue};
        color: ${Colors.BLUE};
      `
    : ''
  }
`;

const Tag = ({
  value,
  children,
  selected,
  onSelect
}) => (
  <Container
    tabIndex={0}
    onClick={onSelect}
    selected={selected}
    onKeyPress={({ key }) => key === 'Enter' && onSelect()}
    >
    {children}
  </Container>
);

Tag.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.bool
};

export default memo(Tag);
