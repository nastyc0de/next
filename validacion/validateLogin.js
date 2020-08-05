export default function validateLogin(value){
    let errors = {};

    // validar el email
    if (!value.email) {
        errors.email='El email es obligatorio';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)){
        errors.email='Email no valido';
    }

    // validar el password
    if (!value.password) {
        errors.password='El password es obligatorio';
    }else if(value.password.length < 6){
        errors.password='El password debe ser de al menos 6 carácteres';
    }

    return errors;
}