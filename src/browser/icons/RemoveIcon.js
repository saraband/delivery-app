import React from 'react';
import Colors from '../constants/Colors';

export default function ({ color = Colors.BLACK, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.9 106.9" {...rest}>
      <path fill={color} d="M66.8 66.8h33.4c3.7 0 6.7-3 6.7-6.7V46.8c0-3.7-3-6.7-6.7-6.7H6.7c-3.7 0-6.7 3-6.7 6.7v13.4c0 3.7 3 6.7 6.7 6.7h33.4"/>
    </svg>
  );
}