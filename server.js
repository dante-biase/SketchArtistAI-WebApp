const express = require('express');
const reload = require('reload')
const app = express();
const { Timer } = require('timer-node')

app.use(express.static(__dirname))

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

reload(app)
.then(function (reloadReturned) {
    app.listen(3000, () => console.log('listening on port 3000.'));
})
.catch(function (err) {
    console.error('Reload could not start server', err)
})

