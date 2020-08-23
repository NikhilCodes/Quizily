import React from "react";
import {Container, Table} from "reactstrap"

export default function ScoreboardPage(props) {
  let tableInfo = Object.keys(props.data)
  return <Container style={{
    top: "20%",
    position: "absolute"
  }}>
    <h2 className="text-white">Score Board</h2>
    <Table dark>
      <thead>
        <tr>
          <th>#</th>
          <th>Chapter Name</th>
          <th>Percentage Scored</th>
        </tr>
      </thead>
      <tbody>
      {tableInfo.map((value, index) => {
        return <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{value}</td>
          <td>{props.data[value] + ' %   ' } {(props.data[value] < 80) ? <span style={{color: "orange"}}>{"Needs Improvement"}</span> : ""}</td>
        </tr>
      })}
      </tbody>
    </Table>
  </Container>
}