// CLI arguments (decide between commander.js or process.argv)

function parseArgs(args) {
    const result = {_: []}

    for (let i = 0; i < args.length; i++) {
        const arg = args[i]

        if (arg.startsWith("--")) {
            const key = arg.slice(2)
            result[key] = []

            while (args[i + 1] && !args[i + 1].startsWith("--")) {
                result[key].push(args[i + 1]);
                i++;
            }
        } else {
            result._.push(arg)
        }
    }

    return result
}

export {
    parseArgs
}