import React, { useState, useEffect } from 'react';


export const useValidate = (initialState, validate, func) => {
    const [value, setValue] = useState(initialState);
    const [error, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);
    
    useEffect(() => {
        const noErrores = Object.keys(error).length === 0;
        if(noErrores){
            func();
        }
        setSubmitForm(false);

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
    return {
        value,
        error,
        submitForm,
        handleSubmit,
        handleChange
    }
}
