import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });

  it('should have upload Link', () => {
    page.navigateTo();
    expect(page.getBrowseLink().isPresent()).toEqual(true);
  });

  it('should have the button', () => {
    page.navigateTo();
    expect(page.getAboutButton().isPresent()).toEqual(true);
  });

});
