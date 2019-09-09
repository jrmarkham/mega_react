import React from 'react'
import '../../styles/content.scss'


function Links(props) {
    return(
        <div key={props.keyId} className='contentText'><span className='contentLeft'>{props.content}:</span><span
            className='contentRightLink'><a href={props.link} target='_blank' rel='noopener noreferrer'>{props.link}</a></span></div>
    );
}

export default Links;

export function LinksName(props) {
    return(
        <div key={props.keyId} className='contentText'><span className='contentLeft'>{props.content}:</span><span
            className='contentRightLink'><a href={props.link} target='_blank' rel='noopener noreferrer'>{props.content}</a></span></div>
    );
}

export function LinksNameShort(props) {
    return(
        <div key={props.keyId} className='contentLink'><a href={props.link} target='_blank' rel='noopener noreferrer'>{props.content}</a></div>
    );
}




export function EmailLink(props) {
    const emailLink = 'mailto:' + props.link;
    return(
        <div key={props.keyId} className='contentText'><span className='contentLeft'>{props.content}:</span><span
            className='contentRightLink'><a href={emailLink} target='_blank' rel='noopener noreferrer'>{props.link}</a></span></div>
    );
}

