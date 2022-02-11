import React, { useState, MouseEvent } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { supabase } from "../helpers/supabaseClient";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ButtonHolder = styled.div`
	margin-left: auto;
`;

interface NavbarProps {
	isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn }: NavbarProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		// Logging out the user
		await supabase.auth.signOut();

		// Close popup menu
		handleClose();

		// Redirect to home
		window.location.href = "/";
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6">👕 Clothing Tracker</Typography>

				<ButtonHolder>
					<IconButton
						edge="start"
						color="inherit"
						aria-controls="navbar-menu"
						aria-haspopup="true"
						onClick={handleClick}
						component="span"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="navbar-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{isLoggedIn ? (
							<div>
								<Link href="/add" passHref>
									<MenuItem onClick={handleClose}>➕ Add Clothing</MenuItem>
								</Link>
								<Link href="/view" passHref>
									<MenuItem onClick={handleClose}>👀 View Wardrobe</MenuItem>
								</Link>
								<Link href="/about" passHref>
									<MenuItem onClick={handleClose}>🤔 About</MenuItem>
								</Link>
								<MenuItem onClick={handleLogout}>👋 Logout</MenuItem>
							</div>
						) : (
							<div>
								<Link href="/login" passHref>
									<MenuItem onClick={handleClose}>Login</MenuItem>
								</Link>
								<Link href="/signup" passHref>
									<MenuItem onClick={handleClose}>Signup</MenuItem>
								</Link>
								<Link href="/about" passHref>
									<MenuItem onClick={handleClose}>About</MenuItem>
								</Link>
							</div>
						)}
					</Menu>
				</ButtonHolder>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
