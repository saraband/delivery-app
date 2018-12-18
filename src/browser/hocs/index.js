/*
 *  HOCs alternative of the render props components
 *  of the app
 */

import React from 'react';
import FormValidator from 'COMPONENTS/Form/FormValidator';
import RippleProvider from 'COMPONENTS/RippleProvider';

// Takes a render props component, returns a HOC
export function createSimpleHOC (RenderPropsComponent) {
  return (Component) => class extends React.Component {
    render () {
      return (
        <RenderPropsComponent>
          {(forwardProps) => (
            <Component
              {...this.props}
              {...forwardProps}
              />
          )}
        </RenderPropsComponent>
      );
    }
  };
}

export const withRipples = createSimpleHOC(RippleProvider);
export const withValidator = createSimpleHOC(FormValidator);
