import Route from '@ember/routing/route';
import { flagData } from '../data/flags';

export default class Game extends Route {
  model() {
    return flagData;
  }
}
