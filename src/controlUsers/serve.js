const express = require('express');


const app = express();


app.use(express.json());


const PORT = process.env.PORT || 8080;


const bcryptjs = require('bcryptjs')


const yup = require('yup');


const User = require('../database/createTable/user');


//Conexão com Banco de Dados MongoDb!
require('../database/connectionMongoDb');


//CADASTRO!
app.post('/user', async function (req, res){
        
    //Validação dos dados.
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    });
    
    
    //Caso os dados sejam inválidos!
    if(!await schema.isValid(req.body)){
        res.send(`Erro, dados inválidos!`)
    };
    

    //Vamos análisar se o email já está cadastrado.
    const user_email = await User.findOne({email: req.body.email})

    if(user_email){
        res.send(`Erro, O Email já está cadastrado!`);
        

    }else{
        //Os dados já OK!
        const { name, email, password } = req.body;
        
        const data = { name, email, password };
        
        //Vamos exportar os dados para o modúlo sendEmail e confirmar o cadastro do usuário!
        module.exports = {Name: req.body.name, Email: req.body.email, Password: req.body.password};
        
        
        //Vamos criptografar o possword!
        data.password = await bcryptjs.hash(data.password, 8)


        //Vamos inseri o usuário no banco MongoDb!
        await User.create(data, erro => {
            if(erro){
                res.send(`Erro, ao tentar se cadastrar no sistema: ${erro}...`)
            }else{
                res.send(`Usuário cadastrado com sucesso!`);

                //Confimando o cadastro por email.
                require('../sendEmail/email')
            };
        });
    };

});


//Porta de conexão.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}...`);
});


