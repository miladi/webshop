import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import {CartContext, ICart} from "./CartContext";
import Search from "./Search";

export interface IMovie {
    id: number;
    name: string;
    price: number
    imageUrl: string;
    productCategory: [{
        categoryId: number;
        category: null;
    }];
}

export default function Home () {
    const [cart, setCart]= useContext(CartContext);
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        axios.get('http://medieinstitutet-wie-products.azurewebsites.net/api/products')
            .then(res => {
                setMovies(res.data);
            });
    },[]);

    useEffect(() => {
        axios
            .get(`https://medieinstitutet-wie-products.azurewebsites.net/api/categories`)
            .then(res =>{
                setCategories(res.data);
            });
    }, []);

    const onBuy = (movie: IMovie) => {
        if (cart.find((a : ICart): boolean => a.ProductId === movie.id))
            return;
        setCart((curr: ICart[]) => [...curr, {ProductId: movie.id, OrderId: movie.price, Amount: 1}]);
    };

    const handleSelected = (e: any) => {
        let genre = movies.filter((movie: IMovie) => (movie.productCategory || []).find(item => item.categoryId === +e.target.value));
        setGenre(genre);
    };

    return(
        <React.Fragment>
            <Search movies={movies}/>
            <div className='category'>
                <select onChange={handleSelected}>
                    {categories.map((category: IMovie) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <ul>
                    {genre.map((item: IMovie) => <li key={item.id}>{item.name}</li>)}
                </ul>
            </div>
            <div className='containter'>
                <div className='items'><h2>In Cart: {cart.length} Item(s)</h2></div>
                <ul className='movies'>
                    {movies.map((movie: IMovie) =>
                        <li className='list' key={movie.id}>
                            <img src={movie.imageUrl} alt="Movie" height="400" width="250" />
                            <button className={`buy${movie.id}`} onClick={() => onBuy(movie)}>Buy {movie.price}kr ID:{movie.id}</button>
                            <p>{movie.name}</p>
                        </li>)}
                </ul>
            </div>
        </React.Fragment>
    )
}