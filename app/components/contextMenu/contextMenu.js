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
    }
    }));

    window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log(e.target);
        rightClickPosition = {x: e.x, y: e.y};
        menu.popup(currentWindow);
    }, false);
})();
