import Component from '../core/Component.js'

export default class ImgUploadBox extends Component {
    template() {
        const isLoad  = this.$props?.isLoad
        return `
            ${!isLoad ? `
                <div class="img-upload-box"id="img-box">
                    <div class="upload__icon-container">
                        <img class="upload__icon" src='images/file-arrow-down-solid.svg' alt='업로드 아이콘'>
                    </div>
                    <p class="upload__info">Drop your image file here!</p>
                    <p class="upload__info--thin" id="click-upload-link" for="click-upload" multiple>or click and select a file</p>
                    <input class="upload__image-input--hidden" type="file" accept="image/*" id="click-upload-input"/>
                </div>`: ''
            }
        `
    }
    setEvent() {
        const { fileReader, clickEvent, dragEnterEvent, dragOverEvent, dropUpload, clickUpload } = this.$props

        this.addEvent('click', '#click-upload-link', () => {
            clickEvent()
        })

        this.addEvent('dragenter', '#img-box, #img-box *', e => {
            dragEnterEvent(e)
        })

        this.addEvent('dragover', '#img-box, #img-box *', e => {
            dragOverEvent(e)
        })

        this.addEvent('change', '#click-upload-input', e => {
            clickUpload(e)
        })

        this.addEvent('drop', '#img-box, #img-box *', e => {
            dropUpload(e)
        })
    }

}