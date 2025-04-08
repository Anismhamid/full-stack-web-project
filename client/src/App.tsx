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
import {UserProvider} from "./context/useUSer.js";
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

function App() {
	const navigate = useNavigate();
	return (
		<UserProvider>
			<ToastContainer />
			<NavBar />

			<SpeedDial
				ariaLabel='cart'
				sx={{position: "fixed", bottom: 16, right: 16}}
				icon={fontAwesomeIcon.CartInoc}
				onClick={() => {
					navigate(path.Cart);
				}}
			/>
			<SpeedDial
				ariaLabel='my-orders'
				sx={{position: "fixed", bottom: 16, right: 90}}
				icon={fontAwesomeIcon.ordersList}
				onClick={() => {
					navigate(path.MyOrders);
				}}
			>
				
			</SpeedDial>

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
		</UserProvider>
	);
}

export default App;
