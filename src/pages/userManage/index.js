import React, { Component } from 'react';
import { Table, Button, Form, Input, Select, Message, Pagination, MessageBox } from 'element-react';
import Breadcrumb from '../_modules/breadcrumb';
import ModuleForm from '../_modules/form';
import ModuleModal from '../_modules/modal';
import ModalForm from '../_modules/form/_module/modalForm';

import Util from '../../common/js/util';
import config from './confog/index';
import './style/index.less';

export default class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadList: [{
                title: 'HWay 后台',
                path: '/home'
            }, {
                title: '基础管理'
            }, {
                title: '人员信息',
                path: '/userManage'
            }],
            modal: false,
            passwordModal: false,
            editModal: false,
            type: 0,
            row: {},
            pageconfig: {
                currentPage: 1,
                pageSize: 10,
                total: [{ids: 10}]
            },
            columns: [],
            data: [],
            query: []
        }
    }

    componentDidMount () {
        this.getUsers();
    }

    // 回去人员信息
    getUsers (obj) {
        let { pageconfig } = this.state;
        pageconfig = obj ? obj : pageconfig;

        Util.fetch({
            url: '/user/getUsers',
            type: 'get',
            dataType: 'json',
            data: {
                currentPage: pageconfig.currentPage,
                pageSize: pageconfig.pageSize,
                ...obj
            }
        }).then((resData) => {
            if(resData && resData.returnCode === '1001'){
                let columns = this.initColumns(resData.data.columns);

                this.setState({
                    columns: columns,
                    datas: resData.data.datas,
                    query: resData.data.query,
                    levelList: resData.data.levelList,
                    departmentList: resData.data.departmentList,
                    pageconfig: resData.data.pageconfig
                }, () => {
                    this.initColumns(this.state.columns);
                });
            }
        });
    }

    // 初始化columns
    initColumns (columns) {
        return (
            columns.map((item) => {
                if (item.prop === 'createtime') {
                    item.render = (row, column, index) => {
                        return <div>{Util.formatDate(new Date(row.createtime), 'yyyy-MM-dd hh:mm:ss')}</div>;
                    }
                } else if (item.prop === 'operate') {
                    item.render = (row, column, index) => {
                        return (
                            <div>
                                <Button size='mini' onClick={() => this.editUser(row, 1)}>查看</Button>
                                <Button size='mini' onClick={() => this.editUser(row, 0)}>编辑</Button>
                                <Button size='mini' onClick={() => this.deleteUser(row)}>删除</Button>
                                <Button size='mini' onClick={() => this.updatePassword(row)}>修改密码</Button>
                            </div>
                        )
                    }
                }
                return item;
            })
        );
    }

    // 搜索
    query (currentPage) {
        const queryData = ModuleForm.getData('user-manage-query');

        this.getUsers({
            pageSize: 10,
            currentPage: currentPage ? currentPage : 1,
            username: queryData.username,
            levelId: queryData.level,
            departmentId: queryData.department,
            startTime: queryData.startTime,
            endTime: queryData.endTime
        });
    }

    //  清空搜索条件
    clear() {
        ModuleForm.clearData('user-manage-query');

        this.getUsers({
            currentPage: 1,
            pageSize: this.state.pageconfig.pageSize
        });
    }

    // 新增
    add() {
        this.setState({
            modal: true
        });
    }

    // 删除用户
    deleteUser(row) {
        MessageBox.confirm('确定删除该用户吗？', '删除用户',{
            type: 'error'
        }).then(() => {
            Util.fetch({
                url: '/user/deleteUser',
                type: 'delete',
                dataType: 'json',
                data: {
                    userId: row.id
                }
            }).then((resData) => {
                if(resData && resData.returnCode === '1001'){
                    Message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getUsers({
                        currentPage: 1,
                        pageSize: 10
                    });
                }
            });
        }).catch(() => {
            Message({
                message: '取消操作',
                type: 'info'
            });
        });
    }

    //  修改密码
    updatePassword(row) {
        this.setState({
            passwordModal: true,
            row: row
        });
    }

    // 编辑信息
    editUser(row, type) {
        config.editUser.form.department = row.departmentId;
        config.editUser.form.level = row.levelId;

        if (type) {
            config.editUser.options[0].disabled =  true;
            config.editUser.options[1].disabled =  true;
        } else {
            config.editUser.options[0].disabled =  false;
            config.editUser.options[1].disabled =  false;
        }

        this.setState({
            editModal: true,
            row: row,
            type
        });
    }

    // 关闭modal
    close() {
        this.setState({
            modal: false,
            passwordModal: false,
            editModal: false
        });
    }

    // 确定新增
    onsure() {
        ModalForm.onValid('addUser', () => {
            let data = ModalForm.getData('addUser');

            Util.fetch({
                url: '/user/addUser',
                type: 'post',
                data: data,
                dataType: 'json'
            }).then((resData) => {
                if (resData.returnCode === '1001') {
                    Message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getUsers({
                        currentPage: 1,
                        pageSize: 10
                    });
                    ModalForm.clearData('addUser');
                    this.close();
                }
            });
        });
    }

    // 确定修改密码
    passwordModalOnSure() {
        ModalForm.onValid('updatePassword', () => {
            let data = ModalForm.getData('updatePassword');
            data = Object.assign({}, data, {userId: this.state.row.id});

            Util.fetch({
                url: '/user/updatePassword',
                type: 'post',
                data: data,
                dataType: 'json'
            }).then((resData) => {
                if (resData.returnCode === '1001') {
                    Message({
                        message: '操作成功',
                        type: 'success'
                    });
                    ModalForm.clearData('updatePassword');
                    this.close();
                }
            });
        });
    }

    // 确定修改基本信息
    editModalOnSure() {
        if (!this.state.type) {
            ModalForm.onValid('editUser', () => {
                let data = ModalForm.getData('editUser');
                data = Object.assign({}, data, {userId: this.state.row.id});
    
                Util.fetch({
                    url: '/user/editUser',
                    type: 'post',
                    data: data,
                    dataType: 'json'
                }).then((resData) => {
                    if (resData.returnCode === '1001') {
                        Message({
                            message: '操作成功',
                            type: 'success'
                        });
                        ModalForm.clearData('editUser');
                        this.getUsers();
                        this.close();
                    }
                });
            });
        } else {
            this.close();
        }
    }

    // 翻页
    onChangeCurrentPage (currentPage) {
        this.query(currentPage);
    }

    render() {
        const { breadList, columns, datas, query, modal, passwordModal, editModal, type, levelList, departmentList, pageconfig } = this.state;

        return (
            <div className='userManage-page flex flex-column-direction'>
                <div className='modal-content'>
                    {/* 弹出框*/}
                    <ModuleModal
                        title={'新增人员'}
                        callback = {{
                            close: () => this.close(),
                            onsure: () => this.onsure()
                        }}
                        style={{
                            display: modal ? 'block' : 'none'
                        }}
                    >
                        <ModalForm
                            formName='addUser'
                            form={config.addUser.form}
                            rules={config.addUser.rules}
                            options={config.addUser.options}
                            levelList={levelList}
                            departmentList={departmentList}
                        />
                    </ModuleModal>

                    <ModuleModal
                        title={'修改密码'}
                        callback = {{
                            close: () => this.close(),
                            onsure: () => this.passwordModalOnSure()
                        }}
                        style={{
                            display: passwordModal ? 'block' : 'none'
                        }}
                    >
                        <ModalForm
                            formName='updatePassword'
                            form={config.updatePassword.form}
                            rules={config.updatePassword.rules}
                            options={config.updatePassword.options}
                        />
                    </ModuleModal>

                    <ModuleModal
                        title={type ? '查看信息' : '编辑信息'}
                        callback = {{
                            close: () => this.close(),
                            onsure: () => this.editModalOnSure()
                        }}
                        style={{
                            display: editModal ? 'block' : 'none'
                        }}
                    >
                        <ModalForm
                            formName='editUser'
                            form={config.editUser.form}
                            rules={config.editUser.rules}
                            options={config.editUser.options}
                            levelList={levelList}
                            departmentList={departmentList}
                        />
                    </ModuleModal>
                </div>

                <Breadcrumb breadList={breadList} />

                <div className='userManage-content bg-white p-15 m-t-15'>
                    <ModuleForm
                        form='user-manage-query'
                        data={query}
                        callback={{
                            query: () => this.query(),
                            reset: () => this.clear(),
                            add: () => this.add()
                        }}
                    />

                    <Table
                        style={{width: '100%'}}
                        columns={columns}
                        data={datas}
                        border={true}
                    />

                    <div className='m-t-10 flex flex-center-justify'>
                        <Pagination
                            layout='prev, pager, next'
                            currentPage={pageconfig.currentPage}
                            total={pageconfig.total[0].ids}
                            onCurrentChange={(currentPage) => this.onChangeCurrentPage(currentPage)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
