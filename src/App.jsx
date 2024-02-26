import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

function App() {
  const [init, setInit] = useState(true);
  const paragraphRef = useRef("");
  const keywordsRef = useRef("");
  const [jsonResult,setJsonResult]=useState({})
  const handleSubmission = (e) => {
    e.preventDefault();
    var paragraph = paragraphRef.current?.value;
    var keywords = keywordsRef.current?.value;
    console.log(paragraph, keywords);
    // keywordsRef.current.value=""
    if (
      paragraph.length > 0 &&
      keywords.length > 0 &&
      paragraph.trim().split(" ").length >= 100
    ) {
      fetch("http://localhost:5000/postResults", {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paragraph: paragraph,
          keywords: keywords,
        }),
      })
        .then((res) => {
          res.json().then((w) => {
            console.log(w)
            setJsonResult(JSON.parse(w))
            setInit(false)

          })
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("Please verify that the paragraph and keywords are valid.");
      window.alert("Invalid Paragraph/Keyword");
    }
  };
  if (init) {
    return (
      <div className="Home">
        <div className="homeSection">
          <form onSubmit={handleSubmission}>
            <textarea
              id="para"
              ref={paragraphRef}
              name="paragraph"
              placeholder="Enter Summary Of Minimum 100 words Here"
              type="textArea"
            />
            <input
              id="keyWords"
              ref={keywordsRef}
              name="keywords"
              placeholder="Enter Key Words"
              type="text"
            />

            <input id="submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
  return <div className="Home">
  <div className="homeSection">
    <div className="homeContainer">
    <h1>
      <span>Grammar Score:</span> {jsonResult.result.grammar}%
    </h1>
    <h1>
      <span>Relevance Score:</span> {jsonResult.result.relevance}%
    </h1>
    <h1 id="fb">
    <span>Feedback:</span> {jsonResult.result.feedback}
    </h1>
    <button onClick={()=>{location.reload()}}>Go Back</button>
    </div>
  </div>
</div>;
}

export default App;
