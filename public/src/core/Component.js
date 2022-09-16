export default class Component {
    $target
    constructor($target) {
        this.$target = $target
        this.render()
    }
    mounted() {}
    template() {return ``}
    render() {
        this.$target.innerHTML = this.template()
        this.mounted()
    }
}