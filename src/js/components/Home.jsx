import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Tareas from "./Tareas";


//create your first component
const Home = () => {
	return (
		<div className="d-flex flex-column align-items-center">	
			<div className="card m-3 p-3">
				<Tareas/>
			</div>
		</div>
	);
};

export default Home;