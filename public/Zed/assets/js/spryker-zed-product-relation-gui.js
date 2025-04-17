(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-relation-gui"],{

/***/ "./node_modules/@spryker/jquery-query-builder/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@spryker/jquery-query-builder/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var dot = __webpack_require__(/*! dot/doT */ "./node_modules/dot/doT.js");
__webpack_require__(/*! jquery-extendext */ "./node_modules/jquery-extendext/jquery-extendext.js");

(function (factory) {
    factory(jQuery, dot);
}(function ($, doT) {

// CLASS DEFINITION
// ===============================
    var QueryBuilder = function ($el, options) {
        this.init($el, options);
    };


// EVENTS SYSTEM
// ===============================
    $.extend(QueryBuilder.prototype, {
        change: function (type, value) {
            var event = new $.Event(type + '.queryBuilder.filter', {
                builder: this,
                value: value
            });

            this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 2));

            return event.value;
        },

        trigger: function (type) {
            var event = new $.Event(type + '.queryBuilder', {
                builder: this
            });

            this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 1));

            return event;
        },

        on: function (type, cb) {
            this.$el.on(type + '.queryBuilder', cb);
            return this;
        },

        off: function (type, cb) {
            this.$el.off(type + '.queryBuilder', cb);
            return this;
        },

        once: function (type, cb) {
            this.$el.one(type + '.queryBuilder', cb);
            return this;
        }
    });


// PLUGINS SYSTEM
// ===============================
    QueryBuilder.plugins = {};

    /**
     * Get or extend the default configuration
     * @param options {object,optional} new configuration, leave undefined to get the default config
     * @return {undefined|object} nothing or configuration object (copy)
     */
    QueryBuilder.defaults = function (options) {
        if (typeof options == 'object') {
            $.extendext(true, 'replace', QueryBuilder.DEFAULTS, options);
        }
        else if (typeof options == 'string') {
            if (typeof QueryBuilder.DEFAULTS[options] == 'object') {
                return $.extend(true, {}, QueryBuilder.DEFAULTS[options]);
            }
            else {
                return QueryBuilder.DEFAULTS[options];
            }
        }
        else {
            return $.extend(true, {}, QueryBuilder.DEFAULTS);
        }
    };

    /**
     * Define a new plugin
     * @param {string}
     * @param {function}
     * @param {object,optional} default configuration
     */
    QueryBuilder.define = function (name, fct, def) {
        QueryBuilder.plugins[name] = {
            fct: fct,
            def: def || {}
        };
    };

    /**
     * Add new methods
     * @param {object}
     */
    QueryBuilder.extend = function (methods) {
        $.extend(QueryBuilder.prototype, methods);
    };

    /**
     * Init plugins for an instance
     * @throws ConfigError
     */
    QueryBuilder.prototype.initPlugins = function () {
        if (!this.plugins) {
            return;
        }

        if ($.isArray(this.plugins)) {
            var tmp = {};
            this.plugins.forEach(function (plugin) {
                tmp[plugin] = null;
            });
            this.plugins = tmp;
        }

        Object.keys(this.plugins).forEach(function (plugin) {
            if (plugin in QueryBuilder.plugins) {
                this.plugins[plugin] = $.extend(true, {},
                    QueryBuilder.plugins[plugin].def,
                    this.plugins[plugin] || {}
                );

                QueryBuilder.plugins[plugin].fct.call(this, this.plugins[plugin]);
            }
            else {
                Utils.error('Config', 'Unable to find plugin "{0}"', plugin);
            }
        }, this);
    };


    /**
     * Allowed types and their internal representation
     */
    QueryBuilder.types = {
        'string': 'string',
        'integer': 'number',
        'double': 'number',
        'date': 'datetime',
        'time': 'datetime',
        'datetime': 'datetime',
        'boolean': 'boolean'
    };

    /**
     * Allowed inputs
     */
    QueryBuilder.inputs = [
        'text',
        'textarea',
        'radio',
        'checkbox',
        'select'
    ];

    /**
     * Runtime modifiable options with `setOptions` method
     */
    QueryBuilder.modifiable_options = [
        'display_errors',
        'allow_groups',
        'allow_empty',
        'default_condition',
        'default_filter'
    ];

    /**
     * CSS selectors for common components
     */
    var Selectors = QueryBuilder.selectors = {
        group_container: '.rules-group-container',
        rule_container: '.rule-container',
        filter_container: '.rule-filter-container',
        operator_container: '.rule-operator-container',
        value_container: '.rule-value-container',
        error_container: '.error-container',
        condition_container: '.rules-group-header .group-conditions',

        rule_header: '.rule-header',
        group_header: '.rules-group-header',
        group_actions: '.group-actions',
        rule_actions: '.rule-actions',

        rules_list: '.rules-group-body>.rules-list',

        group_condition: '.rules-group-header [name$=_cond]',
        rule_filter: '.rule-filter-container [name$=_filter]',
        rule_operator: '.rule-operator-container [name$=_operator]',
        rule_value: '.rule-value-container [name*=_value_]',

        add_rule: '[data-add=rule]',
        delete_rule: '[data-delete=rule]',
        add_group: '[data-add=group]',
        delete_group: '[data-delete=group]'
    };

    /**
     * Template strings (see `template.js`)
     */
    QueryBuilder.templates = {};

    /**
     * Localized strings (see `i18n/`)
     */
    QueryBuilder.regional = {};

    /**
     * Default operators
     */
    QueryBuilder.OPERATORS = {
        equal: {type: 'equal', nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        not_equal: {
            type: 'not_equal',
            nb_inputs: 1,
            multiple: false,
            apply_to: ['string', 'number', 'datetime', 'boolean']
        },
        in: {type: 'in', nb_inputs: 1, multiple: true, apply_to: ['string', 'number', 'datetime']},
        not_in: {type: 'not_in', nb_inputs: 1, multiple: true, apply_to: ['string', 'number', 'datetime']},
        less: {type: 'less', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        less_or_equal: {type: 'less_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        greater: {type: 'greater', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        greater_or_equal: {type: 'greater_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        between: {type: 'between', nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime']},
        not_between: {type: 'not_between', nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime']},
        begins_with: {type: 'begins_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        not_begins_with: {type: 'not_begins_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        contains: {type: 'contains', nb_inputs: 1, multiple: false, apply_to: ['string']},
        not_contains: {type: 'not_contains', nb_inputs: 1, multiple: false, apply_to: ['string']},
        ends_with: {type: 'ends_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        not_ends_with: {type: 'not_ends_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        is_empty: {type: 'is_empty', nb_inputs: 0, multiple: false, apply_to: ['string']},
        is_not_empty: {type: 'is_not_empty', nb_inputs: 0, multiple: false, apply_to: ['string']},
        is_null: {
            type: 'is_null',
            nb_inputs: 0,
            multiple: false,
            apply_to: ['string', 'number', 'datetime', 'boolean']
        },
        is_not_null: {
            type: 'is_not_null',
            nb_inputs: 0,
            multiple: false,
            apply_to: ['string', 'number', 'datetime', 'boolean']
        }
    };

    /**
     * Default configuration
     */
    QueryBuilder.DEFAULTS = {
        filters: [],
        plugins: [],

        sort_filters: false,
        display_errors: true,
        allow_groups: -1,
        allow_empty: false,
        conditions: ['AND', 'OR'],
        default_condition: 'AND',
        inputs_separator: ' , ',
        select_placeholder: '------',
        display_empty_filter: true,
        default_filter: null,
        optgroups: {},

        default_rule_flags: {
            filter_readonly: false,
            operator_readonly: false,
            value_readonly: false,
            no_delete: false
        },

        default_group_flags: {
            condition_readonly: false,
            no_delete: false
        },

        templates: {
            group: null,
            rule: null,
            filterSelect: null,
            operatorSelect: null
        },

        lang_code: 'en',
        lang: {},

        operators: [
            'equal',
            'not_equal',
            'in',
            'not_in',
            'less',
            'less_or_equal',
            'greater',
            'greater_or_equal',
            'between',
            'not_between',
            'begins_with',
            'not_begins_with',
            'contains',
            'not_contains',
            'ends_with',
            'not_ends_with',
            'is_empty',
            'is_not_empty',
            'is_null',
            'is_not_null'
        ],

        icons: {
            add_group: 'glyphicon glyphicon-plus-sign',
            add_rule: 'glyphicon glyphicon-plus',
            remove_group: 'glyphicon glyphicon-remove',
            remove_rule: 'glyphicon glyphicon-remove',
            error: 'glyphicon glyphicon-warning-sign'
        }
    };


    /**
     * Init the builder
     */
    QueryBuilder.prototype.init = function ($el, options) {
        $el[0].queryBuilder = this;
        this.$el = $el;

        // PROPERTIES
        this.settings = $.extendext(true, 'replace', {}, QueryBuilder.DEFAULTS, options);
        this.model = new Model();
        this.status = {
            group_id: 0,
            rule_id: 0,
            generated_id: false,
            has_optgroup: false,
            has_operator_oprgroup: false,
            id: null,
            updating_value: false
        };

        // "allow_groups" can be boolean or int
        if (this.settings.allow_groups === false) {
            this.settings.allow_groups = 0;
        }
        else if (this.settings.allow_groups === true) {
            this.settings.allow_groups = -1;
        }

        // SETTINGS SHORTCUTS
        this.filters = this.settings.filters;
        this.icons = this.settings.icons;
        this.operators = this.settings.operators;
        this.templates = this.settings.templates;
        this.plugins = this.settings.plugins;

        // translations : english << 'lang_code' << custom
        if (QueryBuilder.regional['en'] === undefined) {
            Utils.error('Config', '"i18n/en.js" not loaded.');
        }
        this.lang = $.extendext(true, 'replace', {}, QueryBuilder.regional['en'], QueryBuilder.regional[this.settings.lang_code], this.settings.lang);

        // init templates
        Object.keys(this.templates).forEach(function (tpl) {
            if (!this.templates[tpl]) {
                this.templates[tpl] = QueryBuilder.templates[tpl];
            }
            if (typeof this.templates[tpl] == 'string') {
                this.templates[tpl] = doT.template(this.templates[tpl]);
            }
        }, this);

        // ensure we have a container id
        if (!this.$el.attr('id')) {
            this.$el.attr('id', 'qb_' + Math.floor(Math.random() * 99999));
            this.status.generated_id = true;
        }
        this.status.id = this.$el.attr('id');

        // INIT
        this.$el.addClass('query-builder');

        this.filters = this.checkFilters(this.filters);
        this.operators = this.checkOperators(this.operators);
        this.bindEvents();
        this.initPlugins();

        this.trigger('afterInit');

        if (options.rules) {
            this.setRules(options.rules);
            delete this.settings.rules;
        }
        else {
            this.setRoot(true);
        }
    };

    /**
     * Checks the configuration of each filter
     * @throws ConfigError
     */
    QueryBuilder.prototype.checkFilters = function (filters) {
        var definedFilters = [];

        if (!filters || filters.length === 0) {
            Utils.error('Config', 'Missing filters list');
        }

        filters.forEach(function (filter, i) {
            if (!filter.id) {
                Utils.error('Config', 'Missing filter {0} id', i);
            }
            if (definedFilters.indexOf(filter.id) != -1) {
                Utils.error('Config', 'Filter "{0}" already defined', filter.id);
            }
            definedFilters.push(filter.id);

            if (!filter.type) {
                filter.type = 'string';
            }
            else if (!QueryBuilder.types[filter.type]) {
                Utils.error('Config', 'Invalid type "{0}"', filter.type);
            }

            if (!filter.input) {
                filter.input = 'text';
            }
            else if (typeof filter.input != 'function' && QueryBuilder.inputs.indexOf(filter.input) == -1) {
                Utils.error('Config', 'Invalid input "{0}"', filter.input);
            }

            if (filter.operators) {
                filter.operators.forEach(function (operator) {
                    if (typeof operator != 'string') {
                        Utils.error('Config', 'Filter operators must be global operators types (string)');
                    }
                });
            }

            if (!filter.field) {
                filter.field = filter.id;
            }
            if (!filter.label) {
                filter.label = filter.field;
            }

            if (!filter.optgroup) {
                filter.optgroup = null;
            }
            else {
                this.status.has_optgroup = true;

                // register optgroup if needed
                if (!this.settings.optgroups[filter.optgroup]) {
                    this.settings.optgroups[filter.optgroup] = filter.optgroup;
                }
            }

            switch (filter.input) {
                case 'radio':
                case 'checkbox':
                    if (!filter.values || filter.values.length < 1) {
                        Utils.error('Config', 'Missing filter "{0}" values', filter.id);
                    }
                    break;

                case 'select':
                    if (filter.placeholder) {
                        if (filter.placeholder_value === undefined) {
                            filter.placeholder_value = -1;
                        }
                        Utils.iterateOptions(filter.values, function (key) {
                            if (key == filter.placeholder_value) {
                                Utils.error('Config', 'Placeholder of filter "{0}" overlaps with one of its values', filter.id);
                            }
                        });
                    }
                    break;
            }
        }, this);

        if (this.settings.sort_filters) {
            if (typeof this.settings.sort_filters == 'function') {
                filters.sort(this.settings.sort_filters);
            }
            else {
                var self = this;
                filters.sort(function (a, b) {
                    return self.translateLabel(a.label).localeCompare(self.translateLabel(b.label));
                });
            }
        }

        if (this.status.has_optgroup) {
            filters = Utils.groupSort(filters, 'optgroup');
        }

        return filters;
    };

    /**
     * Checks the configuration of each operator
     * @throws ConfigError
     */
    QueryBuilder.prototype.checkOperators = function (operators) {
        var definedOperators = [];

        operators.forEach(function (operator, i) {
            if (typeof operator == 'string') {
                if (!QueryBuilder.OPERATORS[operator]) {
                    Utils.error('Config', 'Unknown operator "{0}"', operator);
                }

                operators[i] = operator = $.extendext(true, 'replace', {}, QueryBuilder.OPERATORS[operator]);
            }
            else {
                if (!operator.type) {
                    Utils.error('Config', 'Missing "type" for operator {0}', i);
                }

                if (QueryBuilder.OPERATORS[operator.type]) {
                    operators[i] = operator = $.extendext(true, 'replace', {}, QueryBuilder.OPERATORS[operator.type], operator);
                }

                if (operator.nb_inputs === undefined || operator.apply_to === undefined) {
                    Utils.error('Config', 'Missing "nb_inputs" and/or "apply_to" for operator "{0}"', operator.type);
                }
            }

            if (definedOperators.indexOf(operator.type) != -1) {
                Utils.error('Config', 'Operator "{0}" already defined', operator.type);
            }
            definedOperators.push(operator.type);

            if (!operator.optgroup) {
                operator.optgroup = null;
            }
            else {
                this.status.has_operator_optgroup = true;

                // register optgroup if needed
                if (!this.settings.optgroups[operator.optgroup]) {
                    this.settings.optgroups[operator.optgroup] = operator.optgroup;
                }
            }
        }, this);

        if (this.status.has_operator_optgroup) {
            operators = Utils.groupSort(operators, 'optgroup');
        }

        return operators;
    };

    /**
     * Add all events listeners
     */
    QueryBuilder.prototype.bindEvents = function () {
        var self = this;

        // group condition change
        this.$el.on('change.queryBuilder', Selectors.group_condition, function () {
            if ($(this).is(':checked')) {
                var $group = $(this).closest(Selectors.group_container);
                Model($group).condition = $(this).val();
            }
        });

        // rule filter change
        this.$el.on('change.queryBuilder', Selectors.rule_filter, function () {
            var $rule = $(this).closest(Selectors.rule_container);
            Model($rule).filter = self.getFilterById($(this).val());
        });

        // rule operator change
        this.$el.on('change.queryBuilder', Selectors.rule_operator, function () {
            var $rule = $(this).closest(Selectors.rule_container);
            Model($rule).operator = self.getOperatorByType($(this).val());
        });

        // add rule button
        this.$el.on('click.queryBuilder', Selectors.add_rule, function () {
            var $group = $(this).closest(Selectors.group_container);
            self.addRule(Model($group));
        });

        // delete rule button
        this.$el.on('click.queryBuilder', Selectors.delete_rule, function () {
            var $rule = $(this).closest(Selectors.rule_container);
            self.deleteRule(Model($rule));
        });

        if (this.settings.allow_groups !== 0) {
            // add group button
            this.$el.on('click.queryBuilder', Selectors.add_group, function () {
                var $group = $(this).closest(Selectors.group_container);
                self.addGroup(Model($group));
            });

            // delete group button
            this.$el.on('click.queryBuilder', Selectors.delete_group, function () {
                var $group = $(this).closest(Selectors.group_container);
                self.deleteGroup(Model($group));
            });
        }

        // model events
        this.model.on({
            'drop': function (e, node) {
                node.$el.remove();
                self.refreshGroupsConditions();
            },
            'add': function (e, node, index) {
                if (index === 0) {
                    node.$el.prependTo(node.parent.$el.find('>' + Selectors.rules_list));
                }
                else {
                    node.$el.insertAfter(node.parent.rules[index - 1].$el);
                }
                self.refreshGroupsConditions();
            },
            'move': function (e, node, group, index) {
                node.$el.detach();

                if (index === 0) {
                    node.$el.prependTo(group.$el.find('>' + Selectors.rules_list));
                }
                else {
                    node.$el.insertAfter(group.rules[index - 1].$el);
                }
                self.refreshGroupsConditions();
            },
            'update': function (e, node, field, value, oldValue) {
                if (node instanceof Rule) {
                    switch (field) {
                        case 'error':
                            self.displayError(node);
                            break;

                        case 'flags':
                            self.applyRuleFlags(node);
                            break;

                        case 'filter':
                            self.updateRuleFilter(node);
                            break;

                        case 'operator':
                            self.updateRuleOperator(node, oldValue);
                            break;

                        case 'value':
                            self.updateRuleValue(node);
                            break;
                    }
                }
                else {
                    switch (field) {
                        case 'error':
                            self.displayError(node);
                            break;

                        case 'flags':
                            self.applyGroupFlags(node);
                            break;

                        case 'condition':
                            self.updateGroupCondition(node);
                            break;
                    }
                }
            }
        });
    };

    /**
     * Create the root group
     * @param addRule {bool,optional} add a default empty rule
     * @param data {mixed,optional} group custom data
     * @param flags {object,optional} flags to apply to the group
     * @return group {Root}
     */
    QueryBuilder.prototype.setRoot = function (addRule, data, flags) {
        addRule = (addRule === undefined || addRule === true);

        var group_id = this.nextGroupId();
        var $group = $(this.getGroupTemplate(group_id, 1));

        this.$el.append($group);
        this.model.root = new Group(null, $group);
        this.model.root.model = this.model;

        this.model.root.data = data;
        this.model.root.flags = $.extend({}, this.settings.default_group_flags, flags);

        this.trigger('afterAddGroup', this.model.root);

        this.model.root.condition = this.settings.default_condition;

        if (addRule) {
            this.addRule(this.model.root);
        }

        return this.model.root;
    };

    /**
     * Add a new group
     * @param parent {Group}
     * @param addRule {bool,optional} add a default empty rule
     * @param data {mixed,optional} group custom data
     * @param flags {object,optional} flags to apply to the group
     * @return group {Group}
     */
    QueryBuilder.prototype.addGroup = function (parent, addRule, data, flags) {
        addRule = (addRule === undefined || addRule === true);

        var level = parent.level + 1;

        var e = this.trigger('beforeAddGroup', parent, addRule, level);
        if (e.isDefaultPrevented()) {
            return null;
        }

        var group_id = this.nextGroupId();
        var $group = $(this.getGroupTemplate(group_id, level));
        var model = parent.addGroup($group);

        model.data = data;
        model.flags = $.extend({}, this.settings.default_group_flags, flags);

        this.trigger('afterAddGroup', model);

        model.condition = this.settings.default_condition;

        if (addRule) {
            this.addRule(model);
        }

        return model;
    };

    /**
     * Tries to delete a group. The group is not deleted if at least one rule is no_delete.
     * @param group {Group}
     * @return {boolean} true if the group has been deleted
     */
    QueryBuilder.prototype.deleteGroup = function (group) {
        if (group.isRoot()) {
            return false;
        }

        var e = this.trigger('beforeDeleteGroup', group);
        if (e.isDefaultPrevented()) {
            return false;
        }

        var del = true;

        group.each('reverse', function (rule) {
            del &= this.deleteRule(rule);
        }, function (group) {
            del &= this.deleteGroup(group);
        }, this);

        if (del) {
            group.drop();
            this.trigger('afterDeleteGroup');
        }

        return del;
    };

    /**
     * Changes the condition of a group
     * @param group {Group}
     */
    QueryBuilder.prototype.updateGroupCondition = function (group) {
        group.$el.find('>' + Selectors.group_condition).each(function () {
            var $this = $(this);
            $this.prop('checked', $this.val() === group.condition);
            $this.parent().toggleClass('active', $this.val() === group.condition);
        });

        this.trigger('afterUpdateGroupCondition', group);
    };

    /**
     * Update visibility of conditions based on number of rules inside each group
     */
    QueryBuilder.prototype.refreshGroupsConditions = function () {
        (function walk(group) {
            if (!group.flags || (group.flags && !group.flags.condition_readonly)) {
                group.$el.find('>' + Selectors.group_condition).prop('disabled', group.rules.length <= 1)
                    .parent().toggleClass('disabled', group.rules.length <= 1);
            }

            group.each(function (rule) {
            }, function (group) {
                walk(group);
            }, this);
        }(this.model.root));
    };

    /**
     * Add a new rule
     * @param parent {Group}
     * @param data {mixed,optional} rule custom data
     * @param flags {object,optional} flags to apply to the rule
     * @return rule {Rule}
     */
    QueryBuilder.prototype.addRule = function (parent, data, flags) {
        var e = this.trigger('beforeAddRule', parent);
        if (e.isDefaultPrevented()) {
            return null;
        }

        var rule_id = this.nextRuleId();
        var $rule = $(this.getRuleTemplate(rule_id));
        var model = parent.addRule($rule);

        if (data !== undefined) {
            model.data = data;
        }

        model.flags = $.extend({}, this.settings.default_rule_flags, flags);

        this.trigger('afterAddRule', model);

        this.createRuleFilters(model);

        if (this.settings.default_filter || !this.settings.display_empty_filter) {
            model.filter = this.getFilterById(this.settings.default_filter || this.filters[0].id);
        }

        return model;
    };

    /**
     * Delete a rule.
     * @param rule {Rule}
     * @return {boolean} true if the rule has been deleted
     */
    QueryBuilder.prototype.deleteRule = function (rule) {
        if (rule.flags.no_delete) {
            return false;
        }

        var e = this.trigger('beforeDeleteRule', rule);
        if (e.isDefaultPrevented()) {
            return false;
        }

        rule.drop();

        this.trigger('afterDeleteRule');

        return true;
    };

    /**
     * Create the filters <select> for a rule
     * @param rule {Rule}
     */
    QueryBuilder.prototype.createRuleFilters = function (rule) {
        var filters = this.change('getRuleFilters', this.filters, rule);
        var $filterSelect = $(this.getRuleFilterSelect(rule, filters));

        rule.$el.find(Selectors.filter_container).html($filterSelect);

        this.trigger('afterCreateRuleFilters', rule);
    };

    /**
     * Create the operators <select> for a rule and init the rule operator
     * @param rule {Rule}
     */
    QueryBuilder.prototype.createRuleOperators = function (rule) {
        var $operatorContainer = rule.$el.find(Selectors.operator_container).empty();

        if (!rule.filter) {
            return;
        }

        var operators = this.getOperators(rule.filter);
        var $operatorSelect = $(this.getRuleOperatorSelect(rule, operators));

        $operatorContainer.html($operatorSelect);

        // set the operator without triggering update event
        rule.__.operator = operators[0];

        this.trigger('afterCreateRuleOperators', rule, operators);
    };

    /**
     * Create the main input for a rule
     * @param rule {Rule}
     */
    QueryBuilder.prototype.createRuleInput = function (rule) {
        var $valueContainer = rule.$el.find(Selectors.value_container).empty();

        rule.__.value = undefined;

        if (!rule.filter || !rule.operator || rule.operator.nb_inputs === 0) {
            return;
        }

        var self = this;
        var $inputs = $();
        var filter = rule.filter;

        for (var i = 0; i < rule.operator.nb_inputs; i++) {
            var $ruleInput = $(this.getRuleInput(rule, i));
            if (i > 0) $valueContainer.append(this.settings.inputs_separator);
            $valueContainer.append($ruleInput);
            $inputs = $inputs.add($ruleInput);
        }

        $valueContainer.show();

        $inputs.on('change ' + (filter.input_event || ''), function () {
            self.status.updating_value = true;
            rule.value = self.getRuleValue(rule);
            self.status.updating_value = false;
        });

        if (filter.plugin) {
            $inputs[filter.plugin](filter.plugin_config || {});
        }

        this.trigger('afterCreateRuleInput', rule);

        if (filter.default_value !== undefined) {
            rule.value = filter.default_value;
        }
        else {
            self.status.updating_value = true;
            rule.value = self.getRuleValue(rule);
            self.status.updating_value = false;
        }
    };

    /**
     * Perform action when rule's filter is changed
     * @param rule {Rule}
     */
    QueryBuilder.prototype.updateRuleFilter = function (rule) {
        this.createRuleOperators(rule);
        this.createRuleInput(rule);

        rule.$el.find(Selectors.rule_filter).val(rule.filter ? rule.filter.id : '-1');

        this.trigger('afterUpdateRuleFilter', rule);
    };

    /**
     * Update main <input> visibility when rule operator changes
     * @param rule {Rule}
     * @param previousOperator {object}
     */
    QueryBuilder.prototype.updateRuleOperator = function (rule, previousOperator) {
        var $valueContainer = rule.$el.find(Selectors.value_container);

        if (!rule.operator || rule.operator.nb_inputs === 0) {
            $valueContainer.hide();

            rule.__.value = undefined;
        }
        else {
            $valueContainer.show();

            if ($valueContainer.is(':empty') || rule.operator.nb_inputs !== previousOperator.nb_inputs) {
                this.createRuleInput(rule);
            }
        }

        if (rule.operator) {
            rule.$el.find(Selectors.rule_operator).val(rule.operator.type);
        }

        this.trigger('afterUpdateRuleOperator', rule);
    };

    /**
     * Perform action when rule's value is changed
     * @param rule {Rule}
     */
    QueryBuilder.prototype.updateRuleValue = function (rule) {
        if (!this.status.updating_value) {
            this.setRuleValue(rule, rule.value);
        }

        this.trigger('afterUpdateRuleValue', rule);
    };

    /**
     * Change rules properties depending on flags.
     * @param rule {Rule}
     */
    QueryBuilder.prototype.applyRuleFlags = function (rule) {
        var flags = rule.flags;

        if (flags.filter_readonly) {
            rule.$el.find(Selectors.rule_filter).prop('disabled', true);
        }
        if (flags.operator_readonly) {
            rule.$el.find(Selectors.rule_operator).prop('disabled', true);
        }
        if (flags.value_readonly) {
            rule.$el.find(Selectors.rule_value).prop('disabled', true);
        }
        if (flags.no_delete) {
            rule.$el.find(Selectors.delete_rule).remove();
        }

        this.trigger('afterApplyRuleFlags', rule);
    };

    /**
     * Change group properties depending on flags.
     * @param group {Group}
     */
    QueryBuilder.prototype.applyGroupFlags = function (group) {
        var flags = group.flags;

        if (flags.condition_readonly) {
            group.$el.find('>' + Selectors.group_condition).prop('disabled', true)
                .parent().addClass('readonly');
        }
        if (flags.no_delete) {
            group.$el.find(Selectors.delete_group).remove();
        }

        this.trigger('afterApplyGroupFlags', group);
    };

    /**
     * Clear all errors markers
     * @param node {Node,optional} default is root Group
     */
    QueryBuilder.prototype.clearErrors = function (node) {
        node = node || this.model.root;

        if (!node) {
            return;
        }

        node.error = null;

        if (node instanceof Group) {
            node.each(function (rule) {
                rule.error = null;
            }, function (group) {
                this.clearErrors(group);
            }, this);
        }
    };

    /**
     * Add/Remove class .has-error and update error title
     * @param node {Node}
     */
    QueryBuilder.prototype.displayError = function (node) {
        if (this.settings.display_errors) {
            if (node.error === null) {
                node.$el.removeClass('has-error');
            }
            else {
                // translate the text without modifying event array
                var error = $.extend([], node.error, [
                    this.lang.errors[node.error[0]] || node.error[0]
                ]);

                node.$el.addClass('has-error')
                    .find(Selectors.error_container).eq(0)
                    .attr('title', Utils.fmt.apply(null, error));
            }
        }
    };

    /**
     * Trigger a validation error event
     * @param node {Node}
     * @param error {array}
     * @param value {mixed}
     */
    QueryBuilder.prototype.triggerValidationError = function (node, error, value) {
        if (!$.isArray(error)) {
            error = [error];
        }

        var e = this.trigger('validationError', node, error, value);
        if (!e.isDefaultPrevented()) {
            node.error = error;
        }
    };


    /**
     * Destroy the plugin
     */
    QueryBuilder.prototype.destroy = function () {
        this.trigger('beforeDestroy');

        if (this.status.generated_id) {
            this.$el.removeAttr('id');
        }

        this.clear();
        this.model = null;

        this.$el
            .off('.queryBuilder')
            .removeClass('query-builder')
            .removeData('queryBuilder');

        delete this.$el[0].queryBuilder;
    };

    /**
     * Reset the plugin
     */
    QueryBuilder.prototype.reset = function () {
        this.status.group_id = 1;
        this.status.rule_id = 0;

        this.model.root.empty();

        this.addRule(this.model.root);

        this.trigger('afterReset');
    };

    /**
     * Clear the plugin
     */
    QueryBuilder.prototype.clear = function () {
        this.status.group_id = 0;
        this.status.rule_id = 0;

        if (this.model.root) {
            this.model.root.drop();
            this.model.root = null;
        }

        this.trigger('afterClear');
    };

    /**
     * Modify the builder configuration
     * Only options defined in QueryBuilder.modifiable_options are modifiable
     * @param {object}
     */
    QueryBuilder.prototype.setOptions = function (options) {
        // use jQuery utils to filter options keys
        $.makeArray($(Object.keys(options)).filter(QueryBuilder.modifiable_options))
            .forEach(function (opt) {
                this.settings[opt] = options[opt];
            }, this);
    };

    /**
     * Return the model associated to a DOM object, or root model
     * @param {jQuery,optional}
     * @return {Node}
     */
    QueryBuilder.prototype.getModel = function (target) {
        return !target ? this.model.root : Model(target);
    };

    /**
     * Validate the whole builder
     * @return {boolean}
     */
    QueryBuilder.prototype.validate = function () {
        this.clearErrors();

        var self = this;

        var valid = (function parse(group) {
            var done = 0;
            var errors = 0;

            group.each(function (rule) {
                if (!rule.filter) {
                    self.triggerValidationError(rule, 'no_filter', null);
                    errors++;
                    return;
                }

                if (rule.operator.nb_inputs !== 0) {
                    var valid = self.validateValue(rule, rule.value);

                    if (valid !== true) {
                        self.triggerValidationError(rule, valid, rule.value);
                        errors++;
                        return;
                    }
                }

                done++;

            }, function (group) {
                if (parse(group)) {
                    done++;
                }
                else {
                    errors++;
                }
            });

            if (errors > 0) {
                return false;
            }
            else if (done === 0 && (!self.settings.allow_empty || !group.isRoot())) {
                self.triggerValidationError(group, 'empty_group', null);
                return false;
            }

            return true;

        }(this.model.root));

        return this.change('validate', valid);
    };

    /**
     * Get an object representing current rules
     * @param {object} options
     *      - get_flags: false[default] | true(only changes from default flags) | 'all'
     * @return {object}
     */
    QueryBuilder.prototype.getRules = function (options) {
        options = $.extend({
            get_flags: false
        }, options);

        if (!this.validate()) {
            return {};
        }

        var self = this;

        var out = (function parse(group) {
            var data = {
                condition: group.condition,
                rules: []
            };

            if (group.data) {
                data.data = $.extendext(true, 'replace', {}, group.data);
            }

            if (options.get_flags) {
                var flags = self.getGroupFlags(group.flags, options.get_flags === 'all');
                if (!$.isEmptyObject(flags)) {
                    data.flags = flags;
                }
            }

            group.each(function (model) {
                var value = null;
                if (model.operator.nb_inputs !== 0) {
                    value = model.value;
                }

                var rule = {
                    id: model.filter.id,
                    field: model.filter.field,
                    type: model.filter.type,
                    input: model.filter.input,
                    operator: model.operator.type,
                    value: value
                };

                if (model.filter.data || model.data) {
                    rule.data = $.extendext(true, 'replace', {}, model.filter.data, model.data);
                }

                if (options.get_flags) {
                    var flags = self.getRuleFlags(model.flags, options.get_flags === 'all');
                    if (!$.isEmptyObject(flags)) {
                        rule.flags = flags;
                    }
                }

                data.rules.push(rule);

            }, function (model) {
                data.rules.push(parse(model));
            });

            return data;

        }(this.model.root));

        return this.change('getRules', out);
    };

    /**
     * Set rules from object
     * @throws RulesError, UndefinedConditionError
     * @param data {object}
     */
    QueryBuilder.prototype.setRules = function (data) {
        if ($.isArray(data)) {
            data = {
                condition: this.settings.default_condition,
                rules: data
            };
        }

        if (!data || !data.rules || (data.rules.length === 0 && !this.settings.allow_empty)) {
            Utils.error('RulesParse', 'Incorrect data object passed');
        }

        this.clear();
        this.setRoot(false, data.data, this.parseGroupFlags(data));

        data = this.change('setRules', data);

        var self = this;

        (function add(data, group) {
            if (group === null) {
                return;
            }

            if (data.condition === undefined) {
                data.condition = self.settings.default_condition;
            }
            else if (self.settings.conditions.indexOf(data.condition) == -1) {
                Utils.error('UndefinedCondition', 'Invalid condition "{0}"', data.condition);
            }

            group.condition = data.condition;

            data.rules.forEach(function (item) {
                var model;
                if (item.rules && item.rules.length > 0) {
                    if (self.settings.allow_groups !== -1 && self.settings.allow_groups < group.level) {
                        self.reset();
                        Utils.error('RulesParse', 'No more than {0} groups are allowed', self.settings.allow_groups);
                    }
                    else {
                        model = self.addGroup(group, false, item.data, self.parseGroupFlags(item));
                        if (model === null) {
                            return;
                        }

                        add(item, model);
                    }
                }
                else {
                    if (item.id === undefined) {
                        Utils.error('RulesParse', 'Missing rule field id');
                    }
                    if (item.operator === undefined) {
                        item.operator = 'equal';
                    }

                    model = self.addRule(group, item.data);
                    if (model === null) {
                        return;
                    }

                    model.filter = self.getFilterById(item.id);
                    model.operator = self.getOperatorByType(item.operator);
                    model.flags = self.parseRuleFlags(item);

                    if (model.operator.nb_inputs !== 0 && item.value !== undefined) {
                        model.value = item.value;
                    }
                }
            });

        }(data, this.model.root));
    };


    /**
     * Check if a value is correct for a filter
     * @param rule {Rule}
     * @param value {string|string[]|undefined}
     * @return {array|true}
     */
    QueryBuilder.prototype.validateValue = function (rule, value) {
        var validation = rule.filter.validation || {};
        var result = true;

        if (validation.callback) {
            result = validation.callback.call(this, value, rule);
        }
        else {
            result = this.validateValueInternal(rule, value);
        }

        return this.change('validateValue', result, value, rule);
    };

    /**
     * Default validation function
     * @throws ConfigError
     * @param rule {Rule}
     * @param value {string|string[]|undefined}
     * @return {array|true}
     */
    QueryBuilder.prototype.validateValueInternal = function (rule, value) {
        var filter = rule.filter;
        var operator = rule.operator;
        var validation = filter.validation || {};
        var result = true;
        var tmp;

        if (rule.operator.nb_inputs === 1) {
            value = [value];
        }
        else {
            value = value;
        }

        for (var i = 0; i < operator.nb_inputs; i++) {
            switch (filter.input) {
                case 'radio':
                    if (value[i] === undefined) {
                        result = ['radio_empty'];
                        break;
                    }
                    break;

                case 'checkbox':
                    if (value[i] === undefined || value[i].length === 0) {
                        result = ['checkbox_empty'];
                        break;
                    }
                    else if (!operator.multiple && value[i].length > 1) {
                        result = ['operator_not_multiple', operator.type];
                        break;
                    }
                    break;

                case 'select':
                    if (filter.multiple) {
                        if (value[i] === undefined || value[i].length === 0 || (filter.placeholder && value[i] == filter.placeholder_value)) {
                            result = ['select_empty'];
                            break;
                        }
                        else if (!operator.multiple && value[i].length > 1) {
                            result = ['operator_not_multiple', operator.type];
                            break;
                        }
                    }
                    else {
                        if (value[i] === undefined || (filter.placeholder && value[i] == filter.placeholder_value)) {
                            result = ['select_empty'];
                            break;
                        }
                    }
                    break;

                default:
                    switch (QueryBuilder.types[filter.type]) {
                        case 'string':
                            if (value[i] === undefined || value[i].length === 0) {
                                result = ['string_empty'];
                                break;
                            }
                            if (validation.min !== undefined) {
                                if (value[i].length < parseInt(validation.min)) {
                                    result = ['string_exceed_min_length', validation.min];
                                    break;
                                }
                            }
                            if (validation.max !== undefined) {
                                if (value[i].length > parseInt(validation.max)) {
                                    result = ['string_exceed_max_length', validation.max];
                                    break;
                                }
                            }
                            if (validation.format) {
                                if (typeof validation.format == 'string') {
                                    validation.format = new RegExp(validation.format);
                                }
                                if (!validation.format.test(value[i])) {
                                    result = ['string_invalid_format', validation.format];
                                    break;
                                }
                            }
                            break;

                        case 'number':
                            if (value[i] === undefined || isNaN(value[i])) {
                                result = ['number_nan'];
                                break;
                            }
                            if (filter.type == 'integer') {
                                if (parseInt(value[i]) != value[i]) {
                                    result = ['number_not_integer'];
                                    break;
                                }
                            }
                            else {
                                if (parseFloat(value[i]) != value[i]) {
                                    result = ['number_not_double'];
                                    break;
                                }
                            }
                            if (validation.min !== undefined) {
                                if (value[i] < parseFloat(validation.min)) {
                                    result = ['number_exceed_min', validation.min];
                                    break;
                                }
                            }
                            if (validation.max !== undefined) {
                                if (value[i] > parseFloat(validation.max)) {
                                    result = ['number_exceed_max', validation.max];
                                    break;
                                }
                            }
                            if (validation.step !== undefined && validation.step !== 'any') {
                                var v = (value[i] / validation.step).toPrecision(14);
                                if (parseInt(v) != v) {
                                    result = ['number_wrong_step', validation.step];
                                    break;
                                }
                            }
                            break;

                        case 'datetime':
                            if (value[i] === undefined || value[i].length === 0) {
                                result = ['datetime_empty'];
                                break;
                            }

                            // we need MomentJS
                            if (validation.format) {
                                if (!('moment' in window)) {
                                    Utils.error('MissingLibrary', 'MomentJS is required for Date/Time validation. Get it here http://momentjs.com');
                                }

                                var datetime = moment(value[i], validation.format);
                                if (!datetime.isValid()) {
                                    result = ['datetime_invalid', validation.format];
                                    break;
                                }
                                else {
                                    if (validation.min) {
                                        if (datetime < moment(validation.min, validation.format)) {
                                            result = ['datetime_exceed_min', validation.min];
                                            break;
                                        }
                                    }
                                    if (validation.max) {
                                        if (datetime > moment(validation.max, validation.format)) {
                                            result = ['datetime_exceed_max', validation.max];
                                            break;
                                        }
                                    }
                                }
                            }
                            break;

                        case 'boolean':
                            tmp = value[i].trim().toLowerCase();
                            if (tmp !== 'true' && tmp !== 'false' && tmp !== '1' && tmp !== '0' && value[i] !== 1 && value[i] !== 0) {
                                result = ['boolean_not_valid'];
                                break;
                            }
                    }
            }

            if (result !== true) {
                break;
            }
        }

        return result;
    };

    /**
     * Returns an incremented group ID
     * @return {string}
     */
    QueryBuilder.prototype.nextGroupId = function () {
        return this.status.id + '_group_' + (this.status.group_id++);
    };

    /**
     * Returns an incremented rule ID
     * @return {string}
     */
    QueryBuilder.prototype.nextRuleId = function () {
        return this.status.id + '_rule_' + (this.status.rule_id++);
    };

    /**
     * Returns the operators for a filter
     * @param filter {string|object} (filter id name or filter object)
     * @return {object[]}
     */
    QueryBuilder.prototype.getOperators = function (filter) {
        if (typeof filter == 'string') {
            filter = this.getFilterById(filter);
        }

        var result = [];

        for (var i = 0, l = this.operators.length; i < l; i++) {
            // filter operators check
            if (filter.operators) {
                if (filter.operators.indexOf(this.operators[i].type) == -1) {
                    continue;
                }
            }
            // type check
            else if (this.operators[i].apply_to.indexOf(QueryBuilder.types[filter.type]) == -1) {
                continue;
            }

            result.push(this.operators[i]);
        }

        // keep sort order defined for the filter
        if (filter.operators) {
            result.sort(function (a, b) {
                return filter.operators.indexOf(a.type) - filter.operators.indexOf(b.type);
            });
        }

        return this.change('getOperators', result, filter);
    };

    /**
     * Returns a particular filter by its id
     * @throws UndefinedFilterError
     * @param filterId {string}
     * @return {object|null}
     */
    QueryBuilder.prototype.getFilterById = function (id) {
        if (id == '-1') {
            return null;
        }

        for (var i = 0, l = this.filters.length; i < l; i++) {
            if (this.filters[i].id == id) {
                return this.filters[i];
            }
        }

        Utils.error('UndefinedFilter', 'Undefined filter "{0}"', id);
    };

    /**
     * Return a particular operator by its type
     * @throws UndefinedOperatorError
     * @param type {string}
     * @return {object|null}
     */
    QueryBuilder.prototype.getOperatorByType = function (type) {
        if (type == '-1') {
            return null;
        }

        for (var i = 0, l = this.operators.length; i < l; i++) {
            if (this.operators[i].type == type) {
                return this.operators[i];
            }
        }

        Utils.error('UndefinedOperator', 'Undefined operator "{0}"', type);
    };

    /**
     * Returns rule value
     * @param rule {Rule}
     * @return {mixed}
     */
    QueryBuilder.prototype.getRuleValue = function (rule) {
        var filter = rule.filter;
        var operator = rule.operator;
        var value = [];

        if (filter.valueGetter) {
            value = filter.valueGetter.call(this, rule);
        }
        else {
            var $value = rule.$el.find(Selectors.value_container);

            for (var i = 0; i < operator.nb_inputs; i++) {
                var name = Utils.escapeElementId(rule.id + '_value_' + i);
                var tmp;

                switch (filter.input) {
                    case 'radio':
                        value.push($value.find('[name=' + name + ']:checked').val());
                        break;

                    case 'checkbox':
                        tmp = [];
                        $value.find('[name=' + name + ']:checked').each(function () {
                            tmp.push($(this).val());
                        });
                        value.push(tmp);
                        break;

                    case 'select':
                        if (filter.multiple) {
                            tmp = [];
                            $value.find('[name=' + name + '] option:selected').each(function () {
                                tmp.push($(this).val());
                            });
                            value.push(tmp);
                        }
                        else {
                            value.push($value.find('[name=' + name + '] option:selected').val());
                        }
                        break;

                    default:
                        value.push($value.find('[name=' + name + ']').val());
                }
            }

            if (operator.nb_inputs === 1) {
                value = value[0];
            }

            // @deprecated
            if (filter.valueParser) {
                value = filter.valueParser.call(this, rule, value);
            }
        }

        return this.change('getRuleValue', value, rule);
    };

    /**
     * Sets the value of a rule.
     * @param rule {Rule}
     * @param value {mixed}
     */
    QueryBuilder.prototype.setRuleValue = function (rule, value) {
        var filter = rule.filter;
        var operator = rule.operator;

        if (filter.valueSetter) {
            filter.valueSetter.call(this, rule, value);
        }
        else {
            var $value = rule.$el.find(Selectors.value_container);

            if (operator.nb_inputs == 1) {
                value = [value];
            }
            else {
                value = value;
            }

            for (var i = 0; i < operator.nb_inputs; i++) {
                var name = Utils.escapeElementId(rule.id + '_value_' + i);

                switch (filter.input) {
                    case 'radio':
                        $value.find('[name=' + name + '][value="' + value[i] + '"]').prop('checked', true).trigger('change');
                        break;

                    case 'checkbox':
                        if (!$.isArray(value[i])) {
                            value[i] = [value[i]];
                        }
                        value[i].forEach(function (value) {
                            $value.find('[name=' + name + '][value="' + value + '"]').prop('checked', true).trigger('change');
                        });
                        break;

                    default:
                        $value.find('[name=' + name + ']').val(value[i]).trigger('change');
                        break;
                }
            }
        }
    };

    /**
     * Clean rule flags.
     * @param rule {object}
     * @return {object}
     */
    QueryBuilder.prototype.parseRuleFlags = function (rule) {
        var flags = $.extend({}, this.settings.default_rule_flags);

        if (rule.readonly) {
            $.extend(flags, {
                filter_readonly: true,
                operator_readonly: true,
                value_readonly: true,
                no_delete: true
            });
        }

        if (rule.flags) {
            $.extend(flags, rule.flags);
        }

        return this.change('parseRuleFlags', flags, rule);
    };

    /**
     * Get a copy of flags of a rule.
     * @param {object} flags
     * @param {boolean} all - true to return all flags, false to return only changes from default
     * @returns {object}
     */
    QueryBuilder.prototype.getRuleFlags = function (flags, all) {
        if (all) {
            return $.extend({}, flags);
        }
        else {
            var ret = {};
            $.each(this.settings.default_rule_flags, function (key, value) {
                if (flags[key] !== value) {
                    ret[key] = flags[key];
                }
            });
            return ret;
        }
    };

    /**
     * Clean group flags.
     * @param group {object}
     * @return {object}
     */
    QueryBuilder.prototype.parseGroupFlags = function (group) {
        var flags = $.extend({}, this.settings.default_group_flags);

        if (group.readonly) {
            $.extend(flags, {
                condition_readonly: true,
                no_delete: true
            });
        }

        if (group.flags) {
            $.extend(flags, group.flags);
        }

        return this.change('parseGroupFlags', flags, group);
    };

    /**
     * Get a copy of flags of a group.
     * @param {object} flags
     * @param {boolean} all - true to return all flags, false to return only changes from default
     * @returns {object}
     */
    QueryBuilder.prototype.getGroupFlags = function (flags, all) {
        if (all) {
            return $.extend({}, flags);
        }
        else {
            var ret = {};
            $.each(this.settings.default_group_flags, function (key, value) {
                if (flags[key] !== value) {
                    ret[key] = flags[key];
                }
            });
            return ret;
        }
    };

    /**
     * Translate a label
     * @param label {string|object}
     * @return string
     */
    QueryBuilder.prototype.translateLabel = function (label) {
        return typeof label == 'object' ? (label[this.settings.lang_code] || label['en']) : label;
    };


    QueryBuilder.templates.group = '\
<dl id="{{= it.group_id }}" class="rules-group-container"> \
  <dt class="rules-group-header"> \
    <div class="btn-group pull-right group-actions"> \
      <button type="button" class="btn btn-xs btn-success" data-add="rule"> \
        <i class="{{= it.icons.add_rule }}"></i> {{= it.lang.add_rule }} \
      </button> \
      {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} \
        <button type="button" class="btn btn-xs btn-success" data-add="group"> \
          <i class="{{= it.icons.add_group }}"></i> {{= it.lang.add_group }} \
        </button> \
      {{?}} \
      {{? it.level>1 }} \
        <button type="button" class="btn btn-xs btn-danger remove-group" data-delete="group"> \
          <i class="{{= it.icons.remove_group }}"></i> {{= it.lang.delete_group }} \
        </button> \
      {{?}} \
    </div> \
    <div class="btn-group group-conditions"> \
      {{~ it.conditions: condition }} \
        <label class="btn btn-xs btn-primary"> \
          <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.lang.conditions[condition] || condition }} \
        </label> \
      {{~}} \
    </div> \
    {{? it.settings.display_errors }} \
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
    {{?}} \
  </dt> \
  <dd class=rules-group-body> \
    <ul class=rules-list></ul> \
  </dd> \
</dl>';

    QueryBuilder.templates.rule = '\
<li id="{{= it.rule_id }}" class="rule-container"> \
  <div class="rule-header"> \
    <div class="btn-group pull-right rule-actions"> \
      <button type="button" class="btn btn-xs btn-danger remove-rule" data-delete="rule"> \
        <i class="{{= it.icons.remove_rule }}"></i> {{= it.lang.delete_rule }} \
      </button> \
    </div> \
  </div> \
  {{? it.settings.display_errors }} \
    <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
  {{?}} \
  <div class="rule-filter-container"></div> \
  <div class="rule-operator-container"></div> \
  <div class="rule-value-container"></div> \
</li>';

    QueryBuilder.templates.filterSelect = '\
{{ var optgroup = null; }} \
<select class="form-control" name="{{= it.rule.id }}_filter"> \
  {{? it.settings.display_empty_filter }} \
    <option value="-1">{{= it.settings.select_placeholder }}</option> \
  {{?}} \
  {{~ it.filters: filter }} \
    {{? optgroup !== filter.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = filter.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= filter.id }}">{{= it.translate(filter.label) }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

    QueryBuilder.templates.operatorSelect = '\
{{ var optgroup = null; }} \
<select class="form-control" name="{{= it.rule.id }}_operator"> \
  {{~ it.operators: operator }} \
    {{? optgroup !== operator.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = operator.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= operator.type }}">{{= it.lang.operators[operator.type] || operator.type }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

    /**
     * Returns group HTML
     * @param group_id {string}
     * @param level {int}
     * @return {string}
     */
    QueryBuilder.prototype.getGroupTemplate = function (group_id, level) {
        var h = this.templates.group({
            builder: this,
            group_id: group_id,
            level: level,
            conditions: this.settings.conditions,
            icons: this.icons,
            lang: this.lang,
            settings: this.settings
        });

        return this.change('getGroupTemplate', h, level);
    };

    /**
     * Returns rule HTML
     * @param rule_id {string}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleTemplate = function (rule_id) {
        var h = this.templates.rule({
            builder: this,
            rule_id: rule_id,
            icons: this.icons,
            lang: this.lang,
            settings: this.settings
        });

        return this.change('getRuleTemplate', h);
    };

    /**
     * Returns rule filter <select> HTML
     * @param rule {Rule}
     * @param filters {array}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleFilterSelect = function (rule, filters) {
        var h = this.templates.filterSelect({
            builder: this,
            rule: rule,
            filters: filters,
            icons: this.icons,
            lang: this.lang,
            settings: this.settings,
            translate: this.translateLabel
        });

        return this.change('getRuleFilterSelect', h, rule);
    };

    /**
     * Returns rule operator <select> HTML
     * @param rule {Rule}
     * @param operators {object}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleOperatorSelect = function (rule, operators) {
        var h = this.templates.operatorSelect({
            builder: this,
            rule: rule,
            operators: operators,
            icons: this.icons,
            lang: this.lang,
            settings: this.settings,
            translate: this.translateLabel
        });

        return this.change('getRuleOperatorSelect', h, rule);
    };

    /**
     * Return the rule value HTML
     * @param rule {Rule}
     * @param filter {object}
     * @param value_id {int}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleInput = function (rule, value_id) {
        var filter = rule.filter;
        var validation = rule.filter.validation || {};
        var name = rule.id + '_value_' + value_id;
        var c = filter.vertical ? ' class=block' : '';
        var h = '';

        if (typeof filter.input == 'function') {
            h = filter.input.call(this, rule, name);
        }
        else {
            switch (filter.input) {
                case 'radio':
                case 'checkbox':
                    Utils.iterateOptions(filter.values, function (key, val) {
                        h += '<label' + c + '><input type="' + filter.input + '" name="' + name + '" value="' + key + '"> ' + val + '</label> ';
                    });
                    break;

                case 'select':
                    h += '<select class="form-control" name="' + name + '"' + (filter.multiple ? ' multiple' : '') + '>';
                    if (filter.placeholder) {
                        h += '<option value="' + filter.placeholder_value + '" disabled selected>' + filter.placeholder + '</option>';
                    }
                    Utils.iterateOptions(filter.values, function (key, val) {
                        h += '<option value="' + key + '">' + val + '</option> ';
                    });
                    h += '</select>';
                    break;

                case 'textarea':
                    h += '<textarea class="form-control" name="' + name + '"';
                    if (filter.size) h += ' cols="' + filter.size + '"';
                    if (filter.rows) h += ' rows="' + filter.rows + '"';
                    if (validation.min !== undefined) h += ' minlength="' + validation.min + '"';
                    if (validation.max !== undefined) h += ' maxlength="' + validation.max + '"';
                    if (filter.placeholder) h += ' placeholder="' + filter.placeholder + '"';
                    h += '></textarea>';
                    break;

                default:
                    switch (QueryBuilder.types[filter.type]) {
                        case 'number':
                            h += '<input class="form-control" type="number" name="' + name + '"';
                            if (validation.step !== undefined) h += ' step="' + validation.step + '"';
                            if (validation.min !== undefined) h += ' min="' + validation.min + '"';
                            if (validation.max !== undefined) h += ' max="' + validation.max + '"';
                            if (filter.placeholder) h += ' placeholder="' + filter.placeholder + '"';
                            if (filter.size) h += ' size="' + filter.size + '"';
                            h += '>';
                            break;

                        default:
                            h += '<input class="form-control" type="text" name="' + name + '"';
                            if (filter.placeholder) h += ' placeholder="' + filter.placeholder + '"';
                            if (filter.type === 'string' && validation.min !== undefined) h += ' minlength="' + validation.min + '"';
                            if (filter.type === 'string' && validation.max !== undefined) h += ' maxlength="' + validation.max + '"';
                            if (filter.size) h += ' size="' + filter.size + '"';
                            h += '>';
                    }
            }
        }

        return this.change('getRuleInput', h, rule, name);
    };


// Model CLASS
// ===============================
    /**
     * Main object storing data model and emitting events
     * ---------
     * Access Node object stored in jQuery objects
     * @param el {jQuery|Node}
     * @return {Node}
     */
    function Model(el) {
        if (!(this instanceof Model)) {
            return Model.getModel(el);
        }

        this.root = null;
        this.$ = $(this);
    }

    $.extend(Model.prototype, {
        trigger: function (type) {
            this.$.triggerHandler(type, Array.prototype.slice.call(arguments, 1));
            return this;
        },

        on: function () {
            this.$.on.apply(this.$, Array.prototype.slice.call(arguments));
            return this;
        },

        off: function () {
            this.$.off.apply(this.$, Array.prototype.slice.call(arguments));
            return this;
        },

        once: function () {
            this.$.one.apply(this.$, Array.prototype.slice.call(arguments));
            return this;
        }
    });

    /**
     * Access Node object stored in jQuery objects
     * @param el {jQuery|Node}
     * @return {Node}
     */
    Model.getModel = function (el) {
        if (!el) {
            return null;
        }
        else if (el instanceof Node) {
            return el;
        }
        else {
            return $(el).data('queryBuilderModel');
        }
    };

    /*
     * Define Node properties with getter and setter
     * Update events are emitted in the setter through root Model (if any)
     */
    function defineModelProperties(obj, fields) {
        fields.forEach(function (field) {
            Object.defineProperty(obj.prototype, field, {
                enumerable: true,
                get: function () {
                    return this.__[field];
                },
                set: function (value) {
                    var oldValue = (this.__[field] !== null && typeof this.__[field] == 'object') ?
                        $.extend({}, this.__[field]) :
                        this.__[field];

                    this.__[field] = value;

                    if (this.model !== null) {
                        this.model.trigger('update', this, field, value, oldValue);
                    }
                }
            });
        });
    }


// Node abstract CLASS
// ===============================
    /**
     * @param {Node}
     * @param {jQuery}
     */
    var Node = function (parent, $el) {
        if (!(this instanceof Node)) {
            return new Node();
        }

        Object.defineProperty(this, '__', {value: {}});

        $el.data('queryBuilderModel', this);

        this.__.level = 1;
        this.__.error = null;
        this.__.data = undefined;
        this.$el = $el;
        this.id = $el[0].id;
        this.model = null;
        this.parent = parent;
    };

    defineModelProperties(Node, ['level', 'error', 'data', 'flags']);

    Object.defineProperty(Node.prototype, 'parent', {
        enumerable: true,
        get: function () {
            return this.__.parent;
        },
        set: function (value) {
            this.__.parent = value;
            this.level = value === null ? 1 : value.level + 1;
            this.model = value === null ? null : value.model;
        }
    });

    /**
     * Check if this Node is the root
     * @return {boolean}
     */
    Node.prototype.isRoot = function () {
        return (this.level === 1);
    };

    /**
     * Return node position inside parent
     * @return {int}
     */
    Node.prototype.getPos = function () {
        if (this.isRoot()) {
            return -1;
        }
        else {
            return this.parent.getNodePos(this);
        }
    };

    /**
     * Delete self
     */
    Node.prototype.drop = function () {
        var model = this.model;

        if (!this.isRoot()) {
            this.parent._removeNode(this);
        }

        if (model !== null) {
            model.trigger('drop', this);
        }
    };

    /**
     * Move itself after another Node
     * @param {Node}
     * @return {Node} self
     */
    Node.prototype.moveAfter = function (node) {
        if (this.isRoot()) return;

        this._move(node.parent, node.getPos() + 1);

        return this;
    };

    /**
     * Move itself at the beginning of parent or another Group
     * @param {Group,optional}
     * @return {Node} self
     */
    Node.prototype.moveAtBegin = function (target) {
        if (this.isRoot()) return;

        if (target === undefined) {
            target = this.parent;
        }

        this._move(target, 0);

        return this;
    };

    /**
     * Move itself at the end of parent or another Group
     * @param {Group,optional}
     * @return {Node} self
     */
    Node.prototype.moveAtEnd = function (target) {
        if (this.isRoot()) return;

        if (target === undefined) {
            target = this.parent;
        }

        this._move(target, target.length() - 1);

        return this;
    };

    /**
     * Move itself at specific position of Group
     * @param {Group}
     * @param {int}
     */
    Node.prototype._move = function (group, index) {
        this.parent._removeNode(this);
        group._appendNode(this, index, false);

        if (this.model !== null) {
            this.model.trigger('move', this, group, index);
        }
    };


// GROUP CLASS
// ===============================
    /**
     * @param {Group}
     * @param {jQuery}
     */
    var Group = function (parent, $el) {
        if (!(this instanceof Group)) {
            return new Group(parent, $el);
        }

        Node.call(this, parent, $el);

        this.rules = [];
        this.__.condition = null;
    };

    Group.prototype = Object.create(Node.prototype);
    Group.prototype.constructor = Group;

    defineModelProperties(Group, ['condition']);

    /**
     * Empty the Group
     */
    Group.prototype.empty = function () {
        this.each('reverse', function (rule) {
            rule.drop();
        }, function (group) {
            group.drop();
        });
    };

    /**
     * Delete self
     */
    Group.prototype.drop = function () {
        this.empty();
        Node.prototype.drop.call(this);
    };

    /**
     * Return the number of children
     * @return {int}
     */
    Group.prototype.length = function () {
        return this.rules.length;
    };

    /**
     * Add a Node at specified index
     * @param {Node}
     * @param {int,optional}
     * @param {boolean,optional}
     * @return {Node} the inserted node
     */
    Group.prototype._appendNode = function (node, index, trigger) {
        if (index === undefined) {
            index = this.length();
        }

        this.rules.splice(index, 0, node);
        node.parent = this;

        if (trigger && this.model !== null) {
            this.model.trigger('add', node, index);
        }

        return node;
    };

    /**
     * Add a Group by jQuery element at specified index
     * @param {jQuery}
     * @param {int,optional}
     * @return {Group} the inserted group
     */
    Group.prototype.addGroup = function ($el, index) {
        return this._appendNode(new Group(this, $el), index, true);
    };

    /**
     * Add a Rule by jQuery element at specified index
     * @param {jQuery}
     * @param {int,optional}
     * @return {Rule} the inserted rule
     */
    Group.prototype.addRule = function ($el, index) {
        return this._appendNode(new Rule(this, $el), index, true);
    };

    /**
     * Delete a specific Node
     * @param {Node}
     * @return {Group} self
     */
    Group.prototype._removeNode = function (node) {
        var index = this.getNodePos(node);
        if (index !== -1) {
            node.parent = null;
            this.rules.splice(index, 1);
        }

        return this;
    };

    /**
     * Return position of a child Node
     * @param {Node}
     * @return {int}
     */
    Group.prototype.getNodePos = function (node) {
        return this.rules.indexOf(node);
    };

    /**
     * Iterate over all Nodes
     * @param {boolean,optional} iterate in reverse order, required if you delete nodes
     * @param {function} callback for Rules
     * @param {function,optional} callback for Groups
     * @return {boolean}
     */
    Group.prototype.each = function (reverse, cbRule, cbGroup, context) {
        if (typeof reverse == 'function') {
            context = cbGroup;
            cbGroup = cbRule;
            cbRule = reverse;
            reverse = false;
        }
        context = context === undefined ? null : context;

        var i = reverse ? this.rules.length - 1 : 0;
        var l = reverse ? 0 : this.rules.length - 1;
        var c = reverse ? -1 : 1;
        var next = function () {
            return reverse ? i >= l : i <= l;
        };
        var stop = false;

        for (; next(); i += c) {
            if (this.rules[i] instanceof Group) {
                if (cbGroup !== undefined) {
                    stop = cbGroup.call(context, this.rules[i]) === false;
                }
            }
            else {
                stop = cbRule.call(context, this.rules[i]) === false;
            }

            if (stop) {
                break;
            }
        }

        return !stop;
    };

    /**
     * Return true if the group contains a particular Node
     * @param {Node}
     * @param {boolean,optional} recursive search
     * @return {boolean}
     */
    Group.prototype.contains = function (node, deep) {
        if (this.getNodePos(node) !== -1) {
            return true;
        }
        else if (!deep) {
            return false;
        }
        else {
            // the loop will return with false as soon as the Node is found
            return !this.each(function (rule) {
                return true;
            }, function (group) {
                return !group.contains(node, true);
            });
        }
    };


// RULE CLASS
// ===============================
    /**
     * @param {Group}
     * @param {jQuery}
     */
    var Rule = function (parent, $el) {
        if (!(this instanceof Rule)) {
            return new Rule(parent, $el);
        }

        Node.call(this, parent, $el);

        this.__.filter = null;
        this.__.operator = null;
        this.__.flags = {};
        this.__.value = undefined;
    };

    Rule.prototype = Object.create(Node.prototype);
    Rule.prototype.constructor = Rule;

    defineModelProperties(Rule, ['filter', 'operator', 'value']);


// EXPORT
// ===============================
    QueryBuilder.Group = Group;
    QueryBuilder.Rule = Rule;


    var Utils = QueryBuilder.utils = {};

    /**
     * Utility to iterate over radio/checkbox/selection options.
     * it accept three formats: array of values, map, array of 1-element maps
     *
     * @param options {object|array}
     * @param tpl {callable} (takes key and text)
     */
    Utils.iterateOptions = function (options, tpl) {
        if (options) {
            if ($.isArray(options)) {
                options.forEach(function (entry) {
                    // array of one-element maps
                    if ($.isPlainObject(entry)) {
                        $.each(entry, function (key, val) {
                            tpl(key, val);
                            return false; // break after first entry
                        });
                    }
                    // array of values
                    else {
                        tpl(entry, entry);
                    }
                });
            }
            // unordered map
            else {
                $.each(options, function (key, val) {
                    tpl(key, val);
                });
            }
        }
    };

    /**
     * Replaces {0}, {1}, ... in a string
     * @param str {string}
     * @param args,... {mixed}
     * @return {string}
     */
    Utils.fmt = function (str/*, args*/) {
        var args = Array.prototype.slice.call(arguments, 1);

        return str.replace(/{([0-9]+)}/g, function (m, i) {
            return args[parseInt(i)];
        });
    };

    /**
     * Throw an Error object with custom name
     * @param type {string}
     * @param message {string}
     * @param args,... {mixed}
     */
    Utils.error = function (type, message/*, args*/) {
        var err = new Error(Utils.fmt.apply(null, Array.prototype.slice.call(arguments, 1)));
        err.name = type + 'Error';
        err.args = Array.prototype.slice.call(arguments, 2);
        throw err;
    };

    /**
     * Change type of a value to int or float
     * @param value {mixed}
     * @param type {string} 'integer', 'double' or anything else
     * @param boolAsInt {boolean} return 0 or 1 for booleans
     * @return {mixed}
     */
    Utils.changeType = function (value, type, boolAsInt) {
        switch (type) {
            case 'integer':
                return parseInt(value);
            case 'double':
                return parseFloat(value);
            case 'boolean':
                var bool = value.trim().toLowerCase() === 'true' || value.trim() === '1' || value === 1;
                return boolAsInt ? (bool ? 1 : 0) : bool;
            default:
                return value;
        }
    };

    /**
     * Escape string like mysql_real_escape_string
     * @param value {string}
     * @return {string}
     */
    Utils.escapeString = function (value) {
        if (typeof value != 'string') {
            return value;
        }

        return value
            .replace(/[\0\n\r\b\\\'\"]/g, function (s) {
                switch (s) {
                    case '\0':
                        return '\\0';
                    case '\n':
                        return '\\n';
                    case '\r':
                        return '\\r';
                    case '\b':
                        return '\\b';
                    default:
                        return '\\' + s;
                }
            })
            // uglify compliant
            .replace(/\t/g, '\\t')
            .replace(/\x1a/g, '\\Z');
    };

    /**
     * Escape value for use in regex
     * @param value {string}
     * @return {string}
     */
    Utils.escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    };

    /**
     * Escape HTML element id
     * @param value {string}
     * @return {string}
     */
    Utils.escapeElementId = function (str) {
        // Regex based on that suggested by:
        // https://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
        // - escapes : . [ ] ,
        // - avoids escaping already escaped values
        return (str) ? str.replace(/(\\)?([:.\[\],])/g,
            function ($0, $1, $2) {
                return $1 ? $0 : '\\' + $2;
            }) : str;
    };

    /**
     * Sort objects by grouping them by {key}, preserving initial order when possible
     * @param {object[]} items
     * @param {string} key
     * @returns {object[]}
     */
    Utils.groupSort = function (items, key) {
        var optgroups = [];
        var newItems = [];

        items.forEach(function (item) {
            var idx;

            if (item[key]) {
                idx = optgroups.lastIndexOf(item[key]);

                if (idx == -1) {
                    idx = optgroups.length;
                }
                else {
                    idx++;
                }
            }
            else {
                idx = optgroups.length;
            }

            optgroups.splice(idx, 0, item[key]);
            newItems.splice(idx, 0, item);
        });

        return newItems;
    };


    $.fn.queryBuilder = function (option) {
        if (this.length > 1) {
            Utils.error('Config', 'Unable to initialize on multiple target');
        }

        var data = this.data('queryBuilder');
        var options = (typeof option == 'object' && option) || {};

        if (!data && option == 'destroy') {
            return this;
        }
        if (!data) {
            this.data('queryBuilder', new QueryBuilder(this, options));
        }
        if (typeof option == 'string') {
            return data[option].apply(data, Array.prototype.slice.call(arguments, 1));
        }

        return this;
    };

    $.fn.queryBuilder.constructor = QueryBuilder;
    $.fn.queryBuilder.defaults = QueryBuilder.defaults;
    $.fn.queryBuilder.extend = QueryBuilder.extend;
    $.fn.queryBuilder.define = QueryBuilder.define;
    $.fn.queryBuilder.regional = QueryBuilder.regional;


    /*!
     * jQuery QueryBuilder Awesome Bootstrap Checkbox
     * Applies Awesome Bootstrap Checkbox for checkbox and radio inputs.
     */

    QueryBuilder.define('bt-checkbox', function (options) {
        if (options.font == 'glyphicons') {
            var injectCSS = document.createElement('style');
            injectCSS.innerHTML = '\
.checkbox input[type=checkbox]:checked + label:after { \
    font-family: "Glyphicons Halflings"; \
    content: "\\e013"; \
} \
.checkbox label:after { \
    padding-left: 4px; \
    padding-top: 2px; \
    font-size: 9px; \
}';
            document.body.appendChild(injectCSS);
        }

        this.on('getRuleInput.filter', function (h, rule, name) {
            var filter = rule.filter;

            if ((filter.input === 'radio' || filter.input === 'checkbox') && !filter.plugin) {
                h.value = '';

                if (!filter.colors) {
                    filter.colors = {};
                }
                if (filter.color) {
                    filter.colors._def_ = filter.color;
                }

                var style = filter.vertical ? ' style="display:block"' : '';
                var i = 0;

                Utils.iterateOptions(filter.values, function (key, val) {
                    var color = filter.colors[key] || filter.colors._def_ || options.color;
                    var id = name + '_' + (i++);

                    h.value += '\
<div' + style + ' class="' + filter.input + ' ' + filter.input + '-' + color + '"> \
  <input type="' + filter.input + '" name="' + name + '" id="' + id + '" value="' + key + '"> \
  <label for="' + id + '">' + val + '</label> \
</div>';
                });
            }
        });
    }, {
        font: 'glyphicons',
        color: 'default'
    });


    /*!
     * jQuery QueryBuilder Bootstrap Selectpicker
     * Applies Bootstrap Select on filters and operators combo-boxes.
     */

    /**
     * @throws ConfigError
     */
    QueryBuilder.define('bt-selectpicker', function (options) {
        if (!$.fn.selectpicker || !$.fn.selectpicker.Constructor) {
            Utils.error('MissingLibrary', 'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select');
        }

        // init selectpicker
        this.on('afterCreateRuleFilters', function (e, rule) {
            rule.$el.find(Selectors.rule_filter).removeClass('form-control').selectpicker(options);
        });

        this.on('afterCreateRuleOperators', function (e, rule) {
            rule.$el.find(Selectors.rule_operator).removeClass('form-control').selectpicker(options);
        });

        // update selectpicker on change
        this.on('afterUpdateRuleFilter', function (e, rule) {
            rule.$el.find(Selectors.rule_filter).selectpicker('render');
        });

        this.on('afterUpdateRuleOperator', function (e, rule) {
            rule.$el.find(Selectors.rule_operator).selectpicker('render');
        });
    }, {
        container: 'body',
        style: 'btn-inverse btn-xs',
        width: 'auto',
        showIcon: false
    });


    /*!
     * jQuery QueryBuilder Bootstrap Tooltip errors
     * Applies Bootstrap Tooltips on validation error messages.
     */

    /**
     * @throws ConfigError
     */
    QueryBuilder.define('bt-tooltip-errors', function (options) {
        if (!$.fn.tooltip || !$.fn.tooltip.Constructor || !$.fn.tooltip.Constructor.prototype.fixTitle) {
            Utils.error('MissingLibrary', 'Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');
        }

        var self = this;

        // add BT Tooltip data
        this.on('getRuleTemplate.filter getGroupTemplate.filter', function (h) {
            var $h = $(h.value);
            $h.find(Selectors.error_container).attr('data-toggle', 'tooltip');
            h.value = $h.prop('outerHTML');
        });

        // init/refresh tooltip when title changes
        this.model.on('update', function (e, node, field) {
            if (field == 'error' && self.settings.display_errors) {
                node.$el.find(Selectors.error_container).eq(0)
                    .tooltip(options)
                    .tooltip('hide')
                    .tooltip('fixTitle');
            }
        });
    }, {
        placement: 'right'
    });


    /*!
     * jQuery QueryBuilder Change Filters
     * Allows to change available filters after plugin initialization.
     */

    QueryBuilder.extend({
        /**
         * Change the filters of the builder
         * @throws ChangeFilterError
         * @param {boolean,optional} delete rules using old filters
         * @param {object[]} new filters
         */
        setFilters: function (delete_orphans, filters) {
            var self = this;

            if (filters === undefined) {
                filters = delete_orphans;
                delete_orphans = false;
            }

            filters = this.checkFilters(filters);
            filters = this.change('setFilters', filters);

            var filtersIds = filters.map(function (filter) {
                return filter.id;
            });

            // check for orphans
            if (!delete_orphans) {
                (function checkOrphans(node) {
                    node.each(
                        function (rule) {
                            if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                                Utils.error('ChangeFilter', 'A rule is using filter "{0}"', rule.filter.id);
                            }
                        },
                        checkOrphans
                    );
                }(this.model.root));
            }

            // replace filters
            this.filters = filters;

            // apply on existing DOM
            (function updateBuilder(node) {
                node.each(true,
                    function (rule) {
                        if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                            rule.drop();
                        }
                        else {
                            self.createRuleFilters(rule);

                            rule.$el.find(Selectors.rule_filter).val(rule.filter ? rule.filter.id : '-1');
                        }
                    },
                    updateBuilder
                );
            }(this.model.root));

            // update plugins
            if (this.settings.plugins) {
                if (this.settings.plugins['unique-filter']) {
                    this.updateDisabledFilters();
                }
                if (this.settings.plugins['bt-selectpicker']) {
                    this.$el.find(Selectors.rule_filter).selectpicker('render');
                }
            }

            // reset the default_filter if does not exist anymore
            if (this.settings.default_filter) {
                try {
                    this.getFilterById(this.settings.default_filter);
                }
                catch (e) {
                    this.settings.default_filter = null;
                }
            }

            this.trigger('afterSetFilters', filters);
        },

        /**
         * Adds a new filter to the builder
         * @param {object|object[]} the new filter
         * @param {mixed,optional} numeric index or '#start' or '#end'
         */
        addFilter: function (new_filters, position) {
            if (position === undefined || position == '#end') {
                position = this.filters.length;
            }
            else if (position == '#start') {
                position = 0;
            }

            if (!$.isArray(new_filters)) {
                new_filters = [new_filters];
            }

            var filters = $.extend(true, [], this.filters);

            // numeric position
            if (parseInt(position) == position) {
                Array.prototype.splice.apply(filters, [position, 0].concat(new_filters));
            }
            else {
                // after filter by its id
                if (this.filters.some(function (filter, index) {
                        if (filter.id == position) {
                            position = index + 1;
                            return true;
                        }
                    })) {
                    Array.prototype.splice.apply(filters, [position, 0].concat(new_filters));
                }
                // defaults to end of list
                else {
                    Array.prototype.push.apply(filters, new_filters);
                }
            }

            this.setFilters(filters);
        },

        /**
         * Removes a filter from the builder
         * @param {string|string[]} the filter id
         * @param {boolean,optional} delete rules using old filters
         */
        removeFilter: function (filter_ids, delete_orphans) {
            var filters = $.extend(true, [], this.filters);
            if (typeof filter_ids === 'string') {
                filter_ids = [filter_ids];
            }

            filters = filters.filter(function (filter) {
                return filter_ids.indexOf(filter.id) === -1;
            });

            this.setFilters(delete_orphans, filters);
        }
    });


    /*!
     * jQuery QueryBuilder Filter Description
     * Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.
     */

    /**
     * @throws ConfigError
     */
    QueryBuilder.define('filter-description', function (options) {
        /**
         * INLINE
         */
        if (options.mode === 'inline') {
            this.on('afterUpdateRuleFilter', function (e, rule) {
                var $p = rule.$el.find('p.filter-description');

                if (!rule.filter || !rule.filter.description) {
                    $p.hide();
                }
                else {
                    if ($p.length === 0) {
                        $p = $('<p class="filter-description"></p>');
                        $p.appendTo(rule.$el);
                    }
                    else {
                        $p.show();
                    }

                    $p.html('<i class="' + options.icon + '"></i> ' + rule.filter.description);
                }
            });
        }
        /**
         * POPOVER
         */
        else if (options.mode === 'popover') {
            if (!$.fn.popover || !$.fn.popover.Constructor || !$.fn.popover.Constructor.prototype.fixTitle) {
                Utils.error('MissingLibrary', 'Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com');
            }

            this.on('afterUpdateRuleFilter', function (e, rule) {
                var $b = rule.$el.find('button.filter-description');

                if (!rule.filter || !rule.filter.description) {
                    $b.hide();

                    if ($b.data('bs.popover')) {
                        $b.popover('hide');
                    }
                }
                else {
                    if ($b.length === 0) {
                        $b = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="' + options.icon + '"></i></button>');
                        $b.prependTo(rule.$el.find(Selectors.rule_actions));

                        $b.popover({
                            placement: 'left',
                            container: 'body',
                            html: true
                        });

                        $b.on('mouseout', function () {
                            $b.popover('hide');
                        });
                    }
                    else {
                        $b.show();
                    }

                    $b.data('bs.popover').options.content = rule.filter.description;

                    if ($b.attr('aria-describedby')) {
                        $b.popover('show');
                    }
                }
            });
        }
        /**
         * BOOTBOX
         */
        else if (options.mode === 'bootbox') {
            if (!('bootbox' in window)) {
                Utils.error('MissingLibrary', 'Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com');
            }

            this.on('afterUpdateRuleFilter', function (e, rule) {
                var $b = rule.$el.find('button.filter-description');

                if (!rule.filter || !rule.filter.description) {
                    $b.hide();
                }
                else {
                    if ($b.length === 0) {
                        $b = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="bootbox"><i class="' + options.icon + '"></i></button>');
                        $b.prependTo(rule.$el.find(Selectors.rule_actions));

                        $b.on('click', function () {
                            bootbox.alert($b.data('description'));
                        });
                    }

                    $b.data('description', rule.filter.description);
                }
            });
        }
    }, {
        icon: 'glyphicon glyphicon-info-sign',
        mode: 'popover'
    });


    /*!
     * jQuery QueryBuilder Invert
     * Allows to invert a rule operator, a group condition or the entire builder.
     */

    QueryBuilder.defaults({
        operatorOpposites: {
            'equal': 'not_equal',
            'not_equal': 'equal',
            'in': 'not_in',
            'not_in': 'in',
            'less': 'greater_or_equal',
            'less_or_equal': 'greater',
            'greater': 'less_or_equal',
            'greater_or_equal': 'less',
            'between': 'not_between',
            'not_between': 'between',
            'begins_with': 'not_begins_with',
            'not_begins_with': 'begins_with',
            'contains': 'not_contains',
            'not_contains': 'contains',
            'ends_with': 'not_ends_with',
            'not_ends_with': 'ends_with',
            'is_empty': 'is_not_empty',
            'is_not_empty': 'is_empty',
            'is_null': 'is_not_null',
            'is_not_null': 'is_null'
        },

        conditionOpposites: {
            'AND': 'OR',
            'OR': 'AND'
        }
    });

    QueryBuilder.define('invert', function (options) {
        var self = this;

        /**
         * Bind events
         */
        this.on('afterInit', function () {
            self.$el.on('click.queryBuilder', '[data-invert=group]', function () {
                var $group = $(this).closest(Selectors.group_container);
                self.invert(Model($group), options);
            });

            if (options.display_rules_button && options.invert_rules) {
                self.$el.on('click.queryBuilder', '[data-invert=rule]', function () {
                    var $rule = $(this).closest(Selectors.rule_container);
                    self.invert(Model($rule), options);
                });
            }
        });

        /**
         * Modify templates
         */
        this.on('getGroupTemplate.filter', function (h, level) {
            var $h = $(h.value);
            $h.find(Selectors.condition_container).after('<button type="button" class="btn btn-xs btn-default" data-invert="group"><i class="' + options.icon + '"></i> ' + self.lang.invert + '</button>');
            h.value = $h.prop('outerHTML');
        });

        if (options.display_rules_button && options.invert_rules) {
            this.on('getRuleTemplate.filter', function (h) {
                var $h = $(h.value);
                $h.find(Selectors.rule_actions).prepend('<button type="button" class="btn btn-xs btn-default" data-invert="rule"><i class="' + options.icon + '"></i> ' + self.lang.invert + '</button>');
                h.value = $h.prop('outerHTML');
            });
        }
    }, {
        icon: 'glyphicon glyphicon-random',
        recursive: true,
        invert_rules: true,
        display_rules_button: false,
        silent_fail: false
    });

    QueryBuilder.extend({
        /**
         * Invert a Group, a Rule or the whole builder
         * @throws InvertConditionError, InvertOperatorError
         * @param {Node,optional}
         * @param {object,optional}
         */
        invert: function (node, options) {
            if (!(node instanceof Node)) {
                if (!this.model.root) return;
                options = node;
                node = this.model.root;
            }

            if (typeof options != 'object') options = {};
            if (options.recursive === undefined) options.recursive = true;
            if (options.invert_rules === undefined) options.invert_rules = true;
            if (options.silent_fail === undefined) options.silent_fail = false;
            if (options.trigger === undefined) options.trigger = true;

            if (node instanceof Group) {
                // invert group condition
                if (this.settings.conditionOpposites[node.condition]) {
                    node.condition = this.settings.conditionOpposites[node.condition];
                }
                else if (!options.silent_fail) {
                    Utils.error('InvertCondition', 'Unknown inverse of condition "{0}"', node.condition);
                }

                // recursive call
                if (options.recursive) {
                    var tempOpts = $.extend({}, options, {trigger: false});
                    node.each(function (rule) {
                        if (options.invert_rules) {
                            this.invert(rule, tempOpts);
                        }
                    }, function (group) {
                        this.invert(group, tempOpts);
                    }, this);
                }
            }
            else if (node instanceof Rule) {
                if (node.operator && !node.filter.no_invert) {
                    // invert rule operator
                    if (this.settings.operatorOpposites[node.operator.type]) {
                        var invert = this.settings.operatorOpposites[node.operator.type];
                        // check if the invert is "authorized"
                        if (!node.filter.operators || node.filter.operators.indexOf(invert) != -1) {
                            node.operator = this.getOperatorByType(invert);
                        }
                    }
                    else if (!options.silent_fail) {
                        Utils.error('InvertOperator', 'Unknown inverse of operator "{0}"', node.operator.type);
                    }
                }
            }

            if (options.trigger) {
                this.trigger('afterInvert', node, options);
            }
        }
    });


    /*!
     * jQuery QueryBuilder MongoDB Support
     * Allows to export rules as a MongoDB find object as well as populating the builder from a MongoDB object.
     */

// DEFAULT CONFIG
// ===============================
    QueryBuilder.defaults({
        mongoOperators: {
            equal: function (v) {
                return v[0];
            },
            not_equal: function (v) {
                return {'$ne': v[0]};
            },
            in: function (v) {
                return {'$in': v};
            },
            not_in: function (v) {
                return {'$nin': v};
            },
            less: function (v) {
                return {'$lt': v[0]};
            },
            less_or_equal: function (v) {
                return {'$lte': v[0]};
            },
            greater: function (v) {
                return {'$gt': v[0]};
            },
            greater_or_equal: function (v) {
                return {'$gte': v[0]};
            },
            between: function (v) {
                return {'$gte': v[0], '$lte': v[1]};
            },
            not_between: function (v) {
                return {'$lt': v[0], '$gt': v[1]};
            },
            begins_with: function (v) {
                return {'$regex': '^' + Utils.escapeRegExp(v[0])};
            },
            not_begins_with: function (v) {
                return {'$regex': '^(?!' + Utils.escapeRegExp(v[0]) + ')'};
            },
            contains: function (v) {
                return {'$regex': Utils.escapeRegExp(v[0])};
            },
            not_contains: function (v) {
                return {'$regex': '^((?!' + Utils.escapeRegExp(v[0]) + ').)*$', '$options': 's'};
            },
            ends_with: function (v) {
                return {'$regex': Utils.escapeRegExp(v[0]) + '$'};
            },
            not_ends_with: function (v) {
                return {'$regex': '(?<!' + Utils.escapeRegExp(v[0]) + ')$'};
            },
            is_empty: function (v) {
                return '';
            },
            is_not_empty: function (v) {
                return {'$ne': ''};
            },
            is_null: function (v) {
                return null;
            },
            is_not_null: function (v) {
                return {'$ne': null};
            }
        },

        mongoRuleOperators: {
            $ne: function (v) {
                v = v.$ne;
                return {
                    'val': v,
                    'op': v === null ? 'is_not_null' : (v === '' ? 'is_not_empty' : 'not_equal')
                };
            },
            eq: function (v) {
                return {
                    'val': v,
                    'op': v === null ? 'is_null' : (v === '' ? 'is_empty' : 'equal')
                };
            },
            $regex: function (v) {
                v = v.$regex;
                if (v.slice(0, 4) == '^(?!' && v.slice(-1) == ')') {
                    return {'val': v.slice(4, -1), 'op': 'not_begins_with'};
                }
                else if (v.slice(0, 5) == '^((?!' && v.slice(-5) == ').)*$') {
                    return {'val': v.slice(5, -5), 'op': 'not_contains'};
                }
                else if (v.slice(0, 4) == '(?<!' && v.slice(-2) == ')$') {
                    return {'val': v.slice(4, -2), 'op': 'not_ends_with'};
                }
                else if (v.slice(-1) == '$') {
                    return {'val': v.slice(0, -1), 'op': 'ends_with'};
                }
                else if (v.slice(0, 1) == '^') {
                    return {'val': v.slice(1), 'op': 'begins_with'};
                }
                else {
                    return {'val': v, 'op': 'contains'};
                }
            },
            between: function (v) {
                return {'val': [v.$gte, v.$lte], 'op': 'between'};
            },
            not_between: function (v) {
                return {'val': [v.$lt, v.$gt], 'op': 'not_between'};
            },
            $in: function (v) {
                return {'val': v.$in, 'op': 'in'};
            },
            $nin: function (v) {
                return {'val': v.$nin, 'op': 'not_in'};
            },
            $lt: function (v) {
                return {'val': v.$lt, 'op': 'less'};
            },
            $lte: function (v) {
                return {'val': v.$lte, 'op': 'less_or_equal'};
            },
            $gt: function (v) {
                return {'val': v.$gt, 'op': 'greater'};
            },
            $gte: function (v) {
                return {'val': v.$gte, 'op': 'greater_or_equal'};
            }
        }
    });


// PUBLIC METHODS
// ===============================
    QueryBuilder.extend({
        /**
         * Get rules as MongoDB query
         * @throws UndefinedMongoConditionError, UndefinedMongoOperatorError
         * @param data {object} (optional) rules
         * @return {object}
         */
        getMongo: function (data) {
            data = (data === undefined) ? this.getRules() : data;

            var self = this;

            return (function parse(data) {
                if (!data.condition) {
                    data.condition = self.settings.default_condition;
                }
                if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                    Utils.error('UndefinedMongoCondition', 'Unable to build MongoDB query with condition "{0}"', data.condition);
                }

                if (!data.rules) {
                    return {};
                }

                var parts = [];

                data.rules.forEach(function (rule) {
                    if (rule.rules && rule.rules.length > 0) {
                        parts.push(parse(rule));
                    }
                    else {
                        var mdb = self.settings.mongoOperators[rule.operator];
                        var ope = self.getOperatorByType(rule.operator);
                        var values = [];

                        if (mdb === undefined) {
                            Utils.error('UndefinedMongoOperator', 'Unknown MongoDB operation for operator "{0}"', rule.operator);
                        }

                        if (ope.nb_inputs !== 0) {
                            if (!(rule.value instanceof Array)) {
                                rule.value = [rule.value];
                            }

                            rule.value.forEach(function (v) {
                                values.push(Utils.changeType(v, rule.type, false));
                            });
                        }

                        var part = {};
                        part[rule.field] = mdb.call(self, values);
                        parts.push(part);
                    }
                });

                var res = {};
                if (parts.length > 0) {
                    res['$' + data.condition.toLowerCase()] = parts;
                }
                return res;
            }(data));
        },

        /**
         * Convert MongoDB object to rules
         * @throws MongoParseError, UndefinedMongoConditionError, UndefinedMongoOperatorError
         * @param data {object} query object
         * @return {object}
         */
        getRulesFromMongo: function (data) {
            if (data === undefined || data === null) {
                return null;
            }

            var self = this;
            var conditions = {
                '$and': 'AND',
                '$or': 'OR'
            };

            return (function parse(data) {
                var topKeys = Object.keys(data);

                if (topKeys.length > 1) {
                    Utils.error('MongoParse', 'Invalid MongoDB query format');
                }
                if (!conditions[topKeys[0].toLowerCase()]) {
                    Utils.error('UndefinedMongoCondition', 'Unable to build MongoDB query with condition "{0}"', topKeys[0]);
                }

                var rules = data[topKeys[0]];
                var parts = [];

                rules.forEach(function (rule) {
                    var keys = Object.keys(rule);

                    if (conditions[keys[0].toLowerCase()]) {
                        parts.push(parse(rule));
                    }
                    else {
                        var field = keys[0];
                        var value = rule[field];

                        var operator = determineMongoOperator(value, field);
                        if (operator === undefined) {
                            Utils.error('MongoParse', 'Invalid MongoDB query format');
                        }

                        var mdbrl = self.settings.mongoRuleOperators[operator];
                        if (mdbrl === undefined) {
                            Utils.error('UndefinedMongoOperator', 'JSON Rule operation unknown for operator "{0}"', operator);
                        }

                        var opVal = mdbrl.call(self, value);
                        parts.push({
                            id: self.change('getMongoDBFieldID', field, value),
                            field: field,
                            operator: opVal.op,
                            value: opVal.val
                        });
                    }
                });

                var res = {};
                if (parts.length > 0) {
                    res.condition = conditions[topKeys[0].toLowerCase()];
                    res.rules = parts;
                }
                return res;
            }(data));
        },

        /**
         * Set rules from MongoDB object
         * @param data {object}
         */
        setRulesFromMongo: function (data) {
            this.setRules(this.getRulesFromMongo(data));
        }
    });

    /**
     * Find which operator is used in a MongoDB sub-object
     * @param {mixed} value
     * @param {string} field
     * @return {string|undefined}
     */
    function determineMongoOperator(value, field) {
        if (value !== null && typeof value == 'object') {
            var subkeys = Object.keys(value);

            if (subkeys.length === 1) {
                return subkeys[0];
            }
            else {
                if (value.$gte !== undefined && value.$lte !== undefined) {
                    return 'between';
                }
                if (value.$lt !== undefined && value.$gt !== undefined) {
                    return 'not_between';
                }
                else if (value.$regex !== undefined) { // optional $options
                    return '$regex';
                }
                else {
                    return;
                }
            }
        }
        else {
            return 'eq';
        }
    }


    /*!
     * jQuery QueryBuilder Sortable
     * Enables drag & drop sort of rules.
     */

    Selectors.rule_and_group_containers = Selectors.rule_container + ', ' + Selectors.group_container;

    QueryBuilder.define('sortable', function (options) {
        /**
         * Init HTML5 drag and drop
         */
        this.on('afterInit', function (e) {
            // configure jQuery to use dataTransfer
            $.event.props.push('dataTransfer');

            var placeholder;
            var src;
            var self = e.builder;

            // only add "draggable" attribute when hovering drag handle
            // preventing text select bug in Firefox
            self.$el.on('mouseover.queryBuilder', '.drag-handle', function () {
                self.$el.find(Selectors.rule_and_group_containers).attr('draggable', true);
            });
            self.$el.on('mouseout.queryBuilder', '.drag-handle', function () {
                self.$el.find(Selectors.rule_and_group_containers).removeAttr('draggable');
            });

            // dragstart: create placeholder and hide current element
            self.$el.on('dragstart.queryBuilder', '[draggable]', function (e) {
                e.stopPropagation();

                // notify drag and drop (only dummy text)
                e.dataTransfer.setData('text', 'drag');

                src = Model(e.target);

                // Chrome glitchs
                // - helper invisible if hidden immediately
                // - "dragend" is called immediately if we modify the DOM directly
                setTimeout(function () {
                    var ph = $('<div class="rule-placeholder">&nbsp;</div>');
                    ph.css('min-height', src.$el.height());

                    placeholder = src.parent.addRule(ph, src.getPos());

                    src.$el.hide();
                }, 0);
            });

            // dragenter: move the placeholder
            self.$el.on('dragenter.queryBuilder', '[draggable]', function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (placeholder) {
                    moveSortableToTarget(placeholder, $(e.target));
                }
            });

            // dragover: prevent glitches
            self.$el.on('dragover.queryBuilder', '[draggable]', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            // drop: move current element
            self.$el.on('drop.queryBuilder', function (e) {
                e.preventDefault();
                e.stopPropagation();

                moveSortableToTarget(src, $(e.target));
            });

            // dragend: show current element and delete placeholder
            self.$el.on('dragend.queryBuilder', '[draggable]', function (e) {
                e.preventDefault();
                e.stopPropagation();

                src.$el.show();
                placeholder.drop();

                self.$el.find(Selectors.rule_and_group_containers).removeAttr('draggable');

                self.trigger('afterMove', src);

                src = placeholder = null;
            });
        });

        /**
         * Remove drag handle from non-sortable rules
         */
        this.on('parseRuleFlags.filter', function (flags) {
            if (flags.value.no_sortable === undefined) {
                flags.value.no_sortable = options.default_no_sortable;
            }
        });

        this.on('afterApplyRuleFlags', function (e, rule) {
            if (rule.flags.no_sortable) {
                rule.$el.find('.drag-handle').remove();
            }
        });

        /**
         * Remove drag handle from non-sortable groups
         */
        this.on('parseGroupFlags.filter', function (flags) {
            if (flags.value.no_sortable === undefined) {
                flags.value.no_sortable = options.default_no_sortable;
            }
        });

        this.on('afterApplyGroupFlags', function (e, group) {
            if (group.flags.no_sortable) {
                group.$el.find('.drag-handle').remove();
            }
        });

        /**
         * Modify templates
         */
        this.on('getGroupTemplate.filter', function (h, level) {
            if (level > 1) {
                var $h = $(h.value);
                $h.find(Selectors.condition_container).after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
                h.value = $h.prop('outerHTML');
            }
        });

        this.on('getRuleTemplate.filter', function (h) {
            var $h = $(h.value);
            $h.find(Selectors.rule_header).after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
            h.value = $h.prop('outerHTML');
        });
    }, {
        default_no_sortable: false,
        icon: 'glyphicon glyphicon-sort'
    });

    /**
     * Move an element (placeholder or actual object) depending on active target
     * @param {Node}
     * @param {jQuery}
     */
    function moveSortableToTarget(element, target) {
        var parent;

        // on rule
        parent = target.closest(Selectors.rule_container);
        if (parent.length) {
            element.moveAfter(Model(parent));
            return;
        }

        // on group header
        parent = target.closest(Selectors.group_header);
        if (parent.length) {
            parent = target.closest(Selectors.group_container);
            element.moveAtBegin(Model(parent));
            return;
        }

        // on group
        parent = target.closest(Selectors.group_container);
        if (parent.length) {
            element.moveAtEnd(Model(parent));
            return;
        }
    }


    /*!
     * jQuery QueryBuilder SQL Support
     * Allows to export rules as a SQL WHERE statement as well as populating the builder from an SQL query.
     */

// DEFAULT CONFIG
// ===============================
    QueryBuilder.defaults({
        /* operators for internal -> SQL conversion */
        sqlOperators: {
            equal: {op: '= ?'},
            not_equal: {op: '!= ?'},
            in: {op: 'IN(?)', sep: ', '},
            not_in: {op: 'NOT IN(?)', sep: ', '},
            less: {op: '< ?'},
            less_or_equal: {op: '<= ?'},
            greater: {op: '> ?'},
            greater_or_equal: {op: '>= ?'},
            between: {op: 'BETWEEN ?', sep: ' AND '},
            not_between: {op: 'NOT BETWEEN ?', sep: ' AND '},
            begins_with: {op: 'LIKE(?)', mod: '{0}%'},
            not_begins_with: {op: 'NOT LIKE(?)', mod: '{0}%'},
            contains: {op: 'LIKE(?)', mod: '%{0}%'},
            not_contains: {op: 'NOT LIKE(?)', mod: '%{0}%'},
            ends_with: {op: 'LIKE(?)', mod: '%{0}'},
            not_ends_with: {op: 'NOT LIKE(?)', mod: '%{0}'},
            is_empty: {op: '= \'\''},
            is_not_empty: {op: '!= \'\''},
            is_null: {op: 'IS NULL'},
            is_not_null: {op: 'IS NOT NULL'}
        },

        /* operators for SQL -> internal conversion */
        sqlRuleOperator: {
            '=': function (v) {
                return {
                    val: v,
                    op: v === '' ? 'is_empty' : 'equal'
                };
            },
            '!=': function (v) {
                return {
                    val: v,
                    op: v === '' ? 'is_not_empty' : 'not_equal'
                };
            },
            'LIKE': function (v) {
                if (v.slice(0, 1) == '%' && v.slice(-1) == '%') {
                    return {
                        val: v.slice(1, -1),
                        op: 'contains'
                    };
                }
                else if (v.slice(0, 1) == '%') {
                    return {
                        val: v.slice(1),
                        op: 'ends_with'
                    };
                }
                else if (v.slice(-1) == '%') {
                    return {
                        val: v.slice(0, -1),
                        op: 'begins_with'
                    };
                }
                else {
                    Utils.error('SQLParse', 'Invalid value for LIKE operator "{0}"', v);
                }
            },
            'IN': function (v) {
                return {val: v, op: 'in'};
            },
            'NOT IN': function (v) {
                return {val: v, op: 'not_in'};
            },
            '<': function (v) {
                return {val: v, op: 'less'};
            },
            '<=': function (v) {
                return {val: v, op: 'less_or_equal'};
            },
            '>': function (v) {
                return {val: v, op: 'greater'};
            },
            '>=': function (v) {
                return {val: v, op: 'greater_or_equal'};
            },
            'BETWEEN': function (v) {
                return {val: v, op: 'between'};
            },
            'NOT BETWEEN': function (v) {
                return {val: v, op: 'not_between'};
            },
            'IS': function (v) {
                if (v !== null) {
                    Utils.error('SQLParse', 'Invalid value for IS operator');
                }
                return {val: null, op: 'is_null'};
            },
            'IS NOT': function (v) {
                if (v !== null) {
                    Utils.error('SQLParse', 'Invalid value for IS operator');
                }
                return {val: null, op: 'is_not_null'};
            }
        },

        /* statements for internal -> SQL conversion */
        sqlStatements: {
            'question_mark': function () {
                var params = [];
                return {
                    add: function (rule, value) {
                        params.push(value);
                        return '?';
                    },
                    run: function () {
                        return params;
                    }
                };
            },

            'numbered': function (char) {
                if (!char || char.length > 1) char = '$';
                var index = 0;
                var params = [];
                return {
                    add: function (rule, value) {
                        params.push(value);
                        index++;
                        return char + index;
                    },
                    run: function () {
                        return params;
                    }
                };
            },

            'named': function (char) {
                if (!char || char.length > 1) char = ':';
                var indexes = {};
                var params = {};
                return {
                    add: function (rule, value) {
                        if (!indexes[rule.field]) indexes[rule.field] = 1;
                        var key = rule.field + '_' + (indexes[rule.field]++);
                        params[key] = value;
                        return char + key;
                    },
                    run: function () {
                        return params;
                    }
                };
            }
        },

        /* statements for SQL -> internal conversion */
        sqlRuleStatement: {
            'question_mark': function (values) {
                var index = 0;
                return {
                    parse: function (v) {
                        return v == '?' ? values[index++] : v;
                    },
                    esc: function (sql) {
                        return sql.replace(/\?/g, '\'?\'');
                    }
                };
            },

            'numbered': function (values, char) {
                if (!char || char.length > 1) char = '$';
                var regex1 = new RegExp('^\\' + char + '[0-9]+$');
                var regex2 = new RegExp('\\' + char + '([0-9]+)', 'g');
                return {
                    parse: function (v) {
                        return regex1.test(v) ? values[v.slice(1) - 1] : v;
                    },
                    esc: function (sql) {
                        return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                    }
                };
            },

            'named': function (values, char) {
                if (!char || char.length > 1) char = ':';
                var regex1 = new RegExp('^\\' + char);
                var regex2 = new RegExp('\\' + char + '(' + Object.keys(values).join('|') + ')', 'g');
                return {
                    parse: function (v) {
                        return regex1.test(v) ? values[v.slice(1)] : v;
                    },
                    esc: function (sql) {
                        return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                    }
                };
            }
        }
    });


// PUBLIC METHODS
// ===============================
    QueryBuilder.extend({
        /**
         * Get rules as SQL query
         * @throws UndefinedSQLConditionError, UndefinedSQLOperatorError
         * @param stmt {boolean|string} use prepared statements - false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
         * @param nl {bool} output with new lines
         * @param data {object} (optional) rules
         * @return {object}
         */
        getSQL: function (stmt, nl, data) {
            data = (data === undefined) ? this.getRules() : data;
            nl = (nl === true) ? '\n' : ' ';

            if (stmt === true) stmt = 'question_mark';
            if (typeof stmt == 'string') {
                var config = getStmtConfig(stmt);
                stmt = this.settings.sqlStatements[config[1]](config[2]);
            }

            var self = this;

            var sql = (function parse(data) {
                if (!data.condition) {
                    data.condition = self.settings.default_condition;
                }
                if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                    Utils.error('UndefinedSQLCondition', 'Unable to build SQL query with condition "{0}"', data.condition);
                }

                if (!data.rules) {
                    return '';
                }

                var parts = [];

                data.rules.forEach(function (rule) {
                    if (rule.rules && rule.rules.length > 0) {
                        parts.push('(' + nl + parse(rule) + nl + ')' + nl);
                    }
                    else {
                        var sql = self.settings.sqlOperators[rule.operator];
                        var ope = self.getOperatorByType(rule.operator);
                        var value = '';

                        if (sql === undefined) {
                            Utils.error('UndefinedSQLOperator', 'Unknown SQL operation for operator "{0}"', rule.operator);
                        }

                        if (ope.nb_inputs !== 0) {
                            if (!(rule.value instanceof Array)) {
                                rule.value = [rule.value];
                            }

                            rule.value.forEach(function (v, i) {
                                if (i > 0) {
                                    value += sql.sep;
                                }

                                if (rule.type == 'integer' || rule.type == 'double' || rule.type == 'boolean') {
                                    v = Utils.changeType(v, rule.type, true);
                                }
                                else if (!stmt) {
                                    v = Utils.escapeString(v);
                                }

                                if (sql.mod) {
                                    v = Utils.fmt(sql.mod, v);
                                }

                                if (stmt) {
                                    value += stmt.add(rule, v);
                                }
                                else {
                                    if (typeof v == 'string') {
                                        v = '\'' + v + '\'';
                                    }

                                    value += v;
                                }
                            });
                        }

                        parts.push(rule.field + ' ' + sql.op.replace(/\?/, value));
                    }
                });

                return parts.join(' ' + data.condition + nl);
            }(data));

            if (stmt) {
                return {
                    sql: sql,
                    params: stmt.run()
                };
            }
            else {
                return {
                    sql: sql
                };
            }
        },

        /**
         * Convert SQL to rules
         * @throws ConfigError, SQLParseError, UndefinedSQLOperatorError
         * @param data {object} query object
         * @param stmt {boolean|string} use prepared statements - false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
         * @return {object}
         */
        getRulesFromSQL: function (data, stmt) {
            if (!('SQLParser' in window)) {
                Utils.error('MissingLibrary', 'SQLParser is required to parse SQL queries. Get it here https://github.com/mistic100/sql-parser');
            }

            var self = this;

            if (typeof data == 'string') {
                data = {sql: data};
            }

            if (stmt === true) stmt = 'question_mark';
            if (typeof stmt == 'string') {
                var config = getStmtConfig(stmt);
                stmt = this.settings.sqlRuleStatement[config[1]](data.params, config[2]);
            }

            if (stmt) {
                data.sql = stmt.esc(data.sql);
            }

            if (data.sql.toUpperCase().indexOf('SELECT') !== 0) {
                data.sql = 'SELECT * FROM table WHERE ' + data.sql;
            }

            var parsed = SQLParser.parse(data.sql);

            if (!parsed.where) {
                Utils.error('SQLParse', 'No WHERE clause found');
            }

            var out = {
                condition: this.settings.default_condition,
                rules: []
            };
            var curr = out;

            (function flatten(data, i) {
                // it's a node
                if (['AND', 'OR'].indexOf(data.operation.toUpperCase()) !== -1) {
                    // create a sub-group if the condition is not the same and it's not the first level
                    if (i > 0 && curr.condition != data.operation.toUpperCase()) {
                        curr.rules.push({
                            condition: self.settings.default_condition,
                            rules: []
                        });

                        curr = curr.rules[curr.rules.length - 1];
                    }

                    curr.condition = data.operation.toUpperCase();
                    i++;

                    // some magic !
                    var next = curr;
                    flatten(data.left, i);

                    curr = next;
                    flatten(data.right, i);
                }
                // it's a leaf
                else {
                    if (data.left.value === undefined || data.right.value === undefined) {
                        Utils.error('SQLParse', 'Missing field and/or value');
                    }

                    if ($.isPlainObject(data.right.value)) {
                        Utils.error('SQLParse', 'Value format not supported for {0}.', data.left.value);
                    }

                    // convert array
                    var value;
                    if ($.isArray(data.right.value)) {
                        value = data.right.value.map(function (v) {
                            return v.value;
                        });
                    }
                    else {
                        value = data.right.value;
                    }

                    // get actual values
                    if (stmt) {
                        if ($.isArray(value)) {
                            value = value.map(stmt.parse);
                        }
                        else {
                            value = stmt.parse(value);
                        }
                    }

                    // convert operator
                    var operator = data.operation.toUpperCase();
                    if (operator == '<>') operator = '!=';

                    var sqlrl;
                    if (operator == 'NOT LIKE') {
                        sqlrl = self.settings.sqlRuleOperator['LIKE'];
                    }
                    else {
                        sqlrl = self.settings.sqlRuleOperator[operator];
                    }

                    if (sqlrl === undefined) {
                        Utils.error('UndefinedSQLOperator', 'Invalid SQL operation "{0}".', data.operation);
                    }

                    var opVal = sqlrl.call(this, value, data.operation);
                    if (operator == 'NOT LIKE') opVal.op = 'not_' + opVal.op;

                    var left_value = data.left.values.join('.');

                    curr.rules.push({
                        id: self.change('getSQLFieldID', left_value, value),
                        field: left_value,
                        operator: opVal.op,
                        value: opVal.val
                    });
                }
            }(parsed.where.conditions, 0));

            return out;
        },

        /**
         * Set rules from SQL
         * @param data {object}
         */
        setRulesFromSQL: function (data, stmt) {
            this.setRules(this.getRulesFromSQL(data, stmt));
        }
    });

    function getStmtConfig(stmt) {
        var config = stmt.match(/(question_mark|numbered|named)(?:\((.)\))?/);
        if (!config) config = [null, 'question_mark', undefined];
        return config;
    }


    /*!
     * jQuery QueryBuilder Unique Filter
     * Allows to define some filters as "unique": ie which can be used for only one rule, globally or in the same group.
     */

    QueryBuilder.define('unique-filter', function () {
        this.status.used_filters = {};

        this.on('afterUpdateRuleFilter', this.updateDisabledFilters);
        this.on('afterDeleteRule', this.updateDisabledFilters);
        this.on('afterCreateRuleFilters', this.applyDisabledFilters);
        this.on('afterReset', this.clearDisabledFilters);
        this.on('afterClear', this.clearDisabledFilters);
    });

    QueryBuilder.extend({
        updateDisabledFilters: function (e) {
            var self = e ? e.builder : this;

            self.status.used_filters = {};

            if (!self.model) {
                return;
            }

            // get used filters
            (function walk(group) {
                group.each(function (rule) {
                    if (rule.filter && rule.filter.unique) {
                        if (!self.status.used_filters[rule.filter.id]) {
                            self.status.used_filters[rule.filter.id] = [];
                        }
                        if (rule.filter.unique == 'group') {
                            self.status.used_filters[rule.filter.id].push(rule.parent);
                        }
                    }
                }, function (group) {
                    walk(group);
                });
            }(self.model.root));

            self.applyDisabledFilters(e);
        },

        clearDisabledFilters: function (e) {
            var self = e ? e.builder : this;

            self.status.used_filters = {};

            self.applyDisabledFilters(e);
        },

        applyDisabledFilters: function (e) {
            var self = e ? e.builder : this;

            // re-enable everything
            self.$el.find(Selectors.filter_container + ' option').prop('disabled', false);

            // disable some
            $.each(self.status.used_filters, function (filterId, groups) {
                if (groups.length === 0) {
                    self.$el.find(Selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
                }
                else {
                    groups.forEach(function (group) {
                        group.each(function (rule) {
                            rule.$el.find(Selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
                        });
                    });
                }
            });

            // update Selectpicker
            if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
                self.$el.find(Selectors.rule_filter).selectpicker('render');
            }
        }
    });


    /*!
     * jQuery QueryBuilder 2.3.3
     * Locale: English (en)
     * Author: Damien "Mistic" Sorel, http://www.strangeplanet.fr
     * Licensed under MIT (http://opensource.org/licenses/MIT)
     */

    QueryBuilder.regional['en'] = {
        "__locale": "English (en)",
        "__author": "Damien \"Mistic\" Sorel, http://www.strangeplanet.fr",
        "add_rule": "Add rule",
        "add_group": "Add group",
        "delete_rule": "Delete",
        "delete_group": "Delete",
        "conditions": {
            "AND": "AND",
            "OR": "OR"
        },
        "operators": {
            "equal": "equal",
            "not_equal": "not equal",
            "in": "in",
            "not_in": "not in",
            "less": "less",
            "less_or_equal": "less or equal",
            "greater": "greater",
            "greater_or_equal": "greater or equal",
            "between": "between",
            "not_between": "not between",
            "begins_with": "begins with",
            "not_begins_with": "doesn't begin with",
            "contains": "contains",
            "not_contains": "doesn't contain",
            "ends_with": "ends with",
            "not_ends_with": "doesn't end with",
            "is_empty": "is empty",
            "is_not_empty": "is not empty",
            "is_null": "is null",
            "is_not_null": "is not null"
        },
        "errors": {
            "no_filter": "No filter selected",
            "empty_group": "The group is empty",
            "radio_empty": "No value selected",
            "checkbox_empty": "No value selected",
            "select_empty": "No value selected",
            "string_empty": "Empty value",
            "string_exceed_min_length": "Must contain at least {0} characters",
            "string_exceed_max_length": "Must not contain more than {0} characters",
            "string_invalid_format": "Invalid format ({0})",
            "number_nan": "Not a number",
            "number_not_integer": "Not an integer",
            "number_not_double": "Not a real number",
            "number_exceed_min": "Must be greater than {0}",
            "number_exceed_max": "Must be lower than {0}",
            "number_wrong_step": "Must be a multiple of {0}",
            "datetime_empty": "Empty value",
            "datetime_invalid": "Invalid date format ({0})",
            "datetime_exceed_min": "Must be after {0}",
            "datetime_exceed_max": "Must be before {0}",
            "boolean_not_valid": "Not a boolean",
            "operator_not_multiple": "Operator {0} cannot accept multiple values"
        },
        "invert": "Invert"
    };

    QueryBuilder.defaults({lang_code: 'en'});
}));

/***/ }),

/***/ "./vendor/spryker/product-relation-gui/assets/Zed/js/modules/libs/product-selector.js":
/*!********************************************************************************************!*\
  !*** ./vendor/spryker/product-relation-gui/assets/Zed/js/modules/libs/product-selector.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var ProductSelector = function ProductSelector(options) {
  this.idProductAbstractElement = null;
  this.selectedProductContainer = null;
  this.selectProductNotice = null;
  this.productTable = null;
  this.selectProductUrl = null;
  $.extend(this, options);
  this.initialiseProductTable();
  this.findSelectedProduct();
};
ProductSelector.prototype.initialiseProductTable = function () {
  var self = this;
  this.productTable.dataTable({
    destroy: true,
    scrollX: 'auto',
    autoWidth: false,
    fnDrawCallback: function (settings) {
      self.onTableDraw(settings);
    }
  });
};
ProductSelector.prototype.onTableDraw = function (settings) {
  var self = this;
  $('a[data-select-product]').each(function (index, element) {
    self.addClickEventToCheckbox($(element));
  });
};
ProductSelector.prototype.findSelectedProduct = function () {
  var idSelectedProduct = parseInt(this.idProductAbstractElement.val());
  if (!idSelectedProduct) {
    return;
  }
  var self = this;
  $.get(this.selectProductUrl + idSelectedProduct).done(function (selectedProduct) {
    self.updateSelectedProduct(selectedProduct);
  });
};
ProductSelector.prototype.addClickEventToCheckbox = function (element) {
  var self = this;
  $(element).on('click', function (event) {
    $.get(self.selectProductUrl + $(event.target).data('select-product')).done(function (selectedProduct) {
      self.updateSelectedProduct(selectedProduct);
    });
  });
};
ProductSelector.prototype.updateSelectedProduct = function (selectedProduct) {
  var name = selectedProduct['spy_product_abstract_localized_attributes.name'];
  var description = selectedProduct['spy_product_abstract_localized_attributes.description'];
  var categories = selectedProduct.assigned_categories;
  var imageUrl = selectedProduct['spy_product_image.external_url_small'];
  var idProductAbstract = selectedProduct['spy_product_abstract.id_product_abstract'];
  this.selectProductNotice.hide();
  this.selectedProductContainer.show();
  this.selectedProductContainer.find('#product-img').attr({
    src: imageUrl
  });
  this.selectedProductContainer.find('.product-name').text(name);
  this.selectedProductContainer.find('#product-description').text(description);
  this.selectedProductContainer.find('#product-category').text(categories);
  this.idProductAbstractElement.val(idProductAbstract);
};
module.exports = ProductSelector;

/***/ }),

/***/ "./vendor/spryker/product-relation-gui/assets/Zed/js/modules/libs/sql-query-builder.js":
/*!*********************************************************************************************!*\
  !*** ./vendor/spryker/product-relation-gui/assets/Zed/js/modules/libs/sql-query-builder.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! @spryker/jquery-query-builder */ "./node_modules/@spryker/jquery-query-builder/index.js");
var SqlQueryBuilder = function (options) {
  this.idProductRelation = null;
  this.builder = null;
  this.queryBuilderElement = null;
  this.filtersUrl = null;
  this.productRelationQuerySet = null;
  this.productRelationFormSubmitBtn = null;
  this.ruleQueryTable = null;
  this.tabsContainer = null;
  this.flashMessages = null;
  $.extend(this, options);
  var filterConfigurationUrl = this.filtersUrl + this.idProductRelation;
  var self = this;
  $.get(filterConfigurationUrl).done(function (filters) {
    self.builder = self.queryBuilderElement.queryBuilder(self.getQueryBuilderOptions(filters));
    self.loadQuerySet();
    self.watchForQueryRuleUpdates();
    self.updateTable();
    self.onFormSubmit();
  });
};
SqlQueryBuilder.prototype.getQuerySet = function () {
  var status = this.builder.queryBuilder('getRules') || {};
  if (!status.rules || !status.rules.length) {
    return [];
  }
  this.toggleSubmitButton(false);
  this.toggleErrorState(false);
  return this.builder.queryBuilder('getRules');
};
SqlQueryBuilder.prototype.loadQuerySet = function () {
  var querySet = this.productRelationQuerySet.val();
  if (querySet.length > 0) {
    this.builder.queryBuilder('setRules', JSON.parse(querySet));
  }
};
SqlQueryBuilder.prototype.onFormSubmit = function () {
  var self = this;
  this.productRelationFormSubmitBtn.on('click', function (event) {
    if (!self.builder.queryBuilder('validate')) {
      event.preventDefault();
      self.toggleSubmitButton(true);
      self.toggleErrorState(true);
      window.scrollTo(0, 0);
      return;
    }
  });
};
SqlQueryBuilder.prototype.getQueryBuilderOptions = function (filters) {
  return {
    filters: filters,
    default_condition: 'AND',
    optgroups: {
      attributes: '-- Attributes'
    },
    lang: {
      operators: {
        in: 'is in'
      }
    },
    sqlOperators: {
      in: {
        op: 'IS IN ?',
        sep: ', '
      }
    },
    sqlRuleOperator: {
      'IS IN': function (v) {
        return {
          val: v,
          op: 'in'
        };
      }
    }
  };
};
SqlQueryBuilder.prototype.watchForQueryRuleUpdates = function () {
  var self = this;
  this.queryBuilderElement.on('afterAddGroup.queryBuilder afterAddRule.queryBuilder afterUpdateRuleValue.queryBuilder	afterUpdateRuleFilter.queryBuilder afterUpdateRuleOperator.queryBuilder afterApplyRuleFlags.queryBuilder afterUpdateGroupCondition.queryBuilder afterDeleteRule.queryBuilder afterDeleteGroup.queryBuilder', function () {
    self.updateTable();
    self.updateQuerySetField();
  });
};
SqlQueryBuilder.prototype.updateTable = function () {
  var table = this.initializeRuleProductsTable();
  var json = JSON.stringify(this.getQuerySet());
  this.reloadQueryBuilderTable(table, json);
};
SqlQueryBuilder.prototype.updateQuerySetField = function () {
  var json = JSON.stringify(this.getQuerySet());
  this.productRelationQuerySet.val(json);
};
SqlQueryBuilder.prototype.initializeRuleProductsTable = function () {
  return this.ruleQueryTable.DataTable();
};
SqlQueryBuilder.prototype.replaceUrlParam = function (parameter, value, url) {
  var regex = new RegExp('([?;&])' + parameter + '[^&;]*[;&]?');
  var query = url.replace(regex, '$1').replace(/&$/, '');
  return (query.length > 2 ? query + '&' : '?') + (value ? parameter + '=' + value : '');
};
SqlQueryBuilder.prototype.reloadQueryBuilderTable = function (table, json) {
  var url = table.ajax.url();
  var newUrl = this.replaceUrlParam('data', json, url);
  table.ajax.url(newUrl).load();
};
SqlQueryBuilder.prototype.toggleSubmitButton = function (isDisabled) {
  this.productRelationFormSubmitBtn[0].disabled = isDisabled;
  this.productRelationFormSubmitBtn[0].classList.toggle('disabled', isDisabled);
};
SqlQueryBuilder.prototype.toggleErrorState = function (isError) {
  this.tabsContainer.find('[data-tab-content-id="tab-content-assign-products"]').toggleClass('error', isError);
  this.flashMessages.html(isError ? '<div class="alert alert-danger">' + this.builder.attr('data-error-message') + '</div>' : '');
};
module.exports = SqlQueryBuilder;

/***/ }),

/***/ "./vendor/spryker/product-relation-gui/assets/Zed/js/modules/main.js":
/*!***************************************************************************!*\
  !*** ./vendor/spryker/product-relation-gui/assets/Zed/js/modules/main.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../../sass/main.scss */ "./vendor/spryker/product-relation-gui/assets/Zed/sass/main.scss");
var ProductSelector = __webpack_require__(/*! ./libs/product-selector */ "./vendor/spryker/product-relation-gui/assets/Zed/js/modules/libs/product-selector.js");
var SqlQueryBuilder = __webpack_require__(/*! ./libs/sql-query-builder */ "./vendor/spryker/product-relation-gui/assets/Zed/js/modules/libs/sql-query-builder.js");
$(document).ready(function () {
  new ProductSelector({
    idProductAbstractElement: $('#product_relation_fkProductAbstract'),
    selectedProductContainer: $('#selected-product'),
    selectProductNotice: $('#select-product-notice'),
    productTable: $('#product-table'),
    selectProductUrl: '/product-relation-gui/product-selector?id-product-abstract='
  });
  new SqlQueryBuilder({
    id: $('#product_relation_idProductRelation').val(),
    queryBuilderElement: $('#builder'),
    filtersUrl: '/product-relation-gui/query-builder/load-filter-set?id-product-relation=',
    productRelationQuerySet: $('#product_relation_querySet'),
    productRelationFormSubmitBtn: $('#submit-relation'),
    ruleQueryTable: $('#rule-query-table'),
    tabsContainer: $('.tabs-container'),
    flashMessages: $('.flash-messages')
  });
});

/***/ }),

/***/ "./vendor/spryker/product-relation-gui/assets/Zed/js/spryker-zed-product-relation-gui.entry.js":
/*!*****************************************************************************************************!*\
  !*** ./vendor/spryker/product-relation-gui/assets/Zed/js/spryker-zed-product-relation-gui.entry.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./modules/main */ "./vendor/spryker/product-relation-gui/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./node_modules/dot/doT.js":
/*!*********************************!*\
  !*** ./node_modules/dot/doT.js ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;// doT.js
// 2011-2014, Laura Doktorova, https://github.com/olado/doT
// Licensed under the MIT license.

(function () {
	"use strict";

	var doT = {
		name: "doT",
		version: "1.1.1",
		templateSettings: {
			evaluate:    /\{\{([\s\S]+?(\}?)+)\}\}/g,
			interpolate: /\{\{=([\s\S]+?)\}\}/g,
			encode:      /\{\{!([\s\S]+?)\}\}/g,
			use:         /\{\{#([\s\S]+?)\}\}/g,
			useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
			define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
			defineParams:/^\s*([\w$]+):([\s\S]+)/,
			conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
			iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
			varname:	"it",
			strip:		true,
			append:		true,
			selfcontained: false,
			doNotSkipEncoded: false
		},
		template: undefined, //fn, compile template
		compile:  undefined, //fn, for express
		log: true
	}, _globals;

	doT.encodeHTMLSource = function(doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	};

	_globals = (function(){ return this || (0,eval)("this"); }());

	/* istanbul ignore else */
	if ( true && module.exports) {
		module.exports = doT;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return doT;}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

	var startend = {
		append: { start: "'+(",      end: ")+'",      startencode: "'+encodeHTML(" },
		split:  { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" }
	}, skip = /$^/;

	function resolveDefs(c, block, def) {
		return ((typeof block === "string") ? block : block.toString())
		.replace(c.define || skip, function(m, code, assign, value) {
			if (code.indexOf("def.") === 0) {
				code = code.substring(4);
			}
			if (!(code in def)) {
				if (assign === ":") {
					if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
						def[code] = {arg: param, text: v};
					});
					if (!(code in def)) def[code]= value;
				} else {
					new Function("def", "def['"+code+"']=" + value)(def);
				}
			}
			return "";
		})
		.replace(c.use || skip, function(m, code) {
			if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
				if (def[d] && def[d].arg && param) {
					var rw = (d+":"+param).replace(/'|\\/g, "_");
					def.__exp = def.__exp || {};
					def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
					return s + "def.__exp['"+rw+"']";
				}
			});
			var v = new Function("def", "return " + code)(def);
			return v ? resolveDefs(c, v, def) : v;
		});
	}

	function unescape(code) {
		return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
	}

	doT.template = function(tmpl, c, def) {
		c = c || doT.templateSettings;
		var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv,
			str  = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;

		str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ")
					.replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""): str)
			.replace(/'|\\/g, "\\$&")
			.replace(c.interpolate || skip, function(m, code) {
				return cse.start + unescape(code) + cse.end;
			})
			.replace(c.encode || skip, function(m, code) {
				needhtmlencode = true;
				return cse.startencode + unescape(code) + cse.end;
			})
			.replace(c.conditional || skip, function(m, elsecase, code) {
				return elsecase ?
					(code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
					(code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
			})
			.replace(c.iterate || skip, function(m, iterate, vname, iname) {
				if (!iterate) return "';} } out+='";
				sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
				return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
					+vname+"=arr"+sid+"["+indv+"+=1];out+='";
			})
			.replace(c.evaluate || skip, function(m, code) {
				return "';" + unescape(code) + "out+='";
			})
			+ "';return out;")
			.replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
			.replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, "");
			//.replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

		if (needhtmlencode) {
			if (!c.selfcontained && _globals && !_globals._encodeHTML) _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
			str = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("
				+ doT.encodeHTMLSource.toString() + "(" + (c.doNotSkipEncoded || '') + "));"
				+ str;
		}
		try {
			return new Function(c.varname, str);
		} catch (e) {
			/* istanbul ignore else */
			if (typeof console !== "undefined") console.log("Could not create a template function: " + str);
			throw e;
		}
	};

	doT.compile = function(tmpl, def) {
		return doT.template(tmpl, null, def);
	};
}());


/***/ }),

/***/ "./node_modules/jquery-extendext/jquery-extendext.js":
/*!***********************************************************!*\
  !*** ./node_modules/jquery-extendext/jquery-extendext.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery.extendext 1.0.0
 *
 * Copyright 2014-2019 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 * 
 * Based on jQuery.extend by jQuery Foundation, Inc. and other contributors
 */

(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else {}
}(this, function ($) {
    "use strict";

    $.extendext = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false,
            arrayMode = 'default';

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i++] || {};
        }

        // Handle array mode parameter
        if (typeof target === "string") {
            arrayMode = target.toLowerCase();
            if (arrayMode !== 'concat' && arrayMode !== 'replace' && arrayMode !== 'extend') {
                arrayMode = 'default';
            }

            // Skip the string param
            target = arguments[i++] || {};
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !$.isFunction(target)) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) !== null) {
                // Special operations for arrays
                if ($.isArray(options) && arrayMode !== 'default') {
                    clone = target && $.isArray(target) ? target : [];

                    switch (arrayMode) {
                    case 'concat':
                        target = clone.concat($.extend(deep, [], options));
                        break;

                    case 'replace':
                        target = $.extend(deep, [], options);
                        break;

                    case 'extend':
                        options.forEach(function (e, i) {
                            if (typeof e === 'object') {
                                var type = $.isArray(e) ? [] : {};
                                clone[i] = $.extendext(deep, arrayMode, clone[i] || type, e);

                            } else if (clone.indexOf(e) === -1) {
                                clone.push(e);
                            }
                        });

                        target = clone;
                        break;
                    }

                } else {
                    // Extend the base object
                    for (name in options) {
                        copy = options[name];

                        // Prevent never-ending loop
                        if (name === '__proto__' || target === copy) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && ( $.isPlainObject(copy) ||
                            (copyIsArray = $.isArray(copy)) )) {
                            src = target[name];

                            // Ensure proper type for the source value
                            if ( copyIsArray && !Array.isArray( src ) ) {
                                clone = [];
                            } else if ( !copyIsArray && !$.isPlainObject( src ) ) {
                                clone = {};
                            } else {
                                clone = src;
                            }
                            copyIsArray = false;

                            // Never move original objects, clone them
                            target[name] = $.extendext(deep, arrayMode, clone, copy);

                            // Don't bring in undefined values
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };
}));


/***/ }),

/***/ "./vendor/spryker/product-relation-gui/assets/Zed/sass/main.scss":
/*!***********************************************************************!*\
  !*** ./vendor/spryker/product-relation-gui/assets/Zed/sass/main.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-relation-gui/assets/Zed/js/spryker-zed-product-relation-gui.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LXJlbGF0aW9uLWd1aS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsb0RBQVE7QUFDN0IsVUFBVSxtQkFBTyxDQUFDLDBDQUFTO0FBQzNCLG1CQUFPLENBQUMsNkVBQWtCOztBQUUxQjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QyxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZUFBZTtBQUNmLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxFQUFFO0FBQ2pFO0FBQ0EsU0FBUztBQUNUOzs7QUFHQTtBQUNBO0FB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QUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNB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RCxRQUFRLGlDQUFPLENBQUMseUVBQVEsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0FBQ25DO0FBQ0EsU0FBUyxFQUtKO0FBQ0wsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ25JRCIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9Ac3ByeWtlci9qcXVlcnktcXVlcnktYnVpbGRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LXJlbGF0aW9uLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9wcm9kdWN0LXNlbGVjdG9yLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtcmVsYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL3NxbC1xdWVyeS1idWlsZGVyLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtcmVsYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtcmVsYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtcHJvZHVjdC1yZWxhdGlvbi1ndWkuZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vbm9kZV9tb2R1bGVzL2RvdC9kb1QuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vbm9kZV9tb2R1bGVzL2pxdWVyeS1leHRlbmRleHQvanF1ZXJ5LWV4dGVuZGV4dC5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LXJlbGF0aW9uLWd1aS9hc3NldHMvWmVkL3Nhc3MvbWFpbi5zY3NzPzBjMjgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBqUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcbnZhciBkb3QgPSByZXF1aXJlKCdkb3QvZG9UJyk7XG5yZXF1aXJlKCdqcXVlcnktZXh0ZW5kZXh0Jyk7XG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGZhY3RvcnkoalF1ZXJ5LCBkb3QpO1xufShmdW5jdGlvbiAoJCwgZG9UKSB7XG5cbi8vIENMQVNTIERFRklOSVRJT05cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB2YXIgUXVlcnlCdWlsZGVyID0gZnVuY3Rpb24gKCRlbCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmluaXQoJGVsLCBvcHRpb25zKTtcbiAgICB9O1xuXG5cbi8vIEVWRU5UUyBTWVNURU1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAkLmV4dGVuZChRdWVyeUJ1aWxkZXIucHJvdG90eXBlLCB7XG4gICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKHR5cGUsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgJC5FdmVudCh0eXBlICsgJy5xdWVyeUJ1aWxkZXIuZmlsdGVyJywge1xuICAgICAgICAgICAgICAgIGJ1aWxkZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kZWwudHJpZ2dlckhhbmRsZXIoZXZlbnQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQudmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyAkLkV2ZW50KHR5cGUgKyAnLnF1ZXJ5QnVpbGRlcicsIHtcbiAgICAgICAgICAgICAgICBidWlsZGVyOiB0aGlzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kZWwudHJpZ2dlckhhbmRsZXIoZXZlbnQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb246IGZ1bmN0aW9uICh0eXBlLCBjYikge1xuICAgICAgICAgICAgdGhpcy4kZWwub24odHlwZSArICcucXVlcnlCdWlsZGVyJywgY2IpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb2ZmOiBmdW5jdGlvbiAodHlwZSwgY2IpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9mZih0eXBlICsgJy5xdWVyeUJ1aWxkZXInLCBjYik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBvbmNlOiBmdW5jdGlvbiAodHlwZSwgY2IpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLm9uZSh0eXBlICsgJy5xdWVyeUJ1aWxkZXInLCBjYik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbi8vIFBMVUdJTlMgU1lTVEVNXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUXVlcnlCdWlsZGVyLnBsdWdpbnMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEdldCBvciBleHRlbmQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Qsb3B0aW9uYWx9IG5ldyBjb25maWd1cmF0aW9uLCBsZWF2ZSB1bmRlZmluZWQgdG8gZ2V0IHRoZSBkZWZhdWx0IGNvbmZpZ1xuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZHxvYmplY3R9IG5vdGhpbmcgb3IgY29uZmlndXJhdGlvbiBvYmplY3QgKGNvcHkpXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLmRlZmF1bHRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAkLmV4dGVuZGV4dCh0cnVlLCAncmVwbGFjZScsIFF1ZXJ5QnVpbGRlci5ERUZBVUxUUywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgUXVlcnlCdWlsZGVyLkRFRkFVTFRTW29wdGlvbnNdID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCBRdWVyeUJ1aWxkZXIuREVGQVVMVFNbb3B0aW9uc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFF1ZXJ5QnVpbGRlci5ERUZBVUxUU1tvcHRpb25zXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgUXVlcnlCdWlsZGVyLkRFRkFVTFRTKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgYSBuZXcgcGx1Z2luXG4gICAgICogQHBhcmFtIHtzdHJpbmd9XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn1cbiAgICAgKiBAcGFyYW0ge29iamVjdCxvcHRpb25hbH0gZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLmRlZmluZSA9IGZ1bmN0aW9uIChuYW1lLCBmY3QsIGRlZikge1xuICAgICAgICBRdWVyeUJ1aWxkZXIucGx1Z2luc1tuYW1lXSA9IHtcbiAgICAgICAgICAgIGZjdDogZmN0LFxuICAgICAgICAgICAgZGVmOiBkZWYgfHwge31cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIG5ldyBtZXRob2RzXG4gICAgICogQHBhcmFtIHtvYmplY3R9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLmV4dGVuZCA9IGZ1bmN0aW9uIChtZXRob2RzKSB7XG4gICAgICAgICQuZXh0ZW5kKFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0IHBsdWdpbnMgZm9yIGFuIGluc3RhbmNlXG4gICAgICogQHRocm93cyBDb25maWdFcnJvclxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuaW5pdFBsdWdpbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJC5pc0FycmF5KHRoaXMucGx1Z2lucykpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSB7fTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICB0bXBbcGx1Z2luXSA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucyA9IHRtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMucGx1Z2lucykuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgICAgICBpZiAocGx1Z2luIGluIFF1ZXJ5QnVpbGRlci5wbHVnaW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpbl0gPSAkLmV4dGVuZCh0cnVlLCB7fSxcbiAgICAgICAgICAgICAgICAgICAgUXVlcnlCdWlsZGVyLnBsdWdpbnNbcGx1Z2luXS5kZWYsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luc1twbHVnaW5dIHx8IHt9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIFF1ZXJ5QnVpbGRlci5wbHVnaW5zW3BsdWdpbl0uZmN0LmNhbGwodGhpcywgdGhpcy5wbHVnaW5zW3BsdWdpbl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdVbmFibGUgdG8gZmluZCBwbHVnaW4gXCJ7MH1cIicsIHBsdWdpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFsbG93ZWQgdHlwZXMgYW5kIHRoZWlyIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnR5cGVzID0ge1xuICAgICAgICAnc3RyaW5nJzogJ3N0cmluZycsXG4gICAgICAgICdpbnRlZ2VyJzogJ251bWJlcicsXG4gICAgICAgICdkb3VibGUnOiAnbnVtYmVyJyxcbiAgICAgICAgJ2RhdGUnOiAnZGF0ZXRpbWUnLFxuICAgICAgICAndGltZSc6ICdkYXRldGltZScsXG4gICAgICAgICdkYXRldGltZSc6ICdkYXRldGltZScsXG4gICAgICAgICdib29sZWFuJzogJ2Jvb2xlYW4nXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsbG93ZWQgaW5wdXRzXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLmlucHV0cyA9IFtcbiAgICAgICAgJ3RleHQnLFxuICAgICAgICAndGV4dGFyZWEnLFxuICAgICAgICAncmFkaW8nLFxuICAgICAgICAnY2hlY2tib3gnLFxuICAgICAgICAnc2VsZWN0J1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBSdW50aW1lIG1vZGlmaWFibGUgb3B0aW9ucyB3aXRoIGBzZXRPcHRpb25zYCBtZXRob2RcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIubW9kaWZpYWJsZV9vcHRpb25zID0gW1xuICAgICAgICAnZGlzcGxheV9lcnJvcnMnLFxuICAgICAgICAnYWxsb3dfZ3JvdXBzJyxcbiAgICAgICAgJ2FsbG93X2VtcHR5JyxcbiAgICAgICAgJ2RlZmF1bHRfY29uZGl0aW9uJyxcbiAgICAgICAgJ2RlZmF1bHRfZmlsdGVyJ1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBDU1Mgc2VsZWN0b3JzIGZvciBjb21tb24gY29tcG9uZW50c1xuICAgICAqL1xuICAgIHZhciBTZWxlY3RvcnMgPSBRdWVyeUJ1aWxkZXIuc2VsZWN0b3JzID0ge1xuICAgICAgICBncm91cF9jb250YWluZXI6ICcucnVsZXMtZ3JvdXAtY29udGFpbmVyJyxcbiAgICAgICAgcnVsZV9jb250YWluZXI6ICcucnVsZS1jb250YWluZXInLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyOiAnLnJ1bGUtZmlsdGVyLWNvbnRhaW5lcicsXG4gICAgICAgIG9wZXJhdG9yX2NvbnRhaW5lcjogJy5ydWxlLW9wZXJhdG9yLWNvbnRhaW5lcicsXG4gICAgICAgIHZhbHVlX2NvbnRhaW5lcjogJy5ydWxlLXZhbHVlLWNvbnRhaW5lcicsXG4gICAgICAgIGVycm9yX2NvbnRhaW5lcjogJy5lcnJvci1jb250YWluZXInLFxuICAgICAgICBjb25kaXRpb25fY29udGFpbmVyOiAnLnJ1bGVzLWdyb3VwLWhlYWRlciAuZ3JvdXAtY29uZGl0aW9ucycsXG5cbiAgICAgICAgcnVsZV9oZWFkZXI6ICcucnVsZS1oZWFkZXInLFxuICAgICAgICBncm91cF9oZWFkZXI6ICcucnVsZXMtZ3JvdXAtaGVhZGVyJyxcbiAgICAgICAgZ3JvdXBfYWN0aW9uczogJy5ncm91cC1hY3Rpb25zJyxcbiAgICAgICAgcnVsZV9hY3Rpb25zOiAnLnJ1bGUtYWN0aW9ucycsXG5cbiAgICAgICAgcnVsZXNfbGlzdDogJy5ydWxlcy1ncm91cC1ib2R5Pi5ydWxlcy1saXN0JyxcblxuICAgICAgICBncm91cF9jb25kaXRpb246ICcucnVsZXMtZ3JvdXAtaGVhZGVyIFtuYW1lJD1fY29uZF0nLFxuICAgICAgICBydWxlX2ZpbHRlcjogJy5ydWxlLWZpbHRlci1jb250YWluZXIgW25hbWUkPV9maWx0ZXJdJyxcbiAgICAgICAgcnVsZV9vcGVyYXRvcjogJy5ydWxlLW9wZXJhdG9yLWNvbnRhaW5lciBbbmFtZSQ9X29wZXJhdG9yXScsXG4gICAgICAgIHJ1bGVfdmFsdWU6ICcucnVsZS12YWx1ZS1jb250YWluZXIgW25hbWUqPV92YWx1ZV9dJyxcblxuICAgICAgICBhZGRfcnVsZTogJ1tkYXRhLWFkZD1ydWxlXScsXG4gICAgICAgIGRlbGV0ZV9ydWxlOiAnW2RhdGEtZGVsZXRlPXJ1bGVdJyxcbiAgICAgICAgYWRkX2dyb3VwOiAnW2RhdGEtYWRkPWdyb3VwXScsXG4gICAgICAgIGRlbGV0ZV9ncm91cDogJ1tkYXRhLWRlbGV0ZT1ncm91cF0nXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIHN0cmluZ3MgKHNlZSBgdGVtcGxhdGUuanNgKVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci50ZW1wbGF0ZXMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIExvY2FsaXplZCBzdHJpbmdzIChzZWUgYGkxOG4vYClcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucmVnaW9uYWwgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgb3BlcmF0b3JzXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLk9QRVJBVE9SUyA9IHtcbiAgICAgICAgZXF1YWw6IHt0eXBlOiAnZXF1YWwnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnc3RyaW5nJywgJ251bWJlcicsICdkYXRldGltZScsICdib29sZWFuJ119LFxuICAgICAgICBub3RfZXF1YWw6IHtcbiAgICAgICAgICAgIHR5cGU6ICdub3RfZXF1YWwnLFxuICAgICAgICAgICAgbmJfaW5wdXRzOiAxLFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgYXBwbHlfdG86IFsnc3RyaW5nJywgJ251bWJlcicsICdkYXRldGltZScsICdib29sZWFuJ11cbiAgICAgICAgfSxcbiAgICAgICAgaW46IHt0eXBlOiAnaW4nLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiB0cnVlLCBhcHBseV90bzogWydzdHJpbmcnLCAnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBub3RfaW46IHt0eXBlOiAnbm90X2luJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogdHJ1ZSwgYXBwbHlfdG86IFsnc3RyaW5nJywgJ251bWJlcicsICdkYXRldGltZSddfSxcbiAgICAgICAgbGVzczoge3R5cGU6ICdsZXNzJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ251bWJlcicsICdkYXRldGltZSddfSxcbiAgICAgICAgbGVzc19vcl9lcXVhbDoge3R5cGU6ICdsZXNzX29yX2VxdWFsJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ251bWJlcicsICdkYXRldGltZSddfSxcbiAgICAgICAgZ3JlYXRlcjoge3R5cGU6ICdncmVhdGVyJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ251bWJlcicsICdkYXRldGltZSddfSxcbiAgICAgICAgZ3JlYXRlcl9vcl9lcXVhbDoge3R5cGU6ICdncmVhdGVyX29yX2VxdWFsJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ251bWJlcicsICdkYXRldGltZSddfSxcbiAgICAgICAgYmV0d2Vlbjoge3R5cGU6ICdiZXR3ZWVuJywgbmJfaW5wdXRzOiAyLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ251bWJlcicsICdkYXRldGltZSddfSxcbiAgICAgICAgbm90X2JldHdlZW46IHt0eXBlOiAnbm90X2JldHdlZW4nLCBuYl9pbnB1dHM6IDIsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBiZWdpbnNfd2l0aDoge3R5cGU6ICdiZWdpbnNfd2l0aCcsIG5iX2lucHV0czogMSwgbXVsdGlwbGU6IGZhbHNlLCBhcHBseV90bzogWydzdHJpbmcnXX0sXG4gICAgICAgIG5vdF9iZWdpbnNfd2l0aDoge3R5cGU6ICdub3RfYmVnaW5zX3dpdGgnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnc3RyaW5nJ119LFxuICAgICAgICBjb250YWluczoge3R5cGU6ICdjb250YWlucycsIG5iX2lucHV0czogMSwgbXVsdGlwbGU6IGZhbHNlLCBhcHBseV90bzogWydzdHJpbmcnXX0sXG4gICAgICAgIG5vdF9jb250YWluczoge3R5cGU6ICdub3RfY29udGFpbnMnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnc3RyaW5nJ119LFxuICAgICAgICBlbmRzX3dpdGg6IHt0eXBlOiAnZW5kc193aXRoJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ3N0cmluZyddfSxcbiAgICAgICAgbm90X2VuZHNfd2l0aDoge3R5cGU6ICdub3RfZW5kc193aXRoJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ3N0cmluZyddfSxcbiAgICAgICAgaXNfZW1wdHk6IHt0eXBlOiAnaXNfZW1wdHknLCBuYl9pbnB1dHM6IDAsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnc3RyaW5nJ119LFxuICAgICAgICBpc19ub3RfZW1wdHk6IHt0eXBlOiAnaXNfbm90X2VtcHR5JywgbmJfaW5wdXRzOiAwLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ3N0cmluZyddfSxcbiAgICAgICAgaXNfbnVsbDoge1xuICAgICAgICAgICAgdHlwZTogJ2lzX251bGwnLFxuICAgICAgICAgICAgbmJfaW5wdXRzOiAwLFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgYXBwbHlfdG86IFsnc3RyaW5nJywgJ251bWJlcicsICdkYXRldGltZScsICdib29sZWFuJ11cbiAgICAgICAgfSxcbiAgICAgICAgaXNfbm90X251bGw6IHtcbiAgICAgICAgICAgIHR5cGU6ICdpc19ub3RfbnVsbCcsXG4gICAgICAgICAgICBuYl9pbnB1dHM6IDAsXG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBhcHBseV90bzogWydzdHJpbmcnLCAnbnVtYmVyJywgJ2RhdGV0aW1lJywgJ2Jvb2xlYW4nXVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5ERUZBVUxUUyA9IHtcbiAgICAgICAgZmlsdGVyczogW10sXG4gICAgICAgIHBsdWdpbnM6IFtdLFxuXG4gICAgICAgIHNvcnRfZmlsdGVyczogZmFsc2UsXG4gICAgICAgIGRpc3BsYXlfZXJyb3JzOiB0cnVlLFxuICAgICAgICBhbGxvd19ncm91cHM6IC0xLFxuICAgICAgICBhbGxvd19lbXB0eTogZmFsc2UsXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnQU5EJywgJ09SJ10sXG4gICAgICAgIGRlZmF1bHRfY29uZGl0aW9uOiAnQU5EJyxcbiAgICAgICAgaW5wdXRzX3NlcGFyYXRvcjogJyAsICcsXG4gICAgICAgIHNlbGVjdF9wbGFjZWhvbGRlcjogJy0tLS0tLScsXG4gICAgICAgIGRpc3BsYXlfZW1wdHlfZmlsdGVyOiB0cnVlLFxuICAgICAgICBkZWZhdWx0X2ZpbHRlcjogbnVsbCxcbiAgICAgICAgb3B0Z3JvdXBzOiB7fSxcblxuICAgICAgICBkZWZhdWx0X3J1bGVfZmxhZ3M6IHtcbiAgICAgICAgICAgIGZpbHRlcl9yZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICBvcGVyYXRvcl9yZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZV9yZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICBub19kZWxldGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdF9ncm91cF9mbGFnczoge1xuICAgICAgICAgICAgY29uZGl0aW9uX3JlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIG5vX2RlbGV0ZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgICAgICAgIGdyb3VwOiBudWxsLFxuICAgICAgICAgICAgcnVsZTogbnVsbCxcbiAgICAgICAgICAgIGZpbHRlclNlbGVjdDogbnVsbCxcbiAgICAgICAgICAgIG9wZXJhdG9yU2VsZWN0OiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGFuZ19jb2RlOiAnZW4nLFxuICAgICAgICBsYW5nOiB7fSxcblxuICAgICAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgICAgICdlcXVhbCcsXG4gICAgICAgICAgICAnbm90X2VxdWFsJyxcbiAgICAgICAgICAgICdpbicsXG4gICAgICAgICAgICAnbm90X2luJyxcbiAgICAgICAgICAgICdsZXNzJyxcbiAgICAgICAgICAgICdsZXNzX29yX2VxdWFsJyxcbiAgICAgICAgICAgICdncmVhdGVyJyxcbiAgICAgICAgICAgICdncmVhdGVyX29yX2VxdWFsJyxcbiAgICAgICAgICAgICdiZXR3ZWVuJyxcbiAgICAgICAgICAgICdub3RfYmV0d2VlbicsXG4gICAgICAgICAgICAnYmVnaW5zX3dpdGgnLFxuICAgICAgICAgICAgJ25vdF9iZWdpbnNfd2l0aCcsXG4gICAgICAgICAgICAnY29udGFpbnMnLFxuICAgICAgICAgICAgJ25vdF9jb250YWlucycsXG4gICAgICAgICAgICAnZW5kc193aXRoJyxcbiAgICAgICAgICAgICdub3RfZW5kc193aXRoJyxcbiAgICAgICAgICAgICdpc19lbXB0eScsXG4gICAgICAgICAgICAnaXNfbm90X2VtcHR5JyxcbiAgICAgICAgICAgICdpc19udWxsJyxcbiAgICAgICAgICAgICdpc19ub3RfbnVsbCdcbiAgICAgICAgXSxcblxuICAgICAgICBpY29uczoge1xuICAgICAgICAgICAgYWRkX2dyb3VwOiAnZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzLXNpZ24nLFxuICAgICAgICAgICAgYWRkX3J1bGU6ICdnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMnLFxuICAgICAgICAgICAgcmVtb3ZlX2dyb3VwOiAnZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmUnLFxuICAgICAgICAgICAgcmVtb3ZlX3J1bGU6ICdnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZScsXG4gICAgICAgICAgICBlcnJvcjogJ2dseXBoaWNvbiBnbHlwaGljb24td2FybmluZy1zaWduJ1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgYnVpbGRlclxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgkZWwsIG9wdGlvbnMpIHtcbiAgICAgICAgJGVsWzBdLnF1ZXJ5QnVpbGRlciA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGVsID0gJGVsO1xuXG4gICAgICAgIC8vIFBST1BFUlRJRVNcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9ICQuZXh0ZW5kZXh0KHRydWUsICdyZXBsYWNlJywge30sIFF1ZXJ5QnVpbGRlci5ERUZBVUxUUywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwoKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB7XG4gICAgICAgICAgICBncm91cF9pZDogMCxcbiAgICAgICAgICAgIHJ1bGVfaWQ6IDAsXG4gICAgICAgICAgICBnZW5lcmF0ZWRfaWQ6IGZhbHNlLFxuICAgICAgICAgICAgaGFzX29wdGdyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc19vcGVyYXRvcl9vcHJncm91cDogZmFsc2UsXG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIHVwZGF0aW5nX3ZhbHVlOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFwiYWxsb3dfZ3JvdXBzXCIgY2FuIGJlIGJvb2xlYW4gb3IgaW50XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsbG93X2dyb3VwcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuYWxsb3dfZ3JvdXBzID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLmFsbG93X2dyb3VwcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5hbGxvd19ncm91cHMgPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNFVFRJTkdTIFNIT1JUQ1VUU1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSB0aGlzLnNldHRpbmdzLmZpbHRlcnM7XG4gICAgICAgIHRoaXMuaWNvbnMgPSB0aGlzLnNldHRpbmdzLmljb25zO1xuICAgICAgICB0aGlzLm9wZXJhdG9ycyA9IHRoaXMuc2V0dGluZ3Mub3BlcmF0b3JzO1xuICAgICAgICB0aGlzLnRlbXBsYXRlcyA9IHRoaXMuc2V0dGluZ3MudGVtcGxhdGVzO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLnNldHRpbmdzLnBsdWdpbnM7XG5cbiAgICAgICAgLy8gdHJhbnNsYXRpb25zIDogZW5nbGlzaCA8PCAnbGFuZ19jb2RlJyA8PCBjdXN0b21cbiAgICAgICAgaWYgKFF1ZXJ5QnVpbGRlci5yZWdpb25hbFsnZW4nXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ1wiaTE4bi9lbi5qc1wiIG5vdCBsb2FkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYW5nID0gJC5leHRlbmRleHQodHJ1ZSwgJ3JlcGxhY2UnLCB7fSwgUXVlcnlCdWlsZGVyLnJlZ2lvbmFsWydlbiddLCBRdWVyeUJ1aWxkZXIucmVnaW9uYWxbdGhpcy5zZXR0aW5ncy5sYW5nX2NvZGVdLCB0aGlzLnNldHRpbmdzLmxhbmcpO1xuXG4gICAgICAgIC8vIGluaXQgdGVtcGxhdGVzXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGVtcGxhdGVzKS5mb3JFYWNoKGZ1bmN0aW9uICh0cGwpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50ZW1wbGF0ZXNbdHBsXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVzW3RwbF0gPSBRdWVyeUJ1aWxkZXIudGVtcGxhdGVzW3RwbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMudGVtcGxhdGVzW3RwbF0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlc1t0cGxdID0gZG9ULnRlbXBsYXRlKHRoaXMudGVtcGxhdGVzW3RwbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvLyBlbnN1cmUgd2UgaGF2ZSBhIGNvbnRhaW5lciBpZFxuICAgICAgICBpZiAoIXRoaXMuJGVsLmF0dHIoJ2lkJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLmF0dHIoJ2lkJywgJ3FiXycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5OTk5OSkpO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMuZ2VuZXJhdGVkX2lkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXR1cy5pZCA9IHRoaXMuJGVsLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgLy8gSU5JVFxuICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcygncXVlcnktYnVpbGRlcicpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHRoaXMuY2hlY2tGaWx0ZXJzKHRoaXMuZmlsdGVycyk7XG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5jaGVja09wZXJhdG9ycyh0aGlzLm9wZXJhdG9ycyk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmluaXRQbHVnaW5zKCk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckluaXQnKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5ydWxlcykge1xuICAgICAgICAgICAgdGhpcy5zZXRSdWxlcyhvcHRpb25zLnJ1bGVzKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNldHRpbmdzLnJ1bGVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRSb290KHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgY29uZmlndXJhdGlvbiBvZiBlYWNoIGZpbHRlclxuICAgICAqIEB0aHJvd3MgQ29uZmlnRXJyb3JcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmNoZWNrRmlsdGVycyA9IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG4gICAgICAgIHZhciBkZWZpbmVkRmlsdGVycyA9IFtdO1xuXG4gICAgICAgIGlmICghZmlsdGVycyB8fCBmaWx0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdNaXNzaW5nIGZpbHRlcnMgbGlzdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmlsdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChmaWx0ZXIsIGkpIHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyLmlkKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdNaXNzaW5nIGZpbHRlciB7MH0gaWQnLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWZpbmVkRmlsdGVycy5pbmRleE9mKGZpbHRlci5pZCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ0ZpbHRlciBcInswfVwiIGFscmVhZHkgZGVmaW5lZCcsIGZpbHRlci5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZpbmVkRmlsdGVycy5wdXNoKGZpbHRlci5pZCk7XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIudHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIVF1ZXJ5QnVpbGRlci50eXBlc1tmaWx0ZXIudHlwZV0pIHtcbiAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ0ludmFsaWQgdHlwZSBcInswfVwiJywgZmlsdGVyLnR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWZpbHRlci5pbnB1dCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5pbnB1dCA9ICd0ZXh0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmaWx0ZXIuaW5wdXQgIT0gJ2Z1bmN0aW9uJyAmJiBRdWVyeUJ1aWxkZXIuaW5wdXRzLmluZGV4T2YoZmlsdGVyLmlucHV0KSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdDb25maWcnLCAnSW52YWxpZCBpbnB1dCBcInswfVwiJywgZmlsdGVyLmlucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcnMpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIub3BlcmF0b3JzLmZvckVhY2goZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3BlcmF0b3IgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdDb25maWcnLCAnRmlsdGVyIG9wZXJhdG9ycyBtdXN0IGJlIGdsb2JhbCBvcGVyYXRvcnMgdHlwZXMgKHN0cmluZyknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWZpbHRlci5maWVsZCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZCA9IGZpbHRlci5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZmlsdGVyLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmxhYmVsID0gZmlsdGVyLmZpZWxkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWZpbHRlci5vcHRncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5vcHRncm91cCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cy5oYXNfb3B0Z3JvdXAgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVnaXN0ZXIgb3B0Z3JvdXAgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLm9wdGdyb3Vwc1tmaWx0ZXIub3B0Z3JvdXBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub3B0Z3JvdXBzW2ZpbHRlci5vcHRncm91cF0gPSBmaWx0ZXIub3B0Z3JvdXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKGZpbHRlci5pbnB1dCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsdGVyLnZhbHVlcyB8fCBmaWx0ZXIudmFsdWVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdDb25maWcnLCAnTWlzc2luZyBmaWx0ZXIgXCJ7MH1cIiB2YWx1ZXMnLCBmaWx0ZXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5wbGFjZWhvbGRlcl92YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnBsYWNlaG9sZGVyX3ZhbHVlID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5pdGVyYXRlT3B0aW9ucyhmaWx0ZXIudmFsdWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PSBmaWx0ZXIucGxhY2Vob2xkZXJfdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdQbGFjZWhvbGRlciBvZiBmaWx0ZXIgXCJ7MH1cIiBvdmVybGFwcyB3aXRoIG9uZSBvZiBpdHMgdmFsdWVzJywgZmlsdGVyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc29ydF9maWx0ZXJzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Muc29ydF9maWx0ZXJzID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJzLnNvcnQodGhpcy5zZXR0aW5ncy5zb3J0X2ZpbHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZpbHRlcnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi50cmFuc2xhdGVMYWJlbChhLmxhYmVsKS5sb2NhbGVDb21wYXJlKHNlbGYudHJhbnNsYXRlTGFiZWwoYi5sYWJlbCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzLmhhc19vcHRncm91cCkge1xuICAgICAgICAgICAgZmlsdGVycyA9IFV0aWxzLmdyb3VwU29ydChmaWx0ZXJzLCAnb3B0Z3JvdXAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWx0ZXJzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdGhlIGNvbmZpZ3VyYXRpb24gb2YgZWFjaCBvcGVyYXRvclxuICAgICAqIEB0aHJvd3MgQ29uZmlnRXJyb3JcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmNoZWNrT3BlcmF0b3JzID0gZnVuY3Rpb24gKG9wZXJhdG9ycykge1xuICAgICAgICB2YXIgZGVmaW5lZE9wZXJhdG9ycyA9IFtdO1xuXG4gICAgICAgIG9wZXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChvcGVyYXRvciwgaSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcGVyYXRvciA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICghUXVlcnlCdWlsZGVyLk9QRVJBVE9SU1tvcGVyYXRvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdVbmtub3duIG9wZXJhdG9yIFwiezB9XCInLCBvcGVyYXRvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3BlcmF0b3JzW2ldID0gb3BlcmF0b3IgPSAkLmV4dGVuZGV4dCh0cnVlLCAncmVwbGFjZScsIHt9LCBRdWVyeUJ1aWxkZXIuT1BFUkFUT1JTW29wZXJhdG9yXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdG9yLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdNaXNzaW5nIFwidHlwZVwiIGZvciBvcGVyYXRvciB7MH0nLCBpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoUXVlcnlCdWlsZGVyLk9QRVJBVE9SU1tvcGVyYXRvci50eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcnNbaV0gPSBvcGVyYXRvciA9ICQuZXh0ZW5kZXh0KHRydWUsICdyZXBsYWNlJywge30sIFF1ZXJ5QnVpbGRlci5PUEVSQVRPUlNbb3BlcmF0b3IudHlwZV0sIG9wZXJhdG9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3BlcmF0b3IubmJfaW5wdXRzID09PSB1bmRlZmluZWQgfHwgb3BlcmF0b3IuYXBwbHlfdG8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ01pc3NpbmcgXCJuYl9pbnB1dHNcIiBhbmQvb3IgXCJhcHBseV90b1wiIGZvciBvcGVyYXRvciBcInswfVwiJywgb3BlcmF0b3IudHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGVmaW5lZE9wZXJhdG9ycy5pbmRleE9mKG9wZXJhdG9yLnR5cGUpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdPcGVyYXRvciBcInswfVwiIGFscmVhZHkgZGVmaW5lZCcsIG9wZXJhdG9yLnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5lZE9wZXJhdG9ycy5wdXNoKG9wZXJhdG9yLnR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoIW9wZXJhdG9yLm9wdGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgb3BlcmF0b3Iub3B0Z3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMuaGFzX29wZXJhdG9yX29wdGdyb3VwID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIHJlZ2lzdGVyIG9wdGdyb3VwIGlmIG5lZWRlZFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5vcHRncm91cHNbb3BlcmF0b3Iub3B0Z3JvdXBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub3B0Z3JvdXBzW29wZXJhdG9yLm9wdGdyb3VwXSA9IG9wZXJhdG9yLm9wdGdyb3VwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzLmhhc19vcGVyYXRvcl9vcHRncm91cCkge1xuICAgICAgICAgICAgb3BlcmF0b3JzID0gVXRpbHMuZ3JvdXBTb3J0KG9wZXJhdG9ycywgJ29wdGdyb3VwJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3BlcmF0b3JzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYWxsIGV2ZW50cyBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBncm91cCBjb25kaXRpb24gY2hhbmdlXG4gICAgICAgIHRoaXMuJGVsLm9uKCdjaGFuZ2UucXVlcnlCdWlsZGVyJywgU2VsZWN0b3JzLmdyb3VwX2NvbmRpdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGdyb3VwID0gJCh0aGlzKS5jbG9zZXN0KFNlbGVjdG9ycy5ncm91cF9jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIE1vZGVsKCRncm91cCkuY29uZGl0aW9uID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcnVsZSBmaWx0ZXIgY2hhbmdlXG4gICAgICAgIHRoaXMuJGVsLm9uKCdjaGFuZ2UucXVlcnlCdWlsZGVyJywgU2VsZWN0b3JzLnJ1bGVfZmlsdGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHJ1bGUgPSAkKHRoaXMpLmNsb3Nlc3QoU2VsZWN0b3JzLnJ1bGVfY29udGFpbmVyKTtcbiAgICAgICAgICAgIE1vZGVsKCRydWxlKS5maWx0ZXIgPSBzZWxmLmdldEZpbHRlckJ5SWQoJCh0aGlzKS52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJ1bGUgb3BlcmF0b3IgY2hhbmdlXG4gICAgICAgIHRoaXMuJGVsLm9uKCdjaGFuZ2UucXVlcnlCdWlsZGVyJywgU2VsZWN0b3JzLnJ1bGVfb3BlcmF0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkcnVsZSA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMucnVsZV9jb250YWluZXIpO1xuICAgICAgICAgICAgTW9kZWwoJHJ1bGUpLm9wZXJhdG9yID0gc2VsZi5nZXRPcGVyYXRvckJ5VHlwZSgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRkIHJ1bGUgYnV0dG9uXG4gICAgICAgIHRoaXMuJGVsLm9uKCdjbGljay5xdWVyeUJ1aWxkZXInLCBTZWxlY3RvcnMuYWRkX3J1bGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkZ3JvdXAgPSAkKHRoaXMpLmNsb3Nlc3QoU2VsZWN0b3JzLmdyb3VwX2NvbnRhaW5lcik7XG4gICAgICAgICAgICBzZWxmLmFkZFJ1bGUoTW9kZWwoJGdyb3VwKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBydWxlIGJ1dHRvblxuICAgICAgICB0aGlzLiRlbC5vbignY2xpY2sucXVlcnlCdWlsZGVyJywgU2VsZWN0b3JzLmRlbGV0ZV9ydWxlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHJ1bGUgPSAkKHRoaXMpLmNsb3Nlc3QoU2VsZWN0b3JzLnJ1bGVfY29udGFpbmVyKTtcbiAgICAgICAgICAgIHNlbGYuZGVsZXRlUnVsZShNb2RlbCgkcnVsZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbGxvd19ncm91cHMgIT09IDApIHtcbiAgICAgICAgICAgIC8vIGFkZCBncm91cCBidXR0b25cbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdjbGljay5xdWVyeUJ1aWxkZXInLCBTZWxlY3RvcnMuYWRkX2dyb3VwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRncm91cCA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMuZ3JvdXBfY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZEdyb3VwKE1vZGVsKCRncm91cCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGRlbGV0ZSBncm91cCBidXR0b25cbiAgICAgICAgICAgIHRoaXMuJGVsLm9uKCdjbGljay5xdWVyeUJ1aWxkZXInLCBTZWxlY3RvcnMuZGVsZXRlX2dyb3VwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRncm91cCA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMuZ3JvdXBfY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRlbGV0ZUdyb3VwKE1vZGVsKCRncm91cCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb2RlbCBldmVudHNcbiAgICAgICAgdGhpcy5tb2RlbC5vbih7XG4gICAgICAgICAgICAnZHJvcCc6IGZ1bmN0aW9uIChlLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS4kZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZyZXNoR3JvdXBzQ29uZGl0aW9ucygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdhZGQnOiBmdW5jdGlvbiAoZSwgbm9kZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS4kZWwucHJlcGVuZFRvKG5vZGUucGFyZW50LiRlbC5maW5kKCc+JyArIFNlbGVjdG9ycy5ydWxlc19saXN0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLiRlbC5pbnNlcnRBZnRlcihub2RlLnBhcmVudC5ydWxlc1tpbmRleCAtIDFdLiRlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYucmVmcmVzaEdyb3Vwc0NvbmRpdGlvbnMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnbW92ZSc6IGZ1bmN0aW9uIChlLCBub2RlLCBncm91cCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBub2RlLiRlbC5kZXRhY2goKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLiRlbC5wcmVwZW5kVG8oZ3JvdXAuJGVsLmZpbmQoJz4nICsgU2VsZWN0b3JzLnJ1bGVzX2xpc3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuJGVsLmluc2VydEFmdGVyKGdyb3VwLnJ1bGVzW2luZGV4IC0gMV0uJGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZyZXNoR3JvdXBzQ29uZGl0aW9ucygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICd1cGRhdGUnOiBmdW5jdGlvbiAoZSwgbm9kZSwgZmllbGQsIHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgUnVsZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwbGF5RXJyb3Iobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZsYWdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGx5UnVsZUZsYWdzKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUnVsZUZpbHRlcihub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3BlcmF0b3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUnVsZU9wZXJhdG9yKG5vZGUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUnVsZVZhbHVlKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwbGF5RXJyb3Iobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZsYWdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFwcGx5R3JvdXBGbGFncyhub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29uZGl0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUdyb3VwQ29uZGl0aW9uKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSByb290IGdyb3VwXG4gICAgICogQHBhcmFtIGFkZFJ1bGUge2Jvb2wsb3B0aW9uYWx9IGFkZCBhIGRlZmF1bHQgZW1wdHkgcnVsZVxuICAgICAqIEBwYXJhbSBkYXRhIHttaXhlZCxvcHRpb25hbH0gZ3JvdXAgY3VzdG9tIGRhdGFcbiAgICAgKiBAcGFyYW0gZmxhZ3Mge29iamVjdCxvcHRpb25hbH0gZmxhZ3MgdG8gYXBwbHkgdG8gdGhlIGdyb3VwXG4gICAgICogQHJldHVybiBncm91cCB7Um9vdH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnNldFJvb3QgPSBmdW5jdGlvbiAoYWRkUnVsZSwgZGF0YSwgZmxhZ3MpIHtcbiAgICAgICAgYWRkUnVsZSA9IChhZGRSdWxlID09PSB1bmRlZmluZWQgfHwgYWRkUnVsZSA9PT0gdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGdyb3VwX2lkID0gdGhpcy5uZXh0R3JvdXBJZCgpO1xuICAgICAgICB2YXIgJGdyb3VwID0gJCh0aGlzLmdldEdyb3VwVGVtcGxhdGUoZ3JvdXBfaWQsIDEpKTtcblxuICAgICAgICB0aGlzLiRlbC5hcHBlbmQoJGdyb3VwKTtcbiAgICAgICAgdGhpcy5tb2RlbC5yb290ID0gbmV3IEdyb3VwKG51bGwsICRncm91cCk7XG4gICAgICAgIHRoaXMubW9kZWwucm9vdC5tb2RlbCA9IHRoaXMubW9kZWw7XG5cbiAgICAgICAgdGhpcy5tb2RlbC5yb290LmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLm1vZGVsLnJvb3QuZmxhZ3MgPSAkLmV4dGVuZCh7fSwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X2dyb3VwX2ZsYWdzLCBmbGFncyk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckFkZEdyb3VwJywgdGhpcy5tb2RlbC5yb290KTtcblxuICAgICAgICB0aGlzLm1vZGVsLnJvb3QuY29uZGl0aW9uID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0X2NvbmRpdGlvbjtcblxuICAgICAgICBpZiAoYWRkUnVsZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRSdWxlKHRoaXMubW9kZWwucm9vdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5yb290O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBuZXcgZ3JvdXBcbiAgICAgKiBAcGFyYW0gcGFyZW50IHtHcm91cH1cbiAgICAgKiBAcGFyYW0gYWRkUnVsZSB7Ym9vbCxvcHRpb25hbH0gYWRkIGEgZGVmYXVsdCBlbXB0eSBydWxlXG4gICAgICogQHBhcmFtIGRhdGEge21peGVkLG9wdGlvbmFsfSBncm91cCBjdXN0b20gZGF0YVxuICAgICAqIEBwYXJhbSBmbGFncyB7b2JqZWN0LG9wdGlvbmFsfSBmbGFncyB0byBhcHBseSB0byB0aGUgZ3JvdXBcbiAgICAgKiBAcmV0dXJuIGdyb3VwIHtHcm91cH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmFkZEdyb3VwID0gZnVuY3Rpb24gKHBhcmVudCwgYWRkUnVsZSwgZGF0YSwgZmxhZ3MpIHtcbiAgICAgICAgYWRkUnVsZSA9IChhZGRSdWxlID09PSB1bmRlZmluZWQgfHwgYWRkUnVsZSA9PT0gdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGxldmVsID0gcGFyZW50LmxldmVsICsgMTtcblxuICAgICAgICB2YXIgZSA9IHRoaXMudHJpZ2dlcignYmVmb3JlQWRkR3JvdXAnLCBwYXJlbnQsIGFkZFJ1bGUsIGxldmVsKTtcbiAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdyb3VwX2lkID0gdGhpcy5uZXh0R3JvdXBJZCgpO1xuICAgICAgICB2YXIgJGdyb3VwID0gJCh0aGlzLmdldEdyb3VwVGVtcGxhdGUoZ3JvdXBfaWQsIGxldmVsKSk7XG4gICAgICAgIHZhciBtb2RlbCA9IHBhcmVudC5hZGRHcm91cCgkZ3JvdXApO1xuXG4gICAgICAgIG1vZGVsLmRhdGEgPSBkYXRhO1xuICAgICAgICBtb2RlbC5mbGFncyA9ICQuZXh0ZW5kKHt9LCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfZ3JvdXBfZmxhZ3MsIGZsYWdzKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQWRkR3JvdXAnLCBtb2RlbCk7XG5cbiAgICAgICAgbW9kZWwuY29uZGl0aW9uID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0X2NvbmRpdGlvbjtcblxuICAgICAgICBpZiAoYWRkUnVsZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRSdWxlKG1vZGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gZGVsZXRlIGEgZ3JvdXAuIFRoZSBncm91cCBpcyBub3QgZGVsZXRlZCBpZiBhdCBsZWFzdCBvbmUgcnVsZSBpcyBub19kZWxldGUuXG4gICAgICogQHBhcmFtIGdyb3VwIHtHcm91cH1cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBncm91cCBoYXMgYmVlbiBkZWxldGVkXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5kZWxldGVHcm91cCA9IGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICBpZiAoZ3JvdXAuaXNSb290KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlID0gdGhpcy50cmlnZ2VyKCdiZWZvcmVEZWxldGVHcm91cCcsIGdyb3VwKTtcbiAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZWwgPSB0cnVlO1xuXG4gICAgICAgIGdyb3VwLmVhY2goJ3JldmVyc2UnLCBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgZGVsICY9IHRoaXMuZGVsZXRlUnVsZShydWxlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICBkZWwgJj0gdGhpcy5kZWxldGVHcm91cChncm91cCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGlmIChkZWwpIHtcbiAgICAgICAgICAgIGdyb3VwLmRyb3AoKTtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJEZWxldGVHcm91cCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgY29uZGl0aW9uIG9mIGEgZ3JvdXBcbiAgICAgKiBAcGFyYW0gZ3JvdXAge0dyb3VwfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUudXBkYXRlR3JvdXBDb25kaXRpb24gPSBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgZ3JvdXAuJGVsLmZpbmQoJz4nICsgU2VsZWN0b3JzLmdyb3VwX2NvbmRpdGlvbikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJHRoaXMucHJvcCgnY2hlY2tlZCcsICR0aGlzLnZhbCgpID09PSBncm91cC5jb25kaXRpb24pO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScsICR0aGlzLnZhbCgpID09PSBncm91cC5jb25kaXRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlR3JvdXBDb25kaXRpb24nLCBncm91cCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB2aXNpYmlsaXR5IG9mIGNvbmRpdGlvbnMgYmFzZWQgb24gbnVtYmVyIG9mIHJ1bGVzIGluc2lkZSBlYWNoIGdyb3VwXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5yZWZyZXNoR3JvdXBzQ29uZGl0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKGZ1bmN0aW9uIHdhbGsoZ3JvdXApIHtcbiAgICAgICAgICAgIGlmICghZ3JvdXAuZmxhZ3MgfHwgKGdyb3VwLmZsYWdzICYmICFncm91cC5mbGFncy5jb25kaXRpb25fcmVhZG9ubHkpKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuJGVsLmZpbmQoJz4nICsgU2VsZWN0b3JzLmdyb3VwX2NvbmRpdGlvbikucHJvcCgnZGlzYWJsZWQnLCBncm91cC5ydWxlcy5sZW5ndGggPD0gMSlcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIGdyb3VwLnJ1bGVzLmxlbmd0aCA8PSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JvdXAuZWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgd2Fsayhncm91cCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSh0aGlzLm1vZGVsLnJvb3QpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgbmV3IHJ1bGVcbiAgICAgKiBAcGFyYW0gcGFyZW50IHtHcm91cH1cbiAgICAgKiBAcGFyYW0gZGF0YSB7bWl4ZWQsb3B0aW9uYWx9IHJ1bGUgY3VzdG9tIGRhdGFcbiAgICAgKiBAcGFyYW0gZmxhZ3Mge29iamVjdCxvcHRpb25hbH0gZmxhZ3MgdG8gYXBwbHkgdG8gdGhlIHJ1bGVcbiAgICAgKiBAcmV0dXJuIHJ1bGUge1J1bGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKHBhcmVudCwgZGF0YSwgZmxhZ3MpIHtcbiAgICAgICAgdmFyIGUgPSB0aGlzLnRyaWdnZXIoJ2JlZm9yZUFkZFJ1bGUnLCBwYXJlbnQpO1xuICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcnVsZV9pZCA9IHRoaXMubmV4dFJ1bGVJZCgpO1xuICAgICAgICB2YXIgJHJ1bGUgPSAkKHRoaXMuZ2V0UnVsZVRlbXBsYXRlKHJ1bGVfaWQpKTtcbiAgICAgICAgdmFyIG1vZGVsID0gcGFyZW50LmFkZFJ1bGUoJHJ1bGUpO1xuXG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1vZGVsLmRhdGEgPSBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kZWwuZmxhZ3MgPSAkLmV4dGVuZCh7fSwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3J1bGVfZmxhZ3MsIGZsYWdzKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQWRkUnVsZScsIG1vZGVsKTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVJ1bGVGaWx0ZXJzKG1vZGVsKTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWZhdWx0X2ZpbHRlciB8fCAhdGhpcy5zZXR0aW5ncy5kaXNwbGF5X2VtcHR5X2ZpbHRlcikge1xuICAgICAgICAgICAgbW9kZWwuZmlsdGVyID0gdGhpcy5nZXRGaWx0ZXJCeUlkKHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9maWx0ZXIgfHwgdGhpcy5maWx0ZXJzWzBdLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgcnVsZS5cbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBydWxlIGhhcyBiZWVuIGRlbGV0ZWRcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmRlbGV0ZVJ1bGUgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICBpZiAocnVsZS5mbGFncy5ub19kZWxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlID0gdGhpcy50cmlnZ2VyKCdiZWZvcmVEZWxldGVSdWxlJywgcnVsZSk7XG4gICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBydWxlLmRyb3AoKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyRGVsZXRlUnVsZScpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGZpbHRlcnMgPHNlbGVjdD4gZm9yIGEgcnVsZVxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuY3JlYXRlUnVsZUZpbHRlcnMgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgZmlsdGVycyA9IHRoaXMuY2hhbmdlKCdnZXRSdWxlRmlsdGVycycsIHRoaXMuZmlsdGVycywgcnVsZSk7XG4gICAgICAgIHZhciAkZmlsdGVyU2VsZWN0ID0gJCh0aGlzLmdldFJ1bGVGaWx0ZXJTZWxlY3QocnVsZSwgZmlsdGVycykpO1xuXG4gICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLmZpbHRlcl9jb250YWluZXIpLmh0bWwoJGZpbHRlclNlbGVjdCk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckNyZWF0ZVJ1bGVGaWx0ZXJzJywgcnVsZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgb3BlcmF0b3JzIDxzZWxlY3Q+IGZvciBhIHJ1bGUgYW5kIGluaXQgdGhlIHJ1bGUgb3BlcmF0b3JcbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVJ1bGVPcGVyYXRvcnMgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgJG9wZXJhdG9yQ29udGFpbmVyID0gcnVsZS4kZWwuZmluZChTZWxlY3RvcnMub3BlcmF0b3JfY29udGFpbmVyKS5lbXB0eSgpO1xuXG4gICAgICAgIGlmICghcnVsZS5maWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcGVyYXRvcnMgPSB0aGlzLmdldE9wZXJhdG9ycyhydWxlLmZpbHRlcik7XG4gICAgICAgIHZhciAkb3BlcmF0b3JTZWxlY3QgPSAkKHRoaXMuZ2V0UnVsZU9wZXJhdG9yU2VsZWN0KHJ1bGUsIG9wZXJhdG9ycykpO1xuXG4gICAgICAgICRvcGVyYXRvckNvbnRhaW5lci5odG1sKCRvcGVyYXRvclNlbGVjdCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBvcGVyYXRvciB3aXRob3V0IHRyaWdnZXJpbmcgdXBkYXRlIGV2ZW50XG4gICAgICAgIHJ1bGUuX18ub3BlcmF0b3IgPSBvcGVyYXRvcnNbMF07XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckNyZWF0ZVJ1bGVPcGVyYXRvcnMnLCBydWxlLCBvcGVyYXRvcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIG1haW4gaW5wdXQgZm9yIGEgcnVsZVxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuY3JlYXRlUnVsZUlucHV0ID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgdmFyICR2YWx1ZUNvbnRhaW5lciA9IHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnZhbHVlX2NvbnRhaW5lcikuZW1wdHkoKTtcblxuICAgICAgICBydWxlLl9fLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICghcnVsZS5maWx0ZXIgfHwgIXJ1bGUub3BlcmF0b3IgfHwgcnVsZS5vcGVyYXRvci5uYl9pbnB1dHMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyICRpbnB1dHMgPSAkKCk7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBydWxlLmZpbHRlcjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGUub3BlcmF0b3IubmJfaW5wdXRzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciAkcnVsZUlucHV0ID0gJCh0aGlzLmdldFJ1bGVJbnB1dChydWxlLCBpKSk7XG4gICAgICAgICAgICBpZiAoaSA+IDApICR2YWx1ZUNvbnRhaW5lci5hcHBlbmQodGhpcy5zZXR0aW5ncy5pbnB1dHNfc2VwYXJhdG9yKTtcbiAgICAgICAgICAgICR2YWx1ZUNvbnRhaW5lci5hcHBlbmQoJHJ1bGVJbnB1dCk7XG4gICAgICAgICAgICAkaW5wdXRzID0gJGlucHV0cy5hZGQoJHJ1bGVJbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAkdmFsdWVDb250YWluZXIuc2hvdygpO1xuXG4gICAgICAgICRpbnB1dHMub24oJ2NoYW5nZSAnICsgKGZpbHRlci5pbnB1dF9ldmVudCB8fCAnJyksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzLnVwZGF0aW5nX3ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJ1bGUudmFsdWUgPSBzZWxmLmdldFJ1bGVWYWx1ZShydWxlKTtcbiAgICAgICAgICAgIHNlbGYuc3RhdHVzLnVwZGF0aW5nX3ZhbHVlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaWx0ZXIucGx1Z2luKSB7XG4gICAgICAgICAgICAkaW5wdXRzW2ZpbHRlci5wbHVnaW5dKGZpbHRlci5wbHVnaW5fY29uZmlnIHx8IHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJDcmVhdGVSdWxlSW5wdXQnLCBydWxlKTtcblxuICAgICAgICBpZiAoZmlsdGVyLmRlZmF1bHRfdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcnVsZS52YWx1ZSA9IGZpbHRlci5kZWZhdWx0X3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMudXBkYXRpbmdfdmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgcnVsZS52YWx1ZSA9IHNlbGYuZ2V0UnVsZVZhbHVlKHJ1bGUpO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMudXBkYXRpbmdfdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFjdGlvbiB3aGVuIHJ1bGUncyBmaWx0ZXIgaXMgY2hhbmdlZFxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUudXBkYXRlUnVsZUZpbHRlciA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUnVsZU9wZXJhdG9ycyhydWxlKTtcbiAgICAgICAgdGhpcy5jcmVhdGVSdWxlSW5wdXQocnVsZSk7XG5cbiAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9maWx0ZXIpLnZhbChydWxlLmZpbHRlciA/IHJ1bGUuZmlsdGVyLmlkIDogJy0xJyk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZVJ1bGVGaWx0ZXInLCBydWxlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG1haW4gPGlucHV0PiB2aXNpYmlsaXR5IHdoZW4gcnVsZSBvcGVyYXRvciBjaGFuZ2VzXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICogQHBhcmFtIHByZXZpb3VzT3BlcmF0b3Ige29iamVjdH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnVwZGF0ZVJ1bGVPcGVyYXRvciA9IGZ1bmN0aW9uIChydWxlLCBwcmV2aW91c09wZXJhdG9yKSB7XG4gICAgICAgIHZhciAkdmFsdWVDb250YWluZXIgPSBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy52YWx1ZV9jb250YWluZXIpO1xuXG4gICAgICAgIGlmICghcnVsZS5vcGVyYXRvciB8fCBydWxlLm9wZXJhdG9yLm5iX2lucHV0cyA9PT0gMCkge1xuICAgICAgICAgICAgJHZhbHVlQ29udGFpbmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgcnVsZS5fXy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICR2YWx1ZUNvbnRhaW5lci5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmICgkdmFsdWVDb250YWluZXIuaXMoJzplbXB0eScpIHx8IHJ1bGUub3BlcmF0b3IubmJfaW5wdXRzICE9PSBwcmV2aW91c09wZXJhdG9yLm5iX2lucHV0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUnVsZUlucHV0KHJ1bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJ1bGUub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfb3BlcmF0b3IpLnZhbChydWxlLm9wZXJhdG9yLnR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZVJ1bGVPcGVyYXRvcicsIHJ1bGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFjdGlvbiB3aGVuIHJ1bGUncyB2YWx1ZSBpcyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS51cGRhdGVSdWxlVmFsdWUgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdHVzLnVwZGF0aW5nX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJ1bGVWYWx1ZShydWxlLCBydWxlLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJVcGRhdGVSdWxlVmFsdWUnLCBydWxlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHJ1bGVzIHByb3BlcnRpZXMgZGVwZW5kaW5nIG9uIGZsYWdzLlxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuYXBwbHlSdWxlRmxhZ3MgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgZmxhZ3MgPSBydWxlLmZsYWdzO1xuXG4gICAgICAgIGlmIChmbGFncy5maWx0ZXJfcmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfZmlsdGVyKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmbGFncy5vcGVyYXRvcl9yZWFkb25seSkge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9vcGVyYXRvcikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhZ3MudmFsdWVfcmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfdmFsdWUpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZsYWdzLm5vX2RlbGV0ZSkge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMuZGVsZXRlX3J1bGUpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckFwcGx5UnVsZUZsYWdzJywgcnVsZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoYW5nZSBncm91cCBwcm9wZXJ0aWVzIGRlcGVuZGluZyBvbiBmbGFncy5cbiAgICAgKiBAcGFyYW0gZ3JvdXAge0dyb3VwfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuYXBwbHlHcm91cEZsYWdzID0gZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgIHZhciBmbGFncyA9IGdyb3VwLmZsYWdzO1xuXG4gICAgICAgIGlmIChmbGFncy5jb25kaXRpb25fcmVhZG9ubHkpIHtcbiAgICAgICAgICAgIGdyb3VwLiRlbC5maW5kKCc+JyArIFNlbGVjdG9ycy5ncm91cF9jb25kaXRpb24pLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAucGFyZW50KCkuYWRkQ2xhc3MoJ3JlYWRvbmx5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZsYWdzLm5vX2RlbGV0ZSkge1xuICAgICAgICAgICAgZ3JvdXAuJGVsLmZpbmQoU2VsZWN0b3JzLmRlbGV0ZV9ncm91cCkucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQXBwbHlHcm91cEZsYWdzJywgZ3JvdXApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgZXJyb3JzIG1hcmtlcnNcbiAgICAgKiBAcGFyYW0gbm9kZSB7Tm9kZSxvcHRpb25hbH0gZGVmYXVsdCBpcyByb290IEdyb3VwXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5jbGVhckVycm9ycyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIG5vZGUgPSBub2RlIHx8IHRoaXMubW9kZWwucm9vdDtcblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuZXJyb3IgPSBudWxsO1xuXG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXApIHtcbiAgICAgICAgICAgIG5vZGUuZWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgIHJ1bGUuZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckVycm9ycyhncm91cCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQvUmVtb3ZlIGNsYXNzIC5oYXMtZXJyb3IgYW5kIHVwZGF0ZSBlcnJvciB0aXRsZVxuICAgICAqIEBwYXJhbSBub2RlIHtOb2RlfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZGlzcGxheUVycm9yID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGlzcGxheV9lcnJvcnMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbm9kZS4kZWwucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlIHRoZSB0ZXh0IHdpdGhvdXQgbW9kaWZ5aW5nIGV2ZW50IGFycmF5XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gJC5leHRlbmQoW10sIG5vZGUuZXJyb3IsIFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYW5nLmVycm9yc1tub2RlLmVycm9yWzBdXSB8fCBub2RlLmVycm9yWzBdXG4gICAgICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgICAgICBub2RlLiRlbC5hZGRDbGFzcygnaGFzLWVycm9yJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoU2VsZWN0b3JzLmVycm9yX2NvbnRhaW5lcikuZXEoMClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RpdGxlJywgVXRpbHMuZm10LmFwcGx5KG51bGwsIGVycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBhIHZhbGlkYXRpb24gZXJyb3IgZXZlbnRcbiAgICAgKiBAcGFyYW0gbm9kZSB7Tm9kZX1cbiAgICAgKiBAcGFyYW0gZXJyb3Ige2FycmF5fVxuICAgICAqIEBwYXJhbSB2YWx1ZSB7bWl4ZWR9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS50cmlnZ2VyVmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24gKG5vZGUsIGVycm9yLCB2YWx1ZSkge1xuICAgICAgICBpZiAoISQuaXNBcnJheShlcnJvcikpIHtcbiAgICAgICAgICAgIGVycm9yID0gW2Vycm9yXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlID0gdGhpcy50cmlnZ2VyKCd2YWxpZGF0aW9uRXJyb3InLCBub2RlLCBlcnJvciwgdmFsdWUpO1xuICAgICAgICBpZiAoIWUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIG5vZGUuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgdGhlIHBsdWdpblxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdiZWZvcmVEZXN0cm95Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzLmdlbmVyYXRlZF9pZCkge1xuICAgICAgICAgICAgdGhpcy4kZWwucmVtb3ZlQXR0cignaWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy4kZWxcbiAgICAgICAgICAgIC5vZmYoJy5xdWVyeUJ1aWxkZXInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdxdWVyeS1idWlsZGVyJylcbiAgICAgICAgICAgIC5yZW1vdmVEYXRhKCdxdWVyeUJ1aWxkZXInKTtcblxuICAgICAgICBkZWxldGUgdGhpcy4kZWxbMF0ucXVlcnlCdWlsZGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgcGx1Z2luXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMuZ3JvdXBfaWQgPSAxO1xuICAgICAgICB0aGlzLnN0YXR1cy5ydWxlX2lkID0gMDtcblxuICAgICAgICB0aGlzLm1vZGVsLnJvb3QuZW1wdHkoKTtcblxuICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5tb2RlbC5yb290KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyUmVzZXQnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIHBsdWdpblxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzLmdyb3VwX2lkID0gMDtcbiAgICAgICAgdGhpcy5zdGF0dXMucnVsZV9pZCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwucm9vdCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5yb290LmRyb3AoKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwucm9vdCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQ2xlYXInKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTW9kaWZ5IHRoZSBidWlsZGVyIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBPbmx5IG9wdGlvbnMgZGVmaW5lZCBpbiBRdWVyeUJ1aWxkZXIubW9kaWZpYWJsZV9vcHRpb25zIGFyZSBtb2RpZmlhYmxlXG4gICAgICogQHBhcmFtIHtvYmplY3R9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gdXNlIGpRdWVyeSB1dGlscyB0byBmaWx0ZXIgb3B0aW9ucyBrZXlzXG4gICAgICAgICQubWFrZUFycmF5KCQoT2JqZWN0LmtleXMob3B0aW9ucykpLmZpbHRlcihRdWVyeUJ1aWxkZXIubW9kaWZpYWJsZV9vcHRpb25zKSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChvcHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzW29wdF0gPSBvcHRpb25zW29wdF07XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBtb2RlbCBhc3NvY2lhdGVkIHRvIGEgRE9NIG9iamVjdCwgb3Igcm9vdCBtb2RlbFxuICAgICAqIEBwYXJhbSB7alF1ZXJ5LG9wdGlvbmFsfVxuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRNb2RlbCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuICF0YXJnZXQgPyB0aGlzLm1vZGVsLnJvb3QgOiBNb2RlbCh0YXJnZXQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSB0aGUgd2hvbGUgYnVpbGRlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jbGVhckVycm9ycygpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgdmFsaWQgPSAoZnVuY3Rpb24gcGFyc2UoZ3JvdXApIHtcbiAgICAgICAgICAgIHZhciBkb25lID0gMDtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSAwO1xuXG4gICAgICAgICAgICBncm91cC5lYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFydWxlLmZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJWYWxpZGF0aW9uRXJyb3IocnVsZSwgJ25vX2ZpbHRlcicsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChydWxlLm9wZXJhdG9yLm5iX2lucHV0cyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWQgPSBzZWxmLnZhbGlkYXRlVmFsdWUocnVsZSwgcnVsZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJWYWxpZGF0aW9uRXJyb3IocnVsZSwgdmFsaWQsIHJ1bGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb25lKys7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZShncm91cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChlcnJvcnMgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9uZSA9PT0gMCAmJiAoIXNlbGYuc2V0dGluZ3MuYWxsb3dfZW1wdHkgfHwgIWdyb3VwLmlzUm9vdCgpKSkge1xuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlclZhbGlkYXRpb25FcnJvcihncm91cCwgJ2VtcHR5X2dyb3VwJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9KHRoaXMubW9kZWwucm9vdCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgndmFsaWRhdGUnLCB2YWxpZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBvYmplY3QgcmVwcmVzZW50aW5nIGN1cnJlbnQgcnVsZXNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqICAgICAgLSBnZXRfZmxhZ3M6IGZhbHNlW2RlZmF1bHRdIHwgdHJ1ZShvbmx5IGNoYW5nZXMgZnJvbSBkZWZhdWx0IGZsYWdzKSB8ICdhbGwnXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0UnVsZXMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgZ2V0X2ZsYWdzOiBmYWxzZVxuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBvdXQgPSAoZnVuY3Rpb24gcGFyc2UoZ3JvdXApIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogZ3JvdXAuY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGdyb3VwLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEgPSAkLmV4dGVuZGV4dCh0cnVlLCAncmVwbGFjZScsIHt9LCBncm91cC5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZ2V0X2ZsYWdzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsYWdzID0gc2VsZi5nZXRHcm91cEZsYWdzKGdyb3VwLmZsYWdzLCBvcHRpb25zLmdldF9mbGFncyA9PT0gJ2FsbCcpO1xuICAgICAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGZsYWdzKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmZsYWdzID0gZmxhZ3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBncm91cC5lYWNoKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLm9wZXJhdG9yLm5iX2lucHV0cyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG1vZGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBydWxlID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogbW9kZWwuZmlsdGVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogbW9kZWwuZmlsdGVyLmZpZWxkLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBtb2RlbC5maWx0ZXIudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IG1vZGVsLmZpbHRlci5pbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3I6IG1vZGVsLm9wZXJhdG9yLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuZmlsdGVyLmRhdGEgfHwgbW9kZWwuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBydWxlLmRhdGEgPSAkLmV4dGVuZGV4dCh0cnVlLCAncmVwbGFjZScsIHt9LCBtb2RlbC5maWx0ZXIuZGF0YSwgbW9kZWwuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZ2V0X2ZsYWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbGFncyA9IHNlbGYuZ2V0UnVsZUZsYWdzKG1vZGVsLmZsYWdzLCBvcHRpb25zLmdldF9mbGFncyA9PT0gJ2FsbCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChmbGFncykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuZmxhZ3MgPSBmbGFncztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGEucnVsZXMucHVzaChydWxlKTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5ydWxlcy5wdXNoKHBhcnNlKG1vZGVsKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgfSh0aGlzLm1vZGVsLnJvb3QpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ2dldFJ1bGVzJywgb3V0KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0IHJ1bGVzIGZyb20gb2JqZWN0XG4gICAgICogQHRocm93cyBSdWxlc0Vycm9yLCBVbmRlZmluZWRDb25kaXRpb25FcnJvclxuICAgICAqIEBwYXJhbSBkYXRhIHtvYmplY3R9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5zZXRSdWxlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICgkLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiB0aGlzLnNldHRpbmdzLmRlZmF1bHRfY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBkYXRhXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRhIHx8ICFkYXRhLnJ1bGVzIHx8IChkYXRhLnJ1bGVzLmxlbmd0aCA9PT0gMCAmJiAhdGhpcy5zZXR0aW5ncy5hbGxvd19lbXB0eSkpIHtcbiAgICAgICAgICAgIFV0aWxzLmVycm9yKCdSdWxlc1BhcnNlJywgJ0luY29ycmVjdCBkYXRhIG9iamVjdCBwYXNzZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zZXRSb290KGZhbHNlLCBkYXRhLmRhdGEsIHRoaXMucGFyc2VHcm91cEZsYWdzKGRhdGEpKTtcblxuICAgICAgICBkYXRhID0gdGhpcy5jaGFuZ2UoJ3NldFJ1bGVzJywgZGF0YSk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIChmdW5jdGlvbiBhZGQoZGF0YSwgZ3JvdXApIHtcbiAgICAgICAgICAgIGlmIChncm91cCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNvbmRpdGlvbiA9IHNlbGYuc2V0dGluZ3MuZGVmYXVsdF9jb25kaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzZWxmLnNldHRpbmdzLmNvbmRpdGlvbnMuaW5kZXhPZihkYXRhLmNvbmRpdGlvbikgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignVW5kZWZpbmVkQ29uZGl0aW9uJywgJ0ludmFsaWQgY29uZGl0aW9uIFwiezB9XCInLCBkYXRhLmNvbmRpdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyb3VwLmNvbmRpdGlvbiA9IGRhdGEuY29uZGl0aW9uO1xuXG4gICAgICAgICAgICBkYXRhLnJ1bGVzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWw7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucnVsZXMgJiYgaXRlbS5ydWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLmFsbG93X2dyb3VwcyAhPT0gLTEgJiYgc2VsZi5zZXR0aW5ncy5hbGxvd19ncm91cHMgPCBncm91cC5sZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1J1bGVzUGFyc2UnLCAnTm8gbW9yZSB0aGFuIHswfSBncm91cHMgYXJlIGFsbG93ZWQnLCBzZWxmLnNldHRpbmdzLmFsbG93X2dyb3Vwcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IHNlbGYuYWRkR3JvdXAoZ3JvdXAsIGZhbHNlLCBpdGVtLmRhdGEsIHNlbGYucGFyc2VHcm91cEZsYWdzKGl0ZW0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkKGl0ZW0sIG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1J1bGVzUGFyc2UnLCAnTWlzc2luZyBydWxlIGZpZWxkIGlkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ub3BlcmF0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vcGVyYXRvciA9ICdlcXVhbCc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IHNlbGYuYWRkUnVsZShncm91cCwgaXRlbS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5maWx0ZXIgPSBzZWxmLmdldEZpbHRlckJ5SWQoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm9wZXJhdG9yID0gc2VsZi5nZXRPcGVyYXRvckJ5VHlwZShpdGVtLm9wZXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmxhZ3MgPSBzZWxmLnBhcnNlUnVsZUZsYWdzKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5vcGVyYXRvci5uYl9pbnB1dHMgIT09IDAgJiYgaXRlbS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC52YWx1ZSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KGRhdGEsIHRoaXMubW9kZWwucm9vdCkpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgdmFsdWUgaXMgY29ycmVjdCBmb3IgYSBmaWx0ZXJcbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ3xzdHJpbmdbXXx1bmRlZmluZWR9XG4gICAgICogQHJldHVybiB7YXJyYXl8dHJ1ZX1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnZhbGlkYXRlVmFsdWUgPSBmdW5jdGlvbiAocnVsZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRpb24gPSBydWxlLmZpbHRlci52YWxpZGF0aW9uIHx8IHt9O1xuICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICBpZiAodmFsaWRhdGlvbi5jYWxsYmFjaykge1xuICAgICAgICAgICAgcmVzdWx0ID0gdmFsaWRhdGlvbi5jYWxsYmFjay5jYWxsKHRoaXMsIHZhbHVlLCBydWxlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMudmFsaWRhdGVWYWx1ZUludGVybmFsKHJ1bGUsIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgndmFsaWRhdGVWYWx1ZScsIHJlc3VsdCwgdmFsdWUsIHJ1bGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHZhbGlkYXRpb24gZnVuY3Rpb25cbiAgICAgKiBAdGhyb3dzIENvbmZpZ0Vycm9yXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd8c3RyaW5nW118dW5kZWZpbmVkfVxuICAgICAqIEByZXR1cm4ge2FycmF5fHRydWV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS52YWxpZGF0ZVZhbHVlSW50ZXJuYWwgPSBmdW5jdGlvbiAocnVsZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHJ1bGUuZmlsdGVyO1xuICAgICAgICB2YXIgb3BlcmF0b3IgPSBydWxlLm9wZXJhdG9yO1xuICAgICAgICB2YXIgdmFsaWRhdGlvbiA9IGZpbHRlci52YWxpZGF0aW9uIHx8IHt9O1xuICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIHRtcDtcblxuICAgICAgICBpZiAocnVsZS5vcGVyYXRvci5uYl9pbnB1dHMgPT09IDEpIHtcbiAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wZXJhdG9yLm5iX2lucHV0czsgaSsrKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGZpbHRlci5pbnB1dCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsncmFkaW9fZW1wdHknXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0gPT09IHVuZGVmaW5lZCB8fCB2YWx1ZVtpXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnY2hlY2tib3hfZW1wdHknXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFvcGVyYXRvci5tdWx0aXBsZSAmJiB2YWx1ZVtpXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ29wZXJhdG9yX25vdF9tdWx0aXBsZScsIG9wZXJhdG9yLnR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0gPT09IHVuZGVmaW5lZCB8fCB2YWx1ZVtpXS5sZW5ndGggPT09IDAgfHwgKGZpbHRlci5wbGFjZWhvbGRlciAmJiB2YWx1ZVtpXSA9PSBmaWx0ZXIucGxhY2Vob2xkZXJfdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydzZWxlY3RfZW1wdHknXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFvcGVyYXRvci5tdWx0aXBsZSAmJiB2YWx1ZVtpXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydvcGVyYXRvcl9ub3RfbXVsdGlwbGUnLCBvcGVyYXRvci50eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXSA9PT0gdW5kZWZpbmVkIHx8IChmaWx0ZXIucGxhY2Vob2xkZXIgJiYgdmFsdWVbaV0gPT0gZmlsdGVyLnBsYWNlaG9sZGVyX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnc2VsZWN0X2VtcHR5J107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFF1ZXJ5QnVpbGRlci50eXBlc1tmaWx0ZXIudHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlW2ldID09PSB1bmRlZmluZWQgfHwgdmFsdWVbaV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnc3RyaW5nX2VtcHR5J107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5taW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0ubGVuZ3RoIDwgcGFyc2VJbnQodmFsaWRhdGlvbi5taW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ3N0cmluZ19leGNlZWRfbWluX2xlbmd0aCcsIHZhbGlkYXRpb24ubWluXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXS5sZW5ndGggPiBwYXJzZUludCh2YWxpZGF0aW9uLm1heCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnc3RyaW5nX2V4Y2VlZF9tYXhfbGVuZ3RoJywgdmFsaWRhdGlvbi5tYXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24uZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdGlvbi5mb3JtYXQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uZm9ybWF0ID0gbmV3IFJlZ0V4cCh2YWxpZGF0aW9uLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0aW9uLmZvcm1hdC50ZXN0KHZhbHVlW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydzdHJpbmdfaW52YWxpZF9mb3JtYXQnLCB2YWxpZGF0aW9uLmZvcm1hdF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0gPT09IHVuZGVmaW5lZCB8fCBpc05hTih2YWx1ZVtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydudW1iZXJfbmFuJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnR5cGUgPT0gJ2ludGVnZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCh2YWx1ZVtpXSkgIT0gdmFsdWVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnbnVtYmVyX25vdF9pbnRlZ2VyJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQodmFsdWVbaV0pICE9IHZhbHVlW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ251bWJlcl9ub3RfZG91YmxlJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5taW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0gPCBwYXJzZUZsb2F0KHZhbGlkYXRpb24ubWluKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydudW1iZXJfZXhjZWVkX21pbicsIHZhbGlkYXRpb24ubWluXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXSA+IHBhcnNlRmxvYXQodmFsaWRhdGlvbi5tYXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ251bWJlcl9leGNlZWRfbWF4JywgdmFsaWRhdGlvbi5tYXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24uc3RlcCAhPT0gdW5kZWZpbmVkICYmIHZhbGlkYXRpb24uc3RlcCAhPT0gJ2FueScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSAodmFsdWVbaV0gLyB2YWxpZGF0aW9uLnN0ZXApLnRvUHJlY2lzaW9uKDE0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHYpICE9IHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnbnVtYmVyX3dyb25nX3N0ZXAnLCB2YWxpZGF0aW9uLnN0ZXBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0gPT09IHVuZGVmaW5lZCB8fCB2YWx1ZVtpXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydkYXRldGltZV9lbXB0eSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIE1vbWVudEpTXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24uZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKCdtb21lbnQnIGluIHdpbmRvdykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNaXNzaW5nTGlicmFyeScsICdNb21lbnRKUyBpcyByZXF1aXJlZCBmb3IgRGF0ZS9UaW1lIHZhbGlkYXRpb24uIEdldCBpdCBoZXJlIGh0dHA6Ly9tb21lbnRqcy5jb20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRldGltZSA9IG1vbWVudCh2YWx1ZVtpXSwgdmFsaWRhdGlvbi5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGV0aW1lLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydkYXRldGltZV9pbnZhbGlkJywgdmFsaWRhdGlvbi5mb3JtYXRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZXRpbWUgPCBtb21lbnQodmFsaWRhdGlvbi5taW4sIHZhbGlkYXRpb24uZm9ybWF0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ2RhdGV0aW1lX2V4Y2VlZF9taW4nLCB2YWxpZGF0aW9uLm1pbl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRldGltZSA+IG1vbWVudCh2YWxpZGF0aW9uLm1heCwgdmFsaWRhdGlvbi5mb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnZGF0ZXRpbWVfZXhjZWVkX21heCcsIHZhbGlkYXRpb24ubWF4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB2YWx1ZVtpXS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG1wICE9PSAndHJ1ZScgJiYgdG1wICE9PSAnZmFsc2UnICYmIHRtcCAhPT0gJzEnICYmIHRtcCAhPT0gJzAnICYmIHZhbHVlW2ldICE9PSAxICYmIHZhbHVlW2ldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnYm9vbGVhbl9ub3RfdmFsaWQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaW5jcmVtZW50ZWQgZ3JvdXAgSURcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5uZXh0R3JvdXBJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHVzLmlkICsgJ19ncm91cF8nICsgKHRoaXMuc3RhdHVzLmdyb3VwX2lkKyspO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGluY3JlbWVudGVkIHJ1bGUgSURcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5uZXh0UnVsZUlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXMuaWQgKyAnX3J1bGVfJyArICh0aGlzLnN0YXR1cy5ydWxlX2lkKyspO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvcGVyYXRvcnMgZm9yIGEgZmlsdGVyXG4gICAgICogQHBhcmFtIGZpbHRlciB7c3RyaW5nfG9iamVjdH0gKGZpbHRlciBpZCBuYW1lIG9yIGZpbHRlciBvYmplY3QpXG4gICAgICogQHJldHVybiB7b2JqZWN0W119XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRPcGVyYXRvcnMgPSBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmaWx0ZXIgPSB0aGlzLmdldEZpbHRlckJ5SWQoZmlsdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMub3BlcmF0b3JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgLy8gZmlsdGVyIG9wZXJhdG9ycyBjaGVja1xuICAgICAgICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm9wZXJhdG9ycy5pbmRleE9mKHRoaXMub3BlcmF0b3JzW2ldLnR5cGUpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHR5cGUgY2hlY2tcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3BlcmF0b3JzW2ldLmFwcGx5X3RvLmluZGV4T2YoUXVlcnlCdWlsZGVyLnR5cGVzW2ZpbHRlci50eXBlXSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5vcGVyYXRvcnNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8ga2VlcCBzb3J0IG9yZGVyIGRlZmluZWQgZm9yIHRoZSBmaWx0ZXJcbiAgICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcnMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlci5vcGVyYXRvcnMuaW5kZXhPZihhLnR5cGUpIC0gZmlsdGVyLm9wZXJhdG9ycy5pbmRleE9mKGIudHlwZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgnZ2V0T3BlcmF0b3JzJywgcmVzdWx0LCBmaWx0ZXIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcGFydGljdWxhciBmaWx0ZXIgYnkgaXRzIGlkXG4gICAgICogQHRocm93cyBVbmRlZmluZWRGaWx0ZXJFcnJvclxuICAgICAqIEBwYXJhbSBmaWx0ZXJJZCB7c3RyaW5nfVxuICAgICAqIEByZXR1cm4ge29iamVjdHxudWxsfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0RmlsdGVyQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBpZiAoaWQgPT0gJy0xJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuZmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnNbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZEZpbHRlcicsICdVbmRlZmluZWQgZmlsdGVyIFwiezB9XCInLCBpZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHBhcnRpY3VsYXIgb3BlcmF0b3IgYnkgaXRzIHR5cGVcbiAgICAgKiBAdGhyb3dzIFVuZGVmaW5lZE9wZXJhdG9yRXJyb3JcbiAgICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm4ge29iamVjdHxudWxsfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0T3BlcmF0b3JCeVR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAodHlwZSA9PSAnLTEnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5vcGVyYXRvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcGVyYXRvcnNbaV0udHlwZSA9PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlcmF0b3JzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZE9wZXJhdG9yJywgJ1VuZGVmaW5lZCBvcGVyYXRvciBcInswfVwiJywgdHlwZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcnVsZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqIEByZXR1cm4ge21peGVkfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0UnVsZVZhbHVlID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHJ1bGUuZmlsdGVyO1xuICAgICAgICB2YXIgb3BlcmF0b3IgPSBydWxlLm9wZXJhdG9yO1xuICAgICAgICB2YXIgdmFsdWUgPSBbXTtcblxuICAgICAgICBpZiAoZmlsdGVyLnZhbHVlR2V0dGVyKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGZpbHRlci52YWx1ZUdldHRlci5jYWxsKHRoaXMsIHJ1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyICR2YWx1ZSA9IHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnZhbHVlX2NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3BlcmF0b3IubmJfaW5wdXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFV0aWxzLmVzY2FwZUVsZW1lbnRJZChydWxlLmlkICsgJ192YWx1ZV8nICsgaSk7XG4gICAgICAgICAgICAgICAgdmFyIHRtcDtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZmlsdGVyLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goJHZhbHVlLmZpbmQoJ1tuYW1lPScgKyBuYW1lICsgJ106Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHZhbHVlLmZpbmQoJ1tuYW1lPScgKyBuYW1lICsgJ106Y2hlY2tlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKCQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHRtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR2YWx1ZS5maW5kKCdbbmFtZT0nICsgbmFtZSArICddIG9wdGlvbjpzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHRtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKCR2YWx1ZS5maW5kKCdbbmFtZT0nICsgbmFtZSArICddIG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKCR2YWx1ZS5maW5kKCdbbmFtZT0nICsgbmFtZSArICddJykudmFsKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wZXJhdG9yLm5iX2lucHV0cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEBkZXByZWNhdGVkXG4gICAgICAgICAgICBpZiAoZmlsdGVyLnZhbHVlUGFyc2VyKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBmaWx0ZXIudmFsdWVQYXJzZXIuY2FsbCh0aGlzLCBydWxlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ2dldFJ1bGVWYWx1ZScsIHZhbHVlLCBydWxlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgYSBydWxlLlxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqIEBwYXJhbSB2YWx1ZSB7bWl4ZWR9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5zZXRSdWxlVmFsdWUgPSBmdW5jdGlvbiAocnVsZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHJ1bGUuZmlsdGVyO1xuICAgICAgICB2YXIgb3BlcmF0b3IgPSBydWxlLm9wZXJhdG9yO1xuXG4gICAgICAgIGlmIChmaWx0ZXIudmFsdWVTZXR0ZXIpIHtcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZVNldHRlci5jYWxsKHRoaXMsIHJ1bGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciAkdmFsdWUgPSBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy52YWx1ZV9jb250YWluZXIpO1xuXG4gICAgICAgICAgICBpZiAob3BlcmF0b3IubmJfaW5wdXRzID09IDEpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wZXJhdG9yLm5iX2lucHV0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBVdGlscy5lc2NhcGVFbGVtZW50SWQocnVsZS5pZCArICdfdmFsdWVfJyArIGkpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChmaWx0ZXIuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgJHZhbHVlLmZpbmQoJ1tuYW1lPScgKyBuYW1lICsgJ11bdmFsdWU9XCInICsgdmFsdWVbaV0gKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsIHRydWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkLmlzQXJyYXkodmFsdWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbaV0gPSBbdmFsdWVbaV1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbaV0uZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdmFsdWUuZmluZCgnW25hbWU9JyArIG5hbWUgKyAnXVt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAkdmFsdWUuZmluZCgnW25hbWU9JyArIG5hbWUgKyAnXScpLnZhbCh2YWx1ZVtpXSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYW4gcnVsZSBmbGFncy5cbiAgICAgKiBAcGFyYW0gcnVsZSB7b2JqZWN0fVxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnBhcnNlUnVsZUZsYWdzID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgdmFyIGZsYWdzID0gJC5leHRlbmQoe30sIHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9ydWxlX2ZsYWdzKTtcblxuICAgICAgICBpZiAocnVsZS5yZWFkb25seSkge1xuICAgICAgICAgICAgJC5leHRlbmQoZmxhZ3MsIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgb3BlcmF0b3JfcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWVfcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgbm9fZGVsZXRlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChydWxlLmZsYWdzKSB7XG4gICAgICAgICAgICAkLmV4dGVuZChmbGFncywgcnVsZS5mbGFncyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3BhcnNlUnVsZUZsYWdzJywgZmxhZ3MsIHJ1bGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBjb3B5IG9mIGZsYWdzIG9mIGEgcnVsZS5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmxhZ3NcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFsbCAtIHRydWUgdG8gcmV0dXJuIGFsbCBmbGFncywgZmFsc2UgdG8gcmV0dXJuIG9ubHkgY2hhbmdlcyBmcm9tIGRlZmF1bHRcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0UnVsZUZsYWdzID0gZnVuY3Rpb24gKGZsYWdzLCBhbGwpIHtcbiAgICAgICAgaWYgKGFsbCkge1xuICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBmbGFncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAkLmVhY2godGhpcy5zZXR0aW5ncy5kZWZhdWx0X3J1bGVfZmxhZ3MsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZsYWdzW2tleV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFtrZXldID0gZmxhZ3Nba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xlYW4gZ3JvdXAgZmxhZ3MuXG4gICAgICogQHBhcmFtIGdyb3VwIHtvYmplY3R9XG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUucGFyc2VHcm91cEZsYWdzID0gZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgIHZhciBmbGFncyA9ICQuZXh0ZW5kKHt9LCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfZ3JvdXBfZmxhZ3MpO1xuXG4gICAgICAgIGlmIChncm91cC5yZWFkb25seSkge1xuICAgICAgICAgICAgJC5leHRlbmQoZmxhZ3MsIHtcbiAgICAgICAgICAgICAgICBjb25kaXRpb25fcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgbm9fZGVsZXRlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChncm91cC5mbGFncykge1xuICAgICAgICAgICAgJC5leHRlbmQoZmxhZ3MsIGdyb3VwLmZsYWdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgncGFyc2VHcm91cEZsYWdzJywgZmxhZ3MsIGdyb3VwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IGEgY29weSBvZiBmbGFncyBvZiBhIGdyb3VwLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmbGFnc1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsIC0gdHJ1ZSB0byByZXR1cm4gYWxsIGZsYWdzLCBmYWxzZSB0byByZXR1cm4gb25seSBjaGFuZ2VzIGZyb20gZGVmYXVsdFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRHcm91cEZsYWdzID0gZnVuY3Rpb24gKGZsYWdzLCBhbGwpIHtcbiAgICAgICAgaWYgKGFsbCkge1xuICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBmbGFncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAkLmVhY2godGhpcy5zZXR0aW5ncy5kZWZhdWx0X2dyb3VwX2ZsYWdzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChmbGFnc1trZXldICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXRba2V5XSA9IGZsYWdzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZSBhIGxhYmVsXG4gICAgICogQHBhcmFtIGxhYmVsIHtzdHJpbmd8b2JqZWN0fVxuICAgICAqIEByZXR1cm4gc3RyaW5nXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS50cmFuc2xhdGVMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGxhYmVsID09ICdvYmplY3QnID8gKGxhYmVsW3RoaXMuc2V0dGluZ3MubGFuZ19jb2RlXSB8fCBsYWJlbFsnZW4nXSkgOiBsYWJlbDtcbiAgICB9O1xuXG5cbiAgICBRdWVyeUJ1aWxkZXIudGVtcGxhdGVzLmdyb3VwID0gJ1xcXG48ZGwgaWQ9XCJ7ez0gaXQuZ3JvdXBfaWQgfX1cIiBjbGFzcz1cInJ1bGVzLWdyb3VwLWNvbnRhaW5lclwiPiBcXFxuICA8ZHQgY2xhc3M9XCJydWxlcy1ncm91cC1oZWFkZXJcIj4gXFxcbiAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHB1bGwtcmlnaHQgZ3JvdXAtYWN0aW9uc1wiPiBcXFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1zdWNjZXNzXCIgZGF0YS1hZGQ9XCJydWxlXCI+IFxcXG4gICAgICAgIDxpIGNsYXNzPVwie3s9IGl0Lmljb25zLmFkZF9ydWxlIH19XCI+PC9pPiB7ez0gaXQubGFuZy5hZGRfcnVsZSB9fSBcXFxuICAgICAgPC9idXR0b24+IFxcXG4gICAgICB7ez8gaXQuc2V0dGluZ3MuYWxsb3dfZ3JvdXBzPT09LTEgfHwgaXQuc2V0dGluZ3MuYWxsb3dfZ3JvdXBzPj1pdC5sZXZlbCB9fSBcXFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLXN1Y2Nlc3NcIiBkYXRhLWFkZD1cImdyb3VwXCI+IFxcXG4gICAgICAgICAgPGkgY2xhc3M9XCJ7ez0gaXQuaWNvbnMuYWRkX2dyb3VwIH19XCI+PC9pPiB7ez0gaXQubGFuZy5hZGRfZ3JvdXAgfX0gXFxcbiAgICAgICAgPC9idXR0b24+IFxcXG4gICAgICB7ez99fSBcXFxuICAgICAge3s/IGl0LmxldmVsPjEgfX0gXFxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kYW5nZXIgcmVtb3ZlLWdyb3VwXCIgZGF0YS1kZWxldGU9XCJncm91cFwiPiBcXFxuICAgICAgICAgIDxpIGNsYXNzPVwie3s9IGl0Lmljb25zLnJlbW92ZV9ncm91cCB9fVwiPjwvaT4ge3s9IGl0LmxhbmcuZGVsZXRlX2dyb3VwIH19IFxcXG4gICAgICAgIDwvYnV0dG9uPiBcXFxuICAgICAge3s/fX0gXFxcbiAgICA8L2Rpdj4gXFxcbiAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIGdyb3VwLWNvbmRpdGlvbnNcIj4gXFxcbiAgICAgIHt7fiBpdC5jb25kaXRpb25zOiBjb25kaXRpb24gfX0gXFxcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tcHJpbWFyeVwiPiBcXFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwie3s9IGl0Lmdyb3VwX2lkIH19X2NvbmRcIiB2YWx1ZT1cInt7PSBjb25kaXRpb24gfX1cIj4ge3s9IGl0LmxhbmcuY29uZGl0aW9uc1tjb25kaXRpb25dIHx8IGNvbmRpdGlvbiB9fSBcXFxuICAgICAgICA8L2xhYmVsPiBcXFxuICAgICAge3t+fX0gXFxcbiAgICA8L2Rpdj4gXFxcbiAgICB7ez8gaXQuc2V0dGluZ3MuZGlzcGxheV9lcnJvcnMgfX0gXFxcbiAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1jb250YWluZXJcIj48aSBjbGFzcz1cInt7PSBpdC5pY29ucy5lcnJvciB9fVwiPjwvaT48L2Rpdj4gXFxcbiAgICB7ez99fSBcXFxuICA8L2R0PiBcXFxuICA8ZGQgY2xhc3M9cnVsZXMtZ3JvdXAtYm9keT4gXFxcbiAgICA8dWwgY2xhc3M9cnVsZXMtbGlzdD48L3VsPiBcXFxuICA8L2RkPiBcXFxuPC9kbD4nO1xuXG4gICAgUXVlcnlCdWlsZGVyLnRlbXBsYXRlcy5ydWxlID0gJ1xcXG48bGkgaWQ9XCJ7ez0gaXQucnVsZV9pZCB9fVwiIGNsYXNzPVwicnVsZS1jb250YWluZXJcIj4gXFxcbiAgPGRpdiBjbGFzcz1cInJ1bGUtaGVhZGVyXCI+IFxcXG4gICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cCBwdWxsLXJpZ2h0IHJ1bGUtYWN0aW9uc1wiPiBcXFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kYW5nZXIgcmVtb3ZlLXJ1bGVcIiBkYXRhLWRlbGV0ZT1cInJ1bGVcIj4gXFxcbiAgICAgICAgPGkgY2xhc3M9XCJ7ez0gaXQuaWNvbnMucmVtb3ZlX3J1bGUgfX1cIj48L2k+IHt7PSBpdC5sYW5nLmRlbGV0ZV9ydWxlIH19IFxcXG4gICAgICA8L2J1dHRvbj4gXFxcbiAgICA8L2Rpdj4gXFxcbiAgPC9kaXY+IFxcXG4gIHt7PyBpdC5zZXR0aW5ncy5kaXNwbGF5X2Vycm9ycyB9fSBcXFxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1jb250YWluZXJcIj48aSBjbGFzcz1cInt7PSBpdC5pY29ucy5lcnJvciB9fVwiPjwvaT48L2Rpdj4gXFxcbiAge3s/fX0gXFxcbiAgPGRpdiBjbGFzcz1cInJ1bGUtZmlsdGVyLWNvbnRhaW5lclwiPjwvZGl2PiBcXFxuICA8ZGl2IGNsYXNzPVwicnVsZS1vcGVyYXRvci1jb250YWluZXJcIj48L2Rpdj4gXFxcbiAgPGRpdiBjbGFzcz1cInJ1bGUtdmFsdWUtY29udGFpbmVyXCI+PC9kaXY+IFxcXG48L2xpPic7XG5cbiAgICBRdWVyeUJ1aWxkZXIudGVtcGxhdGVzLmZpbHRlclNlbGVjdCA9ICdcXFxue3sgdmFyIG9wdGdyb3VwID0gbnVsbDsgfX0gXFxcbjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwie3s9IGl0LnJ1bGUuaWQgfX1fZmlsdGVyXCI+IFxcXG4gIHt7PyBpdC5zZXR0aW5ncy5kaXNwbGF5X2VtcHR5X2ZpbHRlciB9fSBcXFxuICAgIDxvcHRpb24gdmFsdWU9XCItMVwiPnt7PSBpdC5zZXR0aW5ncy5zZWxlY3RfcGxhY2Vob2xkZXIgfX08L29wdGlvbj4gXFxcbiAge3s/fX0gXFxcbiAge3t+IGl0LmZpbHRlcnM6IGZpbHRlciB9fSBcXFxuICAgIHt7PyBvcHRncm91cCAhPT0gZmlsdGVyLm9wdGdyb3VwIH19IFxcXG4gICAgICB7ez8gb3B0Z3JvdXAgIT09IG51bGwgfX08L29wdGdyb3VwPnt7P319IFxcXG4gICAgICB7ez8gKG9wdGdyb3VwID0gZmlsdGVyLm9wdGdyb3VwKSAhPT0gbnVsbCB9fSBcXFxuICAgICAgICA8b3B0Z3JvdXAgbGFiZWw9XCJ7ez0gaXQudHJhbnNsYXRlKGl0LnNldHRpbmdzLm9wdGdyb3Vwc1tvcHRncm91cF0pIH19XCI+IFxcXG4gICAgICB7ez99fSBcXFxuICAgIHt7P319IFxcXG4gICAgPG9wdGlvbiB2YWx1ZT1cInt7PSBmaWx0ZXIuaWQgfX1cIj57ez0gaXQudHJhbnNsYXRlKGZpbHRlci5sYWJlbCkgfX08L29wdGlvbj4gXFxcbiAge3t+fX0gXFxcbiAge3s/IG9wdGdyb3VwICE9PSBudWxsIH19PC9vcHRncm91cD57ez99fSBcXFxuPC9zZWxlY3Q+JztcblxuICAgIFF1ZXJ5QnVpbGRlci50ZW1wbGF0ZXMub3BlcmF0b3JTZWxlY3QgPSAnXFxcbnt7IHZhciBvcHRncm91cCA9IG51bGw7IH19IFxcXG48c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cInt7PSBpdC5ydWxlLmlkIH19X29wZXJhdG9yXCI+IFxcXG4gIHt7fiBpdC5vcGVyYXRvcnM6IG9wZXJhdG9yIH19IFxcXG4gICAge3s/IG9wdGdyb3VwICE9PSBvcGVyYXRvci5vcHRncm91cCB9fSBcXFxuICAgICAge3s/IG9wdGdyb3VwICE9PSBudWxsIH19PC9vcHRncm91cD57ez99fSBcXFxuICAgICAge3s/IChvcHRncm91cCA9IG9wZXJhdG9yLm9wdGdyb3VwKSAhPT0gbnVsbCB9fSBcXFxuICAgICAgICA8b3B0Z3JvdXAgbGFiZWw9XCJ7ez0gaXQudHJhbnNsYXRlKGl0LnNldHRpbmdzLm9wdGdyb3Vwc1tvcHRncm91cF0pIH19XCI+IFxcXG4gICAgICB7ez99fSBcXFxuICAgIHt7P319IFxcXG4gICAgPG9wdGlvbiB2YWx1ZT1cInt7PSBvcGVyYXRvci50eXBlIH19XCI+e3s9IGl0Lmxhbmcub3BlcmF0b3JzW29wZXJhdG9yLnR5cGVdIHx8IG9wZXJhdG9yLnR5cGUgfX08L29wdGlvbj4gXFxcbiAge3t+fX0gXFxcbiAge3s/IG9wdGdyb3VwICE9PSBudWxsIH19PC9vcHRncm91cD57ez99fSBcXFxuPC9zZWxlY3Q+JztcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgZ3JvdXAgSFRNTFxuICAgICAqIEBwYXJhbSBncm91cF9pZCB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBsZXZlbCB7aW50fVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldEdyb3VwVGVtcGxhdGUgPSBmdW5jdGlvbiAoZ3JvdXBfaWQsIGxldmVsKSB7XG4gICAgICAgIHZhciBoID0gdGhpcy50ZW1wbGF0ZXMuZ3JvdXAoe1xuICAgICAgICAgICAgYnVpbGRlcjogdGhpcyxcbiAgICAgICAgICAgIGdyb3VwX2lkOiBncm91cF9pZCxcbiAgICAgICAgICAgIGxldmVsOiBsZXZlbCxcbiAgICAgICAgICAgIGNvbmRpdGlvbnM6IHRoaXMuc2V0dGluZ3MuY29uZGl0aW9ucyxcbiAgICAgICAgICAgIGljb25zOiB0aGlzLmljb25zLFxuICAgICAgICAgICAgbGFuZzogdGhpcy5sYW5nLFxuICAgICAgICAgICAgc2V0dGluZ3M6IHRoaXMuc2V0dGluZ3NcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdnZXRHcm91cFRlbXBsYXRlJywgaCwgbGV2ZWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJ1bGUgSFRNTFxuICAgICAqIEBwYXJhbSBydWxlX2lkIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0UnVsZVRlbXBsYXRlID0gZnVuY3Rpb24gKHJ1bGVfaWQpIHtcbiAgICAgICAgdmFyIGggPSB0aGlzLnRlbXBsYXRlcy5ydWxlKHtcbiAgICAgICAgICAgIGJ1aWxkZXI6IHRoaXMsXG4gICAgICAgICAgICBydWxlX2lkOiBydWxlX2lkLFxuICAgICAgICAgICAgaWNvbnM6IHRoaXMuaWNvbnMsXG4gICAgICAgICAgICBsYW5nOiB0aGlzLmxhbmcsXG4gICAgICAgICAgICBzZXR0aW5nczogdGhpcy5zZXR0aW5nc1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ2dldFJ1bGVUZW1wbGF0ZScsIGgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJ1bGUgZmlsdGVyIDxzZWxlY3Q+IEhUTUxcbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKiBAcGFyYW0gZmlsdGVycyB7YXJyYXl9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0UnVsZUZpbHRlclNlbGVjdCA9IGZ1bmN0aW9uIChydWxlLCBmaWx0ZXJzKSB7XG4gICAgICAgIHZhciBoID0gdGhpcy50ZW1wbGF0ZXMuZmlsdGVyU2VsZWN0KHtcbiAgICAgICAgICAgIGJ1aWxkZXI6IHRoaXMsXG4gICAgICAgICAgICBydWxlOiBydWxlLFxuICAgICAgICAgICAgZmlsdGVyczogZmlsdGVycyxcbiAgICAgICAgICAgIGljb25zOiB0aGlzLmljb25zLFxuICAgICAgICAgICAgbGFuZzogdGhpcy5sYW5nLFxuICAgICAgICAgICAgc2V0dGluZ3M6IHRoaXMuc2V0dGluZ3MsXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHRoaXMudHJhbnNsYXRlTGFiZWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdnZXRSdWxlRmlsdGVyU2VsZWN0JywgaCwgcnVsZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcnVsZSBvcGVyYXRvciA8c2VsZWN0PiBIVE1MXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICogQHBhcmFtIG9wZXJhdG9ycyB7b2JqZWN0fVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldFJ1bGVPcGVyYXRvclNlbGVjdCA9IGZ1bmN0aW9uIChydWxlLCBvcGVyYXRvcnMpIHtcbiAgICAgICAgdmFyIGggPSB0aGlzLnRlbXBsYXRlcy5vcGVyYXRvclNlbGVjdCh7XG4gICAgICAgICAgICBidWlsZGVyOiB0aGlzLFxuICAgICAgICAgICAgcnVsZTogcnVsZSxcbiAgICAgICAgICAgIG9wZXJhdG9yczogb3BlcmF0b3JzLFxuICAgICAgICAgICAgaWNvbnM6IHRoaXMuaWNvbnMsXG4gICAgICAgICAgICBsYW5nOiB0aGlzLmxhbmcsXG4gICAgICAgICAgICBzZXR0aW5nczogdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdGhpcy50cmFuc2xhdGVMYWJlbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ2dldFJ1bGVPcGVyYXRvclNlbGVjdCcsIGgsIHJ1bGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHJ1bGUgdmFsdWUgSFRNTFxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqIEBwYXJhbSBmaWx0ZXIge29iamVjdH1cbiAgICAgKiBAcGFyYW0gdmFsdWVfaWQge2ludH1cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRSdWxlSW5wdXQgPSBmdW5jdGlvbiAocnVsZSwgdmFsdWVfaWQpIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IHJ1bGUuZmlsdGVyO1xuICAgICAgICB2YXIgdmFsaWRhdGlvbiA9IHJ1bGUuZmlsdGVyLnZhbGlkYXRpb24gfHwge307XG4gICAgICAgIHZhciBuYW1lID0gcnVsZS5pZCArICdfdmFsdWVfJyArIHZhbHVlX2lkO1xuICAgICAgICB2YXIgYyA9IGZpbHRlci52ZXJ0aWNhbCA/ICcgY2xhc3M9YmxvY2snIDogJyc7XG4gICAgICAgIHZhciBoID0gJyc7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIuaW5wdXQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaCA9IGZpbHRlci5pbnB1dC5jYWxsKHRoaXMsIHJ1bGUsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChmaWx0ZXIuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgICAgICAgICBVdGlscy5pdGVyYXRlT3B0aW9ucyhmaWx0ZXIudmFsdWVzLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGggKz0gJzxsYWJlbCcgKyBjICsgJz48aW5wdXQgdHlwZT1cIicgKyBmaWx0ZXIuaW5wdXQgKyAnXCIgbmFtZT1cIicgKyBuYW1lICsgJ1wiIHZhbHVlPVwiJyArIGtleSArICdcIj4gJyArIHZhbCArICc8L2xhYmVsPiAnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgICAgICAgICAgICBoICs9ICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cIicgKyBuYW1lICsgJ1wiJyArIChmaWx0ZXIubXVsdGlwbGUgPyAnIG11bHRpcGxlJyA6ICcnKSArICc+JztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBmaWx0ZXIucGxhY2Vob2xkZXJfdmFsdWUgKyAnXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+JyArIGZpbHRlci5wbGFjZWhvbGRlciArICc8L29wdGlvbj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLml0ZXJhdGVPcHRpb25zKGZpbHRlci52YWx1ZXMsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBrZXkgKyAnXCI+JyArIHZhbCArICc8L29wdGlvbj4gJztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGggKz0gJzwvc2VsZWN0Pic7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICAgICAgICAgICAgICBoICs9ICc8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiJyArIG5hbWUgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNpemUpIGggKz0gJyBjb2xzPVwiJyArIGZpbHRlci5zaXplICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5yb3dzKSBoICs9ICcgcm93cz1cIicgKyBmaWx0ZXIucm93cyArICdcIic7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1pbiAhPT0gdW5kZWZpbmVkKSBoICs9ICcgbWlubGVuZ3RoPVwiJyArIHZhbGlkYXRpb24ubWluICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ubWF4ICE9PSB1bmRlZmluZWQpIGggKz0gJyBtYXhsZW5ndGg9XCInICsgdmFsaWRhdGlvbi5tYXggKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnBsYWNlaG9sZGVyKSBoICs9ICcgcGxhY2Vob2xkZXI9XCInICsgZmlsdGVyLnBsYWNlaG9sZGVyICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgaCArPSAnPjwvdGV4dGFyZWE+JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFF1ZXJ5QnVpbGRlci50eXBlc1tmaWx0ZXIudHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaCArPSAnPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cIm51bWJlclwiIG5hbWU9XCInICsgbmFtZSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24uc3RlcCAhPT0gdW5kZWZpbmVkKSBoICs9ICcgc3RlcD1cIicgKyB2YWxpZGF0aW9uLnN0ZXAgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1pbiAhPT0gdW5kZWZpbmVkKSBoICs9ICcgbWluPVwiJyArIHZhbGlkYXRpb24ubWluICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5tYXggIT09IHVuZGVmaW5lZCkgaCArPSAnIG1heD1cIicgKyB2YWxpZGF0aW9uLm1heCArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5wbGFjZWhvbGRlcikgaCArPSAnIHBsYWNlaG9sZGVyPVwiJyArIGZpbHRlci5wbGFjZWhvbGRlciArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5zaXplKSBoICs9ICcgc2l6ZT1cIicgKyBmaWx0ZXIuc2l6ZSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaCArPSAnPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaCArPSAnPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiJyArIG5hbWUgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIucGxhY2Vob2xkZXIpIGggKz0gJyBwbGFjZWhvbGRlcj1cIicgKyBmaWx0ZXIucGxhY2Vob2xkZXIgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsaWRhdGlvbi5taW4gIT09IHVuZGVmaW5lZCkgaCArPSAnIG1pbmxlbmd0aD1cIicgKyB2YWxpZGF0aW9uLm1pbiArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci50eXBlID09PSAnc3RyaW5nJyAmJiB2YWxpZGF0aW9uLm1heCAhPT0gdW5kZWZpbmVkKSBoICs9ICcgbWF4bGVuZ3RoPVwiJyArIHZhbGlkYXRpb24ubWF4ICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNpemUpIGggKz0gJyBzaXplPVwiJyArIGZpbHRlci5zaXplICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoICs9ICc+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdnZXRSdWxlSW5wdXQnLCBoLCBydWxlLCBuYW1lKTtcbiAgICB9O1xuXG5cbi8vIE1vZGVsIENMQVNTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogTWFpbiBvYmplY3Qgc3RvcmluZyBkYXRhIG1vZGVsIGFuZCBlbWl0dGluZyBldmVudHNcbiAgICAgKiAtLS0tLS0tLS1cbiAgICAgKiBBY2Nlc3MgTm9kZSBvYmplY3Qgc3RvcmVkIGluIGpRdWVyeSBvYmplY3RzXG4gICAgICogQHBhcmFtIGVsIHtqUXVlcnl8Tm9kZX1cbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1vZGVsKGVsKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RlbC5nZXRNb2RlbChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvb3QgPSBudWxsO1xuICAgICAgICB0aGlzLiQgPSAkKHRoaXMpO1xuICAgIH1cblxuICAgICQuZXh0ZW5kKE1vZGVsLnByb3RvdHlwZSwge1xuICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgdGhpcy4kLnRyaWdnZXJIYW5kbGVyKHR5cGUsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJC5vbi5hcHBseSh0aGlzLiQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb2ZmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiQub2ZmLmFwcGx5KHRoaXMuJCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBvbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiQub25lLmFwcGx5KHRoaXMuJCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWNjZXNzIE5vZGUgb2JqZWN0IHN0b3JlZCBpbiBqUXVlcnkgb2JqZWN0c1xuICAgICAqIEBwYXJhbSBlbCB7alF1ZXJ5fE5vZGV9XG4gICAgICogQHJldHVybiB7Tm9kZX1cbiAgICAgKi9cbiAgICBNb2RlbC5nZXRNb2RlbCA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbCBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkKGVsKS5kYXRhKCdxdWVyeUJ1aWxkZXJNb2RlbCcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogRGVmaW5lIE5vZGUgcHJvcGVydGllcyB3aXRoIGdldHRlciBhbmQgc2V0dGVyXG4gICAgICogVXBkYXRlIGV2ZW50cyBhcmUgZW1pdHRlZCBpbiB0aGUgc2V0dGVyIHRocm91Z2ggcm9vdCBNb2RlbCAoaWYgYW55KVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlZmluZU1vZGVsUHJvcGVydGllcyhvYmosIGZpZWxkcykge1xuICAgICAgICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoucHJvdG90eXBlLCBmaWVsZCwge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9ICh0aGlzLl9fW2ZpZWxkXSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5fX1tmaWVsZF0gPT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHt9LCB0aGlzLl9fW2ZpZWxkXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX1tmaWVsZF07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX1tmaWVsZF0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmlnZ2VyKCd1cGRhdGUnLCB0aGlzLCBmaWVsZCwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuLy8gTm9kZSBhYnN0cmFjdCBDTEFTU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Tm9kZX1cbiAgICAgKiBAcGFyYW0ge2pRdWVyeX1cbiAgICAgKi9cbiAgICB2YXIgTm9kZSA9IGZ1bmN0aW9uIChwYXJlbnQsICRlbCkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTm9kZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfXycsIHt2YWx1ZToge319KTtcblxuICAgICAgICAkZWwuZGF0YSgncXVlcnlCdWlsZGVyTW9kZWwnLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9fLmxldmVsID0gMTtcbiAgICAgICAgdGhpcy5fXy5lcnJvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX18uZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy4kZWwgPSAkZWw7XG4gICAgICAgIHRoaXMuaWQgPSAkZWxbMF0uaWQ7XG4gICAgICAgIHRoaXMubW9kZWwgPSBudWxsO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB9O1xuXG4gICAgZGVmaW5lTW9kZWxQcm9wZXJ0aWVzKE5vZGUsIFsnbGV2ZWwnLCAnZXJyb3InLCAnZGF0YScsICdmbGFncyddKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb2RlLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fXy5wYXJlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9fLnBhcmVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IHZhbHVlID09PSBudWxsID8gMSA6IHZhbHVlLmxldmVsICsgMTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiB2YWx1ZS5tb2RlbDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhpcyBOb2RlIGlzIHRoZSByb290XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBOb2RlLnByb3RvdHlwZS5pc1Jvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5sZXZlbCA9PT0gMSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBub2RlIHBvc2l0aW9uIGluc2lkZSBwYXJlbnRcbiAgICAgKiBAcmV0dXJuIHtpbnR9XG4gICAgICovXG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0UG9zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Jvb3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldE5vZGVQb3ModGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHNlbGZcbiAgICAgKi9cbiAgICBOb2RlLnByb3RvdHlwZS5kcm9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLm1vZGVsO1xuXG4gICAgICAgIGlmICghdGhpcy5pc1Jvb3QoKSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuX3JlbW92ZU5vZGUodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG1vZGVsLnRyaWdnZXIoJ2Ryb3AnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIGl0c2VsZiBhZnRlciBhbm90aGVyIE5vZGVcbiAgICAgKiBAcGFyYW0ge05vZGV9XG4gICAgICogQHJldHVybiB7Tm9kZX0gc2VsZlxuICAgICAqL1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmVBZnRlciA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUm9vdCgpKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fbW92ZShub2RlLnBhcmVudCwgbm9kZS5nZXRQb3MoKSArIDEpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIGl0c2VsZiBhdCB0aGUgYmVnaW5uaW5nIG9mIHBhcmVudCBvciBhbm90aGVyIEdyb3VwXG4gICAgICogQHBhcmFtIHtHcm91cCxvcHRpb25hbH1cbiAgICAgKiBAcmV0dXJuIHtOb2RlfSBzZWxmXG4gICAgICovXG4gICAgTm9kZS5wcm90b3R5cGUubW92ZUF0QmVnaW4gPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzUm9vdCgpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vdmUodGFyZ2V0LCAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTW92ZSBpdHNlbGYgYXQgdGhlIGVuZCBvZiBwYXJlbnQgb3IgYW5vdGhlciBHcm91cFxuICAgICAqIEBwYXJhbSB7R3JvdXAsb3B0aW9uYWx9XG4gICAgICogQHJldHVybiB7Tm9kZX0gc2VsZlxuICAgICAqL1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmVBdEVuZCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSb290KCkpIHJldHVybjtcblxuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMucGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW92ZSh0YXJnZXQsIHRhcmdldC5sZW5ndGgoKSAtIDEpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIGl0c2VsZiBhdCBzcGVjaWZpYyBwb3NpdGlvbiBvZiBHcm91cFxuICAgICAqIEBwYXJhbSB7R3JvdXB9XG4gICAgICogQHBhcmFtIHtpbnR9XG4gICAgICovXG4gICAgTm9kZS5wcm90b3R5cGUuX21vdmUgPSBmdW5jdGlvbiAoZ3JvdXAsIGluZGV4KSB7XG4gICAgICAgIHRoaXMucGFyZW50Ll9yZW1vdmVOb2RlKHRoaXMpO1xuICAgICAgICBncm91cC5fYXBwZW5kTm9kZSh0aGlzLCBpbmRleCwgZmFsc2UpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnRyaWdnZXIoJ21vdmUnLCB0aGlzLCBncm91cCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4vLyBHUk9VUCBDTEFTU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7R3JvdXB9XG4gICAgICogQHBhcmFtIHtqUXVlcnl9XG4gICAgICovXG4gICAgdmFyIEdyb3VwID0gZnVuY3Rpb24gKHBhcmVudCwgJGVsKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBHcm91cCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgR3JvdXAocGFyZW50LCAkZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgTm9kZS5jYWxsKHRoaXMsIHBhcmVudCwgJGVsKTtcblxuICAgICAgICB0aGlzLnJ1bGVzID0gW107XG4gICAgICAgIHRoaXMuX18uY29uZGl0aW9uID0gbnVsbDtcbiAgICB9O1xuXG4gICAgR3JvdXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShOb2RlLnByb3RvdHlwZSk7XG4gICAgR3JvdXAucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR3JvdXA7XG5cbiAgICBkZWZpbmVNb2RlbFByb3BlcnRpZXMoR3JvdXAsIFsnY29uZGl0aW9uJ10pO1xuXG4gICAgLyoqXG4gICAgICogRW1wdHkgdGhlIEdyb3VwXG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVhY2goJ3JldmVyc2UnLCBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgcnVsZS5kcm9wKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAuZHJvcCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHNlbGZcbiAgICAgKi9cbiAgICBHcm91cC5wcm90b3R5cGUuZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbXB0eSgpO1xuICAgICAgICBOb2RlLnByb3RvdHlwZS5kcm9wLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuXG4gICAgICogQHJldHVybiB7aW50fVxuICAgICAqL1xuICAgIEdyb3VwLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bGVzLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgTm9kZSBhdCBzcGVjaWZpZWQgaW5kZXhcbiAgICAgKiBAcGFyYW0ge05vZGV9XG4gICAgICogQHBhcmFtIHtpbnQsb3B0aW9uYWx9XG4gICAgICogQHBhcmFtIHtib29sZWFuLG9wdGlvbmFsfVxuICAgICAqIEByZXR1cm4ge05vZGV9IHRoZSBpbnNlcnRlZCBub2RlXG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLl9hcHBlbmROb2RlID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4LCB0cmlnZ2VyKSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJ1bGVzLnNwbGljZShpbmRleCwgMCwgbm9kZSk7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcztcblxuICAgICAgICBpZiAodHJpZ2dlciAmJiB0aGlzLm1vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnRyaWdnZXIoJ2FkZCcsIG5vZGUsIGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBHcm91cCBieSBqUXVlcnkgZWxlbWVudCBhdCBzcGVjaWZpZWQgaW5kZXhcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX1cbiAgICAgKiBAcGFyYW0ge2ludCxvcHRpb25hbH1cbiAgICAgKiBAcmV0dXJuIHtHcm91cH0gdGhlIGluc2VydGVkIGdyb3VwXG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLmFkZEdyb3VwID0gZnVuY3Rpb24gKCRlbCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGVuZE5vZGUobmV3IEdyb3VwKHRoaXMsICRlbCksIGluZGV4LCB0cnVlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGEgUnVsZSBieSBqUXVlcnkgZWxlbWVudCBhdCBzcGVjaWZpZWQgaW5kZXhcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX1cbiAgICAgKiBAcGFyYW0ge2ludCxvcHRpb25hbH1cbiAgICAgKiBAcmV0dXJuIHtSdWxlfSB0aGUgaW5zZXJ0ZWQgcnVsZVxuICAgICAqL1xuICAgIEdyb3VwLnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKCRlbCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGVuZE5vZGUobmV3IFJ1bGUodGhpcywgJGVsKSwgaW5kZXgsIHRydWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBzcGVjaWZpYyBOb2RlXG4gICAgICogQHBhcmFtIHtOb2RlfVxuICAgICAqIEByZXR1cm4ge0dyb3VwfSBzZWxmXG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLl9yZW1vdmVOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXROb2RlUG9zKG5vZGUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJ1bGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHBvc2l0aW9uIG9mIGEgY2hpbGQgTm9kZVxuICAgICAqIEBwYXJhbSB7Tm9kZX1cbiAgICAgKiBAcmV0dXJuIHtpbnR9XG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLmdldE5vZGVQb3MgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydWxlcy5pbmRleE9mKG5vZGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlIG92ZXIgYWxsIE5vZGVzXG4gICAgICogQHBhcmFtIHtib29sZWFuLG9wdGlvbmFsfSBpdGVyYXRlIGluIHJldmVyc2Ugb3JkZXIsIHJlcXVpcmVkIGlmIHlvdSBkZWxldGUgbm9kZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBmb3IgUnVsZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uLG9wdGlvbmFsfSBjYWxsYmFjayBmb3IgR3JvdXBzXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBHcm91cC5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uIChyZXZlcnNlLCBjYlJ1bGUsIGNiR3JvdXAsIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXZlcnNlID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjYkdyb3VwO1xuICAgICAgICAgICAgY2JHcm91cCA9IGNiUnVsZTtcbiAgICAgICAgICAgIGNiUnVsZSA9IHJldmVyc2U7XG4gICAgICAgICAgICByZXZlcnNlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb250ZXh0O1xuXG4gICAgICAgIHZhciBpID0gcmV2ZXJzZSA/IHRoaXMucnVsZXMubGVuZ3RoIC0gMSA6IDA7XG4gICAgICAgIHZhciBsID0gcmV2ZXJzZSA/IDAgOiB0aGlzLnJ1bGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBjID0gcmV2ZXJzZSA/IC0xIDogMTtcbiAgICAgICAgdmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmV2ZXJzZSA/IGkgPj0gbCA6IGkgPD0gbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHN0b3AgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKDsgbmV4dCgpOyBpICs9IGMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bGVzW2ldIGluc3RhbmNlb2YgR3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAoY2JHcm91cCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3AgPSBjYkdyb3VwLmNhbGwoY29udGV4dCwgdGhpcy5ydWxlc1tpXSkgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3AgPSBjYlJ1bGUuY2FsbChjb250ZXh0LCB0aGlzLnJ1bGVzW2ldKSA9PT0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdG9wKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gIXN0b3A7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSBncm91cCBjb250YWlucyBhIHBhcnRpY3VsYXIgTm9kZVxuICAgICAqIEBwYXJhbSB7Tm9kZX1cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW4sb3B0aW9uYWx9IHJlY3Vyc2l2ZSBzZWFyY2hcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIEdyb3VwLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChub2RlLCBkZWVwKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5vZGVQb3Mobm9kZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghZGVlcCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIGxvb3Agd2lsbCByZXR1cm4gd2l0aCBmYWxzZSBhcyBzb29uIGFzIHRoZSBOb2RlIGlzIGZvdW5kXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuZWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFncm91cC5jb250YWlucyhub2RlLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4vLyBSVUxFIENMQVNTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtHcm91cH1cbiAgICAgKiBAcGFyYW0ge2pRdWVyeX1cbiAgICAgKi9cbiAgICB2YXIgUnVsZSA9IGZ1bmN0aW9uIChwYXJlbnQsICRlbCkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUnVsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUnVsZShwYXJlbnQsICRlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBOb2RlLmNhbGwodGhpcywgcGFyZW50LCAkZWwpO1xuXG4gICAgICAgIHRoaXMuX18uZmlsdGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fXy5vcGVyYXRvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX18uZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5fXy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgUnVsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5vZGUucHJvdG90eXBlKTtcbiAgICBSdWxlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJ1bGU7XG5cbiAgICBkZWZpbmVNb2RlbFByb3BlcnRpZXMoUnVsZSwgWydmaWx0ZXInLCAnb3BlcmF0b3InLCAndmFsdWUnXSk7XG5cblxuLy8gRVhQT1JUXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUXVlcnlCdWlsZGVyLkdyb3VwID0gR3JvdXA7XG4gICAgUXVlcnlCdWlsZGVyLlJ1bGUgPSBSdWxlO1xuXG5cbiAgICB2YXIgVXRpbHMgPSBRdWVyeUJ1aWxkZXIudXRpbHMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgdG8gaXRlcmF0ZSBvdmVyIHJhZGlvL2NoZWNrYm94L3NlbGVjdGlvbiBvcHRpb25zLlxuICAgICAqIGl0IGFjY2VwdCB0aHJlZSBmb3JtYXRzOiBhcnJheSBvZiB2YWx1ZXMsIG1hcCwgYXJyYXkgb2YgMS1lbGVtZW50IG1hcHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R8YXJyYXl9XG4gICAgICogQHBhcmFtIHRwbCB7Y2FsbGFibGV9ICh0YWtlcyBrZXkgYW5kIHRleHQpXG4gICAgICovXG4gICAgVXRpbHMuaXRlcmF0ZU9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucywgdHBsKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoJC5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiBvbmUtZWxlbWVudCBtYXBzXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmlzUGxhaW5PYmplY3QoZW50cnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goZW50cnksIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRwbChrZXksIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBicmVhayBhZnRlciBmaXJzdCBlbnRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gYXJyYXkgb2YgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHBsKGVudHJ5LCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVub3JkZXJlZCBtYXBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZWFjaChvcHRpb25zLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdHBsKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyB7MH0sIHsxfSwgLi4uIGluIGEgc3RyaW5nXG4gICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBhcmdzLC4uLiB7bWl4ZWR9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFV0aWxzLmZtdCA9IGZ1bmN0aW9uIChzdHIvKiwgYXJncyovKSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL3soWzAtOV0rKX0vZywgZnVuY3Rpb24gKG0sIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzW3BhcnNlSW50KGkpXTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRocm93IGFuIEVycm9yIG9iamVjdCB3aXRoIGN1c3RvbSBuYW1lXG4gICAgICogQHBhcmFtIHR5cGUge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBhcmdzLC4uLiB7bWl4ZWR9XG4gICAgICovXG4gICAgVXRpbHMuZXJyb3IgPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZS8qLCBhcmdzKi8pIHtcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihVdGlscy5mbXQuYXBwbHkobnVsbCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpO1xuICAgICAgICBlcnIubmFtZSA9IHR5cGUgKyAnRXJyb3InO1xuICAgICAgICBlcnIuYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHR5cGUgb2YgYSB2YWx1ZSB0byBpbnQgb3IgZmxvYXRcbiAgICAgKiBAcGFyYW0gdmFsdWUge21peGVkfVxuICAgICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9ICdpbnRlZ2VyJywgJ2RvdWJsZScgb3IgYW55dGhpbmcgZWxzZVxuICAgICAqIEBwYXJhbSBib29sQXNJbnQge2Jvb2xlYW59IHJldHVybiAwIG9yIDEgZm9yIGJvb2xlYW5zXG4gICAgICogQHJldHVybiB7bWl4ZWR9XG4gICAgICovXG4gICAgVXRpbHMuY2hhbmdlVHlwZSA9IGZ1bmN0aW9uICh2YWx1ZSwgdHlwZSwgYm9vbEFzSW50KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW50ZWdlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgJ2RvdWJsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgdmFyIGJvb2wgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlLnRyaW0oKSA9PT0gJzEnIHx8IHZhbHVlID09PSAxO1xuICAgICAgICAgICAgICAgIHJldHVybiBib29sQXNJbnQgPyAoYm9vbCA/IDEgOiAwKSA6IGJvb2w7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGUgc3RyaW5nIGxpa2UgbXlzcWxfcmVhbF9lc2NhcGVfc3RyaW5nXG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFV0aWxzLmVzY2FwZVN0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFwwXFxuXFxyXFxiXFxcXFxcJ1xcXCJdL2csIGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1xcMCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1xcXFwwJztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnXFxuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnXFxcXG4nO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdcXHInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdcXFxccic7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1xcYic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1xcXFxiJztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnXFxcXCcgKyBzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyB1Z2xpZnkgY29tcGxpYW50XG4gICAgICAgICAgICAucmVwbGFjZSgvXFx0L2csICdcXFxcdCcpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFx4MWEvZywgJ1xcXFxaJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVzY2FwZSB2YWx1ZSBmb3IgdXNlIGluIHJlZ2V4XG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFV0aWxzLmVzY2FwZVJlZ0V4cCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGUgSFRNTCBlbGVtZW50IGlkXG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFV0aWxzLmVzY2FwZUVsZW1lbnRJZCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgLy8gUmVnZXggYmFzZWQgb24gdGhhdCBzdWdnZXN0ZWQgYnk6XG4gICAgICAgIC8vIGh0dHBzOi8vbGVhcm4uanF1ZXJ5LmNvbS91c2luZy1qcXVlcnktY29yZS9mYXEvaG93LWRvLWktc2VsZWN0LWFuLWVsZW1lbnQtYnktYW4taWQtdGhhdC1oYXMtY2hhcmFjdGVycy11c2VkLWluLWNzcy1ub3RhdGlvbi9cbiAgICAgICAgLy8gLSBlc2NhcGVzIDogLiBbIF0gLFxuICAgICAgICAvLyAtIGF2b2lkcyBlc2NhcGluZyBhbHJlYWR5IGVzY2FwZWQgdmFsdWVzXG4gICAgICAgIHJldHVybiAoc3RyKSA/IHN0ci5yZXBsYWNlKC8oXFxcXCk/KFs6LlxcW1xcXSxdKS9nLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJDEgPyAkMCA6ICdcXFxcJyArICQyO1xuICAgICAgICAgICAgfSkgOiBzdHI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNvcnQgb2JqZWN0cyBieSBncm91cGluZyB0aGVtIGJ5IHtrZXl9LCBwcmVzZXJ2aW5nIGluaXRpYWwgb3JkZXIgd2hlbiBwb3NzaWJsZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IGl0ZW1zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zIHtvYmplY3RbXX1cbiAgICAgKi9cbiAgICBVdGlscy5ncm91cFNvcnQgPSBmdW5jdGlvbiAoaXRlbXMsIGtleSkge1xuICAgICAgICB2YXIgb3B0Z3JvdXBzID0gW107XG4gICAgICAgIHZhciBuZXdJdGVtcyA9IFtdO1xuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBpZHg7XG5cbiAgICAgICAgICAgIGlmIChpdGVtW2tleV0pIHtcbiAgICAgICAgICAgICAgICBpZHggPSBvcHRncm91cHMubGFzdEluZGV4T2YoaXRlbVtrZXldKTtcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWR4ID0gb3B0Z3JvdXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlkeCA9IG9wdGdyb3Vwcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9wdGdyb3Vwcy5zcGxpY2UoaWR4LCAwLCBpdGVtW2tleV0pO1xuICAgICAgICAgICAgbmV3SXRlbXMuc3BsaWNlKGlkeCwgMCwgaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdJdGVtcztcbiAgICB9O1xuXG5cbiAgICAkLmZuLnF1ZXJ5QnVpbGRlciA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdVbmFibGUgdG8gaW5pdGlhbGl6ZSBvbiBtdWx0aXBsZSB0YXJnZXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhKCdxdWVyeUJ1aWxkZXInKTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pIHx8IHt9O1xuXG4gICAgICAgIGlmICghZGF0YSAmJiBvcHRpb24gPT0gJ2Rlc3Ryb3knKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSgncXVlcnlCdWlsZGVyJywgbmV3IFF1ZXJ5QnVpbGRlcih0aGlzLCBvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhW29wdGlvbl0uYXBwbHkoZGF0YSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgJC5mbi5xdWVyeUJ1aWxkZXIuY29uc3RydWN0b3IgPSBRdWVyeUJ1aWxkZXI7XG4gICAgJC5mbi5xdWVyeUJ1aWxkZXIuZGVmYXVsdHMgPSBRdWVyeUJ1aWxkZXIuZGVmYXVsdHM7XG4gICAgJC5mbi5xdWVyeUJ1aWxkZXIuZXh0ZW5kID0gUXVlcnlCdWlsZGVyLmV4dGVuZDtcbiAgICAkLmZuLnF1ZXJ5QnVpbGRlci5kZWZpbmUgPSBRdWVyeUJ1aWxkZXIuZGVmaW5lO1xuICAgICQuZm4ucXVlcnlCdWlsZGVyLnJlZ2lvbmFsID0gUXVlcnlCdWlsZGVyLnJlZ2lvbmFsO1xuXG5cbiAgICAvKiFcbiAgICAgKiBqUXVlcnkgUXVlcnlCdWlsZGVyIEF3ZXNvbWUgQm9vdHN0cmFwIENoZWNrYm94XG4gICAgICogQXBwbGllcyBBd2Vzb21lIEJvb3RzdHJhcCBDaGVja2JveCBmb3IgY2hlY2tib3ggYW5kIHJhZGlvIGlucHV0cy5cbiAgICAgKi9cblxuICAgIFF1ZXJ5QnVpbGRlci5kZWZpbmUoJ2J0LWNoZWNrYm94JywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZm9udCA9PSAnZ2x5cGhpY29ucycpIHtcbiAgICAgICAgICAgIHZhciBpbmplY3RDU1MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgaW5qZWN0Q1NTLmlubmVySFRNTCA9ICdcXFxuLmNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQgKyBsYWJlbDphZnRlciB7IFxcXG4gICAgZm9udC1mYW1pbHk6IFwiR2x5cGhpY29ucyBIYWxmbGluZ3NcIjsgXFxcbiAgICBjb250ZW50OiBcIlxcXFxlMDEzXCI7IFxcXG59IFxcXG4uY2hlY2tib3ggbGFiZWw6YWZ0ZXIgeyBcXFxuICAgIHBhZGRpbmctbGVmdDogNHB4OyBcXFxuICAgIHBhZGRpbmctdG9wOiAycHg7IFxcXG4gICAgZm9udC1zaXplOiA5cHg7IFxcXG59JztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5qZWN0Q1NTKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub24oJ2dldFJ1bGVJbnB1dC5maWx0ZXInLCBmdW5jdGlvbiAoaCwgcnVsZSwgbmFtZSkge1xuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHJ1bGUuZmlsdGVyO1xuXG4gICAgICAgICAgICBpZiAoKGZpbHRlci5pbnB1dCA9PT0gJ3JhZGlvJyB8fCBmaWx0ZXIuaW5wdXQgPT09ICdjaGVja2JveCcpICYmICFmaWx0ZXIucGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgaC52YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIuY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jb2xvcnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY29sb3JzLl9kZWZfID0gZmlsdGVyLmNvbG9yO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IGZpbHRlci52ZXJ0aWNhbCA/ICcgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCInIDogJyc7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICAgICAgICAgICAgVXRpbHMuaXRlcmF0ZU9wdGlvbnMoZmlsdGVyLnZhbHVlcywgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IGZpbHRlci5jb2xvcnNba2V5XSB8fCBmaWx0ZXIuY29sb3JzLl9kZWZfIHx8IG9wdGlvbnMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG5hbWUgKyAnXycgKyAoaSsrKTtcblxuICAgICAgICAgICAgICAgICAgICBoLnZhbHVlICs9ICdcXFxuPGRpdicgKyBzdHlsZSArICcgY2xhc3M9XCInICsgZmlsdGVyLmlucHV0ICsgJyAnICsgZmlsdGVyLmlucHV0ICsgJy0nICsgY29sb3IgKyAnXCI+IFxcXG4gIDxpbnB1dCB0eXBlPVwiJyArIGZpbHRlci5pbnB1dCArICdcIiBuYW1lPVwiJyArIG5hbWUgKyAnXCIgaWQ9XCInICsgaWQgKyAnXCIgdmFsdWU9XCInICsga2V5ICsgJ1wiPiBcXFxuICA8bGFiZWwgZm9yPVwiJyArIGlkICsgJ1wiPicgKyB2YWwgKyAnPC9sYWJlbD4gXFxcbjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIHtcbiAgICAgICAgZm9udDogJ2dseXBoaWNvbnMnLFxuICAgICAgICBjb2xvcjogJ2RlZmF1bHQnXG4gICAgfSk7XG5cblxuICAgIC8qIVxuICAgICAqIGpRdWVyeSBRdWVyeUJ1aWxkZXIgQm9vdHN0cmFwIFNlbGVjdHBpY2tlclxuICAgICAqIEFwcGxpZXMgQm9vdHN0cmFwIFNlbGVjdCBvbiBmaWx0ZXJzIGFuZCBvcGVyYXRvcnMgY29tYm8tYm94ZXMuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAdGhyb3dzIENvbmZpZ0Vycm9yXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLmRlZmluZSgnYnQtc2VsZWN0cGlja2VyJywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCEkLmZuLnNlbGVjdHBpY2tlciB8fCAhJC5mbi5zZWxlY3RwaWNrZXIuQ29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNaXNzaW5nTGlicmFyeScsICdCb290c3RyYXAgU2VsZWN0IGlzIHJlcXVpcmVkIHRvIHVzZSBcImJ0LXNlbGVjdHBpY2tlclwiIHBsdWdpbi4gR2V0IGl0IGhlcmU6IGh0dHA6Ly9zaWx2aW9tb3JldG8uZ2l0aHViLmlvL2Jvb3RzdHJhcC1zZWxlY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXQgc2VsZWN0cGlja2VyXG4gICAgICAgIHRoaXMub24oJ2FmdGVyQ3JlYXRlUnVsZUZpbHRlcnMnLCBmdW5jdGlvbiAoZSwgcnVsZSkge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9maWx0ZXIpLnJlbW92ZUNsYXNzKCdmb3JtLWNvbnRyb2wnKS5zZWxlY3RwaWNrZXIob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub24oJ2FmdGVyQ3JlYXRlUnVsZU9wZXJhdG9ycycsIGZ1bmN0aW9uIChlLCBydWxlKSB7XG4gICAgICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX29wZXJhdG9yKS5yZW1vdmVDbGFzcygnZm9ybS1jb250cm9sJykuc2VsZWN0cGlja2VyKG9wdGlvbnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB1cGRhdGUgc2VsZWN0cGlja2VyIG9uIGNoYW5nZVxuICAgICAgICB0aGlzLm9uKCdhZnRlclVwZGF0ZVJ1bGVGaWx0ZXInLCBmdW5jdGlvbiAoZSwgcnVsZSkge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9maWx0ZXIpLnNlbGVjdHBpY2tlcigncmVuZGVyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub24oJ2FmdGVyVXBkYXRlUnVsZU9wZXJhdG9yJywgZnVuY3Rpb24gKGUsIHJ1bGUpIHtcbiAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfb3BlcmF0b3IpLnNlbGVjdHBpY2tlcigncmVuZGVyJyk7XG4gICAgICAgIH0pO1xuICAgIH0sIHtcbiAgICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICAgIHN0eWxlOiAnYnRuLWludmVyc2UgYnRuLXhzJyxcbiAgICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgICAgc2hvd0ljb246IGZhbHNlXG4gICAgfSk7XG5cblxuICAgIC8qIVxuICAgICAqIGpRdWVyeSBRdWVyeUJ1aWxkZXIgQm9vdHN0cmFwIFRvb2x0aXAgZXJyb3JzXG4gICAgICogQXBwbGllcyBCb290c3RyYXAgVG9vbHRpcHMgb24gdmFsaWRhdGlvbiBlcnJvciBtZXNzYWdlcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEB0aHJvd3MgQ29uZmlnRXJyb3JcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuZGVmaW5lKCdidC10b29sdGlwLWVycm9ycycsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmICghJC5mbi50b29sdGlwIHx8ICEkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgfHwgISQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5wcm90b3R5cGUuZml4VGl0bGUpIHtcbiAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNaXNzaW5nTGlicmFyeScsICdCb290c3RyYXAgVG9vbHRpcCBpcyByZXF1aXJlZCB0byB1c2UgXCJidC10b29sdGlwLWVycm9yc1wiIHBsdWdpbi4gR2V0IGl0IGhlcmU6IGh0dHA6Ly9nZXRib290c3RyYXAuY29tJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gYWRkIEJUIFRvb2x0aXAgZGF0YVxuICAgICAgICB0aGlzLm9uKCdnZXRSdWxlVGVtcGxhdGUuZmlsdGVyIGdldEdyb3VwVGVtcGxhdGUuZmlsdGVyJywgZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgICAgIHZhciAkaCA9ICQoaC52YWx1ZSk7XG4gICAgICAgICAgICAkaC5maW5kKFNlbGVjdG9ycy5lcnJvcl9jb250YWluZXIpLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3Rvb2x0aXAnKTtcbiAgICAgICAgICAgIGgudmFsdWUgPSAkaC5wcm9wKCdvdXRlckhUTUwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaW5pdC9yZWZyZXNoIHRvb2x0aXAgd2hlbiB0aXRsZSBjaGFuZ2VzXG4gICAgICAgIHRoaXMubW9kZWwub24oJ3VwZGF0ZScsIGZ1bmN0aW9uIChlLCBub2RlLCBmaWVsZCkge1xuICAgICAgICAgICAgaWYgKGZpZWxkID09ICdlcnJvcicgJiYgc2VsZi5zZXR0aW5ncy5kaXNwbGF5X2Vycm9ycykge1xuICAgICAgICAgICAgICAgIG5vZGUuJGVsLmZpbmQoU2VsZWN0b3JzLmVycm9yX2NvbnRhaW5lcikuZXEoMClcbiAgICAgICAgICAgICAgICAgICAgLnRvb2x0aXAob3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLnRvb2x0aXAoJ2hpZGUnKVxuICAgICAgICAgICAgICAgICAgICAudG9vbHRpcCgnZml4VGl0bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwge1xuICAgICAgICBwbGFjZW1lbnQ6ICdyaWdodCdcbiAgICB9KTtcblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciBDaGFuZ2UgRmlsdGVyc1xuICAgICAqIEFsbG93cyB0byBjaGFuZ2UgYXZhaWxhYmxlIGZpbHRlcnMgYWZ0ZXIgcGx1Z2luIGluaXRpYWxpemF0aW9uLlxuICAgICAqL1xuXG4gICAgUXVlcnlCdWlsZGVyLmV4dGVuZCh7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2UgdGhlIGZpbHRlcnMgb2YgdGhlIGJ1aWxkZXJcbiAgICAgICAgICogQHRocm93cyBDaGFuZ2VGaWx0ZXJFcnJvclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW4sb3B0aW9uYWx9IGRlbGV0ZSBydWxlcyB1c2luZyBvbGQgZmlsdGVyc1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBuZXcgZmlsdGVyc1xuICAgICAgICAgKi9cbiAgICAgICAgc2V0RmlsdGVyczogZnVuY3Rpb24gKGRlbGV0ZV9vcnBoYW5zLCBmaWx0ZXJzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmIChmaWx0ZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0gZGVsZXRlX29ycGhhbnM7XG4gICAgICAgICAgICAgICAgZGVsZXRlX29ycGhhbnMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlsdGVycyA9IHRoaXMuY2hlY2tGaWx0ZXJzKGZpbHRlcnMpO1xuICAgICAgICAgICAgZmlsdGVycyA9IHRoaXMuY2hhbmdlKCdzZXRGaWx0ZXJzJywgZmlsdGVycyk7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXJzSWRzID0gZmlsdGVycy5tYXAoZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXIuaWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG9ycGhhbnNcbiAgICAgICAgICAgIGlmICghZGVsZXRlX29ycGhhbnMpIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tPcnBoYW5zKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5lYWNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5maWx0ZXIgJiYgZmlsdGVyc0lkcy5pbmRleE9mKHJ1bGUuZmlsdGVyLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NoYW5nZUZpbHRlcicsICdBIHJ1bGUgaXMgdXNpbmcgZmlsdGVyIFwiezB9XCInLCBydWxlLmZpbHRlci5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrT3JwaGFuc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0odGhpcy5tb2RlbC5yb290KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgZmlsdGVyc1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcblxuICAgICAgICAgICAgLy8gYXBwbHkgb24gZXhpc3RpbmcgRE9NXG4gICAgICAgICAgICAoZnVuY3Rpb24gdXBkYXRlQnVpbGRlcihub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5lYWNoKHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5maWx0ZXIgJiYgZmlsdGVyc0lkcy5pbmRleE9mKHJ1bGUuZmlsdGVyLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlLmRyb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3JlYXRlUnVsZUZpbHRlcnMocnVsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2ZpbHRlcikudmFsKHJ1bGUuZmlsdGVyID8gcnVsZS5maWx0ZXIuaWQgOiAnLTEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnVpbGRlclxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KHRoaXMubW9kZWwucm9vdCkpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgcGx1Z2luc1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucGx1Z2lucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnBsdWdpbnNbJ3VuaXF1ZS1maWx0ZXInXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURpc2FibGVkRmlsdGVycygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5wbHVnaW5zWydidC1zZWxlY3RwaWNrZXInXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2ZpbHRlcikuc2VsZWN0cGlja2VyKCdyZW5kZXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBkZWZhdWx0X2ZpbHRlciBpZiBkb2VzIG5vdCBleGlzdCBhbnltb3JlXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWZhdWx0X2ZpbHRlcikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyQnlJZCh0aGlzLnNldHRpbmdzLmRlZmF1bHRfZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X2ZpbHRlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyU2V0RmlsdGVycycsIGZpbHRlcnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIGEgbmV3IGZpbHRlciB0byB0aGUgYnVpbGRlclxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdHxvYmplY3RbXX0gdGhlIG5ldyBmaWx0ZXJcbiAgICAgICAgICogQHBhcmFtIHttaXhlZCxvcHRpb25hbH0gbnVtZXJpYyBpbmRleCBvciAnI3N0YXJ0JyBvciAnI2VuZCdcbiAgICAgICAgICovXG4gICAgICAgIGFkZEZpbHRlcjogZnVuY3Rpb24gKG5ld19maWx0ZXJzLCBwb3NpdGlvbikge1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPT0gJyNlbmQnKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmZpbHRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocG9zaXRpb24gPT0gJyNzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJC5pc0FycmF5KG5ld19maWx0ZXJzKSkge1xuICAgICAgICAgICAgICAgIG5ld19maWx0ZXJzID0gW25ld19maWx0ZXJzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5maWx0ZXJzKTtcblxuICAgICAgICAgICAgLy8gbnVtZXJpYyBwb3NpdGlvblxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHBvc2l0aW9uKSA9PSBwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoZmlsdGVycywgW3Bvc2l0aW9uLCAwXS5jb25jYXQobmV3X2ZpbHRlcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFmdGVyIGZpbHRlciBieSBpdHMgaWRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGZpbHRlciwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaWQgPT0gcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShmaWx0ZXJzLCBbcG9zaXRpb24sIDBdLmNvbmNhdChuZXdfZmlsdGVycykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0cyB0byBlbmQgb2YgbGlzdFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShmaWx0ZXJzLCBuZXdfZmlsdGVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldEZpbHRlcnMoZmlsdGVycyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYSBmaWx0ZXIgZnJvbSB0aGUgYnVpbGRlclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gdGhlIGZpbHRlciBpZFxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW4sb3B0aW9uYWx9IGRlbGV0ZSBydWxlcyB1c2luZyBvbGQgZmlsdGVyc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlRmlsdGVyOiBmdW5jdGlvbiAoZmlsdGVyX2lkcywgZGVsZXRlX29ycGhhbnMpIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJzID0gJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMuZmlsdGVycyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlcl9pZHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyX2lkcyA9IFtmaWx0ZXJfaWRzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlsdGVycyA9IGZpbHRlcnMuZmlsdGVyKGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyX2lkcy5pbmRleE9mKGZpbHRlci5pZCkgPT09IC0xO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RmlsdGVycyhkZWxldGVfb3JwaGFucywgZmlsdGVycyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciBGaWx0ZXIgRGVzY3JpcHRpb25cbiAgICAgKiBQcm92aWRlcyB0aHJlZSB3YXlzIHRvIGRpc3BsYXkgYSBkZXNjcmlwdGlvbiBhYm91dCBhIGZpbHRlcjogaW5saW5lLCBCb290c3JhcCBQb3BvdmVyIG9yIEJvb3Rib3guXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAdGhyb3dzIENvbmZpZ0Vycm9yXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLmRlZmluZSgnZmlsdGVyLWRlc2NyaXB0aW9uJywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElOTElORVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2FmdGVyVXBkYXRlUnVsZUZpbHRlcicsIGZ1bmN0aW9uIChlLCBydWxlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRwID0gcnVsZS4kZWwuZmluZCgncC5maWx0ZXItZGVzY3JpcHRpb24nKTtcblxuICAgICAgICAgICAgICAgIGlmICghcnVsZS5maWx0ZXIgfHwgIXJ1bGUuZmlsdGVyLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICRwLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkcC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRwID0gJCgnPHAgY2xhc3M9XCJmaWx0ZXItZGVzY3JpcHRpb25cIj48L3A+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcC5hcHBlbmRUbyhydWxlLiRlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcC5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkcC5odG1sKCc8aSBjbGFzcz1cIicgKyBvcHRpb25zLmljb24gKyAnXCI+PC9pPiAnICsgcnVsZS5maWx0ZXIuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQT1BPVkVSXG4gICAgICAgICAqL1xuICAgICAgICBlbHNlIGlmIChvcHRpb25zLm1vZGUgPT09ICdwb3BvdmVyJykge1xuICAgICAgICAgICAgaWYgKCEkLmZuLnBvcG92ZXIgfHwgISQuZm4ucG9wb3Zlci5Db25zdHJ1Y3RvciB8fCAhJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yLnByb3RvdHlwZS5maXhUaXRsZSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNaXNzaW5nTGlicmFyeScsICdCb290c3RyYXAgUG9wb3ZlciBpcyByZXF1aXJlZCB0byB1c2UgXCJmaWx0ZXItZGVzY3JpcHRpb25cIiBwbHVnaW4uIEdldCBpdCBoZXJlOiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uKCdhZnRlclVwZGF0ZVJ1bGVGaWx0ZXInLCBmdW5jdGlvbiAoZSwgcnVsZSkge1xuICAgICAgICAgICAgICAgIHZhciAkYiA9IHJ1bGUuJGVsLmZpbmQoJ2J1dHRvbi5maWx0ZXItZGVzY3JpcHRpb24nKTtcblxuICAgICAgICAgICAgICAgIGlmICghcnVsZS5maWx0ZXIgfHwgIXJ1bGUuZmlsdGVyLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICRiLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGIuZGF0YSgnYnMucG9wb3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkYi5wb3BvdmVyKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkYi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRiID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1pbmZvIGZpbHRlci1kZXNjcmlwdGlvblwiIGRhdGEtdG9nZ2xlPVwicG9wb3ZlclwiPjxpIGNsYXNzPVwiJyArIG9wdGlvbnMuaWNvbiArICdcIj48L2k+PC9idXR0b24+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkYi5wcmVwZW5kVG8ocnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9hY3Rpb25zKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRiLnBvcG92ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYi5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGIucG9wb3ZlcignaGlkZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkYi5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkYi5kYXRhKCdicy5wb3BvdmVyJykub3B0aW9ucy5jb250ZW50ID0gcnVsZS5maWx0ZXIuZGVzY3JpcHRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRiLmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGIucG9wb3Zlcignc2hvdycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJPT1RCT1hcbiAgICAgICAgICovXG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMubW9kZSA9PT0gJ2Jvb3Rib3gnKSB7XG4gICAgICAgICAgICBpZiAoISgnYm9vdGJveCcgaW4gd2luZG93KSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNaXNzaW5nTGlicmFyeScsICdCb290Ym94IGlzIHJlcXVpcmVkIHRvIHVzZSBcImZpbHRlci1kZXNjcmlwdGlvblwiIHBsdWdpbi4gR2V0IGl0IGhlcmU6IGh0dHA6Ly9ib290Ym94anMuY29tJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub24oJ2FmdGVyVXBkYXRlUnVsZUZpbHRlcicsIGZ1bmN0aW9uIChlLCBydWxlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRiID0gcnVsZS4kZWwuZmluZCgnYnV0dG9uLmZpbHRlci1kZXNjcmlwdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFydWxlLmZpbHRlciB8fCAhcnVsZS5maWx0ZXIuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgJGIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRiLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGIgPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLWluZm8gZmlsdGVyLWRlc2NyaXB0aW9uXCIgZGF0YS10b2dnbGU9XCJib290Ym94XCI+PGkgY2xhc3M9XCInICsgb3B0aW9ucy5pY29uICsgJ1wiPjwvaT48L2J1dHRvbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRiLnByZXBlbmRUbyhydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2FjdGlvbnMpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb3Rib3guYWxlcnQoJGIuZGF0YSgnZGVzY3JpcHRpb24nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRiLmRhdGEoJ2Rlc2NyaXB0aW9uJywgcnVsZS5maWx0ZXIuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBpY29uOiAnZ2x5cGhpY29uIGdseXBoaWNvbi1pbmZvLXNpZ24nLFxuICAgICAgICBtb2RlOiAncG9wb3ZlcidcbiAgICB9KTtcblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciBJbnZlcnRcbiAgICAgKiBBbGxvd3MgdG8gaW52ZXJ0IGEgcnVsZSBvcGVyYXRvciwgYSBncm91cCBjb25kaXRpb24gb3IgdGhlIGVudGlyZSBidWlsZGVyLlxuICAgICAqL1xuXG4gICAgUXVlcnlCdWlsZGVyLmRlZmF1bHRzKHtcbiAgICAgICAgb3BlcmF0b3JPcHBvc2l0ZXM6IHtcbiAgICAgICAgICAgICdlcXVhbCc6ICdub3RfZXF1YWwnLFxuICAgICAgICAgICAgJ25vdF9lcXVhbCc6ICdlcXVhbCcsXG4gICAgICAgICAgICAnaW4nOiAnbm90X2luJyxcbiAgICAgICAgICAgICdub3RfaW4nOiAnaW4nLFxuICAgICAgICAgICAgJ2xlc3MnOiAnZ3JlYXRlcl9vcl9lcXVhbCcsXG4gICAgICAgICAgICAnbGVzc19vcl9lcXVhbCc6ICdncmVhdGVyJyxcbiAgICAgICAgICAgICdncmVhdGVyJzogJ2xlc3Nfb3JfZXF1YWwnLFxuICAgICAgICAgICAgJ2dyZWF0ZXJfb3JfZXF1YWwnOiAnbGVzcycsXG4gICAgICAgICAgICAnYmV0d2Vlbic6ICdub3RfYmV0d2VlbicsXG4gICAgICAgICAgICAnbm90X2JldHdlZW4nOiAnYmV0d2VlbicsXG4gICAgICAgICAgICAnYmVnaW5zX3dpdGgnOiAnbm90X2JlZ2luc193aXRoJyxcbiAgICAgICAgICAgICdub3RfYmVnaW5zX3dpdGgnOiAnYmVnaW5zX3dpdGgnLFxuICAgICAgICAgICAgJ2NvbnRhaW5zJzogJ25vdF9jb250YWlucycsXG4gICAgICAgICAgICAnbm90X2NvbnRhaW5zJzogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgICdlbmRzX3dpdGgnOiAnbm90X2VuZHNfd2l0aCcsXG4gICAgICAgICAgICAnbm90X2VuZHNfd2l0aCc6ICdlbmRzX3dpdGgnLFxuICAgICAgICAgICAgJ2lzX2VtcHR5JzogJ2lzX25vdF9lbXB0eScsXG4gICAgICAgICAgICAnaXNfbm90X2VtcHR5JzogJ2lzX2VtcHR5JyxcbiAgICAgICAgICAgICdpc19udWxsJzogJ2lzX25vdF9udWxsJyxcbiAgICAgICAgICAgICdpc19ub3RfbnVsbCc6ICdpc19udWxsJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbmRpdGlvbk9wcG9zaXRlczoge1xuICAgICAgICAgICAgJ0FORCc6ICdPUicsXG4gICAgICAgICAgICAnT1InOiAnQU5EJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBRdWVyeUJ1aWxkZXIuZGVmaW5lKCdpbnZlcnQnLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJpbmQgZXZlbnRzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uKCdhZnRlckluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLiRlbC5vbignY2xpY2sucXVlcnlCdWlsZGVyJywgJ1tkYXRhLWludmVydD1ncm91cF0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRncm91cCA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMuZ3JvdXBfY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBzZWxmLmludmVydChNb2RlbCgkZ3JvdXApLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kaXNwbGF5X3J1bGVzX2J1dHRvbiAmJiBvcHRpb25zLmludmVydF9ydWxlcykge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsLm9uKCdjbGljay5xdWVyeUJ1aWxkZXInLCAnW2RhdGEtaW52ZXJ0PXJ1bGVdJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHJ1bGUgPSAkKHRoaXMpLmNsb3Nlc3QoU2VsZWN0b3JzLnJ1bGVfY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnZlcnQoTW9kZWwoJHJ1bGUpLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vZGlmeSB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub24oJ2dldEdyb3VwVGVtcGxhdGUuZmlsdGVyJywgZnVuY3Rpb24gKGgsIGxldmVsKSB7XG4gICAgICAgICAgICB2YXIgJGggPSAkKGgudmFsdWUpO1xuICAgICAgICAgICAgJGguZmluZChTZWxlY3RvcnMuY29uZGl0aW9uX2NvbnRhaW5lcikuYWZ0ZXIoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tZGVmYXVsdFwiIGRhdGEtaW52ZXJ0PVwiZ3JvdXBcIj48aSBjbGFzcz1cIicgKyBvcHRpb25zLmljb24gKyAnXCI+PC9pPiAnICsgc2VsZi5sYW5nLmludmVydCArICc8L2J1dHRvbj4nKTtcbiAgICAgICAgICAgIGgudmFsdWUgPSAkaC5wcm9wKCdvdXRlckhUTUwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZGlzcGxheV9ydWxlc19idXR0b24gJiYgb3B0aW9ucy5pbnZlcnRfcnVsZXMpIHtcbiAgICAgICAgICAgIHRoaXMub24oJ2dldFJ1bGVUZW1wbGF0ZS5maWx0ZXInLCBmdW5jdGlvbiAoaCkge1xuICAgICAgICAgICAgICAgIHZhciAkaCA9ICQoaC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgJGguZmluZChTZWxlY3RvcnMucnVsZV9hY3Rpb25zKS5wcmVwZW5kKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLWRlZmF1bHRcIiBkYXRhLWludmVydD1cInJ1bGVcIj48aSBjbGFzcz1cIicgKyBvcHRpb25zLmljb24gKyAnXCI+PC9pPiAnICsgc2VsZi5sYW5nLmludmVydCArICc8L2J1dHRvbj4nKTtcbiAgICAgICAgICAgICAgICBoLnZhbHVlID0gJGgucHJvcCgnb3V0ZXJIVE1MJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgaWNvbjogJ2dseXBoaWNvbiBnbHlwaGljb24tcmFuZG9tJyxcbiAgICAgICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgICAgICBpbnZlcnRfcnVsZXM6IHRydWUsXG4gICAgICAgIGRpc3BsYXlfcnVsZXNfYnV0dG9uOiBmYWxzZSxcbiAgICAgICAgc2lsZW50X2ZhaWw6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBRdWVyeUJ1aWxkZXIuZXh0ZW5kKHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludmVydCBhIEdyb3VwLCBhIFJ1bGUgb3IgdGhlIHdob2xlIGJ1aWxkZXJcbiAgICAgICAgICogQHRocm93cyBJbnZlcnRDb25kaXRpb25FcnJvciwgSW52ZXJ0T3BlcmF0b3JFcnJvclxuICAgICAgICAgKiBAcGFyYW0ge05vZGUsb3B0aW9uYWx9XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0LG9wdGlvbmFsfVxuICAgICAgICAgKi9cbiAgICAgICAgaW52ZXJ0OiBmdW5jdGlvbiAobm9kZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGVsLnJvb3QpIHJldHVybjtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbm9kZTtcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tb2RlbC5yb290O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT0gJ29iamVjdCcpIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJlY3Vyc2l2ZSA9PT0gdW5kZWZpbmVkKSBvcHRpb25zLnJlY3Vyc2l2ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pbnZlcnRfcnVsZXMgPT09IHVuZGVmaW5lZCkgb3B0aW9ucy5pbnZlcnRfcnVsZXMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2lsZW50X2ZhaWwgPT09IHVuZGVmaW5lZCkgb3B0aW9ucy5zaWxlbnRfZmFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudHJpZ2dlciA9PT0gdW5kZWZpbmVkKSBvcHRpb25zLnRyaWdnZXIgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgLy8gaW52ZXJ0IGdyb3VwIGNvbmRpdGlvblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbmRpdGlvbk9wcG9zaXRlc1tub2RlLmNvbmRpdGlvbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb25kaXRpb24gPSB0aGlzLnNldHRpbmdzLmNvbmRpdGlvbk9wcG9zaXRlc1tub2RlLmNvbmRpdGlvbl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFvcHRpb25zLnNpbGVudF9mYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdJbnZlcnRDb25kaXRpb24nLCAnVW5rbm93biBpbnZlcnNlIG9mIGNvbmRpdGlvbiBcInswfVwiJywgbm9kZS5jb25kaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZSBjYWxsXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wT3B0cyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zLCB7dHJpZ2dlcjogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5lYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5pbnZlcnRfcnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludmVydChydWxlLCB0ZW1wT3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZlcnQoZ3JvdXAsIHRlbXBPcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFJ1bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5vcGVyYXRvciAmJiAhbm9kZS5maWx0ZXIubm9faW52ZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGludmVydCBydWxlIG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9wZXJhdG9yT3Bwb3NpdGVzW25vZGUub3BlcmF0b3IudHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnZlcnQgPSB0aGlzLnNldHRpbmdzLm9wZXJhdG9yT3Bwb3NpdGVzW25vZGUub3BlcmF0b3IudHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgaW52ZXJ0IGlzIFwiYXV0aG9yaXplZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGUuZmlsdGVyLm9wZXJhdG9ycyB8fCBub2RlLmZpbHRlci5vcGVyYXRvcnMuaW5kZXhPZihpbnZlcnQpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5vcGVyYXRvciA9IHRoaXMuZ2V0T3BlcmF0b3JCeVR5cGUoaW52ZXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghb3B0aW9ucy5zaWxlbnRfZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0ludmVydE9wZXJhdG9yJywgJ1Vua25vd24gaW52ZXJzZSBvZiBvcGVyYXRvciBcInswfVwiJywgbm9kZS5vcGVyYXRvci50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJJbnZlcnQnLCBub2RlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvKiFcbiAgICAgKiBqUXVlcnkgUXVlcnlCdWlsZGVyIE1vbmdvREIgU3VwcG9ydFxuICAgICAqIEFsbG93cyB0byBleHBvcnQgcnVsZXMgYXMgYSBNb25nb0RCIGZpbmQgb2JqZWN0IGFzIHdlbGwgYXMgcG9wdWxhdGluZyB0aGUgYnVpbGRlciBmcm9tIGEgTW9uZ29EQiBvYmplY3QuXG4gICAgICovXG5cbi8vIERFRkFVTFQgQ09ORklHXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUXVlcnlCdWlsZGVyLmRlZmF1bHRzKHtcbiAgICAgICAgbW9uZ29PcGVyYXRvcnM6IHtcbiAgICAgICAgICAgIGVxdWFsOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2WzBdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdF9lcXVhbDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckbmUnOiB2WzBdfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbjogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckaW4nOiB2fTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RfaW46IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJG5pbic6IHZ9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlc3M6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJGx0JzogdlswXX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVzc19vcl9lcXVhbDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckbHRlJzogdlswXX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JlYXRlcjogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckZ3QnOiB2WzBdfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmVhdGVyX29yX2VxdWFsOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRndGUnOiB2WzBdfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZXR3ZWVuOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRndGUnOiB2WzBdLCAnJGx0ZSc6IHZbMV19O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdF9iZXR3ZWVuOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRsdCc6IHZbMF0sICckZ3QnOiB2WzFdfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWdpbnNfd2l0aDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckcmVnZXgnOiAnXicgKyBVdGlscy5lc2NhcGVSZWdFeHAodlswXSl9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdF9iZWdpbnNfd2l0aDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckcmVnZXgnOiAnXig/IScgKyBVdGlscy5lc2NhcGVSZWdFeHAodlswXSkgKyAnKSd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRyZWdleCc6IFV0aWxzLmVzY2FwZVJlZ0V4cCh2WzBdKX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90X2NvbnRhaW5zOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRyZWdleCc6ICdeKCg/IScgKyBVdGlscy5lc2NhcGVSZWdFeHAodlswXSkgKyAnKS4pKiQnLCAnJG9wdGlvbnMnOiAncyd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZHNfd2l0aDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckcmVnZXgnOiBVdGlscy5lc2NhcGVSZWdFeHAodlswXSkgKyAnJCd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdF9lbmRzX3dpdGg6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJHJlZ2V4JzogJyg/PCEnICsgVXRpbHMuZXNjYXBlUmVnRXhwKHZbMF0pICsgJykkJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNfZW1wdHk6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzX25vdF9lbXB0eTogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckbmUnOiAnJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNfbnVsbDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc19ub3RfbnVsbDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckbmUnOiBudWxsfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtb25nb1J1bGVPcGVyYXRvcnM6IHtcbiAgICAgICAgICAgICRuZTogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB2ID0gdi4kbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbCc6IHYsXG4gICAgICAgICAgICAgICAgICAgICdvcCc6IHYgPT09IG51bGwgPyAnaXNfbm90X251bGwnIDogKHYgPT09ICcnID8gJ2lzX25vdF9lbXB0eScgOiAnbm90X2VxdWFsJylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVxOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICd2YWwnOiB2LFxuICAgICAgICAgICAgICAgICAgICAnb3AnOiB2ID09PSBudWxsID8gJ2lzX251bGwnIDogKHYgPT09ICcnID8gJ2lzX2VtcHR5JyA6ICdlcXVhbCcpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkcmVnZXg6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdiA9IHYuJHJlZ2V4O1xuICAgICAgICAgICAgICAgIGlmICh2LnNsaWNlKDAsIDQpID09ICdeKD8hJyAmJiB2LnNsaWNlKC0xKSA9PSAnKScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi5zbGljZSg0LCAtMSksICdvcCc6ICdub3RfYmVnaW5zX3dpdGgnfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodi5zbGljZSgwLCA1KSA9PSAnXigoPyEnICYmIHYuc2xpY2UoLTUpID09ICcpLikqJCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi5zbGljZSg1LCAtNSksICdvcCc6ICdub3RfY29udGFpbnMnfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodi5zbGljZSgwLCA0KSA9PSAnKD88IScgJiYgdi5zbGljZSgtMikgPT0gJykkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiB2LnNsaWNlKDQsIC0yKSwgJ29wJzogJ25vdF9lbmRzX3dpdGgnfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodi5zbGljZSgtMSkgPT0gJyQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuc2xpY2UoMCwgLTEpLCAnb3AnOiAnZW5kc193aXRoJ307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHYuc2xpY2UoMCwgMSkgPT0gJ14nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuc2xpY2UoMSksICdvcCc6ICdiZWdpbnNfd2l0aCd9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdiwgJ29wJzogJ2NvbnRhaW5zJ307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJldHdlZW46IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogW3YuJGd0ZSwgdi4kbHRlXSwgJ29wJzogJ2JldHdlZW4nfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RfYmV0d2VlbjogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiBbdi4kbHQsIHYuJGd0XSwgJ29wJzogJ25vdF9iZXR3ZWVuJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJGluOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuJGluLCAnb3AnOiAnaW4nfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkbmluOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuJG5pbiwgJ29wJzogJ25vdF9pbid9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRsdDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiB2LiRsdCwgJ29wJzogJ2xlc3MnfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkbHRlOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuJGx0ZSwgJ29wJzogJ2xlc3Nfb3JfZXF1YWwnfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkZ3Q6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi4kZ3QsICdvcCc6ICdncmVhdGVyJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJGd0ZTogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiB2LiRndGUsICdvcCc6ICdncmVhdGVyX29yX2VxdWFsJ307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4vLyBQVUJMSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFF1ZXJ5QnVpbGRlci5leHRlbmQoe1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHJ1bGVzIGFzIE1vbmdvREIgcXVlcnlcbiAgICAgICAgICogQHRocm93cyBVbmRlZmluZWRNb25nb0NvbmRpdGlvbkVycm9yLCBVbmRlZmluZWRNb25nb09wZXJhdG9yRXJyb3JcbiAgICAgICAgICogQHBhcmFtIGRhdGEge29iamVjdH0gKG9wdGlvbmFsKSBydWxlc1xuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRNb25nbzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSAoZGF0YSA9PT0gdW5kZWZpbmVkKSA/IHRoaXMuZ2V0UnVsZXMoKSA6IGRhdGE7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBwYXJzZShkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbmRpdGlvbiA9IHNlbGYuc2V0dGluZ3MuZGVmYXVsdF9jb25kaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChbJ0FORCcsICdPUiddLmluZGV4T2YoZGF0YS5jb25kaXRpb24udG9VcHBlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdVbmRlZmluZWRNb25nb0NvbmRpdGlvbicsICdVbmFibGUgdG8gYnVpbGQgTW9uZ29EQiBxdWVyeSB3aXRoIGNvbmRpdGlvbiBcInswfVwiJywgZGF0YS5jb25kaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5ydWxlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gW107XG5cbiAgICAgICAgICAgICAgICBkYXRhLnJ1bGVzLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUucnVsZXMgJiYgcnVsZS5ydWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnNlKHJ1bGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZGIgPSBzZWxmLnNldHRpbmdzLm1vbmdvT3BlcmF0b3JzW3J1bGUub3BlcmF0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wZSA9IHNlbGYuZ2V0T3BlcmF0b3JCeVR5cGUocnVsZS5vcGVyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdVbmRlZmluZWRNb25nb09wZXJhdG9yJywgJ1Vua25vd24gTW9uZ29EQiBvcGVyYXRpb24gZm9yIG9wZXJhdG9yIFwiezB9XCInLCBydWxlLm9wZXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZS5uYl9pbnB1dHMgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShydWxlLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUudmFsdWUgPSBbcnVsZS52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZS52YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKFV0aWxzLmNoYW5nZVR5cGUodiwgcnVsZS50eXBlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydFtydWxlLmZpZWxkXSA9IG1kYi5jYWxsKHNlbGYsIHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzID0ge307XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzWyckJyArIGRhdGEuY29uZGl0aW9uLnRvTG93ZXJDYXNlKCldID0gcGFydHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KGRhdGEpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydCBNb25nb0RCIG9iamVjdCB0byBydWxlc1xuICAgICAgICAgKiBAdGhyb3dzIE1vbmdvUGFyc2VFcnJvciwgVW5kZWZpbmVkTW9uZ29Db25kaXRpb25FcnJvciwgVW5kZWZpbmVkTW9uZ29PcGVyYXRvckVycm9yXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHtvYmplY3R9IHF1ZXJ5IG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRSdWxlc0Zyb21Nb25nbzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY29uZGl0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAnJGFuZCc6ICdBTkQnLFxuICAgICAgICAgICAgICAgICckb3InOiAnT1InXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9wS2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRvcEtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignTW9uZ29QYXJzZScsICdJbnZhbGlkIE1vbmdvREIgcXVlcnkgZm9ybWF0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghY29uZGl0aW9uc1t0b3BLZXlzWzBdLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdVbmRlZmluZWRNb25nb0NvbmRpdGlvbicsICdVbmFibGUgdG8gYnVpbGQgTW9uZ29EQiBxdWVyeSB3aXRoIGNvbmRpdGlvbiBcInswfVwiJywgdG9wS2V5c1swXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJ1bGVzID0gZGF0YVt0b3BLZXlzWzBdXTtcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHJ1bGVzLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhydWxlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uc1trZXlzWzBdLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcnNlKHJ1bGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBydWxlW2ZpZWxkXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wZXJhdG9yID0gZGV0ZXJtaW5lTW9uZ29PcGVyYXRvcih2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignTW9uZ29QYXJzZScsICdJbnZhbGlkIE1vbmdvREIgcXVlcnkgZm9ybWF0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZGJybCA9IHNlbGYuc2V0dGluZ3MubW9uZ29SdWxlT3BlcmF0b3JzW29wZXJhdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZGJybCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZE1vbmdvT3BlcmF0b3InLCAnSlNPTiBSdWxlIG9wZXJhdGlvbiB1bmtub3duIGZvciBvcGVyYXRvciBcInswfVwiJywgb3BlcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BWYWwgPSBtZGJybC5jYWxsKHNlbGYsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBzZWxmLmNoYW5nZSgnZ2V0TW9uZ29EQkZpZWxkSUQnLCBmaWVsZCwgdmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcjogb3BWYWwub3AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wVmFsLnZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByZXMgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXMuY29uZGl0aW9uID0gY29uZGl0aW9uc1t0b3BLZXlzWzBdLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgICAgICByZXMucnVsZXMgPSBwYXJ0cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0oZGF0YSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgcnVsZXMgZnJvbSBNb25nb0RCIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gZGF0YSB7b2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0UnVsZXNGcm9tTW9uZ286IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJ1bGVzKHRoaXMuZ2V0UnVsZXNGcm9tTW9uZ28oZGF0YSkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIHdoaWNoIG9wZXJhdG9yIGlzIHVzZWQgaW4gYSBNb25nb0RCIHN1Yi1vYmplY3RcbiAgICAgKiBAcGFyYW0ge21peGVkfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgICAqIEByZXR1cm4ge3N0cmluZ3x1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZGV0ZXJtaW5lTW9uZ29PcGVyYXRvcih2YWx1ZSwgZmllbGQpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFyIHN1YmtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChzdWJrZXlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJrZXlzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLiRndGUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS4kbHRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdiZXR3ZWVuJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLiRsdCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLiRndCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbm90X2JldHdlZW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZS4kcmVnZXggIT09IHVuZGVmaW5lZCkgeyAvLyBvcHRpb25hbCAkb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyRyZWdleCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdlcSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIVxuICAgICAqIGpRdWVyeSBRdWVyeUJ1aWxkZXIgU29ydGFibGVcbiAgICAgKiBFbmFibGVzIGRyYWcgJiBkcm9wIHNvcnQgb2YgcnVsZXMuXG4gICAgICovXG5cbiAgICBTZWxlY3RvcnMucnVsZV9hbmRfZ3JvdXBfY29udGFpbmVycyA9IFNlbGVjdG9ycy5ydWxlX2NvbnRhaW5lciArICcsICcgKyBTZWxlY3RvcnMuZ3JvdXBfY29udGFpbmVyO1xuXG4gICAgUXVlcnlCdWlsZGVyLmRlZmluZSgnc29ydGFibGUnLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdCBIVE1MNSBkcmFnIGFuZCBkcm9wXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uKCdhZnRlckluaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gY29uZmlndXJlIGpRdWVyeSB0byB1c2UgZGF0YVRyYW5zZmVyXG4gICAgICAgICAgICAkLmV2ZW50LnByb3BzLnB1c2goJ2RhdGFUcmFuc2ZlcicpO1xuXG4gICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXI7XG4gICAgICAgICAgICB2YXIgc3JjO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSBlLmJ1aWxkZXI7XG5cbiAgICAgICAgICAgIC8vIG9ubHkgYWRkIFwiZHJhZ2dhYmxlXCIgYXR0cmlidXRlIHdoZW4gaG92ZXJpbmcgZHJhZyBoYW5kbGVcbiAgICAgICAgICAgIC8vIHByZXZlbnRpbmcgdGV4dCBzZWxlY3QgYnVnIGluIEZpcmVmb3hcbiAgICAgICAgICAgIHNlbGYuJGVsLm9uKCdtb3VzZW92ZXIucXVlcnlCdWlsZGVyJywgJy5kcmFnLWhhbmRsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2FuZF9ncm91cF9jb250YWluZXJzKS5hdHRyKCdkcmFnZ2FibGUnLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi4kZWwub24oJ21vdXNlb3V0LnF1ZXJ5QnVpbGRlcicsICcuZHJhZy1oYW5kbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9hbmRfZ3JvdXBfY29udGFpbmVycykucmVtb3ZlQXR0cignZHJhZ2dhYmxlJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZHJhZ3N0YXJ0OiBjcmVhdGUgcGxhY2Vob2xkZXIgYW5kIGhpZGUgY3VycmVudCBlbGVtZW50XG4gICAgICAgICAgICBzZWxmLiRlbC5vbignZHJhZ3N0YXJ0LnF1ZXJ5QnVpbGRlcicsICdbZHJhZ2dhYmxlXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBkcmFnIGFuZCBkcm9wIChvbmx5IGR1bW15IHRleHQpXG4gICAgICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdkcmFnJyk7XG5cbiAgICAgICAgICAgICAgICBzcmMgPSBNb2RlbChlLnRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaHJvbWUgZ2xpdGNoc1xuICAgICAgICAgICAgICAgIC8vIC0gaGVscGVyIGludmlzaWJsZSBpZiBoaWRkZW4gaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAvLyAtIFwiZHJhZ2VuZFwiIGlzIGNhbGxlZCBpbW1lZGlhdGVseSBpZiB3ZSBtb2RpZnkgdGhlIERPTSBkaXJlY3RseVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGggPSAkKCc8ZGl2IGNsYXNzPVwicnVsZS1wbGFjZWhvbGRlclwiPiZuYnNwOzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBwaC5jc3MoJ21pbi1oZWlnaHQnLCBzcmMuJGVsLmhlaWdodCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9IHNyYy5wYXJlbnQuYWRkUnVsZShwaCwgc3JjLmdldFBvcygpKTtcblxuICAgICAgICAgICAgICAgICAgICBzcmMuJGVsLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkcmFnZW50ZXI6IG1vdmUgdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICBzZWxmLiRlbC5vbignZHJhZ2VudGVyLnF1ZXJ5QnVpbGRlcicsICdbZHJhZ2dhYmxlXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNvcnRhYmxlVG9UYXJnZXQocGxhY2Vob2xkZXIsICQoZS50YXJnZXQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZHJhZ292ZXI6IHByZXZlbnQgZ2xpdGNoZXNcbiAgICAgICAgICAgIHNlbGYuJGVsLm9uKCdkcmFnb3Zlci5xdWVyeUJ1aWxkZXInLCAnW2RyYWdnYWJsZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGRyb3A6IG1vdmUgY3VycmVudCBlbGVtZW50XG4gICAgICAgICAgICBzZWxmLiRlbC5vbignZHJvcC5xdWVyeUJ1aWxkZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgbW92ZVNvcnRhYmxlVG9UYXJnZXQoc3JjLCAkKGUudGFyZ2V0KSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZHJhZ2VuZDogc2hvdyBjdXJyZW50IGVsZW1lbnQgYW5kIGRlbGV0ZSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgc2VsZi4kZWwub24oJ2RyYWdlbmQucXVlcnlCdWlsZGVyJywgJ1tkcmFnZ2FibGVdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHNyYy4kZWwuc2hvdygpO1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLmRyb3AoKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfYW5kX2dyb3VwX2NvbnRhaW5lcnMpLnJlbW92ZUF0dHIoJ2RyYWdnYWJsZScpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyKCdhZnRlck1vdmUnLCBzcmMpO1xuXG4gICAgICAgICAgICAgICAgc3JjID0gcGxhY2Vob2xkZXIgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgZHJhZyBoYW5kbGUgZnJvbSBub24tc29ydGFibGUgcnVsZXNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub24oJ3BhcnNlUnVsZUZsYWdzLmZpbHRlcicsIGZ1bmN0aW9uIChmbGFncykge1xuICAgICAgICAgICAgaWYgKGZsYWdzLnZhbHVlLm5vX3NvcnRhYmxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmbGFncy52YWx1ZS5ub19zb3J0YWJsZSA9IG9wdGlvbnMuZGVmYXVsdF9ub19zb3J0YWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignYWZ0ZXJBcHBseVJ1bGVGbGFncycsIGZ1bmN0aW9uIChlLCBydWxlKSB7XG4gICAgICAgICAgICBpZiAocnVsZS5mbGFncy5ub19zb3J0YWJsZSkge1xuICAgICAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoJy5kcmFnLWhhbmRsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGRyYWcgaGFuZGxlIGZyb20gbm9uLXNvcnRhYmxlIGdyb3Vwc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbigncGFyc2VHcm91cEZsYWdzLmZpbHRlcicsIGZ1bmN0aW9uIChmbGFncykge1xuICAgICAgICAgICAgaWYgKGZsYWdzLnZhbHVlLm5vX3NvcnRhYmxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmbGFncy52YWx1ZS5ub19zb3J0YWJsZSA9IG9wdGlvbnMuZGVmYXVsdF9ub19zb3J0YWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignYWZ0ZXJBcHBseUdyb3VwRmxhZ3MnLCBmdW5jdGlvbiAoZSwgZ3JvdXApIHtcbiAgICAgICAgICAgIGlmIChncm91cC5mbGFncy5ub19zb3J0YWJsZSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLiRlbC5maW5kKCcuZHJhZy1oYW5kbGUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vZGlmeSB0ZW1wbGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub24oJ2dldEdyb3VwVGVtcGxhdGUuZmlsdGVyJywgZnVuY3Rpb24gKGgsIGxldmVsKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyICRoID0gJChoLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAkaC5maW5kKFNlbGVjdG9ycy5jb25kaXRpb25fY29udGFpbmVyKS5hZnRlcignPGRpdiBjbGFzcz1cImRyYWctaGFuZGxlXCI+PGkgY2xhc3M9XCInICsgb3B0aW9ucy5pY29uICsgJ1wiPjwvaT48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICBoLnZhbHVlID0gJGgucHJvcCgnb3V0ZXJIVE1MJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub24oJ2dldFJ1bGVUZW1wbGF0ZS5maWx0ZXInLCBmdW5jdGlvbiAoaCkge1xuICAgICAgICAgICAgdmFyICRoID0gJChoLnZhbHVlKTtcbiAgICAgICAgICAgICRoLmZpbmQoU2VsZWN0b3JzLnJ1bGVfaGVhZGVyKS5hZnRlcignPGRpdiBjbGFzcz1cImRyYWctaGFuZGxlXCI+PGkgY2xhc3M9XCInICsgb3B0aW9ucy5pY29uICsgJ1wiPjwvaT48L2Rpdj4nKTtcbiAgICAgICAgICAgIGgudmFsdWUgPSAkaC5wcm9wKCdvdXRlckhUTUwnKTtcbiAgICAgICAgfSk7XG4gICAgfSwge1xuICAgICAgICBkZWZhdWx0X25vX3NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgaWNvbjogJ2dseXBoaWNvbiBnbHlwaGljb24tc29ydCdcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIE1vdmUgYW4gZWxlbWVudCAocGxhY2Vob2xkZXIgb3IgYWN0dWFsIG9iamVjdCkgZGVwZW5kaW5nIG9uIGFjdGl2ZSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge05vZGV9XG4gICAgICogQHBhcmFtIHtqUXVlcnl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gbW92ZVNvcnRhYmxlVG9UYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gICAgICAgIHZhciBwYXJlbnQ7XG5cbiAgICAgICAgLy8gb24gcnVsZVxuICAgICAgICBwYXJlbnQgPSB0YXJnZXQuY2xvc2VzdChTZWxlY3RvcnMucnVsZV9jb250YWluZXIpO1xuICAgICAgICBpZiAocGFyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudC5tb3ZlQWZ0ZXIoTW9kZWwocGFyZW50KSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvbiBncm91cCBoZWFkZXJcbiAgICAgICAgcGFyZW50ID0gdGFyZ2V0LmNsb3Nlc3QoU2VsZWN0b3JzLmdyb3VwX2hlYWRlcik7XG4gICAgICAgIGlmIChwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSB0YXJnZXQuY2xvc2VzdChTZWxlY3RvcnMuZ3JvdXBfY29udGFpbmVyKTtcbiAgICAgICAgICAgIGVsZW1lbnQubW92ZUF0QmVnaW4oTW9kZWwocGFyZW50KSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvbiBncm91cFxuICAgICAgICBwYXJlbnQgPSB0YXJnZXQuY2xvc2VzdChTZWxlY3RvcnMuZ3JvdXBfY29udGFpbmVyKTtcbiAgICAgICAgaWYgKHBhcmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW1lbnQubW92ZUF0RW5kKE1vZGVsKHBhcmVudCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKiFcbiAgICAgKiBqUXVlcnkgUXVlcnlCdWlsZGVyIFNRTCBTdXBwb3J0XG4gICAgICogQWxsb3dzIHRvIGV4cG9ydCBydWxlcyBhcyBhIFNRTCBXSEVSRSBzdGF0ZW1lbnQgYXMgd2VsbCBhcyBwb3B1bGF0aW5nIHRoZSBidWlsZGVyIGZyb20gYW4gU1FMIHF1ZXJ5LlxuICAgICAqL1xuXG4vLyBERUZBVUxUIENPTkZJR1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFF1ZXJ5QnVpbGRlci5kZWZhdWx0cyh7XG4gICAgICAgIC8qIG9wZXJhdG9ycyBmb3IgaW50ZXJuYWwgLT4gU1FMIGNvbnZlcnNpb24gKi9cbiAgICAgICAgc3FsT3BlcmF0b3JzOiB7XG4gICAgICAgICAgICBlcXVhbDoge29wOiAnPSA/J30sXG4gICAgICAgICAgICBub3RfZXF1YWw6IHtvcDogJyE9ID8nfSxcbiAgICAgICAgICAgIGluOiB7b3A6ICdJTig/KScsIHNlcDogJywgJ30sXG4gICAgICAgICAgICBub3RfaW46IHtvcDogJ05PVCBJTig/KScsIHNlcDogJywgJ30sXG4gICAgICAgICAgICBsZXNzOiB7b3A6ICc8ID8nfSxcbiAgICAgICAgICAgIGxlc3Nfb3JfZXF1YWw6IHtvcDogJzw9ID8nfSxcbiAgICAgICAgICAgIGdyZWF0ZXI6IHtvcDogJz4gPyd9LFxuICAgICAgICAgICAgZ3JlYXRlcl9vcl9lcXVhbDoge29wOiAnPj0gPyd9LFxuICAgICAgICAgICAgYmV0d2Vlbjoge29wOiAnQkVUV0VFTiA/Jywgc2VwOiAnIEFORCAnfSxcbiAgICAgICAgICAgIG5vdF9iZXR3ZWVuOiB7b3A6ICdOT1QgQkVUV0VFTiA/Jywgc2VwOiAnIEFORCAnfSxcbiAgICAgICAgICAgIGJlZ2luc193aXRoOiB7b3A6ICdMSUtFKD8pJywgbW9kOiAnezB9JSd9LFxuICAgICAgICAgICAgbm90X2JlZ2luc193aXRoOiB7b3A6ICdOT1QgTElLRSg/KScsIG1vZDogJ3swfSUnfSxcbiAgICAgICAgICAgIGNvbnRhaW5zOiB7b3A6ICdMSUtFKD8pJywgbW9kOiAnJXswfSUnfSxcbiAgICAgICAgICAgIG5vdF9jb250YWluczoge29wOiAnTk9UIExJS0UoPyknLCBtb2Q6ICclezB9JSd9LFxuICAgICAgICAgICAgZW5kc193aXRoOiB7b3A6ICdMSUtFKD8pJywgbW9kOiAnJXswfSd9LFxuICAgICAgICAgICAgbm90X2VuZHNfd2l0aDoge29wOiAnTk9UIExJS0UoPyknLCBtb2Q6ICclezB9J30sXG4gICAgICAgICAgICBpc19lbXB0eToge29wOiAnPSBcXCdcXCcnfSxcbiAgICAgICAgICAgIGlzX25vdF9lbXB0eToge29wOiAnIT0gXFwnXFwnJ30sXG4gICAgICAgICAgICBpc19udWxsOiB7b3A6ICdJUyBOVUxMJ30sXG4gICAgICAgICAgICBpc19ub3RfbnVsbDoge29wOiAnSVMgTk9UIE5VTEwnfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qIG9wZXJhdG9ycyBmb3IgU1FMIC0+IGludGVybmFsIGNvbnZlcnNpb24gKi9cbiAgICAgICAgc3FsUnVsZU9wZXJhdG9yOiB7XG4gICAgICAgICAgICAnPSc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsOiB2LFxuICAgICAgICAgICAgICAgICAgICBvcDogdiA9PT0gJycgPyAnaXNfZW1wdHknIDogJ2VxdWFsJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJyE9JzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWw6IHYsXG4gICAgICAgICAgICAgICAgICAgIG9wOiB2ID09PSAnJyA/ICdpc19ub3RfZW1wdHknIDogJ25vdF9lcXVhbCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdMSUtFJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodi5zbGljZSgwLCAxKSA9PSAnJScgJiYgdi5zbGljZSgtMSkgPT0gJyUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWw6IHYuc2xpY2UoMSwgLTEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3A6ICdjb250YWlucydcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodi5zbGljZSgwLCAxKSA9PSAnJScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogdi5zbGljZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wOiAnZW5kc193aXRoJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2LnNsaWNlKC0xKSA9PSAnJScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogdi5zbGljZSgwLCAtMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcDogJ2JlZ2luc193aXRoJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1NRTFBhcnNlJywgJ0ludmFsaWQgdmFsdWUgZm9yIExJS0Ugb3BlcmF0b3IgXCJ7MH1cIicsIHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnSU4nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiB2LCBvcDogJ2luJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ05PVCBJTic6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IHYsIG9wOiAnbm90X2luJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJzwnOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiB2LCBvcDogJ2xlc3MnfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnPD0nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiB2LCBvcDogJ2xlc3Nfb3JfZXF1YWwnfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnPic6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IHYsIG9wOiAnZ3JlYXRlcid9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICc+PSc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IHYsIG9wOiAnZ3JlYXRlcl9vcl9lcXVhbCd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdCRVRXRUVOJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3ZhbDogdiwgb3A6ICdiZXR3ZWVuJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ05PVCBCRVRXRUVOJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3ZhbDogdiwgb3A6ICdub3RfYmV0d2Vlbid9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdJUyc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1NRTFBhcnNlJywgJ0ludmFsaWQgdmFsdWUgZm9yIElTIG9wZXJhdG9yJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiBudWxsLCBvcDogJ2lzX251bGwnfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnSVMgTk9UJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignU1FMUGFyc2UnLCAnSW52YWxpZCB2YWx1ZSBmb3IgSVMgb3BlcmF0b3InKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IG51bGwsIG9wOiAnaXNfbm90X251bGwnfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKiBzdGF0ZW1lbnRzIGZvciBpbnRlcm5hbCAtPiBTUUwgY29udmVyc2lvbiAqL1xuICAgICAgICBzcWxTdGF0ZW1lbnRzOiB7XG4gICAgICAgICAgICAncXVlc3Rpb25fbWFyayc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAocnVsZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPyc7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnbnVtYmVyZWQnOiBmdW5jdGlvbiAoY2hhcikge1xuICAgICAgICAgICAgICAgIGlmICghY2hhciB8fCBjaGFyLmxlbmd0aCA+IDEpIGNoYXIgPSAnJCc7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAocnVsZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hhciArIGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ25hbWVkJzogZnVuY3Rpb24gKGNoYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNoYXIgfHwgY2hhci5sZW5ndGggPiAxKSBjaGFyID0gJzonO1xuICAgICAgICAgICAgICAgIHZhciBpbmRleGVzID0ge307XG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKHJ1bGUsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluZGV4ZXNbcnVsZS5maWVsZF0pIGluZGV4ZXNbcnVsZS5maWVsZF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHJ1bGUuZmllbGQgKyAnXycgKyAoaW5kZXhlc1tydWxlLmZpZWxkXSsrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hhciArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKiBzdGF0ZW1lbnRzIGZvciBTUUwgLT4gaW50ZXJuYWwgY29udmVyc2lvbiAqL1xuICAgICAgICBzcWxSdWxlU3RhdGVtZW50OiB7XG4gICAgICAgICAgICAncXVlc3Rpb25fbWFyayc6IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYgPT0gJz8nID8gdmFsdWVzW2luZGV4KytdIDogdjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXNjOiBmdW5jdGlvbiAoc3FsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3FsLnJlcGxhY2UoL1xcPy9nLCAnXFwnP1xcJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdudW1iZXJlZCc6IGZ1bmN0aW9uICh2YWx1ZXMsIGNoYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNoYXIgfHwgY2hhci5sZW5ndGggPiAxKSBjaGFyID0gJyQnO1xuICAgICAgICAgICAgICAgIHZhciByZWdleDEgPSBuZXcgUmVnRXhwKCdeXFxcXCcgKyBjaGFyICsgJ1swLTldKyQnKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVnZXgyID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyBjaGFyICsgJyhbMC05XSspJywgJ2cnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWdleDEudGVzdCh2KSA/IHZhbHVlc1t2LnNsaWNlKDEpIC0gMV0gOiB2O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlc2M6IGZ1bmN0aW9uIChzcWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzcWwucmVwbGFjZShyZWdleDIsICdcXCcnICsgKGNoYXIgPT0gJyQnID8gJyQkJyA6IGNoYXIpICsgJyQxXFwnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ25hbWVkJzogZnVuY3Rpb24gKHZhbHVlcywgY2hhcikge1xuICAgICAgICAgICAgICAgIGlmICghY2hhciB8fCBjaGFyLmxlbmd0aCA+IDEpIGNoYXIgPSAnOic7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4MSA9IG5ldyBSZWdFeHAoJ15cXFxcJyArIGNoYXIpO1xuICAgICAgICAgICAgICAgIHZhciByZWdleDIgPSBuZXcgUmVnRXhwKCdcXFxcJyArIGNoYXIgKyAnKCcgKyBPYmplY3Qua2V5cyh2YWx1ZXMpLmpvaW4oJ3wnKSArICcpJywgJ2cnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWdleDEudGVzdCh2KSA/IHZhbHVlc1t2LnNsaWNlKDEpXSA6IHY7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVzYzogZnVuY3Rpb24gKHNxbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNxbC5yZXBsYWNlKHJlZ2V4MiwgJ1xcJycgKyAoY2hhciA9PSAnJCcgPyAnJCQnIDogY2hhcikgKyAnJDFcXCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4vLyBQVUJMSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFF1ZXJ5QnVpbGRlci5leHRlbmQoe1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHJ1bGVzIGFzIFNRTCBxdWVyeVxuICAgICAgICAgKiBAdGhyb3dzIFVuZGVmaW5lZFNRTENvbmRpdGlvbkVycm9yLCBVbmRlZmluZWRTUUxPcGVyYXRvckVycm9yXG4gICAgICAgICAqIEBwYXJhbSBzdG10IHtib29sZWFufHN0cmluZ30gdXNlIHByZXBhcmVkIHN0YXRlbWVudHMgLSBmYWxzZSwgJ3F1ZXN0aW9uX21hcmsnLCAnbnVtYmVyZWQnLCAnbnVtYmVyZWQoQCknLCAnbmFtZWQnLCAnbmFtZWQoQCknXG4gICAgICAgICAqIEBwYXJhbSBubCB7Ym9vbH0gb3V0cHV0IHdpdGggbmV3IGxpbmVzXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHtvYmplY3R9IChvcHRpb25hbCkgcnVsZXNcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U1FMOiBmdW5jdGlvbiAoc3RtdCwgbmwsIGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSAoZGF0YSA9PT0gdW5kZWZpbmVkKSA/IHRoaXMuZ2V0UnVsZXMoKSA6IGRhdGE7XG4gICAgICAgICAgICBubCA9IChubCA9PT0gdHJ1ZSkgPyAnXFxuJyA6ICcgJztcblxuICAgICAgICAgICAgaWYgKHN0bXQgPT09IHRydWUpIHN0bXQgPSAncXVlc3Rpb25fbWFyayc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0bXQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gZ2V0U3RtdENvbmZpZyhzdG10KTtcbiAgICAgICAgICAgICAgICBzdG10ID0gdGhpcy5zZXR0aW5ncy5zcWxTdGF0ZW1lbnRzW2NvbmZpZ1sxXV0oY29uZmlnWzJdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgc3FsID0gKGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuY29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29uZGl0aW9uID0gc2VsZi5zZXR0aW5ncy5kZWZhdWx0X2NvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFsnQU5EJywgJ09SJ10uaW5kZXhPZihkYXRhLmNvbmRpdGlvbi50b1VwcGVyQ2FzZSgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZFNRTENvbmRpdGlvbicsICdVbmFibGUgdG8gYnVpbGQgU1FMIHF1ZXJ5IHdpdGggY29uZGl0aW9uIFwiezB9XCInLCBkYXRhLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGRhdGEucnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5ydWxlcyAmJiBydWxlLnJ1bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goJygnICsgbmwgKyBwYXJzZShydWxlKSArIG5sICsgJyknICsgbmwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNxbCA9IHNlbGYuc2V0dGluZ3Muc3FsT3BlcmF0b3JzW3J1bGUub3BlcmF0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wZSA9IHNlbGYuZ2V0T3BlcmF0b3JCeVR5cGUocnVsZS5vcGVyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNxbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZFNRTE9wZXJhdG9yJywgJ1Vua25vd24gU1FMIG9wZXJhdGlvbiBmb3Igb3BlcmF0b3IgXCJ7MH1cIicsIHJ1bGUub3BlcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlLm5iX2lucHV0cyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHJ1bGUudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZS52YWx1ZSA9IFtydWxlLnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlLnZhbHVlLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzcWwuc2VwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUudHlwZSA9PSAnaW50ZWdlcicgfHwgcnVsZS50eXBlID09ICdkb3VibGUnIHx8IHJ1bGUudHlwZSA9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBVdGlscy5jaGFuZ2VUeXBlKHYsIHJ1bGUudHlwZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXN0bXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBVdGlscy5lc2NhcGVTdHJpbmcodik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3FsLm1vZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IFV0aWxzLmZtdChzcWwubW9kLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG10KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzdG10LmFkZChydWxlLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSAnXFwnJyArIHYgKyAnXFwnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gdjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHJ1bGUuZmllbGQgKyAnICcgKyBzcWwub3AucmVwbGFjZSgvXFw/LywgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oJyAnICsgZGF0YS5jb25kaXRpb24gKyBubCk7XG4gICAgICAgICAgICB9KGRhdGEpKTtcblxuICAgICAgICAgICAgaWYgKHN0bXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzcWw6IHNxbCxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBzdG10LnJ1bigpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNxbDogc3FsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydCBTUUwgdG8gcnVsZXNcbiAgICAgICAgICogQHRocm93cyBDb25maWdFcnJvciwgU1FMUGFyc2VFcnJvciwgVW5kZWZpbmVkU1FMT3BlcmF0b3JFcnJvclxuICAgICAgICAgKiBAcGFyYW0gZGF0YSB7b2JqZWN0fSBxdWVyeSBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHN0bXQge2Jvb2xlYW58c3RyaW5nfSB1c2UgcHJlcGFyZWQgc3RhdGVtZW50cyAtIGZhbHNlLCAncXVlc3Rpb25fbWFyaycsICdudW1iZXJlZCcsICdudW1iZXJlZChAKScsICduYW1lZCcsICduYW1lZChAKSdcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UnVsZXNGcm9tU1FMOiBmdW5jdGlvbiAoZGF0YSwgc3RtdCkge1xuICAgICAgICAgICAgaWYgKCEoJ1NRTFBhcnNlcicgaW4gd2luZG93KSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNaXNzaW5nTGlicmFyeScsICdTUUxQYXJzZXIgaXMgcmVxdWlyZWQgdG8gcGFyc2UgU1FMIHF1ZXJpZXMuIEdldCBpdCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9taXN0aWMxMDAvc3FsLXBhcnNlcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7c3FsOiBkYXRhfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0bXQgPT09IHRydWUpIHN0bXQgPSAncXVlc3Rpb25fbWFyayc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0bXQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0gZ2V0U3RtdENvbmZpZyhzdG10KTtcbiAgICAgICAgICAgICAgICBzdG10ID0gdGhpcy5zZXR0aW5ncy5zcWxSdWxlU3RhdGVtZW50W2NvbmZpZ1sxXV0oZGF0YS5wYXJhbXMsIGNvbmZpZ1syXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdG10KSB7XG4gICAgICAgICAgICAgICAgZGF0YS5zcWwgPSBzdG10LmVzYyhkYXRhLnNxbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnNxbC50b1VwcGVyQ2FzZSgpLmluZGV4T2YoJ1NFTEVDVCcpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5zcWwgPSAnU0VMRUNUICogRlJPTSB0YWJsZSBXSEVSRSAnICsgZGF0YS5zcWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBTUUxQYXJzZXIucGFyc2UoZGF0YS5zcWwpO1xuXG4gICAgICAgICAgICBpZiAoIXBhcnNlZC53aGVyZSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdTUUxQYXJzZScsICdObyBXSEVSRSBjbGF1c2UgZm91bmQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG91dCA9IHtcbiAgICAgICAgICAgICAgICBjb25kaXRpb246IHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBvdXQ7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiBmbGF0dGVuKGRhdGEsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCdzIGEgbm9kZVxuICAgICAgICAgICAgICAgIGlmIChbJ0FORCcsICdPUiddLmluZGV4T2YoZGF0YS5vcGVyYXRpb24udG9VcHBlckNhc2UoKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHN1Yi1ncm91cCBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCB0aGUgc2FtZSBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGxldmVsXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gMCAmJiBjdXJyLmNvbmRpdGlvbiAhPSBkYXRhLm9wZXJhdGlvbi50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyLnJ1bGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogc2VsZi5zZXR0aW5ncy5kZWZhdWx0X2NvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyID0gY3Vyci5ydWxlc1tjdXJyLnJ1bGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3Vyci5jb25kaXRpb24gPSBkYXRhLm9wZXJhdGlvbi50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc29tZSBtYWdpYyAhXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gY3VycjtcbiAgICAgICAgICAgICAgICAgICAgZmxhdHRlbihkYXRhLmxlZnQsIGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN1cnIgPSBuZXh0O1xuICAgICAgICAgICAgICAgICAgICBmbGF0dGVuKGRhdGEucmlnaHQsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpdCdzIGEgbGVhZlxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZWZ0LnZhbHVlID09PSB1bmRlZmluZWQgfHwgZGF0YS5yaWdodC52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignU1FMUGFyc2UnLCAnTWlzc2luZyBmaWVsZCBhbmQvb3IgdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmlzUGxhaW5PYmplY3QoZGF0YS5yaWdodC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdTUUxQYXJzZScsICdWYWx1ZSBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgezB9LicsIGRhdGEubGVmdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGFycmF5XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNBcnJheShkYXRhLnJpZ2h0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhLnJpZ2h0LnZhbHVlLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGEucmlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWN0dWFsIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RtdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLm1hcChzdG10LnBhcnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gc3RtdC5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IG9wZXJhdG9yXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGVyYXRvciA9IGRhdGEub3BlcmF0aW9uLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PSAnPD4nKSBvcGVyYXRvciA9ICchPSc7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNxbHJsO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0b3IgPT0gJ05PVCBMSUtFJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3FscmwgPSBzZWxmLnNldHRpbmdzLnNxbFJ1bGVPcGVyYXRvclsnTElLRSddO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3FscmwgPSBzZWxmLnNldHRpbmdzLnNxbFJ1bGVPcGVyYXRvcltvcGVyYXRvcl07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3FscmwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZFNRTE9wZXJhdG9yJywgJ0ludmFsaWQgU1FMIG9wZXJhdGlvbiBcInswfVwiLicsIGRhdGEub3BlcmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcFZhbCA9IHNxbHJsLmNhbGwodGhpcywgdmFsdWUsIGRhdGEub3BlcmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09ICdOT1QgTElLRScpIG9wVmFsLm9wID0gJ25vdF8nICsgb3BWYWwub3A7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnRfdmFsdWUgPSBkYXRhLmxlZnQudmFsdWVzLmpvaW4oJy4nKTtcblxuICAgICAgICAgICAgICAgICAgICBjdXJyLnJ1bGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNlbGYuY2hhbmdlKCdnZXRTUUxGaWVsZElEJywgbGVmdF92YWx1ZSwgdmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGxlZnRfdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcjogb3BWYWwub3AsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3BWYWwudmFsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0ocGFyc2VkLndoZXJlLmNvbmRpdGlvbnMsIDApKTtcblxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHJ1bGVzIGZyb20gU1FMXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHtvYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZXRSdWxlc0Zyb21TUUw6IGZ1bmN0aW9uIChkYXRhLCBzdG10KSB7XG4gICAgICAgICAgICB0aGlzLnNldFJ1bGVzKHRoaXMuZ2V0UnVsZXNGcm9tU1FMKGRhdGEsIHN0bXQpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0U3RtdENvbmZpZyhzdG10KSB7XG4gICAgICAgIHZhciBjb25maWcgPSBzdG10Lm1hdGNoKC8ocXVlc3Rpb25fbWFya3xudW1iZXJlZHxuYW1lZCkoPzpcXCgoLilcXCkpPy8pO1xuICAgICAgICBpZiAoIWNvbmZpZykgY29uZmlnID0gW251bGwsICdxdWVzdGlvbl9tYXJrJywgdW5kZWZpbmVkXTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cblxuICAgIC8qIVxuICAgICAqIGpRdWVyeSBRdWVyeUJ1aWxkZXIgVW5pcXVlIEZpbHRlclxuICAgICAqIEFsbG93cyB0byBkZWZpbmUgc29tZSBmaWx0ZXJzIGFzIFwidW5pcXVlXCI6IGllIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBvbmx5IG9uZSBydWxlLCBnbG9iYWxseSBvciBpbiB0aGUgc2FtZSBncm91cC5cbiAgICAgKi9cblxuICAgIFF1ZXJ5QnVpbGRlci5kZWZpbmUoJ3VuaXF1ZS1maWx0ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzLnVzZWRfZmlsdGVycyA9IHt9O1xuXG4gICAgICAgIHRoaXMub24oJ2FmdGVyVXBkYXRlUnVsZUZpbHRlcicsIHRoaXMudXBkYXRlRGlzYWJsZWRGaWx0ZXJzKTtcbiAgICAgICAgdGhpcy5vbignYWZ0ZXJEZWxldGVSdWxlJywgdGhpcy51cGRhdGVEaXNhYmxlZEZpbHRlcnMpO1xuICAgICAgICB0aGlzLm9uKCdhZnRlckNyZWF0ZVJ1bGVGaWx0ZXJzJywgdGhpcy5hcHBseURpc2FibGVkRmlsdGVycyk7XG4gICAgICAgIHRoaXMub24oJ2FmdGVyUmVzZXQnLCB0aGlzLmNsZWFyRGlzYWJsZWRGaWx0ZXJzKTtcbiAgICAgICAgdGhpcy5vbignYWZ0ZXJDbGVhcicsIHRoaXMuY2xlYXJEaXNhYmxlZEZpbHRlcnMpO1xuICAgIH0pO1xuXG4gICAgUXVlcnlCdWlsZGVyLmV4dGVuZCh7XG4gICAgICAgIHVwZGF0ZURpc2FibGVkRmlsdGVyczogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gZSA/IGUuYnVpbGRlciA6IHRoaXM7XG5cbiAgICAgICAgICAgIHNlbGYuc3RhdHVzLnVzZWRfZmlsdGVycyA9IHt9O1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYubW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGdldCB1c2VkIGZpbHRlcnNcbiAgICAgICAgICAgIChmdW5jdGlvbiB3YWxrKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuZWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5maWx0ZXIgJiYgcnVsZS5maWx0ZXIudW5pcXVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc3RhdHVzLnVzZWRfZmlsdGVyc1tydWxlLmZpbHRlci5pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cy51c2VkX2ZpbHRlcnNbcnVsZS5maWx0ZXIuaWRdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5maWx0ZXIudW5pcXVlID09ICdncm91cCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXR1cy51c2VkX2ZpbHRlcnNbcnVsZS5maWx0ZXIuaWRdLnB1c2gocnVsZS5wYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhbGsoZ3JvdXApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfShzZWxmLm1vZGVsLnJvb3QpKTtcblxuICAgICAgICAgICAgc2VsZi5hcHBseURpc2FibGVkRmlsdGVycyhlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhckRpc2FibGVkRmlsdGVyczogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gZSA/IGUuYnVpbGRlciA6IHRoaXM7XG5cbiAgICAgICAgICAgIHNlbGYuc3RhdHVzLnVzZWRfZmlsdGVycyA9IHt9O1xuXG4gICAgICAgICAgICBzZWxmLmFwcGx5RGlzYWJsZWRGaWx0ZXJzKGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFwcGx5RGlzYWJsZWRGaWx0ZXJzOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSBlID8gZS5idWlsZGVyIDogdGhpcztcblxuICAgICAgICAgICAgLy8gcmUtZW5hYmxlIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgIHNlbGYuJGVsLmZpbmQoU2VsZWN0b3JzLmZpbHRlcl9jb250YWluZXIgKyAnIG9wdGlvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyBkaXNhYmxlIHNvbWVcbiAgICAgICAgICAgICQuZWFjaChzZWxmLnN0YXR1cy51c2VkX2ZpbHRlcnMsIGZ1bmN0aW9uIChmaWx0ZXJJZCwgZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWwuZmluZChTZWxlY3RvcnMuZmlsdGVyX2NvbnRhaW5lciArICcgb3B0aW9uW3ZhbHVlPVwiJyArIGZpbHRlcklkICsgJ1wiXTpub3QoOnNlbGVjdGVkKScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5maWx0ZXJfY29udGFpbmVyICsgJyBvcHRpb25bdmFsdWU9XCInICsgZmlsdGVySWQgKyAnXCJdOm5vdCg6c2VsZWN0ZWQpJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIFNlbGVjdHBpY2tlclxuICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MucGx1Z2lucyAmJiBzZWxmLnNldHRpbmdzLnBsdWdpbnNbJ2J0LXNlbGVjdHBpY2tlciddKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9maWx0ZXIpLnNlbGVjdHBpY2tlcigncmVuZGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciAyLjMuM1xuICAgICAqIExvY2FsZTogRW5nbGlzaCAoZW4pXG4gICAgICogQXV0aG9yOiBEYW1pZW4gXCJNaXN0aWNcIiBTb3JlbCwgaHR0cDovL3d3dy5zdHJhbmdlcGxhbmV0LmZyXG4gICAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUKVxuICAgICAqL1xuXG4gICAgUXVlcnlCdWlsZGVyLnJlZ2lvbmFsWydlbiddID0ge1xuICAgICAgICBcIl9fbG9jYWxlXCI6IFwiRW5nbGlzaCAoZW4pXCIsXG4gICAgICAgIFwiX19hdXRob3JcIjogXCJEYW1pZW4gXFxcIk1pc3RpY1xcXCIgU29yZWwsIGh0dHA6Ly93d3cuc3RyYW5nZXBsYW5ldC5mclwiLFxuICAgICAgICBcImFkZF9ydWxlXCI6IFwiQWRkIHJ1bGVcIixcbiAgICAgICAgXCJhZGRfZ3JvdXBcIjogXCJBZGQgZ3JvdXBcIixcbiAgICAgICAgXCJkZWxldGVfcnVsZVwiOiBcIkRlbGV0ZVwiLFxuICAgICAgICBcImRlbGV0ZV9ncm91cFwiOiBcIkRlbGV0ZVwiLFxuICAgICAgICBcImNvbmRpdGlvbnNcIjoge1xuICAgICAgICAgICAgXCJBTkRcIjogXCJBTkRcIixcbiAgICAgICAgICAgIFwiT1JcIjogXCJPUlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwib3BlcmF0b3JzXCI6IHtcbiAgICAgICAgICAgIFwiZXF1YWxcIjogXCJlcXVhbFwiLFxuICAgICAgICAgICAgXCJub3RfZXF1YWxcIjogXCJub3QgZXF1YWxcIixcbiAgICAgICAgICAgIFwiaW5cIjogXCJpblwiLFxuICAgICAgICAgICAgXCJub3RfaW5cIjogXCJub3QgaW5cIixcbiAgICAgICAgICAgIFwibGVzc1wiOiBcImxlc3NcIixcbiAgICAgICAgICAgIFwibGVzc19vcl9lcXVhbFwiOiBcImxlc3Mgb3IgZXF1YWxcIixcbiAgICAgICAgICAgIFwiZ3JlYXRlclwiOiBcImdyZWF0ZXJcIixcbiAgICAgICAgICAgIFwiZ3JlYXRlcl9vcl9lcXVhbFwiOiBcImdyZWF0ZXIgb3IgZXF1YWxcIixcbiAgICAgICAgICAgIFwiYmV0d2VlblwiOiBcImJldHdlZW5cIixcbiAgICAgICAgICAgIFwibm90X2JldHdlZW5cIjogXCJub3QgYmV0d2VlblwiLFxuICAgICAgICAgICAgXCJiZWdpbnNfd2l0aFwiOiBcImJlZ2lucyB3aXRoXCIsXG4gICAgICAgICAgICBcIm5vdF9iZWdpbnNfd2l0aFwiOiBcImRvZXNuJ3QgYmVnaW4gd2l0aFwiLFxuICAgICAgICAgICAgXCJjb250YWluc1wiOiBcImNvbnRhaW5zXCIsXG4gICAgICAgICAgICBcIm5vdF9jb250YWluc1wiOiBcImRvZXNuJ3QgY29udGFpblwiLFxuICAgICAgICAgICAgXCJlbmRzX3dpdGhcIjogXCJlbmRzIHdpdGhcIixcbiAgICAgICAgICAgIFwibm90X2VuZHNfd2l0aFwiOiBcImRvZXNuJ3QgZW5kIHdpdGhcIixcbiAgICAgICAgICAgIFwiaXNfZW1wdHlcIjogXCJpcyBlbXB0eVwiLFxuICAgICAgICAgICAgXCJpc19ub3RfZW1wdHlcIjogXCJpcyBub3QgZW1wdHlcIixcbiAgICAgICAgICAgIFwiaXNfbnVsbFwiOiBcImlzIG51bGxcIixcbiAgICAgICAgICAgIFwiaXNfbm90X251bGxcIjogXCJpcyBub3QgbnVsbFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcbiAgICAgICAgICAgIFwibm9fZmlsdGVyXCI6IFwiTm8gZmlsdGVyIHNlbGVjdGVkXCIsXG4gICAgICAgICAgICBcImVtcHR5X2dyb3VwXCI6IFwiVGhlIGdyb3VwIGlzIGVtcHR5XCIsXG4gICAgICAgICAgICBcInJhZGlvX2VtcHR5XCI6IFwiTm8gdmFsdWUgc2VsZWN0ZWRcIixcbiAgICAgICAgICAgIFwiY2hlY2tib3hfZW1wdHlcIjogXCJObyB2YWx1ZSBzZWxlY3RlZFwiLFxuICAgICAgICAgICAgXCJzZWxlY3RfZW1wdHlcIjogXCJObyB2YWx1ZSBzZWxlY3RlZFwiLFxuICAgICAgICAgICAgXCJzdHJpbmdfZW1wdHlcIjogXCJFbXB0eSB2YWx1ZVwiLFxuICAgICAgICAgICAgXCJzdHJpbmdfZXhjZWVkX21pbl9sZW5ndGhcIjogXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3QgezB9IGNoYXJhY3RlcnNcIixcbiAgICAgICAgICAgIFwic3RyaW5nX2V4Y2VlZF9tYXhfbGVuZ3RoXCI6IFwiTXVzdCBub3QgY29udGFpbiBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnNcIixcbiAgICAgICAgICAgIFwic3RyaW5nX2ludmFsaWRfZm9ybWF0XCI6IFwiSW52YWxpZCBmb3JtYXQgKHswfSlcIixcbiAgICAgICAgICAgIFwibnVtYmVyX25hblwiOiBcIk5vdCBhIG51bWJlclwiLFxuICAgICAgICAgICAgXCJudW1iZXJfbm90X2ludGVnZXJcIjogXCJOb3QgYW4gaW50ZWdlclwiLFxuICAgICAgICAgICAgXCJudW1iZXJfbm90X2RvdWJsZVwiOiBcIk5vdCBhIHJlYWwgbnVtYmVyXCIsXG4gICAgICAgICAgICBcIm51bWJlcl9leGNlZWRfbWluXCI6IFwiTXVzdCBiZSBncmVhdGVyIHRoYW4gezB9XCIsXG4gICAgICAgICAgICBcIm51bWJlcl9leGNlZWRfbWF4XCI6IFwiTXVzdCBiZSBsb3dlciB0aGFuIHswfVwiLFxuICAgICAgICAgICAgXCJudW1iZXJfd3Jvbmdfc3RlcFwiOiBcIk11c3QgYmUgYSBtdWx0aXBsZSBvZiB7MH1cIixcbiAgICAgICAgICAgIFwiZGF0ZXRpbWVfZW1wdHlcIjogXCJFbXB0eSB2YWx1ZVwiLFxuICAgICAgICAgICAgXCJkYXRldGltZV9pbnZhbGlkXCI6IFwiSW52YWxpZCBkYXRlIGZvcm1hdCAoezB9KVwiLFxuICAgICAgICAgICAgXCJkYXRldGltZV9leGNlZWRfbWluXCI6IFwiTXVzdCBiZSBhZnRlciB7MH1cIixcbiAgICAgICAgICAgIFwiZGF0ZXRpbWVfZXhjZWVkX21heFwiOiBcIk11c3QgYmUgYmVmb3JlIHswfVwiLFxuICAgICAgICAgICAgXCJib29sZWFuX25vdF92YWxpZFwiOiBcIk5vdCBhIGJvb2xlYW5cIixcbiAgICAgICAgICAgIFwib3BlcmF0b3Jfbm90X211bHRpcGxlXCI6IFwiT3BlcmF0b3IgezB9IGNhbm5vdCBhY2NlcHQgbXVsdGlwbGUgdmFsdWVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJpbnZlcnRcIjogXCJJbnZlcnRcIlxuICAgIH07XG5cbiAgICBRdWVyeUJ1aWxkZXIuZGVmYXVsdHMoe2xhbmdfY29kZTogJ2VuJ30pO1xufSkpOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFByb2R1Y3RTZWxlY3RvciA9IGZ1bmN0aW9uIFByb2R1Y3RTZWxlY3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5pZFByb2R1Y3RBYnN0cmFjdEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0Q29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdFByb2R1Y3ROb3RpY2UgPSBudWxsO1xuICAgIHRoaXMucHJvZHVjdFRhYmxlID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdFByb2R1Y3RVcmwgPSBudWxsO1xuXG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmluaXRpYWxpc2VQcm9kdWN0VGFibGUoKTtcbiAgICB0aGlzLmZpbmRTZWxlY3RlZFByb2R1Y3QoKTtcbn07XG5cblByb2R1Y3RTZWxlY3Rvci5wcm90b3R5cGUuaW5pdGlhbGlzZVByb2R1Y3RUYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5wcm9kdWN0VGFibGUuZGF0YVRhYmxlKHtcbiAgICAgICAgZGVzdHJveTogdHJ1ZSxcbiAgICAgICAgc2Nyb2xsWDogJ2F1dG8nLFxuICAgICAgICBhdXRvV2lkdGg6IGZhbHNlLFxuICAgICAgICBmbkRyYXdDYWxsYmFjazogZnVuY3Rpb24gKHNldHRpbmdzKSB7XG4gICAgICAgICAgICBzZWxmLm9uVGFibGVEcmF3KHNldHRpbmdzKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn07XG5cblByb2R1Y3RTZWxlY3Rvci5wcm90b3R5cGUub25UYWJsZURyYXcgPSBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJCgnYVtkYXRhLXNlbGVjdC1wcm9kdWN0XScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgIHNlbGYuYWRkQ2xpY2tFdmVudFRvQ2hlY2tib3goJChlbGVtZW50KSk7XG4gICAgfSk7XG59O1xuXG5Qcm9kdWN0U2VsZWN0b3IucHJvdG90eXBlLmZpbmRTZWxlY3RlZFByb2R1Y3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlkU2VsZWN0ZWRQcm9kdWN0ID0gcGFyc2VJbnQodGhpcy5pZFByb2R1Y3RBYnN0cmFjdEVsZW1lbnQudmFsKCkpO1xuICAgIGlmICghaWRTZWxlY3RlZFByb2R1Y3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAkLmdldCh0aGlzLnNlbGVjdFByb2R1Y3RVcmwgKyBpZFNlbGVjdGVkUHJvZHVjdCkuZG9uZShmdW5jdGlvbiAoc2VsZWN0ZWRQcm9kdWN0KSB7XG4gICAgICAgIHNlbGYudXBkYXRlU2VsZWN0ZWRQcm9kdWN0KHNlbGVjdGVkUHJvZHVjdCk7XG4gICAgfSk7XG59O1xuXG5Qcm9kdWN0U2VsZWN0b3IucHJvdG90eXBlLmFkZENsaWNrRXZlbnRUb0NoZWNrYm94ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgJC5nZXQoc2VsZi5zZWxlY3RQcm9kdWN0VXJsICsgJChldmVudC50YXJnZXQpLmRhdGEoJ3NlbGVjdC1wcm9kdWN0JykpLmRvbmUoZnVuY3Rpb24gKHNlbGVjdGVkUHJvZHVjdCkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVTZWxlY3RlZFByb2R1Y3Qoc2VsZWN0ZWRQcm9kdWN0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5Qcm9kdWN0U2VsZWN0b3IucHJvdG90eXBlLnVwZGF0ZVNlbGVjdGVkUHJvZHVjdCA9IGZ1bmN0aW9uIChzZWxlY3RlZFByb2R1Y3QpIHtcbiAgICB2YXIgbmFtZSA9IHNlbGVjdGVkUHJvZHVjdFsnc3B5X3Byb2R1Y3RfYWJzdHJhY3RfbG9jYWxpemVkX2F0dHJpYnV0ZXMubmFtZSddO1xuICAgIHZhciBkZXNjcmlwdGlvbiA9IHNlbGVjdGVkUHJvZHVjdFsnc3B5X3Byb2R1Y3RfYWJzdHJhY3RfbG9jYWxpemVkX2F0dHJpYnV0ZXMuZGVzY3JpcHRpb24nXTtcbiAgICB2YXIgY2F0ZWdvcmllcyA9IHNlbGVjdGVkUHJvZHVjdC5hc3NpZ25lZF9jYXRlZ29yaWVzO1xuICAgIHZhciBpbWFnZVVybCA9IHNlbGVjdGVkUHJvZHVjdFsnc3B5X3Byb2R1Y3RfaW1hZ2UuZXh0ZXJuYWxfdXJsX3NtYWxsJ107XG4gICAgdmFyIGlkUHJvZHVjdEFic3RyYWN0ID0gc2VsZWN0ZWRQcm9kdWN0WydzcHlfcHJvZHVjdF9hYnN0cmFjdC5pZF9wcm9kdWN0X2Fic3RyYWN0J107XG5cbiAgICB0aGlzLnNlbGVjdFByb2R1Y3ROb3RpY2UuaGlkZSgpO1xuXG4gICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RDb250YWluZXIuc2hvdygpO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0Q29udGFpbmVyLmZpbmQoJyNwcm9kdWN0LWltZycpLmF0dHIoeyBzcmM6IGltYWdlVXJsIH0pO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0Q29udGFpbmVyLmZpbmQoJy5wcm9kdWN0LW5hbWUnKS50ZXh0KG5hbWUpO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0Q29udGFpbmVyLmZpbmQoJyNwcm9kdWN0LWRlc2NyaXB0aW9uJykudGV4dChkZXNjcmlwdGlvbik7XG4gICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RDb250YWluZXIuZmluZCgnI3Byb2R1Y3QtY2F0ZWdvcnknKS50ZXh0KGNhdGVnb3JpZXMpO1xuICAgIHRoaXMuaWRQcm9kdWN0QWJzdHJhY3RFbGVtZW50LnZhbChpZFByb2R1Y3RBYnN0cmFjdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2R1Y3RTZWxlY3RvcjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnQHNwcnlrZXIvanF1ZXJ5LXF1ZXJ5LWJ1aWxkZXInKTtcblxudmFyIFNxbFF1ZXJ5QnVpbGRlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdGhpcy5pZFByb2R1Y3RSZWxhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5idWlsZGVyID0gbnVsbDtcbiAgICB0aGlzLnF1ZXJ5QnVpbGRlckVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZmlsdGVyc1VybCA9IG51bGw7XG4gICAgdGhpcy5wcm9kdWN0UmVsYXRpb25RdWVyeVNldCA9IG51bGw7XG4gICAgdGhpcy5wcm9kdWN0UmVsYXRpb25Gb3JtU3VibWl0QnRuID0gbnVsbDtcbiAgICB0aGlzLnJ1bGVRdWVyeVRhYmxlID0gbnVsbDtcbiAgICB0aGlzLnRhYnNDb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMuZmxhc2hNZXNzYWdlcyA9IG51bGw7XG5cbiAgICAkLmV4dGVuZCh0aGlzLCBvcHRpb25zKTtcblxuICAgIHZhciBmaWx0ZXJDb25maWd1cmF0aW9uVXJsID0gdGhpcy5maWx0ZXJzVXJsICsgdGhpcy5pZFByb2R1Y3RSZWxhdGlvbjtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAkLmdldChmaWx0ZXJDb25maWd1cmF0aW9uVXJsKS5kb25lKGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG4gICAgICAgIHNlbGYuYnVpbGRlciA9IHNlbGYucXVlcnlCdWlsZGVyRWxlbWVudC5xdWVyeUJ1aWxkZXIoc2VsZi5nZXRRdWVyeUJ1aWxkZXJPcHRpb25zKGZpbHRlcnMpKTtcbiAgICAgICAgc2VsZi5sb2FkUXVlcnlTZXQoKTtcbiAgICAgICAgc2VsZi53YXRjaEZvclF1ZXJ5UnVsZVVwZGF0ZXMoKTtcbiAgICAgICAgc2VsZi51cGRhdGVUYWJsZSgpO1xuICAgICAgICBzZWxmLm9uRm9ybVN1Ym1pdCgpO1xuICAgIH0pO1xufTtcblxuU3FsUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRRdWVyeVNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdHVzID0gdGhpcy5idWlsZGVyLnF1ZXJ5QnVpbGRlcignZ2V0UnVsZXMnKSB8fCB7fTtcblxuICAgIGlmICghc3RhdHVzLnJ1bGVzIHx8ICFzdGF0dXMucnVsZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnRvZ2dsZVN1Ym1pdEJ1dHRvbihmYWxzZSk7XG4gICAgdGhpcy50b2dnbGVFcnJvclN0YXRlKGZhbHNlKTtcblxuICAgIHJldHVybiB0aGlzLmJ1aWxkZXIucXVlcnlCdWlsZGVyKCdnZXRSdWxlcycpO1xufTtcblxuU3FsUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5sb2FkUXVlcnlTZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHF1ZXJ5U2V0ID0gdGhpcy5wcm9kdWN0UmVsYXRpb25RdWVyeVNldC52YWwoKTtcblxuICAgIGlmIChxdWVyeVNldC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYnVpbGRlci5xdWVyeUJ1aWxkZXIoJ3NldFJ1bGVzJywgSlNPTi5wYXJzZShxdWVyeVNldCkpO1xuICAgIH1cbn07XG5cblNxbFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUub25Gb3JtU3VibWl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucHJvZHVjdFJlbGF0aW9uRm9ybVN1Ym1pdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFzZWxmLmJ1aWxkZXIucXVlcnlCdWlsZGVyKCd2YWxpZGF0ZScpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2VsZi50b2dnbGVTdWJtaXRCdXR0b24odHJ1ZSk7XG4gICAgICAgICAgICBzZWxmLnRvZ2dsZUVycm9yU3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuU3FsUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRRdWVyeUJ1aWxkZXJPcHRpb25zID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxuICAgICAgICBkZWZhdWx0X2NvbmRpdGlvbjogJ0FORCcsXG4gICAgICAgIG9wdGdyb3Vwczoge1xuICAgICAgICAgICAgYXR0cmlidXRlczogJy0tIEF0dHJpYnV0ZXMnLFxuICAgICAgICB9LFxuICAgICAgICBsYW5nOiB7XG4gICAgICAgICAgICBvcGVyYXRvcnM6IHtcbiAgICAgICAgICAgICAgICBpbjogJ2lzIGluJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNxbE9wZXJhdG9yczoge1xuICAgICAgICAgICAgaW46IHsgb3A6ICdJUyBJTiA/Jywgc2VwOiAnLCAnIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNxbFJ1bGVPcGVyYXRvcjoge1xuICAgICAgICAgICAgJ0lTIElOJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWw6IHYsXG4gICAgICAgICAgICAgICAgICAgIG9wOiAnaW4nLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG59O1xuXG5TcWxRdWVyeUJ1aWxkZXIucHJvdG90eXBlLndhdGNoRm9yUXVlcnlSdWxlVXBkYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLnF1ZXJ5QnVpbGRlckVsZW1lbnQub24oXG4gICAgICAgICdhZnRlckFkZEdyb3VwLnF1ZXJ5QnVpbGRlciBhZnRlckFkZFJ1bGUucXVlcnlCdWlsZGVyIGFmdGVyVXBkYXRlUnVsZVZhbHVlLnF1ZXJ5QnVpbGRlclx0YWZ0ZXJVcGRhdGVSdWxlRmlsdGVyLnF1ZXJ5QnVpbGRlciBhZnRlclVwZGF0ZVJ1bGVPcGVyYXRvci5xdWVyeUJ1aWxkZXIgYWZ0ZXJBcHBseVJ1bGVGbGFncy5xdWVyeUJ1aWxkZXIgYWZ0ZXJVcGRhdGVHcm91cENvbmRpdGlvbi5xdWVyeUJ1aWxkZXIgYWZ0ZXJEZWxldGVSdWxlLnF1ZXJ5QnVpbGRlciBhZnRlckRlbGV0ZUdyb3VwLnF1ZXJ5QnVpbGRlcicsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlVGFibGUoKTtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlUXVlcnlTZXRGaWVsZCgpO1xuICAgICAgICB9LFxuICAgICk7XG59O1xuXG5TcWxRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnVwZGF0ZVRhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YWJsZSA9IHRoaXMuaW5pdGlhbGl6ZVJ1bGVQcm9kdWN0c1RhYmxlKCk7XG4gICAgdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmdldFF1ZXJ5U2V0KCkpO1xuXG4gICAgdGhpcy5yZWxvYWRRdWVyeUJ1aWxkZXJUYWJsZSh0YWJsZSwganNvbik7XG59O1xuXG5TcWxRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnVwZGF0ZVF1ZXJ5U2V0RmllbGQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmdldFF1ZXJ5U2V0KCkpO1xuXG4gICAgdGhpcy5wcm9kdWN0UmVsYXRpb25RdWVyeVNldC52YWwoanNvbik7XG59O1xuXG5TcWxRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmluaXRpYWxpemVSdWxlUHJvZHVjdHNUYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlUXVlcnlUYWJsZS5EYXRhVGFibGUoKTtcbn07XG5cblNxbFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUucmVwbGFjZVVybFBhcmFtID0gZnVuY3Rpb24gKHBhcmFtZXRlciwgdmFsdWUsIHVybCkge1xuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJyhbPzsmXSknICsgcGFyYW1ldGVyICsgJ1teJjtdKls7Jl0/Jyk7XG4gICAgdmFyIHF1ZXJ5ID0gdXJsLnJlcGxhY2UocmVnZXgsICckMScpLnJlcGxhY2UoLyYkLywgJycpO1xuXG4gICAgcmV0dXJuIChxdWVyeS5sZW5ndGggPiAyID8gcXVlcnkgKyAnJicgOiAnPycpICsgKHZhbHVlID8gcGFyYW1ldGVyICsgJz0nICsgdmFsdWUgOiAnJyk7XG59O1xuXG5TcWxRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnJlbG9hZFF1ZXJ5QnVpbGRlclRhYmxlID0gZnVuY3Rpb24gKHRhYmxlLCBqc29uKSB7XG4gICAgdmFyIHVybCA9IHRhYmxlLmFqYXgudXJsKCk7XG4gICAgdmFyIG5ld1VybCA9IHRoaXMucmVwbGFjZVVybFBhcmFtKCdkYXRhJywganNvbiwgdXJsKTtcblxuICAgIHRhYmxlLmFqYXgudXJsKG5ld1VybCkubG9hZCgpO1xufTtcblxuU3FsUXVlcnlCdWlsZGVyLnByb3RvdHlwZS50b2dnbGVTdWJtaXRCdXR0b24gPSBmdW5jdGlvbiAoaXNEaXNhYmxlZCkge1xuICAgIHRoaXMucHJvZHVjdFJlbGF0aW9uRm9ybVN1Ym1pdEJ0blswXS5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5wcm9kdWN0UmVsYXRpb25Gb3JtU3VibWl0QnRuWzBdLmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG59O1xuXG5TcWxRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnRvZ2dsZUVycm9yU3RhdGUgPSBmdW5jdGlvbiAoaXNFcnJvcikge1xuICAgIHRoaXMudGFic0NvbnRhaW5lci5maW5kKCdbZGF0YS10YWItY29udGVudC1pZD1cInRhYi1jb250ZW50LWFzc2lnbi1wcm9kdWN0c1wiXScpLnRvZ2dsZUNsYXNzKCdlcnJvcicsIGlzRXJyb3IpO1xuICAgIHRoaXMuZmxhc2hNZXNzYWdlcy5odG1sKFxuICAgICAgICBpc0Vycm9yID8gJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nICsgdGhpcy5idWlsZGVyLmF0dHIoJ2RhdGEtZXJyb3ItbWVzc2FnZScpICsgJzwvZGl2PicgOiAnJyxcbiAgICApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcWxRdWVyeUJ1aWxkZXI7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4uLy4uL3Nhc3MvbWFpbi5zY3NzJyk7XG5cbnZhciBQcm9kdWN0U2VsZWN0b3IgPSByZXF1aXJlKCcuL2xpYnMvcHJvZHVjdC1zZWxlY3RvcicpO1xudmFyIFNxbFF1ZXJ5QnVpbGRlciA9IHJlcXVpcmUoJy4vbGlicy9zcWwtcXVlcnktYnVpbGRlcicpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgbmV3IFByb2R1Y3RTZWxlY3Rvcih7XG4gICAgICAgIGlkUHJvZHVjdEFic3RyYWN0RWxlbWVudDogJCgnI3Byb2R1Y3RfcmVsYXRpb25fZmtQcm9kdWN0QWJzdHJhY3QnKSxcbiAgICAgICAgc2VsZWN0ZWRQcm9kdWN0Q29udGFpbmVyOiAkKCcjc2VsZWN0ZWQtcHJvZHVjdCcpLFxuICAgICAgICBzZWxlY3RQcm9kdWN0Tm90aWNlOiAkKCcjc2VsZWN0LXByb2R1Y3Qtbm90aWNlJyksXG4gICAgICAgIHByb2R1Y3RUYWJsZTogJCgnI3Byb2R1Y3QtdGFibGUnKSxcbiAgICAgICAgc2VsZWN0UHJvZHVjdFVybDogJy9wcm9kdWN0LXJlbGF0aW9uLWd1aS9wcm9kdWN0LXNlbGVjdG9yP2lkLXByb2R1Y3QtYWJzdHJhY3Q9JyxcbiAgICB9KTtcblxuICAgIG5ldyBTcWxRdWVyeUJ1aWxkZXIoe1xuICAgICAgICBpZDogJCgnI3Byb2R1Y3RfcmVsYXRpb25faWRQcm9kdWN0UmVsYXRpb24nKS52YWwoKSxcbiAgICAgICAgcXVlcnlCdWlsZGVyRWxlbWVudDogJCgnI2J1aWxkZXInKSxcbiAgICAgICAgZmlsdGVyc1VybDogJy9wcm9kdWN0LXJlbGF0aW9uLWd1aS9xdWVyeS1idWlsZGVyL2xvYWQtZmlsdGVyLXNldD9pZC1wcm9kdWN0LXJlbGF0aW9uPScsXG4gICAgICAgIHByb2R1Y3RSZWxhdGlvblF1ZXJ5U2V0OiAkKCcjcHJvZHVjdF9yZWxhdGlvbl9xdWVyeVNldCcpLFxuICAgICAgICBwcm9kdWN0UmVsYXRpb25Gb3JtU3VibWl0QnRuOiAkKCcjc3VibWl0LXJlbGF0aW9uJyksXG4gICAgICAgIHJ1bGVRdWVyeVRhYmxlOiAkKCcjcnVsZS1xdWVyeS10YWJsZScpLFxuICAgICAgICB0YWJzQ29udGFpbmVyOiAkKCcudGFicy1jb250YWluZXInKSxcbiAgICAgICAgZmxhc2hNZXNzYWdlczogJCgnLmZsYXNoLW1lc3NhZ2VzJyksXG4gICAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiIsIi8vIGRvVC5qc1xuLy8gMjAxMS0yMDE0LCBMYXVyYSBEb2t0b3JvdmEsIGh0dHBzOi8vZ2l0aHViLmNvbS9vbGFkby9kb1Rcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGRvVCA9IHtcblx0XHRuYW1lOiBcImRvVFwiLFxuXHRcdHZlcnNpb246IFwiMS4xLjFcIixcblx0XHR0ZW1wbGF0ZVNldHRpbmdzOiB7XG5cdFx0XHRldmFsdWF0ZTogICAgL1xce1xceyhbXFxzXFxTXSs/KFxcfT8pKylcXH1cXH0vZyxcblx0XHRcdGludGVycG9sYXRlOiAvXFx7XFx7PShbXFxzXFxTXSs/KVxcfVxcfS9nLFxuXHRcdFx0ZW5jb2RlOiAgICAgIC9cXHtcXHshKFtcXHNcXFNdKz8pXFx9XFx9L2csXG5cdFx0XHR1c2U6ICAgICAgICAgL1xce1xceyMoW1xcc1xcU10rPylcXH1cXH0vZyxcblx0XHRcdHVzZVBhcmFtczogICAvKF58W15cXHckXSlkZWYoPzpcXC58XFxbW1xcJ1xcXCJdKShbXFx3JFxcLl0rKSg/OltcXCdcXFwiXVxcXSk/XFxzKlxcOlxccyooW1xcdyRcXC5dK3xcXFwiW15cXFwiXStcXFwifFxcJ1teXFwnXStcXCd8XFx7W15cXH1dK1xcfSkvZyxcblx0XHRcdGRlZmluZTogICAgICAvXFx7XFx7IyNcXHMqKFtcXHdcXC4kXSspXFxzKihcXDp8PSkoW1xcc1xcU10rPykjXFx9XFx9L2csXG5cdFx0XHRkZWZpbmVQYXJhbXM6L15cXHMqKFtcXHckXSspOihbXFxzXFxTXSspLyxcblx0XHRcdGNvbmRpdGlvbmFsOiAvXFx7XFx7XFw/KFxcPyk/XFxzKihbXFxzXFxTXSo/KVxccypcXH1cXH0vZyxcblx0XHRcdGl0ZXJhdGU6ICAgICAvXFx7XFx7flxccyooPzpcXH1cXH18KFtcXHNcXFNdKz8pXFxzKlxcOlxccyooW1xcdyRdKylcXHMqKD86XFw6XFxzKihbXFx3JF0rKSk/XFxzKlxcfVxcfSkvZyxcblx0XHRcdHZhcm5hbWU6XHRcIml0XCIsXG5cdFx0XHRzdHJpcDpcdFx0dHJ1ZSxcblx0XHRcdGFwcGVuZDpcdFx0dHJ1ZSxcblx0XHRcdHNlbGZjb250YWluZWQ6IGZhbHNlLFxuXHRcdFx0ZG9Ob3RTa2lwRW5jb2RlZDogZmFsc2Vcblx0XHR9LFxuXHRcdHRlbXBsYXRlOiB1bmRlZmluZWQsIC8vZm4sIGNvbXBpbGUgdGVtcGxhdGVcblx0XHRjb21waWxlOiAgdW5kZWZpbmVkLCAvL2ZuLCBmb3IgZXhwcmVzc1xuXHRcdGxvZzogdHJ1ZVxuXHR9LCBfZ2xvYmFscztcblxuXHRkb1QuZW5jb2RlSFRNTFNvdXJjZSA9IGZ1bmN0aW9uKGRvTm90U2tpcEVuY29kZWQpIHtcblx0XHR2YXIgZW5jb2RlSFRNTFJ1bGVzID0geyBcIiZcIjogXCImIzM4O1wiLCBcIjxcIjogXCImIzYwO1wiLCBcIj5cIjogXCImIzYyO1wiLCAnXCInOiBcIiYjMzQ7XCIsIFwiJ1wiOiBcIiYjMzk7XCIsIFwiL1wiOiBcIiYjNDc7XCIgfSxcblx0XHRcdG1hdGNoSFRNTCA9IGRvTm90U2tpcEVuY29kZWQgPyAvWyY8PlwiJ1xcL10vZyA6IC8mKD8hIz9cXHcrOyl8PHw+fFwifCd8XFwvL2c7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGNvZGUpIHtcblx0XHRcdHJldHVybiBjb2RlID8gY29kZS50b1N0cmluZygpLnJlcGxhY2UobWF0Y2hIVE1MLCBmdW5jdGlvbihtKSB7cmV0dXJuIGVuY29kZUhUTUxSdWxlc1ttXSB8fCBtO30pIDogXCJcIjtcblx0XHR9O1xuXHR9O1xuXG5cdF9nbG9iYWxzID0gKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzIHx8ICgwLGV2YWwpKFwidGhpc1wiKTsgfSgpKTtcblxuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZG9UO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGRvVDt9KTtcblx0fSBlbHNlIHtcblx0XHRfZ2xvYmFscy5kb1QgPSBkb1Q7XG5cdH1cblxuXHR2YXIgc3RhcnRlbmQgPSB7XG5cdFx0YXBwZW5kOiB7IHN0YXJ0OiBcIicrKFwiLCAgICAgIGVuZDogXCIpKydcIiwgICAgICBzdGFydGVuY29kZTogXCInK2VuY29kZUhUTUwoXCIgfSxcblx0XHRzcGxpdDogIHsgc3RhcnQ6IFwiJztvdXQrPShcIiwgZW5kOiBcIik7b3V0Kz0nXCIsIHN0YXJ0ZW5jb2RlOiBcIic7b3V0Kz1lbmNvZGVIVE1MKFwiIH1cblx0fSwgc2tpcCA9IC8kXi87XG5cblx0ZnVuY3Rpb24gcmVzb2x2ZURlZnMoYywgYmxvY2ssIGRlZikge1xuXHRcdHJldHVybiAoKHR5cGVvZiBibG9jayA9PT0gXCJzdHJpbmdcIikgPyBibG9jayA6IGJsb2NrLnRvU3RyaW5nKCkpXG5cdFx0LnJlcGxhY2UoYy5kZWZpbmUgfHwgc2tpcCwgZnVuY3Rpb24obSwgY29kZSwgYXNzaWduLCB2YWx1ZSkge1xuXHRcdFx0aWYgKGNvZGUuaW5kZXhPZihcImRlZi5cIikgPT09IDApIHtcblx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKDQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCEoY29kZSBpbiBkZWYpKSB7XG5cdFx0XHRcdGlmIChhc3NpZ24gPT09IFwiOlwiKSB7XG5cdFx0XHRcdFx0aWYgKGMuZGVmaW5lUGFyYW1zKSB2YWx1ZS5yZXBsYWNlKGMuZGVmaW5lUGFyYW1zLCBmdW5jdGlvbihtLCBwYXJhbSwgdikge1xuXHRcdFx0XHRcdFx0ZGVmW2NvZGVdID0ge2FyZzogcGFyYW0sIHRleHQ6IHZ9O1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmICghKGNvZGUgaW4gZGVmKSkgZGVmW2NvZGVdPSB2YWx1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRuZXcgRnVuY3Rpb24oXCJkZWZcIiwgXCJkZWZbJ1wiK2NvZGUrXCInXT1cIiArIHZhbHVlKShkZWYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gXCJcIjtcblx0XHR9KVxuXHRcdC5yZXBsYWNlKGMudXNlIHx8IHNraXAsIGZ1bmN0aW9uKG0sIGNvZGUpIHtcblx0XHRcdGlmIChjLnVzZVBhcmFtcykgY29kZSA9IGNvZGUucmVwbGFjZShjLnVzZVBhcmFtcywgZnVuY3Rpb24obSwgcywgZCwgcGFyYW0pIHtcblx0XHRcdFx0aWYgKGRlZltkXSAmJiBkZWZbZF0uYXJnICYmIHBhcmFtKSB7XG5cdFx0XHRcdFx0dmFyIHJ3ID0gKGQrXCI6XCIrcGFyYW0pLnJlcGxhY2UoLyd8XFxcXC9nLCBcIl9cIik7XG5cdFx0XHRcdFx0ZGVmLl9fZXhwID0gZGVmLl9fZXhwIHx8IHt9O1xuXHRcdFx0XHRcdGRlZi5fX2V4cFtyd10gPSBkZWZbZF0udGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxbXlxcXFx3JF0pXCIgKyBkZWZbZF0uYXJnICsgXCIoW15cXFxcdyRdKVwiLCBcImdcIiksIFwiJDFcIiArIHBhcmFtICsgXCIkMlwiKTtcblx0XHRcdFx0XHRyZXR1cm4gcyArIFwiZGVmLl9fZXhwWydcIitydytcIiddXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dmFyIHYgPSBuZXcgRnVuY3Rpb24oXCJkZWZcIiwgXCJyZXR1cm4gXCIgKyBjb2RlKShkZWYpO1xuXHRcdFx0cmV0dXJuIHYgPyByZXNvbHZlRGVmcyhjLCB2LCBkZWYpIDogdjtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHVuZXNjYXBlKGNvZGUpIHtcblx0XHRyZXR1cm4gY29kZS5yZXBsYWNlKC9cXFxcKCd8XFxcXCkvZywgXCIkMVwiKS5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIiBcIik7XG5cdH1cblxuXHRkb1QudGVtcGxhdGUgPSBmdW5jdGlvbih0bXBsLCBjLCBkZWYpIHtcblx0XHRjID0gYyB8fCBkb1QudGVtcGxhdGVTZXR0aW5ncztcblx0XHR2YXIgY3NlID0gYy5hcHBlbmQgPyBzdGFydGVuZC5hcHBlbmQgOiBzdGFydGVuZC5zcGxpdCwgbmVlZGh0bWxlbmNvZGUsIHNpZCA9IDAsIGluZHYsXG5cdFx0XHRzdHIgID0gKGMudXNlIHx8IGMuZGVmaW5lKSA/IHJlc29sdmVEZWZzKGMsIHRtcGwsIGRlZiB8fCB7fSkgOiB0bXBsO1xuXG5cdFx0c3RyID0gKFwidmFyIG91dD0nXCIgKyAoYy5zdHJpcCA/IHN0ci5yZXBsYWNlKC8oXnxcXHJ8XFxuKVxcdCogK3wgK1xcdCooXFxyfFxcbnwkKS9nLFwiIFwiKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC9cXHJ8XFxufFxcdHxcXC9cXCpbXFxzXFxTXSo/XFwqXFwvL2csXCJcIik6IHN0cilcblx0XHRcdC5yZXBsYWNlKC8nfFxcXFwvZywgXCJcXFxcJCZcIilcblx0XHRcdC5yZXBsYWNlKGMuaW50ZXJwb2xhdGUgfHwgc2tpcCwgZnVuY3Rpb24obSwgY29kZSkge1xuXHRcdFx0XHRyZXR1cm4gY3NlLnN0YXJ0ICsgdW5lc2NhcGUoY29kZSkgKyBjc2UuZW5kO1xuXHRcdFx0fSlcblx0XHRcdC5yZXBsYWNlKGMuZW5jb2RlIHx8IHNraXAsIGZ1bmN0aW9uKG0sIGNvZGUpIHtcblx0XHRcdFx0bmVlZGh0bWxlbmNvZGUgPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gY3NlLnN0YXJ0ZW5jb2RlICsgdW5lc2NhcGUoY29kZSkgKyBjc2UuZW5kO1xuXHRcdFx0fSlcblx0XHRcdC5yZXBsYWNlKGMuY29uZGl0aW9uYWwgfHwgc2tpcCwgZnVuY3Rpb24obSwgZWxzZWNhc2UsIGNvZGUpIHtcblx0XHRcdFx0cmV0dXJuIGVsc2VjYXNlID9cblx0XHRcdFx0XHQoY29kZSA/IFwiJzt9ZWxzZSBpZihcIiArIHVuZXNjYXBlKGNvZGUpICsgXCIpe291dCs9J1wiIDogXCInO31lbHNle291dCs9J1wiKSA6XG5cdFx0XHRcdFx0KGNvZGUgPyBcIic7aWYoXCIgKyB1bmVzY2FwZShjb2RlKSArIFwiKXtvdXQrPSdcIiA6IFwiJzt9b3V0Kz0nXCIpO1xuXHRcdFx0fSlcblx0XHRcdC5yZXBsYWNlKGMuaXRlcmF0ZSB8fCBza2lwLCBmdW5jdGlvbihtLCBpdGVyYXRlLCB2bmFtZSwgaW5hbWUpIHtcblx0XHRcdFx0aWYgKCFpdGVyYXRlKSByZXR1cm4gXCInO30gfSBvdXQrPSdcIjtcblx0XHRcdFx0c2lkKz0xOyBpbmR2PWluYW1lIHx8IFwiaVwiK3NpZDsgaXRlcmF0ZT11bmVzY2FwZShpdGVyYXRlKTtcblx0XHRcdFx0cmV0dXJuIFwiJzt2YXIgYXJyXCIrc2lkK1wiPVwiK2l0ZXJhdGUrXCI7aWYoYXJyXCIrc2lkK1wiKXt2YXIgXCIrdm5hbWUrXCIsXCIraW5kditcIj0tMSxsXCIrc2lkK1wiPWFyclwiK3NpZCtcIi5sZW5ndGgtMTt3aGlsZShcIitpbmR2K1wiPGxcIitzaWQrXCIpe1wiXG5cdFx0XHRcdFx0K3ZuYW1lK1wiPWFyclwiK3NpZCtcIltcIitpbmR2K1wiKz0xXTtvdXQrPSdcIjtcblx0XHRcdH0pXG5cdFx0XHQucmVwbGFjZShjLmV2YWx1YXRlIHx8IHNraXAsIGZ1bmN0aW9uKG0sIGNvZGUpIHtcblx0XHRcdFx0cmV0dXJuIFwiJztcIiArIHVuZXNjYXBlKGNvZGUpICsgXCJvdXQrPSdcIjtcblx0XHRcdH0pXG5cdFx0XHQrIFwiJztyZXR1cm4gb3V0O1wiKVxuXHRcdFx0LnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLnJlcGxhY2UoL1xcdC9nLCAnXFxcXHQnKS5yZXBsYWNlKC9cXHIvZywgXCJcXFxcclwiKVxuXHRcdFx0LnJlcGxhY2UoLyhcXHN8O3xcXH18XnxcXHspb3V0XFwrPScnOy9nLCAnJDEnKS5yZXBsYWNlKC9cXCsnJy9nLCBcIlwiKTtcblx0XHRcdC8vLnJlcGxhY2UoLyhcXHN8O3xcXH18XnxcXHspb3V0XFwrPScnXFwrL2csJyQxb3V0Kz0nKTtcblxuXHRcdGlmIChuZWVkaHRtbGVuY29kZSkge1xuXHRcdFx0aWYgKCFjLnNlbGZjb250YWluZWQgJiYgX2dsb2JhbHMgJiYgIV9nbG9iYWxzLl9lbmNvZGVIVE1MKSBfZ2xvYmFscy5fZW5jb2RlSFRNTCA9IGRvVC5lbmNvZGVIVE1MU291cmNlKGMuZG9Ob3RTa2lwRW5jb2RlZCk7XG5cdFx0XHRzdHIgPSBcInZhciBlbmNvZGVIVE1MID0gdHlwZW9mIF9lbmNvZGVIVE1MICE9PSAndW5kZWZpbmVkJyA/IF9lbmNvZGVIVE1MIDogKFwiXG5cdFx0XHRcdCsgZG9ULmVuY29kZUhUTUxTb3VyY2UudG9TdHJpbmcoKSArIFwiKFwiICsgKGMuZG9Ob3RTa2lwRW5jb2RlZCB8fCAnJykgKyBcIikpO1wiXG5cdFx0XHRcdCsgc3RyO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIG5ldyBGdW5jdGlvbihjLnZhcm5hbWUsIHN0cik7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0LyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cblx0XHRcdGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikgY29uc29sZS5sb2coXCJDb3VsZCBub3QgY3JlYXRlIGEgdGVtcGxhdGUgZnVuY3Rpb246IFwiICsgc3RyKTtcblx0XHRcdHRocm93IGU7XG5cdFx0fVxuXHR9O1xuXG5cdGRvVC5jb21waWxlID0gZnVuY3Rpb24odG1wbCwgZGVmKSB7XG5cdFx0cmV0dXJuIGRvVC50ZW1wbGF0ZSh0bXBsLCBudWxsLCBkZWYpO1xuXHR9O1xufSgpKTtcbiIsIi8qIVxuICogalF1ZXJ5LmV4dGVuZGV4dCAxLjAuMFxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMTkgRGFtaWVuIFwiTWlzdGljXCIgU29yZWwgKGh0dHA6Ly93d3cuc3RyYW5nZXBsYW5ldC5mcilcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVClcbiAqIFxuICogQmFzZWQgb24galF1ZXJ5LmV4dGVuZCBieSBqUXVlcnkgRm91bmRhdGlvbiwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmYWN0b3J5KHJvb3QualF1ZXJ5KTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkLmV4dGVuZGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LFxuICAgICAgICAgICAgaSA9IDEsXG4gICAgICAgICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICAgICAgZGVlcCA9IGZhbHNlLFxuICAgICAgICAgICAgYXJyYXlNb2RlID0gJ2RlZmF1bHQnO1xuXG4gICAgICAgIC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICBkZWVwID0gdGFyZ2V0O1xuXG4gICAgICAgICAgICAvLyBTa2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbaSsrXSB8fCB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBhcnJheSBtb2RlIHBhcmFtZXRlclxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgYXJyYXlNb2RlID0gdGFyZ2V0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoYXJyYXlNb2RlICE9PSAnY29uY2F0JyAmJiBhcnJheU1vZGUgIT09ICdyZXBsYWNlJyAmJiBhcnJheU1vZGUgIT09ICdleHRlbmQnKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlNb2RlID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTa2lwIHRoZSBzdHJpbmcgcGFyYW1cbiAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpKytdIHx8IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICEkLmlzRnVuY3Rpb24odGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFeHRlbmQgalF1ZXJ5IGl0c2VsZiBpZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwYXNzZWRcbiAgICAgICAgaWYgKGkgPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyA9IGFyZ3VtZW50c1tpXSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIG9wZXJhdGlvbnMgZm9yIGFycmF5c1xuICAgICAgICAgICAgICAgIGlmICgkLmlzQXJyYXkob3B0aW9ucykgJiYgYXJyYXlNb2RlICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSB0YXJnZXQgJiYgJC5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQgOiBbXTtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFycmF5TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25jYXQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gY2xvbmUuY29uY2F0KCQuZXh0ZW5kKGRlZXAsIFtdLCBvcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICQuZXh0ZW5kKGRlZXAsIFtdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2V4dGVuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gJC5pc0FycmF5KGUpID8gW10gOiB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVbaV0gPSAkLmV4dGVuZGV4dChkZWVwLCBhcnJheU1vZGUsIGNsb25lW2ldIHx8IHR5cGUsIGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjbG9uZS5pbmRleE9mKGUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZS5wdXNoKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBjbG9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nIHx8IHRhcmdldCA9PT0gY29weSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWVwICYmIGNvcHkgJiYgKCAkLmlzUGxhaW5PYmplY3QoY29weSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29weUlzQXJyYXkgPSAkLmlzQXJyYXkoY29weSkpICkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmMgPSB0YXJnZXRbbmFtZV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFbnN1cmUgcHJvcGVyIHR5cGUgZm9yIHRoZSBzb3VyY2UgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNvcHlJc0FycmF5ICYmICFBcnJheS5pc0FycmF5KCBzcmMgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAhY29weUlzQXJyYXkgJiYgISQuaXNQbGFpbk9iamVjdCggc3JjICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSAkLmV4dGVuZGV4dChkZWVwLCBhcnJheU1vZGUsIGNsb25lLCBjb3B5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29weSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcbn0pKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJQcm9kdWN0U2VsZWN0b3IiLCJvcHRpb25zIiwiaWRQcm9kdWN0QWJzdHJhY3RFbGVtZW50Iiwic2VsZWN0ZWRQcm9kdWN0Q29udGFpbmVyIiwic2VsZWN0UHJvZHVjdE5vdGljZSIsInByb2R1Y3RUYWJsZSIsInNlbGVjdFByb2R1Y3RVcmwiLCIkIiwiZXh0ZW5kIiwiaW5pdGlhbGlzZVByb2R1Y3RUYWJsZSIsImZpbmRTZWxlY3RlZFByb2R1Y3QiLCJwcm90b3R5cGUiLCJzZWxmIiwiZGF0YVRhYmxlIiwiZGVzdHJveSIsInNjcm9sbFgiLCJhdXRvV2lkdGgiLCJmbkRyYXdDYWxsYmFjayIsInNldHRpbmdzIiwib25UYWJsZURyYXciLCJlYWNoIiwiaW5kZXgiLCJlbGVtZW50IiwiYWRkQ2xpY2tFdmVudFRvQ2hlY2tib3giLCJpZFNlbGVjdGVkUHJvZHVjdCIsInBhcnNlSW50IiwidmFsIiwiZ2V0IiwiZG9uZSIsInNlbGVjdGVkUHJvZHVjdCIsInVwZGF0ZVNlbGVjdGVkUHJvZHVjdCIsIm9uIiwiZXZlbnQiLCJ0YXJnZXQiLCJkYXRhIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiY2F0ZWdvcmllcyIsImFzc2lnbmVkX2NhdGVnb3JpZXMiLCJpbWFnZVVybCIsImlkUHJvZHVjdEFic3RyYWN0IiwiaGlkZSIsInNob3ciLCJmaW5kIiwiYXR0ciIsInNyYyIsInRleHQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIlNxbFF1ZXJ5QnVpbGRlciIsImlkUHJvZHVjdFJlbGF0aW9uIiwiYnVpbGRlciIsInF1ZXJ5QnVpbGRlckVsZW1lbnQiLCJmaWx0ZXJzVXJsIiwicHJvZHVjdFJlbGF0aW9uUXVlcnlTZXQiLCJwcm9kdWN0UmVsYXRpb25Gb3JtU3VibWl0QnRuIiwicnVsZVF1ZXJ5VGFibGUiLCJ0YWJzQ29udGFpbmVyIiwiZmxhc2hNZXNzYWdlcyIsImZpbHRlckNvbmZpZ3VyYXRpb25VcmwiLCJmaWx0ZXJzIiwicXVlcnlCdWlsZGVyIiwiZ2V0UXVlcnlCdWlsZGVyT3B0aW9ucyIsImxvYWRRdWVyeVNldCIsIndhdGNoRm9yUXVlcnlSdWxlVXBkYXRlcyIsInVwZGF0ZVRhYmxlIiwib25Gb3JtU3VibWl0IiwiZ2V0UXVlcnlTZXQiLCJzdGF0dXMiLCJydWxlcyIsImxlbmd0aCIsInRvZ2dsZVN1Ym1pdEJ1dHRvbiIsInRvZ2dsZUVycm9yU3RhdGUiLCJxdWVyeVNldCIsIkpTT04iLCJwYXJzZSIsInByZXZlbnREZWZhdWx0Iiwid2luZG93Iiwic2Nyb2xsVG8iLCJkZWZhdWx0X2NvbmRpdGlvbiIsIm9wdGdyb3VwcyIsImF0dHJpYnV0ZXMiLCJsYW5nIiwib3BlcmF0b3JzIiwiaW4iLCJzcWxPcGVyYXRvcnMiLCJvcCIsInNlcCIsInNxbFJ1bGVPcGVyYXRvciIsIklTIElOIiwidiIsInVwZGF0ZVF1ZXJ5U2V0RmllbGQiLCJ0YWJsZSIsImluaXRpYWxpemVSdWxlUHJvZHVjdHNUYWJsZSIsImpzb24iLCJzdHJpbmdpZnkiLCJyZWxvYWRRdWVyeUJ1aWxkZXJUYWJsZSIsIkRhdGFUYWJsZSIsInJlcGxhY2VVcmxQYXJhbSIsInBhcmFtZXRlciIsInZhbHVlIiwidXJsIiwicmVnZXgiLCJSZWdFeHAiLCJxdWVyeSIsInJlcGxhY2UiLCJhamF4IiwibmV3VXJsIiwibG9hZCIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImlzRXJyb3IiLCJ0b2dnbGVDbGFzcyIsImh0bWwiLCJkb2N1bWVudCIsInJlYWR5IiwiaWQiXSwic291cmNlUm9vdCI6IiJ9