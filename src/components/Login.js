import React, {useContext} from "react";
import {Button, Container, Spinner} from "reactstrap";
import {signInWithGoogle} from "./firebaseApp/firebase";
import {navigate} from "@reach/router";
import {auth} from "./firebaseApp/firebase"
import {AuthContext} from "../App";

export default function LoginPage() {
  const [authenticated, setAuthenticated ,user, setUser] = useContext(AuthContext)

  if(authenticated) {
    navigate("/")
  }

  const onLogin = () => {
    signInWithGoogle().then(res => {
      console.log(res.user)
      setAuthenticated(true)
      setUser(res.user)
      navigate('/')
    })

    auth.onAuthStateChanged(a => {

    })
  }
  return <div id="login-page">
    <Container className="modal-dialog text-center app-title">
      Study Champ
    </Container>
    <Container className="bg-dark form-inline modal-body"
               id="login-form-container">
      <div className="text-white font-weight-bold">
        Hey there, <>👋</>
        <div className="font-weight-light">
          Wanna get better at maths?
        </div>
        <br/>
        <Button size="lg" onClick={onLogin}>
          Let's Sign Up with &nbsp;<img width="20px"
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                        alt="Google-OAuth"/>
        </Button>
      </div>
    </Container>
  </div>;
}