import React from 'react'
import DownloadApps from '../contents/DownloadApps'
import '../../styles/content.scss'
import SupportForm from "../contents/SupportForm";
import Text from "../contents/Text";
import Image from "../contents/Image";
import NewsLink from "../contents/NewsLink";
import Links, {EmailLink, LinksName, LinksNameShort} from "../contents/Links";

const images = require.context('../../_images', true);
const getComponent = function (item, idx, code, click) {
    // CONVERT TO REACT COMPONENTS FOR INSERTS //


    switch (item.type) {
        case 'text':
            return <Text key={idx} keyId={idx} content={item.content} class="contentText"/>
        case 'text_header':
            return <Text key={idx} keyId={idx} content={item.content} class="contentHeader"/>
        case 'image_small':
            const imageSmall = images(`./${code}/${item.link}`);
            return <Image key={idx} keyId={idx} image={imageSmall} class="contentImageSmall"/>;
        case 'image_full':
            const imageFull = images(`./${code}/${item.link}`);
            return <Image key={idx} keyId={idx} image={imageFull} class="contentImageFull"/>;
        case 'break':
            return <br key={idx} />;
        case 'line':
            return <hr key={idx} align="left" className="contentHR"/>;

        case 'news_link':
            return <NewsLink key={idx} keyId={idx} content={item.content} num={item.id - 1} click={click}/>
        case 'link_name_short':
            return <LinksNameShort key={idx} keyId={idx} link={item.link} content={item.content}/>;
        case 'link_name':
            return <LinksName key={idx} keyId={idx} link={item.link} content={item.content}/>;
        case 'link':
            return <Links key={idx} keyId={idx} link={item.link} content={item.content}/>;
        case 'email':
            return <EmailLink key={idx} keyId={idx} link={item.link} content={item.content}/>;
        case 'download':
            return <DownloadApps key={idx} keyId={idx} code={code} ios={item.ios} android={item.android} amazon={item.amazon} amazonNote={item.amazonNote} appName={item.appName}/>;
        case 'support':
            return <SupportForm key={idx} keyId={idx} code={code} name={item.name}/>;
        default:
           return <Text key={idx} keyId={idx} content={item.content}/>
        // ADD INLINE LINK
        // ADD CONTINUE
    }
};

function Content(props) {
    const click = props.click;
    const code = props.code;
    const content = props.content.map((item, idx) => getComponent(item, idx, code, click));
    return (
        <div className="content">
            {content}
        </div>
    );

}

export default Content;

