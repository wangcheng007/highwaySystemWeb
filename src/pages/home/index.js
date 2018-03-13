import React from 'react';
import { Input, Button } from 'element-react';

import Util from '../../common/js/util';
import './style/index.less';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    login() {
        const { username, password } = this.state;

        Util.fetch({
            url: '//localhost:3000/user/login',
            type: 'post',
            data: {
                username,
                password
            },
            dataType: 'json'
        }).then((res) => {
            console.log(res);
        });
    }

    getSession() {
        Util.fetch({
            url: '//localhost:3000/user/getsession',
            type: 'post',
            dataType: 'json'
        }).then((res) => {
            console.log(res);
        });
    }

    change(val, type) {
        this.setState({
            [type]: val
        });
    }

    render() {
        return (
            <div className='highway-home flex flex-center-justify flex-center-align'
                style={{
                    backgroundImage: 'url(https://s10.mogucdn.com/mlcdn/c45406/180313_4876i0lef37075fk8hkj19lc3994d_4000x2667.jpg)',
                    backgroundSize: '100% 100%'
                }}
            >
                <div className='main-login-content'>
                    <Input placeholder="请输入账号" size='small' onChange={(val) => this.change(val, 'username')}/>
                    <Input placeholder="请输入密码" className='m-t-5' type='password' size='small' onChange={(val) => this.change(val, 'password')}/>

                    <Button type='primary' onClick={() => this.login()}>登录</Button>
                    <Button type='primary' onClick={() => this.getSession()}>getSession</Button>
                </div>
            </div>
        );
    }
}