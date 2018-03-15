import React, { Component } from 'react';

import Util from '../../../common/js/util';
import defaultImg from '../../../common/img/default.jpeg';

import './style/index.less';

export default class NavSlider extends Component {
    constructor (props) {
        super(props);

        this.state = {
            userPermission: {},
            height: 0
        }
    }

    componentDidMount () {
        Util.fetch({
            url: '/user/getPerssion',
            type: 'get',
            dataType: 'json'
        }).then((res) => {
            console.log(res);
            if (res.returnCode === '1001') {
                this.setState({
                    userPermission: res.data.user_permission,
                    height: document.body.clientHeight - 60
                });
            }
        });
    }

    render () {
        const { height, userPermission } = this.state;

        return (
            <div className='module-nav-slider bg-black' style={{height: height}}>
                <div className='user-info m-t-15 flex flex-center-align flex-column-direction'>
                    <img src={userPermission.img || defaultImg}/>
                    <div className='text text-white text-mini m-t-5'>
                        {userPermission.username}
                    </div>
                </div>
            </div>
        );
    }
}