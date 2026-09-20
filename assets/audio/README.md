# Música local

Coloque aqui o arquivo de música da carta com o nome exato:

```
assets/audio/musica.mp3
```

Formato recomendado: MP3 (compatibilidade ampla) ou OGG como alternativa. Evite arquivos muito grandes — algo em torno de 3–6 MB já cobre a maior parte das músicas com boa qualidade perceptual.

Até que o arquivo real seja adicionado, o elemento `<audio>` em `index.html` aponta para este caminho mas não há arquivo — o navegador simplesmente não reproduz nada (sem erros visíveis para quem visita o site) e o botão de música permanece funcional, pronto para tocar assim que o arquivo existir.

Não é necessário alterar nenhum código depois de adicionar o arquivo — apenas salve-o com o nome `musica.mp3` nesta pasta.
