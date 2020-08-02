import React from 'react';
import { Header } from '../layout/Header';
import { Global, css } from '@emotion/core';
import Head from 'next/head';

export const Layout = (props) => {
    return (
        <>
            <Global
                styles={css`
                    :root{
                        --primary:#583E37;
                        --second:#DD2D4A;
                        --third:#75B9BE;
                    }
                    html{
                        font-size: 62.5%;
                        box-sizing:border-box;
                    }
                    *, *:before,*:after{
                        box-sizing:inherit;
                    }
                    body{
                        font-size:1.6rem;
                        line-height:1.5;
                        font-family: 'Concert One', cursive;
                    }
                    h1, h2, h3{
                        margin: 0 0 2rem 0;
                        line-height:1.5;
                    }
                    h1, h2{
                        font-family: 'Red Rose', cursive;
                        font-weight:700;
                    }
                    h3{
                        font-family: 'Concert One', cursive;
                    }
                    ul{
                        list-style:none;
                        margin:0;
                        padding:0;
                    }
                    a{
                        text-decoration:none;
                    }

                `}
            />
            <Head>
                <html lang='es'/>
                <title>ProductHunt</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css"/>
                <link href="https://fonts.googleapis.com/css2?family=Concert+One&family=Red+Rose:wght@300;400;700&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="/static/css/app.css"/>

            </Head>

            <Header/>
            <main>
                {props.children}
            </main>
        </>
    )
}
