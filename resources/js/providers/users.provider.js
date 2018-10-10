import Users from "../components/Users";
import { connect } from "react-redux";

import { CreateUsersActionDispatcher } from "../actions/users.actions";

import { UsersService } from "../services/users.service";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const UsersProvider = c => {
  c.register("UsersService", c => new UsersService(c.Axios));

  c.register("Users", c =>
    connect(
      store => {
        return {
          users: store.users,
        };
      },
      dispatch => {
        return {
          getUsers: CreateUsersActionDispatcher(c.UsersService, dispatch)
        };
      }
    )(Users)
  );
};
