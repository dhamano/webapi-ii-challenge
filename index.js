const express = require('express');
const apiRouter = require('./routes/api-routes');
const server = express();

server.use(express.json());
server.use('/api/posts', apiRouter);

server.get('/', (req, res) => res.send('API is running'));

server.listen(8000, () => console.log('\nAPI is running\n'))