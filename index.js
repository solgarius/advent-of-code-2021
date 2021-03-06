const {performance} = require('perf_hooks')
const ms = require('ms')
const yargs = require('yargs')

const argv = yargs
  .option('d', {description: 'Run advent of code day', type: 'number'})
  .option('t', {description: 'test mode', type: 'boolean'})
  .help()
  .alias('help', 'h')
  .argv;

if (argv.d) {
  let day = null
  try {
    day = import(`./day-${argv.d}/day${argv.d}.mjs`)

  } catch (e) {
    console.error(`Day ${argv.d} has not been implemented, ${e}`)
  }
  if (day) {
    run(day).then((output) => {
      console.log(`completed in ${ms(output.total)}  moduleLoad: ${ms(output.moduleLoad)} code time: ${ms(output.codeExec)}`)
      setTimeout(process.exit)
    })

  }
} else {
  yargs.showHelp()
}

async function run(module) {
  const t0 = performance.now()
  const day = await module
  const t1 = performance.now()
  const result = await day.run(argv.t)
  const t2 = performance.now()
  return {result, moduleLoad: Math.round(t1 - t0), codeExec: Math.round(t2 - t1), total: Math.round(t2 - t0)}
}