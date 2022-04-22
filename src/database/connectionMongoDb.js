const mongoose = require('mongoose');

class connection {
    //Vamos fazer a conexão com banco de dados MongoDb.
    constructor (){
        this.connectionMongoDb();
    };

    connectionMongoDb(){
        this.connection = mongoose.connect('mongodb://localhost/users', {})
            .then(() => console.log('Conexão feita com sucesso...'))
            .catch((erro) => console.log(`Erro, ${erro}...`))
    };

};

module.exports = new connection();
