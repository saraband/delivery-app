/*
 *  SideBar.js
 *  ----------
 *  The side bar on the left when listing restaurants. This component allows the user
 *  to choose a city and a tag that will narrow its search.
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import FlatSelect from 'COMPONENTS/FlatSelect';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { addParamsToUrl } from 'ROUTES';
import Routes from 'ROUTES';
import CitySearch from 'COMPONENTS/CitySearch';
import SectionTitle from 'COMPONENTS/SectionTitle'
import Section from 'COMPONENTS/Section'
import PendingOrders from './PendingOrders'

const Container = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding-left: 15px;
  width: 250px;
  height: 100%;
  min-height: 300px;
  position: sticky;
  top: 15px;
`;
const StyledFlatSelect = styled(FlatSelect)`
  margin-top: 15px;
`;

const GET_TAGS_LIST = gql`
  query getTagsList {
    tagsList
  }
`;

class SideBar extends React.PureComponent {
  render () {
    const {
      history,
      city,
      resetScroll
    } = this.props;

    return (
      <Container>
        <CitySearch value={city} />

        {/* PENDING ORDERS */}
        <PendingOrders city={city} />

        {/* TAGS SELECT */}
        <SectionTitle>Type of food</SectionTitle>
        <Query query={GET_TAGS_LIST}>
          {({ loading, error, data }) => {
            // TODO: placeholder
            if (loading) return <p>Loading..</p>;
            if (error) return <p>error</p>;

            return (
              <StyledFlatSelect
                options={data.tagsList.map((tag) => ({
                  id: tag.toLowerCase(), // TODO WEIRD, rewrite this shit
                  value: tag
                }))}
                onSelect={(selected) => {
                  resetScroll();
                  history.push(`${addParamsToUrl(Routes.RESTAURANTS_LIST, { city: city || 'all' })}?tag=${selected.id}`);
                }}
              />
            );
          }}
        </Query>
      </Container>
    );
  }
};

export default withRouter(SideBar);
