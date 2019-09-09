import React from 'react'
import '../../styles/download-apps.scss'
const images = require.context('../../_images', true);


function getAppDiv(link, code, type, appName, storeName, notAvailable) {
    const image =  images(`./appIcons/${code}/${type}.png`);
    switch (link){
        case 'never': return <div></div>
        case 'na':return <div className="down-app"><img className="down-app-image" alt={type} src={image} /><div className="down-app-text"><span className="down-app-text-top">{appName}</span><br/><span className="down-app-text-bottom">{notAvailable}</span></div></div>
        default:return <div className="down-app"><a href={link} target='_blank' rel='noopener noreferrer'><img className="down-app-image" alt={type} src={image} /><div className='down-app-text'><span className="down-app-text-top">{appName}</span><br/><span className="down-app-text-bottom">{storeName}</span></div></a></div>
    }

}


function DownloadApps (props) {
    const code = props.code;
    const appName = props.appName;
    const ios = props.ios;
    const iosStore = 'in the App Store';
    const iosStoreNa = 'Coming Soon (App Store)';
    const iosDiv =  getAppDiv(ios, code, 'ios', appName, iosStore, iosStoreNa);
    const android = props.android;
    const androidStore = 'in the Play Store';
    const androidStoreNa = 'Coming Soon (Play Store)';
    const androidDiv =  getAppDiv(android, code, 'android', appName, androidStore, androidStoreNa);
    const amazon = props.amazon;
    const amazonStore = 'on Amazon';
    const amazonStoreNa = 'Coming Soon (Amazon)';
    const amazonDiv =  getAppDiv(amazon, code, 'amazon', appName, amazonStore, amazonStoreNa);
    return (

        <div className="down-con">
            {iosDiv}{androidDiv}{amazonDiv}
        </div>
    )

}

export default DownloadApps;

