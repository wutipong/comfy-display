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

	import { onMount } from 'svelte';
	import { comfyUrlWritable, pushyAppIdWritable } from '$lib/store';
	import { get } from 'svelte/store';

	onMount(() => {
		comfyURL = get(comfyUrlWritable);
		pushyAppId = get(pushyAppIdWritable);
	});

	function onStartBtn() {
		comfyUrlWritable.set(comfyURL);
		pushyAppIdWritable.set(pushyAppId);
	}

	let comfyURL = '';
	let pushyAppId = '';
</script>

<Navbar dark expand="md" container="md">
	<NavbarBrand href="/">ComfyUI Display</NavbarBrand>
	<Nav class="ms-auto" navbar>
		<NavItem>
			<NavLink on:click={onStartBtn}><Icon name="play" />&nbsp;Begin</NavLink>
		</NavItem>
	</Nav>
</Navbar>

<Container>
	<h2>ComfyUI Settings</h2>
	<Form>
		<FormGroup>
			<Label>ComfyUI URL</Label>
			<Input type="url" placeholder="http://127.0.0.1:8188/" bind:value={comfyURL} />
		</FormGroup>
	</Form>

	<h2>Pushy Settings</h2>
	<Form>
		<FormGroup>
			<Label>App ID</Label>
			<Input type="text" placeholder="ffffffffffffffffffffffff" bind:value={pushyAppId} />
		</FormGroup>
	</Form>
</Container>
