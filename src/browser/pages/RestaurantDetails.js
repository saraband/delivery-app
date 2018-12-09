import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RestaurantCard from 'COMPONENTS/RestaurantCard';
import LazyImage from 'COMPONENTS/LazyImage';
import Basket from 'COMPONENTS/Basket';

const StyledRestaurant = styled.div`
  
`;

const BannerImage = styled(LazyImage)`
  width: 100%;
  height: 300px;
`;

const GET_PRODUCTS_LIST = gql`
  query productsOfRestaurant ($restaurantId: ID!) {
    restaurant (id: $restaurantId) {
      id
      name
      rating
      thumbnail
      imageUrl
    }
    
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
        {restaurantId}
        <Query query={GET_PRODUCTS_LIST} variables={{ restaurantId }}>
          {({ error, loading, data }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading</p>;

            return (
              <div>
                <Basket id={restaurantId} />
                <BannerImage
                  url={data.restaurant.imageUrl}
                  thumbnail={data.restaurant.thumbnail}
                  alt={data.restaurant.name}
                  />
                {data.productsList.map(product => <p key={product.id}>{product.name} - ${product.price}</p>)}
              </div>
            );
          }}
        </Query>
      </StyledRestaurant>
    );
  }
}