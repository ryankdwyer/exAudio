'use strict';
(function () {
    const remote = require('remote');
    const Menu = remote.require('menu');
    const MenuItem = remote.require('menu-item');

    const currentWindow = remote.getCurrentWindow();

    let rightClickPosition = null;

    const menu = new Menu();
    menu.append(new MenuItem({ label: 'Inspect Element', click: () => {
      console.log('test');
    }}));
    menu.append(new MenuItem({label: 'Play song', click: () => {
      console.log('Playing song');
    }}));

    window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        rightClickPosition = {x: e.x, y: e.y};
        menu.popup(currentWindow);
    }, false);
})();
