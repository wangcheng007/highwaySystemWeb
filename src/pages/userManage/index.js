import React from 'react';
import { Table, Button } from 'element-react';
import Breadcrumb from '../_modules/breadcrumb';
import Form from '../_modules/form';

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
            columns: [],
            data: []
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
                    datas: resData.data.datas
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

    render() {
        const { breadList, columns, datas } = this.state;

        return (
            <div className='userManage-page flex flex-column-direction'>
                <Breadcrumb breadList={breadList} />

                <div className='userManage-content bg-white p-15 m-t-15'>
                    <Form form='user-manage-query'/>

                    <Button onClick={() => this.query()}>确定</Button>
                    <Button onClick={() => this.clear()}>清空</Button>
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