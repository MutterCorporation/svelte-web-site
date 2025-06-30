@echo off
echo Iniciando servidor de desenvolvimento via WSL...
wsl -e bash -c "cd /home/maikoncarvalho/Projetos/svelte-web-site && npm run dev"
pause 