import Container from "./container";
import AuthService from "../services/auth";
import RegistrationForm from "../components/Form/registration-form";
import Register from "../components/register";
import LoginForm from "../components/Form/login-form";
import Login from "../components/login";
import Axios from "axios";

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
  c.register("AuthService", c => AuthService(c.Axios));

  c.register("RegistrationForm", c => RegistrationForm(c.AuthService));
  c.register("Register", c => Register(c.RegistrationForm));

  c.register("LoginForm", c => LoginForm(c.AuthService));
  c.register("Login", c => Login(c.LoginForm));

  return c;
}
