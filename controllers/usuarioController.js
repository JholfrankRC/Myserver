import Usuario from "../models/usuario.js";
import emailRegistro from "../models/emailRegistro.js";


    const prueba = (req, res)=>{
        res.send({
            msg:"En esta ruta gestionaremos todas las peticiones correspondientes al modelo de usuario"
        })
    };

    const registrar = async (req, res)=>{

        const { nombre, email, password, telefono, direccion, web } = req.body;

        // Validar usuario duplicado
        // findOne busca por los diferentes atributos de la coleccion
        const existeUsuario = await Usuario.findOne({email});

        if(existeUsuario){
            const error = new Error("Usuario ya registrado");
            return res.status(400).json({msg: error.message});
        };

        try {

            const usuario = new Usuario(req.body);
            const usuarioGuardado = await usuario.save();

            // Enviar el email
            emailRegistro({
                email,
                nombre, 
                token: usuarioGuardado.token
            });

            res.json(usuarioGuardado);

        } catch (error) {
            console.error(error.message);
        };
};


    
    export {
        prueba,
        registrar,
        confirmar
    }