import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import { CheckoutContainer, ImageContainer, Name, Quantity, Arrow, Value, Price, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem}) => {
    const { name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()


    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutContainer>
            <ImageContainer>
                <img src={imageUrl} width='100%' height='100%' alt={`${name}`} />
            </ImageContainer>
            <Name as='span'> {name}</Name>
            <Quantity as='span'> 
                <Arrow onClick={removeItemHandler}> &#10094;
                </Arrow>
                    <Value as='span'>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;
                </Arrow>
            </Quantity>
            <Price as='span'> {price}</Price>
            <RemoveButton onClick={clearItemHandler}> &#10005;</RemoveButton>
        </CheckoutContainer>
    )

}

export default CheckoutItem;