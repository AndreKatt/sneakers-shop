import React from "react";

export const Drawer = ({ onCloseCart, onRemove, items = [] }) => {
  return (
    <div className="overlay">
      <div className="saved d-flex flex-column">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onCloseCart}
            className="cu-p "
            src="/img/remove.svg"
            alt="Close"
          />
        </h2>
        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ
                <img src="/img/strelka.svg" alt="" />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width={120}
              height={120}
              src="/img/empty-cart.jpg"
              alt="Emty Cart"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button onClick={onCloseCart} className="greenButton">
              <img src="/img/strelka.svg" alt="" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
