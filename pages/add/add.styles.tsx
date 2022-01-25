import styled from "@emotion/styled";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const CoreContainer = styled(Container)`
	display: flex;
	justify-content: center;
`;

export const InputContainer = styled(Paper)`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 16px;
	padding: 8px 0;
	width: 300px;
	border-radius: 16px;
	h2 {
		text-align: center;
		margin: 0 0 8px 0;
		width: 100%;
	}
	form {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
`;

export const StyledSelect = styled.select`
	width: 120px;
	margin: 8px;
	padding: 8px;
	border-radius: 8px;
`;

export const StyledNumberInput = styled.input`
	width: 100%;
	margin: 0 8px 8px 8px;
	padding: 8px;
	border-radius: 8px;
`;

export const StyledTextInput = styled.input`
	border-radius: 8px;
	margin: 0 8px 8px 8px;
	padding: 8px;
	width: 100%;
`;

export const AddClothingButton = styled(Button)`
	margin-top: 8px;
`;
