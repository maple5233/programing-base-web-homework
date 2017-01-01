import App from './App.vue'
import loginBox from './components/loginBox.vue'
import manager from './components/manager.vue'
import product from './components/product.vue'
import history from './components/orderHistory.vue'

export default [
{
	path: '/',
	name: 'home',
	redirect: 'login',
	meta: {
		requiresAuth: true,
		requiresRoot: false
	}
}, 
{
	path: '/login',
	name: 'login',
	component: loginBox,
	meta: {
		requiresAuth: false,
		requiresRoot: false
	}
},
{
	path: '/manager',
	name: 'manager',
	component: manager,
	meta: {
		requiresAuth: true,
		requiresRoot: true
	}
},
{
	path: '/product',
	name: 'product',
	component: product,
	meta: {
		requiresAuth: true,
		requiresRoot: false
	}
},
{
	path: '/history',
	name: 'history',
	component: history,
	meta: {
		requiresAuth: true,
		requiresRoot: false
	}
}
]
