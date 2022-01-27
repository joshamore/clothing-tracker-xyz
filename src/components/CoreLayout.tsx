import { ReactNode } from "react";
import Navbar from "./Navbar";

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
	</>
);

export default CoreLayout;
