import React from "react";
import {Table} from "reactstrap"

export default function ScoreboardPage(props) {
  let tableInfo = Object.keys(props.data)
  return <div>
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
          <td>{props.data[value] + ' %'}</td>
        </tr>
      })}
      </tbody>
    </Table>
  </div>
}