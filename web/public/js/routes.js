function createHomeVM() {
  var self = {}, methods = {};

  self.data = {};
  methods.create = function (e) {
    e.preventDefault();
    qwest
      .post('/api/stairs', this.$data.stair)
      .then(function(res) {
        page.show('/stairs/' + JSON.parse(res).id);
      }).catch((function (vm) {
        return function (e) {
          vm.error = this.responseText;
        };
      })(this));
  };

  self.methods = methods;
  self.data.error = false;
  self.data.stair = { developers: '' };

  return self;
}

function createStairVM(stair) {
  var self = {}, methods = {};

  self.computed = {};
  self.data = { stair: stair, hovering: null };
  methods.count = function (name) {
    return this.$data.stair.pairs[name].count;
  };
  methods.set = function (name) {
    this.$data.hovering = name;
  }
  methods.unset = function () {
    this.$data.hovering = null;
  }

  methods.increment = function (name) {
    qwest.post('/api/stairs/' + this.$data.stair.id + '/' + name + '/increment')
      .then((function (res) {
        this.stair = JSON.parse(res);
      }).bind(this));
  };

  methods.decrement = function (name) {
    qwest.post('/api/stairs/' + this.$data.stair.id + '/' + name + '/decrement')
      .then((function (res) {
        this.stair = JSON.parse(res);
      }).bind(this));
  };
  self.methods = methods;

  return self;
}

function clearMainNode() {
  var main = document.querySelector('main');

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

function setMainNodeContent(template) {
  var main = document.querySelector('main');
  clearMainNode();
  main.appendChild(document.importNode(template.content, true));
}

handlers = {};
handlers.home = function (ctx, next) {
  setMainNodeContent(document.querySelector('#home-template'));
  homeViewModel = new Vue(createHomeVM(ctx, next.bind(this)));
  homeViewModel.$mount(document.querySelector('main'));
  ctx.save();
};

handlers.stair = function (ctx, next) {
  qwest.get('/api/stairs/' + ctx.params.id).then(function (res) {
    setMainNodeContent(document.querySelector('#stair-template'));
    stairVM = new Vue(createStairVM(JSON.parse(res)));
    stairVM.$mount(document.querySelector('main'));
  }).catch(function (e) {
    ctx.state.error = this.responseText || this.statusText;
    ctx.state.number = this.status;
    ctx.save();
    next()
  });
};

handlers.error = function (ctx) {
  var number, msg;
  number = ctx.state.number;
  msg = ctx.state.error;
  errorViewModel = new Vue({ data: { error: number, msg: msg }});
  setMainNodeContent(document.querySelector('#error-template'));
  errorViewModel.$mount(document.querySelector('main'));
}

window.addEventListener('load', function () {
  page('/', handlers.home);
  page('/stairs', handlers.home);
  page('/stairs/:id', handlers.stair);
  page('*', handlers.error);
  page();
});

