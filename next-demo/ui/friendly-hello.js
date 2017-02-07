import { inject, observer } from 'mobx-react';
import { Component } from 'react';

@inject('BaseStore') @observer
export default class FriendlyHello extends Component {

    componentDidMount () {
        this.props.BaseStore.start();
    }

    componentWillUnmount () {
        this.props.BaseStore.stop();
    }

    render () {
        return (
            <div>
                { this.props.BaseStore.helloMessage }
            </div>
        );
    }
}
