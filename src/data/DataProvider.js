import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import DataContext from "./DataContext";



class DataProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentLevel: '',
            route: null,
            currentContent: []
        };
        // immutables
        const host = window.location.host;
        this.dataURL = host.includes('localhost')? "http://localhost:8888" : "https://mega.markhamenterprises.com/data-php/";
        this.nav = [];
        this.apps = [];
        this.appsDisplay = [];
        this.content = {};
        this.newsContent = [];
        this.navHandler = this.navHandler.bind(this);
    }

    componentDidMount() {
        this.getData();
        window.onpopstate = (event) => {
            event.preventDefault();
            this.routePage();
        };
        window.scrollTo(0, 0);
    }


    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    getQueryStringItem(field) {
        const href = window.location.href;
        const reg = RegExp('[?&]' + field + '=([^&#]*)', 'i');
        const string = reg.exec(href);
        return string ? string[1] : null;
    }



    routePage() {
        const level = this.getQueryStringItem('level');
        const item = this.getQueryStringItem('type');
        const num = this.getQueryStringItem('page');
        if(null == level || null == item || this.apps.length < 1){
            // set default content
            this.setState({
                currentContent: this.content['about'],
                currentLevel: 'main'
            });

            return;
        }
        const code = 'main' === level ? 'main': this.apps[num].code;
        this.navHandler(code, item, num);
    }

    getRoute(){
        if(this.state.loading || this.state.route == null)return;
        return <Redirect to={this.state.route}/>
    }


    navHandler(code, item, num) {
        const parseItem = (item === 'game help') ? 'game_help' : item;
        this.appsDisplay = this.apps;
        // alert('nav item' + navItem);
        // create current_content array //
        // const num = 0; // use for news
        // console.log('nav handler' ,code, item, num);
        let content = [];
        let level = 'main';
        if (item === 'news') {
            if (undefined === num) num = this.newsContent.length - 1;
            content = this.newsContent[num];
        } else if (code === 'main') {
            content = this.content[item];
            num = 0;
        } else {
            level = 'product';
            switch (item) {
                case 'support':
                    content = [{type: 'support', name: this.apps[num].name}];
                    break;
                case 'download':
                    //content = [{type:'text', content:'create download page for each app. w/ links'}];
                    content = [{
                        type: 'download',
                        amazon: this.apps[num].amazon,
                        ios: this.apps[num].ios,
                        android: this.apps[num].android,
                        appName: this.apps[num].app_name,
                        amazonNote:this.apps[num].amazon_note
                    }];
                    break;
                default:
                    // regular content
                    let appItem = parseItem + '_' + code;
                    content = this.content[appItem];
                    break;
            }



            // this.apps;

        }

        // reoder apps
         if(level === 'product'){
             this.appsDisplay = [];
             this.appsDisplay.push(this.apps[num]);
            this.apps.forEach((item, index) =>{if(num != index) this.appsDisplay.push(item)});
         }




        this.setState({
            currentContent: content,
            currentLevel: code,
            route: '?level=' + level + '&type=' + parseItem + '&page=' + num
        });
    }

    getData() {
        fetch(this.dataURL)
            .then(response => response.json())
            .then(data => {
                for (const key in data) {
                    if (key === "nav") {
                        for (const navKey in data[key]) {
                            this.nav.push(data[key][navKey].name);
                        }
                        continue;
                    }

                    if (key === "apps") {
                        for (const appKey in data[key]) {
                            this.apps.push(data[key][appKey]);
                        }
                        continue;
                    }

                    if (key === "news") {
                        const otherNews = data[key].other_news;
                        const newsLinks = data[key].news_links;
                        const newsFinal = data[key].final_link;
                        const len = data[key].news_count;

                        for (let i = 0; i < len; i++) {
                            const content = [];
                            // add new item
                            for (const newsKey in data[key][i].content) {
                                content.push(data[key][i].content[newsKey]);

                            }
                            // other new elements
                            if (len > 1) {
                                for (const newsKey in otherNews) {
                                    content.push(otherNews[newsKey]);
                                }
                                // links
                                for (const newsKey in newsLinks) {
                                    content.push(newsLinks[newsKey]);
                                }
                            }
                            // final closing link
                            for (const newsKey in newsFinal) {
                                content.push(newsFinal[newsKey]);
                            }
                            this.newsContent.push(content);

                        }
                        continue;
                    }
                    this.content[key] = data[key];

                }





                this.appsDisplay = this.apps;
                this.routePage();
                this.setState({
                    loading: false
                });
            });
    }


    render() {
         return (
            <DataContext.Provider
                value={{
                    loading: this.state.loading,
                    nav: this.nav,
                    apps: this.appsDisplay,
                    currentLevel: this.state.currentLevel,
                    currentContent: this.state.currentContent,
                    navHandler: this.navHandler
                }}
            >
                {this.props.children}
                {this.getRoute()}
            </DataContext.Provider>
        );
    }
}

export default DataProvider;
