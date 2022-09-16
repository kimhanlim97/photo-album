import Component from './core/Component.js'
import Header from './component/Header.js'
import Nav from './component/Nav.js'
import Upload from './component/Upload.js'

export default class App extends Component {
    template() {
        return `
            <header class="header" data-component="header"></header>
            <nav class="nav" data-component="nav"></nav>
            <main class="main" data-component="upload"></main>
        `
    }
    mounted() {
        const $header = document.querySelector('[data-component="header"]')
        const $nav = document.querySelector('[data-component="nav"]')
        const $main = document.querySelector('[data-component="upload"]')

        new Header($header)
        new Nav($nav)
        new Upload($main)
    }
}