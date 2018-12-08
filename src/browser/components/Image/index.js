/*
 *	BaseInput.js
 *	------------
 *	Custom input that accepts validation rules and can be
 *	connected to a validator.
 *
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
`;

const StyledPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 42;
  top: 0;
  left: 0;
  background-image: url(${p => p.thumbnail});
  background-size: cover;
  filter: blur(2px);
`;

const StyledImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 43;
  top: 0;
  left: 0;
  background-image: url(${p => p.src});
  background-size: cover;
`;

export default class LazyImage extends React.Component {
  constructor (props) {
    super(props);

    this.ref = React.createRef();
    this.image = new Image();
    this.state = {
      hasImageLoaded: !props.thumbnail
    };
  }

  componentDidMount () {
    document.addEventListener('scroll', this.watchScroll);
    this.checkIfImageIsInViewPort();
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.watchScroll);
  }

  loadImage = () => {
    this.image.onload = () => {
      this.setState({
        hasImageLoaded: true
      });
    };

    this.image.src = this.props.src;
  }

  checkIfImageIsInViewPort = () => {
    this.hasTicked = false;
    const viewportHeight = window.innerWidth || document.documentElement.clientWidth;
    const bounds = this.ref.current.getBoundingClientRect();

    // Not in viewport, do nothing
    if (bounds.bottom < 0 ||
      bounds.top > viewportHeight) {
      return;
    }

    // Start loading image
    this.loadImage();

    // No need to watch scroll anymore
    document.removeEventListener('scroll', this.watchScroll);
  }

  watchScroll = () => {
    if (!this.hasTicked) {
      this.hasTicked = true;
      window.requestAnimationFrame(this.checkIfImageIsInViewPort);
    }
  }

  render() {
    const {
      src,
      thumbnail,
      ...rest
    } = this.props;

    const {
      hasImageLoaded
    } = this.state;

    return (
      <Container
        ref={this.ref}
        onClick={this.loadImage}
        {...rest}
        >
        {hasImageLoaded && <StyledImage src={src} />}
        <StyledPlaceholder thumbnail={thumbnail} />
      </Container>
    );
  }
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  thumbnail: PropTypes.string
};