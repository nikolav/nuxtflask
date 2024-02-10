
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat);


export default defineNuxtPlugin(() => {
  return {
    provide: {
      date: dayjs,
    }
  }
});
