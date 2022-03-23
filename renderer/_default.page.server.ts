import { createApp } from './App'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { renderToString } from '@vue/server-renderer'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps']

export async function render(pageContext: PageContextBuiltIn & PageContext) {
  const App = createApp(pageContext)
  const appHtml = await renderToString(App)

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'zRain'
  const desc =
    (documentProps && documentProps.description) ||
    'App using Vite + vite-plugin-ssr'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="./images/avatar.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}
