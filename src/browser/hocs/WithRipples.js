/*
 *  WithRipples.js
 *  ----------------
 *  HOC version of COMPONENT/RippleProvider `render props` component
 */

import React from 'react';
import RippleProvider from 'COMPONENTS/RippleProvider';

export default Component => {
  return class extends React.Component {
    render () {
      return (
        <RippleProvider>
          {(rippleProviderProps) => (
            <Component
              { ...this.props }
              { ...rippleProviderProps }
            />
          )}
        </RippleProvider>
      );
    }
  };
};
