import {React, useState} from "react";
import './Preloader.css'

// Preloader — отвечает за работу прелоудера;
function Preloader() {

  const [isLoading, setIsLoading] = useState(false);

  return (<>
    <div className='container'>
      <i class="circle-preloader"></i>
    </div>
    
      <p  class="circle-preloader__text">Идет поиск новостей...</p>
  </>)
}

export default Preloader;
