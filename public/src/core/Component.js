export default class Component {
    $target
    $state
    constructor($target) {
        this.$target = $target
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
}