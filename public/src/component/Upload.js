import Component from '../core/Component.js'

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
        const { error, isLoad, img } = this.$state
        return `
            <div class="upload" id="uploadBox">
                <div class="upload__image-box" id="img-box">
                    ${isLoad === 0 ? `
                        <div class="upload__icon-container">
                            <img class="upload__icon" src='images/file-arrow-down-solid.svg' alt='업로드 아이콘'>
                        </div>
                        <p class="upload__info">Drop your image file here!</p>
                        <p class="upload__info--thin" id="click-upload-link" for="click-upload" multiple>or click and select a file</p>
                        <input class="upload__image-input--hidden" type="file" accept="image/*" id="click-upload-input"/>`: ''
                    }
                    ${isLoad === 1 ? `
                        <p>준비중입니다</p>`: ''
                    }
                    ${isLoad === 2 ? `
                        <img class="img" src="${img.src}">
                        <div class="upload__btn-container">
                            <button class="btn" id="delete-btn">삭제</button>
                            <button class="btn">저장</button>
                        </div>`: ''
                    }
                </div>
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
                    </div>` : ''
                }
            </div>
        `
    }
    setEvent() {
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

        this.$target.addEventListener('click', ({ target }) => {
            if (target.id === 'click-upload-link') {
                // 상태에 종속되게 실행할 수 있는지 (DOM을 직접 조작하지 않을 방법) 고민해보기
                this.$target.querySelector('#click-upload-input').click()
            }
            if (target.id === 'delete-btn') {
                const EMPTY = 0
                this.setState({ isLoad: EMPTY })
            }

            if (target.id === 'error-btn') {
                this.setState({ error: { isError: false } })
            }
        })

        this.$target.addEventListener('change', ({ target }) => {
            if (target.id === 'click-upload-input') {
                if (!target.files[0].type.startsWith('image/')) return null
                const imgFile = target.files[0]
                fileReader.readAsDataURL(imgFile) // FileReader로 상태 관리 위임
            }
        })

        this.$target.addEventListener('dragenter', e => {
            if (e.target.matches('#img-box, #img-box *')) {
                e.preventDefault()
            }
        })

        this.$target.addEventListener('dragover', e => {
            if (e.target.matches('#img-box, #img-box *')) {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'copy'
            }
        })

        this.$target.addEventListener('drop', e => {
            if (e.target.matches('#img-box, #img-box *')) {
                e.preventDefault()
                const imgFile = e.dataTransfer.files
                console.log('img:', imgFile)
                if (!imgFile[0].type.startsWith('image/')) return null

                fileReader.readAsDataURL(imgFile[0]) // FileReader로 상태 관리 위임
            }
        })
    }
}