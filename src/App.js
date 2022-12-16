import { Card } from './components/Card';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { useEffect, useState } from 'react';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('https://639cbc2942e3ad69273abfaa.mockapi.io/Items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    const added = cartItems.find(item => item.imgUrl === obj.imgUrl);
    if (!added) {
      setCartItems(prev => [...prev, obj]);
    };
  };

  return (
    <div className='wrapper clear'>
      {cartOpened && 
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
        />
      }
      <Header
        onClickCart={() => setCartOpened(true)} />
      <div className='content p-40'>
       <div className='d-flex align-center justify-between mb-40'>
         <h1>Все кроссовки</h1>
         <div className='search-block d-flex'>
            <img src='/img/search.svg' alt='Search' />
            <input placeholder='Поиск...' />
         </div>
       </div>
        
        <div className='d-flex flex-wrap'>
          {items.map((item) => {
            return (
              <Card
                key={item.key}
                name={item.name}
                price={item.price}
                imgUrl={item.imgUrl}
                onPlus={onAddToCart}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
