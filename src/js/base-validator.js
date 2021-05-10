class BaseValidator{
    constructor(element, options) {
        console.log(`BaseValidator`)
        this.setup()
        this.element = element
        this.options = options
    }

    setup() {
        const refineForm = document.querySelector('form[name="refine_search"]')
        refineForm.addEventListener(`change`, this.handleChange)
    }

    handleChange = (evt) => {
        if (evt.target.name === "price") {
            const pMess = document.querySelector('.message-price')
            const el = evt.target 
            const newValue = el.value / 25
            if (newValue < 1 ){
                pMess.textContent = "all"
            } else if (newValue < 2) {
                pMess.textContent = "$"
            } else if (newValue < 3) {
                pMess.textContent = "$$"
            } else if (newValue < 4) {
                pMess.textContent = "$$$"
            } else if (newValue < 5) {
                pMess.textContent = "$$$$"
            }
            console.log(`handleChange`, newValue)
        } else if (evt.target.name === "rating") {
            const rMess = document.querySelector('.message-rate')
            const el = evt.target
            const newValue = el.value / 20
            if (newValue < 1 ){
                rMess.textContent = "all"
            } else if (newValue < 2) {
                rMess.textContent = "★"
            } else if (newValue < 3) {
                rMess.textContent = "★★"
            } else if (newValue < 4) {
                rMess.textContent = "★★★"
            } else if (newValue < 5) {
                rMess.textContent = "★★★★"
            } else if (newValue === 5) {
                rMess.textContent = "★★★★★"
            }
            console.log(`handleChange`, newValue)
        } else if (evt.target.name === "range") {
            const dMess = document.querySelector('.message-dist')
            const el = evt.target
            const newValue = el.value / 4
            console.log(`handleChange`, newValue)
            if (newValue < 1 ){
                dMess.textContent = "> 1 mile away"
            } else if (newValue < 2) {
                dMess.textContent = "1 mile away"
            } else {
                dMess.textContent =`${newValue} miles away`
            }
        }
        console.log(evt.target.name)
    }
}

new BaseValidator