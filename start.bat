@echo off
chcp 65001 >nul
echo ========================================
echo   开源个人博客系统 - 一键启动脚本
echo ========================================
echo.

REM 检查Ghost CLI是否安装
where ghost >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Ghost CLI，请先安装：
    echo   npm install -g ghost-cli@latest
    echo.
    pause
    exit /b 1
)

REM 检查runtime目录是否存在
if not exist "runtime" (
    echo [信息] runtime目录不存在，正在创建...
    mkdir runtime
    echo [信息] 请在runtime目录中执行 ghost install local 完成首次安装
    echo.
    pause
    exit /b 0
)

REM 进入runtime目录并启动Ghost
cd runtime
echo [信息] 正在启动Ghost...
ghost start

if %errorlevel% equ 0 (
    echo.
    echo [成功] Ghost已启动！
    echo   前台地址: http://localhost:2368
    echo   管理端:   http://localhost:2368/ghost
    echo.
) else (
    echo.
    echo [错误] Ghost启动失败，请检查日志：
    echo   ghost log
    echo   ghost doctor
    echo.
)

pause
