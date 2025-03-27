import {FunctionComponent, memo, useEffect} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {path, productsPathes} from "../routes/routes";
import {useUser} from "../hooks/useUSer";
import useToken from "../hooks/useToken";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = memo(() => {
	const location = useLocation();
	const {decodedToken} = useToken();
	const {auth, setAuth, isLoggedIn, setIsLoggedIn} = useUser();
	const isActive = (path: string) => location.pathname === path;
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && decodedToken) {
			setAuth(decodedToken);
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
			setAuth(null);
		}
	}, [decodedToken, setAuth, setIsLoggedIn]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const logout = () => {
		localStorage.removeItem("token");
		setAuth(null);
		setIsLoggedIn(false);
		navigate(path.Home);
	};

	return (
		<nav className='navbard-brand bg-dark top-0 w-100 position-fixed z-3'>
			<ul className='nav nav-tabs border-light  d-flex align-items-center'>
				<li className='nav-item'>
					<NavLink
						className={`border-bottom p-2${
							isActive(path.Home) ? "text-black border-light fw-bold" : ""
						} nav-link`}
						aria-current='page'
						to={path.Home}
					>
						בית
					</NavLink>
				</li>

				{auth?.isAdmin && (
					<li className='nav-item'>
						<NavLink
							className={`border-bottom p-2 ${
								isActive(path.UsersManagement)
									? "text-danger border-danger fw-bold"
									: ""
							} nav-link`}
							aria-current='page'
							to={path.UsersManagement}
						>
							משתמדים
						</NavLink>
					</li>
				)}
				<li className='nav-item p-2'>
					<NavLink
						className={`border-bottom ${
							isActive(path.About) ? "text-black border-light fw-bold" : ""
						} nav-link`}
						aria-current='page'
						to={path.About}
					>
						אודות
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`border-bottom p-2${
							isActive(path.Contact)
								? "text-black border-light fw-bold"
								: ""
						} nav-link`}
						aria-current='page'
						to={path.Contact}
					>
						צור קשר
					</NavLink>
				</li>
				<li className='nav-item p-2'>
					<NavLink
						className={`border-bottom ${
							isActive(productsPathes.Fruits)
								? "text-black border-light fw-bold"
								: ""
						} nav-link `}
						aria-current='page'
						to={productsPathes.Fruits}
					>
						פירות
					</NavLink>
				</li>
				<li className='nav-item p-2'>
					<NavLink
						className={`border-bottom ${
							isActive(productsPathes.Vegetable)
								? "text-black border-light fw-bold"
								: ""
						} nav-link`}
						to={productsPathes.Vegetable}
					>
						ירקות
					</NavLink>
				</li>
				<li className='nav-item p-2'>
					<NavLink
						className={`border-bottom ${
							isActive(path.Cart) ? "text-black border-light fw-bold" : ""
						} nav-link `}
						aria-current='page'
						to={path.Cart}
					>
						עגלת קניות
					</NavLink>
				</li>
				<li
					className='position-absolute end-0 rounded'
					style={{marginTop: "11rem", marginLeft: "5px"}}
				>
					<NavLink className='navbar-brand text-dark' to='/'>
						<img
							style={{height: "90px"}}
							className='img-fluid'
							src='src/assets/untitled.png'
							alt='Logo image'
						/>
					</NavLink>
				</li>
				{!isLoggedIn && (
					<li>
						<button
							onClick={() => navigate(path.Login)}
							className={`fw-bold text-success ${
								isActive(path.Login)
									? "text-light border border-light fw-bold"
									: ""
							} nav-link`}
							aria-current='page'
						>
							התחבר
						</button>
					</li>
				)}
				{isLoggedIn && (
					<li className=' mx-1 end-0 top-50'>
						<button
							onClick={logout}
							className={`bg-danger rounded-end-5 text-dark fw-bold nav-link`}
							aria-current='page'
						>
							התנתק
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
});

export default NavBar;
