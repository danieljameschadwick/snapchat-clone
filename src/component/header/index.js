import React from 'react';
import Button from '../../common/button';

import '../../styles/header.scss';

const Header = ({
    toggleCameraMode
}) => {    
    return (
        <header className="header" data-test="header">
            <div className="right">
                <Button
                    icon="faRetweet"
                    buttonClass="btn-flip-camera"
                    onclick={toggleCameraMode}
                />
            </div>
        </header>
    );
};

export default Header;