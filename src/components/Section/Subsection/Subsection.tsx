import React from "react";
import {
	Box,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from "@mui/material";

import css from "./Subsection.module.css";
import ActivityCard from "../ActivityCard/ActivityCard";

/**
 * The type "Props" describes an object with an id (number), name (string), and program (any) property.
 * @property {number} id - The `id` property is a number that is used to uniquely identify an object or
 * entity. It is often used as a key when rendering a list of items in React.
 * @property {string} name - The "name" property is a string type, which is used to store the name of
 * an object or entity. In this case, it is a property of a Props object, which may be used to store
 * the name of a certain entity or component.
 * @property {any} program - The "program" property is of type "any", which means it can be any data
 * type. It is not specified what kind of data this property should hold.
 */
type Props = {
	id: number;
	name: string;
	program: any;
};

/**
 * This is a React functional component that renders an accordion with a list of activity cards based
 * on the provided props.
 * @param  - The `Subsection` component is a functional component that takes in three props: `id`,
 * `name`, and `program`. The `id` prop is renamed to `expId` and the `name` prop is renamed to
 * `expName`. The `program` prop is an array of
 * @returns The `Subsection` component is returning an `Accordion` component from the Material-UI
 * library, which contains a `Typography` component displaying the `expName` prop passed to it. If the
 * `program` prop passed to the component is not an empty array, it also returns an `AccordionDetails`
 * component containing a mapped array of `ActivityCard` components, with each `ActivityCard`
 */
const Subsection: React.FC<Props> = ({ id: expId, name: expName, program }) => {
	const programMapped = program.map((aktivita: any) => {
		return <ActivityCard key={aktivita.items[0].id} program={aktivita.items} />;
	});

	return (
		<Box className={css.box}>
			{program.length !== 0 && (
				<Accordion expanded>
					<AccordionSummary>
						<Typography variant="h5">{expName}</Typography>
					</AccordionSummary>
					<AccordionDetails className={css.subsection}>
						{programMapped}
					</AccordionDetails>
				</Accordion>
			)}
		</Box>
	);
};

export default Subsection;

