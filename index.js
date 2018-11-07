const fs = require('fs');
const path = require('path');

const dirList = fs.readdirSync('.', { withFileTypes: true });
let content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Anime Girls Holding Programming Books</title>
  <style>
    html, body { margin: 0; padding: 0 }
    body {
      width: 80vw;
      padding: 5vh 10vw;
      background-color: #F0F2F5;
    }
    a {
      color: #3b8bba;;
      text-decoration: none;
    }
    header { text-align: center }
    p {
      padding-left: 0.5714em;
      border-left: 3px solid #0E90D2;
    }
    ul {
      list-style: none;
      padding: 16px;
      background-color: #FFF;
      display: flex;
      flex-wrap: wrap
    }
    li {
      max-width: 320px;
      margin-right: 16px;
    }
    img {
      max-width: 320px;
    }
  </style>
</head>
<body>

<header>
  <a href="https://github.com/boyEstrogen/Anime-Girls-Holding-Programming-Books" target="_blank"><h1>Anime Girls Holding Programming Books</h1></a>
</header>


`;

function buildSection(catName, list) {
  const lis = list.filter(it => it.isFile()).map(it => {
    const srcPath = path.join(encodeURIComponent(catName), encodeURIComponent(it.name));
    return `<li><a href="${srcPath}" target="_blank"><img src="${srcPath}" /></a></li>`
  }).join('\n  ');
  return `
<p>${catName}</p>
<ul>
  ${lis}
</ul>
`
}

for (const iterator of dirList) {
  if (iterator.isDirectory()) {
    const catName = iterator.name;
    if (catName[0] !== '.') {
      const fileList = fs.readdirSync(path.join('.', catName), { withFileTypes: true });
      content += buildSection(catName, fileList);
    }
  }
}

content += `
</body>
</html>
`

console.log(content);
