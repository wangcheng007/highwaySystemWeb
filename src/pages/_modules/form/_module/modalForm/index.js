import React, { Component } from 'react';
import { Form, Input, Select, DatePicker, Button } from 'element-react';

import './style/index.less';

export default class ModalForm extends Component {
    static forms = {};

    // 添加表单数据到forms对象中
    static add (form, key) {
        ModalForm.forms[key] = form;
    }

    // 删除某个表单
    static remove (key) {
        delete ModalForm.forms[key];
    }

    // 对外提供的获取数据静态方法
    static getData (form) {
        return ModalForm.forms[form].getData();
    }

    // 对外提供的清除数据静态方法
    static clearData (form) {
        ModalForm.forms[form].clearData();
    }

    static onValid(form, callback) {
        ModalForm.forms[form].validing(callback);
    }

    constructor (props) {
        super(props);
        ModalForm.instance = this;

        this.state = {
            initData: Object.assign({}, props.form),
            form: props.form,
            rules: props.rules,
            options: props.options,
            ...props
        };

        this.dom = null;
    }

    componentWillMount () {
        ModalForm.add(this, this.props.formName);
        
        for (let item in this.props.rules) {
            if (this.props.rules[item].length > 1) {
                this.props.rules[item][1].validator = this.props.rules[item][1].validator.bind(this);
            }
        }
    }

    componentWillUnmount () {
        ModalForm.remove(this.props.formName);
    }

    componentWillReceiveProps(nextProps) {
       this.setState({
            ...nextProps
       });
        
    }

    getData() {
        return this.state.form;
    }

    clearData() {
        const data = Object.assign({}, this.state.initData);
        this.setState({
            form: data
        });
    }

    validing(callback) {
        const that = this;

        this.dom.validate((valid) => {
            if (valid) {
                callback()
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
        const { form, rules, options, ...list } = this.state;

        return (
            <div className='modal-form'>
                <Form ref={(ref) => this.initRef(ref)} model={form} labelWidth='80' rules={rules}>
                    {
                        options.map((item, index) => {
                            if (item.type === 'input') {
                                return (
                                    <Form.Item label={item.label} clearable={true} prop={item.name} key={index}>
                                        <Input type={item.category} value={form[item.name]} placeholder={item.placeholder} onChange={this.onChange.bind(this, item.name)} disabled={item.disabled}></Input>
                                    </Form.Item>
                                );
                            } else if (item.type === 'select') {
                                return (
                                    <Form.Item label={item.label} clearable={true} prop={item.name} key={index}>
                                        <Select value={form[item.name]} placeholder={item.placeholder} clearable={!item.disabled} onChange={this.onChange.bind(this, item.name)} disabled={item.disabled}>
                                            {
                                                list[`${item.name}List`] && list[`${item.name}List`].length ? list[`${item.name}List`].map((option, optionIndex) => {
                                                    return (
                                                        <Select.Option label={option.label} value={option.value} key={optionIndex} />
                                                    );
                                                }) : null
                                            }
                                        </Select>
                                    </Form.Item>
                                );
                            }
                        })
                    }
                </Form>
            </div>
        );
    }
}