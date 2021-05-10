class NYT_SearcherAPI {
    API_BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    API_KEY = 'jrA8G275AjGzAGjYOplvFFkZxIsEXHKG'

    current_ArtIndex = null

    constructor() {
        this.current_ArtIndex = 0
        


        this.setupListener()
    }

    setupListener() {
        const form = document.querySelector('form[name="article_search"]')
        form.addEventListener('submit', this.handleSearch)

        const nextBtn = document.querySelector('.next_btn')
        const prevBtn = document.querySelector('.prev_btn')

        nextBtn.addEventListener('click', this.nextArticle)
        prevBtn.addEventListener('click', this.prevArticle)
    }


    reformatDate = (str) =>{
        let dateRegex = /(\d{1,2})\/(\d{1,2})\/?(\d{2,4})?/
        let dateParts = str.match(dateRegex)
        console.log('reformatDate', str, dateParts, dateRegex)

        let curYY = (new Date()).getFullYear()
        let dateStr = ''
        let year = dateParts[3]
        if (!year) {
            year = curYY
        } else if (year.length == 2) {
            year = "20" + year
        }
        let month = dateParts[1]
        if (month.length == 1) {
            month = "0" + month
        }
        let day = dateParts[2]
        if (day.length == 1) {
            day = "0" + day
        }

        dateStr = `${year}`
        console.log('reformated', dateStr)

        return dateStr
    }

    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const term = document.querySelector('input[name="term"]').value
        const beginDate = this.reformatDate(document.querySelector('input[name="begin_date"]').value)
        const endDate = this.reformatDate(document.querySelector('input[name="end_date"]').value)
        const data = {
            q: term,
            begin_date: beginDate,
            end_date: endDate,
            'api-key': this.API_KEY
        }
        // axios.request({
        //     url: this.API_BASE_URL,
        //     params: data
        // }, this.processResults)
        axios.get(this.API_BASE_URL, { params: data }).then(this.processResults)
    }

    nextArticle = (evt) => {
        evt.preventDefault()
        this.current_ArtIndex ++
        const term = document.querySelector('input[name="term"]').value
        const data = {
            q: term,
            'api-key': this.API_KEY
        }
        axios.get(this.API_BASE_URL, { params: data }).then(this.processResults)
    }
    prevArticle = (evt) => {
        evt.preventDefault()
        this.current_ArtIndex --
        const term = document.querySelector('input[name="term"]').value
        const data = {
            q: term,
            'api-key': this.API_KEY
        }
        axios.get(this.API_BASE_URL, { params: data }).then(this.processResults)
    }

    
    processResults = (response) => {
        console.log('your results captain: ', response)
        let responseData = response.data.response.docs

        
    

        const displayResults = () => {
            let resultsPage = document.querySelector('.results')
            let resImage = document.querySelector('.result_image')
            let head = document.querySelector('.headline')
            let artAuthor = document.querySelector('.article_author')
            let artPostDate = document.querySelector('.article_postDate')
            let leadP = document.querySelector('.lead_paragraph')
            let artUrl = document.querySelector('.article_url')
            resImage.style.display = 'block'
            resImage.src = 'https://static01.nyt.com/' + responseData[this.current_ArtIndex].multimedia[0].url
            resultsPage.style.display = 'block'
            console.log(this.current_ArtIndex)
            console.log('data: ', response.data.response.docs)
    
            head.innerHTML = responseData[this.current_ArtIndex].headline.main
            artAuthor.innerHTML = responseData[this.current_ArtIndex].byline.original
            artPostDate.innerHTML = responseData[this.current_ArtIndex].pub_date
            leadP.innerHTML = responseData[this.current_ArtIndex].abstract + " " + responseData[this.current_ArtIndex].lead_paragraph
            artUrl.href = responseData[this.current_ArtIndex].web_url
            
    
        }
        
        displayResults(this.current_ArtIndex)
        
    }


}

new NYT_SearcherAPI()