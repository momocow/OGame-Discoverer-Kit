<template>
  <expandable-button class="expandable-btn" rotate="clock" hover-trigger focus-trigger>
    <template #pivot>
      <div class="report-btn">
        <font-awesome-icon :icon="pivotIcon"></font-awesome-icon>
      </div>
    </template>
    <template #menu>
      <font-awesome-icon :icon="copyIcon"></font-awesome-icon>
      <font-awesome-icon :icon="mailIcon"></font-awesome-icon>
      <font-awesome-icon :icon="githubIcon"></font-awesome-icon>
    </template>
  </expandable-button>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faEnvelope, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ExpandableButton from './lib/ExpandableButton.vue'

library.add(faPaperPlane)
library.add(faCopy)
library.add(faEnvelope)
library.add(faGithub)

export default {
  name: 'report-unknown',
  components: {
    FontAwesomeIcon,
    ExpandableButton
  },
  data () {
    return {
      pivotIcon: ['far', 'paper-plane'],
      copyIcon: ['far', 'copy'],
      mailIcon: ['far', 'envelope'],
      githubIcon: ['fab', 'github']
    }
  }
}
</script>
<style scoped>
.expandable-btn {
  width: 26px;
  height: 26px;
}
.report-btn {
  color: #e2e2e2;
}
.report-btn > svg {
  width: 100%;
  height: 100%;
}
</style>
