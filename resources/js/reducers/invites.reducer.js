import { InviteUserActionTypes } from "../actions/users.actions";

/**
 * Updates the invites list state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function InvitesReducer(state = { invites: [] }, action) {
  console.log(action.invites);
  switch (action.type) {
    case InviteUserActionTypes.INVITE_USER_ATTEMPT:
    case InviteUserActionTypes.LOAD_INVITES_ATTEMPT:
    case InviteUserActionTypes.REVOKE_INVITE_ATTEMPT:
    case InviteUserActionTypes.RESEND_INVITE_ATTEMPT:
      return { invites: [], pending: true };
    case InviteUserActionTypes.INVITE_USER_SUCCESS:
    case InviteUserActionTypes.LOAD_INVITES_SUCCESS:
    case InviteUserActionTypes.REVOKE_INVITE_SUCCESS:
    case InviteUserActionTypes.RESEND_INVITE_SUCCESS:
      return { invites: action.invites, success: true };
    case InviteUserActionTypes.INVITE_USER_FAILURE:
    case InviteUserActionTypes.LOAD_INVITES_FAILURE:
    case InviteUserActionTypes.REVOKE_INVITE_FAILURE:
    case InviteUserActionTypes.RESEND_INVITE_FAILURE:
      return { invites: [], rejected: true };
    default:
      return state;
  }
}
