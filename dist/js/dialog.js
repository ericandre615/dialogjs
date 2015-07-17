var Dialog = function(config) {
  var el = document.createElement('div'),
      overlayEl;

  el.classList.add('modal');
  config = config || {};

  this.parentID = config.parentEl || 'app';
  this.id = config.id || 'modal-message';
  this.classes = config.classes || 'dialog';
  this.type = config.type || 'basic';
  this.overlay = config.overlay || false;
  this.message = config.message || 'you just got alerted';
  this.el = createEl.call(this) || el;
  this.overlayEl = createOverlay.call(this) || overlayEl;
  this.callback = config.callback || false;

  if(this.type === 'basic') {
    var closeButton = document.createElement('button');
    closeButton.value = 'Close';
    closeButton.innerHTML = 'Close';
    closeButton.classList.add('btn-close');

    this.el.appendChild(closeButton);
  }

  if(this.type === 'confirm') {
    var cancelButton = document.createElement('button'),
        confirmButton = document.createElement('button');

    cancelButton.value = 'Cancel';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.classList.add('btn-cancel');

    confirmButton.value = 'Confirm';
    confirmButton.innerHTML = 'Confirm';
    confirmButton.classList.add('btn-confirm');

    this.el.appendChild(cancelButton);
    this.el.appendChild(confirmButton);
  }

  function createOverlay() {
    if(this.overlay) {
      overlayEl = document.createElement('div');
      overlayEl.id = 'modal-overlay';
      overlayEl.classList.add('overlay');
    }

    return overlayEl;
  }

  function createEl() {
    var classes = this.classes.split(' ');
    el.id = this.id;
    el.classList.add('modal');
    classes.forEach(function(item) {
      el.classList.add(item);
    });

    el.innerHTML = this.message;

    return el;
  }

  return this;
};

Dialog.prototype =  {
  open: function open() {
    var parentEl = document.getElementById(this.parentID),
        el = this.el;
        overlayEl = this.overlayEl;
    var confirmCallBack = this.callback || false;

    if(!parentEl) {
      return new Error('Parent Element does not exist');
    }

    parentEl.appendChild(this.el);

    if(this.overlay && overlayEl) {
      parentEl.appendChild(overlayEl);
    }

    if(this.type === 'basic' || this.type === 'confirm') {
      el.addEvent = function addEvent() {
          el.addEventListener('click', this, false);
      };
      el.handleEvent = function handleEvent(e, confirmCallback) {
          e.preventDefault();
          var confirmed = false;
          if(e.target && e.target.nodeName === 'BUTTON') {
            if(e.target.classList.contains('btn-close') || e.target.classList.contains('btn-cancel')) {
              if(overlayEl) {
                parentEl.removeChild(overlayEl);
              }
              this.removeEventListener('click', this, false);
              parentEl.removeChild(this);
              return confirmed;
            }
            if(e.target.classList.contains('btn-confirm')) {
              confirmed = true;
              if(confirmCallBack) {
                confirmCallBack(confirmed);
              }
              if(overlayEl) {
                parentEl.removeChild(overlayEl);
              }
              this.removeEventListener('click', this, false);
              parentEl.removeChild(this);
              return confirmed;
            }
          }
        };
      el.addEvent();
    }
    return;
  },
  close: function close() {
    var parentEl = document.getElementById(this.parentID);
    if(!parentEl) {
      return new Error('Parent Element does not exist');
    }

    if(this.overlayEl) {
      parentEl.removeChild(this.overlayEl);
    }

    parentEl.removeChild(this.el);
    return;
  }
};
