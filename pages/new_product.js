import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { Layout } from '../components/layout/Layout';
import { Forms, Field, InputSubmit, Error } from '../components/ui/Form';

import { useValidate } from '../hooks/useValidate';
import validateCreateProduct from '../validacion/validateCreateProduct';
import {FirebaseContext} from '../firebase';
import { Error404 } from '../components/layout/404';
const INITIAL_STATE = {
  nombre:'',
  empresa:'',
  imagen:'',
  url:'',
  descripcion:''
}
export default function NewProduct() {
  const [nomimg, setNomimg] = useState('');
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImg, setUrlImg] = useState('');
  const [msgError, setMsgError] = useState('');

  const {value, error, handleSubmit,handleChange, handleBlur} = useValidate(INITIAL_STATE, validateCreateProduct, createProduct);

  const {nombre, empresa, imagen, url, descripcion} = value;

  // hook de routing para redireccionar
  const router = useRouter();
  // 
  // context con las operaciones crud de firebase
  const {user, firebase} = useContext(FirebaseContext);
  console.log(user);
  
  async function createProduct(){
    
    // si el usuario no esta autenticado llevar al login
    if (!user) {
      return router.push('/login');
    }
    // crear el objeto del nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImg,
      descripcion,
      votos:0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: user.uid,
        nombre:user.displayName
      },
      votado:[]
    }
    // insertarlo en la base de datos
    firebase.db.collection('productos').add(producto);

    return router.push('/');
  }
  const handleUploadStart = () => {
    setProgress(0);
    setUpload(true);
  };
  const handleProgress = progress => setProgress({progress});
  const handleUploadError = error => {
    setUpload(error);
    console.error(error);
  };
  const handleUploadSuccess = nombre => {
    setProgress(100);
    setUpload(false);
    setNomimg(nombre)
    firebase
        .storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then(url => {
              console.log(url);
              setUrlImg(url);
            });
  }
  
  return (
    <div>
      <Layout>
        {!user ? <Error404/> :(
          <>
          <h1
            css={css`
              text-align:center;
              margin-top:5rem;
            `}
          >Nuevo Producto</h1>
          <Forms
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
              <legend>Información General</legend>
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
                  <label htmlFor="empresa">Empresa</label>
                  <input
                      type="text"
                      id="empresa"
                      placeholder="Tu empresa"
                      name="empresa"
                      value={empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                </Field>
                    {error.empresa && <Error>{error.empresa}</Error>}
                <Field>
                  <label htmlFor="imagen">Imagen</label>
                  <FileUploader
                      accept="image/*"
                      id="imagen"
                      name="imagen"
                      randomizeFilename
                      storageRef={firebase.storage.ref("productos")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                  />
                </Field>
                <Field>
                  <label htmlFor="url">URL</label>
                  <input
                      type="url"
                      id="url"
                      name="url"
                      value={url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                </Field>
                    {error.url && <Error>{error.url}</Error>}
              </fieldset>
              <fieldset>
                <legend>Información sobre tu producto</legend>
                <Field>
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                      id="descripcion"
                      name="descripcion"
                      value={descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                </Field>
                    {error.descripcion && <Error>{error.descripcion}</Error>}

              </fieldset>
                
                {msgError && <Error>{msgError}</Error>}
            <InputSubmit
              type="submit"
            >
            Crear Producto
            </InputSubmit>
          </Forms>
        </>
        )}
      </Layout>
    </div>
  )
}