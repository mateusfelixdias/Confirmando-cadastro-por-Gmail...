const mongoose = require('mongoose');

//Vamos criar nossa Table.
const users = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
},
{
    //O TIMESTAMPS análisa a hora, data e outras informaçoẽs, quando um novo úsuario for cadastrado.
    timestamps: true
});


module.exports = mongoose.model('users', users);
