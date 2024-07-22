import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat numquam praesentium quia! Accusantium laboriosam reprehenderit consequuntur illum deleniti, provident enim at minus nam? Facere quae mollitia, pariatur aperiam voluptatibus magni, vitae corrupti vel libero commodi et. Quasi accusamus provident quia repellat numquam. Esse animi aliquid tempore voluptate maxime ab, nihil ipsa exercitationem, facilis incidunt necessitatibus saepe. Sapiente mollitia ad excepturi perspiciatis accusamus incidunt cum! Facere, amet hic!</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, laboriosam?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex vel, illo neque quos excepturi laborum, voluptatem est eos dolores nulla culpa nesciunt saepe possimus expedita, tenetur porro mollitia! Numquam, nisi!</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus quo commodi atque.</p>
        <p>Lorem ipsum dolor sit.</p>
      </div>
    </div>
  )
}

export default Biography