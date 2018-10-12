import React, { Component } from "react";
import ReactTable from 'react-table';

import Base from './Base';
import UserInviteForm from "./Form/userinvite-form";

export default class Users extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
    console.log(this.props);
  }

  render() {
    return (
      <Base>
      <div class="block">
        <div class="row h-100">
        <div class="col-2"></div>
          <div class="col-4">
          <h2>Users</h2>
          </div>
          <div class="col-4">
            <UserInviteForm />
          </div>
          <div class="col-2"></div>
        </div>
        <div class="row h-100">
          <div class="col-2"></div>
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
              defaultPageSize="5"
              data={this.props.users.users}
              className="-striped -highlight"
            />
          </div>
          <div class="col-2"></div>
        </div>
      </div>
      </Base>
    );
  }
}
