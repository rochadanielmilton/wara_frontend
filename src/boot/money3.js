import { boot } from 'quasar/wrappers'
import { VMoney3 } from 'v-money3';

export default boot(({ app }) => {
  app.directive('money', VMoney3);
})

