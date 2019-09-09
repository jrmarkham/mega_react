import React from 'react'
import '../../styles/app.scss'

const images = require.context('../../_images', true);

 function AppIcon(props) {
    const code = props.code;
     const image = images(`./appIcons/${code}/icon-144.png`);
     const prodIdx = props.prodIdx;


    return(
        <div className="iconDiv"  onClick={()=>props.click(code, 'about', prodIdx)}>
            <img alt={props.code} src={image} className="imageIcon"/>
        </div>
    );
}

export default AppIcon;
