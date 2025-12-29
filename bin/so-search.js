#!/usr/bin/env node

import {fetchInfo, searchUrl} from "../src/api.js"
import { displayResults } from "../src/formatter.js"
import { parseArgs } from "../src/parser.js"

const args = parseArgs(process.argv.slice(2))

const argsObj = {
    searchText: args._[0],
    tags: args.tags,
    limit: Number(args.limit) || 10
}



function buildSearchUrl(searchText, tags) {
    const url = new URL(searchUrl)

    if (!searchText) console.log("Please provide a valid query")

    url.search = new URLSearchParams({
    order: 'desc',
    sort: 'relevance',
    q: searchText,
    tagged: tags ? tags.join(" ") : "",
    site: 'stackoverflow'
    })

    return url
}



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

// -----------------------------------------------------------------------------
const search_url = buildSearchUrl(argsObj.searchText, argsObj.tags)

console.log(argsObj)
console.log('\x1b[34m----------------------------------------------------------------------------------\x1b[0m')

extracFields(search_url, argsObj.limit)
    .then(res => displayResults(res, argsObj.searchText))
    .catch(err => console.error(err))