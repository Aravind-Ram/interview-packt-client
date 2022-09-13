<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
    <header>
        <div class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container">
                <router-link class="navbar-brand d-flex align-items-center" :to="{name: 'home'}">
                    <img class="d-block" src="@/assets/logo.png" alt="" width="140" height="57" />
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExample03">
                    <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :class="this.$route.name === 'book-list' && 'active'"
                                aria-current="page" :to="{ name: 'book-list'}">Books</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :class="this.$route.name === 'author-list' && 'active'"
                                :to="{ name: 'author-list'}">Author</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link class="nav-link" :class="this.$route.name === 'genre-list' && 'active'"
                                :to="{name: 'genre-list'}">
                                Genre
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :class="this.$route.name === 'publisher-list' && 'active'"
                                :to="{name: 'publisher-list'}">Publisher</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'home'}">
                                Book Store
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>