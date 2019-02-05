import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default class InfiniteScroll extends React.PureComponent {
  constructor (props) {
    super(props);

    this.ref = React.createRef();
    this.scrollTick = false;
    this.state = {

    };
  }

  componentDidMount () {
    document.addEventListener('scroll', this.watchScroll);
    this.checkScroll();
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.watchScroll);
  }

  watchScroll = () => {
    if (!this.scrollTick) {
      this.scrollTick = true;
      window.requestAnimationFrame(this.checkScroll);
    }
  };

  checkScroll = () => {
    const top = this.ref.current.getBoundingClientRect().top - window.innerHeight;

    // Triggers if the user has scrolled almost to the bottom of the page
    if (top < 0) {
      this.props.fetchMore();
    }

    this.scrollTick = false;
  };

  render () {
    return (
      <Container ref={this.ref} />
    );
  }
};
