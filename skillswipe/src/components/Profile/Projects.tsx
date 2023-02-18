import React from "react";
const Projects = () =>{
    return(
        <div className="personalProj-container">
              <div className="personalProj-features">
                <h1
                  className="personalProj-text"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Personal Projects
                </h1>
                <div className="personalProj-container1">
                  <div className="personalProj-feature-card">
                    <h2 className="personalProj-text1">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image"
                    />
                  </div>
                  
                </div>
              </div>
            </div>
    )
}
export default Projects;