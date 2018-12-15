import React from 'react';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import Colors from '../constants/Colors';

class TestPage extends React.Component {
  render () {
    return (
      <div>
        <BaseButton
          type={ButtonTypes.EMPTY}
          color={Colors.BLUE}>CLEAR</BaseButton>
      </div>
    );
  }
};

export default TestPage
