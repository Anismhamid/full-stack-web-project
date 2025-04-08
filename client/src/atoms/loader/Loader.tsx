import {FunctionComponent} from "react";

interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
	return (
		<main className='gradient min-vh-100 d-flex align-items-center justify-content-center'>
			<div className='loader'></div>
		</main>
	);
};

export default Loader;
