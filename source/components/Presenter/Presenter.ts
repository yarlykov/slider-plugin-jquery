import { ModelEvents, ViewEvents } from 'Source/Observer/events';
import Model from 'Components/Model/Model';
import View from 'Components/View/View';
import { IOptions } from '../interfaces';

class Presenter {
  private model: Model;

  private view: View;

  private root: HTMLElement;

  constructor(root: HTMLElement, options: IOptions) {
    this.root = root;
    this.model = new Model(options);
    this.view = new View(root, this.model.getState());

    this.bindModelEvents();
    this.bindViewEvents();
  }

  private bindModelEvents(): void {
    this.model.subscribe(ModelEvents.STATE_CHANGED, (state) => {
      this.view.init(state);
      this.customEvent();
    });

    this.model.subscribe(ModelEvents.VALUE_CHANGED, (state) => {
      this.view.update(state);
      this.customEvent();
    });
  }

  private bindViewEvents(): void {
    this.view.subscribe(ViewEvents.VALUE_FROM_CHANGED, (valueFrom) => {
      this.model.setValue('valueFrom', Number(valueFrom));
    });

    this.view.subscribe(ViewEvents.VALUE_TO_CHANGED, (valueTo) => {
      this.model.setValue('valueTo', Number(valueTo));
    });
  }

  private customEvent(): void {
    this.root.dispatchEvent(
      new CustomEvent('onChange', {
        detail: this.model.getState(),
      }),
    );
  }
}

export default Presenter;
