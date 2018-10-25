
// Helper method for creating a middleware that handles the given set of actions
export default function CreateMiddleware(handlers) {
  return storeAPI => next => action => {
    const actionHandler = handlers.find(h => h.action === action.type);
    // Execute custom middleware handler before the action is dispatched
    if (actionHandler && actionHandler.before) {
      actionHandler.before(storeAPI, action);
    }
    // Dispatch the action
    const result = next(action);
    // Execute custom middleware handler after the action is dispatched
    if (actionHandler && actionHandler.after) {
      actionHandler.after(storeAPI, action);
    }
    return result;
  }
}
