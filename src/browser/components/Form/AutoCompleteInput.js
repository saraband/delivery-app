import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import Colors from 'CONSTANTS/Colors';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledInput = styled(BaseInput)`
  border-radius: 3px 3px 0 0;
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  border: 1px solid ${Colors.DARK_GREY};
    border-radius: 0 0 3px 3px;
  margin-top: -1px;
  top: 100%;
  left: 0;
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
    console.log('Searching...');
    const results = await this.props.searchFunction(value);
    console.log('=> ', results);

    this.setState({
      list: results,
      isDropDownVisible: false
    });
  };

  render () {
    const {
      onChange,
      ...rest
    } = this.props;
    const {
      isDropDownVisible,
      list
    } = this.state;

    return (
      <Container>
        <StyledInput
          onChange={(event) => {
            onChange(event);
            return this.handleSearch(event.value);
          }}
          {...rest}
          />
        {isDropDownVisible || true &&
          <DropDown>
          </DropDown>
        }
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
