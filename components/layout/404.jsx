import React from 'react';
import { css } from '@emotion/core';

export const Error404 = () => {
    return (
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        >
           El contenido no se puede mostrar :( 
        </h1>
    )
}
