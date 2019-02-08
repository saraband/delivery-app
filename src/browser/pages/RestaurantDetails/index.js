import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LazyImage from 'COMPONENTS/LazyImage';
import Basket from 'COMPONENTS/Basket';
import SectionTitle from 'COMPONENTS/SectionTitle';
import ProductCard from './ProductCard';
import {connect} from 'react-redux';
import {ADD_PRODUCT, REMOVE_PRODUCT} from 'STORE/baskets';
import RestaurantBreadCrumb from './RestaurantBreadCrumb';
import { Helmet } from 'react-helmet';

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
      tags
    }
    
    productsList(restaurantId: $id) {
      id
      name
      price
      ingredients
      restaurant {
        id
        name
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
`;

const BasketSection = styled.div`
  flex-grow: 0;
  width: 300px;
  flex-shrink: 0;
  position: relative;
  margin-left: 20px;
`;

const BodySection = styled.div`
  display: flex;
`;

const MenuTitle = styled(SectionTitle)`
  margin-bottom: 20px;
  margin-top: 20px;
`;

class RestaurantDetails extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { id, city } = this.props.match.params;
    const {
      baskets,
      addProduct,
      removeProduct
    } = this.props;
    const currentBasket = (baskets[id] && baskets[id].products) || {};

    return (
      <Query query={GET_PRODUCTS_LIST} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;

          return (
            <Container>
              {/* META */}
              <Helmet>
                <title>Hotbox | {data.restaurant.name}</title>
              </Helmet>

              {/* BREADCRUMB */}
              <RestaurantBreadCrumb
                restaurantName={data.restaurant.name}
                city={city}
                />

              {/* BODY SECTION */}
              <BodySection>
                <MenuSection>
                  <BannerImage
                    url={data.restaurant.imageUrl}
                    thumbnail={data.restaurant.thumbnail}
                    alt={data.restaurant.name}
                    />
                  <MenuTitle>Entries</MenuTitle>
                  {data && data.productsList.map((product) => (
                    <ProductCard
                      key={product.id}
                      selected={!!currentBasket[product.id]}
                      addProduct={() => addProduct(product)}
                      removeProduct={() => removeProduct(product)}
                      {...product}
                      />
                  ))}
                </MenuSection>

                {/* BASKET SIDEBAR */}
                <BasketSection>
                  <Basket id={id} />
                </BasketSection>
              </BodySection>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default connect(
  (state) => ({
    baskets: state.baskets
  }),
  (dispatch) => ({
    addProduct: (product) => dispatch({ type: ADD_PRODUCT, product }),
    removeProduct: (product) => dispatch({ type: REMOVE_PRODUCT, product })
  })
)(RestaurantDetails);
