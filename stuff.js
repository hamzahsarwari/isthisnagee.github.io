YUI({
    gallery: 'gallery-2013.03.27-22-06'
}).use('gallery-sm-menu', function (Y) {
    // Create a new menu and render it inside the #menu node.
    var menu = new Y.Menu({
        container: '#menu',

        items: [
            {label: 'First Item', url: 'http://www.example.com/'},
            {label: 'Second Item', children: [
                {label: 'Submenu Item'},
                {label: 'Another Submenu Item'}
            ]},

            {type: 'separator'},

            {label: 'Group Heading', type: 'heading'},
            {label: 'Another Item'}
        ]
    });

    menu.render().show();
}