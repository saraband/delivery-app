import React from 'react';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import Colors from '../constants/Colors';
import TrashIcon from 'ICONS/TrashIcon';

class TestPage extends React.Component {
  render () {
    return (
      <div>
        <BaseButton
          icon={<TrashIcon height={20} color={Colors.LIGHT_GREEN}/>}
          color={Colors.LIGHT_GREEN}
          type={ButtonTypes.EMPTY} />
      </div>
    );
  }
};

export default TestPage
