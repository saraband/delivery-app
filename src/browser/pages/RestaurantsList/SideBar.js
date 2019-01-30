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

const Container = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 300px;
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

export default withRouter(({ history, city }) => (
  <Container>
    <CitySearch />
    <Query query={GET_TAGS_LIST}>
      {({ loading, error, data }) => {
        // TODO: placeholder
        if (loading) return <p>Loading..</p>;
        if (error) return <p>error</p>;

        return (
          <StyledFlatSelect
            title='Tags'
            options={data.tagsList.map((tag) => ({
              id: tag.toLowerCase(), // TODO WEIRD, rewrite this shit
              value: tag
            }))}
            onSelect={(selected) => {
              console.log(selected);
              history.push(addParamsToUrl(Routes.RESTAURANTS_LIST, { city }) + `?tag=${selected.id}`);
            }}
            />
        );
      }}
    </Query>
  </Container>
));
