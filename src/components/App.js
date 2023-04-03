import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";

const App = () => {
    return (
        <div>
            <Header />
            <h2 className="heading">My projects</h2>

            <Section/>
            <Section/>

            <Footer />
        </div>
    );
}

export default App;
