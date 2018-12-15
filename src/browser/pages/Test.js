import React from 'react';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import Colors from 'CONSTANTS/Colors';
import TrashIcon from 'ICONS/TrashIcon';
import ToolTip from 'COMPONENTS/ToolTip';
import Logo from 'DIST/images/logo.svg';
import Routes, { addParamsToUrl } from 'ROUTES';

class TestPage extends React.Component {
  render () {
    return (
      <div>
        <ToolTip label='Delete item'>
          <BaseButton
            icon={<TrashIcon height={20} color={Colors.LIGHT_GREEN}/>}
            color={Colors.LIGHT_GREEN}
            type={ButtonTypes.EMPTY} />
        </ToolTip>
        <Logo width={200} />
      </div>
    );
  }
};

export default TestPage
