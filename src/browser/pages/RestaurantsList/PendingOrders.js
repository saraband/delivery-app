import React, { Fragment, memo } from 'react';
import styled from 'styled-components';
import SectionTitle from 'COMPONENTS/SectionTitle';
import Section from 'COMPONENTS/Section';
import { connect } from 'react-redux';

class PendingOrders extends React.PureComponent {
  render () {
    const {
      baskets
    } = this.props;

    return (
      <Fragment>
        <SectionTitle>Pending orders</SectionTitle>
        <Section>
          {/* ONLY 5 FIRST PENDING ORDERS */}
          {Object.values(baskets).slice(0, 5).map(({ restaurant, products }) => {
            const total = Object.values(products).reduce((acc, { price, quantity }) => acc + price * quantity, 0);
            return (
              <div key={restaurant.id}>
                <h4>{restaurant.name}</h4>
                <p>{total}</p>
              </div>
            );
          })}

          {/* TODO: test this */}
          {Object.keys(baskets).length > 5 && (
            <strong>See all pending orders</strong>
          )}
        </Section>
      </Fragment>
    );
  }
};

export default connect(
  (state) => ({
    baskets: state.baskets
  })
)(PendingOrders)
