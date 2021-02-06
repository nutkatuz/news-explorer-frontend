// Main, SavedNews — компоненты главной страницы и страницы с сохранёнными карточками;
import React, { useContext } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import { NewsContext } from "../../contexts/NewsContext";

const SavedNews = ({ loggedIn, onBtnClick }) => {
  const { savedNews } = useContext(NewsContext);

  return (
      <>
          <NewsCardList pathname='/saved-news'
              loggedIn={loggedIn}
              newsToRender={savedNews}
              onBtnClick={onBtnClick}
          />
      </>
  );
};

export default SavedNews;