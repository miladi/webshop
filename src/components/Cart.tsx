import React, {useContext, useState} from "react";
import {CartContext, ICart} from "./CartContext";
import axios from 'axios'

export default function Cart () {
    let today: any = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [cart, setCart]= useContext(CartContext);
    const total = cart.reduce((a: number, b: { Amount: number; OrderId: number; }) => a + (b.Amount * b.OrderId), 0);
    const [basket] = useState({
        companyId: 69,
        created: today,
        createdBy: "Milad",
        paymentMethod: "MasterCard",
        totalPrice: total,
        status: 2,
        orderRows: cart
    });

    const onMore = (item: ICart) => {
        const found = cart.find((a:ICart):boolean => a.ProductId === item.ProductId);
        found.Amount++;
        const buy = cart.map((item: ICart) => item);
        setCart(buy);
    };

    const onLess = (item: ICart) => {
        const found = cart.find((a: ICart): boolean => a.ProductId === item.ProductId);
        if (found.Amount <= 0) {
            return;
        } else {
            found.Amount--;
        }
        const buy = cart.map((item: ICart) => item);
        setCart(buy);
    };

    const onRemove = (item: ICart) => {
        const filter = cart.filter((a: ICart): boolean => a.ProductId !== item.ProductId);
        setCart(filter);
    };

    const onSend = () => {
        axios.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', JSON.stringify(basket), {headers: {"Content-Type": "application/json"}})
            .then(res => {
                console.log(res);
            });
    };

    const userInfo = (e: { target: { value: string; }; }) => {
        basket.createdBy = e.target.value;
    };

    return(
        <div className='basket'>
            <ul>
                {cart.map((item: ICart) => <li key={item.ProductId}>
                    <p>Movie ID: {item.ProductId}</p>
                    <p>Units: {item.Amount}</p>
                    <button onClick={() => onMore(item)}>+</button>
                    <button onClick={() => onLess(item)}>-</button>
                    <button onClick={() => onRemove(item)}>x</button>
                </li>)}
            </ul>
            <div className='total'><h3>Total: {total}kr</h3></div>
            <input type='text' placeholder=' Enter Your Name' onChange={userInfo}/>
            <button onClick={onSend}>Send Order</button>
        </div>
    );
};