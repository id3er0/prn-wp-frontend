<template lang="pug">
  .b-pagination
    nuxt-link.b-pagination__button(
      v-if="pagesArray.length < pagesAmount && currentPage > 1"
      :to="to(1)"
    ) First page
    nuxt-link.b-pagination__button(
      v-if="currentPage > 1"
      :to="to(prevPage)"
    ) Back
    nuxt-link.b-pagination__button(
      v-for="page in pagesArray"
      :key="page"
      :to="to(page)"
    ) {{page}}
    nuxt-link.b-pagination__button(
      v-if="currentPage < pagesAmount"
      :to="to(nextPage)"
    ) Next
    nuxt-link.b-pagination__button(
      v-if="pagesArray.length < pagesAmount && currentPage < pagesAmount"
      :to="to(pagesAmount)"
    ) Last page
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagesAmount: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    pagesArray() {
      const rangeStart = this.currentPage > 1
        ? this.currentPage - 2
        : 0;
      return [...Array(this.pagesAmount).keys()]
        .map(i => i + 1)
        .slice(rangeStart, this.currentPage + 2);
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1;
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1;
    },
    nextPage() {
      return this.currentPage < this.pagesAmount
        ? this.currentPage + 1
        : this.pagesAmount;
    },
  },
  methods: {
    to(page) {
      return {
        params: {
          ...this.$route.params,
          page,
        },
      };
    },
  },
};
</script>
