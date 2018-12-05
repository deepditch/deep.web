

export default AuthService =>
  class ResetPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Password: "",
        PasswordConfirmation: "",
        msg: ""
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      AuthService.resetPassword(this.state.Password, this.props.match.params.token)
        .then(response => {
          this.setState({
            msg: "Your password has been reset."
          });
        })
        .catch(error => {
          this.setState({
            msg: "We failed to reset your password."
          });
        });
    }

    render() {
      return (
        <div class="index-container">
          <div class="container container-sm">
            <form class="login-form block-medium" onSubmit={this.handleSubmit}>
              <header>
                <h1 class="h4">Reset Your Password</h1>
                <p>
                  Enter a new password for your account.
                </p>
              </header>

              <InputGroup
                name="Password"
                type="password"
                required={true}
                onChange={this.handleInputChange}
                placeholder="Enter Your New Password"
              />

              <InputGroup
                name="PasswordConfirmation"
                type="password"
                required={true}
                onChange={this.handleInputChange}
                placeholder="Confirm Your New Password"
              />

              {this.state.msg ? (
                <p>{this.state.msg}</p>
              ) : (
                <button class="btn link">Reset Your Password</button>
              )}
            </form>
          </div>
        </div>
      );
    }
  }
