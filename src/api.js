// Stack Overflow API logic
const searchUrl = new URL('https://api.stackexchange.com/2.3/search/advanced')

async function fetchInfo(url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`)

    const data = await res.json()
    if (data.error) throw new Error(data.error.message)

    const results = []
    for (let i in data.items) {
        results[i] = data.items[i]
    }

    return results
}

export {
    fetchInfo,
    searchUrl
}
