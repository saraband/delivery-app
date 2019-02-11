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
import PendingOrdersSVG from 'ROOT/assets/images/pending_orders.svg';
import FontSizes from 'CONSTANTS/FontSizes';
import TypeOfFoodSVG from 'ASSETS/images/tag.svg';

const Container = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding-left: 15px;
  padding-bottom: 15px;
  width: 250px;
  height: 100%;
  min-height: 300px;
  position: sticky;
  top: 15px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - ${p => p.offset}px - 15px);
`;

const StyledCitySearch = styled(CitySearch)`
  flex-shrink: 0;
`;

const TypeOfFoodIcon = styled(TypeOfFoodSVG)`
  width: ${FontSizes.SMALL};
  height: ${FontSizes.SMALL};
  margin-right: 7px;
`;

const GET_TAGS_LIST = gql`
  query getTagsList {
    tagsList
  }
`;

class SideBar extends React.PureComponent {
  constructor (props) {
    super(props);
    this.hasTicked = false;
    this.state = { offset: 0 };
  }

  componentDidMount () {
    document.addEventListener('scroll', this.watchScroll);
    this.checkScroll();
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.watchScroll)
  }

  watchScroll = () => {
    if (!this.hasTicked) {
      this.hasTicked = true;
      window.requestAnimationFrame(this.checkScroll)
    }
  };

  checkScroll = () => {
    this.hasTicked = false;
    const HEADER_OFFSET = 80;
    const { pageYOffset } = window;

    // Header is not visible, expand to full height
    if (pageYOffset >= HEADER_OFFSET) {
      this.setState({ offset: 0 });

    // Header is visible, offset the header
    } else {
      this.setState({
        offset: HEADER_OFFSET - pageYOffset < 0
          ? 0
          : HEADER_OFFSET - pageYOffset
      });
    }
  };

  render () {
    const {
      history,
      city,
      resetScroll,
      ...rest
    } = this.props;
    const selectedTag = history.location.search.split('=')[1];

    return (
      <Container
        {...rest}
        offset={this.state.offset}
        >
        <StyledCitySearch value={city === 'all' ? '' : city} />

        {/* PENDING ORDERS */}
        <PendingOrders city={city} />

        {/* TAGS SELECT */}
        <SectionTitle><TypeOfFoodIcon />Type of food</SectionTitle>
        <Query query={GET_TAGS_LIST}>
          {({ loading, error, data }) => {
            // TODO: placeholder
            if (loading) return <p>Loading..</p>;
            if (error) return <p>error</p>;

            return (
              <FlatSelect
                selected={selectedTag}
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
