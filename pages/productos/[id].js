import React, { useEffect, useContext, useState } from 'react';
import {useRouter} from 'next/router';
import { FirebaseContext } from '../../firebase';
import { Error404 } from '../../components/layout/404';
import { Layout } from '../../components/layout/Layout';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';
import {Field,InputSubmit} from '../../components/ui/Form';
import {Buttons} from '../../components/ui/Buttons';

const DivProduct = styled.div`
    @media (min-width:768px){
        display:grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`
const Producto = () => {
    
    // state del componente
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});

    // routing para obtener el id actual
    const router = useRouter();
    const {query: {id}} = router;

    // context de firebase
    const {firebase, user} = useContext(FirebaseContext);
    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const queryProduct = await firebase.db.collection('productos').doc(id);
                const product = await queryProduct.get();
                if (product.exists) {
                    setProducto(product.data());
                } else {
                    setError(true);
                }
            }
            getProduct();
        }
    }, [id, producto]);
    if (Object.keys(producto).length === 0) return 'Cargando...';
    const {comentarios, creado, descripcion, empresa, nombre, url, urlImg, votos, creador, votado} = producto;
    
    const handleVote = () => {
        if (!user) {
            return router.push('/login');
        }
        const nuevoTotal = votos + 1;

        // verificar si el usuario actual ha votado
        if (votado.includes(user.uid)) return;
        // guardar el id del usuario que ha votado
        const havotado = [...votado, user.uid];
        // actualizar en la bd
        firebase.db.collection('productos').doc(id).update({votos: nuevoTotal, votado:havotado})
        // actualizar el state
        setProducto({
            ...producto,
            votos: nuevoTotal
        })
    }
    // funciones para crear comentarios
    const handleComment = e => {
        setComment({
            ...comment,
            [e.target.name]:e.target.value
        })
    }
    // 
    const handleAddComment = e => {
        e.preventDefault();
        if (!user) {
            return router.push('/login');
        }
        // informacion extra al comentario
        comment.userId = user.uid;
        comment.userNombre = user.displayName;
        // toma copia de comentarios
        const newComments = [
            ...comentarios, comment
        ]
        // actualizar la bd
        firebase.db.collection('productos').doc(id).update({
            comentarios: newComments
        })
        // actualiza el state
        setProducto({
            ...producto,
            comentarios: newComments
        })
    }
    return (
        <>
            <Layout>
                {error &&<Error404/>}
                <div className="contenedor">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                    >{nombre}</h1>
                    <DivProduct>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow(new Date(creado),{locale:es})}</p>
                            <p>Publicado por: {creador.nombre} de:{empresa}</p>
                            <img src={urlImg}/>
                            <p>{descripcion}</p>

                            {user && (
                                <>
                                    <h2>Agrega tu comentario</h2>
                                    <form
                                        onSubmit={handleAddComment}
                                    >
                                        <Field>
                                            <input
                                                type='text'
                                                name='message'
                                                onChange={handleComment}
                                            />
                                        </Field>
                                        <InputSubmit
                                            type='submit'
                                        >Agrega un comentario</InputSubmit>
                                    </form>
                                </>
                            )}
                            <h2 css={css`
                                margin: 3rem 0;`}
                            >Comentarios</h2>
                            {comentarios.length === 0 ? "No hay comentarios": (
                            <ul>
                            {comentarios.map((comentario,i) =>(
                                <li
                                    key={`${comentario.userId}-${i}`}
                                    css={css`
                                        border: 1px solid var(--second);
                                        padding: 2rem;
                                    `}
                                >
                                    <p>{comentario.message}</p>
                                    <p>Escrito por:{comentario.userNombre}</p>
                                </li>
                            ))}
                            </ul>

                            )}
                        </div>
                        <aside>
                            <Buttons
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar URL</Buttons>
                            <div
                                css={css`
                                margin-top: 5rem;
                                `}
                            >
                                <p css={css`
                                    text-align:center;
                                `}>{votos} Votos</p>

                                {
                                    user &&(
                                        <Buttons
                                            onClick={handleVote}
                                            bgColor="true"
                                        >
                                            Votar
                                        </Buttons>
                                    )
                                }
                            </div>
                        </aside>
                    </DivProduct>
                </div>
            </Layout>
        </>
    )
}
export default Producto;