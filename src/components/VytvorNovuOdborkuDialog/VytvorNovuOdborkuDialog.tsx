import React, { useState } from "react";

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
} from "@mui/material";
import { NewOdborka } from "../../types/types";

import css from "./VytvorNovuOdborkuDialog.module.css";
import { useMutation, useQuery } from "@apollo/client";
import {
	GetAllCategoriesQuery,
	AddNewOdborkaMutation,
} from "../../queries.graphql";
import { ProgKatEnum } from "../../models/enums/prog-kat.enum";
import VlozitUlohyDialog from "./VlozitUlohyDialog/VlozitUlohyDialog";

const { ODBORKY } = ProgKatEnum;

interface Props {
	open: boolean;
	handleClose: () => void;
}

type Categories = {
	vekovaKat: [
		{
			id: number;
			name: string;
		}
	];
	expertskeOdborky: [
		{
			id: number;
			name: string;
		}
	];
	programKat: [
		{
			id: number;
			name: string;
		}
	];
	stupen: [
		{
			id: number;
			name: string;
		}
	];
};

const VytvorNovuOdborkuDialog: React.FC<Props> = ({ handleClose, open }) => {
	const { data, loading } = useQuery(GetAllCategoriesQuery);

	const [openUlohy, setOpenUlohy] = useState<boolean>(false);
	const handleOpenUlohy = () => setOpenUlohy(true);
	const handleCloseUlohy = () => setOpenUlohy(false);

	const [odborkaData, setOdborkaData] = useState<NewOdborka>({
		addNewOdborka: {
			program_kat: ODBORKY,
			vekova_kat: "",
			name: "",
			photo: "",
			stupen: "",
			expertske_odborky: "",
		},
	});

	const [
		addNewOdborkaMutation,
		{ data: mutationData, loading: mutationLoading },
	] = useMutation<NewOdborka>(AddNewOdborkaMutation);

	if (loading) return null;

	const { vekovaKat, expertskeOdborky, stupen }: Categories = data;

	const vekovaKatMapped = vekovaKat.map((option) => (
		<MenuItem key={option.id} value={option.id}>
			{option.name}
		</MenuItem>
	));

	const expertskeOdborkyMapped = expertskeOdborky.map((option) => (
		<MenuItem key={option.id} value={option.id}>
			{option.name}
		</MenuItem>
	));

	const stupenMapped = stupen.map((option) => (
		<MenuItem key={option.id} value={option.id}>
			{option.name}
		</MenuItem>
	));

	return (
		<Box>
			<Dialog open={open} closeAfterTransition fullWidth maxWidth="md">
				<DialogTitle>Vlož základne informácie o odborke</DialogTitle>
				<DialogContent>
					<TextField
						className={css.textFields}
						required
						label="Názov odborky"
						variant="outlined"
						color="secondary"
						fullWidth
						value={odborkaData.addNewOdborka.name}
						onChange={(e) => {
							setOdborkaData({
								addNewOdborka: {
									...odborkaData.addNewOdborka,
									name: e.target.value,
								},
							});
						}}
					/>

					<Box className={css.textFields}>
						<TextField
							required
							className={css.select}
							select
							label="Veková kategória odborky"
							variant="outlined"
							color="secondary"
							fullWidth
							value={odborkaData.addNewOdborka.vekova_kat}
							onChange={(e) => {
								setOdborkaData({
									addNewOdborka: {
										...odborkaData.addNewOdborka,
										vekova_kat: e.target.value,
									},
								});
							}}>
							{vekovaKatMapped}
						</TextField>
						<TextField
							className={css.select}
							select
							label="Stupeň odborky"
							variant="outlined"
							color="secondary"
							fullWidth
							value={odborkaData.addNewOdborka.stupen}
							onChange={(e) => {
								setOdborkaData({
									addNewOdborka: {
										...odborkaData.addNewOdborka,
										stupen: e.target.value,
									},
								});
							}}>
							<MenuItem value={0}>Nie je</MenuItem>
							{stupenMapped}
						</TextField>
						<TextField
							select
							label="Kategória expertských odboriek"
							variant="outlined"
							color="secondary"
							fullWidth
							value={odborkaData.addNewOdborka.expertske_odborky}
							onChange={(e) => {
								setOdborkaData({
									addNewOdborka: {
										...odborkaData.addNewOdborka,
										expertske_odborky: e.target.value,
									},
								});
							}}>
							<MenuItem value={0}>Nie je</MenuItem>
							{expertskeOdborkyMapped}
						</TextField>
					</Box>
					<TextField
						className={css.textFields}
						label="Obrázok odborky"
						variant="outlined"
						color="secondary"
						fullWidth
						value={odborkaData.addNewOdborka.photo}
						onChange={(e) => {
							setOdborkaData({
								addNewOdborka: {
									...odborkaData.addNewOdborka,
									photo: e.target.value,
								},
							});
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							addNewOdborkaMutation({
								variables: {
									programKat: odborkaData.addNewOdborka.program_kat,
									vekovaKat: odborkaData.addNewOdborka.vekova_kat,
									name: odborkaData.addNewOdborka.name,
									photo: odborkaData.addNewOdborka.photo,
									stupen: odborkaData.addNewOdborka.stupen,
									expertskeOdborky: odborkaData.addNewOdborka.expertske_odborky,
								},
							});
							handleOpenUlohy();
						}}
						variant="contained"
						color="primary">
						Ďalej
					</Button>
					<Button variant="contained" color="inherit" onClick={handleClose}>
						Zrušiť
					</Button>
				</DialogActions>
			</Dialog>
			{mutationData && (
				<VlozitUlohyDialog
					data={mutationData}
					open={openUlohy}
					handleClose={handleCloseUlohy}
				/>
			)}
		</Box>
	);
};

export default VytvorNovuOdborkuDialog;

