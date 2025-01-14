import React from 'react'
import { useEffect } from 'react'
import {useState} from 'react'

function News() {

    const [records, setData] = useState([]);

    useEffect(()=>{
        // fetch('https://jsonplaceholder.typicode.com/users')
        fetch('http://127.0.0.1:8000/api/get-news')
        .then(response => response.json())
        .then(data => setData(data.data))
        // .catch(error => console.log(error))
        .catch((error) => {
            console.error('Error fetching data:', error);
            setData([]); // Set to an empty array if an error occurs
          })
    },[])

    if (!Array.isArray(records)) {
        return <div>No data available</div>; // Handle non-array values
      }
  return (
    
    <div className="container parents">
      <h1>In the news</h1>
      <p>Discover where our product has made headlines</p>    
     
          {records.map((item) => (
            <div className="box-width">
            <a
              key={item.id} // Use a unique key from the API response
              target="_blank"
              rel="noopener noreferrer"
              href={item.link || '#'} // Use a `link` property if available in the API
               className="custom-link news-card"
            >
              <div className="card">
                <div className="card-header">
                  <img
                    className="!object-contain"
                    src={item.image || '#'}
                    alt="news"
                  />
                </div>
                <div className="card-body">
                  <h4>{item.title}</h4>
                  <p>{item.description || 'No description available'}</p>
                  <div className="user">
                    <div className="user-info">
                      <h5>{item.date || 'Unknown date'}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            </div>
          ))}

     
    </div>
    
  )
}

export default News