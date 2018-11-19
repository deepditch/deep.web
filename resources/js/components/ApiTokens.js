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
      console.log(this.props);
      return (
        <div class="container container-md">
          <div class="divide-30" />
          <div class="row">
            <div class="col-6">
              <h1 class="h3">API Tokens</h1>
            </div>
            <div class="col-6">
              <ApiTokenForm />
            </div>
          </div>
          <div class="row">
          {
            (this.props.tokens.token) &&
              <div>Please copy this token! This will be the only time you will be able to view it. If its lost, you will need to generate a new token
              <textarea readonly cols="100">{this.props.tokens.token.jwt}</textarea></div>
          }
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
            data={this.props.tokens.tokens.data}
            className="-striped -highlight"
          />
        </div>
      );
    }
  };
