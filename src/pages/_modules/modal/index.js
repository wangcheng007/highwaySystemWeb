import React from 'react';
import { Message } from 'element-react';

import './style/index.less';

export default class ModalModel extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            transferData: props.transferData,
            transferValue: props.transferValue
        }
    }

    closeModel () {
        Message({
            message: '取消操作',
            type: 'success'
        });
        this.props.callback.close();
    }

    handleChange (value) {
        this.setState({
            transferValue: value
        })
    }

    onSure () {
        this.props.callback.onsure();
    }

    render () {
        const { transferData, transferValue } = this.state;

        return (
            <div>
                <div style={{position: 'absolute', zIndex: '2001'}}>
                    <div className='el-message-box__wrapper'>
                        <div className='el-message-box'>
                            <div className='el-message-box__header'>
                                <div className='el-message-box__title'>{this.props.title}</div>
                                <button type="button" className='el-message-box__headerbtn' aria-label='Close' onClick={() => this.closeModel()}>
                                    <i className='el-message-box__close el-icon-close'></i>
                                </button>
                            </div>

                            <div className='el-message-box__content'>
                                <div className='el-message-box__message' style={{marginLeft: '0'}}>
                                    {
                                        this.props.children
                                    }
                                </div>
                            </div>

                            <div className='el-message-box__btns'>
                                {
                                    this.props.callback.close ? (
                                        <button className='el-button el-button--default' type='button' onClick={() => this.closeModel()}>
                                            <span>取消</span>
                                        </button>
                                    ) : null
                                }
                               
                                {
                                    this.props.callback.onsure ? (
                                        <button className='el-button el-button--default el-button--primary' type='button' onClick={() => this.onSure()}>
                                            <span>确定</span>
                                        </button>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='v-modal v-modal-enter-active v-modal-enter-to' style={{zIndex: '1006'}}></div>
            </div>
        );
    }
}
