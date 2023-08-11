import { CartItemContainer, ItemDetails, Name } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
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
