import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import BaseInput from 'COMPONENTS/Form/BaseInput';

const Container = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid blue;
`;

export default class AutoCompleteInput extends React.Component {
  constructor (props) {
    super(props);

    this.handleSearch = debounce(
      this.handleSearch,
      props.debounce
    );

    this.state = {
      list: []
    };
  }

  handleSearch = async (value) => {
    console.log('Searching...')
    const results = await this.props.searchFunction(value);
    console.log('=> ', results);

    this.setState({
      list: results
    });
  }

  render () {
    const {
      onChange,
      ...rest
    } = this.props;

    return (
      <Container>
        <BaseInput
          onChange={(event) => {
            onChange(event);
            this.handleSearch(event.value);
          }}
          {...rest}
          />
      </Container>
    );
  }
};

  AutoCompleteInput.propTypes = {
    name: PropTypes.string.isRequired,
    searchFunction: PropTypes.func.isRequired,
    debounce: PropTypes.number
  };

  AutoCompleteInput.defaultProps = {
    debounce: 500
  };