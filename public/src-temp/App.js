function setEvent(eventType, selector, callback) {
    const $app = document.querySelector('#app')

    $app.addEventListener(eventType, e => {
        if (e.target.matches(selector)) {
            callback(e)
        }
    })
}

let index = 0
function setStyle(...cssLiterals) {
    const style = document.createElement('style')
    document.head.appendChild(style)

    cssLiterals.forEach(cssLiteral => {
        style.sheet.insertRule(cssLiteral, index++)
    })
}

export function App() {
    const html = document.createDocumentFragment()

    html.innerHTML = `
        <div>
            <h1>Photo Album</h1>
        </div>
        <ul>
            <li>upload</li>
            <li>album</li>
        </ul>
    `

    setStyle(`
            div {
                height: 100%;
            }
            `,`
            h1 {
                height: 100%;
                font-size: 30px;
                line-height: 50px;
            }`,`
            ul {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                height: 100%;
            }`,`
            li {
                flex-grow: 1;
                text-align: center;
                height: 100%;
                border: 1px solid grey;
                line-height: 50px;
                cursor: pointer;
            }`
    )
    
    setEvent('click', 'li', e => {
        console.log('아직 nav 기능이 완성되지 않았습니다.')
    })

    return html.innerHTML
}