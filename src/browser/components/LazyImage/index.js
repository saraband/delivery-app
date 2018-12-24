/*
 *	LazyImage.js
 *	------------
 *  TODO: Better description
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { addParamsToUrl } from 'ROUTES';
import { getOptimalResolution } from 'UTILS';
import makeCancelable from 'makecancelable';

const Container = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
`;

const StyledPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  background-image: url(${p => p.thumbnail});
  background-size: cover;
  background-position: center center;
  filter: blur(2px);
  transition: all 0.2s ease-in-out;
  transform: scale(1.1);
  opacity: ${p => p.visible ? 1 : 0};
`;

const StyledImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 45;
  top: 0;
  left: 0;
  background-image: url(${p => p.url});
  background-size: cover;
  background-position: center center;
  transform: scale(1.1);
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
    document.addEventListener('scroll', this.watchScrollOrResize);
    window.addEventListener('resize', this.watchScrollOrResize);
    this.checkIfImageIsInViewPort();
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.watchScrollOrResize);
    window.removeEventListener('resize', this.watchScrollOrResize);
    this.cancelImageLoad && this.cancelImageLoad();
  }

  loadImage = () => {

    // When the image has loaded, we display the real img
    // instead of the placeholer
    // + cancelable in case component gets unmounted
    this.cancelImageLoad = makeCancelable(
      new Promise((resolve, reject) => {
        this.image.onload = resolve;
        this.image.onerror = reject;
      }).then(() => {
        this.setState({ hasImageLoaded: true });
      })
    );

    // If the image has a parameter size, find the path
    // to its most optimal resolution
    this.image.src = addParamsToUrl(this.props.url, {
      size: getOptimalResolution(this.ref.current.getBoundingClientRect().width)
    });
  };

  checkIfImageIsInViewPort = () => {
    this.hasTicked = false;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const bounds = this.ref.current.getBoundingClientRect();

    // Not in viewport, do nothing
    if (bounds.bottom < 0 ||
      bounds.top > viewportHeight) {
      return;
    }

    // Start loading image
    //TODO: decomment this
    this.loadImage();

    // No need to watch scroll/resize anymore
    document.removeEventListener('scroll', this.watchScrollOrResize);
    window.removeEventListener('resize', this.watchScrollOrResize);
  };

  watchScrollOrResize = () => {
    if (!this.hasTicked) {
      this.hasTicked = true;
      window.requestAnimationFrame(this.checkIfImageIsInViewPort);
    }
  };

  render () {
    const {
      url,
      thumbnail,
      ...rest
    } = this.props;

    const {
      hasImageLoaded
    } = this.state;

    return (
      <Container
        ref={this.ref}
        {...rest}
        >
        {hasImageLoaded && <StyledImage url={this.image.src} />}
        <StyledPlaceholder thumbnail={thumbnail} visible={!hasImageLoaded} />
      </Container>
    );
  }
};

LazyImage.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  thumbnail: PropTypes.string
};
