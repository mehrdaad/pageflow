import {ConfigurationEditorView} from 'pageflow/ui'

import {TextInputView, CheckBoxInputView, TextAreaInputView} from 'pageflow/ui';
import {FileInputView} from 'pageflow/editor';
import Marionette from 'backbone.marionette';

export const SidebarEditLinkView = Marionette.Layout.extend({
  template: (data) => `
    <a class="back">${I18n.t('pageflow_scrolled.editor.content_elements.externalLinkList.back')}</a>
    <a class="destroy">${I18n.t('pageflow_scrolled.editor.content_elements.externalLinkList.destroy')}</a>

    <div class='form_container'></div>
  `,
  className: 'edit_external_link',
  regions: {
    formContainer: '.form_container',
  },
  events: {
    'click a.back': 'goBack',
    'click a.destroy': 'destroyLink'
  },
  initialize: function(options) {},
  onRender: function () {
    var configurationEditor = new ConfigurationEditorView({
      model: this.model,
      attributeTranslationKeyPrefixes: ['pageflow_scrolled.editor.content_elements.externalLinkList.attributes'],
      tabTranslationKeyPrefix: 'pageflow_scrolled.editor.content_elements.externalLinkList.tabs'
    });
    var self = this;
    configurationEditor.tab('edit_link', function () {
      this.input('url', TextInputView, {
        required: true
      });
      this.input('open_in_new_tab', CheckBoxInputView);
      this.input('thumbnail', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElement.externalLinks.link',
        fileSelectionHandlerOptions: {
          contentElementId: self.options.contentElement.get('id')
        },
        positioning: false
      });
      this.input('title', TextInputView, {
        required: true
      });
      this.input('description', TextAreaInputView, {
        size: 'short',
        disableLinks: true
      });
    });
    this.formContainer.show(configurationEditor);
  },
  goBack: function() {
    editor.navigate(`/scrolled/external_links/${this.options.contentElement.get('id')}/`, {trigger: true});
  },
  destroyLink: function () {
    if (confirm('pageflow_scrolled.editor.content_elements.externalLinkList.confirm_delete_link')) {
      this.options.collection.remove(this.model);
      this.goBack();
    }
  },
});