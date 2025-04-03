import {FunctionComponent} from "react";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
	return (
		<div className='d-flex justify-content-center align-items-center min-vh-100'>
			<div className='text-center'>
				<h1 className='display-4 text-danger'>Page Not Found</h1>
				<p className='lead'>
					Sorry, the page you are looking for does not exist.
				</p>
				<a href='/' className='btn btn-primary'>
					Go Back to Home
				</a>
			</div>
		</div>
	);
};

export default PageNotFound;
