import testResolver from './test-resolver';
import moduleFor from './module-for';
import Ember from 'ember';

export default function moduleForComponent(name, description, callbacks) {
  var resolver = testResolver.getResolver();

  moduleFor('component:' + name, description, callbacks, function(container, context, defaultSubject) {
    var layoutName = 'template:components/' + name;

    var layout = resolver.resolve(layoutName);

    if (layout) {
      container.register(layoutName, layout);
      container.injection('component:' + name, 'layout', layoutName);
    }

    context.dispatcher = Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');

    context.__setup_properties__.render = function() {
      var containerView = Ember.ContainerView.create({container: container});
      var view = Ember.run(function(){
        var subject = context.subject();
        containerView.pushObject(subject);
        containerView.appendTo('#ember-testing');
        return subject;
      });

      var oldTeardown = this.teardown;
      this.teardown = function() {
        Ember.run(function() {
          Ember.tryInvoke(containerView, 'destroy');
        });

        if (oldTeardown) {
          return oldTeardown.apply(this, arguments);
        }
      };

      return view.$();
    };

    context.__setup_properties__.append = function(){
      Ember.deprecate('this.append() is deprecated. Please use this.render() instead.');
      return this.render();
    };

    context.$ = function(){
      var $view = this.render(), subject = this.subject();

      if(arguments.length){
        return subject.$.apply(subject, arguments);
      }else{
        return $view;
      }
    };
  });
}
