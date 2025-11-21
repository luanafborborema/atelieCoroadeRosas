@echo off
chcp 65001 >nul
title Ateliê Coroa de Rosas - Servidor
color 0A

echo.
echo ╔════════════════════════════════════════════════╗
echo ║     ATELIÊ COROA DE ROSAS - SERVIDOR          ║
echo ╚════════════════════════════════════════════════╝
echo.

REM Verificar se está na pasta correta
if not exist "backend" (
    echo ❌ ERRO: Você precisa estar na pasta raiz do projeto!
    echo.
    echo 📁 Caminho correto:
    echo    C:\Users\Cliente\Documents\atelieCoroadeRosas-main
    echo.
    pause
    exit /b 1
)

echo ⏳ Verificando dependências...
cd backend

if not exist "node_modules" (
    echo 📦 Instalando dependências (primeira vez)...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ❌ ERRO ao instalar dependências!
        echo.
        pause
        exit /b 1
    )
    echo ✅ Dependências instaladas!
)

echo.
echo ⚙️  Iniciando servidor...
echo.
echo 📍 Endereços importantes:
echo    - Painel Admin: http://localhost:5000/admin
echo    - Site Público: http://localhost:5000
echo    - API: http://localhost:5000/api
echo.
echo 📌 IMPORTANTE:
echo    - Deixe este terminal ABERTO enquanto usar o sistema
echo    - Abra OUTRO terminal para executar: mongod
echo    - Se der erro, copie a mensagem e pesquise
echo.
echo ════════════════════════════════════════════════
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo ❌ ERRO ao iniciar servidor!
    echo.
    echo 🔍 Possíveis causas:
    echo    1. Node.js não instalado (digite: node --version)
    echo    2. MongoDB não está rodando (execute: mongod em outro terminal)
    echo    3. Porta 5000 já está em uso
    echo.
    echo 💡 Solução: Verifique a mensagem de erro acima
    echo.
    pause
    exit /b 1
)
