import Component from '../core/Component.js'

export default class ImgBox extends Component {
    template() {
        const { isLoad, img } = this.$props

        return `
            ${isLoad === 2 ? `
                <img class="img" src="${img.src}">
                <div class="upload__btn-container">
                    <button class="btn" id="delete-btn">삭제</button>
                    <button class="btn">저장</button>
                </div>`: ''
            }
        `
    }

    setEvent() {
        const { dropImg } = this.$props
        this.addEvent('click', '#delete-btn', () => {
            dropImg()
        })
    }
}