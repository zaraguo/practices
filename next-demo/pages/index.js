import initBaseStore from '~/env/store';
import FriendlyHello from '~/ui/friendly-hello';
import { Component } from 'react';
import { Provider } from 'mobx-react';

export default class HomePage extends Component {
    constructor (props) {
        super(props);
        this.store = initBaseStore();
    }

    render () {
        return (
            <Provider BaseStore={this.store}>
                <FriendlyHello />
            </Provider>
        );
    }
}
