import React, { useContext } from 'react'
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';


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
    const {user} = useContext(FirebaseContext);
    return (
       <NavBar>
           <Link href='/'><a>Inicio</a></Link>
           <Link href='/trending'><a>Populares</a></Link>
           {user &&(
               <Link href='/new_product'><a>Nuevo Producto</a></Link>
           )}
       </NavBar>
    )
}
