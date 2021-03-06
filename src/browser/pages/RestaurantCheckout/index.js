import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Flex } from 'MISC/Styles';
import SectionTitle from 'COMPONENTS/SectionTitle';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import Basket from 'COMPONENTS/Basket';
import Section from 'COMPONENTS/Section';
import FormValidator from 'COMPONENTS/Form/FormValidator';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import BaseButton, {ButtonTypes} from 'COMPONENTS/Form/BaseButton';
import Colors from 'CONSTANTS/Colors';
import LazyImage from 'COMPONENTS/LazyImage';
import v from 'HELPERS/Validate'
import { createInputHandler } from 'HELPERS';
import RedirectHomeModal from './RedirectHomeModal';
import { connect } from 'react-redux';
import { CLEAR_BASKET } from 'STORE/baskets';

const Body = styled.div`
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

const SEND_ORDER = gql`
  mutation sendOrder ($params: String!) {
    sendOrder (params: $params)
  }
`;

const Left = styled(Section)`
margin-right: 20px;
  height: 100%;
  flex-grow: 1;
`;

const StyledBasket = styled(Basket).attrs({
  showButtons: false
})`
  flex-shrink: 0;
  flex-grow: 0;
  width: 300px;
  align-self: start;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: normal;
  color: ${Colors.DARK_BLUE_2};
`;

const FormInput = styled(BaseInput)`
  flex-grow: 1;
  margin-bottom: 35px;
  
  &:last-child:not(:only-child) {
    margin-left: 15px;
  }
`;

const PayButton = styled(BaseButton).attrs({
  type: ButtonTypes.FULL
})`
  margin-top: 20px;
  width: 100%;
`;

const BannerImage = styled(LazyImage)`
  width: 100%;
  height: 300px;
`;

class RestaurantCheckout extends React.Component {
  constructor (props) {
    super(props);

    this.updateInput = createInputHandler({ stateKey: 'form' }).bind(this);
    this.state = {
      orderProcessed: false,
      form: {
        firstName: '',
        lastName: '',
        address: '',
        zipCode: '',
        city: '',
        creditCardNumber: '',
        ccv: ''
      }
    }
  }

  render () {
    const { id } = this.props.match.params;
    const products = (this.props.baskets[id] && this.props.baskets[id].products) || {};
    const orderInfo = Object.keys(products).map((productId) => ({
      id: productId,
      quantity: products[productId].quantity
    }));

    return (
      <Query
        query={GET_RESTAURANT_INFORMATION}
        variables={{ id }}>
        {({ data, loading, error }) => {
          // TODO: placeholder
          if (loading) return <p>Loading..</p>;
          if (error) return <p>error</p>;

          const {
            name,
            thumbnail,
            imageUrl
          } = data.restaurant;

          const { clearBasket } = this.props;
          const { orderProcessed } = this.state;
          const {
            firstName,
            lastName,
            address,
            zipCode,
            city,
            creditCardNumber,
            ccv
          } = this.state.form;

          return (
            <Flex direction='column'>
              {/* BANNER */}
              <BannerImage
                thumbnail={thumbnail}
                url={imageUrl}
                alt={name}
                />

              {/* RECAP BODY */}
              <SectionTitle>{name} checkout</SectionTitle>
              <Body>

                {/* FORM SECTION */}
                <FormValidator>
                  {({ validator, isFormValid }) => (
                    <Left>
                      <Title>General information</Title>
                      <Flex>
                        <FormInput
                          placeholder='Fist name'
                          name='firstName'
                          value={firstName}
                          errorLabel='This field is required'
                          onChange={this.updateInput}
                          validator={validator}
                          validate={v.required}
                        />
                        <FormInput
                          placeholder='Last name'
                          name='lastName'
                          value={lastName}
                          errorLabel='This field is required'
                          onChange={this.updateInput}
                          validator={validator}
                          validate={v.required}
                        />
                      </Flex>
                      <Flex>
                        <FormInput
                          placeholder='Address'
                          name='address'
                          value={address}
                          errorLabel='This field is required'
                          onChange={this.updateInput}
                          validator={validator}
                          validate={v.required}
                          />
                      </Flex>
                      <Flex>
                        <FormInput
                          placeholder='ZIP Code'
                          name='zipCode'
                          value={zipCode}
                          errorLabel='This field must be a valid zip code'
                          onChange={this.updateInput}
                          validator={validator}
                          validate={v.zipCode}
                          />
                        <FormInput
                          placeholder='City'
                          name='city'
                          value={city}
                          errorLabel='This field is required'
                          onChange={this.updateInput}
                          validator={validator}
                          validate={v.required}
                          />
                      </Flex>

                      <Title>Payment information</Title>
                      <Flex>
                        <FormInput
                          placeholder='Credit card number'
                          name='creditCardNumber'
                          value={creditCardNumber}
                          errorLabel='This field must be a valid credit card number'
                          onChange={this.updateInput}
                          validator={validator}
                          validate={v.creditCardNumber}
                          />
                        <FormInput
                          placeholder='CCV'
                          name='ccv'
                          value={ccv}
                          errorLabel='This field must be a valid CCV'
                          onChange={this.updateInput}
                          validator={validator}
                          validate={v.ccv}
                          />
                      </Flex>

                      {/* PAY NOW BUTTON */}
                      <Mutation
                        mutation={SEND_ORDER}
                        onCompleted={() => {
                          // Order processed, display the modal
                          this.setState({ orderProcessed: true });
                        }}>
                        {(sendOrder, { loading }) => (
                          <Fragment>
                            <PayButton
                              disabled={!isFormValid || loading}
                              onClick={() => {
                                /* Send the order details here */
                                sendOrder({ variables: {
                                  params: JSON.stringify({
                                    userInfo: this.state.form,
                                    orderInfo
                                  })
                                }});
                              }}>
                              {loading ? 'Processing order...' : 'Pay now'}
                            </PayButton>

                            {/* Order has been processed, show the redirect modal and clear basket */}
                            {orderProcessed && (
                              <RedirectHomeModal clearBasket={() => clearBasket(id)} />
                            )}
                          </Fragment>
                        )}
                      </Mutation>
                    </Left>
                  )}
                </FormValidator>

                {/* RECAP BASKET */}
                <StyledBasket id={id} />
              </Body>
            </Flex>
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
    clearBasket: (basketId) => dispatch({ type: CLEAR_BASKET, basketId })
  })
)(RestaurantCheckout);
