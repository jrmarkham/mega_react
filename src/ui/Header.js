import React from 'react'
import '../styles/header.scss'
function Header(props) {
    return(
        <div className="header" onClick={()=>props.click('main', 'about')}></div>
    );
}

export default Header;
