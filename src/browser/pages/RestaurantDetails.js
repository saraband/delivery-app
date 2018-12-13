import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RestaurantCard from 'COMPONENTS/RestaurantCard';
import LazyImage from 'COMPONENTS/LazyImage';
import Basket from 'COMPONENTS/Basket';

const BannerImage = styled(LazyImage)`
  width: 100%;
  height: 300px;
`;

const GET_PRODUCTS_LIST = gql`
  query productsOfRestaurant ($id: ID!) {
    restaurant (id: $id) {
      id
      name
      rating
      thumbnail
      imageUrl
    }
    
    productsList(restaurantId: $id) {
      id
      name
      price
    }
  }
`;

const Container = styled.div`
  display: flex;
`;

const MenuSection = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const BasketSection = styled.div`
  width: 300px;
  position: relative;
`;

export default class extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const id = this.props.match.params.id;

    return (
      <Query query={GET_PRODUCTS_LIST} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;

          return (
            <Container>
              <MenuSection>
                <BannerImage
                  url={data.restaurant.imageUrl}
                  thumbnail={data.restaurant.thumbnail}
                  alt={data.restaurant.name}
                />
                {data.productsList.map(product => <p key={product.id}>{product.name} - ${product.price}</p>)}
              </MenuSection>
              <BasketSection>
                <Basket id={id} />
              </BasketSection>
            </Container>
          );
        }}
      </Query>
    );
  }
}