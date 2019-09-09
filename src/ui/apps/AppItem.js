import React from "react";
import '../../styles/app.scss'
import AppHeader from "./AppHeader";
import AppNav from "./AppNav";
import AppIcon from "./AppIcon";
import Content from "../contents/Content";

function AppItem(props) {
    const title = props.appData.name; // + ' -- '+  props.appData.code;
    const code = props.appData.code;
    const content = props.content;
    //default start nav
    const nav = ['download', 'about'];
    if (props.appData.help) nav.push('help');
    if (props.appData.game_help) nav.push('game help');
    if (props.appData.faq) nav.push('faq');
    if (props.appData.media) nav.push('media');

    // default end nav
    nav.push('support');

    return (
        <div className="app">
            <AppIcon code={code} click={props.click} prodIdx={props.appIdx}/>
            <AppHeader title={title}/>
            <AppNav navItems={nav} code={code} prodIdx={props.appIdx} click={props.click}/>
            <Content content={content} code={code} />
        </div>
    );
}

export default AppItem;
