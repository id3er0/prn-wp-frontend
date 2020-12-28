<template lang="pug">
  .b-header
    .g-container
      .b-nav
        div
          nuxt-link.b-nav__item(
            to="/"
          )
            .b-icon._logo._left
            div
              .b-nav-item__title [Project]
              .b-nav-item__text.-show-on-tablet-m [Text]
        div.-show-on-tablet-m(
          v-for="(item, index) in items"
          :key="index"
        )
          nuxt-link.b-nav__item(
            :to="{name: item.route, params: item.params}"
          )
            .b-icon._left(:class="item.icon")
            div
              .b-nav-item__title {{item.name}}
              .b-nav-item__text {{item.text}}
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        items: [
          {
            route: 'videos-type',
            params: {type: 'latest'},
            name: 'Movies',
            text: 'All videos',
            icon: '_camera-video',
          },
          {
            route: 'actresses',
            params: {},
            name: 'Actresses',
            text: 'Porn models list',
            icon: '_woman',
          },
          {
            route: 'videos-type',
            params: {type: 'favourites'},
            name: 'Favourites',
            text: 'Your starred videos',
            icon: '_star',
          },
          {
            route: 'categories',
            params: {},
            name: 'Categories',
            text: 'Porn types',
            icon: '_tags',
          },
        ],
      };
    },
  };
</script>
