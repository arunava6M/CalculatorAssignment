import React from 'react';
import './toggle-switch.styles.css';
export const ToggleSwitch = () => (
    <div className="toggleSwitch">
        <label className="switch" >
            <input type="checkbox" />
            <span className="slider round"></span>
        </label>
    </div>

);