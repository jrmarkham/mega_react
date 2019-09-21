import React from 'react'
import '../../styles/app.scss'
import '../../styles/nav.scss'
function AppNav(props) {
    const code = props.code;
    const prodIdx = props.prodIdx;
    const lastIdx = props.navItems.length - 1;
    const navItems = props.navItems.map((item, idx )=>
        <div key={idx} className="navItem"><span className="navItemClick" onClick={()=>props.click(code, item, prodIdx, true )} >{item}</span>{(lastIdx!==idx)&&<span className="lineItem">|</span>}</div>

    );
    return(
        <div className="appNav">
            {navItems}
        </div>
    );
}

export default AppNav;
