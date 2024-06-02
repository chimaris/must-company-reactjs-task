import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MemberProvider } from "./context/memberContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MemberProvider>
			<App />
		</MemberProvider>
	</React.StrictMode>
);
