import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import BaseButton from 'COMPONENTS/Form/BaseButton';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import SearchSVG from 'ASSETS/images/search.svg'
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {createInputHandler, hexToRgb, hexToRgbaString} from 'HELPERS';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
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

const SearchIcon = styled(SearchSVG)`
  position: relative;
  height: ${FontSizes.SMALL};
  width: ${FontSizes.SMALL};
  border: 2px solid red;
`;

const StyledButton = styled(BaseButton).attrs({
  icon: <SearchIcon />
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
  z-index: 55;
  top: 100%;
  left: 0;
  margin-top: 10px;
  width: 100%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  background-color: ${Colors.WHITE};
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

// TODO: this is redundant
const blueRgb = hexToRgb(Colors.BLUE);
const Result = styled.h4`
  font-weight: lighter;
  padding: 10px;
  font-size: ${FontSizes.MEDIUM};
  cursor: pointer;
  background-color: ${p => p.focused ? hexToRgbaString(Colors.BLUE, 0.2) : 'white'};
  
  /* native focus happens when we click the option */
  &:focus,
  &:active {
    border-color: ${Colors.DARK_GREY};
    box-shadow: 0 0 0px 3px rgba(${blueRgb.r}, ${blueRgb.g}, ${blueRgb.b}, 0.3);
    outline: 0;
  }
`;

const Highlight = styled.span`
  color: ${Colors.BLUE};
  font-weight: normal;
`;

/*
 * TODO !!!!!!!
 * implement shouldCOmponentUpdate !
 */
export default class SearchInput extends React.PureComponent {
  constructor (props) {
    super(props);

    this.dropDownRef = React.createRef();
    this.inputRef = React.createRef();
    this.state = {
      value: props.value,
      lastSearchedValue: '',
      focusedOption: undefined,
      results: [],
      isDropDownVisible: false,
      isLoading: false
    };
  }

  handleKeyDown = (event) => {
    const {
      value,
      focusedOption,
      isDropDownVisible,
      lastSearchedValue,
      results
    } = this.state;
    const { key } = event;
    let nextFocusedOption = focusedOption;


    // Don't do anything if no there is no dropdown
    if (!isDropDownVisible || !results.length) {
      return;
    }

    // Prevents the cursor moving inside the input default behavior
    // for those key events
    if (key === 'ArrowDown' ||
      key === 'ArrowUp' ||
      key === 'Enter') {
      event.preventDefault();
    }

    switch (key) {
      case 'ArrowDown':
        if (focusedOption === undefined) {
          nextFocusedOption = 0;
        } else {
          nextFocusedOption = focusedOption + 1 >= results.length
            ? undefined
            : focusedOption + 1;
        }
        break;

      case 'ArrowUp':
        if (focusedOption !== undefined) {
          nextFocusedOption = (focusedOption - 1 < 0)
            ? undefined
            : focusedOption - 1;
        } else {
          nextFocusedOption = results.length - 1;
        }
        break;

      case 'Enter':
        // Select the current focused option and
        // submit the input
        this.selectOption(results[focusedOption].value);
        this.props.onSubmit(value);

        // Blur the input
        ('activeElement' in document) && document.activeElement.blur();
        break;
    }

    this.setState({
      focusedOption: nextFocusedOption
    });
  };

  handleChange = (event) => {
    const { lastSearchedValue } = this.state;
    const { value } = event;

    this.setState({
      value,

      // If the user clears the whole input
      // we hide the container instantly
      lastSearchedValue: value.length === 0
        ? ''
        : lastSearchedValue
    }, () => {

      // search if value exists
      if (value) {
        this.debounceSearch();
      }
    });
  };

  debounceSearch = debounce(async () => {
    const { value } = this.state;
    const results = await this.props.searchFunction(value);
    this.setState({
      results,
      lastSearchedValue: value,
      focusedOption: undefined
    });
  }, 50);

  selectOption = (value) => {
    // Select the value
    this.setState({
      value,
      isDropDownVisible: false,
      focusedOption: undefined
    });
  };

  /*  This is a bit messy
   */
  getHighlightedResult = ({ value, highlight: { from, to }}) => {
    return (
      <React.Fragment>
        {value.substring(0, from)}
        <Highlight>{value.substring(from, to)}</Highlight>
        {value.slice(to)}
      </React.Fragment>
    );
  };

  renderResults = () => {
    const {
      value,
      results,
      isLoading,
      lastSearchedValue,
      focusedOption
    } = this.state;

    if (results.length) {
      return (
        <ResultsList>
          {results.map((result, index) => (
            <Result
              key={result.id}
              onMouseOver={() => this.setState({ focusedOption: index })}
              onMouseOut={() => this.setState({ focusedOption: undefined })}
              focused={index === focusedOption}
              tabIndex={0} // this is important to have a relatedTarget when we blur input
              onClick={(event) => {
                // TODO: are those two lines really necessary ?
                event.stopPropagation();
                event.preventDefault();
                this.selectOption(result.value);
              }}
              >
              {this.getHighlightedResult(result)}
            </Result>
          ))}
        </ResultsList>
      );
    }

    return (
      <NoResults>
        There seem to be no results for `{lastSearchedValue}`
      </NoResults>
    );
  }

  render () {
    const {
      name,
      placeholder,
      onSubmit,
      ...rest
    } = this.props;
    const {
      value,
      isDropDownVisible,
      lastSearchedValue
    } = this.state;

    return (
      <Container {...rest}>
        <StyledInput
          name={name}
          value={value}
          ref={this.inputRef}
          onKeyDown={this.handleKeyDown}
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
          type={ButtonTypes.FULL}
          onClick={() => onSubmit(value)}
          />

        {/* RESULTS TODO: semantically weird */}
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
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

SearchInput.defaultProps = {
  placeholder: '[Undefined placeholder]',
  value: ''
};
