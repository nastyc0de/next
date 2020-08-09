export default function validateCreateProduct(value){
    let errors = {};

    // validar el nombre del usuario
    if (!value.nombre) {
        errors.nombre='El nombre es obligatorio';
    }

    // validar el email
    if (!value.empresa) {
        errors.empresa='El nombre de la empresa es obligatorio';
    }

    // validar la url
    if (!value.url) {
        errors.url ='La URL del producto';
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(value.url)){
        errors.url = 'URL no válida';
    }
    // validar descripcion 
    if(!value.descripcion){
        errors.descripcion = 'Agrega una descripción de tu producto'
    }

    return errors;
}