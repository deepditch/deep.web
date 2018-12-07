import Users from "../components/Users";
import UserInviteForm from "../components/Form/userinvite-form";

import { connect } from "react-redux";

import {
  CreateUsersActionDispatcher,
  CreateInvitesActionDispatcher,
  CreateInviteUserActionDispatcher,
  CreateRevokeInviteActionDispatcher,
  DeleteUserDispatcher
} from "../actions/users.actions";

import { UsersService } from "../services/users.service";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const UsersProvider = c => {
  c.register("UsersService", c => new UsersService(c.Axios));

  c.register("UserInviteForm", c =>
    connect(
      store => {
        return {};
       },
      dispatch => {
        return {
          inviteUser: CreateInviteUserActionDispatcher(c.UsersService, dispatch),
        };
      }
    )(UserInviteForm)
  );

  c.register("Users", c =>
    connect(
      store => {
        return {
          users: store.users,
          invites: store.invites
        };
      },
      dispatch => {
        return {
          getUsers: CreateUsersActionDispatcher(c.UsersService, dispatch),
          getInvites: CreateInvitesActionDispatcher(c.UsersService, dispatch),
          revokeInvite: CreateRevokeInviteActionDispatcher(c.UsersService, dispatch),
          deleteUser: DeleteUserDispatcher(c.UsersService, dispatch)
        };
      }
    )(Users(c.UserInviteForm))
  );
};
