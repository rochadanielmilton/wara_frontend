// src/boot/updateTitle.js
export default ({ router }) => {
  router.afterEach((to) => {
    const title = to.meta.title || "SISP V2.0";
    document.title = title;
  });
};
