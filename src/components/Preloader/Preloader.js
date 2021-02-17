import { React } from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <>
      <div className="preloader">
        <i className="preloader__circle"></i>
      </div>
      <p className="preloader__text">Идет поиск новостей...</p>
    </>
  );
}

export default Preloader;
