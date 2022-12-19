import { useContext, useState } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

import styles from "./Card.module.scss";

export const Card = ({
  id,
  imgUrl,
  name,
  price,
  onPlus,
  onFavorite,
  liked = false,
  loading = false,
}) => {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(liked);

  const onClickPlus = () => {
    onPlus({ id, imgUrl, name, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, imgUrl, name, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={220}
          viewBox="0 0 150 220"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="107" rx="10" ry="10" width="150" height="15" />
          <rect x="0" y="126" rx="10" ry="10" width="100" height="15" />
          <rect x="0" y="168" rx="10" ry="10" width="80" height="24" />
          <rect x="118" y="168" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div onClick={onClickFavorite} className={styles.favorite}>
            <img
              src={isFavorite ? "/img/liked.svg" : "/img/like.svg"}
              alt="Unliked"
            />
          </div>
          <img width={133} height={112} src={imgUrl} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              className={styles.buttImg}
              width={32}
              height={32}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "/img/added.svg" : "/img/add.svg"}
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
};
