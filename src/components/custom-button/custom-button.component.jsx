import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, inverted, operator, ...otherProps }) => (
    <button className={`${inverted ? 'inverted' : ''}  ${operator ? 'operator' : ''}  custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;