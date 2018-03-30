const config = {
    form: {
        username: '',
        department: '',
        level: ''
    },
    rules: {
    },
    options: [{
        type: 'input',
        label: '用户名称',
        placeholder: '请输入用户名',
        name: 'username',
        disabled: true
    }, {
        type: 'select',
        label: '选择部门',
        placeholder: '请选择部门,若职位为管理员则改字段无效',
        name: 'department',
        disabled: true
    }, {
        type: 'select',
        label: '选择职位',
        placeholder: '请选择职位',
        name: 'level',
        disabled: true
    }]
}

export default config;
