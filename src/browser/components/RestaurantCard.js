import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import Routes, { addParamsToUrl } from 'ROUTES';
import { Link } from 'react-router-dom';
import LazyImage from 'COMPONENTS/LazyImage';
import PropTypes from 'prop-types';
import withRipples from 'HOCS/WithRipples';
import Ripple from 'COMPONENTS/RippleProvider/Ripple';
import { ButtonTypes } from './Form/BaseButton';
import FontSizes from 'CONSTANTS/FontSizes';

// TODO: refactor this maybe ?
const CARD_WIDTH = 350;
const CARD_HEIGHT = 400;
const OFFSET_SIDEBAR = 300;

const ResponsiveCardSizes = new Array(10).fill(1).map((_, index) => {
  return `
    @media only screen and (min-width: ${((index + 1) * CARD_WIDTH) + OFFSET_SIDEBAR}px) {
      width: ${100 / (index + 1)}%;
    }
  `;
}).join('\n');

const ResponsiveContainer = styled.div`
  width: 100%; /* This will get overridden if the width of the viewport is higher */
  height: ${CARD_HEIGHT}px;
  padding: 15px;
  
  /* Responsive card sizes */
  ${ResponsiveCardSizes}
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;

const RestaurantImage = styled(LazyImage)`
  width: 100%;
  height: 250px;
  filter: grayscale(20%);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    filter: grayscale(0%);
  }
`;

const Description = styled.div`
  padding: 15px;
`;

const RestaurantName = styled.h3`
  color: ${Colors.BLACK};
  font-size: ${FontSizes.MEDIUM};
  font-family: Roboto;
`;

class RestaurantCard extends React.PureComponent {
  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    // We store the maximum size of
    // the restaurant card, so we can create ripples large enough
    const { width, height } = this.ref.current.getBoundingClientRect();
    this.size = width > height ? width : height;
  }

  handleMouseDown = (event) => {
    // We calculate the relative pos of the mouse
    const bounds = this.ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    // We add a ripple there
    this.props.addRipple({
      x,
      y,
      color: Colors.BLUE,
      size: this.size * 2
    })
  };

  render () {
    const {
      id,
      name,
      urlName,
      rating,
      city,
      thumbnail,
      imageUrl,
      ripples,
      addRipple,
      deactivateActiveRipple
    } = this.props;

    return (
      <ResponsiveContainer>
        <Link to={addParamsToUrl(Routes.RESTAURANT_DETAILS, { id, name, city })}>
          <CardContainer
            ref={this.ref}
            to={addParamsToUrl(Routes.RESTAURANT_DETAILS, { id, name, city })}
            onMouseDown={this.handleMouseDown}
            onMouseOut={deactivateActiveRipple}
            onMouseUp={deactivateActiveRipple}
            >
            <RestaurantImage
              url={imageUrl}
              alt={name}
              thumbnail={thumbnail}
              />
            <Description>
              <RestaurantName>{name}</RestaurantName>
            </Description>

            {/* We render there the ripples */}
            {Object.keys(ripples).map((rId) => (
              <Ripple
                key={rId}
                {...ripples[rId]}
              />
            ))}
          </CardContainer>
        </Link>
      </ResponsiveContainer>
    );
  }
}

export default withRipples(RestaurantCard);