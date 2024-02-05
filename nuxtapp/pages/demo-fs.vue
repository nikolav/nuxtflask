<script setup lang="ts">
import { find, get, idGen } from "@/utils";

useHead({
  title: "--fs",
});

const { files: ls$, upload, download, remove, meta } = useApiStorage();

const file$ = ref();
const title$ = ref("");
const desc$ = ref("");
const file2$ = ref("")

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

const metaUpdateTitle = () => {
  meta(file2$.value, { title: idGen(), description: `d --${idGen()}`, public: .5 < Math.random() });
}

// #eos
</script>

<template>
  <section id="page-fs">
    <h1>@fs</h1>
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
        <div>
          <label for="rm_file">rm_file</label>
          <input
            v-model="file2$"
            id="rm_file"
            name="rm_file"
          />
        </div>
        <button type="submit" class="p-2 bg-sky-600 text-white/80 rounded">
          ok
        </button>
        <button @click="remove(file2$)" type="button" class="p-2 bg-sky-600 text-white/80 rounded">
          rm:{{ file2$ }}
        </button>
        <button @click="download(file2$)" type="button" class="p-2 bg-sky-600 text-white/80 rounded">
          dl:{{ file2$ }}
        </button>
        <button @click="metaUpdateTitle" type="button" class="p-2 bg-sky-600 text-white/80 rounded">
          meta:{{ file2$ }}
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
