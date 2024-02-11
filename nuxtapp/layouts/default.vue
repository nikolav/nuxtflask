<script setup lang="ts">
const auth = useStoreApiAuth();
const fullPath$ = computed(() => useRoute().fullPath);

// # eos
</script>

<template>
  <section id="layout-default" class="ma-0 pa-0">
    <VAppBar :height="222">
      <div>
        <pre>
          {{ auth.token$ }}
        </pre>
        <ul class="d-flex space-x-2 items-center">
          <li><NuxtLink to="/">home</NuxtLink></li>
          <li><NuxtLink to="demo-auth">auth</NuxtLink></li>
        </ul>
      </div>
      <VSpacer />
    </VAppBar>

    <VMain>
      <slot>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Necessitatibus, natus sit deleniti, ullam, officia quas sapiente porro
          quis at id a eligendi quibusdam vel dignissimos architecto fugiat
          minus aut ad!
        </p>
      </slot>
    </VMain>
  </section>
</template>
