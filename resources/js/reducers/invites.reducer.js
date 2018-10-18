import { InviteUserActionTypes } from "../actions/users.actions";

/**
 * Updates the invites list state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function InvitesReducer(state = { invites: [] }, action) {
  switch (action.type) {
    case InviteUserActionTypes.LOAD_INVITES_ATTEMPT:
      return { invites: [], pending: true };
    case InviteUserActionTypes.LOAD_INVITES_SUCCESS:
      return { invites: action.invites, success: true };
    case InviteUserActionTypes.LOAD_INVITES_FAILURE:
      return { invites: [], rejected: true };
    default:
      return state;
  }
}