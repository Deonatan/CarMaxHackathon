import React, {useState,useEffect} from 'react';
import Cars from './pages/cars';

import './App.css';

const style = {back1:{
  width:"100%",
  height:"auto",
  }, 
  navbar:{
  overflow:"hidden",
  backgroundColor:"rgb(47, 49, 172)",
  fontFamily:"Arial",
  },
  navbar_a: {
  float: "left",
  fontSize: "16px",
  color: "white",
  textAlign: "center",
  padding: "14px 16px",
  textDecoration: "none",
},
 fil:{
  overflow: "hidden",
  backgroundColor: "rgb(240, 220, 40)",
  fontFamily:"Garamond",
},
 fil_a:{
  float: "left",
  fontSize: "30px", 
  textAlign: "center",
  padding: "14px 16px",
  textDecoration:"none", 
},
 h1:{
  textIndent: "3%",
},
 dropdown: {
  float: "left",
  overflow: "hidden",
},
 dropdown_dropbtn: {
  fontSize: "16px",
  border: "none",
  outline: "none",
  color: "white",
  padding: "14px 16px",
  backgroundColor: "inherit",
  fontFamily: "inherit",
  margin: 0, 
},
navbar_a_hover:{
  backgroundColor: "red",
},
dropdown_hover_dropbtn:{
  backgroundColor: "red",
},
dropdown_content: {
  position: "absolute",
  backgroundColor: "#f9f9f9",
  minWidth: "160px",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  zIndex: 1,
},
dropdown_content_a: {
  float: "none",
  color: "black",
  padding: "12px 16px",
  textDecoration:" none", 
  display: "block",
  textAlign: "left", 
},
dropdown_content_a_hover: {
  backgroundColor: "#ddd", 
},
dropdown_hover_dropdown_content: {
  display:" block",
},  
opt:{
  fontSize: "20px",
},
body: {
margin: 0,
padding: 0,
backgroundColor:" #f6f6f6",
},

"*":{
boxSizing: "borderBox",
},
img: {
width: "100%",
height: "auto",
},

gallery_container: {
width: "100vw",
height: "100vh",
overflow: "hidden",
position: "relative",
display: "flex",
justifyContent: "space-between",
flexWrap: "wrap",
padding: "10px",
},

gallery_item: {
width: "240px",
height: "320px",
padding: "10px",
backgroundColor:" white",
margin: "10px",
},
}

function App() {

  const [click, setClick] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [upBound, setUpBound] = useState(10000000);
  const [loBound, setLoBound] = useState(0);
  const [priceList, setPriceList] = useState([]);
  const [distanceList, setDistanceList] = useState([]);
  const numItemsToGenerate = 30;
  
	const getData = async () => { 
    const prices = [];
    const distances = [];
    for(let i=0; i<numItemsToGenerate; i++){
      prices.push(Math.random()*100000);
      distances.push(Math.random()*10000);
    }
    setPriceList(prices);
    setDistanceList(distances);
		const numImagesAvailable = 50; 
		const imageWidth = 600;  
		const imageHeight = 600;
		const collectionID = 12281608 ; 
		const temp_pictures = [];
		for(let i=0;i<numItemsToGenerate;i++){
			let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
			await fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomImageIndex}`) 
				.then( async (response) => {
          let temp = await response;
					temp_pictures.push(temp.url);
				})
			}
		setPictures(temp_pictures);
	}

	useEffect(() => {
		getData();
		}, [])

  const dropClick = e => {
    if(click === true){
      e.preventDefault();
      setClick(false)
    }
    else {
      e.preventDefault()
      setClick(true)}
  }
  const filter = async () => {
    await fetch(`http://localhost:8000/data/${upBound}/${loBound}/${priceList}/${distanceList}`, { 
      method:"get",
    }).then(async res => {
      alert(upBound+" ; "+loBound)
      let temp = await res.json();
      setPictures(temp);
      })
      .catch(err => alert("Error: "+err));
  }
  
    return (
    <div className="App"> 
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/CarMax_Logo.svg/1280px-CarMax_Logo.svg.png" style={style.back1} /> 
      <div style={style.fil}> 
          <h1 style={style.h1} style={style.fil_a}>Filters</h1> 
      </div> 
      <hr/>
      <div style={style.navbars}>
          <div style={style.dropdown} style={style.navbar}>
            <button style={style.dropdown_dropbtn} onClick={dropClick}
              >Shipping Price
              <i class="fa fa-caret-down"></i>  
            </button> 
            {click === true ? 
            <div style={style.dropdown_content}>
              {/* <input type="checkbox" id="priceRange1" name="priceRange1" value="priceRange1"/>
              <label for="priceRange1" style={style.opt}> 500-999$ </label><br/>
              <input type="checkbox" id="priceRange2" name="priceRange2" value="priceRange2"/>
              <label for="priceRange2" style={style.opt}> 1000-1499$</label><br/>
              <input type="checkbox" id="priceRange3" name="priceRange3" value="priceRange3"/>
              <label for="priceRange3" style={style.opt}> 1500-1999$</label><br/> */}
              <p>Max: </p><input onChange={e => setUpBound(e.target.value)} type="text"/>
              <p>Min: </p><input onChange={e => setLoBound(e.target.value)} type="text"/>
              <br/>
              <button 
              onClick={filter}
              >Filter</button>
            </div> 
            :
            <div></div>
            }
        </div>  
          {/* <a style={style.navbar_a} onMouseOver href="#make">Make</a>
          <a style={style.navbar_a} href="#type">Type</a> 
          <a style={style.navbar_a} href="#year">Year</a> 
          <a style={style.navbar_a} href="#Features">Features</a> 
          <a style={style.navbar_a} href="#size">Size</a> 
          <a style={style.navbar_a} href="Exterior Color">Exterior color</a>
          <a style={style.navbar_a} href="Transmission">Transmission</a> 
          <a style={style.navbar_a} href="Mileage">Mileage</a> */}
        </div> 
      <Cars cars={pictures} prices={priceList} distances={distanceList}/>  
    </div>
  );
}

export default App;
