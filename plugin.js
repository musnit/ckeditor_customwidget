// Register the plugin within the editor.
CKEDITOR.plugins.add( 'customwidget', {
  // This plugin requires the Widgets System defined in the 'widget' plugin.
  requires: 'widget',

  // Register the icon used for the toolbar button. It must be the same
  // as the name of the widget.
  icons: 'customwidget',

  // The plugin initialization logic goes inside this method.
  init: function( editor ) {
    // Register the shoppingcart widget.
    editor.widgets.add( 'customwidget', {
      allowedContent:
          'div(!custom-widget);',

      requiredContent: 'div(custom-widget)',

      template: '<div class="custom-widget">Your custom widget will appear here</div>',

      upcast: function( element ) {
        return element.name == 'div' && element.hasClass( 'custom-widget' );
      },
      init: function(){

      },
      data: function(){

      },
      dialog: 'customwidget'
    });

    editor.ui.addButton( 'CustomWidget', {

      // The text part of the button (if available) and tooptip.
      label: 'Insert Custom Widget',

      // The command to execute on click.
      command: 'customwidget',

      // The button placement in the toolbar (toolbar group name).
      toolbar: 'insert'
    });

    CKEDITOR.dialog.add( 'customwidget', this.path + 'dialogs/customwidget.js' );

    if (editor.addMenuItem) {
      editor.addMenuGroup('customwidget');

      editor.addMenuItem( 'editWidget', {
        label: 'Edit Code/HTML',
        command: 'customwidget',
        group: 'customwidget'
      });
    }

    if (editor.contextMenu) {
      editor.contextMenu.addListener(function(element, selection) {
        if (element && element.$ && element.$.firstChild && element.$.firstChild.getAttribute && element.$.firstChild.getAttribute('data-widget') === 'customwidget'){
          return {
            editWidget: CKEDITOR.TRISTATE_ON,
          };
        }
        else{
          return null;
        }
      });
    }

  }
} );