import Component from '../core/Component.js'

export default class Loading extends Component {
    template() {
        const { isLoad } = this.$props
        return `
            ${isLoad === 1 ? `
                <div class="loading__circle">
                    <div class="loading__empty"></div>
                </div>
                <p class="loading__text">Loading...</p>` : ''
            }
        `
    }
}