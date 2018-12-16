import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import BaseButton from 'COMPONENTS/Form/BaseButton';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import SearchIcon from 'ICONS/SearchIcon';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { createInputHandler, hexToRgbaString } from 'HELPERS';
import { FlexRowCss } from 'MISC/Styles';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 350px;
  position: relative;
`;
const StyledInput = styled(BaseInput).attrs({
  // TODO: refactor this
  inputStyle: `
    border-radius: 3px 0 0 3px;
  `
})`
  flex-grow: 1;
  width: unset;
`;

const StyledButton = styled(BaseButton).attrs({
  icon: <SearchIcon height={FontSizes.MEDIUM} />
})`
  border-radius: 0 3px 3px 0;
  border: 1px solid ${Colors.BLUE};
  border-left: 0;
  box-shadow: unset;
  flex-shrink: 0;
  flex-grow: 0;
`;

const DropDownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 20px;
  width: 100%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Result = styled.h4`
  font-weight: lighter;
  padding: 10px;
  font-size: ${FontSizes.MEDIUM};
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: ${hexToRgbaString(Colors.BLUE, 0.2)};
  }
`;

export default class SearchInput extends React.PureComponent {
  constructor (props) {
    super(props);

    this.dropDownRef = React.createRef();
    this.buttonRef = null; // This will be callbacked by the button after it gets mounted
    this.state = {
      value: '',
      lastSearchedValue: '',
      results: [],
      isDropDownVisible: false,
      isLoading: false
    };
  }

  handleChange = (event) => {
    const { lastSearchedValue } = this.state;
    this.setState({
      value: event.value,

      // If the user clears the whole input
      // we hide the container instantly
      lastSearchedValue: event.value.length === 0
        ? ''
        : lastSearchedValue
    }, this.debounceSearch);
  };

  debounceSearch = debounce(async () => {
    const { value } = this.state;
    const results = await this.props.searchFunction(value);
    this.setState({
      results,
      lastSearchedValue: value
    });
  }, 500);

  selectOption = (value) => {
    // Select the value
    this.setState({
      value,
      isDropDownVisible: false
    }, () => {

      // Focus the button
      if (this.buttonRef) {
        this.buttonRef.focus();
      }
    });
  }

  renderResults = () => {
    const {
      value,
      results,
      isLoading
    } = this.state;

    if (results.length) {
      return (
        <ResultsList>
          {results.map((result) => (
            <Result
              key={result.id}
              tabIndex={0} // this is important to have a relatedTarget when we blur input
              onClick={(event) => {
                // TODO: are those two lines really necessary ?
                event.stopPropagation();
                event.preventDefault();
                this.selectOption(result.value);
              }}
              >
              {result.value}
            </Result>
          ))}
        </ResultsList>
      );
    }

    return (
      <NoResults>
        There seem to be no results for `{value}`
      </NoResults>
    );
  }

  render () {
    const {
      name,
      placeholder,
      onSubmit
    } = this.props;
    const {
      value,
      isDropDownVisible,
      lastSearchedValue
    } = this.state;

    return (
      <Container>
        <StyledInput
          name={name}
          value={value}
          onFocus={() => this.setState({ isDropDownVisible: true })}
          onBlur={(event) => {
            // check if the element that provoked the blur is the result list
            // if not, hide dropdown
            if (!this.dropDownRef.current || (!this.dropDownRef.current.contains(event.relatedTarget) &&
              event.relatedTarget !== this.dropDownRef.current)) {
              this.setState({ isDropDownVisible: false });
            }
          }}
          onChange={this.handleChange}
          placeholder={placeholder}
          />
        <StyledButton
          // TODO: might refactor this ref thing
          // TODO: this is a bit messy
          retrieveRef={(element) => this.buttonRef = element}
          type={ButtonTypes.FULL}
          onClick={onSubmit}
          />

        {/* RESULTS */}
        {isDropDownVisible && lastSearchedValue &&
          <DropDownContainer ref={this.dropDownRef}>
            {this.renderResults()}
          </DropDownContainer>
        }
      </Container>
    );
  }
}

SearchInput.propTypes = {
  searchFunction: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

SearchInput.defaultProps = {
  placeholder: '[undefined placeholder]'
};