<script>
	import { Router, Link, Route } from 'svelte-routing';
	import Home from './Home.svelte';
	import Country from './Country.svelte';
</script>

<main>
	<Router>
		<nav>
			<Link to='home'>Home</Link>
			<Link to='country'>Countries</Link>
		</nav>
		<Route path='home' component={Home}></Route>
		<Route path='country' component={Country}></Route>
	</Router>
</main>