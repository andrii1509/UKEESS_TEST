import { RouterModule } from './routing.module';

describe('RouterModule', () => {
  let routerModule: RouterModule;

  beforeEach(() => {
    routerModule = new RouterModule();
  });

  it('should create an instance', () => {
    expect(routerModule).toBeTruthy();
  });
});
