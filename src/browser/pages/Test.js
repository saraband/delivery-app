import React from 'react';
import SearchInput from 'COMPONENTS/Form/SearchInput';
import Loader from 'COMPONENTS/Loader';
import Placeholder from 'COMPONENTS/Placeholder';
import styled from 'styled-components';

const Container = styled(Placeholder)`
  width: 300px;
  height: 200px;
  border-radius: 5px;
`;

class TestPage extends React.Component {
  render () {
    return (
      <div>
        <Container/>
      </div>
    );
  }
};

export default TestPage
