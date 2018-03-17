import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { Tooltip, MessageBox, Message, Badge } from 'element-react';

import Util from '../../../common/js/util';
import defaultImg from '../../../common/img/default.jpeg';

import './style/index.less';

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
        return (
            <div className='module-top'>
                <div className='block'></div>
                <div className='module-top-navbar bg-green flex'>
                    <div className='title text text-white text-sm flex flex-center-align flex-center-justify'>HWay</div>
                    <div className='flex-1 flex flex-center-align flex-end-justify m-r-15'>
                    
                        <div className='message flex flex-center-align m-r-15'>
                            {
                                // 通知
                            }
                            <div className='notification m-r-10'>
                                <Badge isDot>
                                    <i className='el-icon-message text-white'></i>
                                </Badge>
                            </div>

                            {
                                // 待办
                            }
                            <div className='todo m-r-5'>
                                <Badge isDot>
                                    <i className='el-icon-information text-white'></i>
                                </Badge>
                            </div>
                        </div>
                        <div className='user-info flex flex-center-align m-r-15'>
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
            </div>
        );
    }
}