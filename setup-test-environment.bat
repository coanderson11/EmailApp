@echo off
echo ========================================
echo Setting up Email MCP Test Environment
echo ========================================
echo.

echo [1/4] Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Prisma generate failed
    pause
    exit /b 1
)
echo.

echo [2/4] Running Database Migrations...
call npx prisma migrate deploy
if %errorlevel% neq 0 (
    echo ERROR: Database migration failed
    pause
    exit /b 1
)
echo.

echo [3/4] Seeding Test Data...
call npx tsx seed-test-data.ts
if %errorlevel% neq 0 (
    echo ERROR: Seeding failed
    pause
    exit /b 1
)
echo.

echo [4/4] Building Project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Test user created:
echo   Email: test@example.com
echo   ID: test-microsoft-id-12345
echo.
echo Mock data includes:
echo   - 5 test emails
echo   - 3 tasks
echo   - 2 meetings
echo   - 1 draft
echo   - 1 extension opportunity
echo.
echo Next steps:
echo   1. Configure Claude Desktop (see instructions below)
echo   2. Restart Claude Desktop
echo   3. Test MCP tools
echo.
echo Claude Desktop Config Path:
echo   %%APPDATA%%\Claude\claude_desktop_config.json
echo.
pause
