import { ModelEvents, ViewEvents } from 'Source/Observer/events';
import Model from 'Components/Model/Model';
import View from 'Components/View/View';

class Presenter {
  private model: Model;

  private view: View;

  root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.model = new Model();
    this.view = new View(root, this.model.state);

    this.bindModelEvents();
    this.bindViewEvents();
  }

  private bindModelEvents(): void {
    this.model.subscribe(ModelEvents.STATE_CHANGED, (state) => {
      if (state instanceof Object) {
        this.view.init(state);
      }
      this.customEvent();
    });

    this.model.subscribe(ModelEvents.VALUE_CHANGED, (state) => {
      if (state instanceof Object) this.view.update(state);
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
        detail: this.model.state,
      }),
    );
  }
}

export default Presenter;
