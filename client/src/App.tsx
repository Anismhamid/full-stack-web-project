import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Fruits from "./components/Fruits";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import {path, productsPathes} from "./routes/routes";
import Vegetable from "./components/Vegetable";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import PageNotFound from "./components/Png";
import Register from "./components/Register";
import Login from "./components/Login";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import UsersManagement from "./components/UsersManagement.js";
import {UserProvider} from "./hooks/useUSer.js";
import {ToastContainer} from "react-toastify";


function App() {
	return (
		<UserProvider>
			<ToastContainer />
			<Router>
				<NavBar />
				<Routes>
					<Route path={path.Home} element={<Home />} />
					<Route path={path.Login} element={<Login />} />
					<Route path={path.Register} element={<Register />} />
					<Route path={path.UsersManagement} element={<UsersManagement />} />
					<Route path={path.Contact} element={<Contact />} />
					<Route path={path.About} element={<About />} />
					<Route path={path.Cart} element={<Cart />} />
					<Route path={productsPathes.Fruits} element={<Fruits />} />
					<Route path={productsPathes.Vegetable} element={<Vegetable />} />
					<Route path={path.Png} element={<PageNotFound />} />
				</Routes>
				<Footer />
			</Router>
		</UserProvider>
	);
}

export default App;
