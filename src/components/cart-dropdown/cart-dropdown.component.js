import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component'

import { DropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('./checkout')
    }

    return (
        <DropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                        ) : (
                                <EmptyMessage>Your cart is empty</EmptyMessage>
                            )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </DropdownContainer>
    )
};

export default CartDropdown;