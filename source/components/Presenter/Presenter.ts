import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  private model: Model;

  private view: View;

  root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.model = new Model();
    this.view = new View(root);
    this.init();
  }

  private init(): void {
    this.view.init(this.model.state);
    this.view.update(this.model.state);

    this.bindModelEvents();
    this.bindViewEvents();
  }

  private bindModelEvents(): void {
    this.model.subscribe('stateChanged', (state) => {
      if (state instanceof Object) {
        this.view.init(state);
        this.view.update(state);
      }
      this.customEvent();
    });

    this.model.subscribe('valueChanged', (state) => {
      if (state instanceof Object) this.view.update(state);
      this.customEvent();
    });
  }

  private bindViewEvents(): void {
    this.view.subscribe('slider:mousemove', (valueFrom) => {
      this.model.setValue('valueFrom', Number(valueFrom));
    });

    this.view.subscribe('secondKnob:mousemove', (valueTo) => {
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
