import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import nullFunc from 'MISC/NullFunction';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import Tag from './Tag';
import Section from 'COMPONENTS/Section'

const Title = styled.h3`
  font-size: ${FontSizes.MEDIUM};
  text-align: center;
  color: ${Colors.GREY};
  margin: 10px;
  font-weight: lighter;
`;
const List = styled.ul`
  list-style-type: none;
`;

/*
 *  TODO: accessibility: arrow down and up to navigate through options
 */

export default class FlatSelect extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isUnrolled: false
    };
  }

  render () {
    const {
      options,
      selected,
      onSelect,
      ...rest
    } = this.props;
    const { isUnrolled } = this.state;

    return (
      <Section {...rest}>
        <List>
          {options.map((tag) => (
            <Tag
              key={tag.id}
              onSelect={() => onSelect(tag)}
              >
              {tag.value}
            </Tag>
          ))}
        </List>
      </Section>
    );
  }
};

const OptionShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.string.isRequired
});

FlatSelect.propTypes = {
  options: PropTypes.arrayOf(OptionShape).isRequired,
  selected: OptionShape,
  onSelect: PropTypes.func
};

FlatSelect.defaultProps = {
  onSelect: nullFunc
};
