import React from 'react'
import '../../styles/content.scss'


function NewsLink(props) {
    return(
        <div key={props.keyId} onClick={()=>props.click('main','news', props.num, true)} className="contentLink">{props.content}</div>
    );
}

export default NewsLink;
