import App from '../App.vue'

const home = r => require.ensure([], () => r(require('../pages/home/index')), 'home')

export default [{
	path: '/',
	component: App,
	children: [
		{
			path: '',
			redirect: '/home'
		}
	]

}]

