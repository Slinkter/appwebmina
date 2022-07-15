import React from "react";

function ProductItem(props) {
    return (
        <div>
            <li className="TodoItem">
                <p>{props.text}</p>
                <DeleteIcon onDelete={props.onDelete} />
            </li>
        </div>
    );
}

export default ProductItem;
