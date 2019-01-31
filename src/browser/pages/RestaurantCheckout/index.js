import React from 'react';
import styled from 'styled-components';

export default class extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { id } = this.props.match.params;

    return (
      <p>Restaurant checkout id = {id}</p>
    );
  }
}
