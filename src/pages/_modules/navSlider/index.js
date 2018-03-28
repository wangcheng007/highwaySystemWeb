import React, { Component } from 'react';
import { Link } from 'react-router';

import Util from '../../../common/js/util';
import defaultImg from '../../../common/img/default.jpeg';

import './style/index.less';

class NavItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            index: props.index,
            check: false,
            pathRouter: window.location.hash.split('?')[0].split('#')[1]
        }
    }

    componentDidUpdate () {
        const pathRouter = window.location.hash.split('?')[0].split('#')[1];

        if (pathRouter !== this.state.pathRouter) {
            this.setState({
                pathRouter
            });
        }
    }

    handleClick() {
        this.setState({
            check: !this.state.check
        });
    }

    render() {
        const { index, data, check, pathRouter} = this.state;

        return (
            <div>
                {
                    data.path_router ? (
                        <Link to={`${data.path_router}`}>
                            <div
                                key={index}
                                className={`permission-item text-gray text-sm flex flex-center-align flex-between-justify p-l-15 p-r-15 p-t-5 p-b-5 ${pathRouter === data.path_router ? 'active' : ''}`} 
                                onClick={() => this.handleClick()}
                            >
                                <div>
                                    <i className={`el-icon-${data.small_img}`}></i>
                                    <span className='m-l-10'>{data.permission_name}</span>
                                </div>
                                <i className={data.children.length === 0 ? 'el-icon-arrow-right m-r-15' : (check ? 'el-icon-arrow-up m-r-15' : 'el-icon-arrow-down m-r-15')}></i>
                            </div>
                        </Link>
                    ) : (
                        <div
                            key={index}
                            className={`permission-item text-gray text-sm flex flex-center-align flex-between-justify p-l-15 p-r-15 p-t-5 p-b-5 ${pathRouter === data.path_router ? 'active' : ''}`} 
                            onClick={() => this.handleClick()}
                        >
                            <div>
                                <i className={`el-icon-${data.small_img}`}></i>
                                <span className='m-l-10'>{data.permission_name}</span>
                            </div>
                            <i className={data.children.length === 0 ? 'el-icon-arrow-right m-r-15' : (check ? 'el-icon-arrow-up m-r-15' : 'el-icon-arrow-down m-r-15')}></i>
                        </div>
                    )
                }

                <div className={`permission-children ${check ? 'checked' : 'unchecked'}`}>
                    {
                        data.children.map((item, key) => {
                            return (
                                <Link key={key} to={`${item.path_router}`}>
                                    <div className={`permission-child text-gray text-mini flex flex-center-align flex-between-justify ${pathRouter === item.path_router ? 'active' : ''}`}>
                                        <div>
                                            <i className={`el-icon-${item.small_img}`}></i>
                                            <span className='m-l-10'>{item.permission_name}</span>
                                        </div>
                                        <i className='el-icon-arrow-right m-r-15'></i>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

NavItem.propTypes = {
    data: React.PropTypes.object
}

export default class NavSlider extends Component {
    constructor (props) {
        super(props);

        this.state = {
            data: [],
            height: 0,
            user: JSON.parse(window.localStorage.getItem('userinfo'))
        }
    }

    componentDidMount () {
        Util.fetch({
            url: '/getPermission',
            type: 'get',
            dataType: 'json'
        }).then((res) => {
            if (res.returnCode === '1001') {
                this.setState({
                    data: res.data,
                    height: document.body.clientHeight - 60
                });
            }
        });
    }

    render () {
        const { height, data, user } = this.state;

        return (
            <div className='module-nav-slider bg-black flex flex-column-direction' style={{height: height}}>
                <div className='user-info m-t-15 flex flex-center-align flex-column-direction'>
                    <img src={user.img ? user.img : defaultImg}/>
                    <div className='text text-white text-sm m-t-5'>
                        {user.username}
                    </div>
                </div>

                <div className='permission-list flex-1'>
                    {
                        data.length ? data.map((item, index) => {
                            return (
                                <NavItem data={item} index={index} key={index}/>
                            );
                        }) : null
                    }
                </div>
                
            </div>
        );
    }
}