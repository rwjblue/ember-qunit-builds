define(
  ["exports"],
  function(__exports__) {
    "use strict";
    var __resolver__;

    function setResolver(resolver) {
      __resolver__ = resolver;
    }

    __exports__.setResolver = setResolver;function getResolver() {
      if (__resolver__ == null) throw new Error('you must set a resolver with `testResolver.setResolver(resolver)`');
      return __resolver__;
    }

    __exports__.getResolver = getResolver;
  });