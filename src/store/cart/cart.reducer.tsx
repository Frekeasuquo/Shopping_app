import { AnyAction } from "redux";

import { setCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
}

// Reducer shouldn't handle any business logic, it should only worry about updating the state.
export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {

    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        }
    }

    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        }
    }

    return state;

}
