<script lang="ts">
	import {
		Card,
		CardHeader,
		CardBody,
		Container,
		Icon,
		Nav,
		Navbar,
		NavbarBrand,
		NavItem,
		NavLink
	} from '@sveltestrap/sveltestrap';

	import { onMount, onDestroy } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { comfyURL } from '$lib/config';
	import type { PageData } from './$types';

	export let data: PageData;

	let activeIndex = 0;
	let carousel: bootstrap.Carousel;
	let refreshInterval: number;

	const pollInterval = 15_000;

	onMount(async () => {
		const bootstrap = await import('bootstrap');

		refreshInterval = setInterval(() => invalidateAll(), pollInterval);

		let carouselControl = document.querySelector('#carouselControl');

		if (carouselControl) {
			carousel = new bootstrap.Carousel(carouselControl, {
				keyboard: false,
				pause: false,
				ride: 'carousel'
			});
		}
	});

	onDestroy(() => {
		clearInterval(refreshInterval);
	});

	let pauseIcon: 'pause' | 'play' = 'pause';
	function togglePause(e: MouseEvent): void {
		switch (pauseIcon) {
			case 'pause':
				pauseIcon = 'play';
				carousel.pause();
				break;

			case 'play':
				pauseIcon = 'pause';
				carousel.cycle();
				break;
		}
	}
</script>

<svelte:head>
	<title>ComfyUI Display</title>
</svelte:head>

<Navbar dark expand="md" container="md">
	<NavbarBrand href="/">ComfyUI Display</NavbarBrand>
	<Nav class="ms-auto" navbar>
		<NavItem>
			<NavLink on:click={togglePause}>
				<Icon bind:name={pauseIcon} />
			</NavLink>
		</NavItem>
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
			<Card color="warning">
				<CardHeader>
					<Icon name="exclamation-circle" />&nbsp; Workflow contains no images
				</CardHeader>
				<CardBody>
					Latest workflow does not contains images or no workflow has been running.
				</CardBody>
			</Card>
		{/if}

		{#if data.error !== undefined}
			<Card color="danger">
				<CardHeader>
					<Icon name="exclamation-triangle-fill" />&nbsp; Cannot connect to ComfyUI
				</CardHeader>
				<CardBody>
					{data.error}
				</CardBody>
			</Card>
		{/if}
	</Container>
{/if}

{#if data.imageUrls.length > 0}
	<div class="fullscreen" style="padding-top:60px;">
		<div class="carousel slide w-100 h-100" id="carouselControl">
			<div class="carousel-indicators">
				{#each data.imageUrls as _, index}
					<button
						type="button"
						data-bs-target="#carouselControl"
						data-bs-slide-to={index}
						class:active={index == activeIndex}
						aria-current={index == activeIndex}
						aria-label="Slide {index}"
					></button>
				{/each}
			</div>

			<div class="carousel-inner w-100 h-100" id="carousel" style="width:100%; height:100%;">
				{#each data.imageUrls as url, index}
					<div class="carousel-item w-100 h-100" class:active={index === activeIndex}>
						<a href={url.toString()} target="_blank">
							<img
								class="ms-auto me-auto w-100 h-100"
								alt="page {index}"
								src={url.toString()}
								style="object-fit:contain;max-width:100%;max-height:100%"
							/>
						</a>
					</div>
				{/each}
			</div>
			<button class="carousel-control-prev" data-bs-target="#carouselControl" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true" />
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control-next" data-bs-target="#carouselControl" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true" />
				<span class="visually-hidden">Next</span>
			</button>
		</div>
	</div>
{/if}
