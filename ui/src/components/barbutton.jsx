import React from'react';
import "./css/barbutton.css"
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export function BarButton({params}) {

    return (
        <Link to={params.path}>
        <div className="bar-button">
            <div>
                
                <span >
                    {params.name}
                </span>
            </div>
        </div>
        </Link>
        )
}

export default BarButton;