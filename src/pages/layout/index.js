import React, { Component } from 'react';
import Util from '../../common/js/util';

export default class Layout extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     user: {}
        // };
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
            <div>
                { this.props.children }
            </div>
        );
    }
}

Layout.propTypes = {
    children: React.PropTypes.node
};

