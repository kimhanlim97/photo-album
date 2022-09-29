import Component from '../core/Component.js'
import Error from './Error.js'
import ImgUploadBox from './ImgUploadBox.js'
import Loading from './Loading.js'
import ImgBox from './ImgBox.js'

export default class Upload extends Component {
    setup() {
        this.$state = {
            isLoad: 0,
            error: {
                isError: false,
                intro: '',
                message: ''
            },
            img: {

            }
        }
    }
    template() {
        return `
            <div class="upload">
                <div data-component="img-upload-box"></div>
                <div data-component="loading"></div>
                <div data-component="img-box"></div>
                <div data-component="error"></div>
            </div>
        `
    }
    mounted() {
        const { closeError, clickEvent, dragEnterEvent, dragOverEvent, dropUpload, clickUpload, dropImg } = this
        const { isLoad, error, img } = this.$state
        const $error = document.querySelector('[data-component="error"]')
        const $imgUploadBox = document.querySelector('[data-component="img-upload-box"]')
        const $loading = document.querySelector('[data-component="loading"]')
        const $imgBox = document.querySelector('[data-component="img-box"]')

        new Error($error, {
            error,
            closeError: closeError.bind(this),
        })

        new Loading($loading, {
            isLoad
        })

        new ImgUploadBox($imgUploadBox, {
            isLoad,
            clickEvent: clickEvent.bind(this),
            dragEnterEvent: dragEnterEvent.bind(this),
            dragOverEvent: dragOverEvent.bind(this),
            dropUpload: dropUpload.bind(this),
            clickUpload: clickUpload.bind(this)
        })

        new ImgBox($imgBox, {
            isLoad,
            img,
            dropImg: dropImg.bind(this)
        })
    }

    get fileReader() {
        const fileReader = new FileReader()
        
        fileReader.addEventListener('progress', e => {
            const LOADING = 1
            this.setState({ isLoad: LOADING })
        })

        fileReader.addEventListener('load', e => {
            const src = e.target.result
            const DONE = 2
            this.setState({ isLoad: DONE, img: { src: src } })
        })

        fileReader.addEventListener('error', e => {
            this.setState({ error: { isError: true, intro: '파일 업로드 에러가 발생했습니다', message: '다시 한번 시도해주세요' } })
        })

        return fileReader
    }

    closeError() {
        this.setState({ error: { isError: false, intro: '', message: '' } })
    }

    clickEvent() {
        // 상태에 종속되게 실행할 수 있는지 (DOM을 직접 조작하지 않을 방법) 고민해보기
        this.$target.querySelector('#click-upload-input').click()
    }

    dragEnterEvent(e) {
        e.preventDefault()
    }

    dragOverEvent(e) {
        // 상태에 종속되게 실행할 수 있는지 (DOM을 직접 조작하지 않을 방법) 고민해보기
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }

    dropUpload(e) {
        console.log('drop')
        const fileReader = this.fileReader
        e.preventDefault()
        const imgFile = e.dataTransfer.files
        if (!imgFile[0].type.startsWith('image/')) return null

        fileReader.readAsDataURL(imgFile[0]) // FileReader로 상태 관리 위임
    }

    clickUpload(e) {
        console.log('click')
        const fileReader = this.fileReader
        if (!e.target.files[0].type.startsWith('image/')) return null
        const imgFile = e.target.files[0]
        fileReader.readAsDataURL(imgFile) // FileReader로 상태 관리 위임
    }

    dropImg() {
        const EMPTY = 0
        this.setState({ isLoad: EMPTY })
    }
}