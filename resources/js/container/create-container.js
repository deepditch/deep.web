import Container from "./container";
import AuthService from "../services/auth";
import RegistrationForm from "../components/Form/registration-form";
import Register from "../components/register";
import Axios from "axios";

export default function createContainer() {
  var c = new Container();

  c.register("Axios", c => {
    let token = document.head.querySelector('meta[name="csrf-token"]');
    try {
      return Axios.create({
        baseURL: "http://127.0.0.1:8000",
        headers: {
          "X-Requested-With": "XMLHttpRequest"
          //"X-CSRF-TOKEN": token.content
        }
      });
    } catch (err) {
      console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token");
      console.error(err);
    }
  });

  // Register Services Here
  c.register("AuthService", c => AuthService(c.Axios));
  c.register("RegistrationForm", c => RegistrationForm(c.AuthService));
  c.register("Register", c => Register(c.RegistrationForm));

  return c;
}
