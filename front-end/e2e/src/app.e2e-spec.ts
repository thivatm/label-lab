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

  it('should have title of', () => {
    page.navigateTo();
    expect(page.getTip()).toEqual('Select a region in the image to add an annotation');
  });

  it('should have the button', () => {
    page.navigateTo();
    expect(page.getAboutButton().isPresent()).toEqual(true);
  })

});
