<template lang="pug">
  .b-player-outer(
    ref="element"
  )
    link(
      rel="preload"
      :href="adsUrl"
      as="fetch"
    )

    .b-player-item
      .b-player-item__inner(
        width="640px"
        height="360px"
      )
        video.b-fluid-player#f-video
          source(
            :src="videoUrl"
          )
</template>

<script>
export default {
  name: 'PlayerFluid',
  data: () => ({
    width: null,
    fluidplayerLoaded: false,
    videoUrl: '//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    adsUrl: 'https://cors-prx.idz.workers.dev?https://ytvastqa.appspot.com/static/sampletag/vast.xml',
  }),
  head() {
    return {
      script: [
        {
          hid: 'fluidplayer',
          src: '/js/lib/fluid-player/fluidplayer.js',
          defer: true,
          // Changed after script load
          callback: () => {
            this.fluidplayerLoaded = true;
            this.initFluidPlayer();
          },
        },
      ],
    };
  },
  mounted() {
    var ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.initFluidPlayer();
      }
    });

    ro.observe(this.$refs.element);
    setInterval(() => this.initFluidPlayer(), 2000);
  },
  methods: {
    initFluidPlayer() {
      console.log('initFluidPlayer');
      const _self = this;
      const player = fluidPlayer('f-video', {
        vastOptions: {
          layoutControls: {
            preload: true,
            fillToContainer: true,
            mute: true,
          },
          adList: [
            {
              // roll: 'onPauseRoll',
              roll: 'preRoll',
              // vastTag: 'vastNonLinear.xml',
              skipButtonCaption: 'Wait [seconds] more second(s)',
              vastTag: _self.adsUrl,
              // vastTag: 'https://ads.trafficjunky.net/ads?zone_id=1845481',
              // vastTag: 'https://cors-anywhere.herokuapp.com/https://ytvastqa.appspot.com/static/sampletag/vast.xml',
              // vAlign: 'top',
              // nonlinearDuration: 10,
              size: '300x250',
            },
          ],
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.b-player-outer {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 0;
  padding-bottom: calc(100% / 16 * 9);
  margin: 0 auto;
}

.b-player-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.b-player-item__inner {
  position: relative;
  width: 100%;
}

.b-fluid-player {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
