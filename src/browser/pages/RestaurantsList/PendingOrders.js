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

    console.log(baskets);
    return (
      <Fragment>
        <SectionTitle>Pending orders</SectionTitle>
        <Section>
          Hello
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