import React from 'react';
import { Link } from 'react-router';
import { Input, Button, Tooltip, MessageBox, Transfer, Message } from 'element-react';
import Breadcrumb from '../_modules/breadcrumb';

import Util from '../../common/js/util';
import './style/index.less';

class OpenAddPermissionModel extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            transferData: props.transferData,
            transferValue: props.transferValue
        }
    }

    closeModel () {
        Message({
            message: '取消操作',
            type: 'success'
        });
        this.props.close();
    }

    handleChange (value) {
        this.setState({
            transferValue: value
        })
    }

    onSure () {
        Util.fetch({
            url: '/permission/addBigPermission',
            type: 'get',
            dataType: 'json',
            data: {
                bigPermissions: this.state.transferValue
            }
        }).then((resData) => {
            if(resData && resData.returnCode === '1001'){
                Message({
                    message: '操作成功',
                    type: 'success'
                });
                this.props.getBigImgPermission();
                this.props.getPermission();
                this.props.close();
            }
        });
    }

    render () {
        const { transferData, transferValue } = this.state;

        return (
            <div>
                <div style={{position: 'absolute', zIndex: '2001'}}>
                    <div className='el-message-box__wrapper'>
                        <div className='el-message-box'>
                            <div className='el-message-box__header'>
                                <div className='el-message-box__title'>消息</div>
                                <button type="button" className='el-message-box__headerbtn' aria-label='Close' onClick={() => this.closeModel()}>
                                    <i className='el-message-box__close el-icon-close'></i>
                                </button>
                            </div>

                            <div className='el-message-box__content'>
                                <div className='el-message-box__message' style={{marginLeft: '0'}}>
                                    <Transfer value={transferValue} data={transferData} onChange={(value) => this.handleChange(value)}></Transfer>
                                </div>
                            </div>

                            <div className='el-message-box__btns'>
                                <button className='el-button el-button--default' type='button' onClick={() => this.closeModel()}>
                                    <span>取消</span>
                                </button>

                                <button className='el-button el-button--default el-button--primary' type='button' onClick={() => this.onSure()}>
                                    <span>确定</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='v-modal v-modal-enter-active v-modal-enter-to' style={{zIndex: '1006'}}></div>
            </div>
        );
    }
}
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            breadList: [{
                title: 'HWay 后台',
                path: '/home'
            }, {
                title: '首页',
                path: '/home'
            }],
            bigImgPermission: [],
            checked: false,
            transferData: [],
            transferValue: []
        };

        this.closeAddPermissionModel = this.closeAddPermissionModel.bind(this);
        this.getBigImgPermission = this.getBigImgPermission.bind(this);
        this.getPermission = this.getPermission.bind(this);
    }

    componentDidMount () {
        this.getBigImgPermission();
        this.getPermission();
    }

    getBigImgPermission () {
        Util.fetch({
            url: '/permission/getBigImgPermission',
            type: 'get',
            dataType: 'json'
        }).then((resData) => {
            if(resData && resData.returnCode === '1001'){
                let transferValue = [];

                resData.data.forEach((item) => {
                    transferValue.push(item.id);
                });

                this.setState({
                    bigImgPermission: resData.data,
                    transferValue
                });
            }
        });
    }

    getPermission () {
        Util.fetch({
            url: '/getPermission',
            type: 'get',
            dataType: 'json'
        }).then((res) => {
            if (res.returnCode === '1001') {
                let transferData = [];

                res.data.forEach((item) => {
                    if (item.children) {
                        item.children.forEach((child) => {
                            transferData.push({
                                key: child.id,
                                label: child.permission_name
                            });
                        });
                    }
                });
                this.setState({
                    transferData
                });
            }
        });
    }

    deleteBigPermission (obj) {
        Util.fetch({
            url: '/permission/deleteBigPermission',
            type: 'get',
            dataType: 'json',
            data: {
                permissionId: obj.id
            }
        }).then((resData) => {
            if(resData && resData.returnCode === '1001'){
                this.getBigImgPermission();
            }
        });
    }

    openAddPermissionModel () {
        this.setState({
            checked: true
        });
    }

    closeAddPermissionModel (value) {
        this.setState({
            checked: value
        });
    }

    render() {
        const { breadList, bigImgPermission, checked, transferData, transferValue } = this.state;

        return (
            <div className='home-page flex flex-column-direction'>
                {
                    checked ? (<OpenAddPermissionModel
                            close={this.closeAddPermissionModel} 
                            transferData={transferData} 
                            transferValue={transferValue} 
                            getBigImgPermission={this.getBigImgPermission}
                            getPermission={this.getPermission}
                        /> ) : null
                }
                <Breadcrumb breadList={breadList} />

                <div className='big-permissions bg-white m-t-15 p-15 flex-1 flex flex-warp' style={{borderRadius: '4px'}}>
                    {
                        bigImgPermission.length ? bigImgPermission.map((item, index) => {
                            return (
                                <div className='big-permission-item flex flex-center-justify m-b-15' key={index}>
                                    <div className='operate text text-red' onClick={() => this.deleteBigPermission(item)}>
                                        <Tooltip className='item' effect='dark' content='关闭' placement='bottom'>
                                            <i className='el-icon-circle-cross'></i>
                                        </Tooltip>
                                    </div>
                                    <Link to={item.path_router} style={{width: '100%', height: '100%'}} className='flex flex-center-justify'>
                                        <div className='big-permission-item-content flex flex-center-justify flex-center-align flex-column-direction'>
                                            <img src={item.big_img}/>
                                            <div className='text text-sm text-black flex flex-between-justify' style={{width: '100%'}}>
                                                <div className='m-l-5'>
                                                    <i className='el-icon-share'></i>
                                                    {item.permission_name}
                                                </div>
                                                <div className='m-r-5'>
                                                    <i className='el-icon-arrow-right'></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        }) : null
                    }

                    <div className='big-permission-item flex flex-center-justify m-b-15' onClick={() => this.openAddPermissionModel()}>
                        <div className='big-permission-item-content flex flex-center-justify flex-center-align flex-column-direction'>
                            <div className='add-bigPermission flex flex-center-align flex-center-justify'>
                                <i className='el-icon-plus text text-red'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}