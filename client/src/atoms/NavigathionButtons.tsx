import {FunctionComponent} from "react";
import {path, productsPathes} from "../routes/routes";
import {useNavigate} from "react-router-dom";

interface NavigathionButtonsProps {}

const NavigathionButtons: FunctionComponent<NavigathionButtonsProps> = () => {
	const navigate = useNavigate();

	return (
		<>
			<hr />
			<p className='fw-bold fs-3 rounded'>להזמין</p>
			<div className='d-flex flex-wrap'>
				<button
					onClick={() => navigate(path.Home)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					דף בית
				</button>
				<button
					onClick={() => navigate(productsPathes.Fruits)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					פירות
				</button>
				<button
					onClick={() => navigate(productsPathes.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					ירקות
				</button>

				<button
					onClick={() => navigate(productsPathes.fish)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					דגים
				</button>
				<button
					onClick={() => navigate(productsPathes.beverages)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				></button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					תבלינים
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף מאפים
				</button>
				<button
					onClick={() => navigate(productsPathes.beverages)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					משקאות
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					מוצרי חלב
				</button>
				<button
					onClick={() => navigate(productsPathes.forzen)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					מוצרים קפואים
				</button>
				<button
					onClick={() => navigate(productsPathes.snacks)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					חטיפים
				</button>
			</div>
		</>
	);
};

export default NavigathionButtons;
