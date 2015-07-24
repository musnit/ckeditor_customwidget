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

      template: 
        '<div class="custom-widget">' +
          '<div class="build-thirdparty-placeholder">' +
            '<div class="build-thirdparty-placeholder-graphic"></div>' +
            '<div class="build-thirdparty-placeholder-message">' +
              '<span>Your custom widget will appear here.</span>' +
            '</div>' +
          '</div>' +
          '<div class="customwidget-html"></div>' +
          '<div class="customwidget-escapedjs"></div>' +
          '<div class="customwidget-rawjs-container"></div>' +
        '</div>',

      upcast: function( element ) {
        return element.name == 'div' && element.hasClass( 'custom-widget' );
      },
      init: function() {
          var html = this.element.$.getElementsByClassName('customwidget-html')[0].innerHTML;
          if ( html )
            this.setData( 'customhtml', html );
          var js = this.element.$.getElementsByClassName('customwidget-escapedjs')[0].textContent;
          if ( js )
            this.setData( 'customjs', unescape(js) );
      },
      data: function() {
        this.element.$.getElementsByClassName('customwidget-html')[0].innerHTML = this.data.customhtml
        var wrappedJS = '';
        var escapedJS = '';
        if (this.data.customjs){
          wrappedJS = escape('$(document).ready(function(){' +
            'if(typeof CKEDITOR === "undefined"){' +
            this.data.customjs + 
            '}});'
          );
          escapedJS = escape(this.data.customjs);
        }
        this.element.$.getElementsByClassName('customwidget-escapedjs')[0].textContent = escapedJS;
        var rawScript = document.createComment('{cke_protected}%3Cscript%20type%3D%22text%2Fjavascript%22%3E' + wrappedJS + '%3C%2Fscript%3E');
        var rawJSContainer = this.element.$.getElementsByClassName('customwidget-rawjs-container')[0];
        var oldScript = rawJSContainer.childNodes[0];
        if (oldScript){
          rawJSContainer.removeChild(oldScript);
        }
        rawJSContainer.appendChild(rawScript);
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