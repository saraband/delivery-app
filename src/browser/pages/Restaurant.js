import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RestaurantCard from 'COMPONENTS/RestaurantCard';

const StyledRestaurant = styled.div`
  
`;

const GET_PRODUCTS_LIST = gql`
  query productsOfRestaurant ($restaurantId: String!) {
    productsList(restaurantId: $restaurantId) {
      id
      name
      price
    }
  }
`;

export default class extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const restaurantId = this.props.match.params.restaurantId;

    return (
      <StyledRestaurant>
        {this.props.match.params.restaurantId}
        <Query query={GET_PRODUCTS_LIST} variables={{ restaurantId }}>
          {({ error, loading, data }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading</p>;

            return (
              <div>
                {data.productsList.map(product => <p key={product.id}>{product.name} - ${product.price}</p>)}
              </div>
            );
          }}
        </Query>
      </StyledRestaurant>
    );
  }
}