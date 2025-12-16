1) instalar deps (uma vez)  
npm install

2) (opcional) limpar builds antigos  
Remove-Item -Recurse -Force .\out

3) definir modo produção (opcional)  
$env:NODE_ENV = "production"

4) empacotar  
npm run package

5) gerar instalador  
npm run make

6) checar artefatos  
Get-ChildItem -Recurse .\out