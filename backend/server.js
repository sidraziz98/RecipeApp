const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRole = require('./models/userRoleModel');

const userRoutes = require('./routes/userRoutes');

dotenv.config();

// UserRole.create({
//     _id: 1,
//     role: 'admin'
// },{
//     _id: 2,
//     role: 'user'
// }
// );

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server connected at http://localhost:${port}`);
});