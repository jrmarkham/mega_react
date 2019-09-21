import React from 'react'
import '../styles/nav.scss'
function MainNav(props) {
    const lastIdx = props.navItems.length - 1;
    const navItems = props.navItems.map((item, idx )=>
        <div key={idx}  className="navItem"><span className="navItemClick" onClick={()=>props.click('main', item)}>{item}</span>{(lastIdx!==idx)&&<span className="lineItem">|</span>}</div>

    );
    return(
        <div className="nav">
            {navItems}
        </div>
    );
}

export default MainNav;
