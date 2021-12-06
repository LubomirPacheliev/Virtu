const express = require('express');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.static(path.resolve('./build')));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../build/index.html'));
});

app.listen(port, console.log(`sksksksk on: ${port}`));