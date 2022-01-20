const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://kr.investing.com/central-banks/'

axios(url)
.then(response => {
    const html = response.data
    const $ = cheerio.load(html)

    const centralBanks = []

    $('#curr_table > tbody > tr', html).each((index, element) => {
        if(index <=12) {
            const bank = $(element).find(`:nth-child(${index + 1}) > td.bold.left.noWrap > a`).text()
            const url = $(element).find(`:nth-child(${index + 1}) > td.bold.left.noWrap > a`).attr('href')
            const interest = $(element).find(`:nth-child(${index + 1}) > td:nth-child(3)`).text()
        
            centralBanks.push({
                bank,
                url,
                interest
            })
        }   
    })
    console.log(centralBanks)

}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
