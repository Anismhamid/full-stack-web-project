import {FunctionComponent, memo, useEffect} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {path, productsPathes} from "../routes/routes";
import {useUser} from "../context/useUSer";
import useToken from "../hooks/useToken";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import AccountMenu from "../atoms/userMenu/AccountMenu";
import {Tooltip} from "@mui/material";
import Badge from "@mui/joy/Badge";
import Box from "@mui/joy/Box";

interface NavBarProps {}

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
	}, [decodedToken, auth]);

	useEffect(() => {
		window.scrollTo(0, 70);
	}, [location]);

	const logout = () => {
		localStorage.removeItem("token");
		setAuth(null);
		setIsLoggedIn(false);
		setAfterDecode(null);
		navigate(path.Home);
	};

	return (
		<>
			<nav className=' position-relative position-sticky top-0 w-100 z-2'>
				<ul className='nav nav-tabs d-flex align-items-center justify-content-around border-bottom border-success-subtle '>
					{!isLoggedIn ? (
						<li>
							<button
								onClick={() => navigate(path.Login)}
								className={`fw-bold bg-gradient ${
									isActive(path.Login)
										? "text-danger bg-light fw-bold fs-5"
										: ""
								} nav-link`}
								aria-current='page'
							>
								התחבר
							</button>
						</li>
					) : (
						isLoggedIn && <AccountMenu logout={logout} />
					)}
					<Tooltip title='בית' arrow color='secondary'>
						<li className='nav-item'>
							<NavLink
								className={`${
									isActive(path.Home) ? "text-danger fw-bold fs-5" : ""
								} nav-link`}
								aria-current='page'
								to={path.Home}
							>
								{fontAwesomeIcon.home}
							</NavLink>
						</li>
					</Tooltip>
					{auth && auth.role === "Admin" && (
						<Tooltip title='ניהול משתמשים' arrow>
							<li className='nav-item'>
								<NavLink
									className={`${
										isActive(path.UsersManagement)
											? "text-danger fw-bold fs-5"
											: ""
									} nav-link`}
									aria-current='page'
									to={path.UsersManagement}
								>
									{fontAwesomeIcon.UserGear}
								</NavLink>
							</li>
						</Tooltip>
					)}
					<Tooltip title='פירות' arrow>
						<li className='nav-item'>
							<NavLink
								className={`${
									isActive(productsPathes.Fruits)
										? "text-danger fw-bold fs-5"
										: ""
								} nav-link `}
								aria-current='page'
								to={productsPathes.Fruits}
							>
								{fontAwesomeIcon.Fruit}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='ירקות' arrow>
						<li className='nav-item'>
							<NavLink
								className={`${
									isActive(productsPathes.Vegetable)
										? "text-danger"
										: ""
								} nav-link`}
								to={productsPathes.Vegetable}
							>
								{fontAwesomeIcon.Vegetable}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='דגים' arrow>
						<li className='nav-item'>
							<NavLink
								className={`${
									isActive(productsPathes.fish) ? "text-danger" : ""
								} nav-link`}
								to={productsPathes.fish}
							>
								{fontAwesomeIcon.fish}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='מוצרי חלב' arrow>
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(productsPathes.dairy) ? "text-danger" : ""
								} nav-link`}
								to={productsPathes.dairy}
							>
								{fontAwesomeIcon.dairyProducts}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='בשר' arrow>
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(productsPathes.meat) ? "text-danger" : ""
								} nav-link`}
								to={productsPathes.meat}
							>
								{fontAwesomeIcon.meat}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='תבלינים' arrow>
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(productsPathes.spices) ? "text-danger" : ""
								} nav-link`}
								to={productsPathes.spices}
							>
								{fontAwesomeIcon.spices}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='מאפים' arrow>
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(productsPathes.bakery) ? "text-danger" : ""
								} nav-link`}
								to={productsPathes.bakery}
							>
								{fontAwesomeIcon.bakery}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='שתייה' arrow>
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(productsPathes.beverages)
										? "text-danger"
										: ""
								} nav-link`}
								to={productsPathes.beverages}
							>
								{fontAwesomeIcon.beverages}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='מוצרים קפואים' arrow>
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(productsPathes.forzen) ? "text-danger" : ""
								} nav-link`}
								to={productsPathes.forzen}
							>
								{fontAwesomeIcon.forzen}
							</NavLink>
						</li>
					</Tooltip>
					<Tooltip title='חטיפים' arrow>
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(productsPathes.snacks) ? "text-danger" : ""
								} nav-link`}
								to={productsPathes.snacks}
							>
								{fontAwesomeIcon.snacks}
							</NavLink>
						</li>
					</Tooltip>

					{auth && isLoggedIn && (
						<Tooltip title='הזמנות שלי' arrow>
							<li className='nav-item'>
								<NavLink
									className={` ${
										isActive(path.MyOrders)
											? "text-danger fw-bold"
											: ""
									} nav-link`}
									aria-current='page'
									to={path.MyOrders}
								>
									{fontAwesomeIcon.ordersList} הזמנות
								</NavLink>
							</li>
						</Tooltip>
					)}

					<li className='nav-item'>
						<NavLink
							className={`${
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
							className={`${
								isActive(path.Contact) ? "text-danger " : ""
							} nav-link`}
							aria-current='page'
							to={path.Contact}
						>
							צור קשר
						</NavLink>
					</li>
					{auth && isLoggedIn && (
						<Tooltip title='סל קניות' arrow>
							<li className='nav-item cart-icon'>
								<Box sx={{display: "flex", gap: 3}}>
									<Badge badgeContent={3} variant='solid'>
										<NavLink
											className={` ${
												isActive(path.Cart) ? "text-danger" : ""
											} nav-link `}
											aria-current='page'
											to={path.Cart}
										>
											{fontAwesomeIcon.CartInoc}
										</NavLink>{" "}
									</Badge>
								</Box>
							</li>
						</Tooltip>
					)}
				</ul>
			</nav>
			<div className='mt-5 position-fixed z-3 d-flex bg-transparent align-items-center justify-content-evenly'>
				<div
					onClick={() => navigate(-1)}
					className='position-fixed rounded-4 fw-bold link-success z-3'
					style={{
						cursor: "pointer",
						width: "36px",
						height: "40px",
						right: "50px",
					}}
				>
					<span className='fs-1 rounded-5 '>{fontAwesomeIcon.backButton}</span>
				</div>
			</div>
		</>
	);
});

export default NavBar;
