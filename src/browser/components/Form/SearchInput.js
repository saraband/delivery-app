import React from 'react';
import styled from 'styled-components';
import { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import BaseButton from 'COMPONENTS/Form/BaseButton';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import SearchIcon from 'ICONS/SearchIcon';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 350px;
  position: relative;
`;
const StyledInput = styled(BaseInput).attrs({
  inputStyle: `
    border-radius: 3px 0 0 3px;
  `
})`
  flex-grow: 1;
  width: unset;
`;

const StyledButton = styled(BaseButton).attrs({
  icon: <SearchIcon height={FontSizes.MEDIUM} />
})`
  border-radius: 0 3px 3px 0;
  border: 1px solid ${Colors.BLUE};
  border-left: 0;
  box-shadow: unset;
  flex-shrink: 0;
  flex-grow: 0;
`;

const DropDownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 20px;
  width: 100%;
  min-height: 150px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: ${Colors.WHITE};
    top: 0;
    left: 49%;
    margin-top: -3px;
    transform: rotate(45deg);
  }
`;

export default class SearchInput extends React.PureComponent {
  render () {
    return (
      <Container>
        <StyledInput name='email' placeholder='email' />
        <StyledButton type={ButtonTypes.FULL} />
        <DropDownContainer/>
      </Container>
    );
  }
}