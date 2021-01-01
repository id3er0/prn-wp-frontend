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
              .-show-on-tablet-m
                .b-nav-item__title {{header.name}}
                .b-nav-item__text {{header.description}}
          div(
            v-for="(item, index) in header.menu"
            :key="index"
          )
            nuxt-link.b-nav__item(
              :to="{name: item.route, params: item.params}"
            )
              .b-icon._header(:class="item.icon")
              .-show-on-tablet-m
                .b-nav-item__title {{item.name}}
                .b-nav-item__text {{item.text}}
          .-hide-on-tablet-m
            button.b-nav__item(
              type="button"
              @click="showSmallMenu = !showSmallMenu"
            )
              .b-icon._menu._header(
                :class="{'_flip-horizontal': showSmallMenu}"
              )
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
    ...mapFields('smallMenu', [
      'showSmallMenu',
    ]),
  },
};
</script>
