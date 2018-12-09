import React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
  display: inline-block;
`;

export default class extends React.PureComponent {
  render () {
    return (
      <StyledSVG
        dangerouslySetInnerHTML={{ __html: this.props.inTagRaw }}
        {...this.props}
        />
    );
  }
};