import Component from '../core/Component.js'

export default class Nav extends Component {
    template() {
        return `
            <ul class="nav__inner-container">
                <li class="nav__list">upload</li>
                <li class="nav__list">album</li>
            </ul>
        `
    }
}