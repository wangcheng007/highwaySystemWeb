import React, { Component } from 'react';
import NavSlider from '../_modules/navSlider/index';
import TopNavBar from '../_modules/topNavBar/index';

import Util from '../../common/js/util';

export default class Layout extends Component {
    constructor(props){
        super(props);

        this.state = {
            height: 0
        }
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

    componentDidMount () {
        this.setState({
            height: document.body.clientHeight - 60
        });
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
        const { height } = this.state;

        return (
            <div className='J_Page flex flex-column-direction' style={{width: '1265px'}}>
                <div className='J_Slider' style={{height: '60px'}}>
                    <TopNavBar />
                </div>

                <div className='J_Content flex-1 flex'>
                    <NavSlider />
                    <div
                        className='p-15 flex-1 bg-gray' 
                        style={{
                            height: `${height - 60}px`,
                            overflowX: 'hidden',
                            overflowY: 'scroll'
                        }}
                    >
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

