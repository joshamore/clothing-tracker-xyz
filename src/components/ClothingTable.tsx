import { useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import dayjs from "dayjs";

import { ClothingItemType } from "../helpers/types";
import {
	getClothingTypeNameFromId,
	capitalizeFirstLetter,
} from "../helpers/utils";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableHeaderCell = styled(TableCell)`
	font-weight: bold;
`;

interface ClothingTableProps {
	clothingItems: ClothingItemType[];
}

interface SortByState {
	field: string;
	direction: "asc" | "desc";
}

const ClothingTable = ({ clothingItems }: ClothingTableProps) => {
	const [sortBy, setSortBy] = useState<SortByState>({
		field: "name",
		direction: "asc",
	});
	const [renderClothingItems, setRenderClothingItems] = useState<
		ClothingItemType[]
	>(clothingItems.filter((item) => !item.is_retired));

	/**
	 * Handles sorting of the clothing items table when the user selects a column.
	 *
	 * @param {string} field The field to sort by.
	 * @param {boolean} isDate Confirm if compare field is a date.
	 */
	const handleSort = (field: string, isDate: boolean = false) => {
		// Getting new sort direction.
		const newDirection =
			sortBy.field === field
				? sortBy.direction === "asc"
					? "desc"
					: "asc"
				: "asc";

		const sortedClothingItems = [...renderClothingItems];

		if (newDirection === "asc") {
			sortedClothingItems.sort((a, b) => {
				const fieldA = isDate ? new Date(a[field]) : a[field];
				const fieldB = isDate ? new Date(b[field]) : b[field];

				if (fieldA < fieldB) {
					return -1;
				} else if (fieldA > fieldB) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			sortedClothingItems.sort((a, b) => {
				const fieldA = isDate ? new Date(a[field]) : a[field];
				const fieldB = isDate ? new Date(b[field]) : b[field];

				if (fieldA > fieldB) {
					return -1;
				} else if (fieldA < fieldB) {
					return 1;
				} else {
					return 0;
				}
			});
		}

		setSortBy({ field, direction: newDirection });
		setRenderClothingItems(sortedClothingItems);
	};

	return (
		<TableContainer component={Paper}>
			<Table aria-label="clothing items table">
				<TableHead>
					<TableRow>
						<TableHeaderCell>
							<TableSortLabel
								onClick={() => handleSort("name")}
								active={sortBy.field === "name"}
								direction={sortBy.direction}
							>
								Name
							</TableSortLabel>
						</TableHeaderCell>
						<TableHeaderCell>
							<TableSortLabel
								onClick={() => handleSort("purchase_date")}
								active={sortBy.field === "purchase_date"}
								direction={sortBy.direction}
							>
								Purchase Date
							</TableSortLabel>
						</TableHeaderCell>
						<TableHeaderCell>
							<TableSortLabel
								onClick={() => handleSort("clothing_type", true)}
								active={sortBy.field === "clothing_type"}
								direction={sortBy.direction}
							>
								Clothing Type
							</TableSortLabel>
						</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{renderClothingItems.map((row) => (
						<TableRow key={`table-row-${row.id}`}>
							<TableCell component="th" scope="row">
								<Link href={`/item/${row.id}`}>{row.name}</Link>
							</TableCell>
							<TableCell component="th" scope="row">
								{dayjs(row.purchase_date).format("DD/MM/YYYY")}
							</TableCell>
							<TableCell component="th" scope="row">
								{capitalizeFirstLetter(
									getClothingTypeNameFromId(row.clothing_type)
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ClothingTable;
