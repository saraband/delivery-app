import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from 'COMPONENTS/Loader';
import Input from 'COMPONENTS/Form/BaseInput';
import Button from 'COMPONENTS/Form/BaseButton';
import queryString from 'query-string';
import SideBar from './SideBar';
import RestaurantCard from './RestaurantCard';
import Colors from 'CONSTANTS/Colors';

const GET_RESTAURANTS_LIST = gql`
  query list ($limit: Int, $tag: String, $city: String) {
    restaurantsList (limit: $limit, tag: $tag, city: $city) {
      id
      name
      urlName
      rating
      thumbnail
      imageUrl
      tags
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

const options = new Array(20).fill(1).map((_, index) => ({
  id: index,
  value: `Option ${index}`
}));

export default class RestaurantsList extends React.Component {
  constructor (props) {
    super(props);

    this.c = 0;
    this.state = {
      limit: 20,
      progress: 50
    };
  }

  render () {
    // TODO: endless scroll
    const { limit } = this.state;
    const { city } = this.props.match.params;
    const tag = queryString.parse(this.props.location.search).tag;

    return (
      <Container>
        <SideBar city={city} />
        <Query query={GET_RESTAURANTS_LIST} variables={{ limit, tag, city }}>
          {({ error, loading, data }) => {
            // TODO: placeholder
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading</p>;

            return (
              <List>
                {data.restaurantsList.map(r => <RestaurantCard key={r.id} {...r} city={city} />)}
              </List>
            );
          }}
        </Query>
      </Container>
    );
  }
}
