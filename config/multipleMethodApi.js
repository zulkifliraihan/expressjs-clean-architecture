const express = require('express');

const multipleMethodApi = () => {
    express.Route.prototype.allOf = function (methods /*, ... */) {
        "use strict";
      
        let i, varargs, methodFunc, route = this;
      
        methods = (typeof methods === "string") ? [methods] : methods;
        if (methods.length < 1) {
            throw new Error("You must specify at least one method name.");
        }
      
        varargs = Array.prototype.slice.call(arguments, 1);
        for (i = 0; i < methods.length; i++) {
            methodFunc = route[methods[i]];
            if (! (methodFunc instanceof Function)) {
                throw new Error("Unrecognized method name: " +
                                methods[i]);
            }
            route = methodFunc.apply(route, varargs);
        }
      
        return route;
    };
}

module.exports = multipleMethodApi