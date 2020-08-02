import React from 'react';
import { Search } from '../ui/Search';
import { Navbar } from './Navbar';
import Link from 'next/link';

export const Header = () => {
    return (
       <header>
           <div>
               <div>
                   <p>P</p>

                   {/* buscador */}
                        <Search/>
                   {/* Navbar */}
                        <Navbar/>
               </div>
               <div>
                   <p>Hola: Andres</p>
                   <button type='button'>Cerrar Sesion</button>
                   <Link href='/'>Login</Link>
                   <Link href='/'>Crear Cuenta</Link>
               </div>
           </div>
       </header>
    )
}
