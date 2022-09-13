<template>
	<div class="container" style="padding-top: 7rem;">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link :to="{name: 'home'}">Home</router-link></li>
				<li class="breadcrumb-item active" aria-current="page" v-if="(!loading)">{{book.title}}</li>
			</ol>
		</nav>
		<div class="row" v-if="(!loading)">
			<div class="col-md-4">
				<img :src="book.gallery" class="img-thumbnail" />
			</div>
			<div class="col-md-8">
				<div class="p-4 p-md-5 mb-4 rounded text-bg-dark">
					<div class="col-md-12 px-0">
						<h1 class="display-4 fst-italic">{{book.title}}</h1>
						<p class="lead my-3">{{book.description}}</p>
						<div class="d-flex justify-content-between">
							<p class="card-text text-white">ISBN: {{book.isbn}}</p>
							<p class="card-text text-white">Genre: {{book.genre}}</p>
						</div>
						<div class="h-100 p-2 bg-light border rounded-3">
							<div class="d-flex justify-content-between">
								<p class="text-strong fw-bold text-dark">Published by</p>
								<p class="text-strong fw-bold text-dark">Published At</p>
							</div>
							<div class="d-flex justify-content-between">
								<p class="text-dark">{{book.publisher}}</p>
								<p class="text-dark">{{book.published_at}}</p>
							</div>
						</div>
						<p class="card-text py-2 text-white text-center">Authord by :
							<b>{{book.author}}</b>
						</p>
						<div class="d-flex justify-content-end">
							<button class="btn btn-outline-danger" @click="togglePurchase()">
								<i class="bi bi-cart"></i> Buy now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-else>
			<div class="col-md-4">
				<Skeletor height="400" class="img-thumbnail" />
			</div>
			<div class="col-md-8">
				<div class="p-4 p-md-5 mb-4 rounded text-bg-dark">
					<div class="col-md-12 px-0">
						<Skeletor height="20" />
						<Skeletor class="mt-2" height="10" />
						<Skeletor class="mt-2" height="10" />
						<div class="d-flex">
							<Skeletor class="mt-2" height="20" />
						</div>
						<div class="h-100 p-2 bg-light border rounded-3">
							<Skeletor class="mt-2" height="100" />
						</div>
						<Skeletor class="mt-2" height="20" />
						<div class="d-flex mt-2 justify-content-end">
							<Skeletor class="btn btn-outline-danger">
							</Skeletor>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import _ from 'lodash'
import toastr from 'toastr';
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
export default {
	data() {
		return {
			loading: true,
			book: {}
		};
	},
	mounted() {
		this.loadBook();
	},
	components: { Skeletor },
	methods: {
		togglePurchase() {
			toastr.success('Item has been added to card', 'Welcome!.')
		},
		loadBook() {
			this.axios.get("book/" + this.$route.params.slug)
				.then(response => {
					const responseData = response.data;
					if (responseData.status === "OK" && responseData.code === 200) {
						this.book = responseData.data;
					}
				})
				.catch(err => {
					const response = err.response?.data;
					if (response && err.response.status === 404 && response.code === 404) {
						toastr.error(response.message, "Something went Wrong!.");
					}
				})
				.finally(() => this.loading = false)
		},
	}
}
</script>
	