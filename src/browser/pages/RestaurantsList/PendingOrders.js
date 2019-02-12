import React, { Fragment } from 'react';
import styled from 'styled-components';
import SectionTitle from 'COMPONENTS/SectionTitle';
import Section from 'COMPONENTS/Section';
import { connect } from 'react-redux';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import { Link } from 'react-router-dom';
import Routes, { addParamsToUrl } from 'ROUTES';
import PendingOrdersSVG from 'ASSETS/images/pending_orders.svg';

const OrdersContainer = styled.div``;
const Order= styled(Section).attrs({
  as: Link
})`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  flex-shrink: 0;
  
  &:not(:last-child) {
    margin-bottom: 15px;
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

const PendingOrdersIcon = styled(PendingOrdersSVG)`
  width: ${FontSizes.SMALL};
  height: ${FontSizes.SMALL};
  margin-right: 5px;
`;

class PendingOrders extends React.PureComponent {
  render () {
    const {
      baskets,
      city
    } = this.props;

    return (
      <Fragment>
        <SectionTitle>
          <PendingOrdersIcon />
          Pending orders
        </SectionTitle>

        {/* ONLY FIRST 3 PENDING ORDERS */}
        <OrdersContainer>
          {Object.values(baskets).slice(0, 3).map(({ restaurant, products }) => {
            const total = Object.values(products).reduce((acc, { price, quantity }) => acc + price * quantity, 0);
            return (
              <Order
                key={restaurant.id}
                to={addParamsToUrl(Routes.RESTAURANT_DETAILS, {
                  city,
                  id: restaurant.id
                })}>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <Total>{total}€</Total>
              </Order>
            );
          })}
        </OrdersContainer>

        {/* TODO: See all pending orders */}
        {/*
          {Object.keys(baskets).length > 5 && (
            <strong>See all pending orders</strong>
          )}
        */}
      </Fragment>
    );
  }
};

export default connect(
  (state) => ({
    baskets: state.baskets
  })
)(PendingOrders)
