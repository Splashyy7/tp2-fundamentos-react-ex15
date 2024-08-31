import React, { useState, useEffect } from 'react';


const Exercicio15 = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId,setProductId] = useState(null);

  async function fetchData(){
    try {
      const response = await fetch('https://fakestoreapi.com/products')
         if(!response.ok){
           throw new Error('Erro');
         }

    const data = await response.json();
    setProdutos(data);
    } catch (error) {
      console.error("Erro",error);
    }finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    fetchData();
  }, [])


  const handleProductClick = (id) => {
    setProductId(id);
  }

  const handleSelectChange = (event) => {
    const selectId = Number(event.target.value) 
      setProductId(selectId);
  }
  
   const selectedProduct = produtos.find(product => product.id === selectedProductId)


  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


   return (
      <div>
        <h1>Produtos</h1>
        
        <select onChange={handleSelectChange} defaultValue="">
        <option value="" disabled> Selecione um produto</option>
          {produtos.map((product) => (
            <option key={product.id} value={product.id}>
              {product.title}
            </option>
          ))}
        </select>


        
        <ul>
          {produtos.map((product) => (
            <li key={product.id} onClick={() => handleProductClick(product.id)}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <strong>${product.price}</strong>
            </li>
          ))}
        </ul>
        {selectedProduct &&(
          <div>
            <h1>{selectedProduct.title}</h1>
            <img src={selectedProduct.image} alt={selectedProduct.title} width="200" />
            <p>{selectedProduct.description}</p>
            <strong>Price: ${selectedProduct.price}</strong>
          </div>  

        )}
      </div>
    );
  };

export default Exercicio15;