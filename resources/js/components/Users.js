import React, { Component } from "react";
import ReactTable from 'react-table';

import Base from './Base';
import UserInviteForm from "./Form/userinvite-form";

export default UserInviteForm =>
  class Users extends Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.submitRevoke = this.submitRevoke.bind(this);
    }

    componentDidMount() {
      this.props.getUsers();
      this.props.getInvites();
    }

    handleClick(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    submitRevoke(event) {
      event.preventDefault();
      this.props.revokeInvite(this.state.revoke_invite_id);
    }

    render() {
      return (
        <Base>
        <div class="block-small">
          <div class="row">
          <div class="col-2"></div>
            <div class="col-4">
            <h1>Users</h1>
            </div>
            <div class="col-4">
              <UserInviteForm />
            </div>
            <div class="col-2"></div>
          </div>
          <div class="row">
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
          <div class="row pt-4">
          <div class="col-2"></div>
            <div class="col-4">
            <h3>Pending Invites</h3>
            </div>
            <div class="col-4"></div>
            <div class="col-2"></div>
          </div>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <ReactTable
                columns={[
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "Organization",
                    accessor: "organization.name"
                  },
                  {
                    Header: '',
                    columns: [{
                      Header: '',
                      accessor: 'id',
                      Cell: row => (
                        <form onSubmit={this.submitRevoke}>
                          <button
                          class="btn"
                          type="submit"
                          name="revoke_invite_id"
                          value={row.value}
                          onClick={this.handleClick}>
                          REVOKE
                          </button>
                        </form>
                      )
                    }]
                  }
                ]}
                defaultPageSize="5"
                data={this.props.invites.invites}
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
