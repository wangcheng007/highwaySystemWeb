import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { Tooltip, MessageBox, Message } from 'element-react';

import Util from '../../../common/js/util';

import './style/index.less';
import defaultImg from '../../../common/img/default.jpeg';

export default class TopNavBar extends Component {
    constructor (props) {
        super(props);

        this.state = {

        }
    }

    logout () {
        MessageBox.confirm('确定要退出登录吗?', '提示', {
            type: 'warning'
        }).then(() => {
            Util.fetch({
                url: '/user/logout',
                type: 'get',
                dataType: 'json'
            }).then((res) => {
                if (res.returnCode === '1001') {
                    Message({
                        type: 'success',
                        message: '退出成功!'
                    });

                    hashHistory.push('/');
                    delete window.user;
                }
            });
        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消操作'
            });
        });
    }

    render () {
        console.log(window.localStorage.getItem('user'));
        return (
            <div className='module-top-navbar bg-green flex'>
                <div className='title text text-white flex flex-center-align flex-center-justify'>HWay</div>
                <div className='flex-1 flex flex-center-align flex-end-justify m-r-15'>
                
                    <div className='user-info flex flex-center-align'>
                        <img src={defaultImg} className='user-img m-r-15'/>
                        <span className='text text-white m-r-15'>{JSON.parse(window.localStorage.getItem('user')).username}</span>
                    </div>

                    <Tooltip effect='dark' content='退出登录' placement='bottom-end'>
                        <div className='logout' onClick={() => this.logout()}>
                            <i className='el-icon-circle-cross text-white'></i>
                        </div>
                    </Tooltip>
                    
                </div>
            </div>
        );
    }
}