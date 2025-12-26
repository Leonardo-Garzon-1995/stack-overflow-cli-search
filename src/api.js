// Stack Overflow API logic

async function fetchInfo(url) {
    const res = await fetch(url)
    const data = await res.json()

    const results = []
    for (let i in data.items) {
        results[i] = data.items[i]
    }

    return results
}

export {
    fetchInfo
}
