import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Content from './components/content';
import './Main.pcss';
/**
 * @author kozakluke@gmail.com
 */
class Main
{
    constructor()
    {
        window.onload = this.onLoad.bind(this);
    }
    
    private onLoad()
    {
        ReactDOM.render(
            <Content/>,
            document.getElementById('main')
        );
    }
}

new Main();
