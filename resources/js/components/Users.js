import React, { Component } from "react";
import ReactTable from "./react-table";

export default UserInviteForm =>
  class Users extends Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.submitRevoke = this.submitRevoke.bind(this);
      this.submitDelete = this.submitDelete.bind(this);
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

    submitDelete(event) {
      event.preventDefault();
      this.props.deleteUser(this.state.delete_user_id);
    }

    render() {
      return (
        <div class="container container-md block-top block-bottom">
          <div class="row">
            <div class="col-6">
              <h1 class="h3">Users</h1>
            </div>
            <div class="col-6">
              <UserInviteForm />
            </div>
          </div>

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
              {
                Header: "",
                columns: [
                  {
                    Header: "",
                    accessor: "id",
                    Cell: row => (
                      <form onSubmit={this.submitDelete}>
                        <button
                          class="btn"
                          type="submit"
                          name="delete_user_id"
                          value={row.value}
                          onClick={this.handleClick}
                        >
                          DELETE
                        </button>
                      </form>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize="5"
            data={this.props.users.users}
            className="-striped -highlight"
          />

          <div class="divide-30" />
          <h1 class="h3">Pending Invites</h1>

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
                Header: "",
                columns: [
                  {
                    Header: "",
                    accessor: "id",
                    Cell: row => (
                      <form onSubmit={this.submitRevoke}>
                        <button
                          class="btn"
                          type="submit"
                          name="revoke_invite_id"
                          value={row.value}
                          onClick={this.handleClick}
                        >
                          REVOKE
                        </button>
                      </form>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize="5"
            data={this.props.invites.invites}
            className="-striped -highlight"
          />
        </div>
      );
    }
  };
