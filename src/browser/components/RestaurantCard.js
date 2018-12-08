import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Routes, { addParamsToUrl } from 'ROUTES';
import { Link } from 'react-router-dom';
import LazyImage from 'COMPONENTS/LazyImage';

const StyledCard = styled(Link)`
  display: block;
  border: 1px solid ${Colors.GREY};
  border-radius: 2px;
  width: 200px;
  height: 200px;
  margin: 20px;
  overflow: hidden;
`;

const Image = styled.img.attrs({
  src: 'https://via.placeholder.com/200x150'
})``;

const Name = styled.h3``;
const Rating = styled.h4``;

export default class RestaurantCard extends React.PureComponent {
  render () {
    const {
      id,
      name,
      rating,
      thumbnail
    } = this.props;

    const src = `/images/restaurant/${id}/medium.jpeg`;

    return (
      <StyledCard to={addParamsToUrl(Routes.RESTAURANT_DETAILS, { restaurantId: id })}>
        <LazyImage
          src={src}
          thumbnail={thumbnail}
          alt={name}
          />
        <Name>{name}</Name>
        <Rating>{rating} / 10</Rating>
      </StyledCard>
    );
  }
}