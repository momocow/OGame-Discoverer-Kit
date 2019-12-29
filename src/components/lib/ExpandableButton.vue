<template>
  <div class="btn expandable" :style="_cssVars">
    <div class="pivot" tabindex="0"
        @mouseenter="triggerWithHover(true)"
        @mouseleave="triggerWithHover(false)"
        @focus="triggerWithFocus(true)"
        @blur="triggerWithFocus(false)">
      <slot name="pivot"></slot>
    </div>
    <div class="menu">
      <slot name="menu">
        <slot></slot>
      </slot>
    </div>
  </div>
</template>
<script>
export const ROTATION_DIRECTIONS = [
  'disabled',
  'clock',
  'anticlock'
]
export default {
  name: 'expandable-button',
  props: {
    hoverTrigger: Boolean,
    focusTrigger: Boolean,
    rotate: {
      type: String,
      default: 'disabled',
      validator (value) {
        return ROTATION_DIRECTIONS.includes(value)
      }
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    _cssVars () {
      return {
        '--pivot-rotate-deg': this.rotate === 'disabled' ? '0'
          : this.rotate === 'clock' ? '90deg' : '-90deg'
      }
    }
  },
  methods: {
    triggerWithHover (activeState) {
      if (this.hoverTrigger) {
        this.toggleMenu(activeState)
      }
    },
    triggerWithFocus (activeState) {
      if (this.focusTrigger) {
        this.toggleMenu(activeState)
      }
    },
    toggleMenu (activeState) {
      if (typeof activeState === 'boolean' && this.active !== activeState) {
        this.active = activeState
        if (activeState) {
          this.$emit('open')
        } else {
          this.$emit('close')
        }
      }
    },
    openMenu () {
      this.toggleMenu(true)
    },
    closeMenu () {
      this.toggleMenu(false)
    }
  }
}
</script>
<style scoped>
  .btn {
    cursor: pointer;
  }
  .btn.disabled {
    cursor: not-allowed;
  }
  .pivot {
    transform: rotate(0);
  }
  .menu {
    height: 0;
    position: absolute;
    overflow: hidden;
    transition: height .15s ease-in-out;
  }
  .expandable.active .pivot {
    transform: rotate(var(--pivot-rotate-deg));
  }
  .expandable.active .menu {
    height: auto;
  }
</style>
