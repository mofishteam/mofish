import '../utils/commander'
import process from 'process'
import main from '../index'
import getGlobalConfig from '../config'

console.log(process.argv)
const config = getGlobalConfig(global.commander.dev)
if (global.commander.silent === 'false') {
  main()
}
