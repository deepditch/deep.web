import Container from "./container";
import { AuthService } from "../services/";
import Axios from "axios";
import {
  LoginProvider,
  RegisterProvider,
  NotifyProvider,
  DamageProvider
} from "../providers";
import { UsersProvider } from "../providers/users.provider";
import AuthorizedRoute from "../components/PrivateRoute";
import { connect } from "react-redux";

/**
 * Creates an IoC container that manages and injects dependencies.
 */
export default function createContainer() {
  var c = new Container();

  // Register dependencies. Order doesn't matter
  c.register("Axios", c => {
    let token = document.head.querySelector('meta[name="csrf-token"]');
    try {
      var instance = Axios.create({
        baseURL: "/api/",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": token.content
        }
      });

      instance.interceptors.request.use(function(config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      });

      return instance;
    } catch (err) {
      console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
      );
      console.error(err);
    }
  });

  c.register("AuthService", c => new AuthService(c.Axios));

  c.register("AuthorizedRoute", c =>
    connect(
      store => {
        return { loggedIn: store.user.loggedIn };
      },
      null,
      null,
      {
        pure: false
      }
    )(AuthorizedRoute)
  );

  LoginProvider(c);
  RegisterProvider(c);
  NotifyProvider(c);
  DamageProvider(c);
  UsersProvider(c);

  return c;
}
