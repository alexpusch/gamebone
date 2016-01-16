import _ from 'lodash';

export default class ScreenManager{
  constructor() {
    this.screens = {};
    this.activeScreen = undefined;
  }

  add(screens) {
    this.screens = _.extend(this.screens, screens);
  }

  goto(screenName) {
    if (this.activeScreen)
      this.activeScreen.destroy();

    let screen = this.screens[screenName];

    if (screen) {
      screen.start();
      this.activeScreen = screen;
    }
  }
}
