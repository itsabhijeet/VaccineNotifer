
import express from 'express';
import routes from './src/routes/Routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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

routes(app);

app.get('/', (req, res) => {
    res.send(`Sending from PORT ${PORT}`);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

        