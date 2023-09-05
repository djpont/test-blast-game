import { MVCComponent } from '/classes/mvc';
import { TextModel } from './model';
import { TextView } from './view';
import { TextController } from './controller';

export class Text extends MVCComponent<TextModel, TextView, TextController> {
  constructor(text: string = '') {
    const model = new TextModel(text);
    const view = new TextView(model);
    const controller = new TextController(model, view);
    super(model, view, controller);
  }
}
