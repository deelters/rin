import { createSSRApp, defineComponent, h, markRaw, provide } from 'vue'
import { assign } from '../utils/helpers'
import PageShell from './PageShell.vue'
import { pageContextKey } from '../utils/constants'

// Global Styles
import './styles/global.scss'
import './styles/nprogress.scss'

export default function createApp(pageContext: PageContext) {
  const { Page, pageProps = {} } = pageContext
  let rootComponent: any
  const PageWithWrapper = defineComponent({
    setup() {
      provide(pageContextKey, pageContext)
    },
    data() {
      return {
        Page: markRaw(Page || {}),
        pageProps: markRaw(pageProps)
      }
    },
    created() {
      rootComponent = this
    },
    render() {
      return h(
        PageShell,
        {},
        {
          default: () => h(this.Page, this.pageProps)
        }
      )
    }
  })
  return assign(createSSRApp(PageWithWrapper), {
    changePage(pageContext: PageContext) {
      const { Page, pageProps = {} } = pageContext
      rootComponent.Page = markRaw(Page)
      rootComponent.pageProps = markRaw(pageProps)
    }
  })
}