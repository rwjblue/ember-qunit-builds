"use strict";
var __resolver__;

function setResolver(resolver) {
  __resolver__ = resolver;
}

exports.setResolver = setResolver;function getResolver() {
  if (__resolver__ == null) throw new Error('you must set a resolver with `testResolver.setResolver(resolver)`');
  return __resolver__;
}

exports.getResolver = getResolver;