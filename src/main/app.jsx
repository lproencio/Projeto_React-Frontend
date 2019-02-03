import React  from 'react'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import {HashRouter} from 'react-router-dom'

import Routes from './routes'
import Logo from '../components/template/logo'
import Nav from '../components/template/nav'
import Footer from '../components/template/footer'

export default props =>
<HashRouter>
  <div className ="app">
    <Logo />
    <Nav />
    <Routes />
    <Footer />
  </div>
</HashRouter>
