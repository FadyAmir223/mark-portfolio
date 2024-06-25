import type en from '@/../messages/en.json'

type MessagesEn = typeof en

declare global {
  interface IntlMessages extends MessagesEn {}
}
