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
import InfiniteScroll from 'COMPONENTS/InfiniteScroll';

const GET_RESTAURANTS_LIST = gql`
  query list ($city: String, $offset: Int, $limit: Int, $tag: String, $order: String) {
    restaurantsList (city: $city, offset: $offset, limit: $limit, tag: $tag, order: $order) {
      id
      name
      urlName
      rating
      thumbnail
      imageUrl
      phone
      address
      opening_hours
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

const InitialState = {
  offset: 0,
  limit: 20
};

export default class RestaurantsList extends React.Component {
  constructor (props) {
    super(props);
    this.isFetchingMore = false;
    this.shouldNotFetchAnymore = false;
  }

  componentWillUpdate (nextProps, nextState, nextContext) {
    // Location has changed => scroll to the top +
    if (this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search) {
      window.scrollTo(0, 0);
    }
  }

  render () {
    const { city } = this.props.match.params;
    const tag = queryString.parse(this.props.location.search).tag;

    return (
      <Container>
        {/* SIDEBAR */}
        <SideBar
          city={city}
          resetScroll={() => {
            this.isFetchingMore = false;
            this.shouldNotFetchAnymore = false;
          }}
          />

        {/* RESTAURANTS LIST */}
        <Query
          fetchPolicy='cache-and-network'
          query={GET_RESTAURANTS_LIST}
          variables={{ city, offset: 0, limit: 20, tag, order: 'asc' }}
          >
          {({ error, loading, data, fetchMore }) => {
            if (error) return <p>Error</p>;
            // TODO loading placeholder

            return (
              <List>
                {/* LIST */}
                {(data.restaurantsList || []).map(r => (
                  <RestaurantCard key={r.id} {...r} city={city} />
                ))}

                {/* ENDLESS SCROLL */}
                {!loading && (
                  <InfiniteScroll
                    fetchMore={() => {
                      // Already fetching or no more data to fetch
                      // do nothing
                      if (this.isFetchingMore ||
                        this.shouldNotFetchAnymore) {
                        return;
                      }

                      this.isFetchingMore = true;
                      fetchMore({
                        variables: {
                          city,
                          offset: data.restaurantsList.length,
                          limit: data.restaurantsList.length + 5,
                          tag,
                          order: 'asc'
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          // No more data to fetch, update shouldNotFetchAnymore
                          // flag so we won't try to fetch data anymore
                          if (!fetchMoreResult ||
                            !fetchMoreResult.restaurantsList.length) {
                            this.shouldNotFetchAnymore = true;
                            return prev;
                          }

                          // Process the data fetched i.e. appending it to
                          // the existing data
                          this.isFetchingMore = false;
                          return {
                            ...prev,
                            restaurantsList: [
                              ...prev.restaurantsList,
                              ...fetchMoreResult.restaurantsList
                            ]
                          };
                        }
                      })
                    }}
                    />
                )}
              </List>
            );
          }}
        </Query>
      </Container>
    );
  }
}
