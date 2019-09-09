import React from 'react'
import '../../styles/app.scss'
import '../../styles/nav.scss'
function AppNav(props) {
    const code = props.code;
    const prodIdx = props.prodIdx;
    const lastIdx = props.navItems.length - 1;
    const navItems = props.navItems.map((item, idx )=>
        <div key={idx} onClick={()=>props.click(code, item, prodIdx, true )} className="navItem"><span>{item}</span>{(lastIdx!==idx)&&<span className="lineItem">|</span>}</div>

    );
    return(
        <div className="appNav">
            {navItems}
        </div>
    );
}

export default AppNav;
