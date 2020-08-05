import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import { Layout } from '../components/layout/Layout';
import { Forms, Field, InputSubmit, Error } from '../components/ui/Form';

import { useValidate } from '../hooks/useValidate';
import validateLogin from '../validacion/validateLogin';
import firebase from '../firebase';

const INITIAL_STATE = {
  email:'',
  password:''
}
export default function Login() {

    const [msgError, setMsgError] = useState('');

    const {value, error, handleSubmit,handleChange, handleBlur} = useValidate(INITIAL_STATE, validateLogin, startLogin);
  
    const {email, password} = value;
  
    // async function createAccount(){
    //   try {
    //     await firebase.register(email, password);
    //     Router.push('/');
    //   } catch (error) {
    //     console.error('Hubo un error al iniciar sesión', error);
    //     setMsgError(error.message);
    //   }
    // }
    function startLogin(){
      console.log('Iniciando sesión');
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
              >Iniciar Sesión</h1>
              <Forms
                onSubmit={handleSubmit}
                noValidate
              >
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
                Iniciar Sesión
                </InputSubmit>
              </Forms>
            </>
        </Layout>
      </div>
  )
}