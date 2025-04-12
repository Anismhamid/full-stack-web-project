import {FunctionComponent, memo, useEffect} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {path} from "../routes/routes";
import {useUser} from "../context/useUSer";
import useToken from "../hooks/useToken";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import AccountMenu from "../atoms/userMenu/AccountMenu";
import {AppBar, Badge, Box, MenuList, Tooltip} from "@mui/material";
import RoleType from "../interfaces/UserType";
import {navbarCategoryLinks} from "../helpers/navCategoryies";
import {emptyAuthValues} from "../interfaces/authValues";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
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
		window.scrollTo(0, 0);
	}, [location]);

	const logout = () => {
		localStorage.removeItem("token");
		setAuth(emptyAuthValues);
		setIsLoggedIn(false);
		setAfterDecode(null);
		navigate(path.Home);
	};

	return (
		<>
			<AppBar position='sticky'>
				<MenuList className='nav  d-flex align-items-center'>
					<Tooltip title='בית' arrow color='secondary'>
						<li className='nav-item'>
							<NavLink
								className={`${
									isActive(path.Home) ? "text-danger fw-bold" : ""
								} nav-link`}
								aria-current='page'
								to={path.Home}
							>
								{fontAwesomeIcon.home}
							</NavLink>
						</li>
					</Tooltip>
					{auth && auth.role === RoleType.Admin && (
						<Tooltip title='ניהול משתמשים' arrow>
							<li className='nav-item'>
								<NavLink
									className={`${
										isActive(path.UsersManagement)
											? "text-danger "
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

					{navbarCategoryLinks.map(({label, path, icon}) => (
						<Tooltip key={path} title={label} arrow>
							<li className='nav-item'>
								<NavLink
									className={`${
										isActive(path) ? "text-danger" : ""
									} nav-link`}
									to={path}
								>
									{icon}
								</NavLink>
							</li>
						</Tooltip>
					))}

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
								isActive(path.Receipt) ? "text-danger fw-bold" : ""
							} nav-link`}
							aria-current='page'
							to={path.Receipt}
						>
							קבלות
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
								<Box sx={{display: "flex", gap: 1}}>
									<Badge badgeContent={1}>
										<NavLink
											className={` ${
												isActive(path.Cart) ? "text-danger" : ""
											} nav-link `}
											aria-current='page'
											to={path.Cart}
										>
											{fontAwesomeIcon.CartInoc}
										</NavLink>
									</Badge>
								</Box>
							</li>
						</Tooltip>
					)}

					{!isLoggedIn ? (
						<li>
							<button
								onClick={() => navigate(path.Login)}
								className={`fw-bold position-absolute ${
									isActive(path.Login) ? "" : ""
								} nav-link`}
								aria-current='page'
								style={{
									backgroundColor: "#00B336",
									left: "6px",
									bottom: "5px",
								}}
							>
								התחבר
							</button>
						</li>
					) : (
						isLoggedIn && <AccountMenu logout={logout} />
					)}
				</MenuList>
			</AppBar>

			<div
				onClick={() => navigate(-1)}
				className='position-fixed border border-light fw-bold link-success z-3 d-flex align-items-center justify-content-center'
				style={{
					cursor: "pointer",
					width: "36px",
					height: "35px",
					right: "16px",
					backgroundColor: "#1A1E22",
					borderRadius: "100%",
					top: "25%",
				}}
			>
				<span style={{color: "#66B2FF"}} className='fs-2'>
					{fontAwesomeIcon.backButton}
				</span>
			</div>
		</>
	);
};

export default memo(NavBar);
