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
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://639cbc2942e3ad69273abfaa.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://639cbc2942e3ad69273abfaa.mockapi.io/favorite"
      );
      const itemsResponse = await axios.get(
        "https://639cbc2942e3ad69273abfaa.mockapi.io/Items"
      );
      setCartItems(cartResponse.data);
      setFavorite(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://639cbc2942e3ad69273abfaa.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://639cbc2942e3ad69273abfaa.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
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

  const onRemoveItem = (id) => {
    axios.delete(`https://639cbc2942e3ad69273abfaa.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
              cartItems={cartItems}
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
