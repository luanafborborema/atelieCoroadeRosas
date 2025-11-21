@echo off
REM Script para iniciar o Ateliê Coroa de Rosas
REM Windows PowerShell é necessário

echo ========================================
echo Ateliê Coroa de Rosas - Inicialização
echo ========================================
echo.

REM Verificar se estamos na pasta correta
if not exist "backend" (
    echo ERRO: Execute este arquivo na pasta raiz do projeto!
    pause
    exit /b 1
)

echo 1. Verificando dependências...
cd backend

if not exist "node_modules" (
    echo   Instalando dependências...
    call npm install
    if errorlevel 1 (
        echo ERRO: Falha ao instalar dependências!
        pause
        exit /b 1
    )
)

echo.
echo 2. Iniciando MongoDB...
echo   IMPORTANTE: Certifique-se que MongoDB está instalado e rodando!
echo.
echo   Se usar MongoDB local (instalado):
echo     - Abra outro terminal/PowerShell
echo     - Execute: mongod
echo.
echo   Se usar MongoDB Atlas (online):
echo     - Verifique a URL no arquivo .env
echo     - MONGODB_URI deve ter sua string de conexão
echo.
echo.

echo 3. Iniciando servidor backend...
echo   O servidor estará disponível em: http://localhost:5000
echo   O painel admin está em: http://localhost:5000/admin
echo.
echo ========================================
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo ERRO ao iniciar o servidor!
    echo Verifique a mensagem de erro acima.
    pause
    exit /b 1
)
