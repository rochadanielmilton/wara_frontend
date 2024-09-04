import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

const message = {
  success: (message) => {
    Notify.create({
      color: 'white',
      message,
      icon: 'check_circle',
      position: 'top-right',
      classes: 'q-pa-md text-weight-bold positive_border',
      textColor: 'positive',
      actions: [
        {
          textColor: 'positive',
          icon: 'close'
        }
      ]
    })
  },
  error: (message) => {
    Notify.create({
      color: 'white',
      message,
      icon: 'error',
      position: 'top-right',
      classes: 'q-pa-md text-weight-bold negative_border',
      textColor: 'negative',
      actions: [
        {
          textColor: 'negative',
          icon: 'close'
        }
      ]
    })
  },
  warning: (message) => {
    Notify.create({
      color: 'white',
      message,
      icon: 'report_problem',
      position: 'top-right',
      classes: 'q-pa-md text-weight-bold warning_border',
      textColor: 'warning',
      actions: [
        {
          textColor: 'warning',
          icon: 'close'
        }
      ]
    })
  },
  info: (message) => {
    Notify.create({
      color: 'white',
      message,
      icon: 'report_problem',
      position: 'top-right',
      classes: 'q-pa-md text-weight-bold info_border',
      textColor: 'info',
      actions: [
        {
          textColor: 'info',
          icon: 'close'
        }
      ]
    })
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$message = message
  app.provide('message', message)
})

export { message }
