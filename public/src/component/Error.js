import Component from '../core/Component.js'

export default class Error extends Component {
    template() {
        const { error } = this.$props
        return `
            ${error.isError ? `
                <div class="error">
                    <div class="error__icon-container">
                        <img class="error__icon" src='images/triangle-exclamation-solid.svg' alt='에러 아이콘'>
                    </div>
                    <h3 class="error__text error__intro">${error.intro}</h3>
                    <p class="error__text error__message">${error.message}</p>
                    <div class="error__btn-container">
                        <button class="btn btn--error" id="error-btn">확인</button>
                    </div>
                </div>`: ''
            }
        `
    }
    setEvent() {
        const { closeError } = this.$props
        this.addEvent('click', '#error-btn', () => {
            closeError()
        })
    }
}