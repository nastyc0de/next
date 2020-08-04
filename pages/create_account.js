import React from 'react';
import { css } from '@emotion/core';
import { Layout } from '../components/layout/Layout';
import { Forms, Field, InputSubmit } from '../components/ui/Form';
import { useValidate } from '../hooks/useValidate';
import validateCreateAccount from '../validacion/validateCreateAccount';



export default function CreateAccount() {
  const INITIAL_STATE = {
    nombre:'',
    email:'',
    password:''
  }
  const {value, error, submitForm, handleSubmit,handleChange} = useValidate(INITIAL_STATE, validateCreateAccount, createAccount);

  const {nombre, email, password} = value;

  function createAccount(){
    console.log('creando cuente');
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
                />
              </Field>
              <Field>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Tu email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
              </Field>
              <Field>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Tu password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
              </Field>
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