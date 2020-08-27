import React, {Context, createContext, useState} from "react";

export interface ICart {
    ProductId: number;
    OrderId: number;
    Amount: number;
}

const defaultCart: ICart[] = [];

export const CartContext: Context <any> = createContext([]);

export const CartProvider = (props: any) => {
    const [cart, setCart] = useState(defaultCart);

    return(
        <CartContext.Provider value={[cart,setCart]}>
            {props.children}
        </CartContext.Provider>
    );
};