import React, { Component } from 'react';
import { Form, Input, Select, DatePicker, Button } from 'element-react';

import './style/index.less';

export default class ModuleForm extends Component {
    static forms = {};

    // 添加表单数据到forms对象中
    static add (form, key) {
        ModuleForm.forms[key] = form;
    }

    // 删除某个表单
    static remove (key) {
        delete ModuleForm.forms[key];
    }

    // 对外提供的获取数据静态方法
    static getData (form) {
        return ModuleForm.forms[form].getData();
    }

    // 对外提供的清除数据静态方法
    static clearData (form) {
        ModuleForm.forms[form].clearData();
    }

    constructor (props) {
        super(props);
        ModuleForm.instance = this;

        let obj = this.initData(props.data);

        this.state = {
            options: props.data,
            form: props.form,
            obj: obj,
            callback: props.callback
        };
    }

    componentWillMount () {
        ModuleForm.add(this, this.props.form);
    }

    componentWillUnmount () {
        ModuleForm.remove(this.props.form);
    }

    componentWillReceiveProps (nextProps) {
        if (!this.state.options || !this.state.options.length) {
            let obj = this.initData(nextProps.data);

            this.state = {
                options: nextProps.data,
                form: nextProps.form,
                obj: obj,
                callback: nextProps.callback
            };
        }
    }

    initData(options) {
        let obj = {};
        options.forEach((ele) => {
            obj[ele.name] = '';
        });

        return obj;
    }

    getData() {
        return this.state.obj;
    }

    clearData() {
        const obj = this.initData(this.state.options);
        this.setState({
            obj: obj
        })
    }

    changgeInputValue (value, name) {
        const obj = this.state.obj;
        obj[name] = value;

        this.setState({
            obj
        });
    }

    changeSelectValue (value, name) {
        const obj = this.state.obj;
        obj[name] = value;

        this.setState({
            obj
        });
    }

    changeDateValue (value, name) {
        const obj = this.state.obj;
        obj[name] = (new Date(value)).getTime();

        this.setState({
            obj
        });
    }

    render () {
        const { options, obj, callback } = this.state;

        return (
            <div className='module-form flex'>
                <Form inline={true} className='demo-form-inline'>
                    {
                        options && options.length ? options.map((item, index) => {
                            if (item.type === 'text') {
                                return (
                                    <Form.Item key={index} className='form-item'>      
                                        <Input value={obj[item.name]} placeholder={item.placeholder} key={index} onChange={(value) => this.changgeInputValue(value, item.name)}/>
                                    </Form.Item>
                                );
                            } else if (item.type === 'select') {
                                return (
                                    <Form.Item key={index}>   
                                        <Select value={obj[item.name]} clearable={true} onChange={(val) => this.changeSelectValue(val, item.name)} placeholder={item.placeholder}>
                                            {
                                                item.options.map((option,index) => {
                                                    return (
                                                        <Select.Option key={index} label={option.label} value={option.value} />
                                                    );
                                                }) 
                                            }
                                        </Select>
                                    </Form.Item>
                                );
                            } else if (item.type === 'date') {
                                return (
                                    <Form.Item key={index}>
                                        <DatePicker
                                            isShowTime={true}
                                            value={obj[item.name] ? new Date(obj[item.name]) : null}
                                            placeholder={item.placeholder}
                                            format={'yyyy-MM-dd HH:mm:ss'}
                                            onChange={(date) => this.changeDateValue(date, item.name)}
                                        />
                                    </Form.Item>
                                );
                            }
                        }) : null
                    }
                    <div className='operate-buttons'>
                        {
                            callback.query ? (
                                <Form.Item>
                                    <Button size='small' type='info' icon='search' onClick={() => callback.query()}>搜索</Button>
                                </Form.Item>
                            ) : null
                        }
                        {
                            callback.reset ? (
                                <Form.Item>
                                    <Button size='small' type='info' icon='close' onClick={() => callback.reset()}>清空</Button>
                                </Form.Item>
                            ) : null
                        }
                        {
                            callback.add ? (
                                <Form.Item>
                                    <Button size='small' type='info' icon='plus' onClick={() => callback.add()}>新增</Button>
                                </Form.Item>
                            ) : null
                        }
                    </div>
                    
                </Form>
            </div>
        );
    }
}