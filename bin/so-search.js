#!/usr/bin/env node

import {fetchInfo} from "../src/api.js"
import { displayResults } from "../src/formatter.js"
import { parseArgs } from "../src/parser.js"

const args = parseArgs(process.argv.slice(2))

const argsObj = {
    searchText: args._[0],
    tags: args.tags,
    limit: Number(args.limit) || 10
}

// -----------------------------------------------------------------
const url = new URL('https://api.stackexchange.com/2.3/search/advanced')



url.search = new URLSearchParams({
    order: 'desc',
    sort: 'relevance',
    q: argsObj.searchText,
    tagged: argsObj.tags ? argsObj.tags.join(" ") : "",
    site: 'stackoverflow'
})

// -----------------------------------------------------------------------------

async function extracFields(url, limit) {
    const res = await fetchInfo(url)

    const results = []

    for (let i = 0; i < Math.min(limit, res.length); i++) {
        results[i] = {
            title: res[i].title,
            link: res[i].link,
            score: res[i].score,
            answers: res[i].answer_count,
            is_answered: res[i].is_answered
        }
    }    

    return results
}


console.log(argsObj)
console.log('\x1b[34m----------------------------------------------------------------------------------\x1b[0m')

extracFields(url, argsObj.limit).then(res => displayResults(res, argsObj.searchText))