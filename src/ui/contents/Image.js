import React from 'react'
import '../../styles/content.scss'
function Image(props) {
    return(
        <div  key={props.keyId} ><img alt={props.image} src={props.image} className={props.class}/></div>
    );
}

export default Image;
