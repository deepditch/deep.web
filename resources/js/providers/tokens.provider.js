import ApiTokens from "../components/ApiTokens";
import ApiTokenForm from "../components/Form/apitoken-form";

import { connect } from "react-redux";

import {
  CreateTokensActionDispatcher,
  CreateAddTokenActionDispatcher,
  CreateDeleteTokenActionDispatcher
} from "../actions/tokens.actions";

import { TokensService } from "../services/tokens.service";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const TokensProvider = c => {
  c.register("TokensService", c => new TokensService(c.Axios));

  c.register("ApiTokenForm", c =>
    connect(
      store => {
        return {
          token: store.token
        };
       },
      dispatch => {
        return {
          addToken: CreateAddTokenActionDispatcher(c.TokensService, dispatch)
        };
      }
    )(ApiTokenForm)
  );

  c.register("ApiTokens", c =>
    connect(
      store => {
        return {
          tokens: store.tokens,
        };
      },
      dispatch => {
        return {
          getTokens: CreateTokensActionDispatcher(c.TokensService, dispatch),
          deleteToken: CreateDeleteTokenActionDispatcher(c.TokensService, dispatch)
        };
      }
    )(ApiTokens(c.ApiTokenForm))
  );
};
