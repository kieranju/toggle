"use strict";
var ToggleHandler = (function () {
    function ToggleHandler() {
        this.toggles = [];
        this.triggerSelector = 'data-toggle-trigger';
        this.receiverSelector = 'data-toggle-receiver';
        this.init();
    }
    ToggleHandler.prototype.init = function () {
        var _this = this;
        var triggers = Array.from(document.querySelectorAll("[" + this.triggerSelector + "]"));
        var receivers = Array.from(document.querySelectorAll("[" + this.receiverSelector + "]"));
        var triggerGroups = this.groupBy(triggers, function (trigger) { return trigger.getAttribute(_this.triggerSelector); });
        var receiverGroups = this.groupBy(receivers, function (receiver) { return receiver.getAttribute(_this.receiverSelector); });
        triggerGroups.forEach(function (triggerGroup, key) {
            var receiverGroup = receiverGroups.get(key);
            _this.toggles.push(new Toggle(triggerGroup, receiverGroup));
        });
    };
    ToggleHandler.prototype.groupBy = function (items, callback) {
        var itemGroups = new Map();
        items.map(function (item) {
            var key = callback(item);
            var itemGroup = itemGroups.get(key);
            if (!itemGroup) {
                itemGroups.set(key, [item]);
            }
            else {
                itemGroup.push(item);
                itemGroups.set(key, itemGroup);
            }
        });
        return itemGroups;
    };
    return ToggleHandler;
}());
var Toggle = (function () {
    function Toggle(triggers, receivers) {
        this.toggleSelector = 'data-toggle';
        this.triggers = triggers;
        this.receivers = receivers;
        this.init();
    }
    Toggle.prototype.init = function () {
        var _this = this;
        this.triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function (event) {
                _this.toggle(_this.triggers);
                _this.toggle(_this.receivers);
            });
        });
    };
    Toggle.prototype.toggle = function (elements) {
        var _this = this;
        elements.map(function (element) {
            element.classList.toggle(element.getAttribute(_this.toggleSelector));
        });
    };
    return Toggle;
}());
