import Reqwest from 'reqwest';
import { Notification } from 'element-react';

const http = '//localhost:3000';
const Util = {
    fetch: function(options) {
        let url = options.url;
        let type = options.type || options.method || 'POST';
        let data = options.data || {};
        let dataType = options.dataType || 'json';

        url = url.indexOf('//') > -1 ? url : http + url;

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
    },
    formatDate(date, format) {
        const o = {
            'M+' : date.getMonth()+1, //month
            'd+' : date.getDate(),    //day
            'h+' : date.getHours(),   //hour
            'm+' : date.getMinutes(), //minute
            's+' : date.getSeconds(), //second
            'q+' : Math.floor((date.getMonth()+3)/3),  //quarter
            'S' : date.getMilliseconds() //millisecond
        };

        if(/(y+)/.test(format)){  
            format = format.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length));  
        }  

        for(let k in o){  
            if (new RegExp("(" + k +")").test(format)){
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));  
            }
        }
        
        return format;
    }
};

export default Util;