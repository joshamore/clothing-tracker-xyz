import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const CoreContainer = styled.div`
	margin-bottom: 8px;
`;

const ChangeDate = ({ date, setDate }) => {
	const [showDatePicker, setShowDatePicker] = useState(false);

	return (
		<CoreContainer>
			{showDatePicker ? (
				<p>TODO</p>
			) : (
				<Button onClick={() => setShowDatePicker(true)}>
					Not worn today? Set Date
				</Button>
			)}
		</CoreContainer>
	);
};

export default ChangeDate;
