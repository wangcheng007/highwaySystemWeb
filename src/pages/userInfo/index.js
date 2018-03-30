import React from 'react';
import { Input, Button } from 'element-react';
import Breadcrumb from '../_modules/breadcrumb';
import ModalForm from '../_modules/form/_module/modalForm/index';
import ModuleUpload from '../_modules/upload';

import Util from '../../common/js/util';
import config from './config/index';
import defaultImg from '../../common/img/default.jpeg';
import './style/index.less';

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            breadList: [{
                title: 'HWay 后台',
                path: '/home'
            }, {
                title: '基础管理'
            }, {
                title: '个人信息',
                path: '/userInfo'
            }],
            img: '',            
            form: config.form,
            rules: config.rules,
            options: config.options,
            levelList: [],
            departmentList: []
        }

        this.dom = null;
    }

    componentDidMount() {
        this.getUserInfo();
        this.getLevels();
        this.getDepartments();
    }

    getUserInfo() {
        Util.fetch({
            url: '/user/info',
            type: 'get',
            dataType: 'json'
        }).then((resData) => {
            if (resData.returnCode === '1001') {
                const data = resData.data.userinfo;

                this.setState({
                    form: {
                        username: data.username,
                        department: data.department,
                        level: data.level,
                        img: data.img
                    }
                })
            }
        });
    }

    getLevels() {
        Util.fetch({
            url: '/level/getLevels',
            type: 'get',
            dataType: 'json'
        }).then((resData) => {
            if (resData.returnCode === '1001') {
                this.setState({
                    levelList: resData.data.levelList
                })
            }
        });
    }

    getDepartments() {
        Util.fetch({
            url: '/department/getDepartments',
            type: 'get',
            dataType: 'json'
        }).then((resData) => {
            if (resData.returnCode === '1001') {
                this.setState({
                    departmentList: resData.data.departmentList
                })
            }
        });
    }

    initRef(ref) {
        this.dom = ref;
    }

    clickUpload() {
        this.dom.click();
    }

    customRequest() {
        console.log(1);

    }

    render() {
        const { breadList, form, rules, options, departmentList, levelList, img } = this.state;
        return (
            <div className='userInfo-page flex flex-column-direction'>
                <Breadcrumb breadList={breadList} />

                <div className='userInfo-content bg-white p-15 m-t-15'>
                    <div className='flex'>
                        <div className='user-imformation'>
                            <ModalForm 
                                formName='userInfo'
                                form={form}
                                rules={rules}
                                options={options}
                                departmentList={departmentList}
                                levelList={levelList}
                            />
                        </div>
                        
                        <div className='user-image m-l-15'>
                            <ModuleUpload 
                                className='avatar-uploader'
                                url='//localhost:3000/file/fileUpload'
                                showFileList={false}
                                withCredentials={true}
                                customRequest={() => this.customRequest()}
                            >
                                <div className='img-content'>
                                    <img src={img ? img : defaultImg} className='header-img'/>
                                    <div className='img-operation flex flex-center-align flex-center-justify' ></div>
                                    <div className='text text-mini black-text img-text flex flex-center-align flex-center-justify'>点击上传</div>
                                </div>
                            </ModuleUpload>
                        </div>
                    </div>

                    <div className='sure-button'>
                        <Button type='info'>确认修改</Button>
                    </div>
                </div>
                
            </div>
        );
    }
}