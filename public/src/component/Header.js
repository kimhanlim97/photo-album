import Component from '../core/Component.js'

export default class Header extends Component {
    template() {
        return `
            <div class="header__inner-container">
                <h1 class="header__logo">Photo Album</h1>
            </div>
        `
    }
}