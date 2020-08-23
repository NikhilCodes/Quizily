import React, {Fragment, useEffect, useState} from "react";
import {Button, Container, Modal, ModalBody, ModalHeader} from "reactstrap";
import {auth, firestore} from "./firebaseApp/firebase";
import {navigate} from "@reach/router";
import ScoreboardPage from "./Scoreboard";

function TestPage(props) {
  const data = props.data
  const [confirmedSubmit, setConfirmedSubmit] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [tests, setTests] = useState(null)
  const [finalPercentages, setFinalPercentages] = useState({})
  const [scores, setScores] = useState({
    "integers": 0.0,
    "lines and angles": 0.0,
    "simple equations": 0.0,
  })

  let attempts = {}
  for(let i=0;i<data.metadata.n;i++) {
    attempts[`${i}`] = false
  }

  const toggleModal = () => {
    setConfirmedSubmit(!confirmedSubmit)
  }

  const onSubmitTest = () => {
    let percentages = {}
    Object.keys(data.metadata["n_qs"]).forEach(value => {
      // console.log(scores[value]/data.metadata["n_qs"][value])
      percentages[value] = (scores[value]/data.metadata["n_qs"][value]) * 100
    })

    setFinalPercentages(percentages)
    setShowScore(true)
  }

  const onChangeSelection = (index, e) => {
    let currentData = data[`q${index}`]
    let _currentScores = scores
    if(e.target.value === currentData["correctIndex"].toString()) {
      _currentScores[`${currentData["tag"]}`] += 1
      setScores(_currentScores)
      attempts[`${index}`] = true
    } else if (attempts[`${index}`]) {
      _currentScores[`${currentData["tag"]}`] -= 1
      setScores(_currentScores)
    }
  }

  useEffect(() => {
    if (!tests) {
      let _tests = []
      for (let i = 1; i <= data.metadata.n; i++) {
        let test = data[`q${i}`]
        _tests.push(<div className="test-cell" key={i}>
          <h5>{`${i}) `}{test.question}</h5>

          <div onChange={onChangeSelection.bind(this, i)}>
            {test.options.map((opt,i_) => <div key={`${i}-${i_}`}>
              <input type="radio" id={`${i}-${i_}`} name={'q'+i} value={i_}/>&nbsp;&nbsp;
              <label style={{
                maxWidth: "90%"
              }} htmlFor={`${i}-${i_}`}>{opt}</label><br/>
            </div>)}
          </div>
        </div>)
      }

      setTests(_tests)
    }
  }, [tests, data])

  if(showScore) return <ScoreboardPage data={finalPercentages}/>

  return <Fragment>
    <Container>
      {tests}
    </Container>
    <div style={{margin: "30px 12px"}}>
      <Button color="primary" onClick={() => setConfirmedSubmit(true)}>
        Submit
      </Button>
    </div>
    <Modal isOpen={confirmedSubmit} toggle={toggleModal}>
      <ModalHeader>
        Confirm submit?
      </ModalHeader>
      <ModalBody>
        <Button color="success" onClick={onSubmitTest}>Submit</Button>{' '}
        <Button color="secondary" onClick={() => setConfirmedSubmit(false)}>Cancel</Button>
      </ModalBody>
    </Modal>
  </Fragment>
}

export default function TestIntroPage(props) {
  const id = props.id
  const testSet = 0
  const [data, setData] = useState({})
  const [confirmed, setConfirmed] = useState(false)

  const onClickConfirm = () => {
    firestore.collection(`${id}`).doc(`${testSet}`).get().then(doc => {
      setData(doc.data())
      setConfirmed(true)
    })
  }

  return <Container>
    {confirmed ? <TestPage id={id} data={data}/> : <div className="text-white bg-dark test-start-confirm">
      Confirm that you want to begin the test <br/><br/>
      <Button color="warning" onClick={onClickConfirm}>Begin</Button>
    </div>}
  </Container>
}
