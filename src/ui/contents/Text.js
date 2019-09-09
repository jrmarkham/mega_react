import React from 'react'
import '../../styles/content.scss'
function Text(props) {
    return(
        <div key={props.keyId} className={props.class}>{props.content}</div>
    );
}

export default Text;
