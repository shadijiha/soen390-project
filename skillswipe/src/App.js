import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import TopBar from "./components/TopBar";
import FooterMenu from "./components/FooterMenu";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import LoginPage from "./Pages/LoginPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render() {
    const { windowWidth } = this.state;
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarWidth: windowWidth < 1100 ? 50 : 150,
      sidebarCollapsed: windowWidth < 1100
    };



    const menuItems = styles.showSidebar
      //desktop menu items  
      ? [
        { icon: `🏠`, text: "Home", link: "/Pages/LoginPage"},
        { icon: `😀`, text: "Item 1" },
        { icon: `😉`, text: "Item 2"},
        { icon: `😎`, text: "Item 3"},
        { icon: `🤔`, text: "Item 4"},
        { icon: `😛`, text: "Item 5"},
        { icon: `😺️`, text: "Profile"},
        { icon: `⚙`, text: "Settings"}
      ]
      //mobile menu items
      : [
        { icon: `😀`, text: "Item 1", link: "/item1" },
        { icon: `😉`, text: "Item 2", link: "/item2" },
        { icon: `😎`, text: "Item 3", link: "/item3" },
        { icon: `🤔`, text: "Item 4", link: "/item4" },
        { icon: `😛`, text: "Item 5", link: "/item5" }
      ];

    return (
      <BrowserRouter>

        <div
          style={{
            backgroundColor: styles.black(0.05),
            minHeight: "100vh",
            position: "relative"
          }}
        >

          {styles.showSidebar ? (
            <Sidebar menuItems={menuItems} styles={styles} />

          ) : (
              <TopBar styles={styles} />
            )}

          <Content styles={styles} />

          {!styles.showSidebar && (
            <FooterMenu menuItems={menuItems} styles={styles} />
          )}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
