import React, { useState, useContext, useEffect } from 'react';
import {Layout} from '../components/layout/Layout';
import { FirebaseContext } from '../firebase';
import { DetailProduct } from '../components/layout/DetailProduct';

export default function Home() {

  const [products, setProducts] = useState([]);
  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
        firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
    }
    getProducts();
  }, []);

  function manejarSnapshot(snapshot){
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setProducts(products);
  }
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
