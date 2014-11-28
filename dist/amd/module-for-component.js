define(
  ["./test-resolver","./module-for","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var testResolver = __dependency1__["default"] || __dependency1__;
    var moduleFor = __dependency2__["default"] || __dependency2__;
    var Ember = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = function moduleForComponent(name, description, callbacks) {
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
  });