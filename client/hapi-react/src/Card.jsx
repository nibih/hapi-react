import "./card.css";
import Modal from "./modal";
import { useState } from "react";
export default function Card(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="card"
        onClick={() => {
          //   toggle setModal
          setShowModal(!showModal);
        }}
      >
        <div className="card-image">
          {/* show image if image is not undefined */}
          {props.product.image && (
            <img src={props.product.image} alt={props.product.name} />
          )}
        </div>
        <div className="card-description">
          <h3>{props.product.name}</h3>
          <p>{props.product.description}</p>
          <p>{props.product.price}</p>
          <p>{props.product.sku}</p>
        </div>
      </div>
      <Modal showModal={showModal} product={props.product}></Modal>
    </>
  );
}
