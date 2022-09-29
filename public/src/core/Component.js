export default class Component {
    $target
    $props
    $state
    constructor($target, $props) {
        this.$target = $target
        this.$props = $props
        this.setup()
        this.render()
        this.setEvent()
    }
    setup() {}
    mounted() {}
    setEvent() {}
    template() {return ``}
    render() {
        this.$target.innerHTML = this.template()
        this.mounted()
    }
    setState(newState) {
        this.$state = { ...this.$state, ...newState  }
        this.render()
    }
    addEvent(eventType, cssSelector, callback) {
        this.$target.addEventListener(eventType, event => {
            if (event.target.matches(cssSelector)) {
                callback(event)
            }
        })
    }
}