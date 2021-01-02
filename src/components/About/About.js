import React from 'react';
import myPhoto from '../../images/my-photo.jpg'

function About() {

    return (

        <div className='about'>
            <img className='about__photo' src={myPhoto} alt='Фотография автора' />
            <div className='about__container'>
                <h2 className='about__heading'>Об авторе</h2>
                <p className='about__description'>Это блок с описанием автора проекта. 
                    Здесь следует указать, как вас зовут, чем вы занимаетесь, какими 
                    технологиями разработки владеете.
                </p>
                <p className='about__description'>Также можно рассказать о процессе 
                    обучения в Практикуме, чему вы тут научились, и чем можете помочь 
                    потенциальным заказчикам.
                </p>
            </div>
        </div>

    );
}

export default About;