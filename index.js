const os = require('os');
const fs = require('fs');
const cp = require('child_process')
const LINUX = 'unixOS';
const WINDOWS = 'windows';
const LINUX_COMMAND = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const WINDOWS_COMMAND = 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
const logFile = 'activityMonitor.log';
//console.log(os.cpus());
const execProcess = (command) => {
  const systemInfo = cp.exec(command, (error, stdout, stderr) => {
    process.stdout.write(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    if (error) {
      console.error(`error: ${error}`);
    }
  });
  systemInfo.on('exit', ()=>{
    setTimeout(execProcess, 100, command)
  })
}
execProcess(WINDOWS_COMMAND)

