AFRAME.registerComponent("play-animation", {
  init: function () {
    this.model = null;
    this.mixer = null;

    // 'model-loaded'
    this.el.addEventListener(
      "click",
      function (e) {
        console.log("animation added");
        var model = this.el.getObject3D("mesh");
        alert(`Model clicked! ${model.name}`);

        this.load(model);
      }.bind(this)
    );
  },

  load: function (model) {
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.model.animations.forEach((animation) => {
      this.mixer.clipAction(animation, model).play();
    });
  },

  tick: function (t, dt) {
    if (this.mixer && !isNaN(dt)) {
      this.mixer.update(dt / 1000);
    }
  },
});
