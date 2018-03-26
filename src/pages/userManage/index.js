import React, { Component } from 'react';
import { Table, Button, Form, Input, Select } from 'element-react';
import Breadcrumb from '../_modules/breadcrumb';
import MoudleForm from '../_modules/form';
import MoudleModal from '../_modules/modal';

import Util from '../../common/js/util';
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
            columns: [],
            data: [],
            query: []
        }
    }

    componentDidMount () {
        this.getUsers();
    }

    getUsers () {
        Util.fetch({
            url: '/user/getUsers',
            type: 'get',
            dataType: 'json'
        }).then((resData) => {
            if(resData && resData.returnCode === '1001'){
                this.setState({
                    columns: resData.data.columns,
                    datas: resData.data.datas,
                    query: resData.data.query,
                    levelList: resData.data.levelList,
                    departmentList: resData.data.departmentList
                });
            }
        });
    }

    query() {
        console.log(Form.getData('user-manage-query'));
    }

    clear() {
        Form.clearData('user-manage-query');
    }

    add() {
        this.setState({
            modal: true
        });
    }

    close() {
        this.setState({
            modal: false
        });
    }

    onsure() {
        UserManageModal.getAddUserData();

        PubSub.subscribe( 'USERDATA', (msg, data) => {
            Util.fetch({
                url: '/user/addUser',
                type: 'post',
                data: data,
                dataType: 'json'
            }).then((redData) => {
                console.log(resData);
            });
        });
    }

    render() {
        const { breadList, columns, datas, query, modal, levelList, departmentList } = this.state;

        return (
            <div className='userManage-page flex flex-column-direction'>
                {
                    modal ? (
                        <MoudleModal
                            title={'新增人员'}
                            callback = {{
                                close: () => this.close(),
                                onsure: () => this.onsure()
                            }}
                        >
                            <UserManageModal levelList={levelList} departmentList={departmentList}/>
                        </MoudleModal>
                    ) : null
                }
                

                <Breadcrumb breadList={breadList} />

                <div className='userManage-content bg-white p-15 m-t-15'>
                    <MoudleForm
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
                </div>
            </div>
        );
    }
}

class UserManageModal extends Component {
    static forms = {};
    static validing = false;

    static getAddUserData () {
        UserManageModal.forms.validate();
    }

    // 添加表单数据到forms对象中
    static add (form) {
        UserManageModal.forms = form;
    }

    // 删除某个表单
    static remove (key) {
        delete UserManageModal.forms;
    }
    
    constructor (props) {
        super(props);
        UserManageModal.instance = this;

        this.state = {
            form: {
                username: '',
                password: '',
                checkPassword: '',
                department: '',
                level: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { 
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.state.form.password) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        } 
                    }
                ],
                level: [
                    { required: true, message: '请选择职位', trigger: 'blur' },
                    { 
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请选择职位'));
                            } else {
                                callback();
                            }
                        } 
                    }
                ]
            },
            departmentList: props.departmentList,
            levelList: props.levelList
        };

        this.dom = null;
    }

    componentWillMount () {
        UserManageModal.add(this);
    }

    componentWillUnmount () {
        UserManageModal.remove();
    }

    getData() {
        return this.state.form;
    }

    validate() {
        const that = this;

        this.dom.validate((valid) => {
            if (valid) {
                PubSub.publish('USERDATA', that.state.form);
            }
        });
    }

    initRef (ref) {
        this.dom = ref;
    }

    onChange (key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    render () {
        const { form, rules, departmentList, levelList } = this.state;

        return (
            <div className='user-manage-modal'>
                <Form ref={(ref) => this.initRef(ref)} model={form} labelWidth='80' rules={rules}>
                    <Form.Item label='用户名称' prop='username'>
                        <Input value={form.username} onChange={this.onChange.bind(this, 'username')}></Input>
                    </Form.Item>

                    <Form.Item label='密码' prop='password'>
                        <Input type='password' value={form.password} onChange={this.onChange.bind(this, 'password')}></Input>
                    </Form.Item>

                    <Form.Item label='确认密码' prop='checkPassword'>
                        <Input type='password' value={form.checkPassword} onChange={this.onChange.bind(this, 'checkPassword')}></Input>
                    </Form.Item>

                    <Form.Item label='选择部门' prop='department'>
                        <Select value={form.department} onChange={this.onChange.bind(this, 'department')}>
                            {
                                departmentList.map((item, index) => {
                                    return (
                                        <Select.Option label={item.label} value={item.value + ''} key={index}></Select.Option>
                                    );
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label='选择职位' prop='level'>
                        <Select value={form.level} onChange={this.onChange.bind(this, 'level')}>
                            {
                                levelList.map((item, index) => {
                                    return (
                                        <Select.Option label={item.label} value={item.value + ''} key={index}></Select.Option>
                                    );
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
