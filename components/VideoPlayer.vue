<template lang="pug">
  .b-player-outer(ref="element")
    .b-player
      video.video-js(
        ref="videoPlayer"
        width="100%"
        height="100%"
      )
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'VideoPlayer',
  props: {
    videoUrl: {
      type: String,
    },
    options: {
      type: Object,
      default() {
        return {
          autoplay: false,
          controls: true,
          aspectRatio: '16:9',
          fluid: true,
          sources: [
            {
              // src: '//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              src: this.videoUrl,
              type: 'video/mp4',
            },
          ],
        };
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      // console.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="scss">
@import 'video.js/dist/video-js.css';

.vjs-big-play-button {
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
</style>

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

.b-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
