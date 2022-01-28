import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { clothingTypes, clothingConditionType } from "../src/helpers/constants";
import { supabase } from "../src/helpers/supabaseClient";
import { useSession } from "../src/helpers/hooks";

import Spinner from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import CoreLayout from "../src/components/CoreLayout";

import {
	CoreContainer,
	InputContainer,
	StyledSelect,
	StyledNumberInput,
	StyledTextInput,
	AddClothingButton,
} from "../src/styles/add.styles";

const Add = () => {
	const router = useRouter();
	const session = useSession();

	const [pendingResponse, setPendingResponse] = useState(false);
	const [formInput, setFormInput] = useState({
		clothingType: "",
		clothingCondition: "",
		clothingName: "",
		nickname: "",
		purchasePrice: "",
	});
	const [validateForm, setValidateForm] = useState(true);

	// Render spinner while session is loading
	if (session.loading) return <Spinner />;
	// Redirect to home if no session
	if (!session.loading && !session.data) {
		router.push("/");
		return;
	}

	// Form input handler
	const handleChange = (
		event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
	) => {
		setFormInput({
			...formInput,
			...{ [event.target.name]: event.target.value },
		});
	};

	const handleSubmit = async () => {
		const { clothingType, clothingCondition, clothingName, purchasePrice } =
			formInput;

		setPendingResponse(true);

		const userId = session?.data?.user?.id;
		const clothingTypeId = clothingTypes.find(
			(el) => el.name === clothingType
		)?.id;

		try {
			const nicknameUnique = await isNicknameInputUnique();
			if (!nicknameUnique) throw new Error("Nickname is not unique");

			const { data, error } = await supabase
				.from("clothing_item")
				.insert({
					user_id: userId,
					name: clothingName,
					clothing_type: clothingTypeId,
					purchase_condition: clothingCondition,
					nickname: formInput.nickname,
					purchase_price: purchasePrice,
				})
				.single();

			if (error) {
				throw new Error(error.message);
			} else if (data) {
				const recordName = data?.name;
				toast.success(
					recordName ? `Added ${recordName} 🤑` : "Added new clothing item 🤑"
				);

				// Clearing form input
				setFormInput({
					clothingType: "",
					clothingCondition: "",
					clothingName: "",
					nickname: "",
					purchasePrice: "",
				});
			}
		} catch (error: any) {
			console.error(error.message);
			toast.error("Unable to add clothing item 😞");
		} finally {
			setPendingResponse(false);
		}
	};

	/**
	 * Returns true if entered nickname is unique OR if nickname is empty.
	 */
	const isNicknameInputUnique = async () => {
		setPendingResponse(true);

		const { nickname } = formInput;

		if (nickname === "") {
			setPendingResponse(false);
			return true;
		}

		const userId = session?.data?.user?.id;

		try {
			let { data, error } = await supabase
				.from("clothing_item")
				.select("*")
				.match({ user_id: userId, nickname });

			if (error) {
				throw new Error(error.message);
			} else if (data) {
				const isUnique = !!!data.length;
				setValidateForm(isUnique);
				return isUnique;
			}
		} catch (error: any) {
			console.error(error.message);
			toast.error("Error checking if nickname is unique 😞");
		} finally {
			setPendingResponse(false);
		}
	};

	return (
		<CoreLayout isLoggedIn={!!session.data}>
			<CoreContainer>
				<InputContainer elevation={1}>
					<Typography variant="h5" component="h2" align="center">
						Add new clothing item
					</Typography>

					<form>
						<StyledSelect
							name="clothingType"
							id="clothing-type-selector"
							onChange={handleChange}
							value={formInput.clothingType}
						>
							<option value="" disabled>
								Clothing Type
							</option>
							{clothingTypes.map((type) => (
								<option key={type.name} value={type.name}>
									{type.name}
								</option>
							))}
						</StyledSelect>
						<StyledSelect
							name="clothingCondition"
							id="clothing-condition-selector"
							onChange={handleChange}
							value={formInput.clothingCondition}
						>
							<option value="" disabled>
								Condition
							</option>
							{clothingConditionType.map((type) => (
								<option
									key={type.name}
									value={type.name}
								>{`${type.name} ${type.emoji}`}</option>
							))}
						</StyledSelect>

						<StyledTextInput
							type="text"
							name="clothingName"
							value={formInput.clothingName}
							onChange={handleChange}
							placeholder="Clothing Item Name"
						/>

						<StyledTextInput
							type="text"
							name="nickname"
							value={formInput.nickname}
							onChange={handleChange}
							placeholder="Nickname or tracking code"
							onBlur={isNicknameInputUnique}
							disabled={pendingResponse}
						/>

						<StyledNumberInput
							type="number"
							name="purchasePrice"
							placeholder="Purchase Price"
							value={formInput.purchasePrice}
							onChange={handleChange}
						/>
						<AddClothingButton
							color="primary"
							variant="contained"
							onClick={handleSubmit}
							disabled={pendingResponse || !validateForm}
						>
							Add
						</AddClothingButton>
					</form>
				</InputContainer>
			</CoreContainer>
		</CoreLayout>
	);
};

export default Add;
