class Main {

    constructor () {

        this.setupListener()
    }

    getMapCenter (){
        const getCenterEvent = new CustomEvent(`get-map-center`)
        document.dispatchEvent(getCenterEvent)
    }

    setupListener = () => {
        const form = document.querySelector('form[name="business_search"]')
        form.addEventListener('submit', this.handleSearch)
        

        document.addEventListener(`get-map-center-response`, this.handleMapCenterResponse)
        document.addEventListener(`map-ready`, this.getMapCenter)
        // const refineForm = document.querySelector('form[name="refine_search"]')
        // refineForm.addEventListener('submit', this.refineSearch)
    }

    handleMapCenterResponse = (evt) => {
        const responseInfo = evt.detail
        console.log(`evt ${evt.detail}`)
        const mapCenter = responseInfo.center
        console.log(`handleMapCenterResponse`, mapCenter)

        const query = document.querySelector(`input[name="term"]`).value
        console.log(`query`, query , mapCenter)
        const searchInfo = {
            query: query,
            lat: mapCenter.lat,
            lng: mapCenter.lng
        }
        console.log(`handleSearch`, searchInfo)
        const searchEvent = new CustomEvent(`business-search`, { detail: searchInfo })
        document.dispatchEvent(searchEvent)
        
    }

    handleSearch = (evt) => {
        evt.preventDefault()
        this.getMapCenter()

        
    }
}

new Main()