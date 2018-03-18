import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'element-react';

import './style/index.less';

export default class ModuleBreadcrumb extends Component {
    constructor (props) {
        super(props);

        this.state = {
            breadList: props.breadList
        };
    }

    render () {
        const { breadList } = this.state;

        return (
            <div className='module-breadcrumb flex flex-center-align'>
                <Breadcrumb separator='/' className='m-l-15'>
                    {
                        breadList.map((item, index) => {
                            return (
                                <Breadcrumb.Item className='text text-sm' key={index}>
                                    {
                                        item.path ? (
                                            <Link to={item.path || ''}>
                                                {item.title}
                                            </Link>
                                        ) : (
                                            item.title
                                        )
                                    }
                                   
                                </Breadcrumb.Item>
                            );
                        })
                    }
                </Breadcrumb>
            </div>
        );
    }
}