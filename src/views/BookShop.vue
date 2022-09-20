<template>
	<div class="album bg-light" style="padding-top: 7rem;">
		<div class="container-fluid">
			<div class="row">
				<ShopFilterVue :search="search" :genres="genres" :authors="authors" :publishers="publishers"
					:clearFilter="clearFilter" :multiFilter="multiFilter" :loadBooks="loadBooks"
					:searchInput="searchInput" />
				<div class="col-md-9">
					<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
						<div class="col-md-4" v-for="index in 3" v-if="loading">
							<div class="card shadow-sm">
								<Skeletor height="200" />
								<div class="card-body bg-dark">
									<h5 class="card-title text-center text-white"></h5>
									<div class="d-flex justify-content-between">
										<Skeletor />
										<Skeletor />
									</div>
									<div class="h-100 p-2 mt-2 bg-light border rounded-3">
										<Skeletor height="50" />
									</div>
									<Skeletor />
									<div class="row">
										<Skeletor class="btn btn-outline-warning" />
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4" v-for="(book, index) in books" v-if="(!loading)">
							<div class="card shadow-sm">
								<img :src="book.gallery">
								<div class="card-body bg-dark">
									<h5 class="card-title text-center text-white">{{book.title}}</h5>
									<div class="d-flex justify-content-between">
										<p class="card-text text-white">ISBN: {{book.isbn}}</p>
										<p class="card-text text-white">Genre: {{book.genre}}</p>
									</div>
									<div class="h-100 p-2 bg-light border rounded-3">
										<div class="d-flex justify-content-between">
											<p class="text-strong fw-bold m-0">Published by</p>
											<p class="text-strong fw-bold m-0">Published At</p>
										</div>
										<hr class="m-0" />
										<div class="d-flex justify-content-between">
											<p class="m-0">{{book.publisher}}</p>
											<p class="m-0">{{book.published_at}}</p>
										</div>
									</div>
									<p class="card-text py-2 text-white text-center m-0">Authord by :
										<b>{{book.author}}</b>
									</p>
									<div class="row">
										<router-link class="btn btn-outline-warning"
											:to="{name: 'book-details', params: {slug: book.slug}}">
											<i class="bi bi-eye"></i> View
										</router-link>
									</div>
								</div>
							</div>
						</div>
						<div class="p-4 p-md-5 mb-4 rounded text-bg-dark w-100" v-if="(!loading && books.length === 0)">
							<div class="col-md-6 px-0">
								<h1 class="display-4 fst-italic">Sorry!.</h1>
								<p class="lead my-3">No results found...</p>
							</div>
						</div>
					</div>
				</div>
				<PaginationVue :meta="meta" :togglePage="togglePage" />
			</div>
		</div>
	</div>
</template>
<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
import ShopFilterVue from "./ShopFilter.vue";
import PaginationVue from "../components/Pagination.vue";
import _ from 'lodash'
export default {
	data() {
		return {
			filterLoading: true,
			loading: true,
			search: {
				q: '',
				authors: [],
				genres: [],
				publishers: []
			},
			authors: [],
			genres: [],
			publishers: [],
			books: [],
			meta: {}
		};
	},
	components: { Skeletor, ShopFilterVue, PaginationVue },
	mounted() {
		this.setQueryParams();
		this.loadAuthor();
		this.loadBooks();
		this.loadGenres();
		this.loadPublishers();
	},
	methods: {
		setQueryParams() {
			const queryParams = this.$route.query;
			for (const property in queryParams) {
				this.search[property] = queryParams[property];
			}
		},
		togglePage(page) {
			this.search.page = page;
			this.loadBooks();
		},
		clearFilter() {
			this.search = {
				q: '',
				authors: [],
				genres: [],
				publishers: []
			}
			this.loadBooks();
		},
		multiFilter(e, filter) {
			const searchFilters = this.search[filter];
			if (e.target.checked === false) {
				const removedArray = searchFilters.filter(item => item !== e.target.value);
				this.search[filter] = removedArray;
			} else {
				searchFilters.push(e.target.value);
				this.search[filter] = searchFilters;
			}
			this.loadBooks();
		},
		loadBooks() {
			this.axios.get("book-collections", {
				params: this.search
			})
				.then(response => {
					const responseData = response.data;
					if (responseData.status === "OK" && responseData.code === 200) {
						this.books = responseData.data;
						this.meta = responseData?.meta;
						this.$router.replace({ query: this.search });
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
		searchInput: _.debounce(function (e) {
			this.loadBooks();
		}, 500),
		loadAuthor() {
			this.axios.get('author-options')
				.then(response => {
					const responseData = response.data;
					if (responseData.status === "OK" && responseData.code === 200) {
						this.authors = responseData.data;
					}
				})
				.catch(err => {
					const response = err.response?.data;
					if (response && err.response.status === 404 && response.code === 404) {
						toastr.error(response.message, 'Something went Wrong!.');
					}
				})
		},
		loadPublishers() {
			this.axios.get('publisher-options')
				.then(response => {
					const responseData = response.data;
					if (responseData.status === "OK" && responseData.code === 200) {
						this.publishers = responseData.data;
					}
				})
				.catch(err => {
					const response = err.response?.data;
					if (response && err.response.status === 404 && response.code === 404) {
						toastr.error(response.message, 'Something went Wrong!.');
					}
				})
		},
		loadGenres() {
			this.axios.get('genre-options')
				.then(response => {
					const responseData = response.data;
					if (responseData.status === "OK" && responseData.code === 200) {
						this.genres = responseData.data;
					}
				})
				.catch(err => {
					const response = err.response?.data;
					if (response && err.response.status === 404 && response.code === 404) {
						toastr.error(response.message, 'Something went Wrong!.');
					}
				})
		}
	}
}
</script>
