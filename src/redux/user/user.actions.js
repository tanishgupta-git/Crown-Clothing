import { UserActionTypes } from './user.types'
export const setCurrentuser = user => (
    {type: UserActionTypes.SET_CURRENT_USER,
    payload:user
}
);