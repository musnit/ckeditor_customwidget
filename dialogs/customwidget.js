CKEDITOR.dialog.add( 'customwidget', function( editor ) {
    return {
        title: 'Edit Custom Widget',
        minWidth: 800,
        minHeight: 300,
        contents: [
            {
                id: 'info',
                elements: [
                    // Dialog window UI elements.
                    {
                        type: 'textarea',
                        id: 'html',
                        label: 'HTML to add once page is loaded:',
                        'default': '<div id="custom-widget-1">',
                        rows: 10,
                        setup: function( widget ) {
                            //this.setValue(  );
                        },
                        commit: function( widget ) {
                            //widget.setData( 'something', this.getValue() );
                        }
                    },
                    {
                        type: 'textarea',
                        id: 'js',
                        label: 'Javascript to run once page is loaded:',
                        'default': '$(\'.custom-widget-1\').widgetize();',
                        rows: 10,
                        setup: function( widget ) {
                            //this.setValue(  );
                        },
                        commit: function( widget ) {
                            //widget.setData( 'something', this.getValue() );
                        }
                    }
                ]
            }
        ]
    };
} );