import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://639cbc2942e3ad69273abfaa.mockapi.io/Items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://639cbc2942e3ad69273abfaa.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    // eslint-disable-next-line
  }, []);

  const onRemove = (id) => {
    axios.delete(`https://639cbc2942e3ad69273abfaa.mockapi.io/cart/${id}`);
  };

  const onAddToCart = (obj) => {
    axios.post("https://639cbc2942e3ad69273abfaa.mockapi.io/cart", obj);
    // const added = cartItems.find((item) => item.imgUrl === obj.imgUrl);
    // if (!added) {
    setCartItems((prev) => [...prev, obj]);
    // }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemove}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear cu-p"
                src="/img/remove.svg"
                alt="Remove"
              />
            )}
            <input
              onChange={handleSearch}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => {
              return (
                <Card
                  key={item.key}
                  name={item.name}
                  price={item.price}
                  imgUrl={item.imgUrl}
                  onPlus={onAddToCart}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
