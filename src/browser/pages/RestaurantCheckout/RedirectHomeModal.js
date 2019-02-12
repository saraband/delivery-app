import React from 'react';
import styled from 'styled-components';
import Modal from 'COMPONENTS/Modal';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import Routes from 'ROUTES';

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  height: unset;
  padding: 50px;
  align-items: center;
`;

const Title = styled.h3`
  font-weight: normal;
  font-size: ${FontSizes.MEDIUM};
  color: ${Colors.BLUE};
  margin-bottom: 25px;
`;

const Subtitle = styled.h5`
  font-weight: normal;
  font-size: ${FontSizes.NORMAL};
  color: ${Colors.DARK_GREY};
`;

export default class RedirectHomeModal extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      this.props.clearBasket();
      document.location = Routes.HOME;
    }, 2000);
  }

  render () {
    return (
      <StyledModal>
        <Title>Your order has been successfully processed !</Title>
        <Subtitle>You will now be redirected to the home page.</Subtitle>
      </StyledModal>
    )
  }
}
