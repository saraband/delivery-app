import React from 'react';
import styled from 'styled-components';
import BreadCrumb from 'COMPONENTS/BreadCrumb';
import { addParamsToUrl } from 'ROUTES';
import Routes from 'ROUTES';

const NavSection = styled.div``;

export default class RestaurantBreadCrumb extends React.PureComponent {
  render () {
    const { city, restaurantName } = this.props;
    return (
      <NavSection>
        <BreadCrumb>
          {[
            {
              label: 'Home',
              url: Routes.HOME
            },
            {
              label: city,
              url: addParamsToUrl(Routes.RESTAURANTS_LIST, { city }),
              tip: `Restaurants in ${city}`
            },
            {
              label: restaurantName
            }
          ]}
        </BreadCrumb>
      </NavSection>
    )
  }
}