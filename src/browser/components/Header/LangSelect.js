import React, { memo } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import withDropdown from 'HOCS/WithDropDown'
import Colors from 'CONSTANTS/Colors';

const Lang = styled.h5`
  color: ${Colors.WHITE};
  font-weight: normal;
  border: 1px solid red;
  padding: 10px;
  transition: all 0.15s ease-in-out;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LangSelectComponent = () => (
  <Lang>EN</Lang>
);

const LangSelectDropdown = () => (
  <p>Dropdown</p>
);

const apply = compose(
  withDropdown(LangSelectDropdown),
  memo
);

export default apply(LangSelectComponent);