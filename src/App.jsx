import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { useEffect, useMemo, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";

function App() {
  const [count, setCount] = useState(0);
  const [init, setInit] = useState(true);
  const paragraphRef = useRef("");
  const keywordsRef = useRef("");

  // useEffect(() => {
  //   initParticlesEngine(async (engine) => {
  //     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
  //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //     // starting from v2 you can add only the features you need reducing the bundle size
  //     await loadAll(engine);
  //     // await loadFull(engine);
  //     // await loadSlim(engine);
  //   }).then(() => {
  //     setInit(true);
  //   });
  // }, []);

  const options = useMemo(
    () => ({
      particles: {
        number: {
          value: 10,
        },
        color: {
          value: "#ffffff",
        },
        links: {
          enable: true,
          distance: 200,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 1,
        },
        size: {
          value: {
            min: 4,
            max: 6,
          },
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    }),
    []
  );
  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };
  const handleSubmission = (e) => {
    e.preventDefault()
    
    var paragraph=paragraphRef.current?.value
    var keywords =keywordsRef.current?.value
    console.log(paragraph,keywords)
    // keywordsRef.current.value=""
    if (paragraph.length > 0 && keywords.length>0 && paragraph.trim().split(' ').length >= 100) {
      fetch("http://localhost:5000/postResults", {
        method: 'post',
        headers: {
          "Access-Control-Allow-Origin":"*",'Content-Type':'application/json',
        },
        body: JSON.stringify({
          "paragraph":paragraph,
          "keywords":keywords,
        })
       }).then((res)=>{
        console.log(res)
       });  
    }
    else{
      console.error("Please veify that the paragraph and keywords are valid.")
    }
  };
  if (init) {
    return (
      <div className="Home">
        {/* <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          /> */}
        <div className="homeSection">
          <form onSubmit={handleSubmission}>
            <input
              id="para"
              ref={paragraphRef}
              name="paragraph"
              placeholder="Enter Summary Here"
              type="text"
            />
            <input
              id="keyWords"
              ref={keywordsRef}
              name="keywords"
              placeholder="Enter Key Words"
              type="text"
            />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
  return <></>;
}

export default App;
