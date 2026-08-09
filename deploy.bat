@echo off
REM =================================================
REM  MOHAMED IRFAN PORTFOLIO — Safe Deploy Script
REM  Usage: npm run deploy
REM =================================================

echo.
echo  ============================================
echo   PORTFOLIO DEPLOY — mohamed-irfan.vercel.app
echo  ============================================
echo.

REM Step 1: Build check
echo  [1/4] Running production build check...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  BUILD FAILED. Fix errors before deploying.
    echo.
    exit /b 1
)
echo  Build passed.
echo.

REM Step 2: Check for changes
git status --short
git diff --stat HEAD
echo.

REM Step 3: Stage, commit, push
echo  [2/4] Staging changes...
git add -A

REM Check if there are changes to commit
git diff --cached --quiet
if %ERRORLEVEL% EQU 0 (
    echo  No changes to commit. Skipping Git push.
    echo.
) else (
    echo  [3/4] Committing...
    set /p COMMIT_MSG="  Enter commit message (or press Enter for default): "
    if "%COMMIT_MSG%"=="" set COMMIT_MSG=update: portfolio changes
    git commit -m "%COMMIT_MSG%"
    echo.

    echo  [4/4] Pushing to GitHub...
    git push origin main
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo  PUSH FAILED. Check your connection or Git auth.
        echo.
        exit /b 1
    )
    echo  Pushed to GitHub successfully.
    echo.
)

REM Step 4: Deploy to Vercel
echo  Deploying to Vercel production...
call npx vercel --prod --yes
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  VERCEL DEPLOY FAILED.
    echo.
    exit /b 1
)

echo.
echo  ============================================
echo   DEPLOYED SUCCESSFULLY
echo   Live: https://mohamed-irfan.vercel.app
echo  ============================================
echo.
