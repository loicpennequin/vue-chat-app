const express = require('express');
const http = require('http');
const compression = require('compression');
const path = require('path');
const enforce = require('express-sslify');
const helmet = require('helmet');
const websockets = require('./websockets');

const app = express();
const server = http.createServer(app);
const PUBLIC_PATH = path.join(__dirname, '../dist');

if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use(compression());
app.use(helmet());

app.use(express.static(PUBLIC_PATH));

websockets(server);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('server ready on port', PORT);
});
