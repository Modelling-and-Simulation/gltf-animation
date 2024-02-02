AFRAME.registerComponent("play-animation", {
  init: function () {
    this.model = null;
    this.mixer = null;
    this.scaleFactor = 1.0;

    // 'model-loaded'
    this.el.addEventListener(
      "click",
      function (e) {
        var model = this.el.getObject3D("mesh");
        this.loadAnimation(model);
      }.bind(this)
    );

    this.el.addEventListener(
      "model-loaded",
      function (e) {
        var model = this.el.getObject3D("mesh");
        const handleClick = () => {
          this.loadAnimation(model);
        };
        const handleClick2 = () => {
          this.changeToBlue(model);
        };
        const handleClick3 = () => {
          this.changeToGreen(model);
        };
        const handleClick4 = () => {
          this.changeSize(model);
        }
        const handleClick5 = () => {
          this.changeToYellow(model);
        }

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

        var domElement2 = document.createElement("button");
        domElement2.style.display = "block";
        arjsDebugUIContainer.appendChild(domElement2);

        domElement2.id = "test2";
        // domElement2.innerHTML = "change colour to blue";
        domElement2.href = "javascript:void(0)";
        domElement2.style.position = "absolute";
        domElement2.style.top = "-600%";
        domElement2.style.left = "10px";
        domElement2.style.width = "2vw"
        domElement2.style.height = "4vh"
        domElement2.style.backgroundColor = "blue"
        domElement2.addEventListener("click", function (e) {
          e.preventDefault();
          handleClick2();
        });

        var domElement3 = document.createElement("button");
        domElement3.style.display = "block";
        arjsDebugUIContainer.appendChild(domElement3);

        domElement3.id = "test3";
        // domElement3.innerHTML = "change colour to green";
        domElement3.href = "javascript:void(0)";
        domElement3.style.position = "absolute";
        domElement3.style.top = "-600%";
        domElement3.style.left = "60px";
        domElement3.style.width = "2vw"
        domElement3.style.height = "4vh"
        domElement3.style.backgroundColor = "green"
        domElement3.addEventListener("click", function (e) {
          e.preventDefault();
          handleClick3();
        });

        var domElement4 = document.createElement("button");
        domElement4.style.display = "block";
        arjsDebugUIContainer.appendChild(domElement4);

        domElement4.id = "sizeButton";
        domElement4.innerHTML = "click to change the size";
        domElement4.href = "javascript:void(0)";
        domElement4.style.position = "absolute";
        domElement4.style.top = "-700%";
        domElement4.style.left = "10px";
        domElement4.addEventListener("click", function (e) {
          e.preventDefault();
          handleClick4();
        });

        var domElement5 = document.createElement("button");
        domElement5.style.display = "block";
        arjsDebugUIContainer.appendChild(domElement5);

        domElement5.id = "test4";
        // domElement5.innerHTML = "change colour to green";
        domElement5.href = "javascript:void(0)";
        domElement5.style.position = "absolute";
        domElement5.style.top = "-600%";
        domElement5.style.left = "110px";
        domElement5.style.width = "2vw"
        domElement5.style.height = "4vh"
        domElement5.style.backgroundColor = "yellow"
        domElement5.addEventListener("click", function (e) {
          e.preventDefault();
          handleClick5();
        });
      }.bind(this)
    );
  },

  loadAnimation: function (model) {
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.model.animations.forEach((animation) => {
      this.mixer.clipAction(animation, model).play();
    });
  },

  changeToBlue: function (model) {
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.model.traverse((node) => {
      if (node.isMesh) {
        node.material.color.set(0x0000ff); // Set color to blue
      }
    });
  },

  changeToGreen: function (model) {
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.model.traverse((node) => {
      if (node.isMesh) {
        node.material.color.set(0x00ffff); // Set color to green
      }
    });
  },

  changeToYellow: function (model) {
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.model.traverse((node) => {
      if (node.isMesh) {
        node.material.color.set(0xffff00); // Set color to green
      }
    });
  },

  changeSize: function () {
    if (this.model) {
      // Increase or decrease the scale factor
      this.scaleFactor = this.scaleFactor === 1.0 ? 1.5 : 1.0;

      // Apply the new scale to the model
      this.model.scale.set(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    }
  },

  tick: function (t, dt) {
    if (this.mixer && !isNaN(dt)) {
      this.mixer.update(dt / 1000);
    }
  },
});
