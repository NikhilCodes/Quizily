import React, {useContext, useState} from "react";
import {Button, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Spinner} from "reactstrap";
import {signInWithGoogle} from "./firebaseApp/firebase";
import {Link, navigate} from "@reach/router";
import {auth} from "./firebaseApp/firebase"
import {AuthContext} from "../App";


export default function LoginPage() {
  const [authenticated, setAuthenticated, user, setUser] = useContext(AuthContext)
  const [loginWithEmail, setLoginWithEmail] = useState(false)
  const [loginWithEmailMode, setLoginWithEmailMode] = useState("LOGIN")  // LOGIN or REGISTER

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  if (authenticated) {
    navigate("/")
  }

  const onLoginWithGoogle = () => {
    signInWithGoogle().then(res => {
      console.log(res.user)
      setAuthenticated(true)
      setUser(res.user)
      navigate('/')
    })
  }

  function onLoginWithEmail() {
    auth.signInWithEmailAndPassword(email, password).then(res => {
      setAuthenticated(true)
      setUser(res.user)
      navigate('/')
    })
  }

  function onSignUpWithEmail() {
    auth.createUserWithEmailAndPassword(email, password).then(res => {
      res.user.updateProfile({
        displayName: name
      }).then(value => {
        console.log("SET NAME: ", value)
        setAuthenticated(true)
        setUser(res.user)
        navigate('/')
      })
    })
  }

  return <div id="login-page">
    <Container className="modal-dialog text-center app-title">
      Study Champ
    </Container>
    <Container className="bg-dark form-inline modal-body"
               id="login-form-container">
      {loginWithEmail ? <div className="text-center text-white container-fluid">
        <div>
          {loginWithEmailMode === "REGISTER" ? <><InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroupText>
            </InputGroupAddon>
            <Input onChange={(e) => setName(e.target.value)}/>
          </InputGroup><br/></> : null}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroupText>
            </InputGroupAddon>
            <Input onChange={(e) => setEmail(e.target.value)}/>
          </InputGroup><br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
          </InputGroup>
          <br/>
          <Button color="primary" size="lg"
                  onClick={() => {
                    loginWithEmailMode === "LOGIN" ?
                    onLoginWithEmail() : onSignUpWithEmail()
                  }}
          >{loginWithEmailMode === "LOGIN" ? "Login" : "Register"}</Button>
          <br/>
          <br/>
          <div style={{
            fontSize: "18px"
          }}>
            {loginWithEmailMode === "LOGIN" ? "Not a registered user? " : "Already a user? "}
            {<span onClick={() => {
              setLoginWithEmailMode(prevState => prevState === "LOGIN" ? "REGISTER" : "LOGIN")
            }}>{loginWithEmailMode === "LOGIN" ? "Sign Up" : "Sign In"}</span>}
          </div>
        </div>
      </div> : <div className="text-white font-weight-bold">
        Hey there, <>👋</>
        <div className="font-weight-light">
          Wanna get better at maths?
        </div>
        <br/>
        <Button size="lg" onClick={onLoginWithGoogle}>
          Let's Login with &nbsp;<img width="20px"
                                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                      alt="Google-OAuth"/>
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button size="lg" color="light" onClick={() => setLoginWithEmail(true)}>
          Or Login with &nbsp;<img height="24px" width="34px"
                                   src="https://www.pinclipart.com/picdir/middle/447-4477875_mail-svg-icon-round-gmail-logo-png-clipart.png"
                                   alt="Google-OAuth"/>
        </Button>
      </div>}
    </Container>
  </div>;
}