import { boot } from 'quasar/wrappers'
import Titulo from 'components/common/Titulo'
import Estado from 'components/common/Estado'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component('Titulo', Titulo)
  app.component('Estado', Estado)
})
