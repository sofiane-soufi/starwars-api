import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            currentPage: 'planets',
            user: '',
            loading: true,
            result: ''
        };
    }


    changePage(page, args = ''){

        if(page == 'search'){
            args += '&search='+this.state.user;
        }

        this.setState({loading: true, currentPage: page});

        fetch('http://localhost:8888/'+page+'?'+args)
            .then(results => {
                return results.json();
            }).then(results => {
                this.setState({result: results, loading: false});
        });
    }

    componentDidMount(){
        this.changePage(this.state.currentPage);
    }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Star Wars API</h1>
            <ul className={"App-menu"}>
                <li><a href="#" onClick={() => { this.changePage('planets') }}>Planets</a></li>
                <li><a href="#" onClick={() => { this.changePage('starships') }}>Starships</a></li>
                <li><a href="#" onClick={() => { this.changePage('people') }}>People</a></li>
                <li><input type={"text"} onChange={(event) => { this.setState({user: event.target.value}) }}/> <input type={"submit"} value={"search"} onClick={() => { this.changePage('search') }}/></li>
            </ul>
        </header>
        <p className="App-intro">

            {this.state.loading && <p>
            Loading...</p>}

            {!this.state.loading &&
                <div>

                    {this.state.result.results.map((result) => {

                        return (<p>{result.name}</p>)

                    })}

                    {(this.state.result.previous != null) &&
                    <a className={"pagination"} href={"#"} onClick={() => {this.changePage(this.state.currentPage, 'page='+this.state.result.previous.substr(-1))}}>Previous page</a>
                    }

                    {(this.state.result.next != null) &&
                    <a className={"pagination"} href={"#"} onClick={() => {this.changePage(this.state.currentPage, 'page='+this.state.result.next.substr(-1))}}>Next page</a>
                    }

                </div>
            }
        </p>
      </div>
    );
  }
}

export default App;
