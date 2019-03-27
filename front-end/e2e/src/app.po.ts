import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitle() {
    return element(by.css('app-home .title')).getText();
  }

  getAboutButton() {
    return element(by.css('app-home .browse'));
  }
}
