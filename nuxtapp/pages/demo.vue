<script setup lang="ts">
import { get } from "@/utils";

useHead({
  title: "--demo",
});

const { files: ls$, upload } = useApiStorage();

const file$ = ref();
const title$ = ref("");
const desc$ = ref("");

const fileChange = (event: any) => {
  file$.value = get(event, "target.files[0]");
};

const formSubmit = async () => {
  const res = await upload({
    file01: {
      file: file$.value,
      data: {
        title: title$.value,
        description: desc$.value,
      },
    },
  });
  console.log({ res });
};

// #eos
</script>

<template>
  <section id="page-demo">
    <h1>@demo</h1>
    <div>
      <form @submit.prevent="formSubmit">
        <div>
          <label for="file">file</label>
          <input @change="fileChange" type="file" id="file" name="file" />
        </div>
        <div>
          <label for="title">title</label>
          <input v-model="title$" type="text" id="title" name="title" />
        </div>
        <div>
          <label for="description">description</label>
          <textarea
            v-model="desc$"
            id="description"
            name="description"
          ></textarea>
        </div>
        <button type="submit" class="p-2 bg-sky-600 text-white/20 rounded">
          ok
        </button>
      </form>
    </div>
    <p>
      <pre>
        {{ JSON.stringify({ ls$ }, null, 2) }}
      </pre>
    </p>
  </section>
</template>

<style scoped></style>
