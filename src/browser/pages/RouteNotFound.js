import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Routes from 'ROUTES';

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 15px;
`;

const Subtitle = styled.h3``;

export default class RouteNotFound extends React.Component {
  render () {
    return (
      <StyledNotFound>
        <Title>The page you're looking for doesn't seem to exist.</Title>
        <Subtitle><Link to={Routes.RESTAURANTS_LIST}>Go back to the home page</Link></Subtitle>
      </StyledNotFound>
    );
  }
};