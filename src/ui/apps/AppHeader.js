import React from 'react'
import '../../styles/app.scss'
function AppHeader(props) {
    const title = props.title;
    return(
        <div className="appHeader">{title}</div>
    );
}

export default AppHeader;
