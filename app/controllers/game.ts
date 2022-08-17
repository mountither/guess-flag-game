import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { FlagData } from 'flag-game/data/flags';
import { shuffleArray } from '../helpers/array';
import { action } from '@ember/object';

export default class Game extends Controller {
  @tracked data = this.model as FlagData[];

  @tracked score = 0;

  @tracked isFlagsGrayscale = false;

  @tracked answerCountry: FlagData | undefined =
    this.data[Math.floor(Math.random() * this.data.length)];

  @tracked answerState: 'correct' | 'wrong' | undefined = undefined;

  get randomFlags(): any {
    const answerExcluded = this.data.filter(
      (country) => country.name !== this.answerCountry?.name
    );
    const shuffled = shuffleArray(answerExcluded);
    const answerInserted =
      shuffled.splice(Math.random() * 4, 0, this.answerCountry) && shuffled;

    return answerInserted;
  }

  get answerIsCorrect(): boolean {
    return this.answerState === 'correct';
  }

  get answerIsWrong(): boolean {
    return this.answerState === 'wrong';
  }

  @action
  onFlagClick(country?: string) {
    this.answerState = country === this.answerCountry?.name ? 'correct' : 'wrong';

    if (this.answerState === 'wrong') {
      this.score -= 1;
      return;
    }

    this.score += 1;

    setTimeout(() => {
      this.answerCountry =
        this.data[Math.floor(Math.random() * this.data.length)];
      this.answerState = undefined;
    }, 500);
  }

  @action
  triggerFlagGrayScale() {
    this.isFlagsGrayscale = !this.isFlagsGrayscale;
  }
}

// DO wrongT DELETE: this is how TypeScript kwrongws how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    game: Game;
  }
}
