import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import css from "./Switcher.module.css";
import Odborky from "./../../containers/Odborky/Odborky";

const Switcher: React.FC = (props) => {
	return (
		<>
			<Switch>
				<Route path="/odborky" component={Odborky} />
				<Route path="/moje-aktivity" />
			</Switch>
			<Redirect to="/odborky" />
		</>
	);
};

export default Switcher;

