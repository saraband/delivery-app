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
import {Redirect} from 'react-router-dom';
import Routes from 'ROUTES';
import {Flex} from 'MISC/Styles';
import {
  RatingLogo,
  Subtitle,
  TagsList,
  Tag,
  ClosedHours,
  OpenHours,
  RestaurantName, RestaurantRating
} from 'PAGES/RestaurantsList/RestaurantCard';
import { getCurrentDay } from 'HELPERS';
import Placeholder from './RestaurantDetailsPlaceholder';

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
      address
      tags
      opening_hours
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

const Description = styled.div`
  padding: 10px 0;
  width: 100%;
`;

class RestaurantDetails extends React.Component {
  constructor (props) {
    super(props);
  }

  // TODO: This is repeated in RestaurantsList page
  // refactor this into a helper
  renderOpeningHours = (openingHours) => {
    const currentDay = getCurrentDay();
    const currentHour = new Date().getHours();

    if (currentHour < openingHours[currentDay].from ||
      currentHour > openingHours[currentDay].to) {
      return <ClosedHours>Closed now</ClosedHours>;
    }

    return <OpenHours>Open until {openingHours[currentDay].to}h</OpenHours>
  };

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
          if (loading) return <Placeholder />

          // TODO: handle this better
          if (!data.restaurant || !data.productsList) {
            return (
              <Redirect to={Routes.NOT_FOUND_404} />
            )
          }

          const {
            name,
            thumbnail,
            rating,
            address,
            opening_hours,
            tags
          } = data.restaurant;

          return (
            <Container>
              {/* META */}
              <Helmet>
                <title>Hotbox | {name}</title>
              </Helmet>

              {/* BREADCRUMB */}
              <RestaurantBreadCrumb
                restaurantName={name}
                city={city}
                />

              {/* BODY SECTION */}
              <BodySection>
                <MenuSection>
                  {/* Banner */}
                  <BannerImage
                    url={data.restaurant.imageUrl}
                    thumbnail={thumbnail}
                    alt={name}
                    />

                  {/* Restaurant description */}
                  <Description>
                    <Flex justify='space-between' align='flex-end'>
                      <RestaurantName>{name}</RestaurantName>
                      <RestaurantRating>
                        {rating}
                        <RatingLogo />
                      </RestaurantRating>
                    </Flex>
                    <Subtitle>{address} - {this.renderOpeningHours(opening_hours)}</Subtitle>
                    <TagsList>{tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</TagsList>
                  </Description>

                  {/* Products list */}
                  <MenuTitle>Products</MenuTitle>
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
