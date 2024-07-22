import React from 'react'

const Hero = ({title, imageUrl }) => {
  return (
    <div className='hero container'>
     <div className="banner">
     <h1>{title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem magnam debitis ad. Iste autem, asperiores placeat et rem aut? Totam adipisci eius similique, illo debitis assumenda laudantium velit facilis iure magni sapiente accusamus tempore eum ex ullam nisi nobis voluptas. Blanditiis provident optio dolorum corrupti repellendus obcaecati esse ex nobis inventore eos labore cupiditate expedita neque reprehenderit, explicabo incidunt nostrum. Similique error aliquam, qui quas veritatis nisi fugit deleniti aperiam nobis perferendis cupiditate tempore explicabo veniam! Nesciunt odio eius consequuntur reprehenderit facere labore eum mollitia repellat. Veritatis, non totam!
      </p>
     </div>
     <div className='banner'>
      <img src={imageUrl} alt="hero" className="animated-image"/>
      <span>
        <img src="/vector.png" alt="vector" />
      </span>
     </div>
    </div>
  )
}

export default Hero