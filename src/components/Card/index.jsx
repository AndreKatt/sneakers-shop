import styles from "./Card.module.scss";

export const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/like.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={props.imgUrl} alt="Sneakers" />
      <h5>{props.name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <img
          className={styles.buttImg}
          width={32}
          height={32}
          src="/img/add.svg"
          alt="Plus"
        />
      </div>
    </div>
  );
};
