import React from 'react';
import styled from 'styled-components';
import { Flex } from 'MISC/Styles';
import SectionTitle from 'COMPONENTS/SectionTitle';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Basket from 'COMPONENTS/Basket';

const Body = styled.div`
  border: 1px solid red;
  display: flex;
`;

const GET_RESTAURANT_INFORMATION = gql`
  query getRestaurantInformation ($id: ID!) {
    restaurant (id: $id) {
      id
      name
      rating
      thumbnail
      imageUrl
    }
  }
`;

const Left = styled.div`
  border: 1px solid blue;
  height: 100%;
  flex-grow: 1;
`;

const StyledBasket = styled(Basket).attrs({
  showButtons: false
})`
  flex-shrink: 0;
  flex-grow: 0;
`;

export default class extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { id } = this.props.match.params;

    return (
      <Query
        query={GET_RESTAURANT_INFORMATION}
        variables={{ id }}>
        {({ data, loading, error }) => {
          // TODO: placeholder
          if (loading) return <p>Loading..</p>;
          if (error) return <p>error</p>;

          const { name } = data.restaurant;
          return (
            <Flex direction='column'>
              <SectionTitle>{name} checkout</SectionTitle>
              <Body>
                <Left></Left>
                <StyledBasket id={id} />
              </Body>
            </Flex>
          );
        }}
      </Query>
    );
  }
}
