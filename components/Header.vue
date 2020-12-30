<template lang="pug">
  .b-header
    .g-container
      .b-nav(
        v-if="loaded"
      )
        template(
          v-if="header"
        )
          div
            nuxt-link.b-nav__item(
              to="/"
            )
              .b-logo-outer
                .b-logo(
                  v-if="header.logo"
                  v-html="header.logo"
                )
              div
                .b-nav-item__title {{header.name}}
                .b-nav-item__text.-show-on-tablet-m {{header.description}}
          div.-show-on-tablet-m(
            v-for="(item, index) in header.menu"
            :key="index"
          )
            nuxt-link.b-nav__item(
              :to="{name: item.route, params: item.params}"
            )
              .b-icon._left(:class="item.icon")
              div
                .b-nav-item__title {{item.name}}
                .b-nav-item__text {{item.text}}
        div(
          v-else
        ) [No header data]
      content-placeholders(
        v-else
        :rounded="true"
      )
        content-placeholders-text
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'Header',
  computed: {
    ...mapFields('config', [
      'loaded',
      'data.header',
    ]),
  },
};
</script>
