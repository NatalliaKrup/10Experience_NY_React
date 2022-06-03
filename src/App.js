import './App.css'
import logo from "./logo.png"
import bin from "./bin.png"
import likebtn from "./like.png"
import winkelrechts from "./winkelrechts.png"
import winkellinks from "./winkellinks.png"
import { data } from './data';
import { useState } from 'react';

function App() {

	const [sightNY, setSightNY] = useState(data)

								// showMore
	const[showMoreText, setShowMoreText] = useState(false)
	const btnMoreText =(item)=>{
		item.showMore = !item.showMore
		setShowMoreText(!showMoreText)
	}
								// remove one Item
	const removeItem =(id)=>{
	const newSightNY = sightNY.filter(item =>item.id !== id)
	setSightNY(newSightNY)
	}
								// next slide
	const [t, setT] = useState(0);
	const [datas, setDatas] = useState(data);
	let newArr = [...datas]
	
	const nextFoto =(e, index)=>{
		const slide = document.querySelectorAll("#slide");
		newArr [index]= sightNY[index];
		setDatas(newArr);

		setT ((t => {
			t++;
			if (t>3){
				t=0
			}
			return t;
		}))
		slide[index].setAttribute("src", newArr[index].image[t]);
		return slide;
	}

	const previosFoto =(e, index)=>{
		const slide = document.querySelectorAll("#slide");
		newArr [index]= sightNY[index];
		setDatas(newArr);

		setT ((t =>{
			t--;
			if (t<0){
				t=3
			}
			return t;
		}))
		slide[index].setAttribute("src", newArr[index].image[t]);
		return slide;
	}
	
									// Likes
	const [likeCount, setLikeCount] = useState([0,0,0,0,0,0,0,0,0,0])
	const updateLikes=(e, index)=>{
		const likeHolder = document.querySelectorAll("#likeHolder");
		setLikeCount ((count => {
			likeCount[index]++;
			return likeCount;
		}))
		likeHolder[index].innerHTML = (sightNY[index].like) + likeCount[index];
		return likeHolder
	}

									// reload
	const reloadPage =()=>{
		window.location.reload()
	}

	return (
		<div className="app">
			<div className='container'>
				<img className='logo' src={logo}/>
				<h1>New York </h1>
				<h2>Top {data.length} unmissable Experiences</h2>
					{ sightNY.map((element =>{
						const{id, nameSight, description, showMore, image, address,googlemap, like} = element;
						const index = sightNY.indexOf(element)
						return(
							<div className='container_flex' key={id}>
								<div className='flex_description'>
									<h3>{id}: {nameSight}</h3>
									<p> {showMore? description: description.substring(0,220) + "... "}
										<button onClick={()=>btnMoreText(element)}>{showMore? "show less": "show more"}</button>
									</p>
									<h5>Addresse: <a href={googlemap} target="_blank" rel="noreferrer"><span>{address}</span></a></h5>
								</div>

								<div className='flex_image'>
									<button onClick={(e)=>previosFoto(e, index)}>
										<img className='scroll scroll_back' src={winkellinks} alt="next"/>
									</button>

									<div className='scale'>
										<img className='scale' id='slide' src={image[0]} alt="NewYork"/>
									</div>

									<button onClick={(e)=>nextFoto(e, index)}>
										<img className='scroll scroll_next' src={winkelrechts} alt="back"/>
									</button>
								</div>

								<div className='flex_rating'>
									<div className='rating_like'>
										<p id="likeHolder" value="">{like}</p>
										<button onClick={(e)=>updateLikes(e, index)}>
											<img src={likebtn} width="20" alt="like"/>
										</button>
									</div>
									<div className='raiting_bin'>
										<button onClick={()=>removeItem(id)} >
											<img src={bin} width="20" alt="bin"/>
										</button>
									</div>
								</div>
							
							</div>
						)
					}))
				}
				<div className='container_footer'>
					<button onClick={()=>reloadPage()}>Reload Page</button>
					<p>Information was taken from the website: <a href='https://www.introducingnewyork.com/top-10'>civitatis New York</a> and <a href='https://www.attractionsofamerica.com/attractions/new-york-city-top-10-attractions.php'>attractiond of Americas</a></p>
				</div>
			</div>
		</div>
	);
}

export default App;
