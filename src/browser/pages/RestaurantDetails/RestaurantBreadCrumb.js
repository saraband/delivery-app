import React from 'react';
import styled from 'styled-components';
import BreadCrumb from 'COMPONENTS/BreadCrumb';
import { addParamsToUrl } from 'ROUTES';
import Routes from 'ROUTES';

const NavSection = styled.div``;

export default class RestaurantBreadCrumb extends React.PureComponent {
  render () {
    return (
      <NavSection>
        <BreadCrumb>
          {[
            {
              label: 'HOME',
              url: Routes.HOME,
              tip: `Home`
            },
            {
              label: 'CITY',
              url: addParamsToUrl(Routes.RESTAURANTS_LIST, { city: 'all' }),
              tip: `Restaurants around ${'TODO'}`
            },
            {
              label: 'RESTAURANT NAME'
            }
          ]}
        </BreadCrumb>
      </NavSection>
    )
  }
}