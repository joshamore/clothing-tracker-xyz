import { ReactNode } from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface CoreLayoutProps {
	isLoggedIn: boolean;
	children: ReactNode;
}

/**
 *
 * The core layout wrapper component for most pages
 *
 * */
const CoreLayout = ({ isLoggedIn, children }: CoreLayoutProps) => (
	<>
		<Navbar isLoggedIn={isLoggedIn} />
		{children}
		<ToastContainer position="bottom-right" />
	</>
);

export default CoreLayout;
