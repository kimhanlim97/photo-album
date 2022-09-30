import Component from '../core/Component.js'

export default class Loading extends Component {
    template() {
        return `
            <div class="loading">
                <div class="loading__circle">
                    <div class="loading__empty"></div>
                </div>
                <p class="loading__text">Loading...</p>
            </div>
        `
    }
}