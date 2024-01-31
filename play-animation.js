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
    console.log("inside play");
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.model.animations.forEach((animation) => {
      this.mixer.clipAction(animation, model).play();
    });
    model.traverse((node) => {
      if (node.isMesh) {
        node.material.color.set(0x00ff00); // Set color to green
      }
    });
  },

  tick: function (t, dt) {
    if (this.mixer && !isNaN(dt)) {
      this.mixer.update(dt / 1000);
    }
  },
});
