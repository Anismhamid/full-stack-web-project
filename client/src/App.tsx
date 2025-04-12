import {Routes, Route, useNavigate} from "react-router-dom";
import Fruits from "./components/Fruits";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import {path, productsPathes} from "./routes/routes";
import Vegetable from "./components/Vegetable";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import PageNotFound from "./components/Png";
import Register from "./components/Register";
import Login from "./components/Login";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import UsersManagement from "./components/UsersManagement.js";
import {ToastContainer} from "react-toastify";
import Orders from "./components/Orders.js";
import OrederDetails from "./components/OrederDetails.js";
import AllTheOrders from "./components/AllTheOrders.js";
import Fish from "./components/Fish.js";
import Meat from "./components/Meat.js";
import Spices from "./components/Spices.js";
import Dairy from "./components/Dairy.js";
import Bakery from "./components/Bakery.js";
import Beverages from "./components/Beverages.js";
import Frozen from "./components/Frozen.js";
import Snacks from "./components/Snacks.js";
import Profile from "./components/Profile.js";
import {SpeedDial} from "@mui/material";
import {fontAwesomeIcon} from "./FontAwesome/Icons.js";
import useToken from "./hooks/useToken.js";
import {io} from "socket.io-client";
import {useEffect} from "react";
import {useUser} from "./context/useUSer.js";
import RoleType from "./interfaces/UserType.js";
import {showNewOrderToast} from "./atoms/bootStrapToast/SocketToast.js";
import {showInfo} from "./atoms/Toast.js";
import Receipt from "./components/Receipt.js";

function App() {
	const {decodedToken} = useToken();
	const {auth} = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
			transports: ["websocket"],
		});

		socket.on("new order", (newOrder) => {
			const orderNum = newOrder.orderNumber;
			console.log("New order received in real-time:", orderNum);

			if (auth.role === RoleType.Admin || auth.role === RoleType.Moderator) {
				showNewOrderToast({
					navigate,
					navigateTo: `/orderDetails/${orderNum}`,
					orderNum,
				});
			}
		});

		if (auth.role === RoleType.Admin) {
			socket.on("user:registered", (user) => {
				showInfo(`${user.email} ${user.role} משתמש חדש נרשם`);
			});
			socket.on("user:newUserLoggedIn", (user) => {
				showInfo(
					user.role === RoleType.Client
						? `${user.email} משתמש התחבר`
						: user.role === RoleType.Admin
							? `${user.email} משתמש  אדמן התחבר`
							: `${user.email} משתמש  מנחה התחבר`,
				);
			});
		}

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<>
			<ToastContainer />
			<NavBar />
			{decodedToken && (
				<SpeedDial
					ariaLabel='cart'
					sx={{position: "fixed", bottom: 16, right: 16}}
					icon={fontAwesomeIcon.CartInoc}
					onClick={() => {
						navigate(path.Cart);
					}}
				/>
			)}
			<Routes>
				<Route path={path.Home} element={<Home />} />
				<Route path={path.Login} element={<Login />} />
				<Route path={path.Profile} element={<Profile />} />
				<Route path={path.Register} element={<Register />} />
				<Route path={path.UsersManagement} element={<UsersManagement />} />
				<Route path={path.Contact} element={<Contact />} />
				<Route path={path.About} element={<About />} />
				<Route path={path.Cart} element={<Cart />} />
				<Route path={path.MyOrders} element={<Orders />} />
				<Route path={path.OrderDetails} element={<OrederDetails />} />
				<Route path={path.AllTheOrders} element={<AllTheOrders />} />
				<Route path={path.Receipt} element={<Receipt />} />
				<Route path={productsPathes.Fruits} element={<Fruits />} />
				<Route path={productsPathes.Vegetable} element={<Vegetable />} />
				<Route path={productsPathes.fish} element={<Fish />} />
				<Route path={productsPathes.meat} element={<Meat />} />
				<Route path={productsPathes.spices} element={<Spices />} />
				<Route path={productsPathes.dairy} element={<Dairy />} />
				<Route path={productsPathes.bakery} element={<Bakery />} />
				<Route path={productsPathes.beverages} element={<Beverages />} />
				<Route path={productsPathes.forzen} element={<Frozen />} />
				<Route path={productsPathes.snacks} element={<Snacks />} />
				<Route path={path.Checkout} element={<Checkout />} />
				<Route path={path.Png} element={<PageNotFound />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
