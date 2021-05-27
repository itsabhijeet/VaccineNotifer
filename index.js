
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import { notifyJob } from './src/controller/DbController';
import routes from './src/routes/Routes';

const app = express();
const PORT = 4000;

//Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/VNdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

//bodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

export const map = new Map();

setInterval(notifyJob, 60000);
setInterval(() => {
    map.clear();
  }, 60*60*1000);

routes(app);

app.get('/', (req, res) => {
    res.send(`Sending from PORT ${PORT}`);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
