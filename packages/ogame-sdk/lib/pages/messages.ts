import { DomBranch } from '@/utils'

export class Message implements DomBranch {
  constructor (
    public $: JQuery<HTMLLIElement>
  ) { }

  public getId (): string {
    return this.$.data('msg-id')
  }

  public getContent (): string {

  }
}

export interface Subtab extends DomBranch {
  getMessages (): Message[]
}

// export const enum Tab {
//   FleetSpy = 20,
//   FleetBattle = 21,
//   FleetExpedition = 22,
//   FleetTransport = 23,
//   FleetOther = 24
// }

// export function getMessages (tab: Tab): Array<Message> {

// }
