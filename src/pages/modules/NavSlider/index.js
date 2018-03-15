import React, { Component } from 'react';

export default class NavSlider extends Component {
    constructor (props) {
        super(props);

        console.log(props);
        this.state = {
            list: props.list
        }
    }

    render () {
        const { list } = this.state;

        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.text}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}