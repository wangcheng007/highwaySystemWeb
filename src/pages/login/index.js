import React from 'react';
import { Input, Button } from 'element-react';
import { hashHistory } from 'react-router';

import Util from '../../common/js/util';
import './style/index.less';

export default class Login extends React.Component {
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
            url: '/user/login',
            type: 'post',
            data: {
                username,
                password
            },
            dataType: 'json'
        }).then((res) => {
            if (res.returnCode === '1001') {
                window.localStorage.setItem('user', JSON.stringify(res.data.user));
                hashHistory.push('/home');
            }
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
                <div className='main-login-content flex flex-center-align flex-center-justify flex-column-direction p-15'>
                    <div className='username-box flex flex-baseline-align'>
                        <label>账号：</label>
                        <Input placeholder="请输入账号" size='small' onChange={(val) => this.change(val, 'username')}/>
                    </div>
                    
                    <div className='password-box flex flex-baseline-align m-t-10'>
                        <label>密码：</label>
                        <Input placeholder="请输入密码" type='password' size='small' onChange={(val) => this.change(val, 'password')}/>
                    </div>

                    <div className='m-t-15'>
                        <Button style={{width: '220px'}} type='primary' onClick={() => this.login()}>登录</Button>
                    </div>
                </div>
            </div>
        );
    }
}

