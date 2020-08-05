import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import { Layout } from '../components/layout/Layout';
import { Forms, Field, InputSubmit, Error } from '../components/ui/Form';

import { useValidate } from '../hooks/useValidate';
import validateCreateAccount from '../validacion/validateCreateAccount';
import firebase from '../firebase';



const INITIAL_STATE = {
  nombre:'',
  email:'',
  password:''
}
export default function CreateAccount() {
  const [msgError, setMsgError] = useState('');

  const {value, error, submitForm, handleSubmit,handleChange, handleBlur} = useValidate(INITIAL_STATE, validateCreateAccount, createAccount);

  const {nombre, email, password} = value;

  async function createAccount(){
    try {
      await firebase.register(nombre, email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error);
      setMsgError(error.message);
    }
  }
  return (
    <div>
      <Layout>
          <>
            <h1
              css={css`
                text-align:center;
                margin-top:5rem;
              `}
            >Crear Cuenta</h1>
            <Forms
              onSubmit={handleSubmit}
              noValidate
            >
              <Field>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    placeholder="Tu nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              </Field>
                  {error.nombre && <Error>{error.nombre}</Error>}
              <Field>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Tu email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              </Field>
                  {error.email && <Error>{error.email}</Error>}
              <Field>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Tu password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              </Field>
                  {error.password && <Error>{error.password}</Error>}
                  {msgError && <Error>{msgError}</Error>}
              <InputSubmit
                type="submit"
              >
              Crear Cuenta
              </InputSubmit>
            </Forms>
          </>
      </Layout>
    </div>
  )
}