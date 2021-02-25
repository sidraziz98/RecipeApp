const bcrypt = require('bcrypt');

const data = {
    userRoles: [
        {
            _id: 1,
            role: 'admin'
        },
        {
            _id: 2,
            role: 'user'
        },
    ],
    users: [
        {
            firstName: "Zoha",
            lastName: "Imran",
            email: "zoha@gmail.com",
            password: bcrypt.hashSync('12345', 8),
            userRole: 1
        },
        {
            firstName: "Sidra",
            lastName: "Aziz",
            email: "sidraziz98@gmail.com",
            password: bcrypt.hashSync('12345', 8),
            userRole: 1
        },
        {
            firstName: "Sarah",
            lastName: "Imran",
            email: "sarah@gmail.com",
            password: bcrypt.hashSync('12345', 8),
            userRole: 1
        },
    ],
};

module.exports = data;