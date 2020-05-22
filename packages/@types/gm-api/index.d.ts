// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference lib="dom" />

type ValueChangeListener<T> = (
  name: string, oldValue: T, newValue: T, remote: boolean) => void
type ValueChangeListenerId = any

type MenuCommandHandler = () => void
type MenuCommandId = any

declare global {
  function GM_addStyle (css: string): HTMLStyleElement

  function GM_getValue<T=any> (name: string, defaultValue?: T): T | undefined
  function GM_setValue (name: string, value: any): void
  function GM_deleteValue (name: string): void
  function GM_listValues (): string[]
  function GM_addValueChangeListener <T=any> (
    name: string, cb: ValueChangeListener<T>): ValueChangeListenerId
  function GM_removeValueChangeListener (
    listenerId: ValueChangeListenerId): void

  function GM_log (message: any): void

  function GM_getResourceText (name: string): string
  function GM_getResourceURL (name: string): string

  function GM_registerMenuCommand (
    name: string, fn: MenuCommandHandler, accessKey?: string): MenuCommandId
  function GM_unregisterMenuCommand (menuCmdId: MenuCommandId): void

  // function GM_openInTab(url, options), GM_openInTab(url, loadInBackground)
  // GM_xmlhttpRequest(details)
  // GM_download(details), GM_download(url, name)
  // GM_getTab(callback)
  // GM_saveTab(tab)
  // GM_getTabs(callback)
  // GM_notification(details, ondone), GM_notification(text, title, image, onclick)
  // GM_setClipboard(data, info)
  // GM_info
}

export {}
