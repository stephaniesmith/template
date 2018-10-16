'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.state = {
      options: props.options
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);

        if (options) this.setState(function () {
          return { options: options };
        });
      } catch (e) {}
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var options = this.state.options;


      if (prevState.options.length !== options.length) {
        var json = JSON.stringify(options);
        localStorage.setItem('options', json);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('Goodbye!');
    }
  }, {
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var options = this.state.options;

      var index = Math.floor(Math.random() * options.length);

      alert(options[index]);
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(option) {
      var options = this.state.options;

      if (!option) {
        return 'Enter valid value to add item';
      } else if (options.indexOf(option) > -1) {
        return 'This option already exists';
      }
      this.setState(function (prevState) {
        return {
          options: prevState.options.concat(option)
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var subTitle = 'Decide some stuff.';
      var options = this.state.options;


      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subTitle: subTitle }),
        React.createElement(Action, {
          hasOptions: options.length > 0,
          handlePick: this.handlePick
        }),
        React.createElement(Options, {
          options: options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, {
          handleAddOption: this.handleAddOption
        })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
  options: []
};

var Header = function Header(props) {
  var title = props.title,
      subTitle = props.subTitle;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      title
    ),
    subTitle && React.createElement(
      'h2',
      null,
      subTitle
    )
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

var Action = function Action(props) {
  var hasOptions = props.hasOptions,
      handlePick = props.handlePick;


  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: handlePick,
        disabled: !hasOptions
      },
      'What should I do?'
    )
  );
};

var Options = function Options(props) {
  var options = props.options,
      handleDeleteOptions = props.handleDeleteOptions,
      handleDeleteOption = props.handleDeleteOption;


  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: handleDeleteOptions },
      'Remove All'
    ),
    options.length === 0 && React.createElement(
      'p',
      null,
      'Please add an option to get started!'
    ),
    options.map(function (option, index) {
      return React.createElement(Option, {
        key: index,
        option: option,
        handleDeleteOption: handleDeleteOption
      });
    })
  );
};

var Option = function Option(props) {
  var option = props.option,
      handleDeleteOption = props.handleDeleteOption;

  return React.createElement(
    'div',
    null,
    option,
    React.createElement(
      'button',
      {
        onClick: function onClick(e) {
          handleDeleteOption(option);
        }
      },
      'remove'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'handleAddOption',
    value: function handleAddOption(e) {
      e.preventDefault();
      var handleAddOption = this.props.handleAddOption;


      var option = e.target.elements.option.value.trim();
      var error = handleAddOption(option);

      this.setState(function () {
        return { error: error };
      });

      if (!error) e.target.elements.option.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      var error = this.state.error;


      return React.createElement(
        'div',
        null,
        error && React.createElement(
          'p',
          null,
          error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            null,
            'Submit'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
