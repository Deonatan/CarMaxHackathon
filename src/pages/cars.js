import React from 'react';

const Cars = ({cars, prices, distances}) => {

	return (
		<div>
			{cars.map((item, index)=>(
				<div key={Math.random()*1000}> 
				<img src={item}></img>
				<p>Price: {Math.floor(prices[index])}</p>
				<p>Distance: {Math.floor(distances[index])} miles</p>
				</div>
			))}
		</div>
	)
}

export default Cars;