import React, { createContext, useReducer } from "react";
import users from "../data/Users";
import { Alert } from "react-native";

interface UsersContextProps {
    state?: { users?: any[] },
    dispatch?: any
}

const initialUsers = { users }

const UsersContext = createContext<UsersContextProps>({});

const actions: any = {
    createUser(state: any, action: any) {
        const user = action.payload
        user.id = Math.random()

        return {
            ...state,
            users: [...state.users, user]
        }
    },
    updateUser(state: any, action: any) {
        const user = action.payload
        
        return {
            ...state,
            users: state.users.map((u: any) => u.id === user.id ? user : u)
        }
    },
    deleteUser(state: any, action: any) {
        const user = action.payload

        return {
            ...state,
            users: state.users.filter((u: any) => u.id !== user.id)
        }
    }
}

export function UsersProvider({ children }: any) {

    function reducer(state: any, action: any): any {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }



    const [state, dispatch] = useReducer(reducer, initialUsers)

    return (
        <UsersContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </UsersContext.Provider>
    );
}

export default UsersContext;