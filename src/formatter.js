import Table from "cli-table3"
import chalk from "chalk"

function formatResult(item, index) {
    const answeredText = item.is_answered
        ? chalk.green("Yes ✔")
        : chalk.red("No ❌")

    const scoreText =
        item.score >= 100
            ? chalk.yellow(item.score)
            : chalk.white(item.score)

    // Title header
    const header = chalk.bold.white(
        `#${index} 🔥 ${item.title}`
    )

    // Table
    const table = new Table({
        chars: {
            top: '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            bottom: '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            left: '║',
            'left-mid': '╟',
            right: '║',
            'right-mid': '╢',
        },
        colWidths: [15, 70],
        wordWrap: true,
        style: {
            head: [],
            border: ["gray"]
        }
    })

    table.push(
        [chalk.cyan("⭐ Score"), scoreText],
        [chalk.cyan("💬 Answers"), item.answers],
        [chalk.cyan("✔  Answered"), answeredText],
        [chalk.cyan("🔗 Link"), chalk.blue(item.link)]
    )

    return `${header}\n${table.toString()}`
}

function displayResults(results, searchText) {
    // Global header
    const text = `Results for: ${chalk.gray(searchText)}`

    console.log(chalk.green("╔" + "═".repeat(70) + "╗"));
    console.log(chalk.green("║ ") + " ".padEnd(69) + chalk.green("║"));
    console.log(chalk.green("║ ") + text.padEnd(79) + chalk.green("║"));
    console.log(chalk.green("║ ") + " ".padEnd(69) + chalk.green("║"));
    console.log(chalk.green("╚" + "═".repeat(70) + "╝"));
    console.log("")

    if (!results.length) console.log(chalk.red('No results found, Try something else!'))


    results.forEach((item, index) => {
        console.log(formatResult(item, index + 1))
        console.log()
    })
}

export {
    displayResults
}
