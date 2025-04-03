import {FunctionComponent} from "react";

interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
	return (
		<main className='login min-vh-100'>
			<div className='loader'></div>
			<h2>Loading</h2>
		</main>
	);
};

export default Loader;
