import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import RouteList from './pages/RouteList'
import RouteDetail from './pages/RouteDetail'
import RoutePieceDetail from './pages/RoutePieceDetail'
import DelegacionList from './pages/DelegacionList'
import ColoniaDetail from './pages/ColoniaDetail'
import BusinessDetail from './pages/BusinessDetail'
import Api from './pages/Api'
import Condiciones from './pages/Condiciones'
import OpenData from './pages/OpenData'
import PoligonosTiempoRecorrido from './pages/PoligonosTiempoRecorrido'
import Privacidad from './pages/Privacidad'
import NotFound from './pages/NotFound'

export default class Routes extends Component {

    render() {

        return (<Switch>
            <Route exact path='/' component={Home} />

            <Route exact path='/busqueda' render={(props) => ( <SearchResults {...props} onSetFrom={this.props.onSetFrom} onSetTo={this.props.onSetTo}/> )} />

            <Route exact path='/directorio' component={RouteList} />

            <Route exact path='/directorio/distrito-federal' component={DelegacionList} />
            <Route exact path='/directorio/estado-de-mexico' component={DelegacionList} />

            <Route exact path='/directorio/distrito-federal/:delegacion' component={DelegacionList} />
            <Route exact path='/directorio/estado-de-mexico/:delegacion' component={DelegacionList} />

            <Route exact path='/directorio/distrito-federal/:delegacion/:colonia' component={ColoniaDetail} />
            <Route exact path='/directorio/estado-de-mexico/:delegacion/:colonia' component={ColoniaDetail} />

            <Route exact path='/directorio/:type' component={RouteList} />
            <Route exact path='/directorio/:type/:name' component={RouteDetail} />
            <Route exact path='/directorio/:type/:route/:name' render={(props) => ( <RoutePieceDetail {...props} onSetTo={this.props.onSetTo}/> )} />

            <Route exact path='/negocio/:name/:id' render={(props) => ( <BusinessDetail {...props} onSetTo={this.props.onSetTo}/> )} />            

            <Route exact path='/opendata' component={OpenData} />
            <Route exact path='/api' component={Api} />
            <Route exact path='/poligonostiemporecorrido' component={PoligonosTiempoRecorrido} />
            <Route exact path='/privacidad' component={Privacidad} />
            <Route exact path='/condiciones' component={Condiciones} />
            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
        </Switch>);
    }
}