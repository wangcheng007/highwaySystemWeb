import React, { Component } from 'react';

const generateId = (prefix = 'v') => {
    const timestamp = +new Date();
    const num = Math.floor(Math.random() * 10000);
    return `${prefix}${num}${timestamp}`;
};

const MAX_SHARD_FILE_SIZE = 1024 * 1024; // 1M 

export default class Upload extends Component {
    constructor (props) {
        super(props);

        this.state = {
            url: props.url || ''
        }

        this.form = undefined;
        this.file = undefined;
        this.xhr = undefined;
        this.queue = []; 
    }

    click () {
        this.file.click();
    }

    onChange (e) {
        const target = e.target;
        const files = target.files;
        this.beforeUpload(files);
    }

    beforeUpload (fileList) {
        const me = this;
        // const { before } = this.props;
        const files = Array.prototype.slice.call(fileList);

        files.forEach((file) => {
            const item = file;
            item.fid = generateId('f');
            return item;
        });

        me.enQueue(me.queue, files);
        me.start();
    }

    enQueue (queue, items = []) {

        const isEqual = (o, type) => {
            return Object.prototype.toString.call(o) === `[object ${type}]`;
        };

        if (!isEqual(items, 'Array')) {
            queue.push(items);
        } else {
            items.forEach((item) => {
                queue.push(item);
            });
        }

        return queue.length;
    }

    start() {
        const me = this;

        if (window.FormData) { // if browser supports FormData upload
            me.fdUpload();
        } else { // use the tradional iframe upload
            me.iframeUpload();
        }
    }

    fdUpload (index = 0) {
        const me = this;
        const file = me.queue[index];

        me.uploadFile(file).then((resp) => {
            me.outQueue(me.queue);
            me.enQueue(me.successQueue, resp);
        })
    }

    uploadFile(file) {
        const me = this;
        const { url, progress } = this.props;

        return new Promise((resolve, reject) => {
            let file_size = file.size;
            let shard_file = [];
            let shard_count = Math.ceil(file_size / MAX_SHARD_FILE_SIZE);
            let sign = generateId('file');

            for (let i = 0; i < shard_count; i++) {
                shard_file.push(file.slice( i * MAX_SHARD_FILE_SIZE, (i +1) * MAX_SHARD_FILE_SIZE));
            }

            debugger;

            shard_file.forEach((item, index) => {
                const fd = new FormData();
                const xhr = new XMLHttpRequest();
    
                me.xhr = xhr;
                
                // 文件标志符
                fd.append('sign', sign);
                // 当前切片数
                fd.append('chunk', index);
                // 分片总数
                fd.append('total', shard_file.length);
                // 文件类型
                fd.append('type', file.type);

                fd.append('file', item);

                if (progress) {
                    xhr.upload.onprogress = function (e) {
                        progress(e, file, xhr);
                    };
                }
    
                xhr.onload = function (e) {
                    // if (me.isSuccessCode(this.status)) {
                    //     const resp = JSON.parse(this.responseText);
                    //     if (resp.status.code === 1001) {
                    //         resolve(resp.result);
                    //     } else {
                    //         reject(resp);
                    //     }
                    // } else {
                    //     reject(e);
                    // }
                };
    
                xhr.onerror = function (e) {
                    reject(e);
                };
    
                xhr.onabort = function (e) {
                    reject(e);
                };
    
                xhr.open('POST', url, true);
                xhr.withCredentials = true;
                xhr.send(fd);
            });
        });
    } 

    outQueue (queue) {
        return queue.splice(0, 1).length;
    }


    render () {
        const { url } = this.state;

        return (
            <div className='module-upload' onClick={() => this.click()}>
                <form action={url} method='post' encType='mutipart/form-data' ref={(c) => { this.form = c; }}>
                    <input type='file' style={{display: 'none'}} ref={(c) => { this.file = c; }} onChange={(e) => this.onChange(e)}/>
                </form>
                {this.props.children}
            </div>
        );
    }
}