import Component from '../core/Component.js'

export default class ImgUploadBox extends Component {
    template() {
        return `
            <div class="uploadBox">
                <div class="uploadBox-iconContainer">
                    <img class="uploadBox-icon" src='images/file-arrow-down-solid.svg' alt='업로드 아이콘'>
                </div>
                <p class="uploadBox-infoDrop">Drop your image file here!</p>
                <p class="uploadBox-infoClick">or click and select a file</p>
                <input class="uploadBox-fileInput" type="file" accept="image/*"/>
            </div>
        `
    }
    setEvent() {
        const { clickEvent, dragEnterEvent, dragOverEvent, dropUpload, clickUpload } = this.$props

        this.addEvent('click', '.uploadBox-infoClick', () => {
            clickEvent()
        })

        this.addEvent('dragenter', '.uploadBox, .uploadBox *', e => {
            dragEnterEvent(e)
        })

        this.addEvent('dragover', '.uploadBox, .uploadBox *', e => {
            dragOverEvent(e)
        })

        this.addEvent('change', '.uploadBox-fileInput', e => {
            clickUpload(e)
        })

        this.addEvent('drop', '.uploadBox, .uploadBox *', e => {
            dropUpload(e)
        })
    }

}