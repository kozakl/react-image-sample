import * as React from 'react';
import * as style from './Content.pcss';
import ResponsiveImage from '../src/index';
import {PureComponent} from 'react';
import {Images} from './types';
/**
 * @author kozakluke@gmail.com
 */
export default class Content extends PureComponent<Props, State>
{
    private images:Images = {
        'assets/room1': {width: 4104, height: 2310},
        'assets/room2': {width: 1200, height: 900}
    };
    
    constructor(props:Props)
    {
        super(props);
        
        this.state = {
            path: 'assets/room1'
        };
    }
    
    onClick = ()=> {
        this.setState({path: 'assets/room2'});
    };
    
    render()
    {
        return (
            <div className={style.content}>
                <button onClick={this.onClick}>on load</button>
                <div>
                    <ResponsiveImage
                        className={style.image}
                        ratio={this.images[this.state.path].height /
                               this.images[this.state.path].width}
                        thumb={`${this.state.path}_thumb.jpg`}
                        srcSet={`${this.state.path}_700w.jpg 700w,
                                 ${this.state.path}_525w.jpg 525w,
                                 ${this.state.path}_400w.jpg 400w,
                                 ${this.state.path}_1400w.jpg 1400w`}
                        sizes="(max-width: 700px) 700px,
                               (max-width: 1050px) 525px,
                               400px"/>
                </div>
            </div>
        );
    }
}

interface Props { }

interface State {
    path:string;
}
