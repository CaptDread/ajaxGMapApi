

class Yelp {

    API_BASE_URL = 'https://circuslabs.net/proxies/yelp-fusion-proxy/'
    API_KEY = 'imSIjQRZB51atirCN5wB6srSAzn7H-wT0qZOCwhf_XqHgyLRtCN7TICuKJwCcLEIPK2w3P0keHSZCgzuQXl5q4o5QT3QMED-WKNNfIQ4zDuCspzLnWuajMEixsx9YHYx' 

    constructor() {
        this.setupListener()
    }

    setupListener = () => {
        const form = document.querySelector('form[name="business_search"]')
        form.addEventListener('submit', this.handleSearch)
        const refineForm = document.querySelector('form[name="refine_search"]')
        refineForm.addEventListener('submit', this.refineSearch)
    }


    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const term = document.querySelector('input[name="term"]').value
        const location = document.querySelector('input[name="location"]').value


        const data = {
            _ep: '/businesses/search',
            term: term,
            location: location,
        }

        const headers = {
            Authorization: `Bearer ${this.API_KEY}`
        }

        axios.get(this.API_BASE_URL, { params: data, headers: headers }).then(this.processResults)
    }

    refineSearch = (evt) => {
        evt.preventDefault()
        
        const term = document.querySelector('input[name="term"]').value
        const location = document.querySelector('input[name="location"]').value
        const price = document.querySelector('input[name="price"]').value / 25
        const rating = document.querySelector('input[name="rating"]').value / 20
        const distance = document.querySelector('input[name="range"]').value / 4
        const headers = {
            Authorization: `Bearer ${this.API_KEY}`
        }
        
        
        console.log('narrowing search', Math.floor(price), Math.floor(rating), Math.floor(distance) * 1600)


        if (Math.floor(price) != 0) {
            if (Math.floor(rating) != 0) {
                let data = {
                    _ep: '/businesses/search',
                    term: term,
                    location: location,
                    radius: Math.floor(distance) * 1600,
                    price: Math.floor(price),
                    rating: Math.floor(rating)
                }
                console.log(data)
                axios.get(this.API_BASE_URL, { params: data, headers: headers }).then(this.processResults)
            } else {
                let data = {
                    _ep: '/businesses/search',
                    term: term,
                    location: location,
                    radius: Math.floor(distance) * 1600,
                    price: Math.floor(price)
                }
                console.log(data)
                axios.get(this.API_BASE_URL, { params: data, headers: headers }).then(this.processResults)
            }
        } else {
            if (Math.floor(rating) != 0) {
                let data = {
                    _ep: '/businesses/search',
                    term: term,
                    location: location,
                    radius: Math.floor(distance) * 1600,
                    rating: Math.floor(rating)
                }
                console.log(data)
                axios.get(this.API_BASE_URL, { params: data, headers: headers }).then(this.processResults)
            } else {
                let data = {
                    _ep: '/businesses/search',
                    term: term,
                    location: location,
                    radius: Math.floor(distance) * 1600
                }
                console.log(data)
                axios.get(this.API_BASE_URL, { params: data, headers: headers }).then(this.processResults)
            }
        }

    }

    processResults = (data) => {
        const results = data.data.businesses
        console.log('got data!' , results)

        for (let i = 0; i < results.length; i++) {
            let resultsUl = document.querySelector('.result_list')
            let resLi = document.createElement('li')
            resLi.classList.add('res_li')
            let resDiv = document.createElement('a')
            resDiv.classList.add('res_div')
            let resDivInfo = document.createElement('div')
            resDivInfo.classList.add('res_div-info')
            let resDivHeader = document.createElement('h2')
            resDivHeader.classList.add('res_div-head')
            let resDivDigit = document.createElement('p')
            resDivDigit.classList.add('res_div-contact')
            let resDivAddy = document.createElement('p')
            resDivAddy.classList.add('res_div-address')
            let resDivStats = document.createElement('article')
            resDivStats.classList.add('res_div-stats')
            let resPrice = document.createElement('span')
            resPrice.classList.add('res_stats-price')
            let resRate = document.createElement('span')
            resRate.classList.add('res_stats-rate')
            let resDist = document.createElement('span')
            resDist.classList.add('res_stats-dist')
            let resImg = document.createElement('img')
            resImg.classList.add('res_div-img')

            resultsUl.appendChild(resLi)
            resLi.appendChild(resDiv)
            resDiv.appendChild(resDivInfo)
            resDivInfo.appendChild(resDivHeader)
            resDivInfo.appendChild(resDivDigit)
            resDivInfo.appendChild(resDivAddy)
            resDivInfo.appendChild(resDivStats)
            resDivStats.appendChild(resPrice)
            resDivStats.appendChild(resRate)
            resDivStats.appendChild(resDist)
            resDiv.appendChild(resImg)

            resDivHeader.textContent = results[i].name
            resDiv.target = "_blank"
            resDiv.href = results[i].url
            resDivDigit.textContent = results[i].phone
            resDivAddy.textContent = results[i].location.address1 + ", " + results[i].location.address2 + ", " + results[i].location.city + ", " + results[i].location.zip_code
            resPrice.textContent = results[i].price
            resImg.src = results[i].image_url

            if (Math.floor(results[i].distance / 1600) < 1) {
                resDist.textContent = 'less than 1 mile away'
            } else if (Math.floor(results[i].distance / 1600) < 2) {
                resDist.textContent = Math.floor(results[i].distance / 1600) + ' mile away'
            } else {
                resDist.textContent = Math.floor(results[i].distance / 1600) + ' miles away'
            }

            if (Math.floor(results[i].rating) < 1) {
                resRate.textContent = '👎'
            } else if (Math.floor(results[i].rating) < 2) {
                resRate.textContent = '★'
            } if (Math.floor(results[i].rating) < 3) {
                resRate.textContent = '★★'
            } else if (Math.floor(results[i].rating) < 4) {
                resRate.textContent = '★★★'
            } else if (Math.floor(results[i].rating) < 5) {
                resRate.textContent = '★★★★'
            } else {
                resRate.textContent = '★★★★★'
            }
        }


        // const displayResults = (i) => {
        //     let resultsUl = document.querySelector('results_list')
        //     let resLi = document.createElement('li')
        //     resLi.classList.add('res_li')
        //     let resDiv = document.createElement('div')
        //     resDiv.classList.add('res_div')
        //     let resDivInfo = document.createElement('div')
        //     resDivInfo.classList.add('res_div-info')
        //     let resDivHeader = document.createElement('h2')
        //     resDivHead.classList.add('res_div-head')
        //     let resDivDigit = document.createElement('p')
        //     resDivDigit.classList.add('res_div-contact')
        //     let resDivAddy = document.createElement('p')
        //     resDivAddy.classList.add('res_div-address')
        //     let resDivStats = document.createElement('article')
        //     resDivStats.classList.add('res_div-stats')
        //     let resPrice = document.createElement('span')
        //     resPrice.classList.add('res_stats-price')
        //     let resRate = document.createElement('span')
        //     resRate.classList.add('res_stats-rate')
        //     let resDist = document.createElement('span')
        //     resDist.classList.add('res_stats-dist')
        //     let resImg = document.createElement('img')
        //     resImg.classList.add('res_div-img')

        //     resultsUl.appendChild(resLi)
        //     resLi.appendChild(resDiv)
        //     resDiv.appendChild(resDivInfo)
        //     resDivInfo.appendChild(resDivHeader, resDivDigit, resDivAddy)
        //     resDivInfo.appendChild(resDivStats)
        //     resDivStats.appendChild(resPrice, resRate, resDist)
        //     resDivInfo.appendChild(resImg)

        //     resDivHeader.textContent = results[i].name
        //     resDivDigit.textContent = results[i].phone
        //     resDivAddy.textContent = results[i].location[0].value + ", " + results[i].location[1].value + ", " + results[i].location[3].value + ", " + results[i].location[4].value
        //     resPrice.textContent = results[i].price
        //     resRate.textContent = results[i].rating
        //     resDist.textContent = result[i].distance / 1600
        // }
    }
}

new Yelp