import commander from 'commander'
import PackageConfig from '../../package'
// 解析命令行参数
commander.version(`Version: ${PackageConfig.version}`)
  .option('-p, --port [port]', 'Set port for Frame Process.')
  .option('--dev', 'Development mode.')
  .option('--silent [silent]', 'Silent mode, command will run in background.')
commander.parse(process.argv)
global.commander = commander
