import React, { useState, MouseEvent } from "react";
import styled from "@emotion/styled";

import { supabase } from "../helpers/supabaseClient";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import UnstyledLink from "../../src/components/UnstyledLink";

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
									<UnstyledLink href="/add" linkText="➕ Add Clothing" />
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<UnstyledLink href="/view" linkText="👀 View Wardrobe" />
								</MenuItem>
								<MenuItem onClick={handleLogout}>👋 Logout</MenuItem>
							</div>
						) : (
							<div>
								<MenuItem onClick={handleClose}>
									<UnstyledLink href="/login" linkText="Login" />
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<UnstyledLink href="/signup" linkText="Signup" />
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
