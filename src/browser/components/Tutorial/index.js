/**
 * WIP (currently unused)
 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 2px solid blue;
  position: relative;
`;

const Panel = styled.div`
  position: fixed;
  z-index: 9999;
  background-color: black;
  opacity: 0.3;
  ${p => {
    return `
      left: ${p.x}px;
      width: ${p.w}px;
      height: ${p.h}px;
      top: ${p.y}px;
    `;
  }}
`;

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    const bounds = this.ref.current.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;
    console.log(bounds)
    console.log(innerHeight)

    setTimeout(() => {
      this.forceUpdate();
    }, 200)
  }

  render () {
    const renderBox = !!this.ref.current;

    if (renderBox) {
      this.bounds = this.ref.current.getBoundingClientRect();
    }

    return(//<Panel x={this.bounds.right} y={0} w={window.innerWidth - this.bounds.right} h={window.innerHeight} />
      <Container ref={this.ref}>
        {renderBox &&
          <React.Fragment>
            <Panel x={this.bounds.right} y={0} w={window.innerWidth - this.bounds.right} h={window.innerHeight} />
            <Panel x={0} y={0} w={this.bounds.left} h={window.innerHeight} />
            <Panel x={this.bounds.left} y={0} w={this.bounds.width} h={this.bounds.top} />
            <Panel x={this.bounds.left} y={this.bounds.bottom} w={this.bounds.width} h={window.innerHeight - this.bounds.bottom} />
          </React.Fragment>
        }
        {this.props.children}
      </Container>
    );
  }
}