import { func } from 'prop-types';
import React from'react';
import "./css/barbutton.css"

export function BarButton({params}) {
    function handleClick() {
        window.location.href = params.path;
    }
    return (
        <div className="bar-button" onClick={handleClick}>
            <div className="bar-button-button" >
                
                <span className="bar-button-label">
                    {params.name}
                </span>
            </div>
        </div>
        )
}

export default BarButton;