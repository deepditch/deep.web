import Container from "./container";
import AuthService from "../services/auth";
import RegistrationForm from "../components/Form/registration-form";
import Register from "../components/register";
import LoginForm from "../components/Form/login-form";
import Login from "../components/login";
import Axios from "axios";
import { connect } from "react-redux";
import { authActions } from "../actions";

export default function createContainer() {
  var c = new Container();

  c.register("Axios", c => {
    let token = document.head.querySelector('meta[name="csrf-token"]');
    try {
      return Axios.create({
        baseURL: "/api/",
        headers: {
          "X-Requested-With": "XMLHttpRequest"
          //"X-CSRF-TOKEN": token.content
        }
      });
    } catch (err) {
      console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
      );
      console.error(err);
    }
  });

  // Register Services Here
  c.register("AuthService", c => new AuthService(c.Axios));

  c.register("RegistrationForm", c =>
    connect(
      null,
      authActions.register(c.AuthService)
    )(RegistrationForm)
  );
  c.register("Register", c => Register(c.RegistrationForm));

  c.register("LoginForm", c =>
    connect(
      null,
      authActions.login(c.AuthService)
    )(LoginForm)
  );
  c.register("Login", c => Login(c.LoginForm));

  return c;
}
