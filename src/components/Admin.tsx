import React from "react";
import axios from 'axios';

export interface IOrder {
    id: number
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: IOrderRow[];
}
export interface IOrderRow {
    id: number
    productId: number;
    orderId: number;
    amount: number;
}

export interface IAdminState {
    orders: IOrder[];
}

export default class Admin extends React.Component <{},IAdminState> {
    constructor(props: any) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=69')
            .then(res => {
                this.setState({orders: res.data});
            });
    }

    onDelete(idNr: number) {
        axios.delete(`https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${idNr}`, {headers: {"Content-Type": "application/json"}})
            .then(res => {
                console.log(res);
                axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=69')
                    .then(res => {
                        this.setState({orders: res.data});
                    });
            });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.orders.map((order:IOrder) =>
                    <ul key={order.id} className="orders">
                        <h2>Created By:{order.createdBy}</h2>
                        <button onClick={() => this.onDelete(order.id)}>Delete Order</button>
                        {order.orderRows.map((item: IOrderRow) => <ul key={item.id}>
                            <p>Id:{item.orderId}</p>
                            <p>Product Id:{item.productId}</p>
                            <p>Amount:{item.amount}</p>
                        </ul>)}
                    </ul>)}
            </React.Fragment>
        );
    }
}