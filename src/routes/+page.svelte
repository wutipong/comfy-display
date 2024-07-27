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
		Container,
		Table,
		Button
	} from '@sveltestrap/sveltestrap';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { comfyUrlWritable, comfyHeadersWritable, pushyAppIdWritable } from '$lib/store';

	onMount(() => {});

	function onStartBtn() {
		goto('/view');
	}
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
			<Input type="url" placeholder="http://127.0.0.1:8188/" bind:value={$comfyUrlWritable} />
		</FormGroup>
		<Label>Request Headers</Label>
		<Table>
			<thead>
				<th>Field</th>
				<th>Value</th>
				<th>Action</th>
			</thead>
			<tbody>
				{#each $comfyHeadersWritable as header}
					<tr>
						<td><Input bind:value={header.field} /></td>
						<td><Input bind:value={header.value} /></td>
						<td><Button><Icon name="minus" /></Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
		<Button><Icon name="plus"></Icon></Button>
	</Form>

	<h2>Pushy Settings</h2>
	<Form>
		<FormGroup>
			<Label>App ID</Label>
			<Input type="text" placeholder="ffffffffffffffffffffffff" bind:value={$pushyAppIdWritable} />
		</FormGroup>
	</Form>
</Container>
