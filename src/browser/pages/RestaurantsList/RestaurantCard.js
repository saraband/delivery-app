import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import Routes, { addParamsToUrl } from 'ROUTES';
import { Link } from 'react-router-dom';
import LazyImage from 'COMPONENTS/LazyImage';
import { withRipples } from 'HOCS';
import Ripple from 'COMPONENTS/RippleProvider/Ripple';
import FontSizes from 'CONSTANTS/FontSizes';
import { Flex } from 'MISC/Styles';
import { getCurrentDay, hexToRgbaString } from 'HELPERS';
import RatingSVG from 'ASSETS/images/rating.svg';

// TODO: Refactor this into a helper maybe ?
const CARD_WIDTH = 350;
const CARD_HEIGHT = 400;
const OFFSET_SIDEBAR = 300;

/**
 *  Generates a bunch of size configuration i.e.
 *  some responsive widths. This allow the restaurant `cards` shown in the Restaurants listing
 *  to fill the screen while preserving (more or less) their aspect ratio
 */
const ResponsiveCardSizes = new Array(10).fill(1).map((_, index) => {
  return `
    @media only screen and (min-width: ${((index + 1) * CARD_WIDTH) + OFFSET_SIDEBAR}px) {
      width: ${100 / (index + 1)}%;
    }
  `;
}).join('\n');

export const ResponsiveContainer = styled.div`
  width: 100%; /* This will get overridden by the size configuration above if necessary */
  min-height: ${CARD_HEIGHT}px;
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
  transition: all 0.15s ease-in-out;
  
  &:hover {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
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

export const RestaurantName = styled.h1`
  color: ${Colors.DARK_GREY};
  font-size: ${FontSizes.MEDIUM};
  font-weight: normal;
`;

export const RestaurantRating = styled.h4`
  color: ${Colors.BLUE};
  font-size: ${FontSizes.MEDIUM};
  font-weight: lighter;
  display: flex;
  align-items: center;
`;

export const TagsList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  background-color: ${hexToRgbaString(Colors.BLUE, 0.8)};
  padding: 4px 6px 4px 6px;
  font-size: ${FontSizes.SMALL};
  color: white;
  border-radius: 3px;
  margin: 3px;
`;

export const RatingLogo = styled(RatingSVG)`
  height: ${FontSizes.NORMAL};
  margin-left: 5px;
`;

export const Subtitle = styled.h3`
  font-size: ${FontSizes.SMALL};
  font-weight: normal;
  color: ${Colors.GREY};
`;

export const ClosedHours = styled.span`
  color: ${Colors.RED};
`;

export const OpenHours = styled.span`
  color: ${Colors.BLUE};
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
    });
  };

  renderOpeningHours = () => {
    const { opening_hours } = this.props;
    const currentDay = getCurrentDay();
    const currentHour = new Date().getHours();

    if (currentHour < opening_hours[currentDay].from ||
      currentHour > opening_hours[currentDay].to) {
      return <ClosedHours>Closed now</ClosedHours>;
    }

    return <OpenHours>Open until {opening_hours[currentDay].to}h</OpenHours>;
  };

  render () {
    const {
      id,
      name,
      urlName,
      phone,
      rating,
      address,
      tags,
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

            {/* IMAGE */}
            <RestaurantImage
              url={imageUrl}
              alt={name}
              thumbnail={thumbnail}
              />

            {/* DESCRIPTION */}
            <Description>
              <Flex justify='space-between' align='flex-end'>
                <RestaurantName>{name}</RestaurantName>
                <RestaurantRating>
                  {rating}
                  <RatingLogo />
                </RestaurantRating>
              </Flex>
              <Subtitle>{address} - {this.renderOpeningHours()}</Subtitle>
              <TagsList>{tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</TagsList>
            </Description>

            {/* RIPPLE EFFECT */}
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
