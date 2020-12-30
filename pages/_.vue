<template lang="pug">
  .-mt-5
    .-h1.-mb-5.-t-center
      | 404
    .-h2.-t-center
      | Страница не найдена
    p.-t-center
      a(href="/")
        | Вернуться на главную
</template>

<script>
import objectValue from '@/utils/objectValue';
import { mapFields } from 'vuex-map-fields';

export default {
  head() {
    const title = objectValue(this, 'pages.404.meta.title');
    const name = objectValue(this, 'header.name', '');
    const description = objectValue(this, 'pages.404.meta.description');
    return {
      title: `${title} | ${name}`,
      meta: [
        {hid: 'description', name: 'description', content: description},
      ],
    };
  },
  computed: {
    ...mapFields('config', [
      'data.header',
      'data.pages',
    ]),
  },
};
</script>
