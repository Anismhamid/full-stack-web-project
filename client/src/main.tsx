import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./context/useUSer.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_API_GOOGLE_API}>
		<UserProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserProvider>
	</GoogleOAuthProvider>,
);
