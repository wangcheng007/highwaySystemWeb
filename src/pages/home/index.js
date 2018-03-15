import React from 'react';
import { Input, Button } from 'element-react';
import NavSlider from '../modules/NavSlider/index';
import TopNavBar from '../modules/TopNavBar/index';

import Util from '../../common/js/util';
import './style/index.less';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            list:[{
                text: '权限管理'
            }]
        }
    }

    render() {
        const { list } = this.state;

        return (
            <div>
                <TopNavBar />
                <NavSlider list={list}/>
            </div>
        );
    }
}