//React Imports
import React, { Component } from 'react';
import './css/App.css';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
//Fetch/get middleware import
import axios from 'axios';

//JS Imports
import { apiKey } from './component/Key';
import SearchForm from './component/SearchForm';
//Button Navigation
import Nav from './component/Nav';
//Photo Contianer
import Gallery from './component/Gallery';
//404 page
import PageNotFound from './component/PageNotFound'



 class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      kitty: [],
      dog: [],
      search:'',
      computer: [],
      loading: true
    };
  } 

  //Life Cycle Methode that mounts original fetch
  componentDidMount() {
    this.performSearch();
    this.searchPuppy();
    this.searchComputer();
    this.searchKitty();
    }

  //Fetch Search results and set loading state to false
  

  searchPuppy = ( query = 'puppy' ) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      dog: response.data.photos.photo,
      loading: false,
    });
  })
     .catch(error => {
     console.log('Error fetching and parsing data', error);
     });
  }

  searchComputer = ( query = 'computer' ) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      computer: response.data.photos.photo,
      loading: false,
    });
  })
     .catch(error => {
     console.log('Error fetching and parsing data', error);
     });
  }
  
  searchKitty = ( query = 'kitty' ) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      kitty: response.data.photos.photo,
      loading: false,
    });
  })
     .catch(error => {
     console.log('Error fetching and parsing data', error);
     });
  }
  // This is called inside the SearchForm componant when a search is typed into the input

  performSearch = ( query ) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      photos: response.data.photos.photo,
      search: query,
      loading: false,
    });
  })
     .catch(error => {
     console.log('Error fetching and parsing data', error);
     });
  }
  //Render Compononts and passes props
  render (){
    console.log(this.state.photos);
    return (
       <BrowserRouter>
        <div className="container">
        {/* Search form is passed the axios function plus the empty string which gets update with the URL for browser history*/}
          <SearchForm onSearch={this.performSearch} query={this.state.search}/>
          
          <Nav />
          <Switch>
          {/* Search form is passed the axios function plus the empty string which gets update with the URL for browser history*/}
            <Route exact path="/" render={() => <Gallery value={this.state.kitty}/>} />
            
            <Route exact path="/cats" render={() => <Gallery value={this.state.kitty} />} />
            <Route exact path="/dogs" render={() => <Gallery value={this.state.dog} />} />
            <Route exact path="/computers" render={() => <Gallery value={this.state.computer} />} />
            
            <Route path="/search/:tags" render={({match}) => {this.performSearch(match.params.tags)
            
            return (<Gallery value={this.state.photos}/>);}} />


            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
