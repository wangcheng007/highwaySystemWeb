const config = {
    addUser: {
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
                    validator: function(rule, value, callback){
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
            department: [
                { required: true, message: '请选择部门', trigger: 'blur' },
                { 
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请选择职位'));
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
        options: [{
            type: 'input',
            label: '用户名称',
            placeholder: '请输入用户名',
            name: 'username'
        }, {
            type: 'input',
            label: '密码',
            placeholder: '请输入密码',
            name: 'password',
            category: 'password'
        }, {
            type: 'input',
            label: '确认密码',
            placeholder: '请再次输入密码',
            name: 'checkPassword',
            category: 'password'
        }, {
            type: 'select',
            label: '选择部门',
            placeholder: '请选择部门,若职位为管理员则改字段无效',
            name: 'department'
        }, {
            type: 'select',
            label: '选择职位',
            placeholder: '请选择职位',
            name: 'level'
        }]
    },
    updatePassword: {
        form: {
            password: '',
            checkPassword: '',
        },
        rules: {
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            checkPassword: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { 
                    validator: function(rule, value, callback){
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.state.form.password) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    } 
                }
            ]
        },
        options: [{
            type: 'input',
            label: '密码',
            placeholder: '请输入密码',
            name: 'password',
            category: 'password'
        }, {
            type: 'input',
            label: '确认密码',
            placeholder: '请再次输入密码',
            name: 'checkPassword',
            category: 'password'
        }]
    },
    editUser: {
        form: {
            department: '',
            level: ''
        },
        rules: {
            department: [
                { required: true, message: '请选择部门', trigger: 'blur' },
                { 
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请选择职位'));
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
        options: [{
            type: 'select',
            label: '选择部门',
            placeholder: '请选择部门,若职位为管理员则改字段无效',
            name: 'department'
        }, {
            type: 'select',
            label: '选择职位',
            placeholder: '请选择职位',
            name: 'level'
        }]
    }
}

export default config;
