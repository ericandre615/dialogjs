# DialogJS
## Constructor for basic modal dialog

This could be abstracted and cleaned up. Quick code that was specific to a project that was basically a deadline is yesterday, you haven't ever worked on it, make it work situation.

There is plenty to do to imporve this and make it better. Feel free to customize it.

## Styling

The basic styling is in the src/less/dialog.less and compiled to /dist/css/dialog.css. Hear you can change the styles to whatever you would like. It has some basic ones and some that were specific to the project.

## Dialog
Dialog object comes with two methods on it's prototype, open and close. Dialog.open will create the modal element and open it on screen. Dialog.close will destroy the modal element.

### Options
 - parentEl: `String` representing the id of the parent element for the modal. Current default is 'app'
 - id: `String` this modal elements html id. Default 'modal-message'
 - classes: `String` string with space separated list of HTML classes to add to the modal element. Default 'dialog'
 - type: `String` representing the type of modal. Default 'basic'
  - 'basic' displays your message in the modal with one Close button
  - 'confirm' adds a cancel and confirm button to the modal. you can optional pass in a callback for the listener. It will return `false` if cancel button is clicked and `true` if the confirm button was clicked
 - overlay: `boolean` true if you want a full screen overlay over your content, but below the modal dialog. Default `false`
 - message: `String` the message you want displayed when the modal is open. Defaul 'you just got alerted'
 - callback: `Function` the callback function you want to handle the response. Either `true` or `false` is returned to the callback. This option only works with `type: 'confirm'`

## Usage
### Basic
`var modal = new Dialog({message: 'hello modal'}) // instantiate a new Dialog obejct`
`modal.open() // create element and open on screen`
`modal.close() // destroy Dialog element`

creates a basic modal window. Takes one configuration object.

### Advanced

```
  function handleModal(result) {
    if(result === true) {
      // the said okay and agreed handle success
      console.log(result);
    } else {
      // they declined
      console.log(result);
    }
  }

  var modal = new Dialog({
    callback: handleModal,
    id: 'newsletter-dialog',
    parentEl: 'newsletter-section',
    type: 'confirm',
    overlay: true,
    classes: 'newsletter modal',
    message: 'Do you want to join my awesome newsletter?'
    });

  // whenever you want to prompt the user
  modal.open();

  // or on a button click event
  document.addEventListener('click', modal.open, false);

  // programatically close modal
  modal.close();
```

You don't have to explicitly call `.close` any button they click in the modal will close/destroy the modal.
