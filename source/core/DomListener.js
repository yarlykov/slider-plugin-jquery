class DomListener {
  constructor($root) {
    // this.root($root);
  }

  root($root) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!');
    }
    this.$root = $root;
  }
}

export default DomListener;
