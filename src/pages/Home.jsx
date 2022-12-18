import { Card } from "../components/Card";

export const Home = ({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  handleSearch,
  onAddToCart,
  onAddToFavorite,
}) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
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
          .map((item, idx) => {
            return (
              <Card
                key={idx}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
                added={cartItems.some(
                  (obj) => Number(obj.id) === Number(item.id)
                )}
                loading={true}
                {...item}
              />
            );
          })}
      </div>
    </div>
  );
};
