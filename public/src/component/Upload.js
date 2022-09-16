import Component from '../core/Component.js'

export default class Upload extends Component {
    template() {
        return `
            <form class="upload">
                <div class="upload__image-box">
                    <div class="upload__logo-container">
                        <img class="upload__logo" src='images/file-arrow-down-solid.svg' alt='샘플 이미지'>
                    </div>
                    <p class="upload__info">Drop your image file here!</p>
                    <p class="upload__info--thin">or click and select a file</p>
                    <input class="upload__image-input--hidden" type="file" accept="image/*"/>
                    <button class="upload__submit" type="submit">SAVE</button>
                </div>
            </form>
        `
    }
}