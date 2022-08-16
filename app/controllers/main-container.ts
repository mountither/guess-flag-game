import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking'

export default class MainContainer extends Controller{
  @tracked styles : string = "";

}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'main-container': MainContainer;
  }
}
