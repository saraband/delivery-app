import React from 'react';
import styled from 'styled-components';
import BreadCrumb from 'COMPONENTS/BreadCrumb';
import { addParamsToUrl } from 'ROUTES';
import Routes from 'ROUTES';

const NavSection = styled.div``;

export default class RestaurantBreadCrumb extends React.PureComponent {
  render () {
    const { city, restaurantName } = this.props;

    const BackToRestaurantLink = city === 'all'
      ? {
        label: 'All restaurants',
        url: Routes.HOME
      } : {
        label: city,
        url: addParamsToUrl(Routes.RESTAURANTS_LIST, { city }),
        tip: `Restaurants in ${city}`
      };

    return (
      <NavSection>
        <BreadCrumb>
          {[
            {
              label: 'Home',
              url: Routes.HOME
            },
            BackToRestaurantLink,
            {
              label: restaurantName
            }
          ]}
        </BreadCrumb>
      </NavSection>
    )
  }
}