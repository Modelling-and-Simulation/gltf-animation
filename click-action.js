AFRAME.registerComponent("click-action", {
  init: function () {
    this.model = null;
    this.mixer = null;

    var model = this.el.getObject3D("mesh");

    let el = this.el;

    this.addAnimation = function (e) {
      model = document.getElementById("model").getObject3D("mesh");
      mixer = new THREE.AnimationMixer(model);
      model.animations.forEach((animation) => {
        mixer.clipAction(animation, model).play();
      });
      console.log("animation added");
    };

    this.el.addEventListener("click", this.addAnimation);
    console.log("click-action init");
  },

  load: function (model) {
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.model.animations.forEach((animation) => {
      this.mixer.clipAction(animation, model).play();
    });
  },

  remove: function () {
    this.el.removeEventListener("click", this.addMarker);
  },
});
