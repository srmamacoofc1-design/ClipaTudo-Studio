@echo off
cd /d "%~dp0"
call npm.cmd ci
if errorlevel 1 goto :erro
call npm.cmd run sync:skill
if errorlevel 1 goto :erro
call npm.cmd run prepare:vision
if errorlevel 1 goto :erro
call npm.cmd run helper:build
if errorlevel 1 goto :erro
echo Instalacao concluida. Abra Iniciar-ClipaTudo.cmd.
pause
exit /b 0
:erro
echo A instalacao falhou. Confira a mensagem acima.
pause
exit /b 1
