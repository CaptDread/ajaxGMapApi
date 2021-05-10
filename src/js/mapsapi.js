class GoogleMap {

    API_KEY = 'AIzaSyA3tRPWowcO3i2l6jwjEWdUg1wRaEShj1A'

    constructor () {

        this.init()
    }

    init () {
        console.log('googleMap init')

        const form = document.querySelector('form[name="place_search"]')
        form.addEventListener('submit', this.handlePlaceSearch)
    }

    handlePlaceSearch = (evt) => {
        evt.preventDefault()
        var placeName = document.querySelector('#place').value

        var placeRequest = {
            location: this.map.getCenter(),
            radius: 50, // this is in meters or miles??
            query: placeName
        }

        this.service = new google.maps.places.PlacesService(this.map)
        this.service.textSearch(placeRequest, this.handlePlaceResults)

        console.log('searching places')
    }

    handlePlaceResults = (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK){
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

                console.log(resName, resLat, resLng)


                var marker = new google.maps.Marker({
                    position: {lat: resLat, lng: resLng },
                    map: this.map,
                    title: resName,
                    label: resName,
                    draggable: false
                })
        
                const infoWindowContent = "<div><h2>Hi Circus</h2><p>I'm at lambert drive</p></div>"
                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                })
        
                marker.addListener('click', () => {
                    infoWindow.open(this.map, marker)
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

        const marker = new google.maps.Marker({
            position: circusCenter,
            map: this.map,
            title: 'The Circus',
            // label: 'the Creative Circus',
            // draggable: false
        })

        const infoWindowContent = "<div><h2>Hi Circus</h2><p>I'm at lambert drive</p></div>"
        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        })

        marker.addListener('click', () => {
            infoWindow.open(this.map, marker)
        })

    }

    
}

window.gMap = new GoogleMap()
