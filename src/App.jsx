import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
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
    axios
      .get("https://639cbc2942e3ad69273abfaa.mockapi.io/favorite")
      .then((res) => {
        setFavorite(res.data);
      });
    // eslint-disable-next-line
  }, []);

  const onRemoveItem = (id) => {
    axios.delete(`https://639cbc2942e3ad69273abfaa.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToCart = (obj) => {
    axios.post("https://639cbc2942e3ad69273abfaa.mockapi.io/cart", obj);
    // const added = cartItems.find((item) => item.imgUrl === obj.imgUrl);
    // if (!added) {
    setCartItems((prev) => [...prev, obj]);
    // }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((fav) => fav.id === obj.id)) {
        axios.delete(
          `https://639cbc2942e3ad69273abfaa.mockapi.io/favorite/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://639cbc2942e3ad69273abfaa.mockapi.io/favorite",
          obj
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch {
      alert("Не удалось добавить в избранное");
    }
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
          onRemove={onRemoveItem}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
        <Route
          exact
          path="/favorites"
          element={
            <Favorites items={favorite} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
