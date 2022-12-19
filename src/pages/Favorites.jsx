import { useContext } from "react";
import AppContext from "../context";
import { Card } from "../components/Card";

export const Favorites = () => {
  const { favorite, onAddToFavorite } = useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1> My favorites</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorite.map((item, idx) => {
          return (
            <Card
              key={idx}
              liked={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};
