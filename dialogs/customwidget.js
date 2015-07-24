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
                        rows: 10,
                        setup: function( widget ) {
                          this.getInputElement().$.placeholder = '<div id="custom-widget-1">'
                          this.setValue( widget.data.customhtml );
                        },
                        commit: function( widget ) {
                            widget.setData( 'customhtml', this.getValue() );
                        }
                    },
                    {
                        type: 'textarea',
                        id: 'js',
                        label: 'Javascript to run once page is loaded:',
                        rows: 10,
                        setup: function( widget ) {
                            this.getInputElement().$.placeholder = '$(\'.custom-widget-1\').widgetize();'
                            this.setValue( widget.data.customjs );
                        },
                        commit: function( widget ) {
                            widget.setData( 'customjs', this.getValue() );
                        }
                    }
                ]
            }
        ]
    };
} );