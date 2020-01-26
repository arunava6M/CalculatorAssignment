import React from 'react';
import './custom-button.styles.scss';

//this component can get any number of props and change its fuctionality and behaviour.
const CustomButton = ({ children, inverted, operator, ...otherProps }) => (
    <button className={`${inverted ? 'inverted' : ''}  ${operator ? 'operator' : ''}  custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;