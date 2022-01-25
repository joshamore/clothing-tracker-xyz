import React, { useState, MouseEvent } from "react";
import Link from "next/link";
import styled from "styled-components";
import { supabase } from "../helpers/supabaseClient";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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

	const handleLogout = () => {
		supabase.auth.signOut();
		handleClose();
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
								<MenuItem onClick={handleClose}>
									<Link href="/add">➕ Add Clothing</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href="/view">👀 View Wardrobe</Link>
								</MenuItem>
								<MenuItem onClick={handleLogout}>👋 Logout</MenuItem>
							</div>
						) : (
							<div>
								<MenuItem onClick={handleClose}>
									<Link href="/login">Login</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href="/signup">Signup</Link>
								</MenuItem>
							</div>
						)}
					</Menu>
				</ButtonHolder>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
