import React, {Fragment, useContext, useEffect, useState} from "react";
import {
  FormGroup,
  Form,
  FormText,
  Button,
  Container,
  Navbar,
  NavbarText,
  NavLink,
  NavItem,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavbarToggler,
  Card,
  CardBody,
  Col,
  Row,
  CardHeader, CardTitle
} from "reactstrap";
import {auth,} from "./firebaseApp/firebase";
import {AuthContext} from "../App";
import {navigate} from "@reach/router";

export default function HomePage(props) {
  const [authenticated, setAuthenticated, user, setUser] = useContext(AuthContext)
  const [navBarOptOpen, setNavBarOptOpen] = useState(false)
  if (authenticated === false) {
    navigate("/login")
  }

  return <Fragment>
    <Navbar color="dark" className="text-white" dark id="nav-bar" expand="md">
      <h4>Study Champ</h4>
      <NavbarToggler onClick={() => setNavBarOptOpen(!navBarOptOpen)}/>
      <Collapse isOpen={navBarOptOpen} navbar>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {user ? user.displayName : null}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={props.logOutFunc}>Log Out</DropdownItem>
              <DropdownItem>Privacy</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
    <div className="home-page">
      <Container>
        <Row>
          <Col>
            <div className="dashboard-cards" onClick={() => navigate('/testset/2441')}>
              <div style={{fontSize: "14px", color: "slategray", fontWeight: 500}}>Test Set - 1</div>
              <ul>
                <li>Integers</li>
                <li>Fractions and Decimals</li>
                <li>Data handling</li>
                <li>Simple Equations</li>
                <li>Lines and Angles</li>
                <li>The triangle and its properties</li>
              </ul>
            </div>
          </Col>
          <Col/>
        </Row>
      </Container>
    </div>
  </Fragment>
}