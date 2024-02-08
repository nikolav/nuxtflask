<script setup lang="ts">
import { idGen, find, assign } from "@/utils";
import type { OrNull } from "@/types";

useHead({
  title: "--demo",
});

interface IFooBar {
  foo: string;
  bar: string;
}

const { topic$, data, upsert, remove } = useDocs<IFooBar>("@temp:1");

const id$ = ref();

const topicToggle = () => {
  topic$.value = '@temp:1' !== topic$.value ? '@temp:1' : '@temp:2';
}
const docsAdd = async () => await upsert(<IFooBar>{ 'foo': idGen(), 'bar': idGen() });
const docsRm = async () => await remove(id$.value);
const docsUpdate = async () => {
  const doc = find(data.value, { id: parseInt(id$.value, 10) });
  if (!doc) return;
  await upsert(assign(<IFooBar>{}, doc.data, { foo: idGen() }), doc.id);
}

const { data$: doc, put: putDoc } = useDoc<{ name?: string | undefined; photo?: string | undefined }>("#123");
const docUpsert = async () => await putDoc({ photo: `photo:${idGen()}`,  });
// #eos
</script>

<template>
  <section id="page-demo">
    <h1>@demo</h1>
    <p>
      <VTextField type="number" v-model="id$" />
    </p>
    <p>
      <VBtnGroup>
        <VBtn @click="topicToggle" color="secondary" variant="flat">
          [{{ topic$ }}] topic:toggle
        </VBtn>
        <VBtn @click="docsAdd" color="secondary" variant="flat">
          docs:add
        </VBtn>
        <VBtn @click="docsUpdate" color="secondary" variant="flat">
          docs:update
        </VBtn>
        <VBtn @click="docsRm" color="secondary" variant="flat">
          docs:rm
        </VBtn>
        <VBtn @click="docUpsert" color="secondary" variant="flat">
          doc:put
        </VBtn>
      </VBtnGroup>
      <pre>
        {{ JSON.stringify({ doc }, null, 2) }}
        {{ JSON.stringify({ data }, null, 2) }}
      </pre>
    </p>
  </section>
</template>

<style scoped></style>
