import Express from 'express';

const path = require('path');
const app = Express();

app.use( Express.static( `${__dirname}/dist` ) );
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(process.env.PORT || 3000);