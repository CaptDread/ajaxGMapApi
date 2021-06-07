class GoogleMap {

    API_KEY = 'AIzaSyA3tRPWowcO3i2l6jwjEWdUg1wRaEShj1A'

    markers = []

    constructor () {

        this.setupListeners()
    }

    setupListeners() {
        document.addEventListener(`get-map-center`, this.handleMapCenterRequest)
        document.addEventListener(`clear-marker`, this.clearMarker)
        document.addEventListener(`create-marker`, this.createMarker)
    }

    handleMapCenterRequest = (evt) => {
        const mapCenter = this.map.getCenter()
        
        const responseInfo = { center: mapCenter }
        const responseEvent = new CustomEvent(`get-map-center-response`, { detail: responseInfo})
        console.log(responseInfo)
        document.dispatchEvent(responseEvent)
    }

    // init () {
    //     console.log('googleMap init')

    //     const form = document.querySelector('form[name="business_search"]')
    //     form.addEventListener('submit', this.handlePlaceSearch)
    // }

    handlePlaceSearch = (evt) => {
        evt.preventDefault()
        var placeName = document.querySelector('#term').value

        var placeRequest = {
            location: this.map.getCenter(),
            radius: 50, // this is in meters or miles??
            query: placeName
        }

        this.service = new google.maps.places.PlacesService(this.map)
        this.service.textSearch(placeRequest, this.handlePlaceResults)

        console.log('searching places')
    }

    createMarker = (options) => {
        const opt = options.detail
        var marker = new google.maps.Marker({
            position: {lat: opt.lat, lng: opt.lng },
            map: this.map,
            title: opt.name,
            description: opt.desc
        })
        // console.log(`marker ${opt.latitude}`)
        console.log(`mapApi options: `, options)

        const infoWindowContent = `<div><h2>${options.title}</h2>${options.description}</div>`
        if (!this.infoWindow) {
            this.infoWindow = new google.maps.InfoWindow()
        }

        marker.addListener('click', () => {
            this.infoWindow.setContent(infoWindowContent)
            this.infoWindow.open(this.map, marker)
        })

        this.markers.push(marker)
    }

    clearMarker = () => {
        this.markers.forEach(marker => {
            marker.setMap(null)
        })

        console.log(`markers cleared`)
        this.markers = []
    }


    handlePlaceResults = (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK){
            this.clearMarker()
            console.log('got results', results)
            var resCenter = {lat: results[0].geometry.viewport.Ua.i , lng: results[0].geometry.viewport.La.i }

            var mapOptions = {
                center: resCenter,
                zoom:13
            }
            this.map = new google.maps.Map(document.getElementById('map'), mapOptions)

            for (let rm = 0; rm < results.length; rm++) {
                var resName = results[rm].name
                var resLat = results[rm].geometry.viewport.Ua.i
                var resLng = results[rm].geometry.viewport.La.i
                // var resHours = results[rm].opening_hours.isOpen
                // var resNum = results[rm].
                var resRate = results[rm].rating
                var resAddy = results[rm].formatted_address

                console.log(resName, resRate) //name of the place, hours, phone number, and rating.

                this.createMarker({
                    lat: resLat,
                    lng: resLng,
                    title: resName,
                    desc:`<div class="column"><p>Rating ${resRate}</p><p>${resAddy}</p></div>`
                })


            }
        } else {
            console.log('error: ')
        }
    }

    ready() {
        console.log('GoogleMap is ready')

        const circusCenter = { lat: 33.812328, lng: -84.36175 }
        const mapOptions = {
            center: circusCenter,
            zoom: 18
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions)

        // this.createMarker({
        //     lat: circusCenter.lat,
        //     lng: circusCenter.lng,
        //     title: "The Circus",
        //     description: `<div><p>A place where cool shit is made.</p></div>`
        // })

        const mapReadyEvt = new CustomEvent(`map-ready`)
        document.dispatchEvent(mapReadyEvt)

    }

    
}

window.gMap = new GoogleMap()
