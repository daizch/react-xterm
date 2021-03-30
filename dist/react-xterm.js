"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.XTerm = exports.Terminal = void 0;
var React = require("react");
var xterm_1 = require("xterm");
Object.defineProperty(exports, "Terminal", { enumerable: true, get: function () { return xterm_1.Terminal; } });
var className = require('classnames');
var XTerm = (function (_super) {
    __extends(XTerm, _super);
    function XTerm(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.onInput = function (data) {
            _this.props.onInput && _this.props.onInput(data);
        };
        _this.state = {
            isFocused: false
        };
        return _this;
    }
    XTerm.prototype.applyAddon = function (addon) {
        this.xterm.loadAddon(addon);
    };
    XTerm.prototype.componentDidMount = function () {
        var _this = this;
        this.xterm = new xterm_1.Terminal(this.props.options);
        if (this.props.addons) {
            this.props.addons.forEach(function (addon) {
                _this.xterm.loadAddon(addon);
            });
        }
        this.xterm.open(this.container);
        this.container.addEventListener('focus', this.focusChanged.bind(this, true));
        this.container.addEventListener('blur', this.focusChanged.bind(this, true));
        if (this.props.onContextMenu) {
            this.xterm.element.addEventListener('contextmenu', this.onContextMenu.bind(this));
        }
        if (this.props.onInput) {
            this.xterm.onData(this.onInput);
        }
        if (this.props.value) {
            this.xterm.write(this.props.value);
        }
    };
    XTerm.prototype.componentWillUnmount = function () {
        if (this.xterm) {
            this.xterm.dispose();
            this.xterm = null;
        }
    };
    XTerm.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var _this = this;
        if (nextProps.hasOwnProperty('value') && nextProps.value != this.props.value) {
            if (this.xterm) {
                this.xterm.clear();
                setTimeout(function () {
                    _this.xterm.write(nextProps.value);
                }, 0);
            }
        }
        return false;
    };
    XTerm.prototype.getTerminal = function () {
        return this.xterm;
    };
    XTerm.prototype.write = function (data) {
        this.xterm && this.xterm.write(data);
    };
    XTerm.prototype.writeln = function (data) {
        this.xterm && this.xterm.writeln(data);
    };
    XTerm.prototype.focus = function () {
        if (this.xterm) {
            this.xterm.focus();
        }
    };
    XTerm.prototype.focusChanged = function (focused) {
        this.setState({
            isFocused: focused
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    };
    XTerm.prototype.resize = function (cols, rows) {
        this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
    };
    XTerm.prototype.setOption = function (key, value) {
        this.xterm && this.xterm.setOption(key, value);
    };
    XTerm.prototype.refresh = function () {
        this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
    };
    XTerm.prototype.onContextMenu = function (e) {
        this.props.onContextMenu && this.props.onContextMenu(e);
    };
    XTerm.prototype.render = function () {
        var _this = this;
        var terminalClassName = className('ReactXTerm', this.state.isFocused ? 'ReactXTerm--focused' : null, this.props.className);
        return React.createElement("div", { ref: function (ref) { return (_this.container = ref); }, className: terminalClassName });
    };
    return XTerm;
}(React.Component));
exports.XTerm = XTerm;
exports.default = XTerm;
