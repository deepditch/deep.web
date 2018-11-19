import React, { Component } from "react";
import ReactTable from "./react-table";

export default ApiTokenForm =>
  class ApiTokens extends Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.submitRevoke = this.submitRevoke.bind(this);
    }

    componentDidMount() {
      this.props.getTokens();
    }

    handleClick(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    submitRevoke(event) {
      event.preventDefault();
      this.props.deleteToken(this.state.delete_token_id);
    }

    render() {
      return (
        <div class="container container-md">
          <div class="divide-30" />
          <div class="row">
            <div class="col-6">
              <h1 class="h3">API Tokens</h1>
            </div>
            <div class="col-6">
              <UserInviteForm />
            </div>
          </div>
          <ReactTable
            columns={[
              {
                Header: "ID",
                accessor: "id"
              },
              {
                Header: "Name",
                accessor: "name"
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
                          name="delete_token_id"
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
            data={this.props.tokens.tokens}
            className="-striped -highlight"
          />

        </div>
      );
    }
  };
