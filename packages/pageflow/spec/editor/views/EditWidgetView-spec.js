describe('EditWidgetView', () => {
  var f = support.factories;

  test('renders widget configuration editor', () => {
    var widgetTypes = f.widgetTypes([
      {name: 'default_bar', role: 'navigation'},
      {name: 'fancy_bar', role: 'navigation'}
    ], function(w) {
      w.register('fancy_bar', {
        configurationEditorView: Backbone.View.extend({
          className: 'edit_fancy_bar'
        })
      });
    });
    var widget = new pageflow.Widget({
      id: 'navigation',
      type_name: 'fancy_bar'
    }, {widgetTypes: widgetTypes});
    var view = new pageflow.EditWidgetView({
      model: widget,
      widgetTypes: widgetTypes
    });

    view.render();

    expect(view.$el.find('.edit_fancy_bar').length).toBe(1);
  });
});