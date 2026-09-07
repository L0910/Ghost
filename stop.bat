@echo off
chcp 65001 >nul
echo ========================================
echo   开源个人博客系统 - 停止脚本
echo ========================================
echo.

if not exist "runtime" (
    echo [错误] runtime目录不存在
    pause
    exit /b 1
)

cd runtime
echo [信息] 正在停止Ghost...
ghost stop

if %errorlevel% equ 0 (
    echo.
    echo [成功] Ghost已停止
    echo.
) else (
    echo.
    echo [提示] Ghost可能已经停止或未运行
    echo.
)

pause
