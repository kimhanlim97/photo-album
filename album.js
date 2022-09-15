const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/album.html`)
})

const port = 3000
app.listen(port, () => {
    console.log(`Express start on http://localhost;${port}`)
})