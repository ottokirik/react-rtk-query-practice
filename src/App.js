import { useState } from 'react';
import { useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery } from './redux';

function App() {
  const [count, setCount] = useState('');
  const [product, setProduct] = useState('');

  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (!product) return;

    await addProduct({ body: { name: product } }).unwrap();
    setProduct('');
  };

  const handleDeleteProduct = async ({ id }) => {
    if (!id) return;

    await deleteProduct({ id }).unwrap();
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <div>
        <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
        <button onClick={handleAddProduct}>Add product</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id} onClick={() => handleDeleteProduct({ id })}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
