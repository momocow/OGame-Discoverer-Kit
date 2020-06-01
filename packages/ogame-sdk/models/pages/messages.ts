import { $$ } from '@/utils/strict'
import { GamePage } from './base'

export type TabName =
  'fleets' |
  'communication' |
  'market' |
  'system' |
  'favorite'

export type FleetsSubtabName =
  'spy' |
  'battle' |
  'expedition' |
  'transport' |
  'other'

export class MessagePage extends GamePage {
  public getTab (tabName: TabName): Tab {
    return new Tab($$(`#${tabName}Tab`))
  }
}
// .tab_inner > .no_msg
export class Tab {
  constructor (public $: JQuery) {
    
  }

  public getSubtab (): Subtab {

  }
}

export class Subtab {

}
