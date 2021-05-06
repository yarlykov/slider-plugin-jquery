class Presenter {
  public model: any;
  public view: any;

  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;

    this.view.init(this.model.state)
  }
}

export default Presenter;
