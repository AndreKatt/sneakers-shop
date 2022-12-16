import { useState } from "react";
import styles from "./Card.module.scss";

export const Card = ({ imgUrl, name, price, onPlus }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const onClickPlus = () => {
    onPlus({ imgUrl, name, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div
        onClick={() => setIsFavorite(!isFavorite)}
        className={styles.favorite}
      >
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
          src={isAdded ? "/img/added.svg" : "/img/add.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
};
