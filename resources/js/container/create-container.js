import Container from "./container";
import AuthService from "../services/auth";
import Axios from "axios";
import { LoginProvider, RegisterProvider, NotifyProvider } from "../providers";

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

  c.register("AuthService", c => new AuthService(c.Axios));

  LoginProvider(c);
  RegisterProvider(c);
  NotifyProvider(c);

  return c;
}
