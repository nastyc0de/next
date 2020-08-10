import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useRouter } from 'next/router';
import { DetailProduct } from '../components/layout/DetailProduct';
import useProduct from '../hooks/useProduct';



export default function Search() {
  const router = useRouter();
  const {query: {q}} = router;

  // todos los productos
  const {products} = useProduct('creado');
  const [queryResult, setQueryResult] = useState([]);
  

  useEffect(() => {
    const search = q.toLowerCase();
    const filtro = products.filter(product =>{
      return(
        product.nombre.toLowerCase().includes(search) ||
        product.descripcion.toLowerCase().includes(search)

      )
    });
    setQueryResult(filtro);
  }, [q, products])

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
                {queryResult.map(product => (
                  <DetailProduct
                    key={product.id}
                    product={product}
                  />
                ))
                }
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}