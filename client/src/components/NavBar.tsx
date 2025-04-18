import {FunctionComponent, memo, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {path} from "../routes/routes";
import {useUser} from "../context/useUSer";
import useToken from "../hooks/useToken";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import AccountMenu from "../atoms/userMenu/AccountMenu";
import {
	AppBar,
	Badge,
	Box,
	Button,
	Menu,
	MenuItem,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import RoleType from "../interfaces/UserType";
import {navbarCategoryLinks} from "../helpers/navCategoryies";
import {emptyAuthValues} from "../interfaces/authValues";
import {useCartItems} from "../context/useCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface NavBarProps {}
/**
 *  nav bar
 * @returns nav bar
 */
const NavBar: FunctionComponent<NavBarProps> = () => {
	const location = useLocation();
	const {decodedToken, setAfterDecode} = useToken();
	const {auth, setAuth, isLoggedIn, setIsLoggedIn} = useUser();
	const {quantity, setQuantity} = useCartItems();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openMenu, setOpenMenu] = useState(false);

	const navigate = useNavigate();

	const isActive = (path: string) => location.pathname === path;

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpenMenu(true);
	};

	const handleMenuClose = () => {
		setOpenMenu(false);
	};

	useEffect(() => {
		const storedQuantity = parseInt(localStorage.getItem("cartQuantity") || "0", 10);
		setQuantity(storedQuantity);
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && decodedToken) {
			setAuth(decodedToken);
			if (auth) setIsLoggedIn(true);
		}
	}, [decodedToken, auth]);

	useEffect(() => {
		window.scrollTo(0, 50);
		if (isActive(path.Checkout)) {
		}
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
			<AppBar position='sticky' className='navbar-glass m-auto z-2'>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
						padding: "5px 20px",
					}}
					component='nav'
				>
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
					<Box
						onMouseEnter={handleMenuClick}
						onMouseLeave={handleMenuClose}
						sx={{
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							gap: 0.5,
							position: "relative",
							px: 2,
							py: 1,
							fontWeight: 500,
							color: "text.primary",
						}}
					>
						<Stack direction='row' alignItems='center' spacing={0.5}>
							<Typography variant='body1'>Products</Typography>
							<KeyboardArrowDownIcon
								sx={{
									fontSize: 20,
									transition: "transform 0.3s ease",
									transform: openMenu
										? "rotate(180deg)"
										: "rotate(0deg)",
								}}
							/>
						</Stack>

						<Menu
							anchorEl={anchorEl}
							open={openMenu}
							onClose={handleMenuClose}
							MenuListProps={{
								onMouseEnter: handleMenuClick,
								onMouseLeave: handleMenuClose,
							}}
							anchorOrigin={{vertical: "top", horizontal: "left"}}
							transformOrigin={{vertical: "top", horizontal: "left"}}
						>
							{/* Category Links */}
							{navbarCategoryLinks.map(({label, path, icon}) => (
								<MenuItem key={path} onClick={handleMenuClose}>
									<Tooltip title={label} arrow>
										<NavLink
											className={`${
												isActive(path) ? "text-danger" : ""
											} nav-link`}
											to={path}
										>
											{icon}
										</NavLink>
									</Tooltip>
								</MenuItem>
							))}
						</Menu>
					</Box>
					{auth && auth.role !== RoleType.Admin && isLoggedIn ? (
						<li className='nav-item'>
							<NavLink
								className={` ${
									isActive(path.MyOrders) ? "text-danger fw-bold" : ""
								} nav-link`}
								aria-current='page'
								to={path.MyOrders}
							>
								הזמנות
							</NavLink>
						</li>
					) : (
						auth &&
						auth.role === RoleType.Admin && (
							<li className='nav-item'>
								<NavLink
									className={` ${
										isActive(path.AllTheOrders)
											? "text-danger fw-bold"
											: ""
									} nav-link`}
									aria-current='page'
									to={path.AllTheOrders}
								>
									ההזמנות
								</NavLink>
							</li>
						)
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
							<li className='nav-item ms-1'>
								<Box>
									<Badge
										badgeContent={quantity}
										color='primary'
										overlap='circular'
										sx={{
											"& .MuiBadge-badge": {
												fontSize: "0.75rem",
												height: 20,
												minWidth: 20,
											},
										}}
									>
										<NavLink
											className={`${
												isActive(path.Cart) ? "text-danger" : ""
											} nav-link fs-5`}
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
							<Button
								variant='contained'
								color='success'
								onClick={() => navigate(path.Login)}
								sx={{
									position: "absolute",
									left: "10px",
									bottom: "-35px",
									borderRadius: "20px",
									fontWeight: "bold",
									boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
									"&:hover": {
										backgroundColor: "#45a049",
									},
								}}
							>
								התחבר
							</Button>
						</li>
					) : (
						isLoggedIn && <AccountMenu logout={logout} />
					)}
				</Box>
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
