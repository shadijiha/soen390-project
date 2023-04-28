import css from 'styled-jsx/css'

const ProfileStyle = css`

/* Make it a marquee */
.marquee {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;

}

.marquee span {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 1s linear infinite;
}

/* Make it move */
@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}


.skill {
  background-color: #f5f5f5;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  display: flex;
  
  
}
  .home-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .home-testimonial {
            width: 100%;
            display: flex;
            justify-content: center;
            background-color: 232323;
          }
          .home-container1 {
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-threeunits);
            max-width: var(--dl-size-size-maxwidth);
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .home-text {
            color: var(--dl-color-gray-white);
          }
          .home-text03 {
            font-size: 0.75rem;
            max-width: 600px;
            margin-top: var(--dl-space-space-unit);
            text-align: center;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-space-space-twounits);
            grid-template-columns: 1fr 1fr 1fr;
          }
          .home-testimonial-card {
            display: flex;
            padding: var(--dl-space-space-twounits);
            max-width: var(--dl-size-size-maxwidth);
            /* background: #FFFFFF; */
            box-shadow: 0px 0px 10px 10px rgba(18, 18, 18, 0.1);
            align-items: center;
            flex-direction: column;
            outline: {useColorModeValue("1px solid #000", "1px solid #fff")};
            justify-content: space-between;
          }
          .home-icon {
            width: 2rem;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-testimonial1 {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
          }
          .home-text05 {

            text-align: center;
            margin-bottom: var(--dl-space-space-threeunits);
          }
          .home-text06 {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .home-text07 {
            color: var(--dl-color-gray-500);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-unit);
            text-transform: uppercase;
          }
          .home-image {
            width: var(--dl-size-size-medium);
            height: var(--dl-size-size-medium);
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }

          .home-icon2 {
            width: 2rem;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-testimonial2 {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
          }
          .home-text08 {

            text-align: center;
            margin-bottom: var(--dl-space-space-threeunits);
          }
          .home-text09 {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .home-text10 {
            color: var(--dl-color-gray-500);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-unit);
            text-transform: uppercase;
          }
          .home-image1 {
            width: var(--dl-size-size-medium);
            height: var(--dl-size-size-medium);
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }

          .home-icon4 {
            width: 2rem;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-testimonial3 {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
          }
          .home-text11 {

            text-align: center;
            margin-bottom: var(--dl-space-space-threeunits);
          }
          .home-text12 {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .home-text13 {
            color: var(--dl-color-gray-500);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-unit);
            text-transform: uppercase;
          }
          .home-image2 {
            width: var(--dl-size-size-medium);
            height: var(--dl-size-size-medium);
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }
          @media (max-width: 991px) {
            .home-text {
              text-align: center;
            }
            .home-text03 {
              text-align: center;
            }
            .home-container2 {
              grid-template-columns: 1fr;
            }
            .home-text07 {
              align-self: center;
            }
            .home-text10 {
              align-self: center;
            }
            .home-text13 {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            

            .home-container1 {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }

            
          }


         


          @media (max-width: 479px) {

           
            .home-container1 {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-icon {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text05 {
              margin-bottom: var(--dl-space-space-twounits);
            }
            .home-text06 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-text07 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-testimonial-card {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-icon2 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text08 {
              margin-bottom: var(--dl-space-space-twounits);
            }
            .home-text09 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-text10 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-testimonial-card {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-icon4 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text11 {
              margin-bottom: var(--dl-space-space-twounits);
            }
            .home-text12 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-text13 {
              margin-bottom: var(--dl-space-space-unit);
            }
          }
          
  .personalProj-container {
    width: 100%;
    display: flex;
    overflow: auto;
    align-items: center;
    flex-direction: column;
  }
  .personalProj-features {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-threeunits);
    max-width: var(--dl-size-size-maxwidth);
    flex-direction: column;
  }
  .personalProj-text {
    font-size: 3rem;
    margin-bottom: var(--dl-space-space-threeunits);
  }
  .personalProj-container1 {
    flex: 0 0 auto;
    width: 100%;
    display: grid;
    grid-gap: var(--dl-space-space-twounits);
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .personalProj-feature-card {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card:hover {
    transform: scale(1.02);
  }
  .personalProj-text1 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  .personalProj-feature-card1 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card1:hover {
    transform: scale(1.02);
  }
  .personalProj-text2 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image1 {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  .personalProj-feature-card2 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card2:hover {
    transform: scale(1.02);
  }
  .personalProj-text3 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image2 {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  .personalProj-feature-card3 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card3:hover {
    transform: scale(1.02);
  }
  .personalProj-text4 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image3 {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  .personalProj-feature-card4 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card4:hover {
    transform: scale(1.02);
  }
  .personalProj-text5 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image4 {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  .personalProj-feature-card5 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card5:hover {
    transform: scale(1.02);
  }
  .personalProj-text6 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image5 {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  .personalProj-feature-card6 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card6:hover {
    transform: scale(1.02);
  }
  .personalProj-text7 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image6 {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  .personalProj-feature-card7 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-unit);
    max-width: var(--dl-size-size-maxwidth);
    box-shadow: 5px 5px 10px 0px rgba(18, 18, 18, 0.1);
    transition: 0.3s;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .personalProj-feature-card7:hover {
    transform: scale(1.02);
  }
  .personalProj-text8 {
    margin-bottom: var(--dl-space-space-twounits);
  }
  .personalProj-image7 {
    width: var(--dl-size-size-medium);
    height: var(--dl-size-size-medium);
    object-fit: cover;
    border-radius: var(--dl-radius-radius-radius4);
  }
  @media (max-width: 991px) {
    .personalProj-text {
      align-self: center;
    }
    .personalProj-container1 {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 767px) {
    .personalProj-features {
      padding-left: var(--dl-space-space-twounits);
      padding-right: var(--dl-space-space-twounits);
    }
  }
  @media (max-width: 479px) {
    .personalProj-features {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: var(--dl-space-space-unit);
      padding-bottom: var(--dl-space-space-twounits);
    }
    .personalProj-container1 {
      grid-gap: var(--dl-space-space-halfunit);
    }
  }

  .edu-container {
    width: 100%;
    display: flex;
    overflow: auto;
    align-items: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .edu-features {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-threeunits);
    max-width: var(--dl-size-size-maxwidth);
    align-items: center;
    flex-direction: column;

  }
  .edu-text {
    font-size: 3rem;
    margin-bottom: var(--dl-space-space-twounits);
  }
  .edu-text03 {

    width: 70%;
    font-size: 1.15rem;
    text-align: center;
    margin-bottom: -2em;
  }
  .edu-container1 {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: var(--dl-space-space-fourunits);
  }
  .edu-feature-card {
    display: flex;
    padding: var(--dl-space-space-twounits);
    align-items: center;
    flex-direction: column;
  }
  .edu-icon {
    fill: var(--dl-color-gray-500);
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
  }
  .edu-text06 {
    font-style: normal;
    margin-top: var(--dl-space-space-unit);
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .edu-text07 {
    color: var(--dl-color-gray-700);
    text-align: center;
  }
  .edu-text08 {
    font-size: 0.75rem;
    margin-top: var(--dl-space-space-unit);
    font-weight: 500;
  }
  .edu-feature-card1 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-twounits);
    align-items: center;
    flex-direction: column;
  }
  .edu-icon2 {
    fill: var(--dl-color-gray-500);
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
  }
  .edu-text09 {
    font-style: normal;
    margin-top: var(--dl-space-space-unit);
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .edu-text10 {
    color: var(--dl-color-gray-700);
    text-align: center;
  }
  .edu-text11 {
    font-size: 0.75rem;
    margin-top: var(--dl-space-space-unit);
    font-weight: 500;
  }
  .edu-feature-card2 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-twounits);
    align-items: center;
    flex-direction: column;
  }
  .edu-icon4 {
    fill: var(--dl-color-gray-500);
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
  }
  .edu-text12 {
    font-style: normal;
    margin-top: var(--dl-space-space-unit);
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .edu-text13 {
    color: var(--dl-color-gray-700);
    text-align: center;
  }
  .edu-text14 {
    font-size: 0.75rem;
    margin-top: var(--dl-space-space-unit);
    font-weight: 500;
  }
  .edu-feature-card3 {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-twounits);
    align-items: center;
    flex-direction: column;
  }
  .edu-icon6 {
    fill: var(--dl-color-gray-500);
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
  }
  .edu-text15 {
    font-style: normal;
    margin-top: var(--dl-space-space-unit);
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .edu-text16 {
    color: var(--dl-color-gray-700);
    text-align: center;
  }
  .edu-text17 {
    font-size: 0.75rem;
    margin-top: var(--dl-space-space-unit);
    font-weight: 500;
  }
  @media (max-width: 991px) {
    .edu-text {
      text-align: center;
    }
    .edu-text03 {
      text-align: center;
    }
    .edu-container1 {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 767px) {
    .edu-features {
      padding-left: var(--dl-space-space-twounits);
      padding-right: var(--dl-space-space-twounits);
    }
    .edu-text {
      text-align: center;
    }
  }
  @media (max-width: 479px) {
    .edu-features {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: var(--dl-space-space-unit);
      padding-bottom: var(--dl-space-space-twounits);
    }
    .edu-container1 {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 768px) {
    .profile-container02 {
      flex-direction: column;
      align-items: center;
      height: auto;
      padding: 1em; /* add padding to create space between elements */
      box-sizing: border-box; /* to include padding in the width calculation */
    }

  
  
  
  }

  

  .profile-container {
    width: 100%;
    display: flex;
    overflow: auto;
    min-height: 100vh;
    align-items: center;
    flex-direction: column;
    /* added the following properties to make it below the navbar and have some space between them */
    margin-top: var(--dl-space-space-twounits); /* adjust this value as per your preference */
    position: relative; /* to make it respect the navbar's position */
    
  }
  .profile-top-card {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-twounits);
    align-items: stretch;
    flex-direction: row;
    justify-content: space-between;
    /* added the following property to make it responsive */
    flex-wrap: wrap; /* to allow the flex items to wrap if they don't fit in one line */
    
    margin-left: var(--dl-space-space-twounits: 20px); /* adjust the value as per your preference */
    margin-right: var(--dl-space-space-twounits: 20px);
  }

  .profile-image {
    width: auto;
    height: 20em;
    align-self: center;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 0px;
    
  }
  .profile-container01 {
    box-shadow: 4px 4px 10px 0px rgba(18, 18, 18, 0.3);
    flex: 1;
    width: auto;
    height: 50vh;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-size: cover;
    /* added the following properties to make it have an outline and a curved border */
    outline: 2px solid white; /* adjust the color and width as per your preference */
    border-radius: 20px; /* adjust the value as per your preference */
  }
  .profile-container02 {
    width: 100%; 
    display: flex;
    flex-direction: row; 
    align-items: center;
    justify-content: space-between;
    position: relative; 
    top: 50%;
    height: 50%;
    background-color: rgba(0,0,0,0.5); /* to make it semi-transparent with black color */
    box-sizing:border-box; /* to include padding in the width calculation */
    padding-left: var(–dl-space-space-twounits); 
    padding-right: var(–dl-space-space-twounits);
    border-bottom-left-radius: 20px; /* adjust the value as per your preference */
    border-bottom-right-radius: 20px; /* adjust the value as per your preference */
    overflow

}
  .profile-text {
    font-weight: 600;
    text-transform: uppercase;
   
  }
  .profile-text01 {
    font-size: 1.25rem;
    

  }
  .profile-text02 {
    font-size: 1.25rem;
    margin-bottom: 0px;
  }
  .profile-text03 {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }
  .profile-container03 {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

  }
  .profile-container04 {
    display: flex;
    align-self: stretch;
    align-items: flex-start;
    flex-direction: column;
    
   
  }

  .profile-container24 {
    display: flex;
    align-self: stretch;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
  }
  .profile-text06 
  {
    font-style: normal;
    font-weight: 300;
    font-size: 0.5 rem;
    white-space: nowrap;
    
  }
  .profile-container05 {
    width: auto;
    display: flex;
    align-self: stretch;
    align-items: center;
    flex-direction: row;
    justify-content: space-between; 
    padding-right: var(--dl-space-space-twounits)
    
    
  }
  .profile-button {
    border-radius: 60px;
    background-color: transparent;
    margin: 0 5px;
  }
  .profile-button1 {
    border-radius: 60px;
    background-color: transparent;
  }
  .profile-steps {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-threeunits);
    max-width: var(--dl-size-size-maxwidth);
    align-self: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
  }
  .profile-text10 {
    font-size: 3rem;
  }
  .profile-text11 {
    color: var(--dl-color-gray-700);
    font-size: 1.15rem;
    max-width: 600px;
    margin-top: var(--dl-space-space-unit);
    text-align: center;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-container06 {
    flex: 0 0 auto;
    width: auto;
    display: flex;
    align-items: flex-start;
    align-content: initial;
    flex-direction: row;
  }
  .profile-step {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .profile-container07 {
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: 2px;
    padding-right: 2px;
    flex-direction: row;
    justify-content: center;
  }
  .profile-line {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: transparent;
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container08 {
    flex: 0 0 auto;
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
    display: flex;
    align-items: center;
    border-radius: var(--dl-radius-radius-round);
    flex-direction: row;
    justify-content: center;
    background-color: #f5f5f5ff;
  }
  .profile-icon {
    fill: var(--dl-color-gray-500);
    width: 24px;
    height: 24px;
  }
  .profile-line1 {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: var(--dl-color-gray-900);
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container09 {
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
    flex-direction: column;
    padding-bottom: var(--dl-space-space-unit);
  }
  .profile-text14 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-heading {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-text17 {
    color: var(--dl-color-gray-500);
    font-size: 0.75rem;
    text-align: center;
  }
  .profile-step1 {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .profile-container10 {
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: 2px;
    padding-right: 2px;
    flex-direction: row;
    justify-content: center;
  }
  .profile-line2 {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: var(--dl-color-gray-900);
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container11 {
    flex: 0 0 auto;
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
    display: flex;
    align-items: center;
    border-radius: var(--dl-radius-radius-round);
    flex-direction: row;
    justify-content: center;
    background-color: #f5f5f5ff;
  }
  .profile-icon2 {
    fill: var(--dl-color-gray-500);
    width: 24px;
    height: 24px;
  }
  .profile-line3 {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: var(--dl-color-gray-900);
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container12 {
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
    flex-direction: column;
    padding-bottom: var(--dl-space-space-unit);
  }
  .profile-text20 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-heading1 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-text23 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-text24 {
    color: var(--dl-color-gray-500);
    font-size: 0.75rem;
    text-align: center;
  }
  .profile-step2 {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .profile-container13 {
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: 2px;
    padding-right: 2px;
    flex-direction: row;
    justify-content: center;
  }
  .profile-line4 {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: var(--dl-color-gray-900);
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container14 {
    flex: 0 0 auto;
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
    display: flex;
    align-items: center;
    border-radius: var(--dl-radius-radius-round);
    flex-direction: row;
    justify-content: center;
    background-color: #f5f5f5ff;
  }
  .profile-icon4 {
    fill: var(--dl-color-gray-500);
    width: 24px;
    height: 24px;
  }
  .profile-line5 {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: var(--dl-color-gray-900);
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container15 {
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
    flex-direction: column;
    padding-bottom: var(--dl-space-space-unit);
  }
  .profile-text27 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-heading2 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-text30 {
    color: var(--dl-color-gray-500);
    font-size: 0.75rem;
    text-align: center;
  }
  .profile-step3 {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .profile-container16 {
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: 2px;
    padding-right: 2px;
    flex-direction: row;
    justify-content: center;
  }
  .profile-line6 {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: var(--dl-color-gray-900);
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container17 {
    flex: 0 0 auto;
    width: var(--dl-size-size-small);
    height: var(--dl-size-size-small);
    display: flex;
    align-items: center;
    border-radius: var(--dl-radius-radius-round);
    flex-direction: row;
    justify-content: center;
    background-color: #f5f5f5ff;
  }
  .profile-icon7 {
    fill: var(--dl-color-gray-500);
    width: 24px;
    height: 24px;
  }
  .profile-line7 {
    flex: 1;
    height: 0px;
    display: flex;
    align-items: flex-start;
    border-color: transparent;
    border-style: dashed;
    border-width: 2px;
    flex-direction: row;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
  }
  .profile-container18 {
    display: flex;
    align-items: center;
    padding-top: var(--dl-space-space-unit);
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
    flex-direction: column;
    padding-bottom: var(--dl-space-space-unit);
  }
  .profile-text33 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-heading3 {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: var(--dl-space-space-unit);
  }
  .profile-text36 {
    color: var(--dl-color-gray-500);
    font-size: 0.75rem;
    text-align: center;
  }
  .profile-personal-projects {
    width: 100%;
    display: flex;
    padding: var(--dl-space-space-threeunits);
    max-width: var(--dl-size-size-maxwidth);
    flex-direction: column;
  }
  .profile-text39 {
    font-size: 3rem;
    margin-bottom: var(--dl-space-space-twounits);
  }
  .profile-separator {
    width: 100px;
    height: 2px;
    background-color: var(--dl-color-gray-500);
  }
  .profile-container19 {
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    margin-top: var(--dl-space-space-twounits);
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  .profile-container20 {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .profile-image1 {
    width: 450px;
    height: 450px;
    object-fit: cover;
    flex-shrink: 0;
    margin-left: var(--dl-space-space-fourunits);
    border-radius: var(--dl-radius-radius-round);
    object-position: left;
  }

  @media (max-width: 2560px) {
    .profile-image03 {
      padding-left: var(--dl-space-space-twounits);
      padding-bottom: var(--dl-space-space-sixunits);
    }
     
    .profile-button {
      font-size: xx-large;
    }

    .profile-text02 {
      font-size: 2.5em;
    }

    .profile-text04 {
      font-size: 2em;
    }


    .profile-text03 {
      font-size: 2em;
    }

    .profile-text06 {
      font-size: 2em;
    }
     
    
  }



  @media (max-width: 1600px) {
    .profile-top-card {
      
    }
    .profile-image03 {
      width: auto;
      padding-left: var(--dl-space-space-twounits);
      padding-bottom: var(--dl-space-space-oneunits);
    }
    
  
    .profile-text02 {
      font-size: 1em;
      margin-bottom: var(--dl-space-space-halfunit);
    }
    .profile-container04 {
      width: 174px;
      height: 60px;
      margin-right: 0px;
    }

    .profile-text02{
      font-size: 1.2em;                
    }

    .profile-text03 {
      font-size: 1em;
    }

    .profile-text06 {
      font-size: 1em;
    }
   
    .profile-container05 {
      width: 400px;
      height: 60px;
      margin-right: 220px;
    }
    .profile-button {
      border-radius: 60px;
      background-color: transparent;
      font-size: large;
      
    }
    .profile-text04 {
      font-size: 1em;
    }
   
    .profile-button1 {
      border-radius: 60px;
      background-color: transparent;
    }
    .profile-text10 {
      font-size: 3rem;
    }
    .profile-text11 {
      color: var(--dl-color-gray-700);
      font-size: 1.15rem;
    }
    .profile-container09 {
      width: 274px;
      height: 130px;
    }
    .profile-text14 {
      font-size: 1.5rem;
      margin-bottom: var(--dl-space-space-halfunit);
    }
    .profile-heading {
      font-size: 1rem;
    }
    .profile-text17 {
      color: var(--dl-color-gray-500);
    }
    .profile-text20 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: var(--dl-space-space-halfunit);
    }
    .profile-heading1 {
      font-size: 1rem;
      font-weight: 500;
    }
    .profile-text23 {
      font-size: 1.5rem;
    }
    .profile-text24 {
      color: var(--dl-color-gray-500);
    }
    .profile-text27 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: var(--dl-space-space-halfunit);
    }
    .profile-heading2 {
      font-size: 1rem;
      font-weight: 500;
    }
    .profile-text30 {
      color: var(--dl-color-gray-500);
      font-size: 0.75rem;
    }
    .profile-text33 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: var(--dl-space-space-halfunit);
    }
    .profile-heading3 {
      font-size: 1rem;
      font-weight: 500;
    }
    .profile-text36 {
      color: var(--dl-color-gray-500);
    }
    .profile-text39 {
      font-size: 3rem;
    }
  }

  

  @media (max-width: 991px) {
    .profile-top-card {
      height: 300px;
      flex-direction: row;
      justify-content: space-between;
      align-self: stretch;
      align-items: center;
    }
    .profile-image {
      width: 299px;
      height: inherit;
    }
    .profile-image03 {
      padding-bottom: var(--dl-space-space-oneunits);
    }

    .profile-text03 {
      font-size: 1em;
    }

    .profile-text06 {
      font-size: 1em;

    }
    .profile-text04{
      font-size: 1em;
    }
    .profile-text02 {
      font-size: 1.5em;
    }
    .profile-container01 {
      flex: 1;
      height: 100%;
      align-self: stretch;
      background-position: center;
    }
    .profile-text {
      color: var(--dl-color-gray-500);
    }
    .profile-text01 {
      margin-bottom: var(--dl-space-space-halfunit);
    }
    .profile-text02 {

      font-size: medium;

    }
    
    .profile-container04 {
      width: 191px;
      margin-right: var(--dl-space-space-halfunit);
      justify-content: space-between;
    }
    .profile-text06 {
      font-style: normal;
      font-weight: 300;
      margin-right: var(--dl-space-space-oneunits);
      font-size: 0.8rem;
      white-space: nowrap;
    }
    
    .profile-container05 {
      width: auto;
      margin-right: 0px;
      justify-content: space-between;
      align-self:stretch;
    }

    .profile-container03 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-items: center;
     

    }
    .profile-button {
      border-radius: 60px;
      background-color: transparent;
      
    }
    .profile-button1 {
      border-radius: 60px;
      background-color: transparent;
    }
    .profile-text10 {
      text-align: center;
    }
    .profile-text11 {
      text-align: center;
    }
    .profile-personal-projects {
      align-items: center;
    }
    .profile-container19 {
      flex-direction: column;
    }
    .profile-image1 {
      width: 300px;
      height: 300px;
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
    }
  }
  @media (max-width: 767px) {

    .profile-top-card {
      flex-direction: column;
      height: 100%;
    }
   
    .profile-container01 {
      width: 100%;
      height: 40vh;
    }
    .profile-container02 {
      width: 100%;
      
    }

    .profile-container05 {
      width: 40%;
      
    }

    .profile-container03 {
      width: 100%;
      margin-right: 0px;
      justify-content: space-between;
      align-items: center;
      

    }
    .profile-container04 {
      padding-right: 0px;
    }
    .profile-button {
      border-radius: 60px;
      background-color: transparent;
      font-size: 0.8em;

    }
    .profile-button1 {
      border-radius: 60px;
      background-color: transparent;
    }
    .profile-steps {
      padding-left: var(--dl-space-space-twounits);
      padding-right: var(--dl-space-space-twounits);
    }
    .profile-container06 {
      align-items: flex-start;
      padding-left: var(--dl-space-space-fiveunits);
      flex-direction: column;
    }
    .profile-step {
      width: 100%;
      height: auto;
      flex-direction: row;
      justify-content: center;
    }
    .profile-container07 {
      width: var(--dl-size-size-small);
      height: auto;
      align-self: stretch;
      padding-top: 0px;
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      padding-bottom: 2px;
      justify-content: space-between;
    }
    .profile-line1 {
      border-color: var(--dl-color-gray-900);
      border-style: dashed;
      border-top-width: 0px;
      border-left-width: 2px;
    }
    .profile-container09 {
      width: 100%;
      align-items: flex-start;

      flex-direction: column;
      padding-bottom: var(--dl-space-space-twounits);
      justify-content: space-between;
    }
    .profile-text14 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
    }
    .profile-heading {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-text17 {
      text-align: left;
    }
    .profile-step1 {
      width: 100%;
      height: auto;
      flex-direction: row;
      justify-content: center;
    }
    .profile-container10 {
      width: var(--dl-size-size-small);
      height: auto;
      align-self: stretch;
      padding-top: 0px;
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      padding-bottom: 2px;
      justify-content: space-between;
    }
    .profile-line2 {
      border-top-width: 0px;
      border-left-width: 2px;
    }
    .profile-line3 {
      border-color: var(--dl-color-gray-900);
      border-style: dashed;
      border-top-width: 0px;
      border-left-width: 2px;
    }
    .profile-container12 {
      width: 100%;
      align-items: flex-start;
      padding-top: var(--dl-space-space-twounits);
      flex-direction: column;
      padding-bottom: var(--dl-space-space-twounits);
      justify-content: space-between;
    }
    .profile-text20 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-heading1 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-text23 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-text24 {
      text-align: left;
    }
    .profile-step2 {
      width: 100%;
      height: auto;
      flex-direction: row;
      justify-content: center;
    }
    .profile-container13 {
      width: var(--dl-size-size-small);
      height: auto;
      align-self: stretch;
      padding-top: 0px;
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      padding-bottom: 2px;
      justify-content: space-between;
    }
    .profile-line4 {
      border-top-width: 0px;
      border-left-width: 2px;
    }
    .profile-line5 {
      border-color: var(--dl-color-gray-900);
      border-style: dashed;
      border-top-width: 0px;
      border-left-width: 2px;
    }
    .profile-container15 {
      width: 100%;
      align-items: flex-start;
      padding-top: var(--dl-space-space-twounits);
      flex-direction: column;
      padding-bottom: var(--dl-space-space-twounits);
      justify-content: space-between;
    }
    .profile-text27 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-heading2 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-text30 {
      text-align: left;
    }
    .profile-step3 {
      width: 100%;
      height: auto;
      flex-direction: row;
      justify-content: center;
    }
    .profile-container16 {
      width: var(--dl-size-size-small);
      height: auto;
      align-self: stretch;
      padding-top: 0px;
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      padding-bottom: 2px;
      justify-content: space-between;
    }
    .profile-line6 {
      border-top-width: 0px;
      border-left-width: 2px;
    }
    .profile-line7 {
      border-color: transparent;
      border-style: dashed;
      border-top-width: 0px;
      border-left-width: 2px;
    }
    .profile-container18 {
      width: 100%;
      align-items: flex-start;
      padding-top: var(--dl-space-space-twounits);
      flex-direction: column;
      padding-bottom: var(--dl-space-space-twounits);
      justify-content: space-between;
    }
    .profile-text33 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-heading3 {
      margin-top: var(--dl-space-space-twounits);
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: var(--dl-space-space-unit);
    }
    .profile-text36 {
      text-align: left;
    }
    .profile-personal-projects {
      padding-left: var(--dl-space-space-twounits);
      padding-right: var(--dl-space-space-twounits);
    }
    .profile-text39 {
      text-align: center;
    }
    .profile-container19 {
      flex-direction: column;
    }
  }
  @media (max-width: 697px) {
    .profile-top-card {
      width: 100%;
      height: 700px;
      position: relative;
    }


    
    .profile-image03 {
      top: 30px;
      left: -20px;
      position:relative;
    }

    .profile-text04 {
      font-size: 0.8em;
    }
   


    .profile-container01 { 
      width: 100%;
    }
    .profile-text02 {
      margin-bottom: var(--dl-space-space-halfunit);
      font-size: 1.2em;
    }
    .profile-container03 {
      width: auto;
      height: auto;
      margin-bottom: var(--dl-space-space-twounits);
      
    }
    .profile-text06 {
      font-size: 0.8em;
    }

    .profile-text03 {
      font-size: 0.8em;
    }
    .profile-container02 {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50%;
      padding: var(--dl-space-space-fourunits);
      box-sizing: border-box; /* to include padding in the width calculation */
    }
  
    .profile-container04 {
      width: 200px;
      height: 92px;
      margin-right: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }
    .profile-container05 {
      width: 100%;
      height: 100%;
      padding-bottom: var(--dl-space-space-threeunits);
    }
    .profile-button {
      border-radius: 60px;
      background-color: transparent;
      fontWeight: 600;
      width: 100%;
     font-size: 1em;
    }
    .profile-button1 {
      border-radius: 60px;
      background-color: transparent;
    }
    .profile-steps {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: var(--dl-space-space-unit);
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-container06 {
      padding-left: 0px;
    }
    .profile-container09 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text14 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-container12 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text20 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading1 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-text23 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-container15 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text27 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading2 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-container18 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text33 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading3 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-personal-projects {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: var(--dl-space-space-unit);
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-container20 {
      grid-template-columns: 1fr;
    }
    .profile-image1 {
      width: 250px;
      height: 250px;
    }
    
  
  }
  
  @media (max-width: 479px) {
    .profile-top-card {
      width: 100%;
      height: 700px;
      position: relative;
    }
    
    .profile-image03 {
      top:-%;
      left: -20px;
      position:relative;
    }

    
    .profile-container01 {
      width: 100%;
    }
    .profile-text02 {
      margin-bottom: var(--dl-space-space-halfunit);
      font-size: medium;
    }
    .profile-container03 {
      width: auto;
      height: auto;
      margin-bottom: var(--dl-space-space-twounits);
      
    }

    .profile-text04 {
      font-size: 0.6em;
    }
    .profile-text02 {
      font-size: 0.8em;
    }
    .profile-text06 {
      font-size: 0.6em;
    }

    .profile-text03 {
      font-size: 0.6em;
    }
    .profile-container02 {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50%;
      
      box-sizing: border-box; 
      padding: var(--dl-space-space-twounits);
    }
  
    .profile-container04 {
      width: 200px;
      height: 92px;
      margin-right: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }
    .profile-container05 {
      width: 100%;
      height: 100%;
      padding-bottom: var(--dl-space-space-threeunits);
    }
    .profile-button {
      border-radius: 60px;
      background-color: transparent;
      fontWeight: 600;
      width: "100%";
     font-size: 0.6em;
    }
    .profile-button1 {
      border-radius: 60px;
      background-color: transparent;
    }
    .profile-steps {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: var(--dl-space-space-unit);
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-container06 {
      padding-left: 0px;
    }
    .profile-container09 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text14 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-container12 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text20 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading1 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-text23 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-container15 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text27 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading2 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-container18 {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: 0px;
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-text33 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-heading3 {
      margin-left: 0px;
      margin-right: var(--dl-space-space-twounits);
    }
    .profile-personal-projects {
      padding-top: var(--dl-space-space-twounits);
      padding-left: var(--dl-space-space-unit);
      padding-right: var(--dl-space-space-unit);
      padding-bottom: var(--dl-space-space-twounits);
    }
    .profile-container20 {
      grid-template-columns: 1fr;
    }
    .profile-image1 {
      width: 250px;
      height: 250px;
    }
    
  
`

export default ProfileStyle
