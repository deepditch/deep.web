import React, { Component } from "react";
import ReactTable from 'react-table'

export default class Users extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {

    return (
      <div class="app-container">
      <div class="row no-gutters h-100">
      <div class="col-8">
      <ReactTable
          columns={[
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Email",
              accessor: "email"
            },
            {
              Header: "Role",
              accessor: "role"
            },
            {
              Header: "Organization",
              accessor: "organization.name"
            },
          ]}
          data={this.props.users.users}
          className="-striped -highlight"
        />
      </div>
      </div>
      </div>
    );
  }
}
