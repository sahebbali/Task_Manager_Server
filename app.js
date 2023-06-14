const express = require('express');
const bodyPerser =  require('body-parser');
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const helmet  = require('helmet');
const  rateLimit  = require('express-rate-limit');
const mongoose = require('mongoose');
const router = require('./src/routers/api');
const app = new express();
const limiter = rateLimit({windowMs:15*60*1000, max:3000})

app.use(bodyPerser.json({ extended: true }));

app.use(helmet())
app.use(cors())
app.use(hpp())
app.use(xss())
app.use(mongoSanitize())
app.use(limiter)
app.use(express.json({limit: '50mb'}))
// app.use(express.urlencoded({limit: '50mb'}))
mongodb://localhost:27017
app.use('/api/v1',router);
// app.use('/', (req, res)=>{
//   res.status(404).json({status: " The status fail", data: "Not Found"})
// })

// const URL = 'mongodb://localhost:27017/attendance-db';
// const OPTION = {
//   user: 'testuser777',
//   pass: 'test7777',
//   autoIndex: true,
//   authSource: 'admin' // replace with the authentication database name
// };
// mongoose.connect(URL,(error)=>{
//   console.log("Database Connected Successfull!");;
//   console.log("The Error",error);
// })
mongoose.connect('mongodb+srv://sahebbali253:saheb123@cluster0.uggzivc.mongodb.net/?retryWrites=true&w=majority')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));


module.exports = app;