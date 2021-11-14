const express = require('express')
const cors = require('cors')
const app = express()

// app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static(__dirname))

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname })
});

app.listen(process.env.port || 3000, () => {})

