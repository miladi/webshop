import React from "react";
import {IMovieProps} from "./Search";
import axios from "axios";

export default class Categories extends React.Component <IMovieProps, any>{
    constructor(props: IMovieProps) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/categories')
            .then(res => {
                this.setState({data: res.data});
            });
    }

    onTest = () => {
        const test = this.props.movies.map(item => item);
        console.log(test);
    };


    render() {
        return(
            <React.Fragment>
                <ul className='category'>
                    <button onClick={this.onTest}>test</button>
                    <h4>Genres</h4>
                    <li>All</li>
                    <li>Action</li>
                    <li>Thriller</li>
                    <li>Comedy</li>
                    <li>Sci-fi</li>
                </ul>
            </React.Fragment>
        );
    }
}