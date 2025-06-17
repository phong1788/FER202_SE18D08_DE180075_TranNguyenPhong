import React from 'react';
import Counter from './components/Counter';
import Textbox from './components/Textbox';
import ProductList from './components/ProductList';
import RadioProductList from './components/RadioProductList';
import './App.css';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Counter />
      <br/>
      <Textbox />
      <br/>
      <ProductList/>
      <br/>
      <RadioProductList/>
    </div>
  );
}

export default App;