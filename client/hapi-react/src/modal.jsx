import { useState } from "react";
import './modal.css';
export default function Modal(props) {
  const [product, setProduct] = useState(props.product);
  return (
    <div>
      {props.showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              {/* input fields */}

              <div className="modal-input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => {
                    setProduct({ ...product, name: e.target.value });
                  }}
                />
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                  }}
                />
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                />
                <label htmlFor="">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={product.sku}
                  onChange={(e) => {
                    setProduct({ ...product, sku: e.target.value });
                  }}
                />
                <label htmlFor="">Image</label>
                <input
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={(e) => {
                    setProduct({ ...product, image: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
