import React from 'react';
import { Search } from '../ui/Search';
import { Navbar } from './Navbar';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Buttons } from '../ui/Buttons';
import {FirebaseContext} from '../../firebase';
import { useContext } from 'react';

const HeaderNav = styled.div`
    max-width:1200px;
    width:95%;
    margin:0 auto;
    @media(min-width:768px){
        display:flex;
        justify-content:space-between;
    }
`;
const Logo = styled.p`
    background-color:red;
    color:var(--primary);
    font-size:3rem;
    line-height:0;
    font-weight:700;
    font-family:'Concert One', cursive;
    margin-right:2rem;
    cursor: pointer;

`;
export const Header = () => {
    const {user, firebase} = useContext(FirebaseContext);
    return (
       <header
            css={css`
                border-bottom:2px solid red;
            `}
       >
           <HeaderNav>
               <div
                css={css`
                    display:flex;
                    align-items:center;
                `}
               >
                   <Link href='/'>
                        <Logo>P</Logo>
                   </Link>

                   {/* buscador */}
                        <Search/>
                   {/* Navbar */}
                        <Navbar/>
               </div>
               <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
               >
                   {
                       user
                       ?(
                        <>   
                            <p
                            css={css`margin-right:2rem;`}
                            >Hola: {user.displayName}</p>
                            <Buttons
                                 bgColor="true"
                                 onClick={() => firebase.closeLogin()}
                            >Cerrar Sesion</Buttons>
                        </>
                       ):(
                        <>
                            <Link href='/login'>
                                <Buttons
                                    bgColor="true"
                                >Login</Buttons>
                            </Link>
                            <Link href='/create_account'>
                                <Buttons
                                    bgColor="true">Crear Cuenta</Buttons>
                            </Link>
                        </>
                       )
                   }
               </div>
           </HeaderNav>
       </header>
    )
}
