import * as fancyappsui from "@fancyapps/ui";
import { type userSlideType } from "@fancyapps/ui/types/Carousel/types";
import { type OptionsType } from "@fancyapps/ui/types/Fancybox/options";

const { Fancybox } = fancyappsui;

export default defineNuxtPlugin((_nuxtApp) => {
  const close = (closeAll: boolean = true) => Fancybox.close(closeAll);
  // # content [type]s: "image" | "iframe" | "video" | "pdf" | "inline" | "html";
  // # content [type]s: "image" | "iframe" | "youtube" | "vimeo" | "inline" | "html";
  const open = (slides?: userSlideType[], options?: Partial<OptionsType>) => {
    Fancybox.destroy();
    return Fancybox.show(slides, options);
  };

  const lightbox = {
    Fancybox,
    open,
    close,
  };

  return {
    provide: { lightbox },
  };
});
