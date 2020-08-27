import React from "react";
import axios from 'axios';
import {IMovie} from "./Home";
import Loader from '../components/loading.gif';

export interface IMovieProps {
    movies: IMovie[];
}

interface ISearchState {
    query: string[] | string;
    result: any;
    loading: boolean;
    message: string;
}

export default class Search extends React.Component <IMovieProps, ISearchState>{
    private cancel: any;
    constructor(props: IMovieProps) {
        super(props);
        this.state = {
            query: [],
            result: {},
            loading: false,
            message: ''
        };
    }

    fetchSearchResults = (query:string) => {
        const searchUrl = `https://medieinstitutet-wie-products.azurewebsites.net/api/search?=${query}`;

        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl)
            .then(res => {
                const resultNotFound = !res.data.length ? 'There are no results!' : '';
                this.setState({result: res.data, message: resultNotFound,loading: false});
            });
    };

    handleOnInputChange = (event: { target: { value: string; }; }) => {
        const query = event.target.value;
        if (!query) {
            this.setState({query: query, result: {}, message: ''});
        }
        else {
            this.setState({query: query, loading: true, message: ''}, () => this.fetchSearchResults(query));
        }
    };

    renderSearchResults = () => {
        const {result} = this.state;
        if (Object.keys(result).length && result.length) {
            return(
                <div>
                    {result.map((result: { id:  number; name: string; imageUrl: string; }) => {
                        return(
                            <div key={result.id}>
                                <h4>{result.name}</h4>
                                <img src={result.imageUrl} alt="Movie" height="400" width="250" />
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    render() {
        const {query, loading, message} = this.state;
        return(
            <div className='searchBar'>
                <input className='search' type='text' value={query} placeholder='Search...' onChange={this.handleOnInputChange}/>
                {message && <h2>{message}</h2>}
                <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt='Looder gif'/>
                {this.renderSearchResults()}
            </div>
        );
    }
}