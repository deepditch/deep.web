import Container from "./container";
import { AuthService } from "../services/";
import Axios from "axios";
import {
  LogoutProvider,
  LoginProvider,
  RegisterProvider,
  NotifyProvider,
  DamageProvider,
  TokensProvider,
  UsersProvider,
  ForgotPasswordProvider
} from "../providers";
import AuthorizedRoute from "../components/authorized-route";
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
        var token = localStorage.getItem("token");
        if (token) {
          if (token.includes("Bearer")){
            token = localStorage.getItem("token");
          } else {
            token = `Bearer ${token}`;
          }
        }
        config.headers.Authorization = token;

        return config;
      });

      instance.interceptors.response.use(function (response) {
        if (response.headers.authorization) {
          localStorage.setItem("token", response.headers.authorization);
        }
        return response;
      }, function (error) {
        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          location.reload();
        }
        return error;
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

  LogoutProvider(c);
  LoginProvider(c);
  RegisterProvider(c);
  NotifyProvider(c);
  DamageProvider(c);
  UsersProvider(c);
  TokensProvider(c);
  ForgotPasswordProvider(c);

  return c;
}
