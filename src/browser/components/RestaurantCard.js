import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';

const StyledCard = styled.div`
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
      rating
    } = this.props;

    return (
      <StyledCard>
        <Image />
        <Name>{name}</Name>
        <Rating>{rating} / 10</Rating>
      </StyledCard>
    );
  }
}