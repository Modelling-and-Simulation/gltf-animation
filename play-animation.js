AFRAME.registerComponent("play-animation", {
  init: function () {
    this.model = null;
    this.mixer = null;

    // 'model-loaded'
    this.el.addEventListener(
      "click",
      function (e) {
        var model = this.el.getObject3D("mesh");
        this.load(model);
      }.bind(this)
    );

    this.el.addEventListener(
      "model-loaded",
      function (e) {
        var model = this.el.getObject3D("mesh");
        const handleClick = () => {
          this.load(model);
        };

        const arjsDebugUIContainer = document.getElementById(
          "arjsDebugUIContainer"
        );

        var domElement = document.createElement("button");
        domElement.style.display = "block";
        arjsDebugUIContainer.appendChild(domElement);

        domElement.id = "test";
        domElement.innerHTML = "click to play animation";
        domElement.href = "javascript:void(0)";
        domElement.style.position = "absolute";
        domElement.style.top = "-500%";
        domElement.style.left = "10px";
        domElement.addEventListener("click", function (e) {
          e.preventDefault();
          handleClick();
        });
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
