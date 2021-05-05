class Presenter {
  private model: any;
  private view: any;

  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;

    this.view.init(this.model.state)
  }
}

export default Presenter;
