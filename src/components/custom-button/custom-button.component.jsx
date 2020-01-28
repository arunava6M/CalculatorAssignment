import React from 'react';
import './custom-button.styles.scss';
import { ThemeContext } from '../../context/theme-context';

//this component can get any number of props and change its fuctionality and behaviour.
const CustomButton = ({ children, inverted, operator, ...otherProps }) => {

    return (
        <ThemeContext.Consumer>
            {
                value => (
                    <button className={`${value}  ${operator ? 'operator' : ''}  custom-button`} {...otherProps}>
                        {children}
                    </button>)
            }
        </ThemeContext.Consumer>

    )
};

export default CustomButton;