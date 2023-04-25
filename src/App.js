import React from 'react'
import { useState,useRef,useEffect } from 'react';
import axios from 'axios';
import './App.css'
function App() {
    const searchData = useRef(null);
    const [data, setData] = useState('');
    const [imageData, setImageData] = useState([]);
    const [toggle,setToggle] = useState(false);
    const [bdata,setBdata] = useState([])
    useEffect(() => {
      const params = {
        method: "flickr.photos.search",
        api_key: '9d44365a34183a940080c38f2e846234',
        text: data,
        sort: "",
        per_page: 40,
        license: '4',
        extras: "owner_name, license",
        format: "json",
        nojsoncallback: 1
      }
      const parametes = new URLSearchParams(params);
      const url = `https://api.flickr.com/services/rest/?${parametes}`
      axios.get(url)
        .then((res) => {
          console.log(res.data)
          const arr = res.data.photos.photo.map((img) => {
            return Images(img, 'q')
          });
          setImageData(arr);
        })
        .catch((e) => {
          console.log(e.message)
        })
    }, [data])
    const Images = (picture, size) => {
      let url = `https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}`
      if (size) {
        url += `_${size}`
      }
      url += '.jpg'
      return url
    }

  
    return (<>
    
    <div className='header'>
      <div className='top'>
              <div className='heading'>React Photo Search</div>
             <button className='bookmark-btn' onClick={()=>{setImageData(bdata)}}>Bookmark</button>
      </div>
  
      <input className='input-search' placeholder='Search free high resolution images' onChange={(e)=> {searchData.current = e.target.value} }/>
      <button className='search-btn' onClick={() =>{ 
        setData(searchData.current)
        setToggle(true)}}
        >Search</button>
  </div>
  {toggle &&
      <div className='content'>
        {imageData.map((img, key) => {
        
          return (
            <>
            <div className='images' >
              
              <div className='b-btn'><button className='bb-btn' onClick={()=>{setBdata([...bdata,img])}}>Bookmark</button></div>
              <img src={img} key={key} alt=""/>
            </div>
            </>
            
          )
        })}
      </div>
}
    </>
      
     ) ;
}

export default App;
