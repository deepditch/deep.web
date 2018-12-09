import React, { Component } from "react";
import ReactTable from "./react-table";

export default UserInviteForm =>
  class Users extends Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.submitRevoke = this.submitRevoke.bind(this);
      this.submitResend = this.submitResend.bind(this);
      this.submitDelete = this.submitDelete.bind(this);
      this.submitChangeRole = this.submitChangeRole.bind(this);
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

    submitResend(event) {
      event.preventDefault();
      this.props.resendInvite(this.state.resend_invite_id);
    }

    submitDelete(event) {
      event.preventDefault();
      this.props.deleteUser(this.state.delete_user_id);
    }

    submitChangeRole(event) {
      event.preventDefault();
      this.props.changeRole(this.state.changerole_user_id);
    }

    userRowButtons(id) {
      if(parseInt(id) != JSON.parse(localStorage.getItem("user")).id) {
        return (
          <div class="row center">
            <form class="margin-center" onSubmit={this.submitChangeRole}>
              <button
                class="btn"
                type="submit"
                name="changerole_user_id"
                value={id}
                onClick={this.handleClick}
              >
                CHANGE ROLE
              </button>
            </form>
            <form class="margin-center" onSubmit={this.submitDelete}>
              <button
                class="btn"
                type="submit"
                name="delete_user_id"
                value={id}
                onClick={this.handleClick}
              >
                X
              </button>
            </form>
          </div>
        );
      }
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
                accessor: "role",
                Cell: row=> {
                  return row.value.charAt(0).toUpperCase() + row.value.slice(1)
                }
              },
              {
                Header: "",
                columns: [
                  {
                    Header: "",
                    accessor: "id",
                    Cell: row => {
                      return this.userRowButtons(row.value);
                    }
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
                      <div class="row center">
                      <form class="margin-center" onSubmit={this.submitResend}>
                        <button
                          class="btn"
                          type="submit"
                          name="resend_invite_id"
                          value={row.value}
                          onClick={this.handleClick}
                        >
                          RESEND INVITE
                        </button>
                      </form>
                      <form class="margin-center" onSubmit={this.submitRevoke}>
                        <button
                          class="btn"
                          type="submit"
                          name="revoke_invite_id"
                          value={row.value}
                          onClick={this.handleClick}
                        >
                          X
                        </button>
                      </form>
                      </div>
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
