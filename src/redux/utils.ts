import { Action } from 'redux';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

interface ActionsHandlers<S> {
  [key: string]: (state: S, action: any) => S;
}

export function createReducer<TState>(initialState: TState, handlers: ActionsHandlers<TState>) {
  return function (state: TState, action: Action) {
    state ??= initialState;
    const handler = handlers[action.type];
    return handler?.(state, action) ?? state;
  };
}
