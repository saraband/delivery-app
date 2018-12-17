import React from 'react';
import styled, { css, keyframes } from 'styled-components';
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
  cursor: pointer;
  
  background-color: ${p => p.focused ? hexToRgbaString(Colors.BLUE, 0.2) : 'white'};
`;

export default class SearchInput extends React.PureComponent {
  constructor (props) {
    super(props);

    this.dropDownRef = React.createRef();
    this.buttonRef = null; // This will be callbacked by the button after it gets mounted
    this.state = {
      value: '',
      lastSearchedValue: '',
      focusedOption: undefined,
      results: [],
      isDropDownVisible: false,
      isLoading: false
    };
  }

  handleKeyDown = (event) => {
    const {
      focusedOption,
      isDropDownVisible,
      lastSearchedValue,
      results
    } = this.state;
    const { key } = event;
    let nextFocusedOption = focusedOption;

    // todo: weird, we should only check if isDropDownVisible is true
    if (!isDropDownVisible || !lastSearchedValue || !results.length) {
      return;
    }

    // Prevents the cursor moving inside the input
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
        if (focusedOption !== undefined) {
          this.selectOption(results[focusedOption].value);
        }
        break;
    }

    this.setState({
      focusedOption: nextFocusedOption
    });
  };

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
      lastSearchedValue: value,
      focusedOption: undefined
    });
  }, 200);

  selectOption = (value) => {
    // Select the value
    this.setState({
      value,
      isDropDownVisible: false,
      focusedOption: undefined
    }, () => {

      // Focus the button
      if (this.buttonRef) {
        this.buttonRef.focus();
      }
    });
  }

  /*  This is a bit messy
   */
  getHighlightedValue = (value, filter) => {
    const regex = new RegExp(filter, 'i');
    const match = regex.exec(value);
    const highlightedValue = value.replace(regex, `<strong style='color: ${Colors.BLUE}; font-weight: normal;'>${match}</strong>`);
    return <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />;
  };

  renderResults = () => {
    const {
      value,
      results,
      isLoading,
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
              {this.getHighlightedValue(result.value, value)}
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
          // TODO: might refactor this ref thing
          // TODO: this is a bit messy
          retrieveRef={(element) => this.buttonRef = element}
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
  placeholder: PropTypes.string
};

SearchInput.defaultProps = {
  placeholder: '[Undefined placeholder]'
};