const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err) => {
        if (err)
            console.log(err);
        else
            console.log("connected to database");
    }
);

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

//Handle any errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message || "Error"
        }
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server connected at http://localhost:${port}`);
});