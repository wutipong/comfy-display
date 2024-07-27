<script lang="ts">
	import {
		Navbar,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Icon,
		Form,
		FormGroup,
		Input,
		Label,
		Container
	} from '@sveltestrap/sveltestrap';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Navbar dark expand="md" container="md">
	<NavbarBrand href="/">ComfyUI Display</NavbarBrand>
	<Nav class="ms-auto" navbar></Nav>
</Navbar>

<Container>
	{#if data.imageUrl.length === 0}
		<p>Emtpy data. Wait for incoming notifications.</p>
	{/if}
</Container>
