import { action, observable } from 'mobx';

const messages = [
    'hello zaraguo',
    'you are the best',
    'hello China',
    'hello kitty'
];

let store = null;

class Store {
    @observable helloMessage = '';

    constructor (isServer, message) {
        this.helloMessage = messages[Math.floor(Math.random() * (messages.length - 1))];
    }

    @action start = () => {
        this.timer = setInterval(() => {
            this.helloMessage = messages[Math.floor(Math.random() * (messages.length - 1))];
        }, 1000);
    }

    stop = () => clearInterval(this.timer)
}

export default function initSore (isServer, message) {
    return new Store(isServer, message);
}
