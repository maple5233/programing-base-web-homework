import App from './App.vue'
import loginBox from './components/loginBox.vue'
import manager from './components/manager.vue'

export default [
{
	path: '/',
	name: 'home',
	redirect: 'login',
	meta: {
		requiresAuth: true,
	}
}, 
{
	path: '/login',
	name: 'login',
	component: loginBox,
	meta: {
		requiresAuth: false,
	}
},
{
	path: '/manager',
	name: 'manager',
	component: manager,
	meta: {
		requiresAuth: false
	}
}
]
