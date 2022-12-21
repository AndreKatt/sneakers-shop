import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";
import AppContext from "./context";

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://639cbc2942e3ad69273abfaa.mockapi.io/cart"),
            axios.get("https://639cbc2942e3ad69273abfaa.mockapi.io/favorite"),
            axios.get("https://639cbc2942e3ad69273abfaa.mockapi.io/Items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorite(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch {
        alert("Ошибка при запросе данных((");
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentID) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentID) !== Number(obj.id))
        );
        await axios.delete(
          `https://639cbc2942e3ad69273abfaa.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://639cbc2942e3ad69273abfaa.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentID === data.parentID) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch {
      alert("Ошибка при добавлении в корзину");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((fav) => Number(fav.id) === Number(obj.id))) {
        axios.delete(
          `https://639cbc2942e3ad69273abfaa.mockapi.io/favorite/${obj.id}`
        );
        setFavorite((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
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

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
      await axios.delete(
        `https://639cbc2942e3ad69273abfaa.mockapi.io/cart/${id}`
      );
    } catch {
      alert("Ошибка при удалении из корзины");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentID) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorite,
        isItemAdded,
        onAddToCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

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
                isLoading={isLoading}
              />
            }
          />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
