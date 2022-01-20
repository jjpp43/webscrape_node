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
        if(index <=11) {
            const bank = $(element).find(`:nth-child(${index + 1}) > td.bold.left.noWrap > a`).text()
            const url = $(element).find(`:nth-child(${index + 1}) > td.bold.left.noWrap > a`).attr('href')
            const interest = $(element).find(`:nth-child(${index + 1}) > td:nth-child(3)`).text()
            const nextMeeting = $(element).find(`tr:nth-child(${index + 1}) > td:nth-child(4)`).text()
            const lastModification = $(element).find(`tr:nth-child(${index + 1}) > td:nth-child(5)`).text()
            
            centralBanks.push({
                bank,
                url,
                interest,
                nextMeeting,
                lastModification
            })
        } else {return false}
    })
    //Print out the information
    centralBanks.forEach((bank) => {
        console.log(`중앙은행    : ${bank.bank}`)
        console.log(`현재 금리   : ${bank.interest}`)
        console.log(`다음 회의   : ${bank.nextMeeting}`)
        console.log(`마지막 변경 : ${bank.lastModification}`)
        console.log(`은행정보    : ${bank.url}\n`)
    })

}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}\n`))
