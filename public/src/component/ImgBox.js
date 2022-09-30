import Component from '../core/Component.js'

export default class ImgBox extends Component {
    template() {
        const { img } = this.$props

        return `
            <div class="imgBox">
                <img class="imgBox-img" src="${img.src}">
            </div>
        `
    }
}