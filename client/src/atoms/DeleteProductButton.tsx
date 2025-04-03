import {FunctionComponent} from "react";
import {deleteProduct} from "../services/productsServices";

interface DeleteProductButtonProps {
	product_name: string;
}

const DeleteProductButton: FunctionComponent<DeleteProductButtonProps> = ({
	product_name,
}) => {
	return (
		<button
			onClick={() => deleteProduct(product_name)}
			className='btn btn-danger mt-1 w-100'
		>
			מחיקת המותר
		</button>
	);
};

export default DeleteProductButton;
