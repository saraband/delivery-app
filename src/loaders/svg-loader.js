/**
 *  This loader takes a svg and turns it into a React component
 *  that will inline it and allows to add more props to the top-level <svg> tag
 */

module.exports = function (source) {

  // Find the <svg> tag
  const regex = /<\s*svg([^>]*)>(.*)<\s*\/\s*svg\s*>/;
  const matches = regex.exec(source.replace(/\r?\n|\r/g, ''));

  // Retrieve attributes
  const attributesRaw = matches[1];
  const inTagRaw = matches[2];

  // Parse attributes
  const attributeRegex = /([a-zA-Z0-9_:]*)="([^"]*)"/g;
  let attributeMatches;
  let attributes = {};

  while (attributeMatches = attributeRegex.exec(attributesRaw)) {
    attributes[attributeMatches[1]] = attributeMatches[2];
  }

  // Inline svg
  const output = `
    import React from 'react';
    import SVGComponent from 'COMPONENTS/SVGComponent';
    
    export default class extends React.PureComponent {
      render () {
        return <SVGComponent
          {...${JSON.stringify(attributes)}}
          inTagRaw={\`${inTagRaw}\`}
          {...this.props}
          />;
      }
    }
  `;

  this.callback(null, output);
};
