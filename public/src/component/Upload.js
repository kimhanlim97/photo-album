import Component from '../core/Component.js'
import Error from './Error.js'
import ImgUploadBox from './UploadBox.js'
import Loading from './Loading.js'
import ImgBox from './ImgBox.js'

export default class Upload extends Component {
    setup() {
        this.$state = {
            error: {
                isError: false,
                intro: '',
                message: ''
            },
            img: {
                isLoad: 0,
                src: '',
            }
        }
    }
    template() {
        return `
            <div class="upload">
                <div class="upload-uploadBox" data-component="img-box"></div>
            </div>
        `
    }
    mounted() {
        const { closeError, clickEvent, dragEnterEvent, dragOverEvent, dropUpload, clickUpload, dropImg } = this
        const { error, img } = this.$state
        const $imgBox = document.querySelector('[data-component="img-box"]')
        // 제어문 대신 컴포넌트를 마운트할 방법 구상해보기
        if (img.isLoad === 0) {
            new ImgUploadBox($imgBox, {
                clickEvent: clickEvent.bind(this),
                dragEnterEvent: dragEnterEvent.bind(this),
                dragOverEvent: dragOverEvent.bind(this),
                dropUpload: dropUpload.bind(this),
                clickUpload: clickUpload.bind(this)
            })
        }
        else if (img.isLoad === 1) {
            new Loading($imgBox, {
                isLoad: img.isLoad,
            })
        }
        else if (img.isLoad === 2) {
            new ImgBox($imgBox, {
                img,
                dropImg: dropImg.bind(this)
            })
        }

        if (error.isError) {
            new Error($imgBox, {
                error,
                closeError: closeError.bind(this),
            })
        }
    }

    // getter 함수 대신 FileReader를 공유할 방법 고민해보기
    get fileReader() {
        const fileReader = new FileReader()
        
        fileReader.addEventListener('progress', e => {
            const LOADING = 1
            this.setState({ img: { isLoad: LOADING, src: '' } })
        })

        fileReader.addEventListener('load', e => {
            const src = e.target.result
            const DONE = 2
            this.setState({ img: { isLoad: DONE, src: src } })
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
        this.$target.querySelector('.uploadBox-fileInput').click()
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
        const fileReader = this.fileReader
        e.preventDefault()
        const imgFile = e.dataTransfer.files
        if (!imgFile[0].type.startsWith('image/')) return null

        fileReader.readAsDataURL(imgFile[0]) // FileReader로 상태 관리 위임
    }

    clickUpload(e) {
        const fileReader = this.fileReader
        if (!e.target.files[0].type.startsWith('image/')) return null
        const imgFile = e.target.files[0]
        fileReader.readAsDataURL(imgFile) // FileReader로 상태 관리 위임
    }

    dropImg() {
        const EMPTY = 0
        this.setState({ img: { isLoad: EMPTY, src: '' } })
    }
}