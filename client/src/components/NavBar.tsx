import {FunctionComponent, memo, useEffect} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {path, productsPathes} from "../routes/routes";
import {useUser} from "../context/useUSer";
import useToken from "../hooks/useToken";
import {fontAwesomeIcon} from "../FontAwesome/Icons";

interface NavBarProps {
}

const NavBar: FunctionComponent<NavBarProps> = memo(() => {
	const location = useLocation();
	const {decodedToken, setAfterDecode} = useToken();
	const {auth, setAuth, isLoggedIn, setIsLoggedIn} = useUser();
	const navigate = useNavigate();

	const isActive = (path: string) => location.pathname === path;

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && decodedToken) {
			setAuth(decodedToken);
			if (auth) setIsLoggedIn(true);
		}
	}, [decodedToken,auth]);

	useEffect(() => {
		window.scrollTo(0, 70);
		if(isActive(path.Home)){
			window.scrollTo(0, 100);
		}
	}, [location]);

	const logout = () => {
		localStorage.removeItem("token");
		setAuth(null);
		setIsLoggedIn(false);
		setAfterDecode(null);
		navigate(path.Home);
	};

	return (
		<nav className=' position-relative position-sticky bg-dark top-0 w-100 z-2'>
			<ul className='nav nav-tabs d-flex align-items-center justify-content-around border-bottom border-success-subtle '>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(path.Home) ? "text-danger fw-bold" : ""
						} nav-link`}
						aria-current='page'
						to={path.Home}
					>
						{fontAwesomeIcon.home}
					</NavLink>
				</li>

				{(auth && auth.role !== "Client") && (
					<li className='nav-item'>
						<NavLink
							className={`fs-4 ${
								isActive(path.UsersManagement)
									? "text-danger fw-bold"
									: ""
							} nav-link`}
							aria-current='page'
							to={path.UsersManagement}
						>
							{fontAwesomeIcon.UserGear}
						</NavLink>
					</li>
				)}
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.Fruits) ? "text-danger" : ""
						} nav-link `}
						aria-current='page'
						to={productsPathes.Fruits}
					>
						{fontAwesomeIcon.Fruit}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.Vegetable) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.Vegetable}
					>
						{fontAwesomeIcon.Vegetable}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.fish) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.fish}
					>
						{fontAwesomeIcon.fish}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.dairy) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.dairy}
					>
						{fontAwesomeIcon.dairyProducts}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.meat) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.meat}
					>
						{fontAwesomeIcon.meat}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.spices) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.spices}
					>
						{fontAwesomeIcon.spices}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.bakery) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.bakery}
					>
						{fontAwesomeIcon.bakery}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.beverages) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.beverages}
					>
						{fontAwesomeIcon.beverages}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.forzen) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.forzen}
					>
						{fontAwesomeIcon.forzen}
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`fs-4 ${
							isActive(productsPathes.snacks) ? "text-danger" : ""
						} nav-link`}
						to={productsPathes.snacks}
					>
						{fontAwesomeIcon.snacks}
					</NavLink>
				</li>

				{auth && isLoggedIn && (
					<li className='nav-item'>
						<NavLink
							className={`mt-4 ${
								isActive(path.MyOrders) ? "text-danger fw-bold" : ""
							} nav-link`}
							aria-current='page'
							to={path.MyOrders}
						>
							{fontAwesomeIcon.ordersList} הזמנות
						</NavLink>
					</li>
				)}
				<li className='nav-item'>
					<NavLink
						className={`mt-4 ${
							isActive(path.About) ? "text-danger fw-bold" : ""
						} nav-link`}
						aria-current='page'
						to={path.About}
					>
						אודות
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={`mt-4 ${
							isActive(path.Contact) ? "text-danger " : ""
						} nav-link`}
						aria-current='page'
						to={path.Contact}
					>
						צור קשר
					</NavLink>
				</li>
				{auth && isLoggedIn && (
					<li className='nav-item cart-icon'>
						<NavLink
							// style={{background: "red"}}
							className={`fs-4 ${
								isActive(path.Cart) ? "text-danger" : ""
							} nav-link `}
							aria-current='page'
							to={path.Cart}
						>
							{fontAwesomeIcon.CartInoc}
						</NavLink>
					</li>
				)}

				{!isLoggedIn ? (
					<li>
						<button
							onClick={() => navigate(path.Login)}
							className={`fw-bold bg-gradient fs-6 ${
								isActive(path.Login) ? "text-danger bg-light fw-bold" : ""
							} nav-link`}
							aria-current='page'
						>
							התחבר
						</button>
					</li>
				) : (
					isLoggedIn && (
						<li className='m-0'>
							<button
								onClick={logout}
								className={`fs-5 bg-danger rounded-5 text-dark fw-bold nav-link`}
								aria-current='page'
							>
								<span id='logout'>{fontAwesomeIcon.LogOut}</span>
							</button>
						</li>
					)
				)}
			</ul>
		</nav>
	);
});

export default NavBar;
