import {React} from "react";
import './Preloader.css'

// Preloader — отвечает за работу прелоудера;
function Preloader() {

  // const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className='container'>
        <i className="circle-preloader"></i>
      </div>
      <p  className="circle-preloader__text">Идет поиск новостей...</p>
    </>
  )
}

export default Preloader;
