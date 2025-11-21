@echo off
chcp 65001 >nul
title MongoDB - Ateliê Coroa de Rosas
color 0B

echo.
echo ╔════════════════════════════════════════════════╗
echo ║          MONGODB - INICIALIZAR                ║
echo ╚════════════════════════════════════════════════╝
echo.

echo 🔍 Verificando MongoDB...
echo.

where mongod >nul 2>nul

if errorlevel 1 (
    echo ❌ ERRO: MongoDB não foi encontrado!
    echo.
    echo 📥 Você precisa instalar MongoDB:
    echo    1. Acesse: https://www.mongodb.com/try/download/community
    echo    2. Baixe a versão Community Edition
    echo    3. Instale no seu computador
    echo    4. Depois execute este script novamente
    echo.
    echo 💡 Alternativa: Use MongoDB Atlas (online)
    echo    Se usar MongoDB Atlas, NÃO precisa executar este script
    echo.
    pause
    exit /b 1
)

echo ✅ MongoDB encontrado!
echo.
echo 🚀 Iniciando MongoDB...
echo.
echo 📌 Se ver uma mensagem com:
echo    "waiting for connections on port 27017"
echo    significa que está funcionando!
echo.
echo ════════════════════════════════════════════════
echo.

mongod

if errorlevel 1 (
    echo.
    echo ❌ ERRO ao iniciar MongoDB!
    echo.
    pause
    exit /b 1
)
