module.exports = function (source) {
  const regex = /<\s*svg([^>]*)>(.*)<\s*\/\s*svg\s*>/;
  const matches = regex.exec(source.replace(/\r?\n|\r/g, ''));

  const attributesRaw = matches[1];
  const inTagRaw = matches[2];

  const attributeRegex = /([a-zA-Z0-9_:]*)="([^"]*)"/g;
  let attributeMatches;
  let attributes = {};

  // Get all top levels attributes
  while (attributeMatches = attributeRegex.exec(attributesRaw)) {
    attributes[attributeMatches[1]] = attributeMatches[2];
  }

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