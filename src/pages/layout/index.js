import React, { Component } from 'react';
import Util from '../../common/js/util';

export default class Layout extends Component {
    constructor(){
        super();
        this.state = {
            user: {
                username: '',
            }
        };
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
            console.log(resData);
            if(resData && resData.returnCode === '1001'){
                this.setStateSafe({
                    user: {
                        username: resData.data.username,
                    }
                });
                window.username = window.username ? window.username : resData.data.username;
            } else {
                window.location.href = '/';
            }
        });
    }

    render(){
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

Layout.propTypes = {
    children: React.PropTypes.node
};

