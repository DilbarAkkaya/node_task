const os = require('os');
const fs = require('fs');
const cp = require('child_process');
const rl = require('readline');
const LINUX = 'linux';
const WINDOWS = 'windows';
const LINUX_COMMAND = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const WINDOWS_COMMAND = 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
const logFile = 'activityMonitor.log';

//console.log(os.cpus());
function appendFile(info) {
  const time = Math.floor(Date.now() / 1000);
  if (fs.existsSync(logFile)) {
    fs.appendFileSync(logFile, `${time} : ${info}\n`)
  } else {
    fs.writeFileSync(logFile, `${time} : ${info}\n`)
  }
};
const execProcess = (command) => {
  const systemInfo = cp.exec(command, (error, stdout, stderr) => {
    if (stdout) {
      // rl.clearLine(process.stdout, 0)
      //rl.cursorTo(process.stdout, 0, null)
      //  process.stdout.write(text)
      process.stdout.write(`${stdout}`);
      return stdout
    }

    if (error) {
      console.error(`error: ${error}`);
    }
  });

  systemInfo.on('exit', () => {
    setTimeout(() => { execProcess(command) }, 100);

    setInterval(() => {
      const mostCPUProcess = cp.execSync(command);

      appendFile(mostCPUProcess)
    }, 60000)
  });
}
const currentOS = process.platform === LINUX ? LINUX_COMMAND : WINDOWS_COMMAND;
execProcess(currentOS);
