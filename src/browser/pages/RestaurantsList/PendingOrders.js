import React, { Fragment, memo } from 'react';
import styled from 'styled-components';
import SectionTitle from 'COMPONENTS/SectionTitle';
import Section from 'COMPONENTS/Section';
import { connect } from 'react-redux';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import { Link } from 'react-router-dom';
import {Flex} from 'MISC/Styles';
import Routes, {addParamsToUrl} from 'ROUTES';

const Order= styled(Section).attrs({
  as: Link
})`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: pointer;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    border: 1px solid ${Colors.BLUE};
  }
`;

const RestaurantName = styled.h6`
  font-weight: normal;
  font-size: ${FontSizes.NORMAL};
  color: ${Colors.DARK_BLUE_2};
`;

const Total = styled(RestaurantName)`
  color: ${Colors.BLUE};
`;

class PendingOrders extends React.PureComponent {
  render () {
    const {
      baskets,
      city
    } = this.props;

    return (
      <Fragment>
        <SectionTitle>Pending orders</SectionTitle>
        {/* ONLY 5 FIRST PENDING ORDERS */}
        {Object.values(baskets).slice(0, 5).map(({ restaurant, products }) => {
          const total = Object.values(products).reduce((acc, { price, quantity }) => acc + price * quantity, 0);
          return (
            <Order
              key={restaurant.id}
              to={addParamsToUrl(Routes.RESTAURANT_DETAILS, {
                city,
                id: restaurant.id
              })}>
              <RestaurantName>{restaurant.name}</RestaurantName>
              <Total>{total} €</Total>
            </Order>
          );
        })}

        {/* TODO: test this */}
        {Object.keys(baskets).length > 5 && (
          <strong>See all pending orders</strong>
        )}
      </Fragment>
    );
  }
};

export default connect(
  (state) => ({
    baskets: state.baskets
  })
)(PendingOrders)
