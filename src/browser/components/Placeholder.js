import styled, { keyframes } from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import React from 'react';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${p => p.bgColor};
`;

const PlaceholderAnimation = keyframes`
  from {
    margin-left: -100%;
  } to {
    margin-left: 100%;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${PlaceholderAnimation} 1s linear infinite;
  background: linear-gradient(
    to right,
    ${p => p.bgColor} 0%,
    ${p => p.bgColor} 20%,
    ${p => p.gradientColor} 50%,
    ${p => p.bgColor} 80%,
    ${p => p.bgColor} 100%
  );
`;

export default class Placeholder extends React.PureComponent {
  render () {
    return (
      <Container {...this.props}>
        <Background
          bgColor={this.props.bgColor}
          gradientColor={this.props.gradientColor}
          />
      </Container>
    );
  }
};

Placeholder.propTypes = {
  bgColor: PropTypes.string,
  gradientColor: PropTypes.string
};

Placeholder.defaultProps = {
  bgColor: '#F5F5F5',
  gradientColor: '#E5E5E5'
};