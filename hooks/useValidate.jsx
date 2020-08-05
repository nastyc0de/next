import React, { useState, useEffect } from 'react';


export const useValidate = (initialState, validate, func) => {
    const [value, setValue] = useState(initialState);
    const [error, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);
    
    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(error).length === 0;
            if(noErrores){
                func();
            }
            setSubmitForm(false);
        }
    }, [error]);
    // funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e =>{
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    // funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e =>{
        e.preventDefault();
        const errorValidate = validate(value);
        setError(errorValidate);
        setSubmitForm(true);
    }
    // cuando se realiza el evento de blur
    const handleBlur = () => {
        const errorsValidation = validate(value);
        setError(errorsValidation);
    }
    return {
        value,
        error,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
