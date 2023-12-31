export default defineEventHandler((e) => {
  console.log(`@request [${getRequestURL(e)}]`);
});
