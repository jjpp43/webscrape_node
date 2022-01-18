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

    $('#curr_table > tbody', html).each(function(index, element) {
        const bank = $(element).find(`tr:nth-child(${index + 1}) > td.bold.left.noWrap > a`).text()
        const url = $(element).find(`tr:nth-child(${index + 1}) > td.bold.left.noWrap > a`).attr('href')
        const interest = $(element).find(`tr:nth-child(${index + 1}) > td:nth-child(3)`).text()
        
        centralBanks.push({
            bank,
            url,
            interest
        })

        //은행 이름(bank)
        //"#curr_table > tbody > tr:nth-child(1) > td.bold.left.noWrap > a"
        //"#curr_table > tbody > tr:nth-child(2) > td.bold.left.noWrap > a"

        //url - href
        //#curr_table > tbody > tr:nth-child(1) > td.bold.left.noWrap > a
        //#curr_table > tbody > tr:nth-child(2) > td.bold.left.noWrap > a

        //현재 금리(interest)
        //#curr_table > tbody > tr:nth-child(1) > td:nth-child(3)
        //#curr_table > tbody > tr:nth-child(2) > td:nth-child(3)
    })
    console.log(centralBanks)

}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
