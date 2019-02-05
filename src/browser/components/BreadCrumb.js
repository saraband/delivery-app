import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ToolTip from 'COMPONENTS/ToolTip';
import { Link } from 'react-router-dom';
import Colors from 'CONSTANTS/Colors';
import { hexToRgbaString } from 'HELPERS';
import FontSizes from 'CONSTANTS/FontSizes';
import NullComponent from 'COMPONENTS/NullComponent';

const Container = styled.div`
padding-bottom: 20px;
`;

const StyledLink = styled(Link)`
  transition: all 0.2s ease-in-out;
  font-size: ${FontSizes.MEDIUM};
  padding: 8px 12px 8px 12px;
  
  &:hover {
    background-color: ${hexToRgbaString(Colors.BLUE, 0.1)};
  }
`;

const Label = styled.span`
  font-weight: ${p => p.active ? 'bold' : 'light'};
  color: ${p => p.active ? Colors.DARK_GREY : Colors.BLUE};
`;

const RenderChildrenComponent = ({ children }) => children;

export default class BreadCrumb extends React.Component {
  // prev and next children props will always be different
  // so this is to avoid re render
  shouldComponentUpdate = () => false;

  render () {
    return (
      <Container>
        {this.props.children.map(({ url, tip, label }, index) => {
          if (!url) {
            return <Label key={index} active>{label}</Label>;
          }

          // If no tooltip is provided, don't show anything
          const ToolTipComponent = tip
            ? ToolTip
            : RenderChildrenComponent;

          return (
            <ToolTipComponent key={index} label={tip}>
              <StyledLink to={url}>
                <Label>
                  {label}
                </Label>
              </StyledLink>
            </ToolTipComponent>
          );
        })}
      </Container>
    );
  }
}

BreadCrumb.propTypes = {
  children: PropTypes.array.isRequired
};