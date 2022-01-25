import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import styled from "styled-components";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getClothingTypeNameFromId } from "../helpers/utils";
import { ClothingItemType } from "../helpers/types";

const TableHeaderCell = styled(TableCell)`
	font-weight: bold;
`;

interface ClothingTableProps {
	clothingItems: ClothingItemType[];
}

const ClothingTable = ({ clothingItems }: ClothingTableProps) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="clothing items table">
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Purchase Date</TableHeaderCell>
						<TableHeaderCell>Clothing Type</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{clothingItems.map((row) => (
						<TableRow key={row.id}>
							<TableCell component="th" scope="row">
								<Link href={`/item/${row.id}`}>{row.name}</Link>
							</TableCell>
							<TableCell component="th" scope="row">
								{dayjs(row.purchase_date).format("DD/MM/YYYY")}
							</TableCell>
							<TableCell component="th" scope="row">
								{getClothingTypeNameFromId(row.clothing_type)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

ClothingTable.propTypes = {
	clothingItems: PropTypes.array.isRequired,
};

export default ClothingTable;
