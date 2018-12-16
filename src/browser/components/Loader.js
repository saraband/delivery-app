import React from 'react';
import styled, { keyframes } from 'styled-components';
import Colors from '../constants/Colors';
import PropTypes from 'prop-types';

const BlockAnimation = keyframes`
  from {
    margin-left: -101%;
  } to {
    margin-left: 101%;
  }
`;

const Container = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
`;

const Block = styled.div`
  background-color: ${Colors.ORANGE};
  width: 100%;
  height: ${p => p.size}%;
  animation: ${BlockAnimation} ${p => p.animationDuration}s infinite ease-in-out;
  animation-delay: ${p => p.delay}s;
  margin-left: -101%;
`;

export default class Loader extends React.PureComponent {
  render () {
    const {
      size,
      numBlocks,
      animationDuration
    } = this.props;
    const blockSize = 100 / (numBlocks * 2 - 1);
    const animationDelay = animationDuration / numBlocks;

    return (
      <Container size={size}>
        {new Array(numBlocks).fill(1).map((_, index) => (
          <Block
            size={blockSize}
            key={index}
            animationDuration={animationDuration}
            delay={animationDelay * index / 2}
            />
        ))}
      </Container>
    );
  }
}

Loader.propTypes = {
  size: PropTypes.number,
  numBlocks: PropTypes.number,
  animationDuration: PropTypes.number
};

Loader.defaultProps = {
  size: 200,
  numBlocks: 3,
  animationDuration: 1
};