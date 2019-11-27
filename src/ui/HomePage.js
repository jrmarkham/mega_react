import React from 'react'
import DataContext from '../data/DataContext';
import '../styles/index.scss';
import WaterMark from './WaterMark';
import Header from './Header';
import MainNav from './MainNav';
import Content from './contents/Content';
import AppItem from './apps/AppItem';


function HomePage() {

    return (

        <div className='page'>
            <WaterMark/>

            <DataContext.Consumer>
                {context =>
                    <div className="contentContainer">
                        <Header click={context.navHandler}/>
                        <MainNav navItems={context.nav} click={context.navHandler} code="main"/>
                        <Content content={(context.currentLevel === 'main') ? context.currentContent : []}
                                 click={context.navHandler} code="main"/>
                        <div id="appsList">
                            {context.apps.map((app, idx) => (
                                <AppItem key={idx} appData={app} appIdx={app.num}
                                         content={(context.currentLevel === app.code) ? context.currentContent : []}
                                         click={context.navHandler}/>
                            ))
                            }
                        </div>
                    </div>
                }
            </DataContext.Consumer>

        </div>
    )

}

export default HomePage;
