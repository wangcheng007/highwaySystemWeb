import Reqwest from 'reqwest';
import { Notification } from 'element-react';

const Util = {
    fetch: function(options) {
        let url = options.url;
        let type = options.type || options.method || 'POST';
        let data = options.data || {};
        let dataType = options.dataType || 'json';

        let setting = {
            url: url,
            method: type,
            headers: {
                'Accept': 'application/json'
            },
            withCredentials: true,
            crossOrigin: true,
            contentType: options.contentType || 'application/x-www-form-urlencoded',
            type: dataType,
            data:  data
        };

        return Reqwest(setting).then(function (resData) {
            if (resData.returnCode !== '1001') {
                Notification.error({
                    title: '错误',
                    message: resData.message,
                    duration: 2000
                });
            }
            return resData;
        }).fail(() => {
            Notification.error({
                title: '错误',
                message: '服务器异常',
                duration: 2000
            });
        });

    },
    obj2params: function (obj) {
        var result = '';
        var item;
        for (item in obj) {
            result += '&' + item + '=' + encodeURIComponent(obj[item]);
        }
    
        if (result) {
            result = result.slice(1);
        }
    
        return result;
    }
};

export default Util;