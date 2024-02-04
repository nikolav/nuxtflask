<script setup lang="ts">

const auth = inject(useAppConfig().key.INJECT_AUTHAPI);


const fullPath$ = computed(() => useRoute().fullPath);

// # eos
</script>

<template>
  <section id="layout-default" class="ma-0 pa-0">
    <VAppBar :height="222">
      <VSpacer />
      <div>
        <pre>
          {{ JSON.stringify({ token: auth?.token$, fullPath$ }, null, 2) }}
        </pre>
        <ul class="d-flex space-x-2">
          <li><NuxtLink to="/">home</NuxtLink></li>
          <li><NuxtLink to="about">about</NuxtLink></li>
          <li><NuxtLink to="demo">demo</NuxtLink></li>
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
