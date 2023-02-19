/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ProfileStyle from "../../styles/profilestyle";

const Education = ({ education }: any) => {

  return (
    education &&
    <div data-testid="education">
    <>
      <style jsx>{ProfileStyle}</style>
      <div className="edu-container">
        <div className="edu-features">
          <h1
            className="edu-text"
            style={{
              fontWeight: 600,
              fontSize: "2.5rem",
            }}
          >
            <span>Education History</span>
          </h1>
          <span className="edu-text03">
            <span></span>
          </span>

          <div className="edu-container1">
            {
              education.map((element: any) => {
                return(

                  <>
            
                  <div className="edu-feature-card">
                    <img
                      src="https://k20plus.com/wp-content/uploads/2017/11/uni-icon-300x300.png"
                      className="edu-icon"
                      width="50px"
                      height="50px"
                      alt="Concordia University"
                      />
                    <h2 className="edu-text06">{element.institution}</h2>
                    <span className="edu-text07">
                      {element.degree}
                    </span>
                    <span className="edu-text08">{`${element.start_year}-${element.end ? element.end : "Present"}`}</span>
                  </div>
                </>
              )
              })
            }


          </div>
        </div>
      </div>
    </>
    </div>
  );
};
export default Education;
