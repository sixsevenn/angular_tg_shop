import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;

}

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private window;
  tg;
  constructor(@Inject(DOCUMENT) private _document) { 
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
    this.tg.expand();
  }

  get MainButton(): TgButton {
    return this.tg.MainButton;
  }

  get BackButton(): TgButton {
    return this.tg.BackButton;
  }

  sendData(data: object) {
    this.tg.sendData(JSON.stringify(data));
  }

  getData() {
    return this.parseInitData(this.tg.initData);
  }

  parseInitData(initData: string) {
    const params = new URLSearchParams(initData);
    const user = params.get('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  ready() {
    this.tg.ready();
  }
}