import sinon from "sinon"
let mochaHooks = {
    afterEach() {
        sinon.restore()
    }
}
export { mochaHooks }