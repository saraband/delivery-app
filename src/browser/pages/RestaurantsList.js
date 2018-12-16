import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../components/Loader';
import RestaurantCard from '../components/RestaurantCard';
import Input from 'COMPONENTS/Form/BaseInput';
import Button from 'COMPONENTS/Form/BaseButton';

/* QUERIES */
const GET_RESTAURANTS_LIST = gql`
  query list ($limit: Int) {
    restaurantsList (limit: $limit) {
      id
      name
      urlName
      rating
      thumbnail
      imageUrl
    }
  }
`;

const List = styled.div`
flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideBar = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 300px;
  background-color: blue;
  height: 100%;
  min-height: 300px;
`;

export default class RestaurantsList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      limit: 20
    };
  }

  render () {
    const { limit } = this.state;
    const { city } = this.props.match.params;

    return (
      <Query query={GET_RESTAURANTS_LIST} variables={{ limit }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;

          return (
            <Container>
              <SideBar />
              <List>
                {data.restaurantsList.map(r => <RestaurantCard key={r.id} {...r} city={city} />)}
              </List>
            </Container>
          );
        }}
      </Query>
    );
  }
}
