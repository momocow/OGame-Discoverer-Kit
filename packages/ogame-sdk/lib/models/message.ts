import { SubDOMTree } from '@/types'
import { parse as parseDate } from 'date-format-parse'

export class Tab {}

export class Message extends SubDOMTree<HTMLLIElement> {
  constructor ($: JQuery<HTMLLIElement>) {
    super($)

    if (this)
  }

  public isUnread (): boolean {
    return this.$.hasClass('msg_new')
  }

  public getTime (): Date {
    return parseDate(this.$.find('.msg_date').text())
  }

  public getId (): string {
    return this.$.data('msg-id')
  }

  public getSender (): string {
    return this.$.find('.msg_sender').text()
  }

  public getContent (): SubDOMTree {
    return new SubDOMTree(this.$.find('.msg_content'))
  }
}
