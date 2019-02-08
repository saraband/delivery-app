import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const Tip = styled.div`
  position: absolute;
  z-index: -1;
  ${p => p.position === 'top' ? 'bottom' : 'top'}: 100%;
  margin-${p => p.position === 'top' ? 'bottom' : 'top'}: 20px;
  background-color: ${Colors.DARK_GREY};
  color: ${Colors.WHITE};
  left: 50%;
  opacity: 0;
  transition: all 0.15s ease-in-out;
  border-radius: 3px;
  font-size: ${FontSizes.SMALL};
  white-space: nowrap;
  padding: 5px 8px 5px 8px;
  transform: translate3d(-50%, 0, 0);
  
  &:after {
    content: '';
    width: 6px;
    height: 6px;
    background-color: ${Colors.DARK_GREY};
    display: inline-block;
    position: absolute;
    ${p => p.position}: 100%;
    left: 50%;
    margin-left: -3px;
    margin-${p => p.position}: -4px;
    transform: rotate(45deg);
  }
`;

const ComponentContainer= styled.div`
  &:hover + ${Tip} {
    z-index: 500;
    opacity: 1;
    margin-${p => p.position === 'top' ? 'bottom' : 'top'}: 10px;
  }
`;

export default class ToolTip extends React.PureComponent {
  render () {
    const {
      label,
      position,
      children,
      ...rest
    } = this.props;

    return (
      <Container {...rest}>
        <ComponentContainer position={position}>
          {children}
        </ComponentContainer>
        <Tip position={position}>{label}</Tip>
      </Container>
    );
  }
}

ToolTip.propTypes = {
  position: PropTypes.string
};

ToolTip.defaultProps = {
  position: 'top'
};
