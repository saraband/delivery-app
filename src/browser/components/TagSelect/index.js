import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import nullFunc from 'MISC/NullFunction';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';

const Container = styled.div`
  border: 1px solid blue;
  width: 300px; /* default, override this if necessary */
  height: 500px; /* default, override this if necessary */
`;

const Title = styled.h1``;
const List = styled.ul`
  list-style-type: none;
`;

const Tag = styled.li`
  padding: 10px;
  font-size: ${FontSizes.MEDIUM};
  color: ${Colors.BLACK};
`;

/*
 *  TODO: accessibility: arrow down and up to navigate through options
 */

export default class TagSelect extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isUnrolled: false
    };
  }

  selectTag = (tag) => {
    console.log(tag)
  }

  render () {
    const {
      options,
      title,
      selected
    } = this.props;
    const { isUnrolled } = this.state;

    return (
      <Container>
        {title && <Title>{title}</Title>}
        <List>
          {options.map((tag) => (
            <Tag
              key={tag.id}
              tabIndex={0}
              onClick={() => this.selectTag(tag)}
              onKeyPress={({ key }) => {
                if (key === 'Enter') {
                  this.selectTag(tag);
                }
              }}
              >
              {tag.value}
            </Tag>
          ))}
        </List>
      </Container>
    );
  }
};

const OptionShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired
});

TagSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(OptionShape).isRequired,
  selected: OptionShape,
  onSelect: PropTypes.func
};

TagSelect.defaultProps = {
  onSelect: nullFunc
};
