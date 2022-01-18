const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = ''

axios(url)
.then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    $('', html).each(function () {
        $(this).text
    })
})