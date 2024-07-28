<script lang="ts">
	import {
		Carousel,
		CarouselControl,
		CarouselIndicators,
		CarouselItem,
		Container,
		Icon,
		Nav,
		Navbar,
		NavbarBrand,
		NavItem,
		NavLink
	} from '@sveltestrap/sveltestrap';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { comfyURL } from '$lib/config';

	export let data: PageData;

	let activeIndex = 0;

	const pollInterval = 15_000;

	onMount(() => {
		const interval = setInterval(() => invalidateAll(), pollInterval);
		return () => clearInterval(interval);
	});
</script>

<Navbar dark expand="md" container="md">
	<NavbarBrand href="/">ComfyUI Display</NavbarBrand>
	<Nav class="ms-auto" navbar>
		<NavItem>
			<NavLink href={comfyURL} target="_blank">
				<Icon name="robot" />
				&nbsp;ComfyUI
			</NavLink>
		</NavItem>
	</Nav>
</Navbar>

{#if data.imageUrls.length === 0}
	<Container>
		{#if data.error === undefined}
			<p>Latest workflow does not contains images or no workflow has been running.</p>
		{/if}

		{#if data.error !== undefined}
			<p>{data.error}</p>
		{/if}
	</Container>
{/if}

{#if data.imageUrls.length > 0}
	<div class="fullscreen" style="padding-top:60px;">
		<Carousel pause={false} items={data.imageUrls} bind:activeIndex class="w-100 h-100">
			<CarouselIndicators bind:activeIndex items={data.imageUrls} />
			<div class="carousel-inner w-100 h-100">
				{#each data.imageUrls as url, index}
					<CarouselItem bind:activeIndex itemIndex={index} class="w-100 h-100">
						<a href={url.toString()} target="_blank">
							<img
								src={url.toString()}
								class="d-block h-100 ms-auto me-auto"
								alt="img #{index + 1}"
							/>
						</a>
					</CarouselItem>
				{/each}
			</div>

			<CarouselControl direction="prev" bind:activeIndex items={data.imageUrls} />
			<CarouselControl direction="next" bind:activeIndex items={data.imageUrls} />
		</Carousel>
	</div>
{/if}
