import React from 'react';
import styled from 'styled-components';
import { Flex } from 'MISC/Styles';
import SectionTitle from 'COMPONENTS/SectionTitle';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Basket from 'COMPONENTS/Basket';
import Section from 'COMPONENTS/Section';
import FormValidator from 'COMPONENTS/Form/FormValidator';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import BaseButton, {ButtonTypes} from 'COMPONENTS/Form/BaseButton';
import Colors from 'CONSTANTS/Colors';
import LazyImage from 'COMPONENTS/LazyImage';

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
  margin-bottom: 20px;
  
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

          const {
            name,
            thumbnail,
            imageUrl
          } = data.restaurant;
          return (
            <Flex direction='column'>
              <BannerImage
                thumbnail={thumbnail}
                url={imageUrl}
                alt={name}
                />
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
                        />
                        <FormInput
                          placeholder='Last name'
                          name='lastName'
                        />
                      </Flex>
                      <Flex>
                        <FormInput
                          placeholder='Address'
                          name='address'
                          />
                      </Flex>
                      <Flex>
                        <FormInput
                          placeholder='ZIP Code'
                          name='zipCode'
                          />
                        <FormInput
                          placeholder='City'
                          name='city'
                          />
                      </Flex>

                      <Title>Payment information</Title>
                      <Flex>
                        <FormInput
                          placeholder='Credit card number'
                          name='creditCardNumber'
                          />
                        <FormInput
                          placeholder='CCV'
                          name='ccv'
                          />
                      </Flex>
                      <PayButton>Pay now</PayButton>
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
