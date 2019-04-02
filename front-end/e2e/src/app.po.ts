import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTip() {
    return element(by.css('app-home tooltip-one')).getText();
  }

  getAboutButton() {
    return element(by.css('app-home .upload'));
  }
}
