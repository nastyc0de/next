import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

const useProduct = orden => {
    const [products, setProducts] = useState([]);
    const {firebase} = useContext(FirebaseContext);
  
    useEffect(() => {
      const getProducts = () => {
          firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
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
    return {
        products
    }
}
export default useProduct;