import logo from './logocc.PNG';
import logocc1 from './logocc1.PNG';
import clone1 from './clone1.PNG';
import profilePic from './profilePic.png';
import AceEditor, { diff } from "react-ace";
import './App.css';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-one_dark";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from 'react';
import logocc from './mylogocc.PNG';
import { Dropdown } from 'bootstrap';
import { useCookies } from 'react-cookie';
function App() {
  const [cookie, setCookie] = useCookies(['user']);
  const [lang, setLang] = useState('python');
  const [theme, setTheme] = useState('monokai');
  const changeLang = (e) => {
    setLang(e.target.value);
    switch (e.target.value) {
      case 'c_cpp':
        setLangId(54)
        break;
      case 'python':
        setLangId(71)
        break;
      case 'java':
        setLangId(62)
        break;
      case 'javascript':
        setLangId(63)
        break;   
      default:
        break;
    }
    console.log(`language = ${lang}`,`lang id = ${langId}`)
  }
  const changeTheme = (e) => {
    setTheme(e.target.value)
    console.log(`theme = ${theme}`)
  }
  const inpRef = useRef();
  const opRef = useRef();
  const codeRef = useRef();
  const [langId,setLangId]=useState(54);
  const [isIDE, setIsIDE] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState();
  const [isProfile, setIsProfile] = useState(false);
  const [password, setPassword] = useState();
  const fullname = useRef();
  const country = useRef();
  const state = useRef();
  const city = useRef();
  const profession = useRef();
  const institute = useRef();
  const problemcode = useRef();
  const description = useRef();
  const constraints = useRef();
  const sampleinput = useRef();
  const sampleoutput = useRef();
  const input = useRef();
  const output = useRef();
  const difficulty = useRef();
  const [isHome, setIsHome] = useState(true);
  const [isSetProblem, setIsSetProblem] = useState(false);
  let [profileData, setProfileData] = useState();
  const [isSeeProblem, setIsSeeProblem] = useState(false);
  const [currProblem, setCurrProblem] = useState();
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [isEasy, setIsEasy] = useState(false);
  const [isMedium, setIsMedium] = useState(true);
  const [isHard, setIsHard] = useState(false);
  const [mode, setMode] = useState('ide');
  const [correctAns, setCorrectAns] = useState(false);
  const [wrongAns, setWrongAns] = useState(false);
  const switchToIDE = () => {
    if (isHome === true) setIsHome(false);
    else if (isSetProblem === true) setIsSetProblem(false);
    else if (isProfile === true) setIsProfile(false);
    else if (isSeeProblem === true) setIsSeeProblem(false);
    setIsIDE(true);
    setMode('ide');
  }
  const switchToHome = () => {
    if (isIDE === true) setIsIDE(false);
    else if (isSetProblem === true) setIsSetProblem(false);
    else if (isSeeProblem === true) setIsSeeProblem(false);
    else if (isProfile === true) setIsProfile(false);
    setIsHome(true);
  }
  const switchToProfile = () => {
    if (isIDE === true) setIsIDE(false);
    else if (isSeeProblem === true) setIsSeeProblem(false);
    else if (isSetProblem === true) setIsSetProblem(false);
    else if (isHome === true) setIsHome(false);
    fetchProfile();


  }
  const switchToCreateProblem = () => {
    if (isHome === true) setIsHome(false);
    else if (isIDE === true) setIsIDE(false);
    else if (isSeeProblem === true) setIsSeeProblem(false);
    else if (isProfile === true) setIsProfile(false);
    setIsSetProblem(true);
  }
  const switchToSeeProblem = (problemStuff) => {
    if (isHome === true) setIsHome(false);
    else if (isIDE === true) setIsIDE(false);
    else if (isSetProblem === true) { setIsSetProblem(false); }
    else if (isProfile === true) setIsProfile(false);
    console.log("problemStuff : ", problemStuff);
    setCurrProblem(problemStuff);
    setIsSeeProblem(true);
    setMode('problem');
  }
  const madeEasy = () => {
    setIsMedium(false);
    setIsHard(false);
    setIsEasy(true);
    switchToHome(true);
  }
  const madeMedium = () => {
    setIsEasy(false);
    setIsHard(false);
    setIsMedium(true);
    switchToHome(true);
  }
  const madeHard = () => {
    setIsEasy(false);
    setIsMedium(false);
    setIsHard(true);
    switchToHome(true);
  }
  const changeUsername = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  }
  const changePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  }
  const fetchProblems = () => {
    // alert('fetch problems was called');
    const url = "http://localhost:2498/giveProblems";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    }
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (res == "no") {
          alert("please reload dthe page");
          return;
        }
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].difficulty == 'easy') easy.push(res[i]);
          else if (res[i].difficulty == 'medium') medium.push(res[i]);
          else hard.push(res[i]);
          if (i >= res.length - 1) {
            madeEasy();
          }
        }
        console.log(easy);
        console.log(medium);
        console.log(hard);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const fetchOutput = () => {
    console.log(codeRef.current.editor.getValue());

    const url = "http://localhost:2498/run";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "code": codeRef.current.editor.getValue(), "lang": lang, "inp": inpRef.current.value, "op": opRef.current.value })
    }
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (lang === 'java') {
          opRef.current.value = (res.stdout ? res.stdout : res.stderr);
        }
        else {
          opRef.current.value = res;
        }
        window.scrollTo({
          top: document.documentElement.scrollHeight, 
          behavior: 'smooth'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  const submitCode = () => {
    console.log(codeRef.current.editor.getValue());
    const myInput = currProblem.input;
    const url = "http://localhost:2498/run";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "code": codeRef.current.editor.getValue(), "lang": lang, "inp": myInput, "op": opRef.current.value })
    }
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (lang === 'java') {
          if (res.stdout) {
            if (res.stdout === currProblem.output) {
              //write answer
              window.scrollTo(0, 0);
              setWrongAns(false);
              setCorrectAns(true);
              // alert("write answer");
            } else {
              //wrong answer
              setCorrectAns(false);
              setWrongAns(true);
              window.scrollTo(0, 0);
              // alert("wrong answer");
            }
          } else {
            //wrong answer
            setCorrectAns(false);
            setWrongAns(true);
            window.scrollTo(0, 0);
            // alert("wrong answer");
          }
          // opRef.current.value = (res.stdout ? res.stdout : res.stderr);
        }
        else {
          // alert("cpp?");
          console.log(`"${res.trim()}"\n"${currProblem.output.trim()}"`);
          res = res.trim();
          currProblem.output = currProblem.output.trim();
          let i = 0;
          let j = 0;
          let flag = true;
          for (; i < res.length && j < currProblem.output.length;) {
            if (res[i] == '\r') { i++; continue; }
            if (res[i] == '\n') { i++; continue; }
            if (currProblem.output[j] == '\r') { j++; continue; }
            if (currProblem.output[j] == '\n') { j++; continue; }
            if (res[i] !== currProblem.output[j]) {
              flag = false;
              setCorrectAns(false);
              setWrongAns(true);
              window.scrollTo(0, 0);
              // alert('wrong answer');
              return;
            }
            console.log(res[i], currProblem.output[j]);
            i++;
            j++;
          }
          let sig = 0
          while (i < res.length) {
            if (res[i] == '\r') { i++; continue; }
            if (res[i] == '\n') { i++; continue; }
            sig++;
          }
          while (i < currProblem.output.length) {
            if (currProblem.output[j] == '\r') { j++; continue; }
            if (currProblem.output[j] == '\n') { j++; continue; }
            sig++;
          }
          console.log(sig);
          if (sig === 0) {
            //write answer
            setWrongAns(false);
            setCorrectAns(true);
            window.scrollTo(0, 0);
            console.log("res : ", res.trim());
            console.log("expected : ", currProblem.output.trim());
            // alert("write answer");
          } else {
            setCorrectAns(false);
            setWrongAns(true);
            window.scrollTo(0, 0);
            // alert("wrong answer");
            //wrong answer
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const submitSignIn = (e) => {
    e.preventDefault();
    const url = "http://localhost:2498/signin";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "username": username, "password": password, "fullname": fullname.current.value, "country": country.current.value, "state": state.current.value, "city": city.current.value, "profession": profession.current.value, "institute": institute.current.value })
    }
    console.log(options.body);
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        alert(res);
        if (res === "yes") {
          //do nothing 
          setIsLogged(true);
          setIsHome(true);
          fetchProblems();
          // localStorage.setItem('username', username)
          setCookie('username', username,{path: '/'})
      }
        else {
          alert('Please enter valid data');
        }
      }).catch(err => {
        console.log(err);
      })
  }
  const submitLogIn = (e) => {
    e.preventDefault();
    const url = "http://localhost:2498/login";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "username": username, "password": password })
    }
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (res === "yes") {
          //donothin
          setIsLogged(true);
          fetchProblems();
          setIsHome(true);
          setCookie('username', username,{path: '/'})

        }
        else {
          alert('Please enter valid data');
        }
      }).catch(err => {
        console.log(err);
      })
  }
  const fetchProfile = () => {
    const url = "http://localhost:2498/profile";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "username": username, "password": password })
    }
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (res == "no") {
          return;
        }
        setProfileData(res[0]);
        console.log(profileData);
        setIsProfile(true);

      }).catch(err => {
        console.log(err);
      })
  }


  const submitSetProblem = () => {
    const url = "http://localhost:2498/setProblem";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "problemcode": problemcode.current.value,
        "description": description.current.value,
        "constraints": constraints.current.value,
        "sampleinput": sampleinput.current.value,
        "sampleoutput": sampleoutput.current.value,
        "input": input.current.value,
        "output": output.current.value,
        "difficulty": difficulty.current.value
      })
    }
    console.log(options.body);
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (res == "yes") {
          alert("set problem successfully");
          const newObjOfProblem = {};
          newObjOfProblem.problemcode = problemcode.current.value;
          newObjOfProblem.description = description.current.value;
          newObjOfProblem.constraints = constraints.current.value;
          newObjOfProblem.sampleinput = sampleinput.current.value;
          newObjOfProblem.sampleoutput = sampleoutput.current.value;
          newObjOfProblem.input = input.current.value;
          newObjOfProblem.output = output.current.value;
          newObjOfProblem.difficulty = difficulty.current.value;
          console.log("newObjOfProblem", newObjOfProblem);
          switchToSeeProblem(newObjOfProblem);
        } else {
          alert("sorry could not set problem");
        }


      }).catch(err => {
        console.log(err);
      })
  }
  const submitCodechef = () => {
    switchToIDE();
    setMode('problem');
  }
  function alreadyLoggedUser(){
    console.log(cookie.username);
    // alert("you are logged");
    setUsername(cookie.username)
    setIsLogged(true);
    setIsHome(true);
    fetchProblems();
  }
  return (
    <div>
      {
        !isLogged ?
          <>
            {
              (cookie.username)?
              <>
              {
                alreadyLoggedUser()
              }
              </>:null
            }
            {
              !isNewUser ?
                <div className="container">
                  <div className="container">
                    <img src={logocc} className="App-logo2" alt="logocc" />
                  </div>
                  <form className="loginForm" onSubmit={submitLogIn}>
                    <div className="container">
                      <span className="headingLogin">Login Form</span>
                    </div>
                    <center>

                      <input className="inpAtJoin" placeholder="username" onChange={changeUsername} />
                      <br />
                      <input className="inpAtJoin" placeholder="password" onChange={changePassword} />
                      <br />
                      <button className="inpAtJoin1" type="submit" >Submit</button>
                    </center>
                  </form>
                  <hr />
                  <div className="container">
                    <center>
                      <button onClick={() => setIsNewUser(true)} className="switchBtn">Not a user? Sign In</button>
                    </center>
                  </div>

                </div> :

                <div className="container">
                  <div className="container">
                    <img src={logocc} className="App-logo2" alt="logocc" />
                  </div>
                  <form className="siginForm" onSubmit={submitSignIn}>
                    <div className="container">
                      <span className="headingLogin">Signin Form</span>
                    </div>
                    <center>
                      <input className="inpAtJoin" placeholder="username" onChange={changeUsername} />
                      <br />
                      <input className="inpAtJoin" placeholder="password" onChange={changePassword} />
                      <br />
                      <input className="inpAtJoin" placeholder="fullname" ref={fullname} />
                      <br />
                      <input className="inpAtJoin" placeholder="country" ref={country} />
                      <br />
                      <input className="inpAtJoin" placeholder="state" ref={state} />
                      <br />
                      <input className="inpAtJoin" placeholder="city" ref={city} />
                      <br />
                      <input className="inpAtJoin" placeholder="profession" ref={profession} />
                      <br />
                      <input className="inpAtJoin" placeholder="institute" ref={institute} />
                      <br />
                      <button className="inpAtJoin1" type="submit">Submit</button>
                    </center>
                  </form>
                  <hr />
                  <div className="container">
                    <center>
                      <button onClick={() => setIsNewUser(false)} className="switchBtn">Already a user? Log In</button>
                    </center>
                  </div>
                </div>
            }
          </> :
          <>
            <div className="Navbar">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={logocc} className="App-logo" alt="logocc" />
              {/* <img src={clone1} className="navIcon2" alt="logocc" /> */}
              <span className="NavHead">codechef clone</span>
              <button className="navBtn" onClick={switchToHome}>Home</button>
              <button className="navBtn" onClick={switchToIDE}>IDE</button>
              <button className="navBtn" onClick={switchToCreateProblem}>Set Problem</button>
              <button className="navBtn" onClick={madeEasy}>Easy</button>
              <button className="navBtn" onClick={madeMedium}>Medium</button>
              <button className="navBtn" onClick={madeHard}>Hard</button>
              <button className="navBtn" onClick={switchToProfile}>{username}</button>

              {/* <button className="temp" onClick={() => switchToSeeProblem(currProblem)}>SEE CURRENT PROBLEM (TEMP) </button> */}
            </div>
            <div className="container">

              {
                isHome ?
                  <>

                    {/* <h1> this is home page</h1> */}
                    {isEasy ?
                      <>
                        <u><span className="homeHead">Easy Problems For Practise : </span></u>
                        {

                          easy.map((easy) => {
                            return (
                              <div className="container">
                                <button className="problemLink" onClick={() => switchToSeeProblem(easy)}><u>{easy.problemcode}</u></button>
                                <br />
                              </div>
                            )
                          })
                        }
                      </> :
                      <>
                      </>
                    }
                    {
                      isMedium ?
                        <>
                          <u><span className="homeHead">Medium Problems For Practise : </span></u>
                          {
                            medium.map((medium) => {
                              return (
                                <div className="container">
                                  <button className="problemLink" onClick={() => switchToSeeProblem(medium)}>{medium.problemcode}</button>
                                  <br />
                                </div>
                              )
                            })
                          }
                        </> :
                        <>
                        </>
                    }
                    {isHard ?
                      <>
                        <u><span className="homeHead">Hard Problems For Practise : </span></u>
                        {
                          hard.map((hard) => {
                            return (
                              <div className="container">
                                <button className="problemLink" onClick={() => switchToSeeProblem(hard)}>{hard.problemcode}</button>
                                <br />
                              </div>
                            )
                          })
                        }
                      </> :
                      <>
                      </>
                    }
                  </> :
                  <>
                  </>
              }
              {
                isProfile ?
                  <>
                    <div className="container">
                      <div className="profile">
                        <center>
                          <img src={profilePic} className="dp" />
                        </center>
                        <div className="profileDetails">
                          <center>
                            <span className="profileDtInd">User : {profileData.fullname}</span>
                            <br />
                            <span className="profileDtInd">country : {profileData.country}</span>
                            <br />
                            <span className="profileDtInd">state : {profileData.state}</span>
                            <br />
                            <span className="profileDtInd">city : {profileData.city}</span>
                            <br />
                            <span className="profileDtInd">profession : {profileData.profession}</span>
                            <br />
                            <span className="profileDtInd">institute : {profileData.institute}</span>
                            <br />
                          </center>
                        </div>

                      </div>
                    </div>
                  </> :
                  <>
                  </>
              }
              {
                isSetProblem ?
                  <>
                    <div className="container">
                      <div >
                        <label className="setformatProblem" >problem code :</label><textarea className="textareaFormat" ref={problemcode} className="problemSetInp"></textarea>
                        <label className="setformatProblem" >problem discription : </label><textarea className="textareaFormat" ref={description} className="problemSetInp"></textarea>
                        <label className="setformatProblem" >constraints : </label><textarea className="textareaFormat" ref={constraints} className="problemSetInp"></textarea>
                        <label className="setformatProblem" >input :</label><textarea className="textareaFormat" ref={input} className="problemSetInp"></textarea>
                        <label className="setformatProblem" >output :</label><textarea className="textareaFormat" ref={output} className="problemSetInp"></textarea>
                        <label className="setformatProblem" >sample input :</label><textarea className="textareaFormat" ref={sampleinput} className="problemSetInp"></textarea>
                        <label className="setformatProblem" >sample output : </label><textarea className="textareaFormat" ref={sampleoutput} className="problemSetInp"></textarea>
                        <label className="setformatProblem" >difficulty</label>
                        <select className="setformatProblem" ref={difficulty}>
                          <option id="easy">easy</option>
                          <option id="medium">medium</option>
                          <option id="hard">hard</option>
                        </select>
                        <button onClick={submitSetProblem} className="submitSetProblem">Create </button>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </div>
                    </div>
                  </> :
                  <>
                  </>
              }
              {
                isSeeProblem ?
                  <>
                    <div className="container">
                      <h3>Problem Code : </h3>
                      <p className="descProb">{currProblem.problemcode}</p>
                      <h3>description : </h3>
                      <p className="descProb">{currProblem.description}</p>
                      <h3>constraints : </h3>
                      <p className="descProb">{currProblem.constraints}</p>
                      <h3>sample input : </h3>
                      <p className="descProb">{currProblem.sampleinput}</p>
                      <h3>sample output : </h3>
                      <p className="descProb">{currProblem.sampleoutput}</p>
                      <h3>difficulty : </h3>
                      <p className="descProb">{currProblem.difficulty}</p>
                      <button className="submitForWrite" onClick={submitCodechef}>Submit</button>
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                  </> :
                  <>
                  </>
              }
            </div>
          </>

      }

      {

      }
      {
        isIDE ?
          <>
            <div className="container">
              <div className="editor">
                <div className="container-fluid">
                  <div className="result">
                    {
                      correctAns ?
                        <>
                          <div className="correctAns">
                            <span>Correct Answer</span>
                          </div>
                        </> :
                        <>
                        </>
                    }
                    {
                      wrongAns ?
                        <>
                          <div className="wrongAns">
                            <span>Wrong Answer</span>
                          </div>
                        </> :
                        <>
                        </>
                    }
                  </div>
                  <div className="navbar" width="100%">
                    <div className="container">
                      <img src={logo} className="App-logo" alt="logo" />
                      {
                        mode === 'ide' ?
                          <span className="titleHead">
                            Om's Online Ide
                          </span> :
                          <>

                            <h3>
                              {console.log(currProblem)}
                              {currProblem.problemcode}
                            </h3>
                            <button className="run" onClick={submitCode}>
                              Submit Code
                            </button>
                          </>
                      }
                      <select className="lang" onChange={changeLang}>
                        <option id="python">python</option>
                        <option id="java">java</option>
                        <option id="c_cpp">c_cpp</option>
                        <option id="javascript">javascript</option>
                      </select>
                      <select className="theme" onChange={changeTheme}>
                        <option id="monokai">monokai</option>
                        <option id="idle_fingers">idle_fingers</option>
                        <option id="ambiance">ambiance</option>
                        <option id="clouds_midnight">clouds_midnight</option>
                        <option id="dracula">dracula</option>
                        <option id="one_dark">one_dark</option>
                      </select>

                      <button className="run" onClick={fetchOutput}>
                        Run Code
                      </button>
                    </div>


                  </div>
                  <AceEditor
                    ref={codeRef}
                    mode={lang}
                    theme={theme}
                    name="kdslfadsf"
                    editorProps={{ $blockScrolling: true }}
                    width="100%"
                    fontSize="1.8vw"
                    height="40vw"
                  />
                </div>
              </div>
              <div className="container">
                <div>
                  <button className="run" onClick={submitCode}>
                    Submit Code
                  </button>
                  <button onClick={fetchOutput} className="run2" >Run Code</button>
                </div>
              </div>
              <div className="container">
                <div className="inp" >
                  <h4>Input:</h4>
                  <textarea ref={inpRef} id="inpText" className="inpText" placeholder="write default input here...">

                  </textarea>
                </div>
                <div className="Op">
                  <h4> Output:</h4>
                  <textarea ref={opRef} placeholder="output will be displayed here.." className="opText">

                  </textarea>
                </div>
              </div>
            </div>
          </> :
          <>
          </>
      }
    </div>
  );
}

export default App;

// import logo from './logocc.PNG';
// import logocc1 from './logocc1.PNG';
// import clone1 from './clone1.PNG';
// import profilePic from './profilePic.png';
// import AceEditor, { diff } from "react-ace";
// import './App.css';
// import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/mode-c_cpp";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/mode-php";
// import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/theme-idle_fingers";
// import "ace-builds/src-noconflict/theme-ambiance";
// import "ace-builds/src-noconflict/theme-clouds_midnight";
// import "ace-builds/src-noconflict/theme-dracula";
// import "ace-builds/src-noconflict/theme-one_dark";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useRef, useState } from 'react';
// import logocc from './mylogocc.PNG';
// import { Dropdown } from 'bootstrap';
// import { useCookies } from 'react-cookie';
// function App() {
//   const [cookie, setCookie] = useCookies(['user']);
//   const [lang, setLang] = useState('python');
//   const [theme, setTheme] = useState('monokai');
//   const changeLang = (e) => {
//     setLang(e.target.value);
//     console.log(`language = ${lang}`)
//   }
//   const changeTheme = (e) => {
//     setTheme(e.target.value)
//     console.log(`theme = ${theme}`)
//   }
//   const inpRef = useRef();
//   const opRef = useRef();
//   const codeRef = useRef();
//   const [isIDE, setIsIDE] = useState(false);
//   const [isLogged, setIsLogged] = useState(false);
//   const [isNewUser, setIsNewUser] = useState(false);
//   const [username, setUsername] = useState();
//   const [isProfile, setIsProfile] = useState(false);
//   const [password, setPassword] = useState();
//   const fullname = useRef();
//   const country = useRef();
//   const state = useRef();
//   const city = useRef();
//   const profession = useRef();
//   const institute = useRef();
//   const problemcode = useRef();
//   const description = useRef();
//   const constraints = useRef();
//   const sampleinput = useRef();
//   const sampleoutput = useRef();
//   const input = useRef();
//   const output = useRef();
//   const difficulty = useRef();
//   const [isHome, setIsHome] = useState(true);
//   const [isSetProblem, setIsSetProblem] = useState(false);
//   let [profileData, setProfileData] = useState();
//   const [isSeeProblem, setIsSeeProblem] = useState(false);
//   const [currProblem, setCurrProblem] = useState();
//   const [easy, setEasy] = useState([]);
//   const [medium, setMedium] = useState([]);
//   const [hard, setHard] = useState([]);
//   const [isEasy, setIsEasy] = useState(false);
//   const [isMedium, setIsMedium] = useState(true);
//   const [isHard, setIsHard] = useState(false);
//   const [mode, setMode] = useState('ide');
//   const [correctAns, setCorrectAns] = useState(false);
//   const [wrongAns, setWrongAns] = useState(false);
//   const switchToIDE = () => {
//     if (isHome === true) setIsHome(false);
//     else if (isSetProblem === true) setIsSetProblem(false);
//     else if (isProfile === true) setIsProfile(false);
//     else if (isSeeProblem === true) setIsSeeProblem(false);
//     setIsIDE(true);
//     setMode('ide');
//   }
//   const switchToHome = () => {
//     if (isIDE === true) setIsIDE(false);
//     else if (isSetProblem === true) setIsSetProblem(false);
//     else if (isSeeProblem === true) setIsSeeProblem(false);
//     else if (isProfile === true) setIsProfile(false);
//     setIsHome(true);
//   }
//   const switchToProfile = () => {
//     if (isIDE === true) setIsIDE(false);
//     else if (isSeeProblem === true) setIsSeeProblem(false);
//     else if (isSetProblem === true) setIsSetProblem(false);
//     else if (isHome === true) setIsHome(false);
//     fetchProfile();


//   }
//   const switchToCreateProblem = () => {
//     if (isHome === true) setIsHome(false);
//     else if (isIDE === true) setIsIDE(false);
//     else if (isSeeProblem === true) setIsSeeProblem(false);
//     else if (isProfile === true) setIsProfile(false);
//     setIsSetProblem(true);
//   }
//   const switchToSeeProblem = (problemStuff) => {
//     if (isHome === true) setIsHome(false);
//     else if (isIDE === true) setIsIDE(false);
//     else if (isSetProblem === true) { setIsSetProblem(false); }
//     else if (isProfile === true) setIsProfile(false);
//     console.log("problemStuff : ", problemStuff);
//     setCurrProblem(problemStuff);
//     setIsSeeProblem(true);
//     setMode('problem');
//   }
//   const madeEasy = () => {
//     setIsMedium(false);
//     setIsHard(false);
//     setIsEasy(true);
//     switchToHome(true);
//   }
//   const madeMedium = () => {
//     setIsEasy(false);
//     setIsHard(false);
//     setIsMedium(true);
//     switchToHome(true);
//   }
//   const madeHard = () => {
//     setIsEasy(false);
//     setIsMedium(false);
//     setIsHard(true);
//     switchToHome(true);
//   }
//   const changeUsername = (e) => {
//     console.log(e.target.value);
//     setUsername(e.target.value);
//   }
//   const changePassword = (e) => {
//     console.log(e.target.value);
//     setPassword(e.target.value);
//   }
//   const fetchProblems = () => {
//     // alert('fetch problems was called');
//     const url = "http://localhost:2498/giveProblems";
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({})
//     }
//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         if (res == "no") {
//           alert("please reload dthe page");
//           return;
//         }
//         console.log(res);
//         for (let i = 0; i < res.length; i++) {
//           if (res[i].difficulty == 'easy') easy.push(res[i]);
//           else if (res[i].difficulty == 'medium') medium.push(res[i]);
//           else hard.push(res[i]);
//           if (i >= res.length - 1) {
//             madeEasy();
//           }
//         }
//         console.log(easy);
//         console.log(medium);
//         console.log(hard);
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
//   const fetchOutput = () => {
//     console.log(codeRef.current.editor.getValue());

//     const url = "http://localhost:2498/run";
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ "code": codeRef.current.editor.getValue(), "lang": lang, "inp": inpRef.current.value, "op": opRef.current.value })
//     }
//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         console.log(res);
//         if (lang === 'java') {
//           opRef.current.value = (res.stdout ? res.stdout : res.stderr);
//         }
//         else {
//           opRef.current.value = res;
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
//   const submitCode = () => {
//     console.log(codeRef.current.editor.getValue());
//     const myInput = currProblem.input;
//     const url = "http://localhost:2498/run";
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ "code": codeRef.current.editor.getValue(), "lang": lang, "inp": myInput, "op": opRef.current.value })
//     }
//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         console.log(res);
//         if (lang === 'java') {
//           if (res.stdout) {
//             if (res.stdout === currProblem.output) {
//               //write answer
//               window.scrollTo(0, 0);
//               setWrongAns(false);
//               setCorrectAns(true);
//               // alert("write answer");
//             } else {
//               //wrong answer
//               setCorrectAns(false);
//               setWrongAns(true);
//               window.scrollTo(0, 0);
//               // alert("wrong answer");
//             }
//           } else {
//             //wrong answer
//             setCorrectAns(false);
//             setWrongAns(true);
//             window.scrollTo(0, 0);
//             // alert("wrong answer");
//           }
//           // opRef.current.value = (res.stdout ? res.stdout : res.stderr);
//         }
//         else {
//           // alert("cpp?");
//           console.log(`"${res.trim()}"\n"${currProblem.output.trim()}"`);
//           res = res.trim();
//           currProblem.output = currProblem.output.trim();
//           let i = 0;
//           let j = 0;
//           let flag = true;
//           for (; i < res.length && j < currProblem.output.length;) {
//             if (res[i] == '\r') { i++; continue; }
//             if (res[i] == '\n') { i++; continue; }
//             if (currProblem.output[j] == '\r') { j++; continue; }
//             if (currProblem.output[j] == '\n') { j++; continue; }
//             if (res[i] !== currProblem.output[j]) {
//               flag = false;
//               setCorrectAns(false);
//               setWrongAns(true);
//               window.scrollTo(0, 0);
//               // alert('wrong answer');
//               return;
//             }
//             console.log(res[i], currProblem.output[j]);
//             i++;
//             j++;
//           }
//           let sig = 0
//           while (i < res.length) {
//             if (res[i] == '\r') { i++; continue; }
//             if (res[i] == '\n') { i++; continue; }
//             sig++;
//           }
//           while (i < currProblem.output.length) {
//             if (currProblem.output[j] == '\r') { j++; continue; }
//             if (currProblem.output[j] == '\n') { j++; continue; }
//             sig++;
//           }
//           console.log(sig);
//           if (sig === 0) {
//             //write answer
//             setWrongAns(false);
//             setCorrectAns(true);
//             window.scrollTo(0, 0);
//             console.log("res : ", res.trim());
//             console.log("expected : ", currProblem.output.trim());
//             // alert("write answer");
//           } else {
//             setCorrectAns(false);
//             setWrongAns(true);
//             window.scrollTo(0, 0);
//             // alert("wrong answer");
//             //wrong answer
//           }
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }

//   const submitSignIn = (e) => {
//     e.preventDefault();
//     const url = "http://localhost:2498/signin";
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ "username": username, "password": password, "fullname": fullname.current.value, "country": country.current.value, "state": state.current.value, "city": city.current.value, "profession": profession.current.value, "institute": institute.current.value })
//     }
//     console.log(options.body);
//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         alert(res);
//         if (res === "yes") {
//           //do nothing 
//           setIsLogged(true);
//           setIsHome(true);
//           fetchProblems();
//           // localStorage.setItem('username', username)
//           setCookie('username', username,{path: '/'})
//       }
//         else {
//           alert('Please enter valid data');
//         }
//       }).catch(err => {
//         console.log(err);
//       })
//   }
//   const submitLogIn = (e) => {
//     e.preventDefault();
//     const url = "http://localhost:2498/login";
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ "username": username, "password": password })
//     }
//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         if (res === "yes") {
//           //donothin
//           setIsLogged(true);
//           fetchProblems();
//           setIsHome(true);
//           setCookie('username', username,{path: '/'})

//         }
//         else {
//           alert('Please enter valid data');
//         }
//       }).catch(err => {
//         console.log(err);
//       })
//   }
//   const fetchProfile = () => {
//     const url = "http://localhost:2498/profile";
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ "username": username, "password": password })
//     }
//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         if (res == "no") {
//           return;
//         }
//         setProfileData(res[0]);
//         console.log(profileData);
//         setIsProfile(true);

//       }).catch(err => {
//         console.log(err);
//       })
//   }


//   const submitSetProblem = () => {
//     const url = "http://localhost:2498/setProblem";
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         "problemcode": problemcode.current.value,
//         "description": description.current.value,
//         "constraints": constraints.current.value,
//         "sampleinput": sampleinput.current.value,
//         "sampleoutput": sampleoutput.current.value,
//         "input": input.current.value,
//         "output": output.current.value,
//         "difficulty": difficulty.current.value
//       })
//     }
//     console.log(options.body);
//     fetch(url, options)
//       .then(res => res.json())
//       .then(res => {
//         if (res == "yes") {
//           alert("set problem successfully");
//           const newObjOfProblem = {};
//           newObjOfProblem.problemcode = problemcode.current.value;
//           newObjOfProblem.description = description.current.value;
//           newObjOfProblem.constraints = constraints.current.value;
//           newObjOfProblem.sampleinput = sampleinput.current.value;
//           newObjOfProblem.sampleoutput = sampleoutput.current.value;
//           newObjOfProblem.input = input.current.value;
//           newObjOfProblem.output = output.current.value;
//           newObjOfProblem.difficulty = difficulty.current.value;
//           console.log("newObjOfProblem", newObjOfProblem);
//           switchToSeeProblem(newObjOfProblem);
//         } else {
//           alert("sorry could not set problem");
//         }


//       }).catch(err => {
//         console.log(err);
//       })
//   }
//   const submitCodechef = () => {
//     switchToIDE();
//     setMode('problem');
//   }
//   function alreadyLoggedUser(){
//     console.log(cookie.username);
//     // alert("you are logged");
//     setUsername(cookie.username)
//     setIsLogged(true);
//     setIsHome(true);
//     fetchProblems();
//   }
//   return (
//     <div>
//       {
//         !isLogged ?
//           <>
//             {
//               (cookie.username)?
//               <>
//               {
//                 alreadyLoggedUser()
//               }
//               </>:null
//             }
//             {
//               !isNewUser ?
//                 <div className="container">
//                   <div className="container">
//                     <img src={logocc} className="App-logo2" alt="logocc" />
//                   </div>
//                   <form className="loginForm" onSubmit={submitLogIn}>
//                     <div className="container">
//                       <span className="headingLogin">Login Form</span>
//                     </div>
//                     <center>

//                       <input className="inpAtJoin" placeholder="username" onChange={changeUsername} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="password" onChange={changePassword} />
//                       <br />
//                       <button className="inpAtJoin1" type="submit" >Submit</button>
//                     </center>
//                   </form>
//                   <hr />
//                   <div className="container">
//                     <center>
//                       <button onClick={() => setIsNewUser(true)} className="switchBtn">Not a user? Sign In</button>
//                     </center>
//                   </div>

//                 </div> :

//                 <div className="container">
//                   <div className="container">
//                     <img src={logocc} className="App-logo2" alt="logocc" />
//                   </div>
//                   <form className="siginForm" onSubmit={submitSignIn}>
//                     <div className="container">
//                       <span className="headingLogin">Signin Form</span>
//                     </div>
//                     <center>
//                       <input className="inpAtJoin" placeholder="username" onChange={changeUsername} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="password" onChange={changePassword} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="fullname" ref={fullname} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="country" ref={country} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="state" ref={state} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="city" ref={city} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="profession" ref={profession} />
//                       <br />
//                       <input className="inpAtJoin" placeholder="institute" ref={institute} />
//                       <br />
//                       <button className="inpAtJoin1" type="submit">Submit</button>
//                     </center>
//                   </form>
//                   <hr />
//                   <div className="container">
//                     <center>
//                       <button onClick={() => setIsNewUser(false)} className="switchBtn">Already a user? Log In</button>
//                     </center>
//                   </div>
//                 </div>
//             }
//           </> :
//           <>
//             <div className="Navbar">
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               <img src={logocc} className="App-logo" alt="logocc" />
//               {/* <img src={clone1} className="navIcon2" alt="logocc" /> */}
//               <span className="NavHead">codechef clone</span>
//               <button className="navBtn" onClick={switchToHome}>Home</button>
//               <button className="navBtn" onClick={switchToIDE}>IDE</button>
//               <button className="navBtn" onClick={switchToCreateProblem}>Set Problem</button>
//               <button className="navBtn" onClick={madeEasy}>Easy</button>
//               <button className="navBtn" onClick={madeMedium}>Medium</button>
//               <button className="navBtn" onClick={madeHard}>Hard</button>
//               <button className="navBtn" onClick={switchToProfile}>{username}</button>

//               {/* <button className="temp" onClick={() => switchToSeeProblem(currProblem)}>SEE CURRENT PROBLEM (TEMP) </button> */}
//             </div>
//             <div className="container">

//               {
//                 isHome ?
//                   <>

//                     {/* <h1> this is home page</h1> */}
//                     {isEasy ?
//                       <>
//                         <u><span className="homeHead">Easy Problems For Practise : </span></u>
//                         {

//                           easy.map((easy) => {
//                             return (
//                               <div className="container">
//                                 <button className="problemLink" onClick={() => switchToSeeProblem(easy)}><u>{easy.problemcode}</u></button>
//                                 <br />
//                               </div>
//                             )
//                           })
//                         }
//                       </> :
//                       <>
//                       </>
//                     }
//                     {
//                       isMedium ?
//                         <>
//                           <u><span className="homeHead">Medium Problems For Practise : </span></u>
//                           {
//                             medium.map((medium) => {
//                               return (
//                                 <div className="container">
//                                   <button className="problemLink" onClick={() => switchToSeeProblem(medium)}>{medium.problemcode}</button>
//                                   <br />
//                                 </div>
//                               )
//                             })
//                           }
//                         </> :
//                         <>
//                         </>
//                     }
//                     {isHard ?
//                       <>
//                         <u><span className="homeHead">Hard Problems For Practise : </span></u>
//                         {
//                           hard.map((hard) => {
//                             return (
//                               <div className="container">
//                                 <button className="problemLink" onClick={() => switchToSeeProblem(hard)}>{hard.problemcode}</button>
//                                 <br />
//                               </div>
//                             )
//                           })
//                         }
//                       </> :
//                       <>
//                       </>
//                     }
//                   </> :
//                   <>
//                   </>
//               }
//               {
//                 isProfile ?
//                   <>
//                     <div className="container">
//                       <div className="profile">
//                         <center>
//                           <img src={profilePic} className="dp" />
//                         </center>
//                         <div className="profileDetails">
//                           <center>
//                             <span className="profileDtInd">User : {profileData.fullname}</span>
//                             <br />
//                             <span className="profileDtInd">country : {profileData.country}</span>
//                             <br />
//                             <span className="profileDtInd">state : {profileData.state}</span>
//                             <br />
//                             <span className="profileDtInd">city : {profileData.city}</span>
//                             <br />
//                             <span className="profileDtInd">profession : {profileData.profession}</span>
//                             <br />
//                             <span className="profileDtInd">institute : {profileData.institute}</span>
//                             <br />
//                           </center>
//                         </div>

//                       </div>
//                     </div>
//                   </> :
//                   <>
//                   </>
//               }
//               {
//                 isSetProblem ?
//                   <>
//                     <div className="container">
//                       <div >
//                         <label className="setformatProblem" >problem code :</label><textarea className="textareaFormat" ref={problemcode} className="problemSetInp"></textarea>
//                         <label className="setformatProblem" >problem discription : </label><textarea className="textareaFormat" ref={description} className="problemSetInp"></textarea>
//                         <label className="setformatProblem" >constraints : </label><textarea className="textareaFormat" ref={constraints} className="problemSetInp"></textarea>
//                         <label className="setformatProblem" >input :</label><textarea className="textareaFormat" ref={input} className="problemSetInp"></textarea>
//                         <label className="setformatProblem" >output :</label><textarea className="textareaFormat" ref={output} className="problemSetInp"></textarea>
//                         <label className="setformatProblem" >sample input :</label><textarea className="textareaFormat" ref={sampleinput} className="problemSetInp"></textarea>
//                         <label className="setformatProblem" >sample output : </label><textarea className="textareaFormat" ref={sampleoutput} className="problemSetInp"></textarea>
//                         <label className="setformatProblem" >difficulty</label>
//                         <select className="setformatProblem" ref={difficulty}>
//                           <option id="easy">easy</option>
//                           <option id="medium">medium</option>
//                           <option id="hard">hard</option>
//                         </select>
//                         <button onClick={submitSetProblem} className="submitSetProblem">Create </button>
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                       </div>
//                     </div>
//                   </> :
//                   <>
//                   </>
//               }
//               {
//                 isSeeProblem ?
//                   <>
//                     <div className="container">
//                       <h3>Problem Code : </h3>
//                       <p className="descProb">{currProblem.problemcode}</p>
//                       <h3>description : </h3>
//                       <p className="descProb">{currProblem.description}</p>
//                       <h3>constraints : </h3>
//                       <p className="descProb">{currProblem.constraints}</p>
//                       <h3>sample input : </h3>
//                       <p className="descProb">{currProblem.sampleinput}</p>
//                       <h3>sample output : </h3>
//                       <p className="descProb">{currProblem.sampleoutput}</p>
//                       <h3>difficulty : </h3>
//                       <p className="descProb">{currProblem.difficulty}</p>
//                       <button className="submitForWrite" onClick={submitCodechef}>Submit</button>
//                       <br />
//                       <br />
//                       <br />
//                       <br />
//                     </div>
//                   </> :
//                   <>
//                   </>
//               }
//             </div>
//           </>

//       }

//       {

//       }
//       {
//         isIDE ?
//           <>
//             <div className="container">
//               <div className="editor">
//                 <div className="container-fluid">
//                   <div className="result">
//                     {
//                       correctAns ?
//                         <>
//                           <div className="correctAns">
//                             <span>Correct Answer</span>
//                           </div>
//                         </> :
//                         <>
//                         </>
//                     }
//                     {
//                       wrongAns ?
//                         <>
//                           <div className="wrongAns">
//                             <span>Wrong Answer</span>
//                           </div>
//                         </> :
//                         <>
//                         </>
//                     }
//                   </div>
//                   <div className="navbar" width="100%">
//                     <div className="container">
//                       <img src={logo} className="App-logo" alt="logo" />
//                       {
//                         mode === 'ide' ?
//                           <span className="titleHead">
//                             Om's Online Ide
//                           </span> :
//                           <>

//                             <h3>
//                               {console.log(currProblem)}
//                               {currProblem.problemcode}
//                             </h3>
//                             <button className="run" onClick={submitCode}>
//                               Submit Code
//                             </button>
//                           </>
//                       }
//                       <select className="lang" onChange={changeLang}>
//                         <option id="python">python</option>
//                         <option id="java">java</option>
//                         <option id="c_cpp">c_cpp</option>
//                         <option id="javascript">javascript</option>
//                       </select>
//                       <select className="theme" onChange={changeTheme}>
//                         <option id="monokai">monokai</option>
//                         <option id="idle_fingers">idle_fingers</option>
//                         <option id="ambiance">ambiance</option>
//                         <option id="clouds_midnight">clouds_midnight</option>
//                         <option id="dracula">dracula</option>
//                         <option id="one_dark">one_dark</option>
//                       </select>

//                       <button className="run" onClick={fetchOutput}>
//                         Run Code
//                       </button>
//                     </div>


//                   </div>
//                   <AceEditor
//                     ref={codeRef}
//                     mode={lang}
//                     theme={theme}
//                     name="kdslfadsf"
//                     editorProps={{ $blockScrolling: true }}
//                     width="100%"
//                     fontSize="1.8vw"
//                     height="40vw"
//                   />
//                 </div>
//               </div>
//               <div className="container">
//                 <div>
//                   <button className="run" onClick={submitCode}>
//                     Submit Code
//                   </button>
//                   <button onClick={fetchOutput} className="run2" >Run Code</button>
//                 </div>
//               </div>
//               <div className="container">
//                 <div className="inp" >
//                   <h4>Input:</h4>
//                   <textarea ref={inpRef} id="inpText" className="inpText" placeholder="write default input here...">

//                   </textarea>
//                 </div>
//                 <div className="Op">
//                   <h4> Output:</h4>
//                   <textarea ref={opRef} placeholder="output will be displayed here.." className="opText">

//                   </textarea>
//                 </div>
//               </div>
//             </div>
//           </> :
//           <>
//           </>
//       }
//     </div>
//   );
// }

// export default App;
