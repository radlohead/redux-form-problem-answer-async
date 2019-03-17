const express = require('express');
const app = express();
const middleware = require('./middleware/index.js');
const getRouter = require('./router/index.js');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})

const server = () => {
	app.listen(4000, () => {
		console.log('Server started');
	});
};

middleware(app);
getRouter().then(router => {
	app.use(router);
	server();
});
