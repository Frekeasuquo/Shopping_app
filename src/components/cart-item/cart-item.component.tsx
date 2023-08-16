import { FC } from 'react';

import { CartItemContainer, ItemDetails, Name } from './cart-item.styles';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
    cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { name, imageUrl, price,  quantity } = cartItem;

    return (
        <CartItemContainer>
            <img width='30%' src={imageUrl} alt ={`${name}`}/>
            <ItemDetails>
                <Name as='span'>{name}</Name>
                <span className='price'>{quantity} * ${price}</span>
            </ItemDetails>
            
        </CartItemContainer>
    )
}

export default CartItem;
