import {FunctionComponent} from "react";
import {path} from "../routes/routes";
import {useNavigate} from "react-router-dom";

interface NavigathionButtonsProps {}

const NavigathionButtons: FunctionComponent<NavigathionButtonsProps> = () => {
	const navigate = useNavigate();

	return (
		<>
			<hr />
			<div className='d-flex flex-wrap'>
				<p className=' fw-bold fs-3'>להזמין</p>
				<button
					onClick={() => navigate(path.Home)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					בית
				</button>
				<button
					onClick={() => navigate(path.Fruits)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף פירות
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף מוצרי חלב
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף בשר
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף דגים
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף תבלינים
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף מאפים
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף משקאות
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף מוצרים קפואים
				</button>
				<button
					onClick={() => navigate(path.Vegetable)}
					className='btn btn-light fw-bold btn-group-vertical w-25 m-1'
				>
					לדף חטיפים
				</button>
			</div>
		</>
	);
};

export default NavigathionButtons;
