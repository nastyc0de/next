import React from 'react';
import {Layout} from '../components/layout/Layout';
import { DetailProduct } from '../components/layout/DetailProduct';
import useProduct from '../hooks/useProduct';

export default function Trending() {

  const {products} = useProduct('votos');
  
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
                {products.map(product => (
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
