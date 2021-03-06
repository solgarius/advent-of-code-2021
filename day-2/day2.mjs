import {getLines} from '../util/utility.mjs'

async function run(testMode) {
    const movements = testMode ? await getTestMovements() : await getMovements()
    let {horizontal, depth} = await runSimple(movements)
    console.log(`forward ${horizontal}, depth ${depth}, mul: ${depth * horizontal}`)
    const withAim = await runWithAim(movements)
    console.log(`with Aim forward ${withAim.horizontal}, aim ${withAim.aim} depth ${withAim.depth}, mul: ${withAim.depth * withAim.horizontal}`)
}

async function runSimple(movements = [{direction: 'none', size: 0}]) {
    let horizontal = 0
    let depth = 0
    for (const movement of movements) {
        const {direction = 'none', size = 0} = movement || {}
        if (direction === 'forward' && size) {
            horizontal += size
        } else if (direction === 'up' && size) {
            depth -= size
        } else if (direction === 'down' && size) {
            depth += size
        }
    }
    return {horizontal, depth}
}

async function runWithAim(movements = [{direction: 'none', size: 0}]) {
    let horizontal = 0
    let depth = 0
    let aim = 0
    for (const movement of movements) {
        const {direction = 'none', size = 0} = movement || {}
        if (direction === 'forward' && size) {
            horizontal += size
            depth += aim * size
        } else if (direction === 'up' && size) {
            aim -= size
        } else if (direction === 'down' && size) {
            aim += size
        }
    }
    return {horizontal, depth, aim}
}

async function getTestMovements() {
    return [
        {direction: 'forward', size: 5},
        {direction: 'down', size: 5},
        {direction: 'forward', size: 8},
        {direction: 'up', size: 3},
        {direction: 'down', size: 8},
        {direction: 'forward', size: 2}
    ]
}

async function getMovements() {
    const lines = await getLines('./day-2/movements.csv')
    let movements = []
    for (const line of lines) {
        try {
            const splitLine = line.split(' ')
            const direction = splitLine[0]
            const size = Number(splitLine[1])
            if (direction != null && size != null) {
                movements.push({direction, size})
            }
        } catch (e) {
        }
    }
    return movements
}

export {run}