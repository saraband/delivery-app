import React, { memo } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import withDropdown from 'HOCS/WithDropDown'
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import { hexToRgbaString } from 'HELPERS';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import { RippleFilling } from 'COMPONENTS/RippleProvider/Ripple';

const Lang = styled(BaseButton).attrs({
  type: ButtonTypes.EMPTY
})`
  color: ${Colors.WHITE};
  font-weight: normal;
  transition: all 0.15s ease-in-out;
  font-size: ${FontSizes.SMALL};
  
  ${RippleFilling} {
    background-color: ${Colors.WHITE} !important;
  }
`;

const LangSelectComponent = () => (
  <Lang>EN</Lang>
);

const LangOptionsContainer = styled.div`
`;
const LangOption = styled.div`
  color: ${Colors.GREY};
  position: relative;
  z-index: 100;
  font-weight: normal;
  font-size: ${FontSizes.SMALL};
  padding: 8px 12px 8px 12px;
  cursor: pointer;
  
  &:hover {
    background-color: ${Colors.LIGHT_BLUE};
    color: ${Colors.WHITE};
  }
`;

const LangSelectDropdown = () => (
  <LangOptionsContainer>
    <LangOption>EN</LangOption>
    <LangOption>FR</LangOption>
    <LangOption>ES</LangOption>
  </LangOptionsContainer>
);

export default compose(
  withDropdown(LangSelectDropdown),
  memo
)(LangSelectComponent);