import React, { Component } from 'react';
import './App.css';

import SearchBox from './SearchBox'

import request from "superagent";

import { Button } from 'semantic-ui-react'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false, results: [] };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  onSearchReady = (params) => {
    this.searchOnServer(params);
  }

  searchOnServer = (params) => {
    request.get("https://viadf.mx/service/search")
      .query({ de: params.from.lat() + "," + params.from.lng() })
      .query({ a: params.to.lat() + "," + params.to.lng() })
      .query({ key: '0NSlW6dbj57EoyH3i0yQ3yI575kI8mb4' })
      .end((err, res) => {
        console.log(res.body.Results)
        this.setState({ results: res.body.Results });
      });
  }

  render() {

    return (
      <div className="App">        
       
        <header className="App-header">
          <h1 className="App-title">Buscador del Transporte Público - Ciudad de México</h1>
        </header>
        <div>
          <div>
            <SearchBox onReady={this.onSearchReady} />
          </div>
          <div>
            <div>
              {
                this.state.results.map((r) =>
                  <div>
                    {r.Start.Name || "Origen"}
                    {
                      r.Items.map((i) =>
                        <div>
                          {i.Type.Name}
                        </div>
                      )
                    }
                    {r.End.Name || "Destino"}
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <Button>Testbutton</Button>
      </div>
    );
  }
}

export default App;
