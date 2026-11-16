$ErrorActionPreference = 'Stop'
$editorRoot = $PSScriptRoot
$workspace = Join-Path $editorRoot 'workspace'
$nodeExe = (Get-Command node.exe).Source
$helperEntry = Join-Path $editorRoot 'packages\agentcut\dist\studio\cli.js'
$nextEntry = Join-Path $editorRoot 'node_modules\next\dist\bin\next'
if (!(Test-Path -LiteralPath $helperEntry) -or !(Test-Path -LiteralPath $nextEntry)) { throw 'Execute Instalar-ClipaTudo.cmd primeiro.' }
function Test-LocalPort([int]$Port) {
    $client = New-Object System.Net.Sockets.TcpClient
    try { $client.Connect('127.0.0.1', $Port); return $true } catch { return $false } finally { $client.Dispose() }
}
if (!(Test-LocalPort 32118)) {
    Start-Process -FilePath $nodeExe -ArgumentList ('"' + $helperEntry + '"'), '--dir', ('"' + $workspace + '"'), '--agent', 'codex' -WorkingDirectory $editorRoot -WindowStyle Hidden
}
if (!(Test-LocalPort 3000)) {
    Start-Process -FilePath $nodeExe -ArgumentList ('"' + $nextEntry + '"'), 'dev', '--hostname', '127.0.0.1', '--port', '3000' -WorkingDirectory $editorRoot -WindowStyle Hidden
}
for ($attempt = 0; $attempt -lt 40; $attempt++) {
    if ((Test-LocalPort 3000) -and (Test-LocalPort 32118)) { break }
    Start-Sleep -Milliseconds 500
}
if (!(Test-LocalPort 3000) -or !(Test-LocalPort 32118)) { throw 'O Agentcut não iniciou. Confira portas e dependências.' }
Start-Process 'http://127.0.0.1:3000/studio'
