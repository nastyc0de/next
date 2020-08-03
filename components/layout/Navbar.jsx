import React from 'react'
import Link from 'next/link';
import styled from '@emotion/styled';

const NavBar = styled.nav`
    padding-left:2rem;

    a{
        font-size:1.8rem;
        margin-left:2rem;
        color:var(--primary);
        font-family: 'Red Rose', cursive;

        &::last-of-type{
            margin-right:0;
        }
    }
`;
export const Navbar = () => {
    return (
       <NavBar>
           <Link href='/'>Inicio</Link>
           <Link href='/trending'>Populares</Link>
           <Link href='/new_product'>Nuevo Producto</Link>
       </NavBar>
    )
}
