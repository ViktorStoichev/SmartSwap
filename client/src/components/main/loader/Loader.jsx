import React from "react";
import './Loader.css'

function Loader() {
    return (
        <div className="loader-container">
            <span className="loader"></span>
        </div>
    );
}

export default React.memo(Loader);