import React, { Component } from 'react';
import NavSlider from '../_modules/navSlider/index';
import TopNavBar from '../_modules/topNavBar/index';

import Util from '../../common/js/util';
import './style/index.less';

export default class Layout extends Component {
    constructor(props){
        super(props);
    }
    setStateSafe(obj, fun) {
        if(this.mounted) {
            this.setState(obj, fun);
        }
    }

    componentWillMount() {
        this.mounted = true;
        this.getUserInfo();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getUserInfo(){
        Util.fetch({
            url: '/user/info',
            type: 'get',
            dataType: 'json'
        }).then((resData) => {
            if(resData && resData.returnCode === '1001'){
                if (!window.localStorage.getItem('user')) {
                    window.localStorage.setItem('user', JSON.stringify(resData.data.user));
                }
            } else {
                window.location.href = '/';
            }
        });
    }

    render(){
        return (
            <div id='J_Page'>
                <div id='J_Slider'>
                    <TopNavBar />
                </div>

                <div className='J_Content flex'>
                    <NavSlider />
                    <div className='p-15'>
                        { this.props.children }
                    </div>
                </div>
               
            </div>
        );
    }
}

Layout.propTypes = {
    children: React.PropTypes.node
};

