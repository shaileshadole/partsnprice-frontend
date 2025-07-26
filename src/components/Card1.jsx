import React from 'react';
import "./Card1.css";

const Card1 = ({  c1heading, c1Number, c1Des }) => {
  return (
    <div className='cardcontainer'>
      <h4>{c1heading}</h4>
      <hr />
      <h2>{c1Number}</h2>
      <p>{c1Des}</p>
    </div>
  )
}

export default Card1
