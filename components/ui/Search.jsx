import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const InputText = styled.input`
    border: 2px solid var(--third);
    border-radius:20px;
    padding:1rem;
    min-width:300px;
`;
const InputSubmit = styled.button`
    height:5rem;
    width:4rem;
    display:block;
    background-size:4rem;
    background-image:url('/static/img/search.svg');
    background-repeat:no-repeat;
    background-color:transparent;
    position:absolute;
    right:1rem;
    top:1px;
    border:none;
    text-indent:-9999px;

    &:hover{
        cursor: pointer;
    }
`;
export const Search = () => {
    return (
        <form
            css={css`
                position: relative;
            `}
        >
            <InputText type="text"/>
            
            <InputSubmit type='submit'>Buscar</InputSubmit>
            
        </form>
    )
}
