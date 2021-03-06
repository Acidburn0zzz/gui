var AbstractInspector = require("ui/abstract/abstract-inspector").AbstractInspector;

exports.NetworkInterface = AbstractInspector.specialize({
    isAddressSourceDhcp: {
        value: null
    },

    dhcpAlias: {
        value: null
    },

    _object: {
        value: null
    },

    object: {
        get: function() {
            return this._object;
        },
        set: function(object) {
            if (this._object !== object) {
                this._object = object;
            }
        }
    },

    _inspectorTemplateDidLoad: {
        value: function() {
            this.interfaces = this._sectionService.entries;
        }
    },

    enterDocument: {
        value: function() {
            this.super();
            this._sectionService.initializeInterface(this.object);
            this.addPathChangeListener('object.dhcp', this, '_handleDhcpChange');
        }
    },

    exitDocument: {
        value: function() {
            this.super();
        }
    },

    _handleDhcpChange: {
        value: function() {
            this._sectionService.handleDhcpChangeOnInterface(this.object);
        }
    },

    save: {
        value: function() {
            return this._sectionService.saveInterface(this.object);
        }
    },

    revert: {
        value: function() {
            var self = this;
            return this.inspector.revert().then(function() {
                self._sectionService.initializeInterface(self.object);
            });
        }
    },

    _handleInspectorExit: {
        value: function() {
            var defaults = [['name']],
                ignored = ['media', 'vlan', 'aliases.*.broadcast'],
                self = this;

            if (this.hasObjectChanged(defaults, ignored)) {
                var resolve, reject,
                    promise = new Promise(function(_resolve, _reject) {
                        resolve = _resolve;
                        reject = _reject;
                    });
                this.application.confirmationModal = {
                    isShown: true,
                    title: 'You have unsaved changes!',
                    message: 'Would you like to save your recent changes?',
                    buttonLabelFalse: "Don't Save",
                    buttonLabelTrue: 'Review Changes',
                    deferred: {
                        resolve: resolve,
                        reject: reject,
                        promise: promise
                    }
                };
                return promise.then(function(result){
                    if (result) {
                        return true;
                    } else {
                        self.revert();
                        return false;
                    }
                });
            }
        }
    }
});
