import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import nullFunc from 'MISC/NullFunction';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import Tag from './Tag';

const Container = styled.div`
  border: 1px solid blue;
  width: 300px; /* default, override this if necessary */
  height: 500px; /* default, override this if necessary */
`;

const Title = styled.h1``;
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
      title,
      selected,
      onSelect,
      ...rest
    } = this.props;
    const { isUnrolled } = this.state;

    return (
      <Container {...rest}>
        {title && <Title>{title}</Title>}
        <List>
          {options.map((tag) => (
            <Tag
              key={tag.id}
              onSelect={() => onSelect(tag)}
              {...tag}
              />
          ))}
        </List>
      </Container>
    );
  }
};

const OptionShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.string.isRequired
});

FlatSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(OptionShape).isRequired,
  selected: OptionShape,
  onSelect: PropTypes.func
};

FlatSelect.defaultProps = {
  onSelect: nullFunc
};
