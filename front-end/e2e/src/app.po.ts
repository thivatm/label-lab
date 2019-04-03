import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getBrowseLink() {
    return element(by.css('app-home .browse'));
  }

  getAboutButton() {
    return element(by.css('app-home .upload'));
  }
}
