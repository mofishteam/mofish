import '../utils/commander'
import 'colors'
import process from 'process'
import childProcess from 'child_process'
import path from 'path'
// import getGlobalConfig from '../config'

// const config = getGlobalConfig(global.commander.dev)
if (global.commander.silent === 'false') {
  require('../index').default()
} else {
  let proc = null
  if (global.commander.dev) {
    // spawn npm run dev:spawn
    proc = childProcess.spawn('npm', ['run', 'dev:command-index', '--'].concat(process.argv.slice(2, process.argv.length)), {
      cwd: path.join(__dirname, '../../'),
      detached: true,
      stdio: 'ignore'
    })
  } else {
    proc = childProcess.fork(path.join(__dirname, '../index'), [], {
      detached: true,
      stdio: 'ignore'
    })
  }
  if (proc) {
    console.log(`Mofish is running at port: xxx, pid: ${proc.pid}`.green)
  }
  process.exit(0)
}
