// import React from 'react'
// import { render } from 'react-dom'
// import { HashRouter } from 'react-router-dom'
// import Routers from './pages'
// import 'main.scss'
//
// class App extends React.Component {
// 	render() {
// 		return (
// 			<HashRouter>
// 				<Routers />
// 			</HashRouter>
// 		)
// 	}
// }
//
// render(<App/>, document.getElementById('app'))

import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routers'
import 'main.scss'

Vue.use(VueRouter)

new Vue({
	router,
}).$mount('#app');

