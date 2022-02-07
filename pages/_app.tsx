import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Clothing Tracker</title>
			</Head>
			<Component {...pageProps} />
			<ToastContainer
				position="bottom-right"
				pauseOnFocusLoss={false}
				newestOnTop={false}
			/>
		</>
	);
};

export default MyApp;
