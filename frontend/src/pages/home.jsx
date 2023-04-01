import React from 'react';
import Filter from '../components/filter';

function Home() {

  return (
    <div className='flex flex-col w-full bg-opacity-300 p-4  h-auto relative'>
      <div className='sticky top-0 '>
      <Filter />
      </div>

     </div>
  )
}

export default Home
