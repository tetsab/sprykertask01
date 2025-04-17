(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-discount-main"],{

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

/***/ "./vendor/spryker/discount/assets/Zed/js/modules/libs/spryker-query-builder.js":
/*!*************************************************************************************!*\
  !*** ./vendor/spryker/discount/assets/Zed/js/modules/libs/spryker-query-builder.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


window.SQLParser = __webpack_require__(/*! @spryker/sql-parser-mistic/browser/sql-parser */ "./node_modules/@spryker/sql-parser-mistic/browser/sql-parser.js");
__webpack_require__(/*! @spryker/jquery-query-builder */ "./node_modules/@spryker/jquery-query-builder/index.js");
function SprykerQueryBuilder(options) {
  var self = this;
  this.builder = null;
  this.displayQueryBuilder = true;
  this.getFiltersUrl = options.ajaxUrl;
  this.sql = options.sqlQuery;
  this.inputElement = options.inputElement;
  this.targetElement = options.targetElement;
  this.label = options.label || 'Build Query';
  this.init = function () {
    self.builder = $(self.targetElement);
    self.createBuilder();
  };
  this.init();
  if (options.disableValidation === true) {
    self.builder.on('validationError.queryBuilder', function (e, rule, error, value) {
      e.preventDefault();
    });
  }
}
SprykerQueryBuilder.prototype.createBuilder = function () {
  var self = this;
  $.get(self.getFiltersUrl).done(function (filters) {
    self.builder.queryBuilder({
      filters: filters,
      sqlOperators: self.getSqlOperators(),
      sqlRuleOperator: self.getSqlRuleOperators(),
      allow_empty: true,
      display_empty_filter: true
    });
    self.builder.prepend('<label class="control-label query-builder-label">' + self.label + '</label>');
    if (typeof self.sql !== 'undefined' && self.sql !== '') {
      self.builder.queryBuilder('setRulesFromSQL', self.sql);
    }
  });
};
SprykerQueryBuilder.prototype.toggleButton = function (event) {
  var self = this;
  var inputElementContainer = $(self.inputElement).parent();
  var label = '';
  var button = $(event.target);
  if (!!self.displayQueryBuilder) {
    self.saveQuery();
    inputElementContainer.removeClass('hidden');
    self.builder.addClass('hidden');
    self.builder.queryBuilder('destroy');
    self.displayQueryBuilder = false;
    self.builder.children('.query-builder-label').remove();
    label = button.data('label-query-builder');
  } else {
    inputElementContainer.addClass('hidden');
    self.builder.removeClass('hidden');
    self.displayQueryBuilder = true;
    self.sql = $(self.inputElement).val();
    self.createBuilder();
    label = button.data('label-plain-query');
  }
  button.text(label);
};
SprykerQueryBuilder.prototype.getSqlOperators = function () {
  return {
    contains: {
      op: 'CONTAINS ?',
      mod: '{0}'
    },
    not_contains: {
      op: 'DOES NOT CONTAIN ?',
      mod: '{0}'
    },
    in: {
      op: 'IS IN ?',
      sep: ', '
    },
    not_in: {
      op: 'IS NOT IN ?',
      sep: ', '
    }
  };
};
SprykerQueryBuilder.prototype.getSqlRuleOperators = function () {
  return {
    CONTAINS: function (v) {
      return {
        val: v,
        op: 'contains'
      };
    },
    'DOES NOT CONTAIN': function (v) {
      return {
        val: v,
        op: 'not_contains'
      };
    },
    'IS IN': function (v) {
      return {
        val: v,
        op: 'in'
      };
    },
    'IS NOT IN': function (v) {
      return {
        val: v,
        op: 'not_in'
      };
    }
  };
};
SprykerQueryBuilder.prototype.saveQuery = function () {
  if (!this.inputElement.parent().hasClass('hidden')) {
    return;
  }
  var status = this.builder.queryBuilder('getRules') || {};
  if (!status.rules || !status.rules.length) {
    return this.inputElement.val('');
  }
  var result = this.builder.queryBuilder('getSQL', false);
  if (result != '') {
    this.builder.queryBuilder('validate');
  }
  this.inputElement.val(result.sql);
};
module.exports = SprykerQueryBuilder;

/***/ }),

/***/ "./vendor/spryker/discount/assets/Zed/js/modules/libs/sql-factory.js":
/*!***************************************************************************!*\
  !*** ./vendor/spryker/discount/assets/Zed/js/modules/libs/sql-factory.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


var SprykerQueryBuilder = __webpack_require__(/*! ./spryker-query-builder */ "./vendor/spryker/discount/assets/Zed/js/modules/libs/spryker-query-builder.js");
module.exports = function (inputElementId, targetElementId, disableValidation) {
  var inputElement = $(inputElementId);
  $(inputElement).parent().addClass('hidden');
  var options = {
    inputElement: inputElement,
    sqlQuery: inputElement.val(),
    ajaxUrl: inputElement.data('url'),
    label: inputElement.data('label'),
    targetElement: targetElementId,
    disableValidation: disableValidation || false
  };
  return new SprykerQueryBuilder(options);
};

/***/ }),

/***/ "./vendor/spryker/discount/assets/Zed/js/modules/main.js":
/*!***************************************************************!*\
  !*** ./vendor/spryker/discount/assets/Zed/js/modules/main.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SqlFactory = __webpack_require__(/*! ./libs/sql-factory */ "./vendor/spryker/discount/assets/Zed/js/modules/libs/sql-factory.js");
__webpack_require__(/*! jquery-datetimepicker */ "./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js");
__webpack_require__(/*! ../../sass/main.scss */ "./vendor/spryker/discount/assets/Zed/sass/main.scss");
function setDiscountAmountSymbol() {
  var value = $(this).val();
  var $amountAddon = $('#discount_discountCalculator_amount + .input-group-addon');
  if (/percent/i.test(value)) {
    $amountAddon.html('&#37;');
  } else {
    $amountAddon.html('&euro;');
  }
}
$(document).ready(function () {
  var sqlCalculationBuilder = SqlFactory('#discount_discountCalculator_collector_query_string', '#builder_calculation');
  var sqlConditionBuilder = SqlFactory('#discount_discountCondition_decision_rule_query_string', '#builder_condition', true);
  var isQueryStringCollectorSelected = $('#discount_discountCalculator_collectorStrategyType_0').is(':checked');
  $('#create-discount-button').on('click', function (e) {
    e.preventDefault();
    $(this).prop('disabled', true).addClass('disabled');
    if (isQueryStringCollectorSelected) {
      sqlCalculationBuilder.saveQuery();
    }
    sqlConditionBuilder.saveQuery();
    $('#discount-form').submit();
  });
  $('#btn-calculation-get').on('click', function (event) {
    sqlCalculationBuilder.toggleButton(event);
  });
  $('#btn-condition-get').on('click', function (event) {
    sqlConditionBuilder.toggleButton(event);
  });
  setDiscountAmountSymbol.apply($('#discount_discountCalculator_calculator_plugin'));
  $('#discount_discountCalculator_calculator_plugin').on('change', setDiscountAmountSymbol);
  var $inputFrom = $('#discount_discountGeneral_valid_from');
  var $inputTo = $('#discount_discountGeneral_valid_to');
  var defaultDateFormat = 'd.m.Y H:i';
  var inputFromFormat = $inputFrom.data('format') || defaultDateFormat;
  var inputToFormat = $inputTo.data('format') || defaultDateFormat;
  $inputFrom.datetimepicker({
    format: inputFromFormat,
    defaultTime: '00:00',
    todayButton: false,
    onShow: function () {
      if (!$inputTo.val()) {
        return;
      }
      this.setOptions({
        maxDate: $inputTo.datetimepicker('getValue')
      });
    },
    onClose: function () {
      if (!$inputTo.val()) {
        return;
      }
      var startDate = $inputFrom.datetimepicker('getValue');
      var endDate = $inputTo.datetimepicker('getValue');
      if (startDate > endDate) {
        $inputTo.datetimepicker({
          value: startDate
        });
      }
    }
  });
  $inputTo.datetimepicker({
    format: inputToFormat,
    defaultTime: '00:00',
    todayButton: false,
    onShow: function () {
      if (!$inputFrom.val()) {
        return;
      }
      this.setOptions({
        minDate: $inputFrom.datetimepicker('getValue')
      });
    },
    onClose: function () {
      if (!$inputFrom.val()) {
        return;
      }
      var startDate = $inputFrom.datetimepicker('getValue');
      var endDate = $inputTo.datetimepicker('getValue');
      if (startDate > endDate) {
        $inputFrom.datetimepicker({
          value: endDate
        });
      }
    }
  });
  $('#discount_discountCalculator_collectorStrategyType input').each(function (index, element) {
    $('#collector-type-' + $(element).val()).hide();
    if ($(element).is(':checked')) {
      $('#collector-type-' + $(element).val()).show();
    }
  });
  $('#discount_discountCalculator_collectorStrategyType input').on('click', function (event) {
    $('#discount_discountCalculator_collectorStrategyType input').each(function (index, element) {
      $('#collector-type-' + $(element).val()).hide();
    });
    $('#collector-type-' + $(event.target).val()).show();
  });
  $('#discount_discountCalculator_calculator_plugin').on('change', function (event) {
    $('.discount-calculation-input-type').each(function (index, element) {
      $(element).hide();
    });
    var activeCalculatorInputType = $('#discount_discountCalculator_calculator_plugin :selected').data('calculator-input-type');
    $('#' + activeCalculatorInputType).show();
  });
  var activeCalculatorInputType = $('#discount_discountCalculator_calculator_plugin :selected').data('calculator-input-type');
  $('#' + activeCalculatorInputType).show();
});

/***/ }),

/***/ "./vendor/spryker/discount/assets/Zed/js/spryker-zed-discount-main.entry.js":
/*!**********************************************************************************!*\
  !*** ./vendor/spryker/discount/assets/Zed/js/spryker-zed-discount-main.entry.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/discount/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./node_modules/@spryker/sql-parser-mistic/browser/sql-parser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@spryker/sql-parser-mistic/browser/sql-parser.js ***!
  \***********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * SQLParser 1.2.3
 * Copyright 2012-2015 Andy Kent <andy@forward.co.uk>
 * Copyright 2015-2018 Damien "Mistic" Sorel (https://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
(function(root) {
  var SQLParser = function() {
    function require(path){ return require[path]; }
    require['./lexer'] = new function() {
  var exports = this;
  // Generated by CoffeeScript 1.8.0
(function() {
  var Lexer;

  Lexer = (function() {
    var BOOLEAN, DBLSTRING, LITERAL, MATH, MATH_MULTI, NUMBER, PARAMETER, SEPARATOR, SQL_BETWEENS, SQL_CONDITIONALS, SQL_FUNCTIONS, SQL_OPERATORS, SQL_SORT_ORDERS, STAR, STRING, SUB_SELECT_OP, SUB_SELECT_UNARY_OP, WHITESPACE;

    function Lexer(sql, opts) {
      var bytesConsumed, i;
      if (opts == null) {
        opts = {};
      }
      this.sql = sql;
      this.preserveWhitespace = opts.preserveWhitespace || false;
      this.tokens = [];
      this.currentLine = 1;
      this.currentOffset = 0;
      i = 0;
      while (this.chunk = sql.slice(i)) {
        bytesConsumed = this.keywordToken() || this.starToken() || this.booleanToken() || this.functionToken() || this.windowExtension() || this.sortOrderToken() || this.seperatorToken() || this.operatorToken() || this.numberToken() || this.mathToken() || this.dotToken() || this.conditionalToken() || this.betweenToken() || this.subSelectOpToken() || this.subSelectUnaryOpToken() || this.stringToken() || this.parameterToken() || this.parensToken() || this.whitespaceToken() || this.literalToken();
        if (bytesConsumed < 1) {
          throw new Error("NOTHING CONSUMED: Stopped at - '" + (this.chunk.slice(0, 30)) + "'");
        }
        i += bytesConsumed;
        this.currentOffset += bytesConsumed;
      }
      this.token('EOF', '');
      this.postProcess();
    }

    Lexer.prototype.postProcess = function() {
      var i, next_token, token, _i, _len, _ref, _results;
      _ref = this.tokens;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        token = _ref[i];
        if (token[0] === 'STAR') {
          next_token = this.tokens[i + 1];
          if (!(next_token[0] === 'SEPARATOR' || next_token[0] === 'FROM')) {
            _results.push(token[0] = 'MATH_MULTI');
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Lexer.prototype.token = function(name, value) {
      return this.tokens.push([name, value, this.currentLine, this.currentOffset]);
    };

    Lexer.prototype.tokenizeFromStringRegex = function(name, regex, part, lengthPart, output) {
      var match, partMatch;
      if (part == null) {
        part = 0;
      }
      if (lengthPart == null) {
        lengthPart = part;
      }
      if (output == null) {
        output = true;
      }
      if (!(match = regex.exec(this.chunk))) {
        return 0;
      }
      partMatch = match[part].replace(/''/g, "'");
      if (output) {
        this.token(name, partMatch);
      }
      return match[lengthPart].length;
    };

    Lexer.prototype.tokenizeFromRegex = function(name, regex, part, lengthPart, output) {
      var match, partMatch;
      if (part == null) {
        part = 0;
      }
      if (lengthPart == null) {
        lengthPart = part;
      }
      if (output == null) {
        output = true;
      }
      if (!(match = regex.exec(this.chunk))) {
        return 0;
      }
      partMatch = match[part];
      if (output) {
        this.token(name, partMatch);
      }
      return match[lengthPart].length;
    };

    Lexer.prototype.tokenizeFromWord = function(name, word) {
      var match, matcher;
      if (word == null) {
        word = name;
      }
      word = this.regexEscape(word);
      matcher = /^\w+$/.test(word) ? new RegExp("^(" + word + ")\\b", 'ig') : new RegExp("^(" + word + ")", 'ig');
      match = matcher.exec(this.chunk);
      if (!match) {
        return 0;
      }
      this.token(name, match[1]);
      return match[1].length;
    };

    Lexer.prototype.tokenizeFromList = function(name, list) {
      var entry, ret, _i, _len;
      ret = 0;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        entry = list[_i];
        ret = this.tokenizeFromWord(name, entry);
        if (ret > 0) {
          break;
        }
      }
      return ret;
    };

    Lexer.prototype.keywordToken = function() {
      return this.tokenizeFromWord('SELECT') || this.tokenizeFromWord('INSERT') || this.tokenizeFromWord('INTO') || this.tokenizeFromWord('DEFAULT') || this.tokenizeFromWord('VALUES') || this.tokenizeFromWord('DISTINCT') || this.tokenizeFromWord('FROM') || this.tokenizeFromWord('WHERE') || this.tokenizeFromWord('GROUP') || this.tokenizeFromWord('ORDER') || this.tokenizeFromWord('BY') || this.tokenizeFromWord('HAVING') || this.tokenizeFromWord('LIMIT') || this.tokenizeFromWord('JOIN') || this.tokenizeFromWord('LEFT') || this.tokenizeFromWord('RIGHT') || this.tokenizeFromWord('INNER') || this.tokenizeFromWord('OUTER') || this.tokenizeFromWord('ON') || this.tokenizeFromWord('AS') || this.tokenizeFromWord('CASE') || this.tokenizeFromWord('WHEN') || this.tokenizeFromWord('THEN') || this.tokenizeFromWord('ELSE') || this.tokenizeFromWord('END') || this.tokenizeFromWord('UNION') || this.tokenizeFromWord('ALL') || this.tokenizeFromWord('LIMIT') || this.tokenizeFromWord('OFFSET') || this.tokenizeFromWord('FETCH') || this.tokenizeFromWord('ROW') || this.tokenizeFromWord('ROWS') || this.tokenizeFromWord('ONLY') || this.tokenizeFromWord('NEXT') || this.tokenizeFromWord('FIRST');
    };

    Lexer.prototype.dotToken = function() {
      return this.tokenizeFromWord('DOT', '.');
    };

    Lexer.prototype.operatorToken = function() {
      return this.tokenizeFromList('OPERATOR', SQL_OPERATORS);
    };

    Lexer.prototype.mathToken = function() {
      return this.tokenizeFromList('MATH', MATH) || this.tokenizeFromList('MATH_MULTI', MATH_MULTI);
    };

    Lexer.prototype.conditionalToken = function() {
      return this.tokenizeFromList('CONDITIONAL', SQL_CONDITIONALS);
    };

    Lexer.prototype.betweenToken = function() {
      return this.tokenizeFromList('BETWEEN', SQL_BETWEENS);
    };

    Lexer.prototype.subSelectOpToken = function() {
      return this.tokenizeFromList('SUB_SELECT_OP', SUB_SELECT_OP);
    };

    Lexer.prototype.subSelectUnaryOpToken = function() {
      return this.tokenizeFromList('SUB_SELECT_UNARY_OP', SUB_SELECT_UNARY_OP);
    };

    Lexer.prototype.functionToken = function() {
      return this.tokenizeFromList('FUNCTION', SQL_FUNCTIONS);
    };

    Lexer.prototype.sortOrderToken = function() {
      return this.tokenizeFromList('DIRECTION', SQL_SORT_ORDERS);
    };

    Lexer.prototype.booleanToken = function() {
      return this.tokenizeFromList('BOOLEAN', BOOLEAN);
    };

    Lexer.prototype.starToken = function() {
      return this.tokenizeFromRegex('STAR', STAR);
    };

    Lexer.prototype.seperatorToken = function() {
      return this.tokenizeFromRegex('SEPARATOR', SEPARATOR);
    };

    Lexer.prototype.literalToken = function() {
      return this.tokenizeFromRegex('LITERAL', LITERAL, 1, 0);
    };

    Lexer.prototype.numberToken = function() {
      return this.tokenizeFromRegex('NUMBER', NUMBER);
    };

    Lexer.prototype.parameterToken = function() {
      return this.tokenizeFromRegex('PARAMETER', PARAMETER, 1, 0);
    };

    Lexer.prototype.stringToken = function() {
      return this.tokenizeFromStringRegex('STRING', STRING, 1, 0) || this.tokenizeFromRegex('DBLSTRING', DBLSTRING, 1, 0);
    };

    Lexer.prototype.parensToken = function() {
      return this.tokenizeFromRegex('LEFT_PAREN', /^\(/) || this.tokenizeFromRegex('RIGHT_PAREN', /^\)/);
    };

    Lexer.prototype.windowExtension = function() {
      var match;
      match = /^\.(win):(length|time)/i.exec(this.chunk);
      if (!match) {
        return 0;
      }
      this.token('WINDOW', match[1]);
      this.token('WINDOW_FUNCTION', match[2]);
      return match[0].length;
    };

    Lexer.prototype.whitespaceToken = function() {
      var match, newlines, partMatch;
      if (!(match = WHITESPACE.exec(this.chunk))) {
        return 0;
      }
      partMatch = match[0];
      if (this.preserveWhitespace) {
        this.token('WHITESPACE', partMatch);
      }
      newlines = partMatch.match(/\n/g, '');
      this.currentLine += (newlines != null ? newlines.length : void 0) || 0;
      return partMatch.length;
    };

    Lexer.prototype.regexEscape = function(str) {
      return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    SQL_FUNCTIONS = ['AVG', 'COUNT', 'MIN', 'MAX', 'SUM'];

    SQL_SORT_ORDERS = ['ASC', 'DESC'];

    SQL_OPERATORS = ['=', '!=', '>=', '>', '<=', '<>', '<', 'LIKE', 'CONTAINS', 'DOES NOT CONTAIN', 'IS IN', 'IS NOT IN'];

    SUB_SELECT_OP = ['ANY', 'ALL', 'SOME'];

    SUB_SELECT_UNARY_OP = ['EXISTS'];

    SQL_CONDITIONALS = ['AND', 'OR'];

    SQL_BETWEENS = ['BETWEEN', 'NOT BETWEEN'];

    BOOLEAN = ['TRUE', 'FALSE', 'NULL'];

    MATH = ['+', '-', '||', '&&'];

    MATH_MULTI = ['/', '*'];

    STAR = /^\*/;

    SEPARATOR = /^,/;

    WHITESPACE = /^[ \n\r]+/;

    LITERAL = /^`?([a-z_\-][a-z0-9_\-]{0,}(\:(number|float|string|date|boolean))?)`?/i;

    PARAMETER = /^\$([a-z0-9_]+(\:(number|float|string|date|boolean))?)/;

    NUMBER = /^[+-]?[0-9]+(\.[0-9]+)?/;

    STRING = /^'((?:[^\\']+?|\\.|'')*)'(?!')/;

    DBLSTRING = /^"([^\\"]*(?:\\.[^\\"]*)*)"/;

    return Lexer;

  })();

  exports.tokenize = function(sql, opts) {
    return (new Lexer(sql, opts)).tokens;
  };

}).call(this);

};require['./compiled_parser'] = new function() {
  var exports = this;
  /* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[5,26],$V2=[1,14],$V3=[1,13],$V4=[5,26,31,42],$V5=[1,17],$V6=[5,26,31,42,45,62],$V7=[1,27],$V8=[1,29],$V9=[1,40],$Va=[1,42],$Vb=[1,46],$Vc=[1,47],$Vd=[1,43],$Ve=[1,44],$Vf=[1,41],$Vg=[1,45],$Vh=[1,25],$Vi=[5,26,31],$Vj=[5,26,31,42,45],$Vk=[1,59],$Vl=[18,43],$Vm=[1,62],$Vn=[1,63],$Vo=[1,64],$Vp=[1,65],$Vq=[1,66],$Vr=[5,18,23,26,31,34,37,38,41,42,43,45,62,64,65,66,67,68,70,78,81,82,83],$Vs=[5,18,23,26,31,34,37,38,41,42,43,44,45,51,62,64,65,66,67,68,70,71,78,81,82,83,89,90,91,92,93,94,96],$Vt=[1,74],$Vu=[1,77],$Vv=[2,93],$Vw=[1,91],$Vx=[1,92],$Vy=[5,18,23,26,31,34,37,38,41,42,43,45,62,64,65,66,67,68,70,78,81,82,83,89,90,91,92,93,94,96],$Vz=[78,81,83],$VA=[1,116],$VB=[5,26,31,42,43,44],$VC=[1,124],$VD=[5,26,31,42,43,45,64],$VE=[5,26,31,41,42,45,62],$VF=[1,127],$VG=[1,128],$VH=[1,129],$VI=[5,26,31,34,35,37,38,41,42,45,62],$VJ=[5,18,23,26,31,34,37,38,41,42,43,45,62,64,70,78,81,82,83],$VK=[5,26,31,34,37,38,41,42,45,62],$VL=[5,26,31,42,56,58];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"Root":3,"Query":4,"EOF":5,"SelectQuery":6,"Unions":7,"SelectWithLimitQuery":8,"BasicSelectQuery":9,"Select":10,"OrderClause":11,"GroupClause":12,"LimitClause":13,"SelectClause":14,"WhereClause":15,"SELECT":16,"Fields":17,"FROM":18,"Table":19,"DISTINCT":20,"Joins":21,"Literal":22,"AS":23,"LEFT_PAREN":24,"List":25,"RIGHT_PAREN":26,"WINDOW":27,"WINDOW_FUNCTION":28,"Number":29,"Union":30,"UNION":31,"ALL":32,"Join":33,"JOIN":34,"ON":35,"Expression":36,"LEFT":37,"RIGHT":38,"INNER":39,"OUTER":40,"WHERE":41,"LIMIT":42,"SEPARATOR":43,"OFFSET":44,"ORDER":45,"BY":46,"OrderArgs":47,"OffsetClause":48,"OrderArg":49,"Value":50,"DIRECTION":51,"OffsetRows":52,"FetchClause":53,"ROW":54,"ROWS":55,"FETCH":56,"FIRST":57,"ONLY":58,"NEXT":59,"GroupBasicClause":60,"HavingClause":61,"GROUP":62,"ArgumentList":63,"HAVING":64,"MATH":65,"MATH_MULTI":66,"OPERATOR":67,"BETWEEN":68,"BetweenExpression":69,"CONDITIONAL":70,"SUB_SELECT_OP":71,"SubSelectExpression":72,"SUB_SELECT_UNARY_OP":73,"WhitepaceList":74,"CaseStatement":75,"CASE":76,"CaseWhens":77,"END":78,"CaseElse":79,"CaseWhen":80,"WHEN":81,"THEN":82,"ELSE":83,"String":84,"Function":85,"UserFunction":86,"Boolean":87,"Parameter":88,"NUMBER":89,"BOOLEAN":90,"PARAMETER":91,"STRING":92,"DBLSTRING":93,"LITERAL":94,"DOT":95,"FUNCTION":96,"AggregateArgumentList":97,"Case":98,"Field":99,"STAR":100,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",16:"SELECT",18:"FROM",20:"DISTINCT",23:"AS",24:"LEFT_PAREN",26:"RIGHT_PAREN",27:"WINDOW",28:"WINDOW_FUNCTION",31:"UNION",32:"ALL",34:"JOIN",35:"ON",37:"LEFT",38:"RIGHT",39:"INNER",40:"OUTER",41:"WHERE",42:"LIMIT",43:"SEPARATOR",44:"OFFSET",45:"ORDER",46:"BY",51:"DIRECTION",54:"ROW",55:"ROWS",56:"FETCH",57:"FIRST",58:"ONLY",59:"NEXT",62:"GROUP",64:"HAVING",65:"MATH",66:"MATH_MULTI",67:"OPERATOR",68:"BETWEEN",70:"CONDITIONAL",71:"SUB_SELECT_OP",73:"SUB_SELECT_UNARY_OP",76:"CASE",78:"END",81:"WHEN",82:"THEN",83:"ELSE",89:"NUMBER",90:"BOOLEAN",91:"PARAMETER",92:"STRING",93:"DBLSTRING",94:"LITERAL",95:"DOT",96:"FUNCTION",98:"Case",100:"STAR"},
productions_: [0,[3,2],[4,1],[4,2],[6,1],[6,1],[9,1],[9,2],[9,2],[9,3],[8,2],[10,1],[10,2],[14,4],[14,5],[14,5],[14,6],[19,1],[19,2],[19,3],[19,3],[19,3],[19,4],[19,6],[7,1],[7,2],[30,2],[30,3],[21,1],[21,2],[33,4],[33,5],[33,5],[33,6],[33,6],[33,6],[33,6],[15,2],[13,2],[13,4],[13,4],[11,3],[11,4],[47,1],[47,3],[49,1],[49,2],[48,2],[48,3],[52,2],[52,2],[53,4],[53,4],[12,1],[12,2],[60,3],[61,2],[36,3],[36,3],[36,3],[36,3],[36,3],[36,3],[36,5],[36,3],[36,2],[36,1],[36,1],[36,1],[36,1],[69,3],[75,3],[75,4],[80,4],[77,2],[77,1],[79,2],[72,3],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[74,2],[74,2],[25,1],[29,1],[87,1],[88,1],[84,1],[84,1],[22,1],[22,3],[85,4],[86,3],[86,4],[86,4],[97,1],[97,2],[63,1],[63,3],[17,1],[17,3],[99,1],[99,1],[99,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return this.$ = $$[$0-1];
break;
case 2: case 4: case 5: case 6: case 11: case 53: case 66: case 68: case 69: case 78: case 79: case 80: case 81: case 82: case 83: case 84:
this.$ = $$[$0];
break;
case 3:
this.$ = (function() {
        $$[$0-1].unions = $$[$0];
        return $$[$0-1];
      }());
break;
case 7:
this.$ = (function() {
        $$[$0-1].order = $$[$0];
        return $$[$0-1];
      }());
break;
case 8:
this.$ = (function() {
        $$[$0-1].group = $$[$0];
        return $$[$0-1];
      }());
break;
case 9:
this.$ = (function() {
        $$[$0-2].group = $$[$0-1];
        $$[$0-2].order = $$[$0];
        return $$[$0-2];
      }());
break;
case 10:
this.$ = (function() {
        $$[$0-1].limit = $$[$0];
        return $$[$0-1];
      }());
break;
case 12:
this.$ = (function() {
        $$[$0-1].where = $$[$0];
        return $$[$0-1];
      }());
break;
case 13:
this.$ = new yy.Select($$[$0-2], $$[$0], false);
break;
case 14:
this.$ = new yy.Select($$[$0-2], $$[$0], true);
break;
case 15:
this.$ = new yy.Select($$[$0-3], $$[$0-1], false, $$[$0]);
break;
case 16:
this.$ = new yy.Select($$[$0-3], $$[$0-1], true, $$[$0]);
break;
case 17:
this.$ = new yy.Table($$[$0]);
break;
case 18:
this.$ = new yy.Table($$[$0-1], $$[$0]);
break;
case 19:
this.$ = new yy.Table($$[$0-2], $$[$0]);
break;
case 20: case 49: case 50: case 51: case 52: case 57:
this.$ = $$[$0-1];
break;
case 21: case 77:
this.$ = new yy.SubSelect($$[$0-1]);
break;
case 22:
this.$ = new yy.SubSelect($$[$0-2], $$[$0]);
break;
case 23:
this.$ = new yy.Table($$[$0-5], null, $$[$0-4], $$[$0-3], $$[$0-1]);
break;
case 24: case 28: case 43: case 75: case 101: case 103:
this.$ = [$$[$0]];
break;
case 25: case 29: case 74:
this.$ = $$[$0-1].concat($$[$0]);
break;
case 26:
this.$ = new yy.Union($$[$0]);
break;
case 27:
this.$ = new yy.Union($$[$0], true);
break;
case 30:
this.$ = new yy.Join($$[$0-2], $$[$0]);
break;
case 31:
this.$ = new yy.Join($$[$0-2], $$[$0], 'LEFT');
break;
case 32:
this.$ = new yy.Join($$[$0-2], $$[$0], 'RIGHT');
break;
case 33:
this.$ = new yy.Join($$[$0-2], $$[$0], 'LEFT', 'INNER');
break;
case 34:
this.$ = new yy.Join($$[$0-2], $$[$0], 'RIGHT', 'INNER');
break;
case 35:
this.$ = new yy.Join($$[$0-2], $$[$0], 'LEFT', 'OUTER');
break;
case 36:
this.$ = new yy.Join($$[$0-2], $$[$0], 'RIGHT', 'OUTER');
break;
case 37:
this.$ = new yy.Where($$[$0]);
break;
case 38:
this.$ = new yy.Limit($$[$0]);
break;
case 39:
this.$ = new yy.Limit($$[$0], $$[$0-2]);
break;
case 40:
this.$ = new yy.Limit($$[$0-2], $$[$0]);
break;
case 41:
this.$ = new yy.Order($$[$0]);
break;
case 42:
this.$ = new yy.Order($$[$0-1], $$[$0]);
break;
case 44: case 102: case 104:
this.$ = $$[$0-2].concat($$[$0]);
break;
case 45:
this.$ = new yy.OrderArgument($$[$0], 'ASC');
break;
case 46:
this.$ = new yy.OrderArgument($$[$0-1], $$[$0]);
break;
case 47:
this.$ = new yy.Offset($$[$0]);
break;
case 48:
this.$ = new yy.Offset($$[$0-1], $$[$0]);
break;
case 54:
this.$ = (function() {
        $$[$0-1].having = $$[$0];
        return $$[$0-1];
      }());
break;
case 55:
this.$ = new yy.Group($$[$0]);
break;
case 56:
this.$ = new yy.Having($$[$0]);
break;
case 58: case 59: case 60: case 61: case 62: case 64:
this.$ = new yy.Op($$[$0-1], $$[$0-2], $$[$0]);
break;
case 63:
this.$ = new yy.Op($$[$0-3], $$[$0-4], $$[$0-1]);
break;
case 65:
this.$ = new yy.UnaryOp($$[$0-1], $$[$0]);
break;
case 67:
this.$ = new yy.WhitepaceList($$[$0]);
break;
case 70:
this.$ = new yy.BetweenOp([$$[$0-2], $$[$0]]);
break;
case 71:
this.$ = new yy.Case($$[$0-1]);
break;
case 72:
this.$ = new yy.Case($$[$0-2], $$[$0-1]);
break;
case 73:
this.$ = new yy.CaseWhen($$[$0-2], $$[$0]);
break;
case 76:
this.$ = new yy.CaseElse($$[$0]);
break;
case 85:
this.$ = [$$[$0-1], $$[$0]];
break;
case 86:
this.$ = (function() {
        $$[$0-1].push($$[$0]);
        return $$[$0-1];
      }());
break;
case 87:
this.$ = new yy.ListValue($$[$0]);
break;
case 88:
this.$ = new yy.NumberValue($$[$0]);
break;
case 89:
this.$ = new yy.BooleanValue($$[$0]);
break;
case 90:
this.$ = new yy.ParameterValue($$[$0]);
break;
case 91:
this.$ = new yy.StringValue($$[$0], "'");
break;
case 92:
this.$ = new yy.StringValue($$[$0], '"');
break;
case 93:
this.$ = new yy.LiteralValue($$[$0]);
break;
case 94:
this.$ = new yy.LiteralValue($$[$0-2], $$[$0]);
break;
case 95:
this.$ = new yy.FunctionValue($$[$0-3], $$[$0-1]);
break;
case 96:
this.$ = new yy.FunctionValue($$[$0-2], null, true);
break;
case 97: case 98:
this.$ = new yy.FunctionValue($$[$0-3], $$[$0-1], true);
break;
case 99:
this.$ = new yy.ArgumentListValue($$[$0]);
break;
case 100:
this.$ = new yy.ArgumentListValue($$[$0], true);
break;
case 105:
this.$ = new yy.Star();
break;
case 106:
this.$ = new yy.Field($$[$0]);
break;
case 107:
this.$ = new yy.Field($$[$0-2], $$[$0]);
break;
}
},
table: [{3:1,4:2,6:3,8:4,9:5,10:6,14:7,16:$V0},{1:[3]},{5:[1,9]},o($V1,[2,2],{7:10,13:11,30:12,31:$V2,42:$V3}),o($V4,[2,4]),o($V4,[2,5]),o($V4,[2,6],{11:15,12:16,60:18,45:$V5,62:[1,19]}),o($V6,[2,11],{15:20,41:[1,21]}),{17:22,20:[1,23],22:33,24:$V7,29:34,36:26,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg,99:24,100:$Vh},{1:[2,1]},o($V1,[2,3],{30:48,31:$V2}),o($V4,[2,10]),o($Vi,[2,24]),{29:49,89:$Va},{6:50,8:4,9:5,10:6,14:7,16:$V0,32:[1,51]},o($V4,[2,7]),o($V4,[2,8],{11:52,45:$V5}),{46:[1,53]},o($Vj,[2,53],{61:54,64:[1,55]}),{46:[1,56]},o($V6,[2,12]),{22:33,24:$V7,29:34,36:57,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{18:[1,58],43:$Vk},{17:60,22:33,24:$V7,29:34,36:26,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg,99:24,100:$Vh},o($Vl,[2,103]),o($Vl,[2,105]),o($Vl,[2,106],{23:[1,61],65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),{4:68,6:3,8:4,9:5,10:6,14:7,16:$V0,22:33,24:$V7,29:34,36:67,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($Vr,[2,69],{22:33,29:34,84:35,85:36,86:37,87:38,88:39,50:70,71:[1,69],89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg}),{24:[1,72],72:71},o($Vr,[2,66]),o($Vr,[2,67],{22:33,29:34,84:35,85:36,86:37,87:38,88:39,50:73,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg}),o($Vr,[2,68]),o($Vs,[2,78],{95:$Vt}),o($Vs,[2,79]),o($Vs,[2,80]),o($Vs,[2,81]),o($Vs,[2,82]),o($Vs,[2,83]),o($Vs,[2,84]),{77:75,80:76,81:$Vu},o([5,18,23,26,31,34,37,38,41,42,43,44,45,51,62,64,65,66,67,68,70,71,78,81,82,83,89,90,91,92,93,94,95,96],$Vv,{24:[1,78]}),o([5,18,23,26,31,34,37,38,41,42,43,44,45,51,54,55,62,64,65,66,67,68,70,71,78,81,82,83,89,90,91,92,93,94,96],[2,88]),o($Vs,[2,91]),o($Vs,[2,92]),{24:[1,79]},o($Vs,[2,89]),o($Vs,[2,90]),o($Vi,[2,25]),o($V4,[2,38],{43:[1,80],44:[1,81]}),o($Vi,[2,26],{13:11,42:$V3}),{6:82,8:4,9:5,10:6,14:7,16:$V0},o($V4,[2,9]),{22:33,29:34,47:83,49:84,50:85,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($Vj,[2,54]),{22:33,24:$V7,29:34,36:86,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{22:33,24:$V7,29:34,36:88,50:28,63:87,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($V6,[2,37],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),{19:89,22:90,24:$Vw,94:$Vx},{22:33,24:$V7,29:34,36:26,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg,99:93,100:$Vh},{18:[1,94],43:$Vk},{22:95,94:$Vx},{22:33,24:$V7,29:34,36:96,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{22:33,24:$V7,29:34,36:97,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{22:33,24:$V7,29:34,36:98,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{22:33,24:$V7,29:34,36:100,50:28,69:99,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{22:33,24:$V7,29:34,36:101,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{26:[1,102],65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq},{26:[1,103]},{24:[1,104],72:105},o($Vy,[2,85]),o($Vr,[2,65]),{4:68,6:3,8:4,9:5,10:6,14:7,16:$V0},o($Vy,[2,86]),{94:[1,106]},{78:[1,107],79:108,80:109,81:$Vu,83:[1,110]},o($Vz,[2,75]),{22:33,24:$V7,29:34,36:111,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{20:$VA,22:33,24:$V7,26:[1,112],29:34,36:88,50:28,63:115,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg,97:113,98:[1,114]},{20:$VA,22:33,24:$V7,29:34,36:88,50:28,63:115,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg,97:117},{29:118,89:$Va},{29:119,89:$Va},o($Vi,[2,27],{13:11,42:$V3}),o($V4,[2,41],{48:120,43:[1,121],44:[1,122]}),o($VB,[2,43]),o($VB,[2,45],{51:[1,123]}),o($Vj,[2,56],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),o([5,26,31,42,45,64],[2,55],{43:$VC}),o($VD,[2,101],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),o($VE,[2,13],{21:125,33:126,34:$VF,37:$VG,38:$VH}),o($VI,[2,17],{22:130,23:[1,131],27:[1,132],94:$Vx,95:$Vt}),{4:134,6:3,8:4,9:5,10:6,14:7,16:$V0,22:33,24:$V7,25:133,29:34,36:88,50:28,63:135,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o([5,18,23,26,27,31,34,35,37,38,41,42,43,45,62,94,95],$Vv),o($Vl,[2,104]),{19:136,22:90,24:$Vw,94:$Vx},o($Vl,[2,107],{95:$Vt}),o([5,18,23,26,31,34,37,38,41,42,43,45,62,64,65,67,70,78,81,82,83],[2,58],{66:$Vn,68:$Vp}),o([5,18,23,26,31,34,37,38,41,42,43,45,62,64,65,66,67,70,78,81,82,83],[2,59],{68:$Vp}),o([5,18,23,26,31,34,37,38,41,42,43,45,62,64,67,70,78,81,82,83],[2,60],{65:$Vm,66:$Vn,68:$Vp}),o($Vr,[2,61]),{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:[1,137]},o($VJ,[2,62],{65:$Vm,66:$Vn,67:$Vo,68:$Vp}),o($Vr,[2,57]),o($Vr,[2,77]),{4:68,6:3,8:4,9:5,10:6,14:7,16:$V0,22:33,24:$V7,25:138,29:34,36:88,50:28,63:135,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($Vr,[2,64]),o([5,18,23,26,27,31,34,35,37,38,41,42,43,44,45,51,62,64,65,66,67,68,70,71,78,81,82,83,89,90,91,92,93,94,95,96],[2,94]),o($Vr,[2,71]),{78:[1,139]},o($Vz,[2,74]),{22:33,24:$V7,29:34,36:140,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq,82:[1,141]},o($Vs,[2,96]),{26:[1,142]},{26:[1,143]},{26:[2,99],43:$VC},{22:33,24:$V7,29:34,36:88,50:28,63:144,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{26:[1,145]},o($V4,[2,39]),o($V4,[2,40]),o($V4,[2,42]),{22:33,29:34,49:146,50:85,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{29:148,52:147,89:$Va},o($VB,[2,46]),{22:33,24:$V7,29:34,36:149,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($VE,[2,15],{33:150,34:$VF,37:$VG,38:$VH}),o($VK,[2,28]),{19:151,22:90,24:$Vw,94:$Vx},{34:[1,152],39:[1,153],40:[1,154]},{34:[1,155],39:[1,156],40:[1,157]},o($VI,[2,18],{95:$Vt}),{22:158,94:$Vx},{28:[1,159]},{26:[1,160]},{26:[1,161]},{26:[2,87],43:$VC},o($VE,[2,14],{33:126,21:162,34:$VF,37:$VG,38:$VH}),{22:33,24:$V7,29:34,36:163,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{26:[1,164]},o($Vr,[2,72]),{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq,78:[2,76]},{22:33,24:$V7,29:34,36:165,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($Vs,[2,97]),o($Vs,[2,98]),{26:[2,100],43:$VC},o($Vs,[2,95]),o($VB,[2,44]),o($V4,[2,47],{53:166,56:[1,167]}),{54:[1,168],55:[1,169]},o($VD,[2,102],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),o($VK,[2,29]),{35:[1,170]},{19:171,22:90,24:$Vw,94:$Vx},{34:[1,172]},{34:[1,173]},{19:174,22:90,24:$Vw,94:$Vx},{34:[1,175]},{34:[1,176]},o($VI,[2,19],{95:$Vt}),{24:[1,177]},o($VI,[2,20]),o($VI,[2,21],{22:178,94:$Vx}),o($VE,[2,16],{33:150,34:$VF,37:$VG,38:$VH}),o($VJ,[2,70],{65:$Vm,66:$Vn,67:$Vo,68:$Vp}),o($Vr,[2,63]),o($Vz,[2,73],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),o($V4,[2,48]),{57:[1,179],59:[1,180]},o($VL,[2,49]),o($VL,[2,50]),{22:33,24:$V7,29:34,36:181,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{35:[1,182]},{19:183,22:90,24:$Vw,94:$Vx},{19:184,22:90,24:$Vw,94:$Vx},{35:[1,185]},{19:186,22:90,24:$Vw,94:$Vx},{19:187,22:90,24:$Vw,94:$Vx},{29:188,89:$Va},o($VI,[2,22],{95:$Vt}),{29:148,52:189,89:$Va},{29:148,52:190,89:$Va},o($VK,[2,30],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),{22:33,24:$V7,29:34,36:191,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{35:[1,192]},{35:[1,193]},{22:33,24:$V7,29:34,36:194,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{35:[1,195]},{35:[1,196]},{26:[1,197]},{58:[1,198]},{58:[1,199]},o($VK,[2,31],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),{22:33,24:$V7,29:34,36:200,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{22:33,24:$V7,29:34,36:201,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($VK,[2,32],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),{22:33,24:$V7,29:34,36:202,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},{22:33,24:$V7,29:34,36:203,50:28,72:30,73:$V8,74:31,75:32,76:$V9,84:35,85:36,86:37,87:38,88:39,89:$Va,90:$Vb,91:$Vc,92:$Vd,93:$Ve,94:$Vf,96:$Vg},o($VI,[2,23]),o($V4,[2,51]),o($V4,[2,52]),o($VK,[2,33],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),o($VK,[2,35],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),o($VK,[2,34],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq}),o($VK,[2,36],{65:$Vm,66:$Vn,67:$Vo,68:$Vp,70:$Vq})],
defaultActions: {9:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
};require['./nodes'] = new function() {
  var exports = this;
  // Generated by CoffeeScript 1.8.0
(function() {
  var ArgumentListValue, BetweenOp, Case, CaseElse, CaseWhen, Field, FunctionValue, Group, Having, Join, Limit, ListValue, LiteralValue, NumberValue, Offset, Op, Order, OrderArgument, ParameterValue, Select, Star, StringValue, SubSelect, Table, UnaryOp, Union, Where, WhitepaceList, indent;

  indent = function(str) {
    var line;
    return ((function() {
      var _i, _len, _ref, _results;
      _ref = str.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        _results.push("  " + line);
      }
      return _results;
    })()).join("\n");
  };

  exports.Select = Select = (function() {
    function Select(fields, source, distinct, joins, unions) {
      this.fields = fields;
      this.source = source;
      this.distinct = distinct != null ? distinct : false;
      this.joins = joins != null ? joins : [];
      this.unions = unions != null ? unions : [];
      this.order = null;
      this.group = null;
      this.where = null;
      this.limit = null;
    }

    Select.prototype.toString = function() {
      var join, ret, union, _i, _j, _len, _len1, _ref, _ref1;
      ret = ["SELECT " + (this.fields.join(', '))];
      ret.push(indent("FROM " + this.source));
      _ref = this.joins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        join = _ref[_i];
        ret.push(indent(join.toString()));
      }
      if (this.where) {
        ret.push(indent(this.where.toString()));
      }
      if (this.group) {
        ret.push(indent(this.group.toString()));
      }
      if (this.order) {
        ret.push(indent(this.order.toString()));
      }
      if (this.limit) {
        ret.push(indent(this.limit.toString()));
      }
      _ref1 = this.unions;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        union = _ref1[_j];
        ret.push(union.toString());
      }
      return ret.join("\n");
    };

    return Select;

  })();

  exports.SubSelect = SubSelect = (function() {
    function SubSelect(select, name) {
      this.select = select;
      this.name = name != null ? name : null;
      null;
    }

    SubSelect.prototype.toString = function() {
      var ret;
      ret = [];
      ret.push('(');
      ret.push(indent(this.select.toString()));
      ret.push(this.name ? ") " + (this.name.toString()) : ")");
      return ret.join("\n");
    };

    return SubSelect;

  })();

  exports.Join = Join = (function() {
    function Join(right, conditions, side, mode) {
      this.right = right;
      this.conditions = conditions != null ? conditions : null;
      this.side = side != null ? side : null;
      this.mode = mode != null ? mode : null;
      null;
    }

    Join.prototype.toString = function() {
      var ret;
      ret = '';
      if (this.side != null) {
        ret += "" + this.side + " ";
      }
      if (this.mode != null) {
        ret += "" + this.mode + " ";
      }
      return ret + ("JOIN " + this.right + "\n") + indent("ON " + this.conditions);
    };

    return Join;

  })();

  exports.Union = Union = (function() {
    function Union(query, all) {
      this.query = query;
      this.all = all != null ? all : false;
      null;
    }

    Union.prototype.toString = function() {
      var all;
      all = this.all ? ' ALL' : '';
      return "UNION" + all + "\n" + (this.query.toString());
    };

    return Union;

  })();

  exports.LiteralValue = LiteralValue = (function() {
    function LiteralValue(value, value2) {
      this.value = value;
      this.value2 = value2 != null ? value2 : null;
      if (this.value2) {
        this.nested = true;
        this.values = this.value.values;
        this.values.push(value2);
      } else {
        this.nested = false;
        this.values = [this.value];
      }
    }

    LiteralValue.prototype.toString = function(quote) {
      if (quote == null) {
        quote = true;
      }
      if (quote) {
        return "`" + (this.values.join('`.`')) + "`";
      } else {
        return "" + (this.values.join('.'));
      }
    };

    return LiteralValue;

  })();

  exports.StringValue = StringValue = (function() {
    function StringValue(value, quoteType) {
      this.value = value;
      this.quoteType = quoteType != null ? quoteType : "''";
      null;
    }

    StringValue.prototype.toString = function() {
      var escaped;
      escaped = this.quoteType === "'" ? this.value.replace(/(^|[^\\])'/g, "$1''") : this.value;
      return "" + this.quoteType + escaped + this.quoteType;
    };

    return StringValue;

  })();

  exports.NumberValue = NumberValue = (function() {
    function NumberValue(value) {
      this.value = Number(value);
    }

    NumberValue.prototype.toString = function() {
      return this.value.toString();
    };

    return NumberValue;

  })();

  exports.ListValue = ListValue = (function() {
    function ListValue(value) {
      this.value = value;
      null;
    }

    ListValue.prototype.toString = function() {
      return "(" + (this.value.join(', ')) + ")";
    };

    return ListValue;

  })();

  exports.WhitepaceList = WhitepaceList = (function() {
    function WhitepaceList(value) {
      this.value = value;
      null;
    }

    WhitepaceList.prototype.toString = function() {
      return this.value.map(function(value) {
        if (value instanceof exports.LiteralValue) {
          return value.toString(false);
        } else {
          return value.toString();
        }
      }).join(' ');
    };

    return WhitepaceList;

  })();

  exports.ParameterValue = ParameterValue = (function() {
    function ParameterValue(value) {
      this.value = value;
      this.index = parseInt(value.substr(1), 10) - 1;
    }

    ParameterValue.prototype.toString = function() {
      return "$" + this.value;
    };

    return ParameterValue;

  })();

  exports.ArgumentListValue = ArgumentListValue = (function() {
    function ArgumentListValue(value, distinct) {
      this.value = value;
      this.distinct = distinct != null ? distinct : false;
      null;
    }

    ArgumentListValue.prototype.toString = function() {
      if (this.distinct) {
        return "DISTINCT " + (this.value.join(', '));
      } else {
        return "" + (this.value.join(', '));
      }
    };

    return ArgumentListValue;

  })();

  exports.BooleanValue = LiteralValue = (function() {
    function LiteralValue(value) {
      this.value = (function() {
        switch (value.toLowerCase()) {
          case 'true':
            return true;
          case 'false':
            return false;
          default:
            return null;
        }
      })();
    }

    LiteralValue.prototype.toString = function() {
      if (this.value != null) {
        return this.value.toString().toUpperCase();
      } else {
        return 'NULL';
      }
    };

    return LiteralValue;

  })();

  exports.FunctionValue = FunctionValue = (function() {
    function FunctionValue(name, _arguments, udf) {
      this.name = name;
      this["arguments"] = _arguments != null ? _arguments : null;
      this.udf = udf != null ? udf : false;
      null;
    }

    FunctionValue.prototype.toString = function() {
      if (this["arguments"]) {
        return "" + (this.name.toUpperCase()) + "(" + (this["arguments"].toString()) + ")";
      } else {
        return "" + (this.name.toUpperCase()) + "()";
      }
    };

    return FunctionValue;

  })();

  exports.Case = Case = (function() {
    function Case(whens, _else) {
      this.whens = whens;
      this["else"] = _else;
    }

    Case.prototype.toString = function() {
      var whensStr;
      whensStr = this.whens.map(function(w) {
        return w.toString();
      }).join(' ');
      if (this["else"]) {
        return "CASE " + whensStr + " " + (this["else"].toString()) + " END";
      } else {
        return "CASE " + whensStr + " END";
      }
    };

    return Case;

  })();

  exports.CaseWhen = CaseWhen = (function() {
    function CaseWhen(whenCondition, resCondition) {
      this.whenCondition = whenCondition;
      this.resCondition = resCondition;
    }

    CaseWhen.prototype.toString = function() {
      return "WHEN " + this.whenCondition + " THEN " + this.resCondition;
    };

    return CaseWhen;

  })();

  exports.CaseElse = CaseElse = (function() {
    function CaseElse(elseCondition) {
      this.elseCondition = elseCondition;
    }

    CaseElse.prototype.toString = function() {
      return "ELSE " + this.elseCondition;
    };

    return CaseElse;

  })();

  exports.Order = Order = (function() {
    function Order(orderings, offset) {
      this.orderings = orderings;
      this.offset = offset;
    }

    Order.prototype.toString = function() {
      return ("ORDER BY " + (this.orderings.join(', '))) + (this.offset ? "\n" + this.offset.toString() : "");
    };

    return Order;

  })();

  exports.OrderArgument = OrderArgument = (function() {
    function OrderArgument(value, direction) {
      this.value = value;
      this.direction = direction != null ? direction : 'ASC';
      null;
    }

    OrderArgument.prototype.toString = function() {
      return "" + this.value + " " + this.direction;
    };

    return OrderArgument;

  })();

  exports.Offset = Offset = (function() {
    function Offset(row_count, limit) {
      this.row_count = row_count;
      this.limit = limit;
      null;
    }

    Offset.prototype.toString = function() {
      return ("OFFSET " + this.row_count + " ROWS") + (this.limit ? "\nFETCH NEXT " + this.limit + " ROWS ONLY" : "");
    };

    return Offset;

  })();

  exports.Limit = Limit = (function() {
    function Limit(value, offset) {
      this.value = value;
      this.offset = offset;
      null;
    }

    Limit.prototype.toString = function() {
      return ("LIMIT " + this.value) + (this.offset ? "\nOFFSET " + this.offset : "");
    };

    return Limit;

  })();

  exports.Table = Table = (function() {
    function Table(name, alias, win, winFn, winArg) {
      this.name = name;
      this.alias = alias != null ? alias : null;
      this.win = win != null ? win : null;
      this.winFn = winFn != null ? winFn : null;
      this.winArg = winArg != null ? winArg : null;
      null;
    }

    Table.prototype.toString = function() {
      if (this.win) {
        return "" + this.name + "." + this.win + ":" + this.winFn + "(" + this.winArg + ")";
      } else if (this.alias) {
        return "" + this.name + " AS " + this.alias;
      } else {
        return this.name.toString();
      }
    };

    return Table;

  })();

  exports.Group = Group = (function() {
    function Group(fields) {
      this.fields = fields;
      this.having = null;
    }

    Group.prototype.toString = function() {
      var ret;
      ret = ["GROUP BY " + (this.fields.join(', '))];
      if (this.having) {
        ret.push(this.having.toString());
      }
      return ret.join("\n");
    };

    return Group;

  })();

  exports.Where = Where = (function() {
    function Where(conditions) {
      this.conditions = conditions;
      null;
    }

    Where.prototype.toString = function() {
      return "WHERE " + this.conditions;
    };

    return Where;

  })();

  exports.Having = Having = (function() {
    function Having(conditions) {
      this.conditions = conditions;
      null;
    }

    Having.prototype.toString = function() {
      return "HAVING " + this.conditions;
    };

    return Having;

  })();

  exports.Op = Op = (function() {
    function Op(operation, left, right) {
      this.operation = operation;
      this.left = left;
      this.right = right;
      null;
    }

    Op.prototype.toString = function() {
      return "(" + this.left + " " + (this.operation.toUpperCase()) + " " + this.right + ")";
    };

    return Op;

  })();

  exports.UnaryOp = UnaryOp = (function() {
    function UnaryOp(operator, operand) {
      this.operator = operator;
      this.operand = operand;
      null;
    }

    UnaryOp.prototype.toString = function() {
      return "(" + (this.operator.toUpperCase()) + " " + this.operand + ")";
    };

    return UnaryOp;

  })();

  exports.BetweenOp = BetweenOp = (function() {
    function BetweenOp(value) {
      this.value = value;
      null;
    }

    BetweenOp.prototype.toString = function() {
      return "" + (this.value.join(' AND '));
    };

    return BetweenOp;

  })();

  exports.Field = Field = (function() {
    function Field(field, name) {
      this.field = field;
      this.name = name != null ? name : null;
      null;
    }

    Field.prototype.toString = function() {
      if (this.name) {
        return "" + this.field + " AS " + this.name;
      } else {
        return this.field.toString();
      }
    };

    return Field;

  })();

  exports.Star = Star = (function() {
    function Star() {
      null;
    }

    Star.prototype.toString = function() {
      return '*';
    };

    Star.prototype.star = true;

    return Star;

  })();

}).call(this);

};require['./parser'] = new function() {
  var exports = this;
  // Generated by CoffeeScript 1.8.0
(function() {
  var buildParser;

  buildParser = function() {
    var parser;
    parser = require('./compiled_parser').parser;
    parser.lexer = {
      lex: function() {
        var tag, _ref;
        _ref = this.tokens[this.pos++] || [''], tag = _ref[0], this.yytext = _ref[1], this.yylineno = _ref[2];
        return tag;
      },
      setInput: function(tokens) {
        this.tokens = tokens;
        return this.pos = 0;
      },
      upcomingInput: function() {
        return "";
      }
    };
    parser.yy = require('./nodes');
    return parser;
  };

  exports.parser = buildParser();

  exports.parse = function(str) {
    return buildParser().parse(str);
  };

}).call(this);

};require['./sql_parser'] = new function() {
  var exports = this;
  // Generated by CoffeeScript 1.8.0
(function() {
  exports.lexer = require('./lexer');

  exports.parser = require('./parser');

  exports.nodes = require('./nodes');

  exports.parse = function(sql) {
    return exports.parser.parse(exports.lexer.tokenize(sql));
  };

}).call(this);

};
    return require['./sql_parser']
  }();

  if(true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return SQLParser }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this));


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

/***/ "./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js":
/*!************************************************************************************!*\
  !*** ./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js ***!
  \************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var DateFormatter;!function(){"use strict";var D,s,r,a,n;D=function(e,t){return"string"==typeof e&&"string"==typeof t&&e.toLowerCase()===t.toLowerCase()},s=function(e,t,a){var n=a||"0",r=e.toString();return r.length<t?s(n+r,t):r},r=function(e){var t,a;for(e=e||{},t=1;t<arguments.length;t++)if(a=arguments[t])for(var n in a)a.hasOwnProperty(n)&&("object"==typeof a[n]?r(e[n],a[n]):e[n]=a[n]);return e},a=function(e,t){for(var a=0;a<t.length;a++)if(t[a].toLowerCase()===e.toLowerCase())return a;return-1},n={dateSettings:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],meridiem:["AM","PM"],ordinal:function(e){var t=e%10,a={1:"st",2:"nd",3:"rd"};return 1!==Math.floor(e%100/10)&&a[t]?a[t]:"th"}},separators:/[ \-+\/\.T:@]/g,validParts:/[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,intParts:/[djwNzmnyYhHgGis]/g,tzParts:/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,tzClip:/[^-+\dA-Z]/g},(DateFormatter=function(e){var t=this,a=r(n,e);t.dateSettings=a.dateSettings,t.separators=a.separators,t.validParts=a.validParts,t.intParts=a.intParts,t.tzParts=a.tzParts,t.tzClip=a.tzClip}).prototype={constructor:DateFormatter,getMonth:function(e){var t;return 0===(t=a(e,this.dateSettings.monthsShort)+1)&&(t=a(e,this.dateSettings.months)+1),t},parseDate:function(e,t){var a,n,r,o,i,s,d,u,l,f,c=this,m=!1,h=!1,g=c.dateSettings,p={date:null,year:null,month:null,day:null,hour:0,min:0,sec:0};if(!e)return null;if(e instanceof Date)return e;if("U"===t)return(r=parseInt(e))?new Date(1e3*r):e;switch(typeof e){case"number":return new Date(e);case"string":break;default:return null}if(!(a=t.match(c.validParts))||0===a.length)throw new Error("Invalid date format definition.");for(n=e.replace(c.separators,"\0").split("\0"),r=0;r<n.length;r++)switch(o=n[r],i=parseInt(o),a[r]){case"y":case"Y":if(!i)return null;l=o.length,p.year=2===l?parseInt((i<70?"20":"19")+o):i,m=!0;break;case"m":case"n":case"M":case"F":if(isNaN(i)){if(!(0<(s=c.getMonth(o))))return null;p.month=s}else{if(!(1<=i&&i<=12))return null;p.month=i}m=!0;break;case"d":case"j":if(!(1<=i&&i<=31))return null;p.day=i,m=!0;break;case"g":case"h":if(f=n[d=-1<a.indexOf("a")?a.indexOf("a"):-1<a.indexOf("A")?a.indexOf("A"):-1],-1<d)u=D(f,g.meridiem[0])?0:D(f,g.meridiem[1])?12:-1,1<=i&&i<=12&&-1<u?p.hour=i+u-1:0<=i&&i<=23&&(p.hour=i);else{if(!(0<=i&&i<=23))return null;p.hour=i}h=!0;break;case"G":case"H":if(!(0<=i&&i<=23))return null;p.hour=i,h=!0;break;case"i":if(!(0<=i&&i<=59))return null;p.min=i,h=!0;break;case"s":if(!(0<=i&&i<=59))return null;p.sec=i,h=!0}if(!0===m&&p.year&&p.month&&p.day)p.date=new Date(p.year,p.month-1,p.day,p.hour,p.min,p.sec,0);else{if(!0!==h)return null;p.date=new Date(0,0,0,p.hour,p.min,p.sec,0)}return p.date},guessDate:function(e,t){if("string"!=typeof e)return e;var a,n,r,o,i,s,d=e.replace(this.separators,"\0").split("\0"),u=t.match(this.validParts),l=new Date,f=0;if(!/^[djmn]/g.test(u[0]))return e;for(r=0;r<d.length;r++){if(f=2,i=d[r],s=parseInt(i.substr(0,2)),isNaN(s))return null;switch(r){case 0:"m"===u[0]||"n"===u[0]?l.setMonth(s-1):l.setDate(s);break;case 1:"m"===u[0]||"n"===u[0]?l.setDate(s):l.setMonth(s-1);break;case 2:if(n=l.getFullYear(),f=(a=i.length)<4?a:4,!(n=parseInt(a<4?n.toString().substr(0,4-a)+i:i.substr(0,4))))return null;l.setFullYear(n);break;case 3:l.setHours(s);break;case 4:l.setMinutes(s);break;case 5:l.setSeconds(s)}0<(o=i.substr(f)).length&&d.splice(r+1,0,o)}return l},parseFormat:function(e,n){var a,t=this,r=t.dateSettings,o=/\\?(.?)/gi,i=function(e,t){return a[e]?a[e]():t};return a={d:function(){return s(a.j(),2)},D:function(){return r.daysShort[a.w()]},j:function(){return n.getDate()},l:function(){return r.days[a.w()]},N:function(){return a.w()||7},w:function(){return n.getDay()},z:function(){var e=new Date(a.Y(),a.n()-1,a.j()),t=new Date(a.Y(),0,1);return Math.round((e-t)/864e5)},W:function(){var e=new Date(a.Y(),a.n()-1,a.j()-a.N()+3),t=new Date(e.getFullYear(),0,4);return s(1+Math.round((e-t)/864e5/7),2)},F:function(){return r.months[n.getMonth()]},m:function(){return s(a.n(),2)},M:function(){return r.monthsShort[n.getMonth()]},n:function(){return n.getMonth()+1},t:function(){return new Date(a.Y(),a.n(),0).getDate()},L:function(){var e=a.Y();return e%4==0&&e%100!=0||e%400==0?1:0},o:function(){var e=a.n(),t=a.W();return a.Y()+(12===e&&t<9?1:1===e&&9<t?-1:0)},Y:function(){return n.getFullYear()},y:function(){return a.Y().toString().slice(-2)},a:function(){return a.A().toLowerCase()},A:function(){var e=a.G()<12?0:1;return r.meridiem[e]},B:function(){var e=3600*n.getUTCHours(),t=60*n.getUTCMinutes(),a=n.getUTCSeconds();return s(Math.floor((e+t+a+3600)/86.4)%1e3,3)},g:function(){return a.G()%12||12},G:function(){return n.getHours()},h:function(){return s(a.g(),2)},H:function(){return s(a.G(),2)},i:function(){return s(n.getMinutes(),2)},s:function(){return s(n.getSeconds(),2)},u:function(){return s(1e3*n.getMilliseconds(),6)},e:function(){return/\((.*)\)/.exec(String(n))[1]||"Coordinated Universal Time"},I:function(){return new Date(a.Y(),0)-Date.UTC(a.Y(),0)!=new Date(a.Y(),6)-Date.UTC(a.Y(),6)?1:0},O:function(){var e=n.getTimezoneOffset(),t=Math.abs(e);return(0<e?"-":"+")+s(100*Math.floor(t/60)+t%60,4)},P:function(){var e=a.O();return e.substr(0,3)+":"+e.substr(3,2)},T:function(){return(String(n).match(t.tzParts)||[""]).pop().replace(t.tzClip,"")||"UTC"},Z:function(){return 60*-n.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(o,i)},r:function(){return"D, d M Y H:i:s O".replace(o,i)},U:function(){return n.getTime()/1e3||0}},i(e,e)},formatDate:function(e,t){var a,n,r,o,i,s="";if("string"==typeof e&&!(e=this.parseDate(e,t)))return null;if(e instanceof Date){for(r=t.length,a=0;a<r;a++)"S"!==(i=t.charAt(a))&&"\\"!==i&&(0<a&&"\\"===t.charAt(a-1)?s+=i:(o=this.parseFormat(i,e),a!==r-1&&this.intParts.test(i)&&"S"===t.charAt(a+1)&&(n=parseInt(o)||0,o+=this.dateSettings.ordinal(n)),s+=o));return s}return""}}}();var datetimepickerFactory=function(L){"use strict";var s={i18n:{ar:{months:["كانون الثاني","شباط","آذار","نيسان","مايو","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],dayOfWeekShort:["ن","ث","ع","خ","ج","س","ح"],dayOfWeek:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"]},ro:{months:["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"],dayOfWeekShort:["Du","Lu","Ma","Mi","Jo","Vi","Sâ"],dayOfWeek:["Duminică","Luni","Marţi","Miercuri","Joi","Vineri","Sâmbătă"]},id:{months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],dayOfWeekShort:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],dayOfWeek:["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]},is:{months:["Janúar","Febrúar","Mars","Apríl","Maí","Júní","Júlí","Ágúst","September","Október","Nóvember","Desember"],dayOfWeekShort:["Sun","Mán","Þrið","Mið","Fim","Fös","Lau"],dayOfWeek:["Sunnudagur","Mánudagur","Þriðjudagur","Miðvikudagur","Fimmtudagur","Föstudagur","Laugardagur"]},bg:{months:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],dayOfWeekShort:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],dayOfWeek:["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"]},fa:{months:["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"],dayOfWeekShort:["یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],dayOfWeek:["یک‌شنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه","جمعه","شنبه","یک‌شنبه"]},ru:{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],dayOfWeekShort:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],dayOfWeek:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]},uk:{months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],dayOfWeekShort:["Ндл","Пнд","Втр","Срд","Чтв","Птн","Сбт"],dayOfWeek:["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"]},en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},el:{months:["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],dayOfWeekShort:["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"],dayOfWeek:["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"]},de:{months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],dayOfWeekShort:["So","Mo","Di","Mi","Do","Fr","Sa"],dayOfWeek:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]},nl:{months:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],dayOfWeekShort:["zo","ma","di","wo","do","vr","za"],dayOfWeek:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},tr:{months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],dayOfWeekShort:["Paz","Pts","Sal","Çar","Per","Cum","Cts"],dayOfWeek:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]},fr:{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],dayOfWeekShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],dayOfWeek:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]},es:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],dayOfWeekShort:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],dayOfWeek:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]},th:{months:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],dayOfWeekShort:["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],dayOfWeek:["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์","อาทิตย์"]},pl:{months:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],dayOfWeekShort:["nd","pn","wt","śr","cz","pt","sb"],dayOfWeek:["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"]},pt:{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeekShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],dayOfWeek:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]},ch:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"]},se:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeekShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"]},km:{months:["មករា​","កុម្ភៈ","មិនា​","មេសា​","ឧសភា​","មិថុនា​","កក្កដា​","សីហា​","កញ្ញា​","តុលា​","វិច្ឆិកា","ធ្នូ​"],dayOfWeekShort:["អាទិ​","ច័ន្ទ​","អង្គារ​","ពុធ​","ព្រហ​​","សុក្រ​","សៅរ៍"],dayOfWeek:["អាទិត្យ​","ច័ន្ទ​","អង្គារ​","ពុធ​","ព្រហស្បតិ៍​","សុក្រ​","សៅរ៍"]},kr:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeekShort:["일","월","화","수","목","금","토"],dayOfWeek:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]},it:{months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],dayOfWeekShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],dayOfWeek:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"]},da:{months:["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"],dayOfWeekShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør"],dayOfWeek:["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"]},no:{months:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],dayOfWeekShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør"],dayOfWeek:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"]},ja:{months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dayOfWeekShort:["日","月","火","水","木","金","土"],dayOfWeek:["日曜","月曜","火曜","水曜","木曜","金曜","土曜"]},vi:{months:["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],dayOfWeekShort:["CN","T2","T3","T4","T5","T6","T7"],dayOfWeek:["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"]},sl:{months:["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"],dayOfWeekShort:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"],dayOfWeek:["Nedelja","Ponedeljek","Torek","Sreda","Četrtek","Petek","Sobota"]},cs:{months:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],dayOfWeekShort:["Ne","Po","Út","St","Čt","Pá","So"]},hu:{months:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],dayOfWeekShort:["Va","Hé","Ke","Sze","Cs","Pé","Szo"],dayOfWeek:["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"]},az:{months:["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],dayOfWeekShort:["B","Be","Ça","Ç","Ca","C","Ş"],dayOfWeek:["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"]},bs:{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeekShort:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"],dayOfWeek:["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"]},ca:{months:["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],dayOfWeekShort:["Dg","Dl","Dt","Dc","Dj","Dv","Ds"],dayOfWeek:["Diumenge","Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte"]},"en-GB":{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},et:{months:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],dayOfWeekShort:["P","E","T","K","N","R","L"],dayOfWeek:["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"]},eu:{months:["Urtarrila","Otsaila","Martxoa","Apirila","Maiatza","Ekaina","Uztaila","Abuztua","Iraila","Urria","Azaroa","Abendua"],dayOfWeekShort:["Ig.","Al.","Ar.","Az.","Og.","Or.","La."],dayOfWeek:["Igandea","Astelehena","Asteartea","Asteazkena","Osteguna","Ostirala","Larunbata"]},fi:{months:["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"],dayOfWeekShort:["Su","Ma","Ti","Ke","To","Pe","La"],dayOfWeek:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"]},gl:{months:["Xan","Feb","Maz","Abr","Mai","Xun","Xul","Ago","Set","Out","Nov","Dec"],dayOfWeekShort:["Dom","Lun","Mar","Mer","Xov","Ven","Sab"],dayOfWeek:["Domingo","Luns","Martes","Mércores","Xoves","Venres","Sábado"]},hr:{months:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],dayOfWeekShort:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"],dayOfWeek:["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"]},ko:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeekShort:["일","월","화","수","목","금","토"],dayOfWeek:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]},lt:{months:["Sausio","Vasario","Kovo","Balandžio","Gegužės","Birželio","Liepos","Rugpjūčio","Rugsėjo","Spalio","Lapkričio","Gruodžio"],dayOfWeekShort:["Sek","Pir","Ant","Tre","Ket","Pen","Šeš"],dayOfWeek:["Sekmadienis","Pirmadienis","Antradienis","Trečiadienis","Ketvirtadienis","Penktadienis","Šeštadienis"]},lv:{months:["Janvāris","Februāris","Marts","Aprīlis ","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"],dayOfWeekShort:["Sv","Pr","Ot","Tr","Ct","Pk","St"],dayOfWeek:["Svētdiena","Pirmdiena","Otrdiena","Trešdiena","Ceturtdiena","Piektdiena","Sestdiena"]},mk:{months:["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],dayOfWeekShort:["нед","пон","вто","сре","чет","пет","саб"],dayOfWeek:["Недела","Понеделник","Вторник","Среда","Четврток","Петок","Сабота"]},mn:{months:["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"],dayOfWeekShort:["Дав","Мяг","Лха","Пүр","Бсн","Бям","Ням"],dayOfWeek:["Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба","Ням"]},"pt-BR":{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeekShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],dayOfWeek:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]},sk:{months:["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"],dayOfWeekShort:["Ne","Po","Ut","St","Št","Pi","So"],dayOfWeek:["Nedeľa","Pondelok","Utorok","Streda","Štvrtok","Piatok","Sobota"]},sq:{months:["Janar","Shkurt","Mars","Prill","Maj","Qershor","Korrik","Gusht","Shtator","Tetor","Nëntor","Dhjetor"],dayOfWeekShort:["Die","Hën","Mar","Mër","Enj","Pre","Shtu"],dayOfWeek:["E Diel","E Hënë","E Martē","E Mërkurë","E Enjte","E Premte","E Shtunë"]},"sr-YU":{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeekShort:["Ned","Pon","Uto","Sre","čet","Pet","Sub"],dayOfWeek:["Nedelja","Ponedeljak","Utorak","Sreda","Četvrtak","Petak","Subota"]},sr:{months:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],dayOfWeekShort:["нед","пон","уто","сре","чет","пет","суб"],dayOfWeek:["Недеља","Понедељак","Уторак","Среда","Четвртак","Петак","Субота"]},sv:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeekShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"],dayOfWeek:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"]},"zh-TW":{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]},zh:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]},ug:{months:["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي"],dayOfWeek:["يەكشەنبە","دۈشەنبە","سەيشەنبە","چارشەنبە","پەيشەنبە","جۈمە","شەنبە"]},he:{months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],dayOfWeekShort:["א'","ב'","ג'","ד'","ה'","ו'","שבת"],dayOfWeek:["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת","ראשון"]},hy:{months:["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր"],dayOfWeekShort:["Կի","Երկ","Երք","Չոր","Հնգ","Ուրբ","Շբթ"],dayOfWeek:["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","Ուրբաթ","Շաբաթ"]},kg:{months:["Үчтүн айы","Бирдин айы","Жалган Куран","Чын Куран","Бугу","Кулжа","Теке","Баш Оона","Аяк Оона","Тогуздун айы","Жетинин айы","Бештин айы"],dayOfWeekShort:["Жек","Дүй","Шей","Шар","Бей","Жум","Ише"],dayOfWeek:["Жекшемб","Дүйшөмб","Шейшемб","Шаршемб","Бейшемби","Жума","Ишенб"]},rm:{months:["Schaner","Favrer","Mars","Avrigl","Matg","Zercladur","Fanadur","Avust","Settember","October","November","December"],dayOfWeekShort:["Du","Gli","Ma","Me","Gie","Ve","So"],dayOfWeek:["Dumengia","Glindesdi","Mardi","Mesemna","Gievgia","Venderdi","Sonda"]},ka:{months:["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"],dayOfWeekShort:["კვ","ორშ","სამშ","ოთხ","ხუთ","პარ","შაბ"],dayOfWeek:["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"]}},ownerDocument:document,contentWindow:window,value:"",rtl:!1,format:"Y/m/d H:i",formatTime:"H:i",formatDate:"Y/m/d",startDate:!1,step:60,monthChangeSpinner:!0,closeOnDateSelect:!1,closeOnTimeSelect:!0,closeOnWithoutClick:!0,closeOnInputClick:!0,openOnFocus:!0,timepicker:!0,datepicker:!0,weeks:!1,defaultTime:!1,defaultDate:!1,minDate:!1,maxDate:!1,minTime:!1,maxTime:!1,minDateTime:!1,maxDateTime:!1,allowTimes:[],opened:!1,initTime:!0,inline:!1,theme:"",touchMovedThreshold:5,onSelectDate:function(){},onSelectTime:function(){},onChangeMonth:function(){},onGetWeekOfYear:function(){},onChangeYear:function(){},onChangeDateTime:function(){},onShow:function(){},onClose:function(){},onGenerate:function(){},withoutCopyright:!0,inverseButton:!1,hours12:!1,next:"xdsoft_next",prev:"xdsoft_prev",dayOfWeekStart:0,parentID:"body",timeHeightInTimePicker:25,timepickerScrollbar:!0,todayButton:!0,prevButton:!0,nextButton:!0,defaultSelect:!0,scrollMonth:!0,scrollTime:!0,scrollInput:!0,lazyInit:!1,mask:!1,validateOnBlur:!0,allowBlank:!0,yearStart:1950,yearEnd:2050,monthStart:0,monthEnd:11,style:"",id:"",fixed:!1,roundTime:"round",className:"",weekends:[],highlightedDates:[],highlightedPeriods:[],allowDates:[],allowDateRe:null,disabledDates:[],disabledWeekDays:[],yearOffset:0,beforeShowDay:null,enterLikeTab:!0,showApplyButton:!1,insideParent:!1},E=null,n=null,R="en",a={meridiem:["AM","PM"]},r=function(){var e=s.i18n[R],t={days:e.dayOfWeek,daysShort:e.dayOfWeekShort,months:e.months,monthsShort:L.map(e.months,function(e){return e.substring(0,3)})};"function"==typeof DateFormatter&&(E=n=new DateFormatter({dateSettings:L.extend({},a,t)}))},o={moment:{default_options:{format:"YYYY/MM/DD HH:mm",formatDate:"YYYY/MM/DD",formatTime:"HH:mm"},formatter:{parseDate:function(e,t){if(i(t))return n.parseDate(e,t);var a=moment(e,t);return!!a.isValid()&&a.toDate()},formatDate:function(e,t){return i(t)?n.formatDate(e,t):moment(e).format(t)},formatMask:function(e){return e.replace(/Y{4}/g,"9999").replace(/Y{2}/g,"99").replace(/M{2}/g,"19").replace(/D{2}/g,"39").replace(/H{2}/g,"29").replace(/m{2}/g,"59").replace(/s{2}/g,"59")}}}};L.datetimepicker={setLocale:function(e){var t=s.i18n[e]?e:"en";R!==t&&(R=t,r())},setDateFormatter:function(e){if("string"==typeof e&&o.hasOwnProperty(e)){var t=o[e];L.extend(s,t.default_options),E=t.formatter}else E=e}};var t={RFC_2822:"D, d M Y H:i:s O",ATOM:"Y-m-dTH:i:sP",ISO_8601:"Y-m-dTH:i:sO",RFC_822:"D, d M y H:i:s O",RFC_850:"l, d-M-y H:i:s T",RFC_1036:"D, d M y H:i:s O",RFC_1123:"D, d M Y H:i:s O",RSS:"D, d M Y H:i:s O",W3C:"Y-m-dTH:i:sP"},i=function(e){return-1!==Object.values(t).indexOf(e)};function m(e,t,a){this.date=e,this.desc=t,this.style=a}L.extend(L.datetimepicker,t),r(),window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(e){var t=/(-([a-z]))/g;return"float"===e&&(e="styleFloat"),t.test(e)&&(e=e.replace(t,function(e,t,a){return a.toUpperCase()})),a.currentStyle[e]||null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var a,n;for(a=t||0,n=this.length;a<n;a+=1)if(this[a]===e)return a;return-1}),Date.prototype.countDaysInMonth=function(){return new Date(this.getFullYear(),this.getMonth()+1,0).getDate()},L.fn.xdsoftScroller=function(p,D){return this.each(function(){var o,i,s,d,u,l=L(this),a=function(e){var t,a={x:0,y:0};return"touchstart"===e.type||"touchmove"===e.type||"touchend"===e.type||"touchcancel"===e.type?(t=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a.x=t.clientX,a.y=t.clientY):"mousedown"!==e.type&&"mouseup"!==e.type&&"mousemove"!==e.type&&"mouseover"!==e.type&&"mouseout"!==e.type&&"mouseenter"!==e.type&&"mouseleave"!==e.type||(a.x=e.clientX,a.y=e.clientY),a},f=100,n=!1,r=0,c=0,m=0,t=!1,h=0,g=function(){};"hide"!==D?(L(this).hasClass("xdsoft_scroller_box")||(o=l.children().eq(0),i=l[0].clientHeight,s=o[0].offsetHeight,d=L('<div class="xdsoft_scrollbar"></div>'),u=L('<div class="xdsoft_scroller"></div>'),d.append(u),l.addClass("xdsoft_scroller_box").append(d),g=function(e){var t=a(e).y-r+h;t<0&&(t=0),t+u[0].offsetHeight>m&&(t=m-u[0].offsetHeight),l.trigger("scroll_element.xdsoft_scroller",[f?t/f:0])},u.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller",function(e){i||l.trigger("resize_scroll.xdsoft_scroller",[D]),r=a(e).y,h=parseInt(u.css("margin-top"),10),m=d[0].offsetHeight,"mousedown"===e.type||"touchstart"===e.type?(p.ownerDocument&&L(p.ownerDocument.body).addClass("xdsoft_noselect"),L([p.ownerDocument.body,p.contentWindow]).on("touchend mouseup.xdsoft_scroller",function e(){L([p.ownerDocument.body,p.contentWindow]).off("touchend mouseup.xdsoft_scroller",e).off("mousemove.xdsoft_scroller",g).removeClass("xdsoft_noselect")}),L(p.ownerDocument.body).on("mousemove.xdsoft_scroller",g)):(t=!0,e.stopPropagation(),e.preventDefault())}).on("touchmove",function(e){t&&(e.preventDefault(),g(e))}).on("touchend touchcancel",function(){t=!1,h=0}),l.on("scroll_element.xdsoft_scroller",function(e,t){i||l.trigger("resize_scroll.xdsoft_scroller",[t,!0]),t=1<t?1:t<0||isNaN(t)?0:t,u.css("margin-top",f*t),setTimeout(function(){o.css("marginTop",-parseInt((o[0].offsetHeight-i)*t,10))},10)}).on("resize_scroll.xdsoft_scroller",function(e,t,a){var n,r;i=l[0].clientHeight,s=o[0].offsetHeight,r=(n=i/s)*d[0].offsetHeight,1<n?u.hide():(u.show(),u.css("height",parseInt(10<r?r:10,10)),f=d[0].offsetHeight-u[0].offsetHeight,!0!==a&&l.trigger("scroll_element.xdsoft_scroller",[t||Math.abs(parseInt(o.css("marginTop"),10))/(s-i)]))}),l.on("mousewheel",function(e){var t=Math.abs(parseInt(o.css("marginTop"),10));return(t-=20*e.deltaY)<0&&(t=0),l.trigger("scroll_element.xdsoft_scroller",[t/(s-i)]),e.stopPropagation(),!1}),l.on("touchstart",function(e){n=a(e),c=Math.abs(parseInt(o.css("marginTop"),10))}),l.on("touchmove",function(e){if(n){e.preventDefault();var t=a(e);l.trigger("scroll_element.xdsoft_scroller",[(c-(t.y-n.y))/(s-i)])}}),l.on("touchend touchcancel",function(){n=!1,c=0})),l.trigger("resize_scroll.xdsoft_scroller",[D])):l.find(".xdsoft_scrollbar").hide()})},L.fn.datetimepicker=function(H,a){var n,r,o=this,p=17,D=13,y=27,v=37,b=38,k=39,x=40,T=9,S=116,M=65,w=67,j=86,J=90,z=89,I=!1,N=L.isPlainObject(H)||!H?L.extend(!0,{},s,H):L.extend(!0,{},s),i=0;return n=function(O){var t,n,a,r,W,h,_=L('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),e=L('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),g=L('<div class="xdsoft_datepicker active"></div>'),F=L('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'),C=L('<div class="xdsoft_calendar"></div>'),o=L('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),u=o.find(".xdsoft_time_box").eq(0),P=L('<div class="xdsoft_time_variant"></div>'),i=L('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),Y=L('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),A=L('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),s=!1,d=0;N.id&&_.attr("id",N.id),N.style&&_.attr("style",N.style),N.weeks&&_.addClass("xdsoft_showweeks"),N.rtl&&_.addClass("xdsoft_rtl"),_.addClass("xdsoft_"+N.theme),_.addClass(N.className),F.find(".xdsoft_month span").after(Y),F.find(".xdsoft_year span").after(A),F.find(".xdsoft_month,.xdsoft_year").on("touchstart mousedown.xdsoft",function(e){var t,a,n=L(this).find(".xdsoft_select").eq(0),r=0,o=0,i=n.is(":visible");for(F.find(".xdsoft_select").hide(),W.currentTime&&(r=W.currentTime[L(this).hasClass("xdsoft_month")?"getMonth":"getFullYear"]()),n[i?"hide":"show"](),t=n.find("div.xdsoft_option"),a=0;a<t.length&&t.eq(a).data("value")!==r;a+=1)o+=t[0].offsetHeight;return n.xdsoftScroller(N,o/(n.children()[0].offsetHeight-n[0].clientHeight)),e.stopPropagation(),!1});var l=function(e){var t=e.originalEvent,a=t.touches?t.touches[0]:t;this.touchStartPosition=this.touchStartPosition||a;var n=Math.abs(this.touchStartPosition.clientX-a.clientX),r=Math.abs(this.touchStartPosition.clientY-a.clientY);Math.sqrt(n*n+r*r)>N.touchMovedThreshold&&(this.touchMoved=!0)};function f(){var e,t=!1;return N.startDate?t=W.strToDate(N.startDate):(t=N.value||(O&&O.val&&O.val()?O.val():""))?(t=W.strToDateTime(t),N.yearOffset&&(t=new Date(t.getFullYear()-N.yearOffset,t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()))):N.defaultDate&&(t=W.strToDateTime(N.defaultDate),N.defaultTime&&(e=W.strtotime(N.defaultTime),t.setHours(e.getHours()),t.setMinutes(e.getMinutes()))),t&&W.isValidDate(t)?_.data("changed",!0):t="",t||0}function c(m){var h=function(e,t){var a=e.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g,"\\$1").replace(/_/g,"{digit+}").replace(/([0-9]{1})/g,"{digit$1}").replace(/\{digit([0-9]{1})\}/g,"[0-$1_]{1}").replace(/\{digit[\+]\}/g,"[0-9_]{1}");return new RegExp(a).test(t)},g=function(e,t){if(!(e="string"==typeof e||e instanceof String?m.ownerDocument.getElementById(e):e))return!1;if(e.createTextRange){var a=e.createTextRange();return a.collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select(),!0}return!!e.setSelectionRange&&(e.setSelectionRange(t,t),!0)};m.mask&&O.off("keydown.xdsoft"),!0===m.mask&&(E.formatMask?m.mask=E.formatMask(m.format):m.mask=m.format.replace(/Y/g,"9999").replace(/F/g,"9999").replace(/m/g,"19").replace(/d/g,"39").replace(/H/g,"29").replace(/i/g,"59").replace(/s/g,"59")),"string"===L.type(m.mask)&&(h(m.mask,O.val())||(O.val(m.mask.replace(/[0-9]/g,"_")),g(O[0],0)),O.on("paste.xdsoft",function(e){var t=(e.clipboardData||e.originalEvent.clipboardData||window.clipboardData).getData("text"),a=this.value,n=this.selectionStart;return a=a.substr(0,n)+t+a.substr(n+t.length),n+=t.length,h(m.mask,a)?(this.value=a,g(this,n)):""===L.trim(a)?this.value=m.mask.replace(/[0-9]/g,"_"):O.trigger("error_input.xdsoft"),e.preventDefault(),!1}),O.on("keydown.xdsoft",function(e){var t,a=this.value,n=e.which,r=this.selectionStart,o=this.selectionEnd,i=r!==o;if(48<=n&&n<=57||96<=n&&n<=105||8===n||46===n){for(t=8===n||46===n?"_":String.fromCharCode(96<=n&&n<=105?n-48:n),8===n&&r&&!i&&(r-=1);;){var s=m.mask.substr(r,1),d=r<m.mask.length,u=0<r;if(!(/[^0-9_]/.test(s)&&d&&u))break;r+=8!==n||i?1:-1}if(e.metaKey&&(i=!(r=0)),i){var l=o-r,f=m.mask.replace(/[0-9]/g,"_"),c=f.substr(r,l).substr(1);a=a.substr(0,r)+(t+c)+a.substr(r+l)}else{a=a.substr(0,r)+t+a.substr(r+1)}if(""===L.trim(a))a=f;else if(r===m.mask.length)return e.preventDefault(),!1;for(r+=8===n?0:1;/[^0-9_]/.test(m.mask.substr(r,1))&&r<m.mask.length&&0<r;)r+=8===n?0:1;h(m.mask,a)?(this.value=a,g(this,r)):""===L.trim(a)?this.value=m.mask.replace(/[0-9]/g,"_"):O.trigger("error_input.xdsoft")}else if(-1!==[M,w,j,J,z].indexOf(n)&&I||-1!==[y,b,x,v,k,S,p,T,D].indexOf(n))return!0;return e.preventDefault(),!1}))}F.find(".xdsoft_select").xdsoftScroller(N).on("touchstart mousedown.xdsoft",function(e){var t=e.originalEvent;this.touchMoved=!1,this.touchStartPosition=t.touches?t.touches[0]:t,e.stopPropagation(),e.preventDefault()}).on("touchmove",".xdsoft_option",l).on("touchend mousedown.xdsoft",".xdsoft_option",function(){if(!this.touchMoved){void 0!==W.currentTime&&null!==W.currentTime||(W.currentTime=W.now());var e=W.currentTime.getFullYear();W&&W.currentTime&&W.currentTime[L(this).parent().parent().hasClass("xdsoft_monthselect")?"setMonth":"setFullYear"](L(this).data("value")),L(this).parent().parent().hide(),_.trigger("xchange.xdsoft"),N.onChangeMonth&&L.isFunction(N.onChangeMonth)&&N.onChangeMonth.call(_,W.currentTime,_.data("input")),e!==W.currentTime.getFullYear()&&L.isFunction(N.onChangeYear)&&N.onChangeYear.call(_,W.currentTime,_.data("input"))}}),_.getValue=function(){return W.getCurrentTime()},_.setOptions=function(e){var l={};N=L.extend(!0,{},N,e),e.allowTimes&&L.isArray(e.allowTimes)&&e.allowTimes.length&&(N.allowTimes=L.extend(!0,[],e.allowTimes)),e.weekends&&L.isArray(e.weekends)&&e.weekends.length&&(N.weekends=L.extend(!0,[],e.weekends)),e.allowDates&&L.isArray(e.allowDates)&&e.allowDates.length&&(N.allowDates=L.extend(!0,[],e.allowDates)),e.allowDateRe&&"[object String]"===Object.prototype.toString.call(e.allowDateRe)&&(N.allowDateRe=new RegExp(e.allowDateRe)),e.highlightedDates&&L.isArray(e.highlightedDates)&&e.highlightedDates.length&&(L.each(e.highlightedDates,function(e,t){var a,n=L.map(t.split(","),L.trim),r=new m(E.parseDate(n[0],N.formatDate),n[1],n[2]),o=E.formatDate(r.date,N.formatDate);void 0!==l[o]?(a=l[o].desc)&&a.length&&r.desc&&r.desc.length&&(l[o].desc=a+"\n"+r.desc):l[o]=r}),N.highlightedDates=L.extend(!0,[],l)),e.highlightedPeriods&&L.isArray(e.highlightedPeriods)&&e.highlightedPeriods.length&&(l=L.extend(!0,[],N.highlightedDates),L.each(e.highlightedPeriods,function(e,t){var a,n,r,o,i,s,d;if(L.isArray(t))a=t[0],n=t[1],r=t[2],d=t[3];else{var u=L.map(t.split(","),L.trim);a=E.parseDate(u[0],N.formatDate),n=E.parseDate(u[1],N.formatDate),r=u[2],d=u[3]}for(;a<=n;)o=new m(a,r,d),i=E.formatDate(a,N.formatDate),a.setDate(a.getDate()+1),void 0!==l[i]?(s=l[i].desc)&&s.length&&o.desc&&o.desc.length&&(l[i].desc=s+"\n"+o.desc):l[i]=o}),N.highlightedDates=L.extend(!0,[],l)),e.disabledDates&&L.isArray(e.disabledDates)&&e.disabledDates.length&&(N.disabledDates=L.extend(!0,[],e.disabledDates)),e.disabledWeekDays&&L.isArray(e.disabledWeekDays)&&e.disabledWeekDays.length&&(N.disabledWeekDays=L.extend(!0,[],e.disabledWeekDays)),!N.open&&!N.opened||N.inline||O.trigger("open.xdsoft"),N.inline&&(s=!0,_.addClass("xdsoft_inline"),O.after(_).hide()),N.inverseButton&&(N.next="xdsoft_prev",N.prev="xdsoft_next"),N.datepicker?g.addClass("active"):g.removeClass("active"),N.timepicker?o.addClass("active"):o.removeClass("active"),N.value&&(W.setCurrentTime(N.value),O&&O.val&&O.val(W.str)),isNaN(N.dayOfWeekStart)?N.dayOfWeekStart=0:N.dayOfWeekStart=parseInt(N.dayOfWeekStart,10)%7,N.timepickerScrollbar||u.xdsoftScroller(N,"hide"),N.minDate&&/^[\+\-](.*)$/.test(N.minDate)&&(N.minDate=E.formatDate(W.strToDateTime(N.minDate),N.formatDate)),N.maxDate&&/^[\+\-](.*)$/.test(N.maxDate)&&(N.maxDate=E.formatDate(W.strToDateTime(N.maxDate),N.formatDate)),N.minDateTime&&/^\+(.*)$/.test(N.minDateTime)&&(N.minDateTime=W.strToDateTime(N.minDateTime).dateFormat(N.formatDate)),N.maxDateTime&&/^\+(.*)$/.test(N.maxDateTime)&&(N.maxDateTime=W.strToDateTime(N.maxDateTime).dateFormat(N.formatDate)),i.toggle(N.showApplyButton),F.find(".xdsoft_today_button").css("visibility",N.todayButton?"visible":"hidden"),F.find("."+N.prev).css("visibility",N.prevButton?"visible":"hidden"),F.find("."+N.next).css("visibility",N.nextButton?"visible":"hidden"),c(N),N.validateOnBlur&&O.off("blur.xdsoft").on("blur.xdsoft",function(){if(N.allowBlank&&(!L.trim(L(this).val()).length||"string"==typeof N.mask&&L.trim(L(this).val())===N.mask.replace(/[0-9]/g,"_")))L(this).val(null),_.data("xdsoft_datetime").empty();else{var e=E.parseDate(L(this).val(),N.format);if(e)L(this).val(E.formatDate(e,N.format));else{var t=+[L(this).val()[0],L(this).val()[1]].join(""),a=+[L(this).val()[2],L(this).val()[3]].join("");!N.datepicker&&N.timepicker&&0<=t&&t<24&&0<=a&&a<60?L(this).val([t,a].map(function(e){return 9<e?e:"0"+e}).join(":")):L(this).val(E.formatDate(W.now(),N.format))}_.data("xdsoft_datetime").setCurrentTime(L(this).val())}_.trigger("changedatetime.xdsoft"),_.trigger("close.xdsoft")}),N.dayOfWeekStartPrev=0===N.dayOfWeekStart?6:N.dayOfWeekStart-1,_.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")},_.data("options",N).on("touchstart mousedown.xdsoft",function(e){return e.stopPropagation(),e.preventDefault(),A.hide(),Y.hide(),!1}),u.append(P),u.xdsoftScroller(N),_.on("afterOpen.xdsoft",function(){u.xdsoftScroller(N)}),_.append(g).append(o),!0!==N.withoutCopyright&&_.append(e),g.append(F).append(C).append(i),N.insideParent?L(O).parent().append(_):L(N.parentID).append(_),W=new function(){var r=this;r.now=function(e){var t,a,n=new Date;return!e&&N.defaultDate&&(t=r.strToDateTime(N.defaultDate),n.setFullYear(t.getFullYear()),n.setMonth(t.getMonth()),n.setDate(t.getDate())),n.setFullYear(n.getFullYear()),!e&&N.defaultTime&&(a=r.strtotime(N.defaultTime),n.setHours(a.getHours()),n.setMinutes(a.getMinutes()),n.setSeconds(a.getSeconds()),n.setMilliseconds(a.getMilliseconds())),n},r.isValidDate=function(e){return"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e.getTime())},r.setCurrentTime=function(e,t){"string"==typeof e?r.currentTime=r.strToDateTime(e):r.isValidDate(e)?r.currentTime=e:e||t||!N.allowBlank||N.inline?r.currentTime=r.now():r.currentTime=null,_.trigger("xchange.xdsoft")},r.empty=function(){r.currentTime=null},r.getCurrentTime=function(){return r.currentTime},r.nextMonth=function(){void 0!==r.currentTime&&null!==r.currentTime||(r.currentTime=r.now());var e,t=r.currentTime.getMonth()+1;return 12===t&&(r.currentTime.setFullYear(r.currentTime.getFullYear()+1),t=0),e=r.currentTime.getFullYear(),r.currentTime.setDate(Math.min(new Date(r.currentTime.getFullYear(),t+1,0).getDate(),r.currentTime.getDate())),r.currentTime.setMonth(t),N.onChangeMonth&&L.isFunction(N.onChangeMonth)&&N.onChangeMonth.call(_,W.currentTime,_.data("input")),e!==r.currentTime.getFullYear()&&L.isFunction(N.onChangeYear)&&N.onChangeYear.call(_,W.currentTime,_.data("input")),_.trigger("xchange.xdsoft"),t},r.prevMonth=function(){void 0!==r.currentTime&&null!==r.currentTime||(r.currentTime=r.now());var e=r.currentTime.getMonth()-1;return-1===e&&(r.currentTime.setFullYear(r.currentTime.getFullYear()-1),e=11),r.currentTime.setDate(Math.min(new Date(r.currentTime.getFullYear(),e+1,0).getDate(),r.currentTime.getDate())),r.currentTime.setMonth(e),N.onChangeMonth&&L.isFunction(N.onChangeMonth)&&N.onChangeMonth.call(_,W.currentTime,_.data("input")),_.trigger("xchange.xdsoft"),e},r.getWeekOfYear=function(e){if(N.onGetWeekOfYear&&L.isFunction(N.onGetWeekOfYear)){var t=N.onGetWeekOfYear.call(_,e);if(void 0!==t)return t}var a=new Date(e.getFullYear(),0,1);return 4!==a.getDay()&&a.setMonth(0,1+(4-a.getDay()+7)%7),Math.ceil(((e-a)/864e5+a.getDay()+1)/7)},r.strToDateTime=function(e){var t,a,n=[];return e&&e instanceof Date&&r.isValidDate(e)?e:((n=/^([+-]{1})(.*)$/.exec(e))&&(n[2]=E.parseDate(n[2],N.formatDate)),a=n&&n[2]?(t=n[2].getTime()-6e4*n[2].getTimezoneOffset(),new Date(r.now(!0).getTime()+parseInt(n[1]+"1",10)*t)):e?E.parseDate(e,N.format):r.now(),r.isValidDate(a)||(a=r.now()),a)},r.strToDate=function(e){if(e&&e instanceof Date&&r.isValidDate(e))return e;var t=e?E.parseDate(e,N.formatDate):r.now(!0);return r.isValidDate(t)||(t=r.now(!0)),t},r.strtotime=function(e){if(e&&e instanceof Date&&r.isValidDate(e))return e;var t=e?E.parseDate(e,N.formatTime):r.now(!0);return r.isValidDate(t)||(t=r.now(!0)),t},r.str=function(){var e=N.format;return N.yearOffset&&(e=(e=e.replace("Y",r.currentTime.getFullYear()+N.yearOffset)).replace("y",String(r.currentTime.getFullYear()+N.yearOffset).substring(2,4))),E.formatDate(r.currentTime,e)},r.currentTime=this.now()},i.on("touchend click",function(e){e.preventDefault(),_.data("changed",!0),W.setCurrentTime(f()),O.val(W.str()),_.trigger("close.xdsoft")}),F.find(".xdsoft_today_button").on("touchend mousedown.xdsoft",function(){_.data("changed",!0),W.setCurrentTime(0,!0),_.trigger("afterOpen.xdsoft")}).on("dblclick.xdsoft",function(){var e,t,a=W.getCurrentTime();a=new Date(a.getFullYear(),a.getMonth(),a.getDate()),e=W.strToDate(N.minDate),a<(e=new Date(e.getFullYear(),e.getMonth(),e.getDate()))||(t=W.strToDate(N.maxDate),(t=new Date(t.getFullYear(),t.getMonth(),t.getDate()))<a||(O.val(W.str()),O.trigger("change"),_.trigger("close.xdsoft")))}),F.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft",function(){var a=L(this),n=0,r=!1;!function e(t){a.hasClass(N.next)?W.nextMonth():a.hasClass(N.prev)&&W.prevMonth(),N.monthChangeSpinner&&(r||(n=setTimeout(e,t||100)))}(500),L([N.ownerDocument.body,N.contentWindow]).on("touchend mouseup.xdsoft",function e(){clearTimeout(n),r=!0,L([N.ownerDocument.body,N.contentWindow]).off("touchend mouseup.xdsoft",e)})}),o.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft",function(){var o=L(this),i=0,s=!1,d=110;!function e(t){var a=u[0].clientHeight,n=P[0].offsetHeight,r=Math.abs(parseInt(P.css("marginTop"),10));o.hasClass(N.next)&&n-a-N.timeHeightInTimePicker>=r?P.css("marginTop","-"+(r+N.timeHeightInTimePicker)+"px"):o.hasClass(N.prev)&&0<=r-N.timeHeightInTimePicker&&P.css("marginTop","-"+(r-N.timeHeightInTimePicker)+"px"),u.trigger("scroll_element.xdsoft_scroller",[Math.abs(parseInt(P[0].style.marginTop,10)/(n-a))]),d=10<d?10:d-10,s||(i=setTimeout(e,t||d))}(500),L([N.ownerDocument.body,N.contentWindow]).on("touchend mouseup.xdsoft",function e(){clearTimeout(i),s=!0,L([N.ownerDocument.body,N.contentWindow]).off("touchend mouseup.xdsoft",e)})}),t=0,_.on("xchange.xdsoft",function(e){clearTimeout(t),t=setTimeout(function(){void 0!==W.currentTime&&null!==W.currentTime||(W.currentTime=W.now());for(var e,t,a,n,r,o,i,s,d,u,l="",f=new Date(W.currentTime.getFullYear(),W.currentTime.getMonth(),1,12,0,0),c=0,m=W.now(),h=!1,g=!1,p=!1,D=!1,y=[],v=!0,b="";f.getDay()!==N.dayOfWeekStart;)f.setDate(f.getDate()-1);for(l+="<table><thead><tr>",N.weeks&&(l+="<th></th>"),e=0;e<7;e+=1)l+="<th>"+N.i18n[R].dayOfWeekShort[(e+N.dayOfWeekStart)%7]+"</th>";for(l+="</tr></thead>",l+="<tbody>",!1!==N.maxDate&&(h=W.strToDate(N.maxDate),h=new Date(h.getFullYear(),h.getMonth(),h.getDate(),23,59,59,999)),!1!==N.minDate&&(g=W.strToDate(N.minDate),g=new Date(g.getFullYear(),g.getMonth(),g.getDate())),!1!==N.minDateTime&&(p=W.strToDate(N.minDateTime),p=new Date(p.getFullYear(),p.getMonth(),p.getDate(),p.getHours(),p.getMinutes(),p.getSeconds())),!1!==N.maxDateTime&&(D=W.strToDate(N.maxDateTime),D=new Date(D.getFullYear(),D.getMonth(),D.getDate(),D.getHours(),D.getMinutes(),D.getSeconds())),!1!==D&&(u=31*(12*D.getFullYear()+D.getMonth())+D.getDate());c<W.currentTime.countDaysInMonth()||f.getDay()!==N.dayOfWeekStart||W.currentTime.getMonth()===f.getMonth();){y=[],c+=1,a=f.getDay(),n=f.getDate(),r=f.getFullYear(),M=f.getMonth(),o=W.getWeekOfYear(f),d="",y.push("xdsoft_date"),i=N.beforeShowDay&&L.isFunction(N.beforeShowDay.call)?N.beforeShowDay.call(_,f):null,N.allowDateRe&&"[object RegExp]"===Object.prototype.toString.call(N.allowDateRe)&&(N.allowDateRe.test(E.formatDate(f,N.formatDate))||y.push("xdsoft_disabled")),N.allowDates&&0<N.allowDates.length&&-1===N.allowDates.indexOf(E.formatDate(f,N.formatDate))&&y.push("xdsoft_disabled");var k=31*(12*f.getFullYear()+f.getMonth())+f.getDate();(!1!==h&&h<f||!1!==p&&f<p||!1!==g&&f<g||!1!==D&&u<k||i&&!1===i[0])&&y.push("xdsoft_disabled"),-1!==N.disabledDates.indexOf(E.formatDate(f,N.formatDate))&&y.push("xdsoft_disabled"),-1!==N.disabledWeekDays.indexOf(a)&&y.push("xdsoft_disabled"),O.is("[disabled]")&&y.push("xdsoft_disabled"),i&&""!==i[1]&&y.push(i[1]),W.currentTime.getMonth()!==M&&y.push("xdsoft_other_month"),(N.defaultSelect||_.data("changed"))&&E.formatDate(W.currentTime,N.formatDate)===E.formatDate(f,N.formatDate)&&y.push("xdsoft_current"),E.formatDate(m,N.formatDate)===E.formatDate(f,N.formatDate)&&y.push("xdsoft_today"),0!==f.getDay()&&6!==f.getDay()&&-1===N.weekends.indexOf(E.formatDate(f,N.formatDate))||y.push("xdsoft_weekend"),void 0!==N.highlightedDates[E.formatDate(f,N.formatDate)]&&(t=N.highlightedDates[E.formatDate(f,N.formatDate)],y.push(void 0===t.style?"xdsoft_highlighted_default":t.style),d=void 0===t.desc?"":t.desc),N.beforeShowDay&&L.isFunction(N.beforeShowDay)&&y.push(N.beforeShowDay(f)),v&&(l+="<tr>",v=!1,N.weeks&&(l+="<th>"+o+"</th>")),l+='<td data-date="'+n+'" data-month="'+M+'" data-year="'+r+'" class="xdsoft_date xdsoft_day_of_week'+f.getDay()+" "+y.join(" ")+'" title="'+d+'"><div>'+n+"</div></td>",f.getDay()===N.dayOfWeekStartPrev&&(l+="</tr>",v=!0),f.setDate(n+1)}l+="</tbody></table>",C.html(l),F.find(".xdsoft_label span").eq(0).text(N.i18n[R].months[W.currentTime.getMonth()]),F.find(".xdsoft_label span").eq(1).text(W.currentTime.getFullYear()+N.yearOffset),M=b="";var x=0;if(!1!==N.minTime){var T=W.strtotime(N.minTime);x=60*T.getHours()+T.getMinutes()}var S=1440;if(!1!==N.maxTime){T=W.strtotime(N.maxTime);S=60*T.getHours()+T.getMinutes()}if(!1!==N.minDateTime){T=W.strToDateTime(N.minDateTime);if(E.formatDate(W.currentTime,N.formatDate)===E.formatDate(T,N.formatDate)){var M=60*T.getHours()+T.getMinutes();x<M&&(x=M)}}if(!1!==N.maxDateTime){T=W.strToDateTime(N.maxDateTime);if(E.formatDate(W.currentTime,N.formatDate)===E.formatDate(T,N.formatDate))(M=60*T.getHours()+T.getMinutes())<S&&(S=M)}if(s=function(e,t){var a,n=W.now(),r=N.allowTimes&&L.isArray(N.allowTimes)&&N.allowTimes.length;n.setHours(e),e=parseInt(n.getHours(),10),n.setMinutes(t),t=parseInt(n.getMinutes(),10),y=[];var o=60*e+t;(O.is("[disabled]")||S<=o||o<x)&&y.push("xdsoft_disabled"),(a=new Date(W.currentTime)).setHours(parseInt(W.currentTime.getHours(),10)),r||a.setMinutes(Math[N.roundTime](W.currentTime.getMinutes()/N.step)*N.step),(N.initTime||N.defaultSelect||_.data("changed"))&&a.getHours()===parseInt(e,10)&&(!r&&59<N.step||a.getMinutes()===parseInt(t,10))&&(N.defaultSelect||_.data("changed")?y.push("xdsoft_current"):N.initTime&&y.push("xdsoft_init_time")),parseInt(m.getHours(),10)===parseInt(e,10)&&parseInt(m.getMinutes(),10)===parseInt(t,10)&&y.push("xdsoft_today"),b+='<div class="xdsoft_time '+y.join(" ")+'" data-hour="'+e+'" data-minute="'+t+'">'+E.formatDate(n,N.formatTime)+"</div>"},N.allowTimes&&L.isArray(N.allowTimes)&&N.allowTimes.length)for(c=0;c<N.allowTimes.length;c+=1)s(W.strtotime(N.allowTimes[c]).getHours(),M=W.strtotime(N.allowTimes[c]).getMinutes());else for(e=c=0;c<(N.hours12?12:24);c+=1)for(e=0;e<60;e+=N.step){var w=60*c+e;w<x||(S<=w||s((c<10?"0":"")+c,M=(e<10?"0":"")+e))}for(P.html(b),H="",c=parseInt(N.yearStart,10);c<=parseInt(N.yearEnd,10);c+=1)H+='<div class="xdsoft_option '+(W.currentTime.getFullYear()===c?"xdsoft_current":"")+'" data-value="'+c+'">'+(c+N.yearOffset)+"</div>";for(A.children().eq(0).html(H),c=parseInt(N.monthStart,10),H="";c<=parseInt(N.monthEnd,10);c+=1)H+='<div class="xdsoft_option '+(W.currentTime.getMonth()===c?"xdsoft_current":"")+'" data-value="'+c+'">'+N.i18n[R].months[c]+"</div>";Y.children().eq(0).html(H),L(_).trigger("generate.xdsoft")},10),e.stopPropagation()}).on("afterOpen.xdsoft",function(){var e,t,a,n;N.timepicker&&(P.find(".xdsoft_current").length?e=".xdsoft_current":P.find(".xdsoft_init_time").length&&(e=".xdsoft_init_time"),e?(t=u[0].clientHeight,(a=P[0].offsetHeight)-t<(n=P.find(e).index()*N.timeHeightInTimePicker+1)&&(n=a-t),u.trigger("scroll_element.xdsoft_scroller",[parseInt(n,10)/(a-t)])):u.trigger("scroll_element.xdsoft_scroller",[0]))}),n=0,C.on("touchend click.xdsoft","td",function(e){e.stopPropagation(),n+=1;var t=L(this),a=W.currentTime;if(null==a&&(W.currentTime=W.now(),a=W.currentTime),t.hasClass("xdsoft_disabled"))return!1;a.setDate(1),a.setFullYear(t.data("year")),a.setMonth(t.data("month")),a.setDate(t.data("date")),_.trigger("select.xdsoft",[a]),O.val(W.str()),N.onSelectDate&&L.isFunction(N.onSelectDate)&&N.onSelectDate.call(_,W.currentTime,_.data("input"),e),_.data("changed",!0),_.trigger("xchange.xdsoft"),_.trigger("changedatetime.xdsoft"),(1<n||!0===N.closeOnDateSelect||!1===N.closeOnDateSelect&&!N.timepicker)&&!N.inline&&_.trigger("close.xdsoft"),setTimeout(function(){n=0},200)}),P.on("touchstart","div",function(e){this.touchMoved=!1}).on("touchmove","div",l).on("touchend click.xdsoft","div",function(e){if(!this.touchMoved){e.stopPropagation();var t=L(this),a=W.currentTime;if(null==a&&(W.currentTime=W.now(),a=W.currentTime),t.hasClass("xdsoft_disabled"))return!1;a.setHours(t.data("hour")),a.setMinutes(t.data("minute")),_.trigger("select.xdsoft",[a]),_.data("input").val(W.str()),N.onSelectTime&&L.isFunction(N.onSelectTime)&&N.onSelectTime.call(_,W.currentTime,_.data("input"),e),_.data("changed",!0),_.trigger("xchange.xdsoft"),_.trigger("changedatetime.xdsoft"),!0!==N.inline&&!0===N.closeOnTimeSelect&&_.trigger("close.xdsoft")}}),g.on("mousewheel.xdsoft",function(e){return!N.scrollMonth||(e.deltaY<0?W.nextMonth():W.prevMonth(),!1)}),O.on("mousewheel.xdsoft",function(e){return!N.scrollInput||(!N.datepicker&&N.timepicker?(0<=(a=P.find(".xdsoft_current").length?P.find(".xdsoft_current").eq(0).index():0)+e.deltaY&&a+e.deltaY<P.children().length&&(a+=e.deltaY),P.children().eq(a).length&&P.children().eq(a).trigger("mousedown"),!1):N.datepicker&&!N.timepicker?(g.trigger(e,[e.deltaY,e.deltaX,e.deltaY]),O.val&&O.val(W.str()),_.trigger("changedatetime.xdsoft"),!1):void 0)}),_.on("changedatetime.xdsoft",function(e){if(N.onChangeDateTime&&L.isFunction(N.onChangeDateTime)){var t=_.data("input");N.onChangeDateTime.call(_,W.currentTime,t,e),delete N.value,t.trigger("change")}}).on("generate.xdsoft",function(){N.onGenerate&&L.isFunction(N.onGenerate)&&N.onGenerate.call(_,W.currentTime,_.data("input")),s&&(_.trigger("afterOpen.xdsoft"),s=!1)}).on("click.xdsoft",function(e){e.stopPropagation()}),a=0,h=function(e,t){do{if(!(e=e.parentNode)||!1===t(e))break}while("HTML"!==e.nodeName)},r=function(){var e,t,a,n,r,o,i,s,d,u,l,f,c;if(e=(s=_.data("input")).offset(),t=s[0],u="top",a=e.top+t.offsetHeight-1,n=e.left,r="absolute",d=L(N.contentWindow).width(),f=L(N.contentWindow).height(),c=L(N.contentWindow).scrollTop(),N.ownerDocument.documentElement.clientWidth-e.left<g.parent().outerWidth(!0)){var m=g.parent().outerWidth(!0)-t.offsetWidth;n-=m}"rtl"===s.parent().css("direction")&&(n-=_.outerWidth()-s.outerWidth()),N.fixed?(a-=c,n-=L(N.contentWindow).scrollLeft(),r="fixed"):(i=!1,h(t,function(e){return null!==e&&("fixed"===N.contentWindow.getComputedStyle(e).getPropertyValue("position")?!(i=!0):void 0)}),i&&!N.insideParent?(r="fixed",a+_.outerHeight()>f+c?(u="bottom",a=f+c-e.top):a-=c):a+_[0].offsetHeight>f+c&&(a=e.top-_[0].offsetHeight+1),a<0&&(a=0),n+t.offsetWidth>d&&(n=d-t.offsetWidth)),o=_[0],h(o,function(e){if("relative"===N.contentWindow.getComputedStyle(e).getPropertyValue("position")&&d>=e.offsetWidth)return n-=(d-e.offsetWidth)/2,!1}),l={position:r,left:N.insideParent?t.offsetLeft:n,top:"",bottom:""},N.insideParent?l[u]=t.offsetTop+t.offsetHeight:l[u]=a,_.css(l)},_.on("open.xdsoft",function(e){var t=!0;N.onShow&&L.isFunction(N.onShow)&&(t=N.onShow.call(_,W.currentTime,_.data("input"),e)),!1!==t&&(_.show(),r(),L(N.contentWindow).off("resize.xdsoft",r).on("resize.xdsoft",r),N.closeOnWithoutClick&&L([N.ownerDocument.body,N.contentWindow]).on("touchstart mousedown.xdsoft",function e(){_.trigger("close.xdsoft"),L([N.ownerDocument.body,N.contentWindow]).off("touchstart mousedown.xdsoft",e)}))}).on("close.xdsoft",function(e){var t=!0;F.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide(),N.onClose&&L.isFunction(N.onClose)&&(t=N.onClose.call(_,W.currentTime,_.data("input"),e)),!1===t||N.opened||N.inline||_.hide(),e.stopPropagation()}).on("toggle.xdsoft",function(){_.is(":visible")?_.trigger("close.xdsoft"):_.trigger("open.xdsoft")}).data("input",O),d=0,_.data("xdsoft_datetime",W),_.setOptions(N),W.setCurrentTime(f()),O.data("xdsoft_datetimepicker",_).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",function(){O.is(":disabled")||O.data("xdsoft_datetimepicker").is(":visible")&&N.closeOnInputClick||N.openOnFocus&&(clearTimeout(d),d=setTimeout(function(){O.is(":disabled")||(s=!0,W.setCurrentTime(f(),!0),N.mask&&c(N),_.trigger("open.xdsoft"))},100))}).on("keydown.xdsoft",function(e){var t,a=e.which;return-1!==[D].indexOf(a)&&N.enterLikeTab?(t=L("input:visible,textarea:visible,button:visible,a:visible"),_.trigger("close.xdsoft"),t.eq(t.index(this)+1).focus(),!1):-1!==[T].indexOf(a)?(_.trigger("close.xdsoft"),!0):void 0}).on("blur.xdsoft",function(){_.trigger("close.xdsoft")})},r=function(e){var t=e.data("xdsoft_datetimepicker");t&&(t.data("xdsoft_datetime",null),t.remove(),e.data("xdsoft_datetimepicker",null).off(".xdsoft"),L(N.contentWindow).off("resize.xdsoft"),L([N.contentWindow,N.ownerDocument.body]).off("mousedown.xdsoft touchstart"),e.unmousewheel&&e.unmousewheel())},L(N.ownerDocument).off("keydown.xdsoftctrl keyup.xdsoftctrl").off("keydown.xdsoftcmd keyup.xdsoftcmd").on("keydown.xdsoftctrl",function(e){e.keyCode===p&&(I=!0)}).on("keyup.xdsoftctrl",function(e){e.keyCode===p&&(I=!1)}).on("keydown.xdsoftcmd",function(e){91===e.keyCode&&!0}).on("keyup.xdsoftcmd",function(e){91===e.keyCode&&!1}),this.each(function(){var t,e=L(this).data("xdsoft_datetimepicker");if(e){if("string"===L.type(H))switch(H){case"show":L(this).select().focus(),e.trigger("open.xdsoft");break;case"hide":e.trigger("close.xdsoft");break;case"toggle":e.trigger("toggle.xdsoft");break;case"destroy":r(L(this));break;case"reset":this.value=this.defaultValue,this.value&&e.data("xdsoft_datetime").isValidDate(E.parseDate(this.value,N.format))||e.data("changed",!1),e.data("xdsoft_datetime").setCurrentTime(this.value);break;case"validate":e.data("input").trigger("blur.xdsoft");break;default:e[H]&&L.isFunction(e[H])&&(o=e[H](a))}else e.setOptions(H);return 0}"string"!==L.type(H)&&(!N.lazyInit||N.open||N.inline?n(L(this)):(t=L(this)).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",function e(){t.is(":disabled")||t.data("xdsoft_datetimepicker")||(clearTimeout(i),i=setTimeout(function(){t.data("xdsoft_datetimepicker")||n(t),t.off("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart",e).trigger("open.xdsoft")},100))}))}),o},L.fn.datetimepicker.defaults=s};!function(e){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"),__webpack_require__(/*! jquery-mousewheel */ "./node_modules/jquery-mousewheel/jquery.mousewheel.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(datetimepickerFactory),function(e){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(function(c){var m,h,e=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],t="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],g=Array.prototype.slice;if(c.event.fixHooks)for(var a=e.length;a;)c.event.fixHooks[e[--a]]=c.event.mouseHooks;var p=c.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var e=t.length;e;)this.addEventListener(t[--e],n,!1);else this.onmousewheel=n;c.data(this,"mousewheel-line-height",p.getLineHeight(this)),c.data(this,"mousewheel-page-height",p.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var e=t.length;e;)this.removeEventListener(t[--e],n,!1);else this.onmousewheel=null;c.removeData(this,"mousewheel-line-height"),c.removeData(this,"mousewheel-page-height")},getLineHeight:function(e){var t=c(e),a=t["offsetParent"in c.fn?"offsetParent":"parent"]();return a.length||(a=c("body")),parseInt(a.css("fontSize"),10)||parseInt(t.css("fontSize"),10)||16},getPageHeight:function(e){return c(e).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};function n(e){var t,a=e||window.event,n=g.call(arguments,1),r=0,o=0,i=0,s=0,d=0;if((e=c.event.fix(a)).type="mousewheel","detail"in a&&(i=-1*a.detail),"wheelDelta"in a&&(i=a.wheelDelta),"wheelDeltaY"in a&&(i=a.wheelDeltaY),"wheelDeltaX"in a&&(o=-1*a.wheelDeltaX),"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(o=-1*i,i=0),r=0===i?o:i,"deltaY"in a&&(r=i=-1*a.deltaY),"deltaX"in a&&(o=a.deltaX,0===i&&(r=-1*o)),0!==i||0!==o){if(1===a.deltaMode){var u=c.data(this,"mousewheel-line-height");r*=u,i*=u,o*=u}else if(2===a.deltaMode){var l=c.data(this,"mousewheel-page-height");r*=l,i*=l,o*=l}if(t=Math.max(Math.abs(i),Math.abs(o)),(!h||t<h)&&y(a,h=t)&&(h/=40),y(a,t)&&(r/=40,o/=40,i/=40),r=Math[1<=r?"floor":"ceil"](r/h),o=Math[1<=o?"floor":"ceil"](o/h),i=Math[1<=i?"floor":"ceil"](i/h),p.settings.normalizeOffset&&this.getBoundingClientRect){var f=this.getBoundingClientRect();s=e.clientX-f.left,d=e.clientY-f.top}return e.deltaX=o,e.deltaY=i,e.deltaFactor=h,e.offsetX=s,e.offsetY=d,e.deltaMode=0,n.unshift(e,r,o,i),m&&clearTimeout(m),m=setTimeout(D,200),(c.event.dispatch||c.event.handle).apply(this,n)}}function D(){h=null}function y(e,t){return p.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}c.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})});

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

/***/ "./node_modules/jquery-mousewheel/jquery.mousewheel.js":
/*!*************************************************************!*\
  !*** ./node_modules/jquery-mousewheel/jquery.mousewheel.js ***!
  \*************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( true ) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


/***/ }),

/***/ "./vendor/spryker/discount/assets/Zed/sass/main.scss":
/*!***********************************************************!*\
  !*** ./vendor/spryker/discount/assets/Zed/sass/main.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/discount/assets/Zed/js/spryker-zed-discount-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUF1QyxHQUFHOztBQUUxQzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxlQUFlLGtDQUFrQztBQUNqRCxpQkFBaUIsa0NBQWtDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixJQUFJO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0pBQW9KO0FBQ3BKLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLHFCQUFxQiwrQkFBK0I7QUFDcEQ7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixXQUFXLFlBQVksSUFBSSxXQUFXLFNBQVM7QUFDdkUsY0FBYyw0QkFBNEI7QUFDMUMsTUFBTTtBQUNOLFdBQVcsdzFDQUF3MUM7QUFDbjJDLGFBQWEsdXBCQUF1cEI7QUFDcHFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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S0FBNkI7QUFDakM7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxXQUFXO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsWUFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSCxDQUFDOztBQUVELEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSw2Q0FBNkMsR0FBRztBQUNoRDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLDJDQUEyQzs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0EsOENBQThDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM1TkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9ub2RlX21vZHVsZXMvQHNwcnlrZXIvanF1ZXJ5LXF1ZXJ5LWJ1aWxkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZGlzY291bnQvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvc3ByeWtlci1xdWVyeS1idWlsZGVyLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Rpc2NvdW50L2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL3NxbC1mYWN0b3J5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Rpc2NvdW50L2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Rpc2NvdW50L2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtZGlzY291bnQtbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9ub2RlX21vZHVsZXMvQHNwcnlrZXIvc3FsLXBhcnNlci1taXN0aWMvYnJvd3Nlci9zcWwtcGFyc2VyLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9kb3QvZG9ULmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9qcXVlcnktZGF0ZXRpbWVwaWNrZXIvYnVpbGQvanF1ZXJ5LmRhdGV0aW1lcGlja2VyLmZ1bGwubWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9qcXVlcnktZXh0ZW5kZXh0L2pxdWVyeS1leHRlbmRleHQuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vbm9kZV9tb2R1bGVzL2pxdWVyeS1tb3VzZXdoZWVsL2pxdWVyeS5tb3VzZXdoZWVsLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Rpc2NvdW50L2Fzc2V0cy9aZWQvc2Fzcy9tYWluLnNjc3M/NTk5NCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xudmFyIGRvdCA9IHJlcXVpcmUoJ2RvdC9kb1QnKTtcbnJlcXVpcmUoJ2pxdWVyeS1leHRlbmRleHQnKTtcblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgZmFjdG9yeShqUXVlcnksIGRvdCk7XG59KGZ1bmN0aW9uICgkLCBkb1QpIHtcblxuLy8gQ0xBU1MgREVGSU5JVElPTlxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHZhciBRdWVyeUJ1aWxkZXIgPSBmdW5jdGlvbiAoJGVsLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdCgkZWwsIG9wdGlvbnMpO1xuICAgIH07XG5cblxuLy8gRVZFTlRTIFNZU1RFTVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICQuZXh0ZW5kKFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAodHlwZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyAkLkV2ZW50KHR5cGUgKyAnLnF1ZXJ5QnVpbGRlci5maWx0ZXInLCB7XG4gICAgICAgICAgICAgICAgYnVpbGRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRlbC50cmlnZ2VySGFuZGxlcihldmVudCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBldmVudC52YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3ICQuRXZlbnQodHlwZSArICcucXVlcnlCdWlsZGVyJywge1xuICAgICAgICAgICAgICAgIGJ1aWxkZXI6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRlbC50cmlnZ2VySGFuZGxlcihldmVudCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICBvbjogZnVuY3Rpb24gKHR5cGUsIGNiKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5vbih0eXBlICsgJy5xdWVyeUJ1aWxkZXInLCBjYik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBvZmY6IGZ1bmN0aW9uICh0eXBlLCBjYikge1xuICAgICAgICAgICAgdGhpcy4kZWwub2ZmKHR5cGUgKyAnLnF1ZXJ5QnVpbGRlcicsIGNiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uY2U6IGZ1bmN0aW9uICh0eXBlLCBjYikge1xuICAgICAgICAgICAgdGhpcy4kZWwub25lKHR5cGUgKyAnLnF1ZXJ5QnVpbGRlcicsIGNiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuLy8gUExVR0lOUyBTWVNURU1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBRdWVyeUJ1aWxkZXIucGx1Z2lucyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IG9yIGV4dGVuZCB0aGUgZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdCxvcHRpb25hbH0gbmV3IGNvbmZpZ3VyYXRpb24sIGxlYXZlIHVuZGVmaW5lZCB0byBnZXQgdGhlIGRlZmF1bHQgY29uZmlnXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfG9iamVjdH0gbm90aGluZyBvciBjb25maWd1cmF0aW9uIG9iamVjdCAoY29weSlcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuZGVmYXVsdHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICQuZXh0ZW5kZXh0KHRydWUsICdyZXBsYWNlJywgUXVlcnlCdWlsZGVyLkRFRkFVTFRTLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBRdWVyeUJ1aWxkZXIuREVGQVVMVFNbb3B0aW9uc10gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIFF1ZXJ5QnVpbGRlci5ERUZBVUxUU1tvcHRpb25zXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUXVlcnlCdWlsZGVyLkRFRkFVTFRTW29wdGlvbnNdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCBRdWVyeUJ1aWxkZXIuREVGQVVMVFMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZSBhIG5ldyBwbHVnaW5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ31cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufVxuICAgICAqIEBwYXJhbSB7b2JqZWN0LG9wdGlvbmFsfSBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuZGVmaW5lID0gZnVuY3Rpb24gKG5hbWUsIGZjdCwgZGVmKSB7XG4gICAgICAgIFF1ZXJ5QnVpbGRlci5wbHVnaW5zW25hbWVdID0ge1xuICAgICAgICAgICAgZmN0OiBmY3QsXG4gICAgICAgICAgICBkZWY6IGRlZiB8fCB7fVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgbmV3IG1ldGhvZHNcbiAgICAgKiBAcGFyYW0ge29iamVjdH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuZXh0ZW5kID0gZnVuY3Rpb24gKG1ldGhvZHMpIHtcbiAgICAgICAgJC5leHRlbmQoUXVlcnlCdWlsZGVyLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXQgcGx1Z2lucyBmb3IgYW4gaW5zdGFuY2VcbiAgICAgKiBAdGhyb3dzIENvbmZpZ0Vycm9yXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5pbml0UGx1Z2lucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkLmlzQXJyYXkodGhpcy5wbHVnaW5zKSkge1xuICAgICAgICAgICAgdmFyIHRtcCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICAgICAgICAgIHRtcFtwbHVnaW5dID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zID0gdG1wO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5wbHVnaW5zKS5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgICAgIGlmIChwbHVnaW4gaW4gUXVlcnlCdWlsZGVyLnBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbnNbcGx1Z2luXSA9ICQuZXh0ZW5kKHRydWUsIHt9LFxuICAgICAgICAgICAgICAgICAgICBRdWVyeUJ1aWxkZXIucGx1Z2luc1twbHVnaW5dLmRlZixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpbl0gfHwge31cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgUXVlcnlCdWlsZGVyLnBsdWdpbnNbcGx1Z2luXS5mY3QuY2FsbCh0aGlzLCB0aGlzLnBsdWdpbnNbcGx1Z2luXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ1VuYWJsZSB0byBmaW5kIHBsdWdpbiBcInswfVwiJywgcGx1Z2luKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQWxsb3dlZCB0eXBlcyBhbmQgdGhlaXIgaW50ZXJuYWwgcmVwcmVzZW50YXRpb25cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIudHlwZXMgPSB7XG4gICAgICAgICdzdHJpbmcnOiAnc3RyaW5nJyxcbiAgICAgICAgJ2ludGVnZXInOiAnbnVtYmVyJyxcbiAgICAgICAgJ2RvdWJsZSc6ICdudW1iZXInLFxuICAgICAgICAnZGF0ZSc6ICdkYXRldGltZScsXG4gICAgICAgICd0aW1lJzogJ2RhdGV0aW1lJyxcbiAgICAgICAgJ2RhdGV0aW1lJzogJ2RhdGV0aW1lJyxcbiAgICAgICAgJ2Jvb2xlYW4nOiAnYm9vbGVhbidcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxsb3dlZCBpbnB1dHNcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuaW5wdXRzID0gW1xuICAgICAgICAndGV4dCcsXG4gICAgICAgICd0ZXh0YXJlYScsXG4gICAgICAgICdyYWRpbycsXG4gICAgICAgICdjaGVja2JveCcsXG4gICAgICAgICdzZWxlY3QnXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIFJ1bnRpbWUgbW9kaWZpYWJsZSBvcHRpb25zIHdpdGggYHNldE9wdGlvbnNgIG1ldGhvZFxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5tb2RpZmlhYmxlX29wdGlvbnMgPSBbXG4gICAgICAgICdkaXNwbGF5X2Vycm9ycycsXG4gICAgICAgICdhbGxvd19ncm91cHMnLFxuICAgICAgICAnYWxsb3dfZW1wdHknLFxuICAgICAgICAnZGVmYXVsdF9jb25kaXRpb24nLFxuICAgICAgICAnZGVmYXVsdF9maWx0ZXInXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIENTUyBzZWxlY3RvcnMgZm9yIGNvbW1vbiBjb21wb25lbnRzXG4gICAgICovXG4gICAgdmFyIFNlbGVjdG9ycyA9IFF1ZXJ5QnVpbGRlci5zZWxlY3RvcnMgPSB7XG4gICAgICAgIGdyb3VwX2NvbnRhaW5lcjogJy5ydWxlcy1ncm91cC1jb250YWluZXInLFxuICAgICAgICBydWxlX2NvbnRhaW5lcjogJy5ydWxlLWNvbnRhaW5lcicsXG4gICAgICAgIGZpbHRlcl9jb250YWluZXI6ICcucnVsZS1maWx0ZXItY29udGFpbmVyJyxcbiAgICAgICAgb3BlcmF0b3JfY29udGFpbmVyOiAnLnJ1bGUtb3BlcmF0b3ItY29udGFpbmVyJyxcbiAgICAgICAgdmFsdWVfY29udGFpbmVyOiAnLnJ1bGUtdmFsdWUtY29udGFpbmVyJyxcbiAgICAgICAgZXJyb3JfY29udGFpbmVyOiAnLmVycm9yLWNvbnRhaW5lcicsXG4gICAgICAgIGNvbmRpdGlvbl9jb250YWluZXI6ICcucnVsZXMtZ3JvdXAtaGVhZGVyIC5ncm91cC1jb25kaXRpb25zJyxcblxuICAgICAgICBydWxlX2hlYWRlcjogJy5ydWxlLWhlYWRlcicsXG4gICAgICAgIGdyb3VwX2hlYWRlcjogJy5ydWxlcy1ncm91cC1oZWFkZXInLFxuICAgICAgICBncm91cF9hY3Rpb25zOiAnLmdyb3VwLWFjdGlvbnMnLFxuICAgICAgICBydWxlX2FjdGlvbnM6ICcucnVsZS1hY3Rpb25zJyxcblxuICAgICAgICBydWxlc19saXN0OiAnLnJ1bGVzLWdyb3VwLWJvZHk+LnJ1bGVzLWxpc3QnLFxuXG4gICAgICAgIGdyb3VwX2NvbmRpdGlvbjogJy5ydWxlcy1ncm91cC1oZWFkZXIgW25hbWUkPV9jb25kXScsXG4gICAgICAgIHJ1bGVfZmlsdGVyOiAnLnJ1bGUtZmlsdGVyLWNvbnRhaW5lciBbbmFtZSQ9X2ZpbHRlcl0nLFxuICAgICAgICBydWxlX29wZXJhdG9yOiAnLnJ1bGUtb3BlcmF0b3ItY29udGFpbmVyIFtuYW1lJD1fb3BlcmF0b3JdJyxcbiAgICAgICAgcnVsZV92YWx1ZTogJy5ydWxlLXZhbHVlLWNvbnRhaW5lciBbbmFtZSo9X3ZhbHVlX10nLFxuXG4gICAgICAgIGFkZF9ydWxlOiAnW2RhdGEtYWRkPXJ1bGVdJyxcbiAgICAgICAgZGVsZXRlX3J1bGU6ICdbZGF0YS1kZWxldGU9cnVsZV0nLFxuICAgICAgICBhZGRfZ3JvdXA6ICdbZGF0YS1hZGQ9Z3JvdXBdJyxcbiAgICAgICAgZGVsZXRlX2dyb3VwOiAnW2RhdGEtZGVsZXRlPWdyb3VwXSdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGVtcGxhdGUgc3RyaW5ncyAoc2VlIGB0ZW1wbGF0ZS5qc2ApXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnRlbXBsYXRlcyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogTG9jYWxpemVkIHN0cmluZ3MgKHNlZSBgaTE4bi9gKVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5yZWdpb25hbCA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBvcGVyYXRvcnNcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuT1BFUkFUT1JTID0ge1xuICAgICAgICBlcXVhbDoge3R5cGU6ICdlcXVhbCcsIG5iX2lucHV0czogMSwgbXVsdGlwbGU6IGZhbHNlLCBhcHBseV90bzogWydzdHJpbmcnLCAnbnVtYmVyJywgJ2RhdGV0aW1lJywgJ2Jvb2xlYW4nXX0sXG4gICAgICAgIG5vdF9lcXVhbDoge1xuICAgICAgICAgICAgdHlwZTogJ25vdF9lcXVhbCcsXG4gICAgICAgICAgICBuYl9pbnB1dHM6IDEsXG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBhcHBseV90bzogWydzdHJpbmcnLCAnbnVtYmVyJywgJ2RhdGV0aW1lJywgJ2Jvb2xlYW4nXVxuICAgICAgICB9LFxuICAgICAgICBpbjoge3R5cGU6ICdpbicsIG5iX2lucHV0czogMSwgbXVsdGlwbGU6IHRydWUsIGFwcGx5X3RvOiBbJ3N0cmluZycsICdudW1iZXInLCAnZGF0ZXRpbWUnXX0sXG4gICAgICAgIG5vdF9pbjoge3R5cGU6ICdub3RfaW4nLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiB0cnVlLCBhcHBseV90bzogWydzdHJpbmcnLCAnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBsZXNzOiB7dHlwZTogJ2xlc3MnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBsZXNzX29yX2VxdWFsOiB7dHlwZTogJ2xlc3Nfb3JfZXF1YWwnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBncmVhdGVyOiB7dHlwZTogJ2dyZWF0ZXInLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBncmVhdGVyX29yX2VxdWFsOiB7dHlwZTogJ2dyZWF0ZXJfb3JfZXF1YWwnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBiZXR3ZWVuOiB7dHlwZTogJ2JldHdlZW4nLCBuYl9pbnB1dHM6IDIsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnbnVtYmVyJywgJ2RhdGV0aW1lJ119LFxuICAgICAgICBub3RfYmV0d2Vlbjoge3R5cGU6ICdub3RfYmV0d2VlbicsIG5iX2lucHV0czogMiwgbXVsdGlwbGU6IGZhbHNlLCBhcHBseV90bzogWydudW1iZXInLCAnZGF0ZXRpbWUnXX0sXG4gICAgICAgIGJlZ2luc193aXRoOiB7dHlwZTogJ2JlZ2luc193aXRoJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ3N0cmluZyddfSxcbiAgICAgICAgbm90X2JlZ2luc193aXRoOiB7dHlwZTogJ25vdF9iZWdpbnNfd2l0aCcsIG5iX2lucHV0czogMSwgbXVsdGlwbGU6IGZhbHNlLCBhcHBseV90bzogWydzdHJpbmcnXX0sXG4gICAgICAgIGNvbnRhaW5zOiB7dHlwZTogJ2NvbnRhaW5zJywgbmJfaW5wdXRzOiAxLCBtdWx0aXBsZTogZmFsc2UsIGFwcGx5X3RvOiBbJ3N0cmluZyddfSxcbiAgICAgICAgbm90X2NvbnRhaW5zOiB7dHlwZTogJ25vdF9jb250YWlucycsIG5iX2lucHV0czogMSwgbXVsdGlwbGU6IGZhbHNlLCBhcHBseV90bzogWydzdHJpbmcnXX0sXG4gICAgICAgIGVuZHNfd2l0aDoge3R5cGU6ICdlbmRzX3dpdGgnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnc3RyaW5nJ119LFxuICAgICAgICBub3RfZW5kc193aXRoOiB7dHlwZTogJ25vdF9lbmRzX3dpdGgnLCBuYl9pbnB1dHM6IDEsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnc3RyaW5nJ119LFxuICAgICAgICBpc19lbXB0eToge3R5cGU6ICdpc19lbXB0eScsIG5iX2lucHV0czogMCwgbXVsdGlwbGU6IGZhbHNlLCBhcHBseV90bzogWydzdHJpbmcnXX0sXG4gICAgICAgIGlzX25vdF9lbXB0eToge3R5cGU6ICdpc19ub3RfZW1wdHknLCBuYl9pbnB1dHM6IDAsIG11bHRpcGxlOiBmYWxzZSwgYXBwbHlfdG86IFsnc3RyaW5nJ119LFxuICAgICAgICBpc19udWxsOiB7XG4gICAgICAgICAgICB0eXBlOiAnaXNfbnVsbCcsXG4gICAgICAgICAgICBuYl9pbnB1dHM6IDAsXG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBhcHBseV90bzogWydzdHJpbmcnLCAnbnVtYmVyJywgJ2RhdGV0aW1lJywgJ2Jvb2xlYW4nXVxuICAgICAgICB9LFxuICAgICAgICBpc19ub3RfbnVsbDoge1xuICAgICAgICAgICAgdHlwZTogJ2lzX25vdF9udWxsJyxcbiAgICAgICAgICAgIG5iX2lucHV0czogMCxcbiAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgICAgIGFwcGx5X3RvOiBbJ3N0cmluZycsICdudW1iZXInLCAnZGF0ZXRpbWUnLCAnYm9vbGVhbiddXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLkRFRkFVTFRTID0ge1xuICAgICAgICBmaWx0ZXJzOiBbXSxcbiAgICAgICAgcGx1Z2luczogW10sXG5cbiAgICAgICAgc29ydF9maWx0ZXJzOiBmYWxzZSxcbiAgICAgICAgZGlzcGxheV9lcnJvcnM6IHRydWUsXG4gICAgICAgIGFsbG93X2dyb3VwczogLTEsXG4gICAgICAgIGFsbG93X2VtcHR5OiBmYWxzZSxcbiAgICAgICAgY29uZGl0aW9uczogWydBTkQnLCAnT1InXSxcbiAgICAgICAgZGVmYXVsdF9jb25kaXRpb246ICdBTkQnLFxuICAgICAgICBpbnB1dHNfc2VwYXJhdG9yOiAnICwgJyxcbiAgICAgICAgc2VsZWN0X3BsYWNlaG9sZGVyOiAnLS0tLS0tJyxcbiAgICAgICAgZGlzcGxheV9lbXB0eV9maWx0ZXI6IHRydWUsXG4gICAgICAgIGRlZmF1bHRfZmlsdGVyOiBudWxsLFxuICAgICAgICBvcHRncm91cHM6IHt9LFxuXG4gICAgICAgIGRlZmF1bHRfcnVsZV9mbGFnczoge1xuICAgICAgICAgICAgZmlsdGVyX3JlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIG9wZXJhdG9yX3JlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlX3JlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIG5vX2RlbGV0ZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0X2dyb3VwX2ZsYWdzOiB7XG4gICAgICAgICAgICBjb25kaXRpb25fcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgbm9fZGVsZXRlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICAgICAgZ3JvdXA6IG51bGwsXG4gICAgICAgICAgICBydWxlOiBudWxsLFxuICAgICAgICAgICAgZmlsdGVyU2VsZWN0OiBudWxsLFxuICAgICAgICAgICAgb3BlcmF0b3JTZWxlY3Q6IG51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBsYW5nX2NvZGU6ICdlbicsXG4gICAgICAgIGxhbmc6IHt9LFxuXG4gICAgICAgIG9wZXJhdG9yczogW1xuICAgICAgICAgICAgJ2VxdWFsJyxcbiAgICAgICAgICAgICdub3RfZXF1YWwnLFxuICAgICAgICAgICAgJ2luJyxcbiAgICAgICAgICAgICdub3RfaW4nLFxuICAgICAgICAgICAgJ2xlc3MnLFxuICAgICAgICAgICAgJ2xlc3Nfb3JfZXF1YWwnLFxuICAgICAgICAgICAgJ2dyZWF0ZXInLFxuICAgICAgICAgICAgJ2dyZWF0ZXJfb3JfZXF1YWwnLFxuICAgICAgICAgICAgJ2JldHdlZW4nLFxuICAgICAgICAgICAgJ25vdF9iZXR3ZWVuJyxcbiAgICAgICAgICAgICdiZWdpbnNfd2l0aCcsXG4gICAgICAgICAgICAnbm90X2JlZ2luc193aXRoJyxcbiAgICAgICAgICAgICdjb250YWlucycsXG4gICAgICAgICAgICAnbm90X2NvbnRhaW5zJyxcbiAgICAgICAgICAgICdlbmRzX3dpdGgnLFxuICAgICAgICAgICAgJ25vdF9lbmRzX3dpdGgnLFxuICAgICAgICAgICAgJ2lzX2VtcHR5JyxcbiAgICAgICAgICAgICdpc19ub3RfZW1wdHknLFxuICAgICAgICAgICAgJ2lzX251bGwnLFxuICAgICAgICAgICAgJ2lzX25vdF9udWxsJ1xuICAgICAgICBdLFxuXG4gICAgICAgIGljb25zOiB7XG4gICAgICAgICAgICBhZGRfZ3JvdXA6ICdnbHlwaGljb24gZ2x5cGhpY29uLXBsdXMtc2lnbicsXG4gICAgICAgICAgICBhZGRfcnVsZTogJ2dseXBoaWNvbiBnbHlwaGljb24tcGx1cycsXG4gICAgICAgICAgICByZW1vdmVfZ3JvdXA6ICdnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZScsXG4gICAgICAgICAgICByZW1vdmVfcnVsZTogJ2dseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlJyxcbiAgICAgICAgICAgIGVycm9yOiAnZ2x5cGhpY29uIGdseXBoaWNvbi13YXJuaW5nLXNpZ24nXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBJbml0IHRoZSBidWlsZGVyXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCRlbCwgb3B0aW9ucykge1xuICAgICAgICAkZWxbMF0ucXVlcnlCdWlsZGVyID0gdGhpcztcbiAgICAgICAgdGhpcy4kZWwgPSAkZWw7XG5cbiAgICAgICAgLy8gUFJPUEVSVElFU1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gJC5leHRlbmRleHQodHJ1ZSwgJ3JlcGxhY2UnLCB7fSwgUXVlcnlCdWlsZGVyLkRFRkFVTFRTLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCgpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHtcbiAgICAgICAgICAgIGdyb3VwX2lkOiAwLFxuICAgICAgICAgICAgcnVsZV9pZDogMCxcbiAgICAgICAgICAgIGdlbmVyYXRlZF9pZDogZmFsc2UsXG4gICAgICAgICAgICBoYXNfb3B0Z3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgaGFzX29wZXJhdG9yX29wcmdyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgdXBkYXRpbmdfdmFsdWU6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gXCJhbGxvd19ncm91cHNcIiBjYW4gYmUgYm9vbGVhbiBvciBpbnRcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dfZ3JvdXBzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5hbGxvd19ncm91cHMgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dfZ3JvdXBzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmFsbG93X2dyb3VwcyA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU0VUVElOR1MgU0hPUlRDVVRTXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHRoaXMuc2V0dGluZ3MuZmlsdGVycztcbiAgICAgICAgdGhpcy5pY29ucyA9IHRoaXMuc2V0dGluZ3MuaWNvbnM7XG4gICAgICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5zZXR0aW5ncy5vcGVyYXRvcnM7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzID0gdGhpcy5zZXR0aW5ncy50ZW1wbGF0ZXM7XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IHRoaXMuc2V0dGluZ3MucGx1Z2lucztcblxuICAgICAgICAvLyB0cmFuc2xhdGlvbnMgOiBlbmdsaXNoIDw8ICdsYW5nX2NvZGUnIDw8IGN1c3RvbVxuICAgICAgICBpZiAoUXVlcnlCdWlsZGVyLnJlZ2lvbmFsWydlbiddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIFV0aWxzLmVycm9yKCdDb25maWcnLCAnXCJpMThuL2VuLmpzXCIgbm90IGxvYWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhbmcgPSAkLmV4dGVuZGV4dCh0cnVlLCAncmVwbGFjZScsIHt9LCBRdWVyeUJ1aWxkZXIucmVnaW9uYWxbJ2VuJ10sIFF1ZXJ5QnVpbGRlci5yZWdpb25hbFt0aGlzLnNldHRpbmdzLmxhbmdfY29kZV0sIHRoaXMuc2V0dGluZ3MubGFuZyk7XG5cbiAgICAgICAgLy8gaW5pdCB0ZW1wbGF0ZXNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy50ZW1wbGF0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHRwbCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRlbXBsYXRlc1t0cGxdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZXNbdHBsXSA9IFF1ZXJ5QnVpbGRlci50ZW1wbGF0ZXNbdHBsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy50ZW1wbGF0ZXNbdHBsXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVzW3RwbF0gPSBkb1QudGVtcGxhdGUodGhpcy50ZW1wbGF0ZXNbdHBsXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB3ZSBoYXZlIGEgY29udGFpbmVyIGlkXG4gICAgICAgIGlmICghdGhpcy4kZWwuYXR0cignaWQnKSkge1xuICAgICAgICAgICAgdGhpcy4kZWwuYXR0cignaWQnLCAncWJfJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDk5OTk5KSk7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cy5nZW5lcmF0ZWRfaWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdHVzLmlkID0gdGhpcy4kZWwuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBJTklUXG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdxdWVyeS1idWlsZGVyJyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJzID0gdGhpcy5jaGVja0ZpbHRlcnModGhpcy5maWx0ZXJzKTtcbiAgICAgICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLmNoZWNrT3BlcmF0b3JzKHRoaXMub3BlcmF0b3JzKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVySW5pdCcpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnJ1bGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJ1bGVzKG9wdGlvbnMucnVsZXMpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2V0dGluZ3MucnVsZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFJvb3QodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoZSBjb25maWd1cmF0aW9uIG9mIGVhY2ggZmlsdGVyXG4gICAgICogQHRocm93cyBDb25maWdFcnJvclxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuY2hlY2tGaWx0ZXJzID0gZnVuY3Rpb24gKGZpbHRlcnMpIHtcbiAgICAgICAgdmFyIGRlZmluZWRGaWx0ZXJzID0gW107XG5cbiAgICAgICAgaWYgKCFmaWx0ZXJzIHx8IGZpbHRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ01pc3NpbmcgZmlsdGVycyBsaXN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBmaWx0ZXJzLmZvckVhY2goZnVuY3Rpb24gKGZpbHRlciwgaSkge1xuICAgICAgICAgICAgaWYgKCFmaWx0ZXIuaWQpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ01pc3NpbmcgZmlsdGVyIHswfSBpZCcsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlZmluZWRGaWx0ZXJzLmluZGV4T2YoZmlsdGVyLmlkKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdDb25maWcnLCAnRmlsdGVyIFwiezB9XCIgYWxyZWFkeSBkZWZpbmVkJywgZmlsdGVyLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmluZWRGaWx0ZXJzLnB1c2goZmlsdGVyLmlkKTtcblxuICAgICAgICAgICAgaWYgKCFmaWx0ZXIudHlwZSkge1xuICAgICAgICAgICAgICAgIGZpbHRlci50eXBlID0gJ3N0cmluZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghUXVlcnlCdWlsZGVyLnR5cGVzW2ZpbHRlci50eXBlXSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdDb25maWcnLCAnSW52YWxpZCB0eXBlIFwiezB9XCInLCBmaWx0ZXIudHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmlucHV0ID0gJ3RleHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGZpbHRlci5pbnB1dCAhPSAnZnVuY3Rpb24nICYmIFF1ZXJ5QnVpbGRlci5pbnB1dHMuaW5kZXhPZihmaWx0ZXIuaW5wdXQpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdJbnZhbGlkIGlucHV0IFwiezB9XCInLCBmaWx0ZXIuaW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlsdGVyLm9wZXJhdG9ycykge1xuICAgICAgICAgICAgICAgIGZpbHRlci5vcGVyYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcGVyYXRvciAhPSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdGaWx0ZXIgb3BlcmF0b3JzIG11c3QgYmUgZ2xvYmFsIG9wZXJhdG9ycyB0eXBlcyAoc3RyaW5nKScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkID0gZmlsdGVyLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFmaWx0ZXIubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIubGFiZWwgPSBmaWx0ZXIuZmllbGQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyLm9wdGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLm9wdGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzLmhhc19vcHRncm91cCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyByZWdpc3RlciBvcHRncm91cCBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3Mub3B0Z3JvdXBzW2ZpbHRlci5vcHRncm91cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vcHRncm91cHNbZmlsdGVyLm9wdGdyb3VwXSA9IGZpbHRlci5vcHRncm91cDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZmlsdGVyLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIudmFsdWVzIHx8IGZpbHRlci52YWx1ZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0NvbmZpZycsICdNaXNzaW5nIGZpbHRlciBcInswfVwiIHZhbHVlcycsIGZpbHRlci5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnBsYWNlaG9sZGVyX3ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIucGxhY2Vob2xkZXJfdmFsdWUgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLml0ZXJhdGVPcHRpb25zKGZpbHRlci52YWx1ZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09IGZpbHRlci5wbGFjZWhvbGRlcl92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ1BsYWNlaG9sZGVyIG9mIGZpbHRlciBcInswfVwiIG92ZXJsYXBzIHdpdGggb25lIG9mIGl0cyB2YWx1ZXMnLCBmaWx0ZXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zb3J0X2ZpbHRlcnMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zb3J0X2ZpbHRlcnMgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGZpbHRlcnMuc29ydCh0aGlzLnNldHRpbmdzLnNvcnRfZmlsdGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZmlsdGVycy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnRyYW5zbGF0ZUxhYmVsKGEubGFiZWwpLmxvY2FsZUNvbXBhcmUoc2VsZi50cmFuc2xhdGVMYWJlbChiLmxhYmVsKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0dXMuaGFzX29wdGdyb3VwKSB7XG4gICAgICAgICAgICBmaWx0ZXJzID0gVXRpbHMuZ3JvdXBTb3J0KGZpbHRlcnMsICdvcHRncm91cCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgY29uZmlndXJhdGlvbiBvZiBlYWNoIG9wZXJhdG9yXG4gICAgICogQHRocm93cyBDb25maWdFcnJvclxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuY2hlY2tPcGVyYXRvcnMgPSBmdW5jdGlvbiAob3BlcmF0b3JzKSB7XG4gICAgICAgIHZhciBkZWZpbmVkT3BlcmF0b3JzID0gW107XG5cbiAgICAgICAgb3BlcmF0b3JzLmZvckVhY2goZnVuY3Rpb24gKG9wZXJhdG9yLCBpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wZXJhdG9yID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFRdWVyeUJ1aWxkZXIuT1BFUkFUT1JTW29wZXJhdG9yXSkge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ1Vua25vd24gb3BlcmF0b3IgXCJ7MH1cIicsIG9wZXJhdG9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvcGVyYXRvcnNbaV0gPSBvcGVyYXRvciA9ICQuZXh0ZW5kZXh0KHRydWUsICdyZXBsYWNlJywge30sIFF1ZXJ5QnVpbGRlci5PUEVSQVRPUlNbb3BlcmF0b3JdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghb3BlcmF0b3IudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ01pc3NpbmcgXCJ0eXBlXCIgZm9yIG9wZXJhdG9yIHswfScsIGkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChRdWVyeUJ1aWxkZXIuT1BFUkFUT1JTW29wZXJhdG9yLnR5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yc1tpXSA9IG9wZXJhdG9yID0gJC5leHRlbmRleHQodHJ1ZSwgJ3JlcGxhY2UnLCB7fSwgUXVlcnlCdWlsZGVyLk9QRVJBVE9SU1tvcGVyYXRvci50eXBlXSwgb3BlcmF0b3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvci5uYl9pbnB1dHMgPT09IHVuZGVmaW5lZCB8fCBvcGVyYXRvci5hcHBseV90byA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdDb25maWcnLCAnTWlzc2luZyBcIm5iX2lucHV0c1wiIGFuZC9vciBcImFwcGx5X3RvXCIgZm9yIG9wZXJhdG9yIFwiezB9XCInLCBvcGVyYXRvci50eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkZWZpbmVkT3BlcmF0b3JzLmluZGV4T2Yob3BlcmF0b3IudHlwZSkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ09wZXJhdG9yIFwiezB9XCIgYWxyZWFkeSBkZWZpbmVkJywgb3BlcmF0b3IudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZpbmVkT3BlcmF0b3JzLnB1c2gob3BlcmF0b3IudHlwZSk7XG5cbiAgICAgICAgICAgIGlmICghb3BlcmF0b3Iub3B0Z3JvdXApIHtcbiAgICAgICAgICAgICAgICBvcGVyYXRvci5vcHRncm91cCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cy5oYXNfb3BlcmF0b3Jfb3B0Z3JvdXAgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVnaXN0ZXIgb3B0Z3JvdXAgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLm9wdGdyb3Vwc1tvcGVyYXRvci5vcHRncm91cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vcHRncm91cHNbb3BlcmF0b3Iub3B0Z3JvdXBdID0gb3BlcmF0b3Iub3B0Z3JvdXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0dXMuaGFzX29wZXJhdG9yX29wdGdyb3VwKSB7XG4gICAgICAgICAgICBvcGVyYXRvcnMgPSBVdGlscy5ncm91cFNvcnQob3BlcmF0b3JzLCAnb3B0Z3JvdXAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcGVyYXRvcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhbGwgZXZlbnRzIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIGdyb3VwIGNvbmRpdGlvbiBjaGFuZ2VcbiAgICAgICAgdGhpcy4kZWwub24oJ2NoYW5nZS5xdWVyeUJ1aWxkZXInLCBTZWxlY3RvcnMuZ3JvdXBfY29uZGl0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIHZhciAkZ3JvdXAgPSAkKHRoaXMpLmNsb3Nlc3QoU2VsZWN0b3JzLmdyb3VwX2NvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgTW9kZWwoJGdyb3VwKS5jb25kaXRpb24gPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBydWxlIGZpbHRlciBjaGFuZ2VcbiAgICAgICAgdGhpcy4kZWwub24oJ2NoYW5nZS5xdWVyeUJ1aWxkZXInLCBTZWxlY3RvcnMucnVsZV9maWx0ZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkcnVsZSA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMucnVsZV9jb250YWluZXIpO1xuICAgICAgICAgICAgTW9kZWwoJHJ1bGUpLmZpbHRlciA9IHNlbGYuZ2V0RmlsdGVyQnlJZCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcnVsZSBvcGVyYXRvciBjaGFuZ2VcbiAgICAgICAgdGhpcy4kZWwub24oJ2NoYW5nZS5xdWVyeUJ1aWxkZXInLCBTZWxlY3RvcnMucnVsZV9vcGVyYXRvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRydWxlID0gJCh0aGlzKS5jbG9zZXN0KFNlbGVjdG9ycy5ydWxlX2NvbnRhaW5lcik7XG4gICAgICAgICAgICBNb2RlbCgkcnVsZSkub3BlcmF0b3IgPSBzZWxmLmdldE9wZXJhdG9yQnlUeXBlKCQodGhpcykudmFsKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhZGQgcnVsZSBidXR0b25cbiAgICAgICAgdGhpcy4kZWwub24oJ2NsaWNrLnF1ZXJ5QnVpbGRlcicsIFNlbGVjdG9ycy5hZGRfcnVsZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRncm91cCA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMuZ3JvdXBfY29udGFpbmVyKTtcbiAgICAgICAgICAgIHNlbGYuYWRkUnVsZShNb2RlbCgkZ3JvdXApKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZGVsZXRlIHJ1bGUgYnV0dG9uXG4gICAgICAgIHRoaXMuJGVsLm9uKCdjbGljay5xdWVyeUJ1aWxkZXInLCBTZWxlY3RvcnMuZGVsZXRlX3J1bGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkcnVsZSA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMucnVsZV9jb250YWluZXIpO1xuICAgICAgICAgICAgc2VsZi5kZWxldGVSdWxlKE1vZGVsKCRydWxlKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsbG93X2dyb3VwcyAhPT0gMCkge1xuICAgICAgICAgICAgLy8gYWRkIGdyb3VwIGJ1dHRvblxuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2NsaWNrLnF1ZXJ5QnVpbGRlcicsIFNlbGVjdG9ycy5hZGRfZ3JvdXAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGdyb3VwID0gJCh0aGlzKS5jbG9zZXN0KFNlbGVjdG9ycy5ncm91cF9jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkR3JvdXAoTW9kZWwoJGdyb3VwKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZGVsZXRlIGdyb3VwIGJ1dHRvblxuICAgICAgICAgICAgdGhpcy4kZWwub24oJ2NsaWNrLnF1ZXJ5QnVpbGRlcicsIFNlbGVjdG9ycy5kZWxldGVfZ3JvdXAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGdyb3VwID0gJCh0aGlzKS5jbG9zZXN0KFNlbGVjdG9ycy5ncm91cF9jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlR3JvdXAoTW9kZWwoJGdyb3VwKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLm1vZGVsLm9uKHtcbiAgICAgICAgICAgICdkcm9wJzogZnVuY3Rpb24gKGUsIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLiRlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnJlc2hHcm91cHNDb25kaXRpb25zKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2FkZCc6IGZ1bmN0aW9uIChlLCBub2RlLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLiRlbC5wcmVwZW5kVG8obm9kZS5wYXJlbnQuJGVsLmZpbmQoJz4nICsgU2VsZWN0b3JzLnJ1bGVzX2xpc3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuJGVsLmluc2VydEFmdGVyKG5vZGUucGFyZW50LnJ1bGVzW2luZGV4IC0gMV0uJGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZyZXNoR3JvdXBzQ29uZGl0aW9ucygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdtb3ZlJzogZnVuY3Rpb24gKGUsIG5vZGUsIGdyb3VwLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIG5vZGUuJGVsLmRldGFjaCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuJGVsLnByZXBlbmRUbyhncm91cC4kZWwuZmluZCgnPicgKyBTZWxlY3RvcnMucnVsZXNfbGlzdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS4kZWwuaW5zZXJ0QWZ0ZXIoZ3JvdXAucnVsZXNbaW5kZXggLSAxXS4kZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnJlZnJlc2hHcm91cHNDb25kaXRpb25zKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3VwZGF0ZSc6IGZ1bmN0aW9uIChlLCBub2RlLCBmaWVsZCwgdmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBSdWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BsYXlFcnJvcihub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmxhZ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwbHlSdWxlRmxhZ3Mobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVSdWxlRmlsdGVyKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVyYXRvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVSdWxlT3BlcmF0b3Iobm9kZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVSdWxlVmFsdWUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BsYXlFcnJvcihub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmxhZ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwbHlHcm91cEZsYWdzKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25kaXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlR3JvdXBDb25kaXRpb24obm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIHJvb3QgZ3JvdXBcbiAgICAgKiBAcGFyYW0gYWRkUnVsZSB7Ym9vbCxvcHRpb25hbH0gYWRkIGEgZGVmYXVsdCBlbXB0eSBydWxlXG4gICAgICogQHBhcmFtIGRhdGEge21peGVkLG9wdGlvbmFsfSBncm91cCBjdXN0b20gZGF0YVxuICAgICAqIEBwYXJhbSBmbGFncyB7b2JqZWN0LG9wdGlvbmFsfSBmbGFncyB0byBhcHBseSB0byB0aGUgZ3JvdXBcbiAgICAgKiBAcmV0dXJuIGdyb3VwIHtSb290fVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuc2V0Um9vdCA9IGZ1bmN0aW9uIChhZGRSdWxlLCBkYXRhLCBmbGFncykge1xuICAgICAgICBhZGRSdWxlID0gKGFkZFJ1bGUgPT09IHVuZGVmaW5lZCB8fCBhZGRSdWxlID09PSB0cnVlKTtcblxuICAgICAgICB2YXIgZ3JvdXBfaWQgPSB0aGlzLm5leHRHcm91cElkKCk7XG4gICAgICAgIHZhciAkZ3JvdXAgPSAkKHRoaXMuZ2V0R3JvdXBUZW1wbGF0ZShncm91cF9pZCwgMSkpO1xuXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZCgkZ3JvdXApO1xuICAgICAgICB0aGlzLm1vZGVsLnJvb3QgPSBuZXcgR3JvdXAobnVsbCwgJGdyb3VwKTtcbiAgICAgICAgdGhpcy5tb2RlbC5yb290Lm1vZGVsID0gdGhpcy5tb2RlbDtcblxuICAgICAgICB0aGlzLm1vZGVsLnJvb3QuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubW9kZWwucm9vdC5mbGFncyA9ICQuZXh0ZW5kKHt9LCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfZ3JvdXBfZmxhZ3MsIGZsYWdzKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQWRkR3JvdXAnLCB0aGlzLm1vZGVsLnJvb3QpO1xuXG4gICAgICAgIHRoaXMubW9kZWwucm9vdC5jb25kaXRpb24gPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRfY29uZGl0aW9uO1xuXG4gICAgICAgIGlmIChhZGRSdWxlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUodGhpcy5tb2RlbC5yb290KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnJvb3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5ldyBncm91cFxuICAgICAqIEBwYXJhbSBwYXJlbnQge0dyb3VwfVxuICAgICAqIEBwYXJhbSBhZGRSdWxlIHtib29sLG9wdGlvbmFsfSBhZGQgYSBkZWZhdWx0IGVtcHR5IHJ1bGVcbiAgICAgKiBAcGFyYW0gZGF0YSB7bWl4ZWQsb3B0aW9uYWx9IGdyb3VwIGN1c3RvbSBkYXRhXG4gICAgICogQHBhcmFtIGZsYWdzIHtvYmplY3Qsb3B0aW9uYWx9IGZsYWdzIHRvIGFwcGx5IHRvIHRoZSBncm91cFxuICAgICAqIEByZXR1cm4gZ3JvdXAge0dyb3VwfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuYWRkR3JvdXAgPSBmdW5jdGlvbiAocGFyZW50LCBhZGRSdWxlLCBkYXRhLCBmbGFncykge1xuICAgICAgICBhZGRSdWxlID0gKGFkZFJ1bGUgPT09IHVuZGVmaW5lZCB8fCBhZGRSdWxlID09PSB0cnVlKTtcblxuICAgICAgICB2YXIgbGV2ZWwgPSBwYXJlbnQubGV2ZWwgKyAxO1xuXG4gICAgICAgIHZhciBlID0gdGhpcy50cmlnZ2VyKCdiZWZvcmVBZGRHcm91cCcsIHBhcmVudCwgYWRkUnVsZSwgbGV2ZWwpO1xuICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ3JvdXBfaWQgPSB0aGlzLm5leHRHcm91cElkKCk7XG4gICAgICAgIHZhciAkZ3JvdXAgPSAkKHRoaXMuZ2V0R3JvdXBUZW1wbGF0ZShncm91cF9pZCwgbGV2ZWwpKTtcbiAgICAgICAgdmFyIG1vZGVsID0gcGFyZW50LmFkZEdyb3VwKCRncm91cCk7XG5cbiAgICAgICAgbW9kZWwuZGF0YSA9IGRhdGE7XG4gICAgICAgIG1vZGVsLmZsYWdzID0gJC5leHRlbmQoe30sIHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9ncm91cF9mbGFncywgZmxhZ3MpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJBZGRHcm91cCcsIG1vZGVsKTtcblxuICAgICAgICBtb2RlbC5jb25kaXRpb24gPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRfY29uZGl0aW9uO1xuXG4gICAgICAgIGlmIChhZGRSdWxlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUobW9kZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBkZWxldGUgYSBncm91cC4gVGhlIGdyb3VwIGlzIG5vdCBkZWxldGVkIGlmIGF0IGxlYXN0IG9uZSBydWxlIGlzIG5vX2RlbGV0ZS5cbiAgICAgKiBAcGFyYW0gZ3JvdXAge0dyb3VwfVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGdyb3VwIGhhcyBiZWVuIGRlbGV0ZWRcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmRlbGV0ZUdyb3VwID0gZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgIGlmIChncm91cC5pc1Jvb3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGUgPSB0aGlzLnRyaWdnZXIoJ2JlZm9yZURlbGV0ZUdyb3VwJywgZ3JvdXApO1xuICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbCA9IHRydWU7XG5cbiAgICAgICAgZ3JvdXAuZWFjaCgncmV2ZXJzZScsIGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICBkZWwgJj0gdGhpcy5kZWxldGVSdWxlKHJ1bGUpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGRlbCAmPSB0aGlzLmRlbGV0ZUdyb3VwKGdyb3VwKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgaWYgKGRlbCkge1xuICAgICAgICAgICAgZ3JvdXAuZHJvcCgpO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckRlbGV0ZUdyb3VwJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBjb25kaXRpb24gb2YgYSBncm91cFxuICAgICAqIEBwYXJhbSBncm91cCB7R3JvdXB9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS51cGRhdGVHcm91cENvbmRpdGlvbiA9IGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICBncm91cC4kZWwuZmluZCgnPicgKyBTZWxlY3RvcnMuZ3JvdXBfY29uZGl0aW9uKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAkdGhpcy5wcm9wKCdjaGVja2VkJywgJHRoaXMudmFsKCkgPT09IGdyb3VwLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnYWN0aXZlJywgJHRoaXMudmFsKCkgPT09IGdyb3VwLmNvbmRpdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJVcGRhdGVHcm91cENvbmRpdGlvbicsIGdyb3VwKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHZpc2liaWxpdHkgb2YgY29uZGl0aW9ucyBiYXNlZCBvbiBudW1iZXIgb2YgcnVsZXMgaW5zaWRlIGVhY2ggZ3JvdXBcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnJlZnJlc2hHcm91cHNDb25kaXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAoZnVuY3Rpb24gd2Fsayhncm91cCkge1xuICAgICAgICAgICAgaWYgKCFncm91cC5mbGFncyB8fCAoZ3JvdXAuZmxhZ3MgJiYgIWdyb3VwLmZsYWdzLmNvbmRpdGlvbl9yZWFkb25seSkpIHtcbiAgICAgICAgICAgICAgICBncm91cC4kZWwuZmluZCgnPicgKyBTZWxlY3RvcnMuZ3JvdXBfY29uZGl0aW9uKS5wcm9wKCdkaXNhYmxlZCcsIGdyb3VwLnJ1bGVzLmxlbmd0aCA8PSAxKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ2Rpc2FibGVkJywgZ3JvdXAucnVsZXMubGVuZ3RoIDw9IDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBncm91cC5lYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB3YWxrKGdyb3VwKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9KHRoaXMubW9kZWwucm9vdCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBuZXcgcnVsZVxuICAgICAqIEBwYXJhbSBwYXJlbnQge0dyb3VwfVxuICAgICAqIEBwYXJhbSBkYXRhIHttaXhlZCxvcHRpb25hbH0gcnVsZSBjdXN0b20gZGF0YVxuICAgICAqIEBwYXJhbSBmbGFncyB7b2JqZWN0LG9wdGlvbmFsfSBmbGFncyB0byBhcHBseSB0byB0aGUgcnVsZVxuICAgICAqIEByZXR1cm4gcnVsZSB7UnVsZX1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiAocGFyZW50LCBkYXRhLCBmbGFncykge1xuICAgICAgICB2YXIgZSA9IHRoaXMudHJpZ2dlcignYmVmb3JlQWRkUnVsZScsIHBhcmVudCk7XG4gICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBydWxlX2lkID0gdGhpcy5uZXh0UnVsZUlkKCk7XG4gICAgICAgIHZhciAkcnVsZSA9ICQodGhpcy5nZXRSdWxlVGVtcGxhdGUocnVsZV9pZCkpO1xuICAgICAgICB2YXIgbW9kZWwgPSBwYXJlbnQuYWRkUnVsZSgkcnVsZSk7XG5cbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbW9kZWwuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBtb2RlbC5mbGFncyA9ICQuZXh0ZW5kKHt9LCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfcnVsZV9mbGFncywgZmxhZ3MpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJBZGRSdWxlJywgbW9kZWwpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUnVsZUZpbHRlcnMobW9kZWwpO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRlZmF1bHRfZmlsdGVyIHx8ICF0aGlzLnNldHRpbmdzLmRpc3BsYXlfZW1wdHlfZmlsdGVyKSB7XG4gICAgICAgICAgICBtb2RlbC5maWx0ZXIgPSB0aGlzLmdldEZpbHRlckJ5SWQodGhpcy5zZXR0aW5ncy5kZWZhdWx0X2ZpbHRlciB8fCB0aGlzLmZpbHRlcnNbMF0uaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBydWxlLlxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHJ1bGUgaGFzIGJlZW4gZGVsZXRlZFxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZGVsZXRlUnVsZSA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIGlmIChydWxlLmZsYWdzLm5vX2RlbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGUgPSB0aGlzLnRyaWdnZXIoJ2JlZm9yZURlbGV0ZVJ1bGUnLCBydWxlKTtcbiAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bGUuZHJvcCgpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJEZWxldGVSdWxlJyk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgZmlsdGVycyA8c2VsZWN0PiBmb3IgYSBydWxlXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVSdWxlRmlsdGVycyA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIHZhciBmaWx0ZXJzID0gdGhpcy5jaGFuZ2UoJ2dldFJ1bGVGaWx0ZXJzJywgdGhpcy5maWx0ZXJzLCBydWxlKTtcbiAgICAgICAgdmFyICRmaWx0ZXJTZWxlY3QgPSAkKHRoaXMuZ2V0UnVsZUZpbHRlclNlbGVjdChydWxlLCBmaWx0ZXJzKSk7XG5cbiAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMuZmlsdGVyX2NvbnRhaW5lcikuaHRtbCgkZmlsdGVyU2VsZWN0KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQ3JlYXRlUnVsZUZpbHRlcnMnLCBydWxlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBvcGVyYXRvcnMgPHNlbGVjdD4gZm9yIGEgcnVsZSBhbmQgaW5pdCB0aGUgcnVsZSBvcGVyYXRvclxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuY3JlYXRlUnVsZU9wZXJhdG9ycyA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIHZhciAkb3BlcmF0b3JDb250YWluZXIgPSBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5vcGVyYXRvcl9jb250YWluZXIpLmVtcHR5KCk7XG5cbiAgICAgICAgaWYgKCFydWxlLmZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wZXJhdG9ycyA9IHRoaXMuZ2V0T3BlcmF0b3JzKHJ1bGUuZmlsdGVyKTtcbiAgICAgICAgdmFyICRvcGVyYXRvclNlbGVjdCA9ICQodGhpcy5nZXRSdWxlT3BlcmF0b3JTZWxlY3QocnVsZSwgb3BlcmF0b3JzKSk7XG5cbiAgICAgICAgJG9wZXJhdG9yQ29udGFpbmVyLmh0bWwoJG9wZXJhdG9yU2VsZWN0KTtcblxuICAgICAgICAvLyBzZXQgdGhlIG9wZXJhdG9yIHdpdGhvdXQgdHJpZ2dlcmluZyB1cGRhdGUgZXZlbnRcbiAgICAgICAgcnVsZS5fXy5vcGVyYXRvciA9IG9wZXJhdG9yc1swXTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQ3JlYXRlUnVsZU9wZXJhdG9ycycsIHJ1bGUsIG9wZXJhdG9ycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgbWFpbiBpbnB1dCBmb3IgYSBydWxlXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVSdWxlSW5wdXQgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgJHZhbHVlQ29udGFpbmVyID0gcnVsZS4kZWwuZmluZChTZWxlY3RvcnMudmFsdWVfY29udGFpbmVyKS5lbXB0eSgpO1xuXG4gICAgICAgIHJ1bGUuX18udmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCFydWxlLmZpbHRlciB8fCAhcnVsZS5vcGVyYXRvciB8fCBydWxlLm9wZXJhdG9yLm5iX2lucHV0cyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgJGlucHV0cyA9ICQoKTtcbiAgICAgICAgdmFyIGZpbHRlciA9IHJ1bGUuZmlsdGVyO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZS5vcGVyYXRvci5uYl9pbnB1dHM7IGkrKykge1xuICAgICAgICAgICAgdmFyICRydWxlSW5wdXQgPSAkKHRoaXMuZ2V0UnVsZUlucHV0KHJ1bGUsIGkpKTtcbiAgICAgICAgICAgIGlmIChpID4gMCkgJHZhbHVlQ29udGFpbmVyLmFwcGVuZCh0aGlzLnNldHRpbmdzLmlucHV0c19zZXBhcmF0b3IpO1xuICAgICAgICAgICAgJHZhbHVlQ29udGFpbmVyLmFwcGVuZCgkcnVsZUlucHV0KTtcbiAgICAgICAgICAgICRpbnB1dHMgPSAkaW5wdXRzLmFkZCgkcnVsZUlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICR2YWx1ZUNvbnRhaW5lci5zaG93KCk7XG5cbiAgICAgICAgJGlucHV0cy5vbignY2hhbmdlICcgKyAoZmlsdGVyLmlucHV0X2V2ZW50IHx8ICcnKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMudXBkYXRpbmdfdmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgcnVsZS52YWx1ZSA9IHNlbGYuZ2V0UnVsZVZhbHVlKHJ1bGUpO1xuICAgICAgICAgICAgc2VsZi5zdGF0dXMudXBkYXRpbmdfdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGZpbHRlci5wbHVnaW4pIHtcbiAgICAgICAgICAgICRpbnB1dHNbZmlsdGVyLnBsdWdpbl0oZmlsdGVyLnBsdWdpbl9jb25maWcgfHwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckNyZWF0ZVJ1bGVJbnB1dCcsIHJ1bGUpO1xuXG4gICAgICAgIGlmIChmaWx0ZXIuZGVmYXVsdF92YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBydWxlLnZhbHVlID0gZmlsdGVyLmRlZmF1bHRfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxmLnN0YXR1cy51cGRhdGluZ192YWx1ZSA9IHRydWU7XG4gICAgICAgICAgICBydWxlLnZhbHVlID0gc2VsZi5nZXRSdWxlVmFsdWUocnVsZSk7XG4gICAgICAgICAgICBzZWxmLnN0YXR1cy51cGRhdGluZ192YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYWN0aW9uIHdoZW4gcnVsZSdzIGZpbHRlciBpcyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS51cGRhdGVSdWxlRmlsdGVyID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVSdWxlT3BlcmF0b3JzKHJ1bGUpO1xuICAgICAgICB0aGlzLmNyZWF0ZVJ1bGVJbnB1dChydWxlKTtcblxuICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2ZpbHRlcikudmFsKHJ1bGUuZmlsdGVyID8gcnVsZS5maWx0ZXIuaWQgOiAnLTEnKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlUnVsZUZpbHRlcicsIHJ1bGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgbWFpbiA8aW5wdXQ+IHZpc2liaWxpdHkgd2hlbiBydWxlIG9wZXJhdG9yIGNoYW5nZXNcbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKiBAcGFyYW0gcHJldmlvdXNPcGVyYXRvciB7b2JqZWN0fVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUudXBkYXRlUnVsZU9wZXJhdG9yID0gZnVuY3Rpb24gKHJ1bGUsIHByZXZpb3VzT3BlcmF0b3IpIHtcbiAgICAgICAgdmFyICR2YWx1ZUNvbnRhaW5lciA9IHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnZhbHVlX2NvbnRhaW5lcik7XG5cbiAgICAgICAgaWYgKCFydWxlLm9wZXJhdG9yIHx8IHJ1bGUub3BlcmF0b3IubmJfaW5wdXRzID09PSAwKSB7XG4gICAgICAgICAgICAkdmFsdWVDb250YWluZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICBydWxlLl9fLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJHZhbHVlQ29udGFpbmVyLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKCR2YWx1ZUNvbnRhaW5lci5pcygnOmVtcHR5JykgfHwgcnVsZS5vcGVyYXRvci5uYl9pbnB1dHMgIT09IHByZXZpb3VzT3BlcmF0b3IubmJfaW5wdXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVSdWxlSW5wdXQocnVsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocnVsZS5vcGVyYXRvcikge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9vcGVyYXRvcikudmFsKHJ1bGUub3BlcmF0b3IudHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlUnVsZU9wZXJhdG9yJywgcnVsZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYWN0aW9uIHdoZW4gcnVsZSdzIHZhbHVlIGlzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnVwZGF0ZVJ1bGVWYWx1ZSA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0dXMudXBkYXRpbmdfdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UnVsZVZhbHVlKHJ1bGUsIHJ1bGUudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZVJ1bGVWYWx1ZScsIHJ1bGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgcnVsZXMgcHJvcGVydGllcyBkZXBlbmRpbmcgb24gZmxhZ3MuXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5hcHBseVJ1bGVGbGFncyA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIHZhciBmbGFncyA9IHJ1bGUuZmxhZ3M7XG5cbiAgICAgICAgaWYgKGZsYWdzLmZpbHRlcl9yZWFkb25seSkge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9maWx0ZXIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZsYWdzLm9wZXJhdG9yX3JlYWRvbmx5KSB7XG4gICAgICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX29wZXJhdG9yKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmbGFncy52YWx1ZV9yZWFkb25seSkge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV92YWx1ZSkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhZ3Mubm9fZGVsZXRlKSB7XG4gICAgICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5kZWxldGVfcnVsZSkucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2FmdGVyQXBwbHlSdWxlRmxhZ3MnLCBydWxlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIGdyb3VwIHByb3BlcnRpZXMgZGVwZW5kaW5nIG9uIGZsYWdzLlxuICAgICAqIEBwYXJhbSBncm91cCB7R3JvdXB9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5hcHBseUdyb3VwRmxhZ3MgPSBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgdmFyIGZsYWdzID0gZ3JvdXAuZmxhZ3M7XG5cbiAgICAgICAgaWYgKGZsYWdzLmNvbmRpdGlvbl9yZWFkb25seSkge1xuICAgICAgICAgICAgZ3JvdXAuJGVsLmZpbmQoJz4nICsgU2VsZWN0b3JzLmdyb3VwX2NvbmRpdGlvbikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKS5hZGRDbGFzcygncmVhZG9ubHknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhZ3Mubm9fZGVsZXRlKSB7XG4gICAgICAgICAgICBncm91cC4kZWwuZmluZChTZWxlY3RvcnMuZGVsZXRlX2dyb3VwKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJBcHBseUdyb3VwRmxhZ3MnLCBncm91cCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCBlcnJvcnMgbWFya2Vyc1xuICAgICAqIEBwYXJhbSBub2RlIHtOb2RlLG9wdGlvbmFsfSBkZWZhdWx0IGlzIHJvb3QgR3JvdXBcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmNsZWFyRXJyb3JzID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUgfHwgdGhpcy5tb2RlbC5yb290O1xuXG4gICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5lcnJvciA9IG51bGw7XG5cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cCkge1xuICAgICAgICAgICAgbm9kZS5lYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICAgICAgcnVsZS5lcnJvciA9IG51bGw7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKGdyb3VwKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZC9SZW1vdmUgY2xhc3MgLmhhcy1lcnJvciBhbmQgdXBkYXRlIGVycm9yIHRpdGxlXG4gICAgICogQHBhcmFtIG5vZGUge05vZGV9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5kaXNwbGF5RXJyb3IgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kaXNwbGF5X2Vycm9ycykge1xuICAgICAgICAgICAgaWYgKG5vZGUuZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBub2RlLiRlbC5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2xhdGUgdGhlIHRleHQgd2l0aG91dCBtb2RpZnlpbmcgZXZlbnQgYXJyYXlcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAkLmV4dGVuZChbXSwgbm9kZS5lcnJvciwgW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmcuZXJyb3JzW25vZGUuZXJyb3JbMF1dIHx8IG5vZGUuZXJyb3JbMF1cbiAgICAgICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgICAgIG5vZGUuJGVsLmFkZENsYXNzKCdoYXMtZXJyb3InKVxuICAgICAgICAgICAgICAgICAgICAuZmluZChTZWxlY3RvcnMuZXJyb3JfY29udGFpbmVyKS5lcSgwKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndGl0bGUnLCBVdGlscy5mbXQuYXBwbHkobnVsbCwgZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGEgdmFsaWRhdGlvbiBlcnJvciBldmVudFxuICAgICAqIEBwYXJhbSBub2RlIHtOb2RlfVxuICAgICAqIEBwYXJhbSBlcnJvciB7YXJyYXl9XG4gICAgICogQHBhcmFtIHZhbHVlIHttaXhlZH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnRyaWdnZXJWYWxpZGF0aW9uRXJyb3IgPSBmdW5jdGlvbiAobm9kZSwgZXJyb3IsIHZhbHVlKSB7XG4gICAgICAgIGlmICghJC5pc0FycmF5KGVycm9yKSkge1xuICAgICAgICAgICAgZXJyb3IgPSBbZXJyb3JdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGUgPSB0aGlzLnRyaWdnZXIoJ3ZhbGlkYXRpb25FcnJvcicsIG5vZGUsIGVycm9yLCB2YWx1ZSk7XG4gICAgICAgIGlmICghZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgbm9kZS5lcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSB0aGUgcGx1Z2luXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2JlZm9yZURlc3Ryb3knKTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0dXMuZ2VuZXJhdGVkX2lkKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyKCdpZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB0aGlzLm1vZGVsID0gbnVsbDtcblxuICAgICAgICB0aGlzLiRlbFxuICAgICAgICAgICAgLm9mZignLnF1ZXJ5QnVpbGRlcicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3F1ZXJ5LWJ1aWxkZXInKVxuICAgICAgICAgICAgLnJlbW92ZURhdGEoJ3F1ZXJ5QnVpbGRlcicpO1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLiRlbFswXS5xdWVyeUJ1aWxkZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBwbHVnaW5cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0YXR1cy5ncm91cF9pZCA9IDE7XG4gICAgICAgIHRoaXMuc3RhdHVzLnJ1bGVfaWQgPSAwO1xuXG4gICAgICAgIHRoaXMubW9kZWwucm9vdC5lbXB0eSgpO1xuXG4gICAgICAgIHRoaXMuYWRkUnVsZSh0aGlzLm1vZGVsLnJvb3QpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJSZXNldCcpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgcGx1Z2luXG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMuZ3JvdXBfaWQgPSAwO1xuICAgICAgICB0aGlzLnN0YXR1cy5ydWxlX2lkID0gMDtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbC5yb290KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnJvb3QuZHJvcCgpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5yb290ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJDbGVhcicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb2RpZnkgdGhlIGJ1aWxkZXIgY29uZmlndXJhdGlvblxuICAgICAqIE9ubHkgb3B0aW9ucyBkZWZpbmVkIGluIFF1ZXJ5QnVpbGRlci5tb2RpZmlhYmxlX29wdGlvbnMgYXJlIG1vZGlmaWFibGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAvLyB1c2UgalF1ZXJ5IHV0aWxzIHRvIGZpbHRlciBvcHRpb25zIGtleXNcbiAgICAgICAgJC5tYWtlQXJyYXkoJChPYmplY3Qua2V5cyhvcHRpb25zKSkuZmlsdGVyKFF1ZXJ5QnVpbGRlci5tb2RpZmlhYmxlX29wdGlvbnMpKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Nbb3B0XSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG1vZGVsIGFzc29jaWF0ZWQgdG8gYSBET00gb2JqZWN0LCBvciByb290IG1vZGVsXG4gICAgICogQHBhcmFtIHtqUXVlcnksb3B0aW9uYWx9XG4gICAgICogQHJldHVybiB7Tm9kZX1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldE1vZGVsID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gIXRhcmdldCA/IHRoaXMubW9kZWwucm9vdCA6IE1vZGVsKHRhcmdldCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHRoZSB3aG9sZSBidWlsZGVyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNsZWFyRXJyb3JzKCk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciB2YWxpZCA9IChmdW5jdGlvbiBwYXJzZShncm91cCkge1xuICAgICAgICAgICAgdmFyIGRvbmUgPSAwO1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IDA7XG5cbiAgICAgICAgICAgIGdyb3VwLmVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJ1bGUuZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlclZhbGlkYXRpb25FcnJvcihydWxlLCAnbm9fZmlsdGVyJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycysrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJ1bGUub3BlcmF0b3IubmJfaW5wdXRzICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxpZCA9IHNlbGYudmFsaWRhdGVWYWx1ZShydWxlLCBydWxlLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlclZhbGlkYXRpb25FcnJvcihydWxlLCB2YWxpZCwgcnVsZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvbmUrKztcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlKGdyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICBkb25lKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGVycm9ycyA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb25lID09PSAwICYmICghc2VsZi5zZXR0aW5ncy5hbGxvd19lbXB0eSB8fCAhZ3JvdXAuaXNSb290KCkpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyVmFsaWRhdGlvbkVycm9yKGdyb3VwLCAnZW1wdHlfZ3JvdXAnLCBudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH0odGhpcy5tb2RlbC5yb290KSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCd2YWxpZGF0ZScsIHZhbGlkKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIG9iamVjdCByZXByZXNlbnRpbmcgY3VycmVudCBydWxlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gICAgICogICAgICAtIGdldF9mbGFnczogZmFsc2VbZGVmYXVsdF0gfCB0cnVlKG9ubHkgY2hhbmdlcyBmcm9tIGRlZmF1bHQgZmxhZ3MpIHwgJ2FsbCdcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRSdWxlcyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICBnZXRfZmxhZ3M6IGZhbHNlXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIG91dCA9IChmdW5jdGlvbiBwYXJzZShncm91cCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiBncm91cC5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAuZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEuZGF0YSA9ICQuZXh0ZW5kZXh0KHRydWUsICdyZXBsYWNlJywge30sIGdyb3VwLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5nZXRfZmxhZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxhZ3MgPSBzZWxmLmdldEdyb3VwRmxhZ3MoZ3JvdXAuZmxhZ3MsIG9wdGlvbnMuZ2V0X2ZsYWdzID09PSAnYWxsJyk7XG4gICAgICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QoZmxhZ3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmxhZ3MgPSBmbGFncztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyb3VwLmVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwub3BlcmF0b3IubmJfaW5wdXRzICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbW9kZWwudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJ1bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtb2RlbC5maWx0ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBtb2RlbC5maWx0ZXIuZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG1vZGVsLmZpbHRlci50eXBlLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dDogbW9kZWwuZmlsdGVyLmlucHV0LFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvcjogbW9kZWwub3BlcmF0b3IudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5maWx0ZXIuZGF0YSB8fCBtb2RlbC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bGUuZGF0YSA9ICQuZXh0ZW5kZXh0KHRydWUsICdyZXBsYWNlJywge30sIG1vZGVsLmZpbHRlci5kYXRhLCBtb2RlbC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5nZXRfZmxhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZsYWdzID0gc2VsZi5nZXRSdWxlRmxhZ3MobW9kZWwuZmxhZ3MsIG9wdGlvbnMuZ2V0X2ZsYWdzID09PSAnYWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGZsYWdzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZS5mbGFncyA9IGZsYWdzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGF0YS5ydWxlcy5wdXNoKHJ1bGUpO1xuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnJ1bGVzLnB1c2gocGFyc2UobW9kZWwpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgICAgICB9KHRoaXMubW9kZWwucm9vdCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgnZ2V0UnVsZXMnLCBvdXQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXQgcnVsZXMgZnJvbSBvYmplY3RcbiAgICAgKiBAdGhyb3dzIFJ1bGVzRXJyb3IsIFVuZGVmaW5lZENvbmRpdGlvbkVycm9yXG4gICAgICogQHBhcmFtIGRhdGEge29iamVjdH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnNldFJ1bGVzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKCQuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb25kaXRpb246IHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgcnVsZXM6IGRhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEucnVsZXMgfHwgKGRhdGEucnVsZXMubGVuZ3RoID09PSAwICYmICF0aGlzLnNldHRpbmdzLmFsbG93X2VtcHR5KSkge1xuICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1J1bGVzUGFyc2UnLCAnSW5jb3JyZWN0IGRhdGEgb2JqZWN0IHBhc3NlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB0aGlzLnNldFJvb3QoZmFsc2UsIGRhdGEuZGF0YSwgdGhpcy5wYXJzZUdyb3VwRmxhZ3MoZGF0YSkpO1xuXG4gICAgICAgIGRhdGEgPSB0aGlzLmNoYW5nZSgnc2V0UnVsZXMnLCBkYXRhKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgKGZ1bmN0aW9uIGFkZChkYXRhLCBncm91cCkge1xuICAgICAgICAgICAgaWYgKGdyb3VwID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YS5jb25kaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRhdGEuY29uZGl0aW9uID0gc2VsZi5zZXR0aW5ncy5kZWZhdWx0X2NvbmRpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGYuc2V0dGluZ3MuY29uZGl0aW9ucy5pbmRleE9mKGRhdGEuY29uZGl0aW9uKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdVbmRlZmluZWRDb25kaXRpb24nLCAnSW52YWxpZCBjb25kaXRpb24gXCJ7MH1cIicsIGRhdGEuY29uZGl0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JvdXAuY29uZGl0aW9uID0gZGF0YS5jb25kaXRpb247XG5cbiAgICAgICAgICAgIGRhdGEucnVsZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBtb2RlbDtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5ydWxlcyAmJiBpdGVtLnJ1bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MuYWxsb3dfZ3JvdXBzICE9PSAtMSAmJiBzZWxmLnNldHRpbmdzLmFsbG93X2dyb3VwcyA8IGdyb3VwLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignUnVsZXNQYXJzZScsICdObyBtb3JlIHRoYW4gezB9IGdyb3VwcyBhcmUgYWxsb3dlZCcsIHNlbGYuc2V0dGluZ3MuYWxsb3dfZ3JvdXBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsID0gc2VsZi5hZGRHcm91cChncm91cCwgZmFsc2UsIGl0ZW0uZGF0YSwgc2VsZi5wYXJzZUdyb3VwRmxhZ3MoaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGQoaXRlbSwgbW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignUnVsZXNQYXJzZScsICdNaXNzaW5nIHJ1bGUgZmllbGQgaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5vcGVyYXRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9wZXJhdG9yID0gJ2VxdWFsJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gc2VsZi5hZGRSdWxlKGdyb3VwLCBpdGVtLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZpbHRlciA9IHNlbGYuZ2V0RmlsdGVyQnlJZChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwub3BlcmF0b3IgPSBzZWxmLmdldE9wZXJhdG9yQnlUeXBlKGl0ZW0ub3BlcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5mbGFncyA9IHNlbGYucGFyc2VSdWxlRmxhZ3MoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLm9wZXJhdG9yLm5iX2lucHV0cyAhPT0gMCAmJiBpdGVtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnZhbHVlID0gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0oZGF0YSwgdGhpcy5tb2RlbC5yb290KSk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBjb3JyZWN0IGZvciBhIGZpbHRlclxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfHN0cmluZ1tdfHVuZGVmaW5lZH1cbiAgICAgKiBAcmV0dXJuIHthcnJheXx0cnVlfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUudmFsaWRhdGVWYWx1ZSA9IGZ1bmN0aW9uIChydWxlLCB2YWx1ZSkge1xuICAgICAgICB2YXIgdmFsaWRhdGlvbiA9IHJ1bGUuZmlsdGVyLnZhbGlkYXRpb24gfHwge307XG4gICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh2YWxpZGF0aW9uLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB2YWxpZGF0aW9uLmNhbGxiYWNrLmNhbGwodGhpcywgdmFsdWUsIHJ1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy52YWxpZGF0ZVZhbHVlSW50ZXJuYWwocnVsZSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCd2YWxpZGF0ZVZhbHVlJywgcmVzdWx0LCB2YWx1ZSwgcnVsZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdmFsaWRhdGlvbiBmdW5jdGlvblxuICAgICAqIEB0aHJvd3MgQ29uZmlnRXJyb3JcbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ3xzdHJpbmdbXXx1bmRlZmluZWR9XG4gICAgICogQHJldHVybiB7YXJyYXl8dHJ1ZX1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnZhbGlkYXRlVmFsdWVJbnRlcm5hbCA9IGZ1bmN0aW9uIChydWxlLCB2YWx1ZSkge1xuICAgICAgICB2YXIgZmlsdGVyID0gcnVsZS5maWx0ZXI7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHJ1bGUub3BlcmF0b3I7XG4gICAgICAgIHZhciB2YWxpZGF0aW9uID0gZmlsdGVyLnZhbGlkYXRpb24gfHwge307XG4gICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgICAgICB2YXIgdG1wO1xuXG4gICAgICAgIGlmIChydWxlLm9wZXJhdG9yLm5iX2lucHV0cyA9PT0gMSkge1xuICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3BlcmF0b3IubmJfaW5wdXRzOyBpKyspIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZmlsdGVyLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydyYWRpb19lbXB0eSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlW2ldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydjaGVja2JveF9lbXB0eSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIW9wZXJhdG9yLm11bHRpcGxlICYmIHZhbHVlW2ldLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnb3BlcmF0b3Jfbm90X211bHRpcGxlJywgb3BlcmF0b3IudHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlW2ldLmxlbmd0aCA9PT0gMCB8fCAoZmlsdGVyLnBsYWNlaG9sZGVyICYmIHZhbHVlW2ldID09IGZpbHRlci5wbGFjZWhvbGRlcl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ3NlbGVjdF9lbXB0eSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIW9wZXJhdG9yLm11bHRpcGxlICYmIHZhbHVlW2ldLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ29wZXJhdG9yX25vdF9tdWx0aXBsZScsIG9wZXJhdG9yLnR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlW2ldID09PSB1bmRlZmluZWQgfHwgKGZpbHRlci5wbGFjZWhvbGRlciAmJiB2YWx1ZVtpXSA9PSBmaWx0ZXIucGxhY2Vob2xkZXJfdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydzZWxlY3RfZW1wdHknXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoUXVlcnlCdWlsZGVyLnR5cGVzW2ZpbHRlci50eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVbaV0gPT09IHVuZGVmaW5lZCB8fCB2YWx1ZVtpXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydzdHJpbmdfZW1wdHknXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXS5sZW5ndGggPCBwYXJzZUludCh2YWxpZGF0aW9uLm1pbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnc3RyaW5nX2V4Y2VlZF9taW5fbGVuZ3RoJywgdmFsaWRhdGlvbi5taW5dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlW2ldLmxlbmd0aCA+IHBhcnNlSW50KHZhbGlkYXRpb24ubWF4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydzdHJpbmdfZXhjZWVkX21heF9sZW5ndGgnLCB2YWxpZGF0aW9uLm1heF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5mb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uLmZvcm1hdCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5mb3JtYXQgPSBuZXcgUmVnRXhwKHZhbGlkYXRpb24uZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkYXRpb24uZm9ybWF0LnRlc3QodmFsdWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ3N0cmluZ19pbnZhbGlkX2Zvcm1hdCcsIHZhbGlkYXRpb24uZm9ybWF0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXSA9PT0gdW5kZWZpbmVkIHx8IGlzTmFOKHZhbHVlW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ251bWJlcl9uYW4nXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudHlwZSA9PSAnaW50ZWdlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHZhbHVlW2ldKSAhPSB2YWx1ZVtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydudW1iZXJfbm90X2ludGVnZXInXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VGbG9hdCh2YWx1ZVtpXSkgIT0gdmFsdWVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnbnVtYmVyX25vdF9kb3VibGUnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXSA8IHBhcnNlRmxvYXQodmFsaWRhdGlvbi5taW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ251bWJlcl9leGNlZWRfbWluJywgdmFsaWRhdGlvbi5taW5dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlW2ldID4gcGFyc2VGbG9hdCh2YWxpZGF0aW9uLm1heCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnbnVtYmVyX2V4Y2VlZF9tYXgnLCB2YWxpZGF0aW9uLm1heF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5zdGVwICE9PSB1bmRlZmluZWQgJiYgdmFsaWRhdGlvbi5zdGVwICE9PSAnYW55Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9ICh2YWx1ZVtpXSAvIHZhbGlkYXRpb24uc3RlcCkudG9QcmVjaXNpb24oMTQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodikgIT0gdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydudW1iZXJfd3Jvbmdfc3RlcCcsIHZhbGlkYXRpb24uc3RlcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpXSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlW2ldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ2RhdGV0aW1lX2VtcHR5J107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgTW9tZW50SlNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5mb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoJ21vbWVudCcgaW4gd2luZG93KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ01pc3NpbmdMaWJyYXJ5JywgJ01vbWVudEpTIGlzIHJlcXVpcmVkIGZvciBEYXRlL1RpbWUgdmFsaWRhdGlvbi4gR2V0IGl0IGhlcmUgaHR0cDovL21vbWVudGpzLmNvbScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGV0aW1lID0gbW9tZW50KHZhbHVlW2ldLCB2YWxpZGF0aW9uLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0ZXRpbWUuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbJ2RhdGV0aW1lX2ludmFsaWQnLCB2YWxpZGF0aW9uLmZvcm1hdF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRldGltZSA8IG1vbWVudCh2YWxpZGF0aW9uLm1pbiwgdmFsaWRhdGlvbi5mb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFsnZGF0ZXRpbWVfZXhjZWVkX21pbicsIHZhbGlkYXRpb24ubWluXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGV0aW1lID4gbW9tZW50KHZhbGlkYXRpb24ubWF4LCB2YWxpZGF0aW9uLmZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydkYXRldGltZV9leGNlZWRfbWF4JywgdmFsaWRhdGlvbi5tYXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHZhbHVlW2ldLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0bXAgIT09ICd0cnVlJyAmJiB0bXAgIT09ICdmYWxzZScgJiYgdG1wICE9PSAnMScgJiYgdG1wICE9PSAnMCcgJiYgdmFsdWVbaV0gIT09IDEgJiYgdmFsdWVbaV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gWydib29sZWFuX25vdF92YWxpZCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpbmNyZW1lbnRlZCBncm91cCBJRFxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLm5leHRHcm91cElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXMuaWQgKyAnX2dyb3VwXycgKyAodGhpcy5zdGF0dXMuZ3JvdXBfaWQrKyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaW5jcmVtZW50ZWQgcnVsZSBJRFxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLm5leHRSdWxlSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXR1cy5pZCArICdfcnVsZV8nICsgKHRoaXMuc3RhdHVzLnJ1bGVfaWQrKyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9wZXJhdG9ycyBmb3IgYSBmaWx0ZXJcbiAgICAgKiBAcGFyYW0gZmlsdGVyIHtzdHJpbmd8b2JqZWN0fSAoZmlsdGVyIGlkIG5hbWUgb3IgZmlsdGVyIG9iamVjdClcbiAgICAgKiBAcmV0dXJuIHtvYmplY3RbXX1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldE9wZXJhdG9ycyA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyQnlJZChmaWx0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5vcGVyYXRvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBmaWx0ZXIgb3BlcmF0b3JzIGNoZWNrXG4gICAgICAgICAgICBpZiAoZmlsdGVyLm9wZXJhdG9ycykge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIub3BlcmF0b3JzLmluZGV4T2YodGhpcy5vcGVyYXRvcnNbaV0udHlwZSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdHlwZSBjaGVja1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vcGVyYXRvcnNbaV0uYXBwbHlfdG8uaW5kZXhPZihRdWVyeUJ1aWxkZXIudHlwZXNbZmlsdGVyLnR5cGVdKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLm9wZXJhdG9yc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBrZWVwIHNvcnQgb3JkZXIgZGVmaW5lZCBmb3IgdGhlIGZpbHRlclxuICAgICAgICBpZiAoZmlsdGVyLm9wZXJhdG9ycykge1xuICAgICAgICAgICAgcmVzdWx0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyLm9wZXJhdG9ycy5pbmRleE9mKGEudHlwZSkgLSBmaWx0ZXIub3BlcmF0b3JzLmluZGV4T2YoYi50eXBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdnZXRPcGVyYXRvcnMnLCByZXN1bHQsIGZpbHRlcik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwYXJ0aWN1bGFyIGZpbHRlciBieSBpdHMgaWRcbiAgICAgKiBAdGhyb3dzIFVuZGVmaW5lZEZpbHRlckVycm9yXG4gICAgICogQHBhcmFtIGZpbHRlcklkIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7b2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRGaWx0ZXJCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGlmIChpZCA9PSAnLTEnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5maWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1tpXS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBVdGlscy5lcnJvcignVW5kZWZpbmVkRmlsdGVyJywgJ1VuZGVmaW5lZCBmaWx0ZXIgXCJ7MH1cIicsIGlkKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgcGFydGljdWxhciBvcGVyYXRvciBieSBpdHMgdHlwZVxuICAgICAqIEB0aHJvd3MgVW5kZWZpbmVkT3BlcmF0b3JFcnJvclxuICAgICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7b2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRPcGVyYXRvckJ5VHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlID09ICctMScpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLm9wZXJhdG9ycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZXJhdG9yc1tpXS50eXBlID09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVyYXRvcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBVdGlscy5lcnJvcignVW5kZWZpbmVkT3BlcmF0b3InLCAnVW5kZWZpbmVkIG9wZXJhdG9yIFwiezB9XCInLCB0eXBlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBydWxlIHZhbHVlXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICogQHJldHVybiB7bWl4ZWR9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRSdWxlVmFsdWUgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgZmlsdGVyID0gcnVsZS5maWx0ZXI7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHJ1bGUub3BlcmF0b3I7XG4gICAgICAgIHZhciB2YWx1ZSA9IFtdO1xuXG4gICAgICAgIGlmIChmaWx0ZXIudmFsdWVHZXR0ZXIpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZmlsdGVyLnZhbHVlR2V0dGVyLmNhbGwodGhpcywgcnVsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgJHZhbHVlID0gcnVsZS4kZWwuZmluZChTZWxlY3RvcnMudmFsdWVfY29udGFpbmVyKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcGVyYXRvci5uYl9pbnB1dHM7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gVXRpbHMuZXNjYXBlRWxlbWVudElkKHJ1bGUuaWQgKyAnX3ZhbHVlXycgKyBpKTtcbiAgICAgICAgICAgICAgICB2YXIgdG1wO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChmaWx0ZXIuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaCgkdmFsdWUuZmluZCgnW25hbWU9JyArIG5hbWUgKyAnXTpjaGVja2VkJykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAkdmFsdWUuZmluZCgnW25hbWU9JyArIG5hbWUgKyAnXTpjaGVja2VkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2godG1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHZhbHVlLmZpbmQoJ1tuYW1lPScgKyBuYW1lICsgJ10gb3B0aW9uOnNlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKCQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2godG1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goJHZhbHVlLmZpbmQoJ1tuYW1lPScgKyBuYW1lICsgJ10gb3B0aW9uOnNlbGVjdGVkJykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goJHZhbHVlLmZpbmQoJ1tuYW1lPScgKyBuYW1lICsgJ10nKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3BlcmF0b3IubmJfaW5wdXRzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQGRlcHJlY2F0ZWRcbiAgICAgICAgICAgIGlmIChmaWx0ZXIudmFsdWVQYXJzZXIpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGZpbHRlci52YWx1ZVBhcnNlci5jYWxsKHRoaXMsIHJ1bGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgnZ2V0UnVsZVZhbHVlJywgdmFsdWUsIHJ1bGUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIHJ1bGUuXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICogQHBhcmFtIHZhbHVlIHttaXhlZH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnNldFJ1bGVWYWx1ZSA9IGZ1bmN0aW9uIChydWxlLCB2YWx1ZSkge1xuICAgICAgICB2YXIgZmlsdGVyID0gcnVsZS5maWx0ZXI7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHJ1bGUub3BlcmF0b3I7XG5cbiAgICAgICAgaWYgKGZpbHRlci52YWx1ZVNldHRlcikge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlU2V0dGVyLmNhbGwodGhpcywgcnVsZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyICR2YWx1ZSA9IHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnZhbHVlX2NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGlmIChvcGVyYXRvci5uYl9pbnB1dHMgPT0gMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3BlcmF0b3IubmJfaW5wdXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFV0aWxzLmVzY2FwZUVsZW1lbnRJZChydWxlLmlkICsgJ192YWx1ZV8nICsgaSk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpbHRlci5pbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAkdmFsdWUuZmluZCgnW25hbWU9JyArIG5hbWUgKyAnXVt2YWx1ZT1cIicgKyB2YWx1ZVtpXSArICdcIl0nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQuaXNBcnJheSh2YWx1ZVtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtpXSA9IFt2YWx1ZVtpXV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtpXS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR2YWx1ZS5maW5kKCdbbmFtZT0nICsgbmFtZSArICddW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICR2YWx1ZS5maW5kKCdbbmFtZT0nICsgbmFtZSArICddJykudmFsKHZhbHVlW2ldKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhbiBydWxlIGZsYWdzLlxuICAgICAqIEBwYXJhbSBydWxlIHtvYmplY3R9XG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUucGFyc2VSdWxlRmxhZ3MgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICB2YXIgZmxhZ3MgPSAkLmV4dGVuZCh7fSwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3J1bGVfZmxhZ3MpO1xuXG4gICAgICAgIGlmIChydWxlLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAkLmV4dGVuZChmbGFncywge1xuICAgICAgICAgICAgICAgIGZpbHRlcl9yZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcGVyYXRvcl9yZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZV9yZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBub19kZWxldGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJ1bGUuZmxhZ3MpIHtcbiAgICAgICAgICAgICQuZXh0ZW5kKGZsYWdzLCBydWxlLmZsYWdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgncGFyc2VSdWxlRmxhZ3MnLCBmbGFncywgcnVsZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhIGNvcHkgb2YgZmxhZ3Mgb2YgYSBydWxlLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmbGFnc1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsIC0gdHJ1ZSB0byByZXR1cm4gYWxsIGZsYWdzLCBmYWxzZSB0byByZXR1cm4gb25seSBjaGFuZ2VzIGZyb20gZGVmYXVsdFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRSdWxlRmxhZ3MgPSBmdW5jdGlvbiAoZmxhZ3MsIGFsbCkge1xuICAgICAgICBpZiAoYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIGZsYWdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLnNldHRpbmdzLmRlZmF1bHRfcnVsZV9mbGFncywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmxhZ3Nba2V5XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0W2tleV0gPSBmbGFnc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGVhbiBncm91cCBmbGFncy5cbiAgICAgKiBAcGFyYW0gZ3JvdXAge29iamVjdH1cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5wYXJzZUdyb3VwRmxhZ3MgPSBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgdmFyIGZsYWdzID0gJC5leHRlbmQoe30sIHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9ncm91cF9mbGFncyk7XG5cbiAgICAgICAgaWYgKGdyb3VwLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAkLmV4dGVuZChmbGFncywge1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvbl9yZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBub19kZWxldGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdyb3VwLmZsYWdzKSB7XG4gICAgICAgICAgICAkLmV4dGVuZChmbGFncywgZ3JvdXAuZmxhZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdwYXJzZUdyb3VwRmxhZ3MnLCBmbGFncywgZ3JvdXApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBjb3B5IG9mIGZsYWdzIG9mIGEgZ3JvdXAuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZsYWdzXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhbGwgLSB0cnVlIHRvIHJldHVybiBhbGwgZmxhZ3MsIGZhbHNlIHRvIHJldHVybiBvbmx5IGNoYW5nZXMgZnJvbSBkZWZhdWx0XG4gICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldEdyb3VwRmxhZ3MgPSBmdW5jdGlvbiAoZmxhZ3MsIGFsbCkge1xuICAgICAgICBpZiAoYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIGZsYWdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLnNldHRpbmdzLmRlZmF1bHRfZ3JvdXBfZmxhZ3MsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZsYWdzW2tleV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFtrZXldID0gZmxhZ3Nba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlIGEgbGFiZWxcbiAgICAgKiBAcGFyYW0gbGFiZWwge3N0cmluZ3xvYmplY3R9XG4gICAgICogQHJldHVybiBzdHJpbmdcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLnRyYW5zbGF0ZUxhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbGFiZWwgPT0gJ29iamVjdCcgPyAobGFiZWxbdGhpcy5zZXR0aW5ncy5sYW5nX2NvZGVdIHx8IGxhYmVsWydlbiddKSA6IGxhYmVsO1xuICAgIH07XG5cblxuICAgIFF1ZXJ5QnVpbGRlci50ZW1wbGF0ZXMuZ3JvdXAgPSAnXFxcbjxkbCBpZD1cInt7PSBpdC5ncm91cF9pZCB9fVwiIGNsYXNzPVwicnVsZXMtZ3JvdXAtY29udGFpbmVyXCI+IFxcXG4gIDxkdCBjbGFzcz1cInJ1bGVzLWdyb3VwLWhlYWRlclwiPiBcXFxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgcHVsbC1yaWdodCBncm91cC1hY3Rpb25zXCI+IFxcXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLXN1Y2Nlc3NcIiBkYXRhLWFkZD1cInJ1bGVcIj4gXFxcbiAgICAgICAgPGkgY2xhc3M9XCJ7ez0gaXQuaWNvbnMuYWRkX3J1bGUgfX1cIj48L2k+IHt7PSBpdC5sYW5nLmFkZF9ydWxlIH19IFxcXG4gICAgICA8L2J1dHRvbj4gXFxcbiAgICAgIHt7PyBpdC5zZXR0aW5ncy5hbGxvd19ncm91cHM9PT0tMSB8fCBpdC5zZXR0aW5ncy5hbGxvd19ncm91cHM+PWl0LmxldmVsIH19IFxcXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tc3VjY2Vzc1wiIGRhdGEtYWRkPVwiZ3JvdXBcIj4gXFxcbiAgICAgICAgICA8aSBjbGFzcz1cInt7PSBpdC5pY29ucy5hZGRfZ3JvdXAgfX1cIj48L2k+IHt7PSBpdC5sYW5nLmFkZF9ncm91cCB9fSBcXFxuICAgICAgICA8L2J1dHRvbj4gXFxcbiAgICAgIHt7P319IFxcXG4gICAgICB7ez8gaXQubGV2ZWw+MSB9fSBcXFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLWRhbmdlciByZW1vdmUtZ3JvdXBcIiBkYXRhLWRlbGV0ZT1cImdyb3VwXCI+IFxcXG4gICAgICAgICAgPGkgY2xhc3M9XCJ7ez0gaXQuaWNvbnMucmVtb3ZlX2dyb3VwIH19XCI+PC9pPiB7ez0gaXQubGFuZy5kZWxldGVfZ3JvdXAgfX0gXFxcbiAgICAgICAgPC9idXR0b24+IFxcXG4gICAgICB7ez99fSBcXFxuICAgIDwvZGl2PiBcXFxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgZ3JvdXAtY29uZGl0aW9uc1wiPiBcXFxuICAgICAge3t+IGl0LmNvbmRpdGlvbnM6IGNvbmRpdGlvbiB9fSBcXFxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1wcmltYXJ5XCI+IFxcXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJ7ez0gaXQuZ3JvdXBfaWQgfX1fY29uZFwiIHZhbHVlPVwie3s9IGNvbmRpdGlvbiB9fVwiPiB7ez0gaXQubGFuZy5jb25kaXRpb25zW2NvbmRpdGlvbl0gfHwgY29uZGl0aW9uIH19IFxcXG4gICAgICAgIDwvbGFiZWw+IFxcXG4gICAgICB7e359fSBcXFxuICAgIDwvZGl2PiBcXFxuICAgIHt7PyBpdC5zZXR0aW5ncy5kaXNwbGF5X2Vycm9ycyB9fSBcXFxuICAgICAgPGRpdiBjbGFzcz1cImVycm9yLWNvbnRhaW5lclwiPjxpIGNsYXNzPVwie3s9IGl0Lmljb25zLmVycm9yIH19XCI+PC9pPjwvZGl2PiBcXFxuICAgIHt7P319IFxcXG4gIDwvZHQ+IFxcXG4gIDxkZCBjbGFzcz1ydWxlcy1ncm91cC1ib2R5PiBcXFxuICAgIDx1bCBjbGFzcz1ydWxlcy1saXN0PjwvdWw+IFxcXG4gIDwvZGQ+IFxcXG48L2RsPic7XG5cbiAgICBRdWVyeUJ1aWxkZXIudGVtcGxhdGVzLnJ1bGUgPSAnXFxcbjxsaSBpZD1cInt7PSBpdC5ydWxlX2lkIH19XCIgY2xhc3M9XCJydWxlLWNvbnRhaW5lclwiPiBcXFxuICA8ZGl2IGNsYXNzPVwicnVsZS1oZWFkZXJcIj4gXFxcbiAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHB1bGwtcmlnaHQgcnVsZS1hY3Rpb25zXCI+IFxcXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLWRhbmdlciByZW1vdmUtcnVsZVwiIGRhdGEtZGVsZXRlPVwicnVsZVwiPiBcXFxuICAgICAgICA8aSBjbGFzcz1cInt7PSBpdC5pY29ucy5yZW1vdmVfcnVsZSB9fVwiPjwvaT4ge3s9IGl0LmxhbmcuZGVsZXRlX3J1bGUgfX0gXFxcbiAgICAgIDwvYnV0dG9uPiBcXFxuICAgIDwvZGl2PiBcXFxuICA8L2Rpdj4gXFxcbiAge3s/IGl0LnNldHRpbmdzLmRpc3BsYXlfZXJyb3JzIH19IFxcXG4gICAgPGRpdiBjbGFzcz1cImVycm9yLWNvbnRhaW5lclwiPjxpIGNsYXNzPVwie3s9IGl0Lmljb25zLmVycm9yIH19XCI+PC9pPjwvZGl2PiBcXFxuICB7ez99fSBcXFxuICA8ZGl2IGNsYXNzPVwicnVsZS1maWx0ZXItY29udGFpbmVyXCI+PC9kaXY+IFxcXG4gIDxkaXYgY2xhc3M9XCJydWxlLW9wZXJhdG9yLWNvbnRhaW5lclwiPjwvZGl2PiBcXFxuICA8ZGl2IGNsYXNzPVwicnVsZS12YWx1ZS1jb250YWluZXJcIj48L2Rpdj4gXFxcbjwvbGk+JztcblxuICAgIFF1ZXJ5QnVpbGRlci50ZW1wbGF0ZXMuZmlsdGVyU2VsZWN0ID0gJ1xcXG57eyB2YXIgb3B0Z3JvdXAgPSBudWxsOyB9fSBcXFxuPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCJ7ez0gaXQucnVsZS5pZCB9fV9maWx0ZXJcIj4gXFxcbiAge3s/IGl0LnNldHRpbmdzLmRpc3BsYXlfZW1wdHlfZmlsdGVyIH19IFxcXG4gICAgPG9wdGlvbiB2YWx1ZT1cIi0xXCI+e3s9IGl0LnNldHRpbmdzLnNlbGVjdF9wbGFjZWhvbGRlciB9fTwvb3B0aW9uPiBcXFxuICB7ez99fSBcXFxuICB7e34gaXQuZmlsdGVyczogZmlsdGVyIH19IFxcXG4gICAge3s/IG9wdGdyb3VwICE9PSBmaWx0ZXIub3B0Z3JvdXAgfX0gXFxcbiAgICAgIHt7PyBvcHRncm91cCAhPT0gbnVsbCB9fTwvb3B0Z3JvdXA+e3s/fX0gXFxcbiAgICAgIHt7PyAob3B0Z3JvdXAgPSBmaWx0ZXIub3B0Z3JvdXApICE9PSBudWxsIH19IFxcXG4gICAgICAgIDxvcHRncm91cCBsYWJlbD1cInt7PSBpdC50cmFuc2xhdGUoaXQuc2V0dGluZ3Mub3B0Z3JvdXBzW29wdGdyb3VwXSkgfX1cIj4gXFxcbiAgICAgIHt7P319IFxcXG4gICAge3s/fX0gXFxcbiAgICA8b3B0aW9uIHZhbHVlPVwie3s9IGZpbHRlci5pZCB9fVwiPnt7PSBpdC50cmFuc2xhdGUoZmlsdGVyLmxhYmVsKSB9fTwvb3B0aW9uPiBcXFxuICB7e359fSBcXFxuICB7ez8gb3B0Z3JvdXAgIT09IG51bGwgfX08L29wdGdyb3VwPnt7P319IFxcXG48L3NlbGVjdD4nO1xuXG4gICAgUXVlcnlCdWlsZGVyLnRlbXBsYXRlcy5vcGVyYXRvclNlbGVjdCA9ICdcXFxue3sgdmFyIG9wdGdyb3VwID0gbnVsbDsgfX0gXFxcbjxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwie3s9IGl0LnJ1bGUuaWQgfX1fb3BlcmF0b3JcIj4gXFxcbiAge3t+IGl0Lm9wZXJhdG9yczogb3BlcmF0b3IgfX0gXFxcbiAgICB7ez8gb3B0Z3JvdXAgIT09IG9wZXJhdG9yLm9wdGdyb3VwIH19IFxcXG4gICAgICB7ez8gb3B0Z3JvdXAgIT09IG51bGwgfX08L29wdGdyb3VwPnt7P319IFxcXG4gICAgICB7ez8gKG9wdGdyb3VwID0gb3BlcmF0b3Iub3B0Z3JvdXApICE9PSBudWxsIH19IFxcXG4gICAgICAgIDxvcHRncm91cCBsYWJlbD1cInt7PSBpdC50cmFuc2xhdGUoaXQuc2V0dGluZ3Mub3B0Z3JvdXBzW29wdGdyb3VwXSkgfX1cIj4gXFxcbiAgICAgIHt7P319IFxcXG4gICAge3s/fX0gXFxcbiAgICA8b3B0aW9uIHZhbHVlPVwie3s9IG9wZXJhdG9yLnR5cGUgfX1cIj57ez0gaXQubGFuZy5vcGVyYXRvcnNbb3BlcmF0b3IudHlwZV0gfHwgb3BlcmF0b3IudHlwZSB9fTwvb3B0aW9uPiBcXFxuICB7e359fSBcXFxuICB7ez8gb3B0Z3JvdXAgIT09IG51bGwgfX08L29wdGdyb3VwPnt7P319IFxcXG48L3NlbGVjdD4nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBncm91cCBIVE1MXG4gICAgICogQHBhcmFtIGdyb3VwX2lkIHtzdHJpbmd9XG4gICAgICogQHBhcmFtIGxldmVsIHtpbnR9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0R3JvdXBUZW1wbGF0ZSA9IGZ1bmN0aW9uIChncm91cF9pZCwgbGV2ZWwpIHtcbiAgICAgICAgdmFyIGggPSB0aGlzLnRlbXBsYXRlcy5ncm91cCh7XG4gICAgICAgICAgICBidWlsZGVyOiB0aGlzLFxuICAgICAgICAgICAgZ3JvdXBfaWQ6IGdyb3VwX2lkLFxuICAgICAgICAgICAgbGV2ZWw6IGxldmVsLFxuICAgICAgICAgICAgY29uZGl0aW9uczogdGhpcy5zZXR0aW5ncy5jb25kaXRpb25zLFxuICAgICAgICAgICAgaWNvbnM6IHRoaXMuaWNvbnMsXG4gICAgICAgICAgICBsYW5nOiB0aGlzLmxhbmcsXG4gICAgICAgICAgICBzZXR0aW5nczogdGhpcy5zZXR0aW5nc1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ2dldEdyb3VwVGVtcGxhdGUnLCBoLCBsZXZlbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcnVsZSBIVE1MXG4gICAgICogQHBhcmFtIHJ1bGVfaWQge3N0cmluZ31cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRSdWxlVGVtcGxhdGUgPSBmdW5jdGlvbiAocnVsZV9pZCkge1xuICAgICAgICB2YXIgaCA9IHRoaXMudGVtcGxhdGVzLnJ1bGUoe1xuICAgICAgICAgICAgYnVpbGRlcjogdGhpcyxcbiAgICAgICAgICAgIHJ1bGVfaWQ6IHJ1bGVfaWQsXG4gICAgICAgICAgICBpY29uczogdGhpcy5pY29ucyxcbiAgICAgICAgICAgIGxhbmc6IHRoaXMubGFuZyxcbiAgICAgICAgICAgIHNldHRpbmdzOiB0aGlzLnNldHRpbmdzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgnZ2V0UnVsZVRlbXBsYXRlJywgaCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcnVsZSBmaWx0ZXIgPHNlbGVjdD4gSFRNTFxuICAgICAqIEBwYXJhbSBydWxlIHtSdWxlfVxuICAgICAqIEBwYXJhbSBmaWx0ZXJzIHthcnJheX1cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgUXVlcnlCdWlsZGVyLnByb3RvdHlwZS5nZXRSdWxlRmlsdGVyU2VsZWN0ID0gZnVuY3Rpb24gKHJ1bGUsIGZpbHRlcnMpIHtcbiAgICAgICAgdmFyIGggPSB0aGlzLnRlbXBsYXRlcy5maWx0ZXJTZWxlY3Qoe1xuICAgICAgICAgICAgYnVpbGRlcjogdGhpcyxcbiAgICAgICAgICAgIHJ1bGU6IHJ1bGUsXG4gICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxuICAgICAgICAgICAgaWNvbnM6IHRoaXMuaWNvbnMsXG4gICAgICAgICAgICBsYW5nOiB0aGlzLmxhbmcsXG4gICAgICAgICAgICBzZXR0aW5nczogdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdGhpcy50cmFuc2xhdGVMYWJlbFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ2dldFJ1bGVGaWx0ZXJTZWxlY3QnLCBoLCBydWxlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBydWxlIG9wZXJhdG9yIDxzZWxlY3Q+IEhUTUxcbiAgICAgKiBAcGFyYW0gcnVsZSB7UnVsZX1cbiAgICAgKiBAcGFyYW0gb3BlcmF0b3JzIHtvYmplY3R9XG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuZ2V0UnVsZU9wZXJhdG9yU2VsZWN0ID0gZnVuY3Rpb24gKHJ1bGUsIG9wZXJhdG9ycykge1xuICAgICAgICB2YXIgaCA9IHRoaXMudGVtcGxhdGVzLm9wZXJhdG9yU2VsZWN0KHtcbiAgICAgICAgICAgIGJ1aWxkZXI6IHRoaXMsXG4gICAgICAgICAgICBydWxlOiBydWxlLFxuICAgICAgICAgICAgb3BlcmF0b3JzOiBvcGVyYXRvcnMsXG4gICAgICAgICAgICBpY29uczogdGhpcy5pY29ucyxcbiAgICAgICAgICAgIGxhbmc6IHRoaXMubGFuZyxcbiAgICAgICAgICAgIHNldHRpbmdzOiB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgICAgdHJhbnNsYXRlOiB0aGlzLnRyYW5zbGF0ZUxhYmVsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgnZ2V0UnVsZU9wZXJhdG9yU2VsZWN0JywgaCwgcnVsZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgcnVsZSB2YWx1ZSBIVE1MXG4gICAgICogQHBhcmFtIHJ1bGUge1J1bGV9XG4gICAgICogQHBhcmFtIGZpbHRlciB7b2JqZWN0fVxuICAgICAqIEBwYXJhbSB2YWx1ZV9pZCB7aW50fVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldFJ1bGVJbnB1dCA9IGZ1bmN0aW9uIChydWxlLCB2YWx1ZV9pZCkge1xuICAgICAgICB2YXIgZmlsdGVyID0gcnVsZS5maWx0ZXI7XG4gICAgICAgIHZhciB2YWxpZGF0aW9uID0gcnVsZS5maWx0ZXIudmFsaWRhdGlvbiB8fCB7fTtcbiAgICAgICAgdmFyIG5hbWUgPSBydWxlLmlkICsgJ192YWx1ZV8nICsgdmFsdWVfaWQ7XG4gICAgICAgIHZhciBjID0gZmlsdGVyLnZlcnRpY2FsID8gJyBjbGFzcz1ibG9jaycgOiAnJztcbiAgICAgICAgdmFyIGggPSAnJztcblxuICAgICAgICBpZiAodHlwZW9mIGZpbHRlci5pbnB1dCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBoID0gZmlsdGVyLmlucHV0LmNhbGwodGhpcywgcnVsZSwgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGZpbHRlci5pbnB1dCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLml0ZXJhdGVPcHRpb25zKGZpbHRlci52YWx1ZXMsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaCArPSAnPGxhYmVsJyArIGMgKyAnPjxpbnB1dCB0eXBlPVwiJyArIGZpbHRlci5pbnB1dCArICdcIiBuYW1lPVwiJyArIG5hbWUgKyAnXCIgdmFsdWU9XCInICsga2V5ICsgJ1wiPiAnICsgdmFsICsgJzwvbGFiZWw+ICc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGggKz0gJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiJyArIG5hbWUgKyAnXCInICsgKGZpbHRlci5tdWx0aXBsZSA/ICcgbXVsdGlwbGUnIDogJycpICsgJz4nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGZpbHRlci5wbGFjZWhvbGRlcl92YWx1ZSArICdcIiBkaXNhYmxlZCBzZWxlY3RlZD4nICsgZmlsdGVyLnBsYWNlaG9sZGVyICsgJzwvb3B0aW9uPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuaXRlcmF0ZU9wdGlvbnMoZmlsdGVyLnZhbHVlcywgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGtleSArICdcIj4nICsgdmFsICsgJzwvb3B0aW9uPiAnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaCArPSAnPC9zZWxlY3Q+JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICAgICAgICAgICAgICAgIGggKz0gJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCInICsgbmFtZSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuc2l6ZSkgaCArPSAnIGNvbHM9XCInICsgZmlsdGVyLnNpemUgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnJvd3MpIGggKz0gJyByb3dzPVwiJyArIGZpbHRlci5yb3dzICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ubWluICE9PSB1bmRlZmluZWQpIGggKz0gJyBtaW5sZW5ndGg9XCInICsgdmFsaWRhdGlvbi5taW4gKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5tYXggIT09IHVuZGVmaW5lZCkgaCArPSAnIG1heGxlbmd0aD1cIicgKyB2YWxpZGF0aW9uLm1heCArICdcIic7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIucGxhY2Vob2xkZXIpIGggKz0gJyBwbGFjZWhvbGRlcj1cIicgKyBmaWx0ZXIucGxhY2Vob2xkZXIgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICBoICs9ICc+PC90ZXh0YXJlYT4nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoUXVlcnlCdWlsZGVyLnR5cGVzW2ZpbHRlci50eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoICs9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwibnVtYmVyXCIgbmFtZT1cIicgKyBuYW1lICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5zdGVwICE9PSB1bmRlZmluZWQpIGggKz0gJyBzdGVwPVwiJyArIHZhbGlkYXRpb24uc3RlcCArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ubWluICE9PSB1bmRlZmluZWQpIGggKz0gJyBtaW49XCInICsgdmFsaWRhdGlvbi5taW4gKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLm1heCAhPT0gdW5kZWZpbmVkKSBoICs9ICcgbWF4PVwiJyArIHZhbGlkYXRpb24ubWF4ICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnBsYWNlaG9sZGVyKSBoICs9ICcgcGxhY2Vob2xkZXI9XCInICsgZmlsdGVyLnBsYWNlaG9sZGVyICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNpemUpIGggKz0gJyBzaXplPVwiJyArIGZpbHRlci5zaXplICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoICs9ICc+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoICs9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCInICsgbmFtZSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5wbGFjZWhvbGRlcikgaCArPSAnIHBsYWNlaG9sZGVyPVwiJyArIGZpbHRlci5wbGFjZWhvbGRlciArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci50eXBlID09PSAnc3RyaW5nJyAmJiB2YWxpZGF0aW9uLm1pbiAhPT0gdW5kZWZpbmVkKSBoICs9ICcgbWlubGVuZ3RoPVwiJyArIHZhbGlkYXRpb24ubWluICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnR5cGUgPT09ICdzdHJpbmcnICYmIHZhbGlkYXRpb24ubWF4ICE9PSB1bmRlZmluZWQpIGggKz0gJyBtYXhsZW5ndGg9XCInICsgdmFsaWRhdGlvbi5tYXggKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuc2l6ZSkgaCArPSAnIHNpemU9XCInICsgZmlsdGVyLnNpemUgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggKz0gJz4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ2dldFJ1bGVJbnB1dCcsIGgsIHJ1bGUsIG5hbWUpO1xuICAgIH07XG5cblxuLy8gTW9kZWwgQ0xBU1Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvKipcbiAgICAgKiBNYWluIG9iamVjdCBzdG9yaW5nIGRhdGEgbW9kZWwgYW5kIGVtaXR0aW5nIGV2ZW50c1xuICAgICAqIC0tLS0tLS0tLVxuICAgICAqIEFjY2VzcyBOb2RlIG9iamVjdCBzdG9yZWQgaW4galF1ZXJ5IG9iamVjdHNcbiAgICAgKiBAcGFyYW0gZWwge2pRdWVyeXxOb2RlfVxuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24gTW9kZWwoZWwpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZGVsLmdldE1vZGVsKGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgICAgIHRoaXMuJCA9ICQodGhpcyk7XG4gICAgfVxuXG4gICAgJC5leHRlbmQoTW9kZWwucHJvdG90eXBlLCB7XG4gICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICB0aGlzLiQudHJpZ2dlckhhbmRsZXIodHlwZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kLm9uLmFwcGx5KHRoaXMuJCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBvZmY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJC5vZmYuYXBwbHkodGhpcy4kLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJC5vbmUuYXBwbHkodGhpcy4kLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBY2Nlc3MgTm9kZSBvYmplY3Qgc3RvcmVkIGluIGpRdWVyeSBvYmplY3RzXG4gICAgICogQHBhcmFtIGVsIHtqUXVlcnl8Tm9kZX1cbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqL1xuICAgIE1vZGVsLmdldE1vZGVsID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVsIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICQoZWwpLmRhdGEoJ3F1ZXJ5QnVpbGRlck1vZGVsJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBEZWZpbmUgTm9kZSBwcm9wZXJ0aWVzIHdpdGggZ2V0dGVyIGFuZCBzZXR0ZXJcbiAgICAgKiBVcGRhdGUgZXZlbnRzIGFyZSBlbWl0dGVkIGluIHRoZSBzZXR0ZXIgdGhyb3VnaCByb290IE1vZGVsIChpZiBhbnkpXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVmaW5lTW9kZWxQcm9wZXJ0aWVzKG9iaiwgZmllbGRzKSB7XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iai5wcm90b3R5cGUsIGZpZWxkLCB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19bZmllbGRdO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gKHRoaXMuX19bZmllbGRdICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLl9fW2ZpZWxkXSA9PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQoe30sIHRoaXMuX19bZmllbGRdKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fW2ZpZWxkXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fW2ZpZWxkXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyaWdnZXIoJ3VwZGF0ZScsIHRoaXMsIGZpZWxkLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4vLyBOb2RlIGFic3RyYWN0IENMQVNTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHZhciBOb2RlID0gZnVuY3Rpb24gKHBhcmVudCwgJGVsKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBOb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOb2RlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19fJywge3ZhbHVlOiB7fX0pO1xuXG4gICAgICAgICRlbC5kYXRhKCdxdWVyeUJ1aWxkZXJNb2RlbCcsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX18ubGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLl9fLmVycm9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fXy5kYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLiRlbCA9ICRlbDtcbiAgICAgICAgdGhpcy5pZCA9ICRlbFswXS5pZDtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIH07XG5cbiAgICBkZWZpbmVNb2RlbFByb3BlcnRpZXMoTm9kZSwgWydsZXZlbCcsICdlcnJvcicsICdkYXRhJywgJ2ZsYWdzJ10pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5vZGUucHJvdG90eXBlLCAncGFyZW50Jywge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fLnBhcmVudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX18ucGFyZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gdmFsdWUgPT09IG51bGwgPyAxIDogdmFsdWUubGV2ZWwgKyAxO1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlID09PSBudWxsID8gbnVsbCA6IHZhbHVlLm1vZGVsO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGlzIE5vZGUgaXMgdGhlIHJvb3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIE5vZGUucHJvdG90eXBlLmlzUm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmxldmVsID09PSAxKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIG5vZGUgcG9zaXRpb24gaW5zaWRlIHBhcmVudFxuICAgICAqIEByZXR1cm4ge2ludH1cbiAgICAgKi9cbiAgICBOb2RlLnByb3RvdHlwZS5nZXRQb3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUm9vdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0Tm9kZVBvcyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgc2VsZlxuICAgICAqL1xuICAgIE5vZGUucHJvdG90eXBlLmRyb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMubW9kZWw7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzUm9vdCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5fcmVtb3ZlTm9kZSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbW9kZWwudHJpZ2dlcignZHJvcCcsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vdmUgaXRzZWxmIGFmdGVyIGFub3RoZXIgTm9kZVxuICAgICAqIEBwYXJhbSB7Tm9kZX1cbiAgICAgKiBAcmV0dXJuIHtOb2RlfSBzZWxmXG4gICAgICovXG4gICAgTm9kZS5wcm90b3R5cGUubW92ZUFmdGVyID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSb290KCkpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9tb3ZlKG5vZGUucGFyZW50LCBub2RlLmdldFBvcygpICsgMSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vdmUgaXRzZWxmIGF0IHRoZSBiZWdpbm5pbmcgb2YgcGFyZW50IG9yIGFub3RoZXIgR3JvdXBcbiAgICAgKiBAcGFyYW0ge0dyb3VwLG9wdGlvbmFsfVxuICAgICAqIEByZXR1cm4ge05vZGV9IHNlbGZcbiAgICAgKi9cbiAgICBOb2RlLnByb3RvdHlwZS5tb3ZlQXRCZWdpbiA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSb290KCkpIHJldHVybjtcblxuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRoaXMucGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW92ZSh0YXJnZXQsIDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIGl0c2VsZiBhdCB0aGUgZW5kIG9mIHBhcmVudCBvciBhbm90aGVyIEdyb3VwXG4gICAgICogQHBhcmFtIHtHcm91cCxvcHRpb25hbH1cbiAgICAgKiBAcmV0dXJuIHtOb2RlfSBzZWxmXG4gICAgICovXG4gICAgTm9kZS5wcm90b3R5cGUubW92ZUF0RW5kID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAodGhpcy5pc1Jvb3QoKSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tb3ZlKHRhcmdldCwgdGFyZ2V0Lmxlbmd0aCgpIC0gMSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1vdmUgaXRzZWxmIGF0IHNwZWNpZmljIHBvc2l0aW9uIG9mIEdyb3VwXG4gICAgICogQHBhcmFtIHtHcm91cH1cbiAgICAgKiBAcGFyYW0ge2ludH1cbiAgICAgKi9cbiAgICBOb2RlLnByb3RvdHlwZS5fbW92ZSA9IGZ1bmN0aW9uIChncm91cCwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuX3JlbW92ZU5vZGUodGhpcyk7XG4gICAgICAgIGdyb3VwLl9hcHBlbmROb2RlKHRoaXMsIGluZGV4LCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwudHJpZ2dlcignbW92ZScsIHRoaXMsIGdyb3VwLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbi8vIEdST1VQIENMQVNTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtHcm91cH1cbiAgICAgKiBAcGFyYW0ge2pRdWVyeX1cbiAgICAgKi9cbiAgICB2YXIgR3JvdXAgPSBmdW5jdGlvbiAocGFyZW50LCAkZWwpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEdyb3VwKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBHcm91cChwYXJlbnQsICRlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBOb2RlLmNhbGwodGhpcywgcGFyZW50LCAkZWwpO1xuXG4gICAgICAgIHRoaXMucnVsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fXy5jb25kaXRpb24gPSBudWxsO1xuICAgIH07XG5cbiAgICBHcm91cC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5vZGUucHJvdG90eXBlKTtcbiAgICBHcm91cC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBHcm91cDtcblxuICAgIGRlZmluZU1vZGVsUHJvcGVydGllcyhHcm91cCwgWydjb25kaXRpb24nXSk7XG5cbiAgICAvKipcbiAgICAgKiBFbXB0eSB0aGUgR3JvdXBcbiAgICAgKi9cbiAgICBHcm91cC5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWFjaCgncmV2ZXJzZScsIGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICBydWxlLmRyb3AoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICBncm91cC5kcm9wKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgc2VsZlxuICAgICAqL1xuICAgIEdyb3VwLnByb3RvdHlwZS5kcm9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVtcHR5KCk7XG4gICAgICAgIE5vZGUucHJvdG90eXBlLmRyb3AuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgY2hpbGRyZW5cbiAgICAgKiBAcmV0dXJuIHtpbnR9XG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVsZXMubGVuZ3RoO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBOb2RlIGF0IHNwZWNpZmllZCBpbmRleFxuICAgICAqIEBwYXJhbSB7Tm9kZX1cbiAgICAgKiBAcGFyYW0ge2ludCxvcHRpb25hbH1cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW4sb3B0aW9uYWx9XG4gICAgICogQHJldHVybiB7Tm9kZX0gdGhlIGluc2VydGVkIG5vZGVcbiAgICAgKi9cbiAgICBHcm91cC5wcm90b3R5cGUuX2FwcGVuZE5vZGUgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgsIHRyaWdnZXIpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucnVsZXMuc3BsaWNlKGluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0cmlnZ2VyICYmIHRoaXMubW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwudHJpZ2dlcignYWRkJywgbm9kZSwgaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIEdyb3VwIGJ5IGpRdWVyeSBlbGVtZW50IGF0IHNwZWNpZmllZCBpbmRleFxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fVxuICAgICAqIEBwYXJhbSB7aW50LG9wdGlvbmFsfVxuICAgICAqIEByZXR1cm4ge0dyb3VwfSB0aGUgaW5zZXJ0ZWQgZ3JvdXBcbiAgICAgKi9cbiAgICBHcm91cC5wcm90b3R5cGUuYWRkR3JvdXAgPSBmdW5jdGlvbiAoJGVsLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBwZW5kTm9kZShuZXcgR3JvdXAodGhpcywgJGVsKSwgaW5kZXgsIHRydWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBSdWxlIGJ5IGpRdWVyeSBlbGVtZW50IGF0IHNwZWNpZmllZCBpbmRleFxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fVxuICAgICAqIEBwYXJhbSB7aW50LG9wdGlvbmFsfVxuICAgICAqIEByZXR1cm4ge1J1bGV9IHRoZSBpbnNlcnRlZCBydWxlXG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiAoJGVsLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBwZW5kTm9kZShuZXcgUnVsZSh0aGlzLCAkZWwpLCBpbmRleCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHNwZWNpZmljIE5vZGVcbiAgICAgKiBAcGFyYW0ge05vZGV9XG4gICAgICogQHJldHVybiB7R3JvdXB9IHNlbGZcbiAgICAgKi9cbiAgICBHcm91cC5wcm90b3R5cGUuX3JlbW92ZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldE5vZGVQb3Mobm9kZSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucnVsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gcG9zaXRpb24gb2YgYSBjaGlsZCBOb2RlXG4gICAgICogQHBhcmFtIHtOb2RlfVxuICAgICAqIEByZXR1cm4ge2ludH1cbiAgICAgKi9cbiAgICBHcm91cC5wcm90b3R5cGUuZ2V0Tm9kZVBvcyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bGVzLmluZGV4T2Yobm9kZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGUgb3ZlciBhbGwgTm9kZXNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW4sb3B0aW9uYWx9IGl0ZXJhdGUgaW4gcmV2ZXJzZSBvcmRlciwgcmVxdWlyZWQgaWYgeW91IGRlbGV0ZSBub2Rlc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIGZvciBSdWxlc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24sb3B0aW9uYWx9IGNhbGxiYWNrIGZvciBHcm91cHNcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIEdyb3VwLnByb3RvdHlwZS5lYWNoID0gZnVuY3Rpb24gKHJldmVyc2UsIGNiUnVsZSwgY2JHcm91cCwgY29udGV4dCkge1xuICAgICAgICBpZiAodHlwZW9mIHJldmVyc2UgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29udGV4dCA9IGNiR3JvdXA7XG4gICAgICAgICAgICBjYkdyb3VwID0gY2JSdWxlO1xuICAgICAgICAgICAgY2JSdWxlID0gcmV2ZXJzZTtcbiAgICAgICAgICAgIHJldmVyc2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0ID0gY29udGV4dCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbnRleHQ7XG5cbiAgICAgICAgdmFyIGkgPSByZXZlcnNlID8gdGhpcy5ydWxlcy5sZW5ndGggLSAxIDogMDtcbiAgICAgICAgdmFyIGwgPSByZXZlcnNlID8gMCA6IHRoaXMucnVsZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGMgPSByZXZlcnNlID8gLTEgOiAxO1xuICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXZlcnNlID8gaSA+PSBsIDogaSA8PSBsO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc3RvcCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAoOyBuZXh0KCk7IGkgKz0gYykge1xuICAgICAgICAgICAgaWYgKHRoaXMucnVsZXNbaV0gaW5zdGFuY2VvZiBHcm91cCkge1xuICAgICAgICAgICAgICAgIGlmIChjYkdyb3VwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IGNiR3JvdXAuY2FsbChjb250ZXh0LCB0aGlzLnJ1bGVzW2ldKSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcCA9IGNiUnVsZS5jYWxsKGNvbnRleHQsIHRoaXMucnVsZXNbaV0pID09PSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0b3ApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhc3RvcDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIGdyb3VwIGNvbnRhaW5zIGEgcGFydGljdWxhciBOb2RlXG4gICAgICogQHBhcmFtIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbixvcHRpb25hbH0gcmVjdXJzaXZlIHNlYXJjaFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKG5vZGUsIGRlZXApIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0Tm9kZVBvcyhub2RlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFkZWVwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGUgbG9vcCB3aWxsIHJldHVybiB3aXRoIGZhbHNlIGFzIHNvb24gYXMgdGhlIE5vZGUgaXMgZm91bmRcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5lYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWdyb3VwLmNvbnRhaW5zKG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbi8vIFJVTEUgQ0xBU1Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0dyb3VwfVxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHZhciBSdWxlID0gZnVuY3Rpb24gKHBhcmVudCwgJGVsKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSdWxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSdWxlKHBhcmVudCwgJGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5vZGUuY2FsbCh0aGlzLCBwYXJlbnQsICRlbCk7XG5cbiAgICAgICAgdGhpcy5fXy5maWx0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9fLm9wZXJhdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fXy5mbGFncyA9IHt9O1xuICAgICAgICB0aGlzLl9fLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBSdWxlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTm9kZS5wcm90b3R5cGUpO1xuICAgIFJ1bGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUnVsZTtcblxuICAgIGRlZmluZU1vZGVsUHJvcGVydGllcyhSdWxlLCBbJ2ZpbHRlcicsICdvcGVyYXRvcicsICd2YWx1ZSddKTtcblxuXG4vLyBFWFBPUlRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBRdWVyeUJ1aWxkZXIuR3JvdXAgPSBHcm91cDtcbiAgICBRdWVyeUJ1aWxkZXIuUnVsZSA9IFJ1bGU7XG5cblxuICAgIHZhciBVdGlscyA9IFF1ZXJ5QnVpbGRlci51dGlscyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSB0byBpdGVyYXRlIG92ZXIgcmFkaW8vY2hlY2tib3gvc2VsZWN0aW9uIG9wdGlvbnMuXG4gICAgICogaXQgYWNjZXB0IHRocmVlIGZvcm1hdHM6IGFycmF5IG9mIHZhbHVlcywgbWFwLCBhcnJheSBvZiAxLWVsZW1lbnQgbWFwc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdHxhcnJheX1cbiAgICAgKiBAcGFyYW0gdHBsIHtjYWxsYWJsZX0gKHRha2VzIGtleSBhbmQgdGV4dClcbiAgICAgKi9cbiAgICBVdGlscy5pdGVyYXRlT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zLCB0cGwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICgkLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9uZS1lbGVtZW50IG1hcHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNQbGFpbk9iamVjdChlbnRyeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChlbnRyeSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHBsKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGJyZWFrIGFmdGVyIGZpcnN0IGVudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cGwoZW50cnksIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdW5vcmRlcmVkIG1hcFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0cGwoa2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIHswfSwgezF9LCAuLi4gaW4gYSBzdHJpbmdcbiAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICogQHBhcmFtIGFyZ3MsLi4uIHttaXhlZH1cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgVXRpbHMuZm10ID0gZnVuY3Rpb24gKHN0ci8qLCBhcmdzKi8pIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgveyhbMC05XSspfS9nLCBmdW5jdGlvbiAobSwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3NbcGFyc2VJbnQoaSldO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhyb3cgYW4gRXJyb3Igb2JqZWN0IHdpdGggY3VzdG9tIG5hbWVcbiAgICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHtzdHJpbmd9XG4gICAgICogQHBhcmFtIGFyZ3MsLi4uIHttaXhlZH1cbiAgICAgKi9cbiAgICBVdGlscy5lcnJvciA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlLyosIGFyZ3MqLykge1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFV0aWxzLmZtdC5hcHBseShudWxsLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG4gICAgICAgIGVyci5uYW1lID0gdHlwZSArICdFcnJvcic7XG4gICAgICAgIGVyci5hcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdHlwZSBvZiBhIHZhbHVlIHRvIGludCBvciBmbG9hdFxuICAgICAqIEBwYXJhbSB2YWx1ZSB7bWl4ZWR9XG4gICAgICogQHBhcmFtIHR5cGUge3N0cmluZ30gJ2ludGVnZXInLCAnZG91YmxlJyBvciBhbnl0aGluZyBlbHNlXG4gICAgICogQHBhcmFtIGJvb2xBc0ludCB7Ym9vbGVhbn0gcmV0dXJuIDAgb3IgMSBmb3IgYm9vbGVhbnNcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cbiAgICAgKi9cbiAgICBVdGlscy5jaGFuZ2VUeXBlID0gZnVuY3Rpb24gKHZhbHVlLCB0eXBlLCBib29sQXNJbnQpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnZG91YmxlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICB2YXIgYm9vbCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScgfHwgdmFsdWUudHJpbSgpID09PSAnMScgfHwgdmFsdWUgPT09IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvb2xBc0ludCA/IChib29sID8gMSA6IDApIDogYm9vbDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVzY2FwZSBzdHJpbmcgbGlrZSBteXNxbF9yZWFsX2VzY2FwZV9zdHJpbmdcbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgVXRpbHMuZXNjYXBlU3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgLnJlcGxhY2UoL1tcXDBcXG5cXHJcXGJcXFxcXFwnXFxcIl0vZywgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnXFwwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnXFxcXDAnO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdcXG4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdcXFxcbic7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1xccic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1xcXFxyJztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnXFxiJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnXFxcXGInO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdcXFxcJyArIHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHVnbGlmeSBjb21wbGlhbnRcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHgxYS9nLCAnXFxcXFonKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXNjYXBlIHZhbHVlIGZvciB1c2UgaW4gcmVnZXhcbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgVXRpbHMuZXNjYXBlUmVnRXhwID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCAnXFxcXCQmJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVzY2FwZSBIVE1MIGVsZW1lbnQgaWRcbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgVXRpbHMuZXNjYXBlRWxlbWVudElkID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAvLyBSZWdleCBiYXNlZCBvbiB0aGF0IHN1Z2dlc3RlZCBieTpcbiAgICAgICAgLy8gaHR0cHM6Ly9sZWFybi5qcXVlcnkuY29tL3VzaW5nLWpxdWVyeS1jb3JlL2ZhcS9ob3ctZG8taS1zZWxlY3QtYW4tZWxlbWVudC1ieS1hbi1pZC10aGF0LWhhcy1jaGFyYWN0ZXJzLXVzZWQtaW4tY3NzLW5vdGF0aW9uL1xuICAgICAgICAvLyAtIGVzY2FwZXMgOiAuIFsgXSAsXG4gICAgICAgIC8vIC0gYXZvaWRzIGVzY2FwaW5nIGFscmVhZHkgZXNjYXBlZCB2YWx1ZXNcbiAgICAgICAgcmV0dXJuIChzdHIpID8gc3RyLnJlcGxhY2UoLyhcXFxcKT8oWzouXFxbXFxdLF0pL2csXG4gICAgICAgICAgICBmdW5jdGlvbiAoJDAsICQxLCAkMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkMSA/ICQwIDogJ1xcXFwnICsgJDI7XG4gICAgICAgICAgICB9KSA6IHN0cjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU29ydCBvYmplY3RzIGJ5IGdyb3VwaW5nIHRoZW0gYnkge2tleX0sIHByZXNlcnZpbmcgaW5pdGlhbCBvcmRlciB3aGVuIHBvc3NpYmxlXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gaXRlbXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnMge29iamVjdFtdfVxuICAgICAqL1xuICAgIFV0aWxzLmdyb3VwU29ydCA9IGZ1bmN0aW9uIChpdGVtcywga2V5KSB7XG4gICAgICAgIHZhciBvcHRncm91cHMgPSBbXTtcbiAgICAgICAgdmFyIG5ld0l0ZW1zID0gW107XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGlkeDtcblxuICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG9wdGdyb3Vwcy5sYXN0SW5kZXhPZihpdGVtW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZHggPSBvcHRncm91cHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gb3B0Z3JvdXBzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3B0Z3JvdXBzLnNwbGljZShpZHgsIDAsIGl0ZW1ba2V5XSk7XG4gICAgICAgICAgICBuZXdJdGVtcy5zcGxpY2UoaWR4LCAwLCBpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zO1xuICAgIH07XG5cblxuICAgICQuZm4ucXVlcnlCdWlsZGVyID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBVdGlscy5lcnJvcignQ29uZmlnJywgJ1VuYWJsZSB0byBpbml0aWFsaXplIG9uIG11bHRpcGxlIHRhcmdldCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEoJ3F1ZXJ5QnVpbGRlcicpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbikgfHwge307XG5cbiAgICAgICAgaWYgKCFkYXRhICYmIG9wdGlvbiA9PSAnZGVzdHJveScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhKCdxdWVyeUJ1aWxkZXInLCBuZXcgUXVlcnlCdWlsZGVyKHRoaXMsIG9wdGlvbnMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFbb3B0aW9uXS5hcHBseShkYXRhLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAkLmZuLnF1ZXJ5QnVpbGRlci5jb25zdHJ1Y3RvciA9IFF1ZXJ5QnVpbGRlcjtcbiAgICAkLmZuLnF1ZXJ5QnVpbGRlci5kZWZhdWx0cyA9IFF1ZXJ5QnVpbGRlci5kZWZhdWx0cztcbiAgICAkLmZuLnF1ZXJ5QnVpbGRlci5leHRlbmQgPSBRdWVyeUJ1aWxkZXIuZXh0ZW5kO1xuICAgICQuZm4ucXVlcnlCdWlsZGVyLmRlZmluZSA9IFF1ZXJ5QnVpbGRlci5kZWZpbmU7XG4gICAgJC5mbi5xdWVyeUJ1aWxkZXIucmVnaW9uYWwgPSBRdWVyeUJ1aWxkZXIucmVnaW9uYWw7XG5cblxuICAgIC8qIVxuICAgICAqIGpRdWVyeSBRdWVyeUJ1aWxkZXIgQXdlc29tZSBCb290c3RyYXAgQ2hlY2tib3hcbiAgICAgKiBBcHBsaWVzIEF3ZXNvbWUgQm9vdHN0cmFwIENoZWNrYm94IGZvciBjaGVja2JveCBhbmQgcmFkaW8gaW5wdXRzLlxuICAgICAqL1xuXG4gICAgUXVlcnlCdWlsZGVyLmRlZmluZSgnYnQtY2hlY2tib3gnLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5mb250ID09ICdnbHlwaGljb25zJykge1xuICAgICAgICAgICAgdmFyIGluamVjdENTUyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICBpbmplY3RDU1MuaW5uZXJIVE1MID0gJ1xcXG4uY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCArIGxhYmVsOmFmdGVyIHsgXFxcbiAgICBmb250LWZhbWlseTogXCJHbHlwaGljb25zIEhhbGZsaW5nc1wiOyBcXFxuICAgIGNvbnRlbnQ6IFwiXFxcXGUwMTNcIjsgXFxcbn0gXFxcbi5jaGVja2JveCBsYWJlbDphZnRlciB7IFxcXG4gICAgcGFkZGluZy1sZWZ0OiA0cHg7IFxcXG4gICAgcGFkZGluZy10b3A6IDJweDsgXFxcbiAgICBmb250LXNpemU6IDlweDsgXFxcbn0nO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbmplY3RDU1MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbignZ2V0UnVsZUlucHV0LmZpbHRlcicsIGZ1bmN0aW9uIChoLCBydWxlLCBuYW1lKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gcnVsZS5maWx0ZXI7XG5cbiAgICAgICAgICAgIGlmICgoZmlsdGVyLmlucHV0ID09PSAncmFkaW8nIHx8IGZpbHRlci5pbnB1dCA9PT0gJ2NoZWNrYm94JykgJiYgIWZpbHRlci5wbHVnaW4pIHtcbiAgICAgICAgICAgICAgICBoLnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbHRlci5jb2xvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNvbG9ycyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jb2xvcnMuX2RlZl8gPSBmaWx0ZXIuY29sb3I7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gZmlsdGVyLnZlcnRpY2FsID8gJyBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIicgOiAnJztcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgICAgICAgICBVdGlscy5pdGVyYXRlT3B0aW9ucyhmaWx0ZXIudmFsdWVzLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gZmlsdGVyLmNvbG9yc1trZXldIHx8IGZpbHRlci5jb2xvcnMuX2RlZl8gfHwgb3B0aW9ucy5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gbmFtZSArICdfJyArIChpKyspO1xuXG4gICAgICAgICAgICAgICAgICAgIGgudmFsdWUgKz0gJ1xcXG48ZGl2JyArIHN0eWxlICsgJyBjbGFzcz1cIicgKyBmaWx0ZXIuaW5wdXQgKyAnICcgKyBmaWx0ZXIuaW5wdXQgKyAnLScgKyBjb2xvciArICdcIj4gXFxcbiAgPGlucHV0IHR5cGU9XCInICsgZmlsdGVyLmlucHV0ICsgJ1wiIG5hbWU9XCInICsgbmFtZSArICdcIiBpZD1cIicgKyBpZCArICdcIiB2YWx1ZT1cIicgKyBrZXkgKyAnXCI+IFxcXG4gIDxsYWJlbCBmb3I9XCInICsgaWQgKyAnXCI+JyArIHZhbCArICc8L2xhYmVsPiBcXFxuPC9kaXY+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwge1xuICAgICAgICBmb250OiAnZ2x5cGhpY29ucycsXG4gICAgICAgIGNvbG9yOiAnZGVmYXVsdCdcbiAgICB9KTtcblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciBCb290c3RyYXAgU2VsZWN0cGlja2VyXG4gICAgICogQXBwbGllcyBCb290c3RyYXAgU2VsZWN0IG9uIGZpbHRlcnMgYW5kIG9wZXJhdG9ycyBjb21iby1ib3hlcy5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEB0aHJvd3MgQ29uZmlnRXJyb3JcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuZGVmaW5lKCdidC1zZWxlY3RwaWNrZXInLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAoISQuZm4uc2VsZWN0cGlja2VyIHx8ICEkLmZuLnNlbGVjdHBpY2tlci5Db25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ01pc3NpbmdMaWJyYXJ5JywgJ0Jvb3RzdHJhcCBTZWxlY3QgaXMgcmVxdWlyZWQgdG8gdXNlIFwiYnQtc2VsZWN0cGlja2VyXCIgcGx1Z2luLiBHZXQgaXQgaGVyZTogaHR0cDovL3NpbHZpb21vcmV0by5naXRodWIuaW8vYm9vdHN0cmFwLXNlbGVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdCBzZWxlY3RwaWNrZXJcbiAgICAgICAgdGhpcy5vbignYWZ0ZXJDcmVhdGVSdWxlRmlsdGVycycsIGZ1bmN0aW9uIChlLCBydWxlKSB7XG4gICAgICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2ZpbHRlcikucmVtb3ZlQ2xhc3MoJ2Zvcm0tY29udHJvbCcpLnNlbGVjdHBpY2tlcihvcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignYWZ0ZXJDcmVhdGVSdWxlT3BlcmF0b3JzJywgZnVuY3Rpb24gKGUsIHJ1bGUpIHtcbiAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfb3BlcmF0b3IpLnJlbW92ZUNsYXNzKCdmb3JtLWNvbnRyb2wnKS5zZWxlY3RwaWNrZXIob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBzZWxlY3RwaWNrZXIgb24gY2hhbmdlXG4gICAgICAgIHRoaXMub24oJ2FmdGVyVXBkYXRlUnVsZUZpbHRlcicsIGZ1bmN0aW9uIChlLCBydWxlKSB7XG4gICAgICAgICAgICBydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2ZpbHRlcikuc2VsZWN0cGlja2VyKCdyZW5kZXInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignYWZ0ZXJVcGRhdGVSdWxlT3BlcmF0b3InLCBmdW5jdGlvbiAoZSwgcnVsZSkge1xuICAgICAgICAgICAgcnVsZS4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9vcGVyYXRvcikuc2VsZWN0cGlja2VyKCdyZW5kZXInKTtcbiAgICAgICAgfSk7XG4gICAgfSwge1xuICAgICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgICAgc3R5bGU6ICdidG4taW52ZXJzZSBidG4teHMnLFxuICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICBzaG93SWNvbjogZmFsc2VcbiAgICB9KTtcblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciBCb290c3RyYXAgVG9vbHRpcCBlcnJvcnNcbiAgICAgKiBBcHBsaWVzIEJvb3RzdHJhcCBUb29sdGlwcyBvbiB2YWxpZGF0aW9uIGVycm9yIG1lc3NhZ2VzLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQHRocm93cyBDb25maWdFcnJvclxuICAgICAqL1xuICAgIFF1ZXJ5QnVpbGRlci5kZWZpbmUoJ2J0LXRvb2x0aXAtZXJyb3JzJywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCEkLmZuLnRvb2x0aXAgfHwgISQuZm4udG9vbHRpcC5Db25zdHJ1Y3RvciB8fCAhJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yLnByb3RvdHlwZS5maXhUaXRsZSkge1xuICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ01pc3NpbmdMaWJyYXJ5JywgJ0Jvb3RzdHJhcCBUb29sdGlwIGlzIHJlcXVpcmVkIHRvIHVzZSBcImJ0LXRvb2x0aXAtZXJyb3JzXCIgcGx1Z2luLiBHZXQgaXQgaGVyZTogaHR0cDovL2dldGJvb3RzdHJhcC5jb20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBhZGQgQlQgVG9vbHRpcCBkYXRhXG4gICAgICAgIHRoaXMub24oJ2dldFJ1bGVUZW1wbGF0ZS5maWx0ZXIgZ2V0R3JvdXBUZW1wbGF0ZS5maWx0ZXInLCBmdW5jdGlvbiAoaCkge1xuICAgICAgICAgICAgdmFyICRoID0gJChoLnZhbHVlKTtcbiAgICAgICAgICAgICRoLmZpbmQoU2VsZWN0b3JzLmVycm9yX2NvbnRhaW5lcikuYXR0cignZGF0YS10b2dnbGUnLCAndG9vbHRpcCcpO1xuICAgICAgICAgICAgaC52YWx1ZSA9ICRoLnByb3AoJ291dGVySFRNTCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpbml0L3JlZnJlc2ggdG9vbHRpcCB3aGVuIHRpdGxlIGNoYW5nZXNcbiAgICAgICAgdGhpcy5tb2RlbC5vbigndXBkYXRlJywgZnVuY3Rpb24gKGUsIG5vZGUsIGZpZWxkKSB7XG4gICAgICAgICAgICBpZiAoZmllbGQgPT0gJ2Vycm9yJyAmJiBzZWxmLnNldHRpbmdzLmRpc3BsYXlfZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgbm9kZS4kZWwuZmluZChTZWxlY3RvcnMuZXJyb3JfY29udGFpbmVyKS5lcSgwKVxuICAgICAgICAgICAgICAgICAgICAudG9vbHRpcChvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAudG9vbHRpcCgnaGlkZScpXG4gICAgICAgICAgICAgICAgICAgIC50b29sdGlwKCdmaXhUaXRsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCB7XG4gICAgICAgIHBsYWNlbWVudDogJ3JpZ2h0J1xuICAgIH0pO1xuXG5cbiAgICAvKiFcbiAgICAgKiBqUXVlcnkgUXVlcnlCdWlsZGVyIENoYW5nZSBGaWx0ZXJzXG4gICAgICogQWxsb3dzIHRvIGNoYW5nZSBhdmFpbGFibGUgZmlsdGVycyBhZnRlciBwbHVnaW4gaW5pdGlhbGl6YXRpb24uXG4gICAgICovXG5cbiAgICBRdWVyeUJ1aWxkZXIuZXh0ZW5kKHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoYW5nZSB0aGUgZmlsdGVycyBvZiB0aGUgYnVpbGRlclxuICAgICAgICAgKiBAdGhyb3dzIENoYW5nZUZpbHRlckVycm9yXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbixvcHRpb25hbH0gZGVsZXRlIHJ1bGVzIHVzaW5nIG9sZCBmaWx0ZXJzXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0W119IG5ldyBmaWx0ZXJzXG4gICAgICAgICAqL1xuICAgICAgICBzZXRGaWx0ZXJzOiBmdW5jdGlvbiAoZGVsZXRlX29ycGhhbnMsIGZpbHRlcnMpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKGZpbHRlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSBkZWxldGVfb3JwaGFucztcbiAgICAgICAgICAgICAgICBkZWxldGVfb3JwaGFucyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaWx0ZXJzID0gdGhpcy5jaGVja0ZpbHRlcnMoZmlsdGVycyk7XG4gICAgICAgICAgICBmaWx0ZXJzID0gdGhpcy5jaGFuZ2UoJ3NldEZpbHRlcnMnLCBmaWx0ZXJzKTtcblxuICAgICAgICAgICAgdmFyIGZpbHRlcnNJZHMgPSBmaWx0ZXJzLm1hcChmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlci5pZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjaGVjayBmb3Igb3JwaGFuc1xuICAgICAgICAgICAgaWYgKCFkZWxldGVfb3JwaGFucykge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja09ycGhhbnMobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmVhY2goXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmZpbHRlciAmJiBmaWx0ZXJzSWRzLmluZGV4T2YocnVsZS5maWx0ZXIuaWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignQ2hhbmdlRmlsdGVyJywgJ0EgcnVsZSBpcyB1c2luZyBmaWx0ZXIgXCJ7MH1cIicsIHJ1bGUuZmlsdGVyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tPcnBoYW5zXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSh0aGlzLm1vZGVsLnJvb3QpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVwbGFjZSBmaWx0ZXJzXG4gICAgICAgICAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBvbiBleGlzdGluZyBET01cbiAgICAgICAgICAgIChmdW5jdGlvbiB1cGRhdGVCdWlsZGVyKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLmVhY2godHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmZpbHRlciAmJiBmaWx0ZXJzSWRzLmluZGV4T2YocnVsZS5maWx0ZXIuaWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuZHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVSdWxlRmlsdGVycyhydWxlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfZmlsdGVyKS52YWwocnVsZS5maWx0ZXIgPyBydWxlLmZpbHRlci5pZCA6ICctMScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdWlsZGVyXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0odGhpcy5tb2RlbC5yb290KSk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBwbHVnaW5zXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5wbHVnaW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucGx1Z2luc1sndW5pcXVlLWZpbHRlciddKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGlzYWJsZWRGaWx0ZXJzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnBsdWdpbnNbJ2J0LXNlbGVjdHBpY2tlciddKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfZmlsdGVyKS5zZWxlY3RwaWNrZXIoJ3JlbmRlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGRlZmF1bHRfZmlsdGVyIGlmIGRvZXMgbm90IGV4aXN0IGFueW1vcmVcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRlZmF1bHRfZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXJCeUlkKHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9maWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmRlZmF1bHRfZmlsdGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJTZXRGaWx0ZXJzJywgZmlsdGVycyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgYSBuZXcgZmlsdGVyIHRvIHRoZSBidWlsZGVyXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fG9iamVjdFtdfSB0aGUgbmV3IGZpbHRlclxuICAgICAgICAgKiBAcGFyYW0ge21peGVkLG9wdGlvbmFsfSBudW1lcmljIGluZGV4IG9yICcjc3RhcnQnIG9yICcjZW5kJ1xuICAgICAgICAgKi9cbiAgICAgICAgYWRkRmlsdGVyOiBmdW5jdGlvbiAobmV3X2ZpbHRlcnMsIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA9PSAnI2VuZCcpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZmlsdGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwb3NpdGlvbiA9PSAnI3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEkLmlzQXJyYXkobmV3X2ZpbHRlcnMpKSB7XG4gICAgICAgICAgICAgICAgbmV3X2ZpbHRlcnMgPSBbbmV3X2ZpbHRlcnNdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmlsdGVycyA9ICQuZXh0ZW5kKHRydWUsIFtdLCB0aGlzLmZpbHRlcnMpO1xuXG4gICAgICAgICAgICAvLyBudW1lcmljIHBvc2l0aW9uXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQocG9zaXRpb24pID09IHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShmaWx0ZXJzLCBbcG9zaXRpb24sIDBdLmNvbmNhdChuZXdfZmlsdGVycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgZmlsdGVyIGJ5IGl0cyBpZFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnMuc29tZShmdW5jdGlvbiAoZmlsdGVyLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pZCA9PSBwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KGZpbHRlcnMsIFtwb3NpdGlvbiwgMF0uY29uY2F0KG5ld19maWx0ZXJzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRzIHRvIGVuZCBvZiBsaXN0XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGZpbHRlcnMsIG5ld19maWx0ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RmlsdGVycyhmaWx0ZXJzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhIGZpbHRlciBmcm9tIHRoZSBidWlsZGVyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSB0aGUgZmlsdGVyIGlkXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbixvcHRpb25hbH0gZGVsZXRlIHJ1bGVzIHVzaW5nIG9sZCBmaWx0ZXJzXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmVGaWx0ZXI6IGZ1bmN0aW9uIChmaWx0ZXJfaWRzLCBkZWxldGVfb3JwaGFucykge1xuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5maWx0ZXJzKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyX2lkcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfaWRzID0gW2ZpbHRlcl9pZHNdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaWx0ZXJzID0gZmlsdGVycy5maWx0ZXIoZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJfaWRzLmluZGV4T2YoZmlsdGVyLmlkKSA9PT0gLTE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRGaWx0ZXJzKGRlbGV0ZV9vcnBoYW5zLCBmaWx0ZXJzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvKiFcbiAgICAgKiBqUXVlcnkgUXVlcnlCdWlsZGVyIEZpbHRlciBEZXNjcmlwdGlvblxuICAgICAqIFByb3ZpZGVzIHRocmVlIHdheXMgdG8gZGlzcGxheSBhIGRlc2NyaXB0aW9uIGFib3V0IGEgZmlsdGVyOiBpbmxpbmUsIEJvb3RzcmFwIFBvcG92ZXIgb3IgQm9vdGJveC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEB0aHJvd3MgQ29uZmlnRXJyb3JcbiAgICAgKi9cbiAgICBRdWVyeUJ1aWxkZXIuZGVmaW5lKCdmaWx0ZXItZGVzY3JpcHRpb24nLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAvKipcbiAgICAgICAgICogSU5MSU5FXG4gICAgICAgICAqL1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgdGhpcy5vbignYWZ0ZXJVcGRhdGVSdWxlRmlsdGVyJywgZnVuY3Rpb24gKGUsIHJ1bGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHAgPSBydWxlLiRlbC5maW5kKCdwLmZpbHRlci1kZXNjcmlwdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFydWxlLmZpbHRlciB8fCAhcnVsZS5maWx0ZXIuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgJHAuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHAgPSAkKCc8cCBjbGFzcz1cImZpbHRlci1kZXNjcmlwdGlvblwiPjwvcD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRwLmFwcGVuZFRvKHJ1bGUuJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRwLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRwLmh0bWwoJzxpIGNsYXNzPVwiJyArIG9wdGlvbnMuaWNvbiArICdcIj48L2k+ICcgKyBydWxlLmZpbHRlci5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBPUE9WRVJcbiAgICAgICAgICovXG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMubW9kZSA9PT0gJ3BvcG92ZXInKSB7XG4gICAgICAgICAgICBpZiAoISQuZm4ucG9wb3ZlciB8fCAhJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yIHx8ICEkLmZuLnBvcG92ZXIuQ29uc3RydWN0b3IucHJvdG90eXBlLmZpeFRpdGxlKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ01pc3NpbmdMaWJyYXJ5JywgJ0Jvb3RzdHJhcCBQb3BvdmVyIGlzIHJlcXVpcmVkIHRvIHVzZSBcImZpbHRlci1kZXNjcmlwdGlvblwiIHBsdWdpbi4gR2V0IGl0IGhlcmU6IGh0dHA6Ly9nZXRib290c3RyYXAuY29tJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub24oJ2FmdGVyVXBkYXRlUnVsZUZpbHRlcicsIGZ1bmN0aW9uIChlLCBydWxlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRiID0gcnVsZS4kZWwuZmluZCgnYnV0dG9uLmZpbHRlci1kZXNjcmlwdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFydWxlLmZpbHRlciB8fCAhcnVsZS5maWx0ZXIuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgJGIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkYi5kYXRhKCdicy5wb3BvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRiLnBvcG92ZXIoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRiLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGIgPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLWluZm8gZmlsdGVyLWRlc2NyaXB0aW9uXCIgZGF0YS10b2dnbGU9XCJwb3BvdmVyXCI+PGkgY2xhc3M9XCInICsgb3B0aW9ucy5pY29uICsgJ1wiPjwvaT48L2J1dHRvbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRiLnByZXBlbmRUbyhydWxlLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2FjdGlvbnMpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGIucG9wb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRiLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYi5wb3BvdmVyKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRiLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRiLmRhdGEoJ2JzLnBvcG92ZXInKS5vcHRpb25zLmNvbnRlbnQgPSBydWxlLmZpbHRlci5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGIuYXR0cignYXJpYS1kZXNjcmliZWRieScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkYi5wb3BvdmVyKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQk9PVEJPWFxuICAgICAgICAgKi9cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5tb2RlID09PSAnYm9vdGJveCcpIHtcbiAgICAgICAgICAgIGlmICghKCdib290Ym94JyBpbiB3aW5kb3cpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ01pc3NpbmdMaWJyYXJ5JywgJ0Jvb3Rib3ggaXMgcmVxdWlyZWQgdG8gdXNlIFwiZmlsdGVyLWRlc2NyaXB0aW9uXCIgcGx1Z2luLiBHZXQgaXQgaGVyZTogaHR0cDovL2Jvb3Rib3hqcy5jb20nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbignYWZ0ZXJVcGRhdGVSdWxlRmlsdGVyJywgZnVuY3Rpb24gKGUsIHJ1bGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGIgPSBydWxlLiRlbC5maW5kKCdidXR0b24uZmlsdGVyLWRlc2NyaXB0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJ1bGUuZmlsdGVyIHx8ICFydWxlLmZpbHRlci5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAkYi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJGIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkYiA9ICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4taW5mbyBmaWx0ZXItZGVzY3JpcHRpb25cIiBkYXRhLXRvZ2dsZT1cImJvb3Rib3hcIj48aSBjbGFzcz1cIicgKyBvcHRpb25zLmljb24gKyAnXCI+PC9pPjwvYnV0dG9uPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGIucHJlcGVuZFRvKHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfYWN0aW9ucykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vdGJveC5hbGVydCgkYi5kYXRhKCdkZXNjcmlwdGlvbicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJGIuZGF0YSgnZGVzY3JpcHRpb24nLCBydWxlLmZpbHRlci5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGljb246ICdnbHlwaGljb24gZ2x5cGhpY29uLWluZm8tc2lnbicsXG4gICAgICAgIG1vZGU6ICdwb3BvdmVyJ1xuICAgIH0pO1xuXG5cbiAgICAvKiFcbiAgICAgKiBqUXVlcnkgUXVlcnlCdWlsZGVyIEludmVydFxuICAgICAqIEFsbG93cyB0byBpbnZlcnQgYSBydWxlIG9wZXJhdG9yLCBhIGdyb3VwIGNvbmRpdGlvbiBvciB0aGUgZW50aXJlIGJ1aWxkZXIuXG4gICAgICovXG5cbiAgICBRdWVyeUJ1aWxkZXIuZGVmYXVsdHMoe1xuICAgICAgICBvcGVyYXRvck9wcG9zaXRlczoge1xuICAgICAgICAgICAgJ2VxdWFsJzogJ25vdF9lcXVhbCcsXG4gICAgICAgICAgICAnbm90X2VxdWFsJzogJ2VxdWFsJyxcbiAgICAgICAgICAgICdpbic6ICdub3RfaW4nLFxuICAgICAgICAgICAgJ25vdF9pbic6ICdpbicsXG4gICAgICAgICAgICAnbGVzcyc6ICdncmVhdGVyX29yX2VxdWFsJyxcbiAgICAgICAgICAgICdsZXNzX29yX2VxdWFsJzogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgJ2dyZWF0ZXInOiAnbGVzc19vcl9lcXVhbCcsXG4gICAgICAgICAgICAnZ3JlYXRlcl9vcl9lcXVhbCc6ICdsZXNzJyxcbiAgICAgICAgICAgICdiZXR3ZWVuJzogJ25vdF9iZXR3ZWVuJyxcbiAgICAgICAgICAgICdub3RfYmV0d2Vlbic6ICdiZXR3ZWVuJyxcbiAgICAgICAgICAgICdiZWdpbnNfd2l0aCc6ICdub3RfYmVnaW5zX3dpdGgnLFxuICAgICAgICAgICAgJ25vdF9iZWdpbnNfd2l0aCc6ICdiZWdpbnNfd2l0aCcsXG4gICAgICAgICAgICAnY29udGFpbnMnOiAnbm90X2NvbnRhaW5zJyxcbiAgICAgICAgICAgICdub3RfY29udGFpbnMnOiAnY29udGFpbnMnLFxuICAgICAgICAgICAgJ2VuZHNfd2l0aCc6ICdub3RfZW5kc193aXRoJyxcbiAgICAgICAgICAgICdub3RfZW5kc193aXRoJzogJ2VuZHNfd2l0aCcsXG4gICAgICAgICAgICAnaXNfZW1wdHknOiAnaXNfbm90X2VtcHR5JyxcbiAgICAgICAgICAgICdpc19ub3RfZW1wdHknOiAnaXNfZW1wdHknLFxuICAgICAgICAgICAgJ2lzX251bGwnOiAnaXNfbm90X251bGwnLFxuICAgICAgICAgICAgJ2lzX25vdF9udWxsJzogJ2lzX251bGwnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29uZGl0aW9uT3Bwb3NpdGVzOiB7XG4gICAgICAgICAgICAnQU5EJzogJ09SJyxcbiAgICAgICAgICAgICdPUic6ICdBTkQnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIFF1ZXJ5QnVpbGRlci5kZWZpbmUoJ2ludmVydCcsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmluZCBldmVudHNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub24oJ2FmdGVySW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuJGVsLm9uKCdjbGljay5xdWVyeUJ1aWxkZXInLCAnW2RhdGEtaW52ZXJ0PWdyb3VwXScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGdyb3VwID0gJCh0aGlzKS5jbG9zZXN0KFNlbGVjdG9ycy5ncm91cF9jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHNlbGYuaW52ZXJ0KE1vZGVsKCRncm91cCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc3BsYXlfcnVsZXNfYnV0dG9uICYmIG9wdGlvbnMuaW52ZXJ0X3J1bGVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWwub24oJ2NsaWNrLnF1ZXJ5QnVpbGRlcicsICdbZGF0YS1pbnZlcnQ9cnVsZV0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkcnVsZSA9ICQodGhpcykuY2xvc2VzdChTZWxlY3RvcnMucnVsZV9jb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmludmVydChNb2RlbCgkcnVsZSksIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTW9kaWZ5IHRlbXBsYXRlc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbignZ2V0R3JvdXBUZW1wbGF0ZS5maWx0ZXInLCBmdW5jdGlvbiAoaCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIHZhciAkaCA9ICQoaC52YWx1ZSk7XG4gICAgICAgICAgICAkaC5maW5kKFNlbGVjdG9ycy5jb25kaXRpb25fY29udGFpbmVyKS5hZnRlcignPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0XCIgZGF0YS1pbnZlcnQ9XCJncm91cFwiPjxpIGNsYXNzPVwiJyArIG9wdGlvbnMuaWNvbiArICdcIj48L2k+ICcgKyBzZWxmLmxhbmcuaW52ZXJ0ICsgJzwvYnV0dG9uPicpO1xuICAgICAgICAgICAgaC52YWx1ZSA9ICRoLnByb3AoJ291dGVySFRNTCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5kaXNwbGF5X3J1bGVzX2J1dHRvbiAmJiBvcHRpb25zLmludmVydF9ydWxlcykge1xuICAgICAgICAgICAgdGhpcy5vbignZ2V0UnVsZVRlbXBsYXRlLmZpbHRlcicsIGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRoID0gJChoLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAkaC5maW5kKFNlbGVjdG9ycy5ydWxlX2FjdGlvbnMpLnByZXBlbmQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tZGVmYXVsdFwiIGRhdGEtaW52ZXJ0PVwicnVsZVwiPjxpIGNsYXNzPVwiJyArIG9wdGlvbnMuaWNvbiArICdcIj48L2k+ICcgKyBzZWxmLmxhbmcuaW52ZXJ0ICsgJzwvYnV0dG9uPicpO1xuICAgICAgICAgICAgICAgIGgudmFsdWUgPSAkaC5wcm9wKCdvdXRlckhUTUwnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBpY29uOiAnZ2x5cGhpY29uIGdseXBoaWNvbi1yYW5kb20nLFxuICAgICAgICByZWN1cnNpdmU6IHRydWUsXG4gICAgICAgIGludmVydF9ydWxlczogdHJ1ZSxcbiAgICAgICAgZGlzcGxheV9ydWxlc19idXR0b246IGZhbHNlLFxuICAgICAgICBzaWxlbnRfZmFpbDogZmFsc2VcbiAgICB9KTtcblxuICAgIFF1ZXJ5QnVpbGRlci5leHRlbmQoe1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52ZXJ0IGEgR3JvdXAsIGEgUnVsZSBvciB0aGUgd2hvbGUgYnVpbGRlclxuICAgICAgICAgKiBAdGhyb3dzIEludmVydENvbmRpdGlvbkVycm9yLCBJbnZlcnRPcGVyYXRvckVycm9yXG4gICAgICAgICAqIEBwYXJhbSB7Tm9kZSxvcHRpb25hbH1cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3Qsb3B0aW9uYWx9XG4gICAgICAgICAqL1xuICAgICAgICBpbnZlcnQ6IGZ1bmN0aW9uIChub2RlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTm9kZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwucm9vdCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBub2RlO1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1vZGVsLnJvb3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPSAnb2JqZWN0Jykgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVjdXJzaXZlID09PSB1bmRlZmluZWQpIG9wdGlvbnMucmVjdXJzaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmludmVydF9ydWxlcyA9PT0gdW5kZWZpbmVkKSBvcHRpb25zLmludmVydF9ydWxlcyA9IHRydWU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaWxlbnRfZmFpbCA9PT0gdW5kZWZpbmVkKSBvcHRpb25zLnNpbGVudF9mYWlsID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy50cmlnZ2VyID09PSB1bmRlZmluZWQpIG9wdGlvbnMudHJpZ2dlciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgR3JvdXApIHtcbiAgICAgICAgICAgICAgICAvLyBpbnZlcnQgZ3JvdXAgY29uZGl0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29uZGl0aW9uT3Bwb3NpdGVzW25vZGUuY29uZGl0aW9uXSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbmRpdGlvbiA9IHRoaXMuc2V0dGluZ3MuY29uZGl0aW9uT3Bwb3NpdGVzW25vZGUuY29uZGl0aW9uXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIW9wdGlvbnMuc2lsZW50X2ZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ0ludmVydENvbmRpdGlvbicsICdVbmtub3duIGludmVyc2Ugb2YgY29uZGl0aW9uIFwiezB9XCInLCBub2RlLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlIGNhbGxcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5yZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBPcHRzID0gJC5leHRlbmQoe30sIG9wdGlvbnMsIHt0cmlnZ2VyOiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmludmVydF9ydWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW52ZXJ0KHJ1bGUsIHRlbXBPcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludmVydChncm91cCwgdGVtcE9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgUnVsZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm9wZXJhdG9yICYmICFub2RlLmZpbHRlci5ub19pbnZlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW52ZXJ0IHJ1bGUgb3BlcmF0b3JcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mub3BlcmF0b3JPcHBvc2l0ZXNbbm9kZS5vcGVyYXRvci50eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGludmVydCA9IHRoaXMuc2V0dGluZ3Mub3BlcmF0b3JPcHBvc2l0ZXNbbm9kZS5vcGVyYXRvci50eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbnZlcnQgaXMgXCJhdXRob3JpemVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbm9kZS5maWx0ZXIub3BlcmF0b3JzIHx8IG5vZGUuZmlsdGVyLm9wZXJhdG9ycy5pbmRleE9mKGludmVydCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm9wZXJhdG9yID0gdGhpcy5nZXRPcGVyYXRvckJ5VHlwZShpbnZlcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFvcHRpb25zLnNpbGVudF9mYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignSW52ZXJ0T3BlcmF0b3InLCAnVW5rbm93biBpbnZlcnNlIG9mIG9wZXJhdG9yIFwiezB9XCInLCBub2RlLm9wZXJhdG9yLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlckludmVydCcsIG5vZGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8qIVxuICAgICAqIGpRdWVyeSBRdWVyeUJ1aWxkZXIgTW9uZ29EQiBTdXBwb3J0XG4gICAgICogQWxsb3dzIHRvIGV4cG9ydCBydWxlcyBhcyBhIE1vbmdvREIgZmluZCBvYmplY3QgYXMgd2VsbCBhcyBwb3B1bGF0aW5nIHRoZSBidWlsZGVyIGZyb20gYSBNb25nb0RCIG9iamVjdC5cbiAgICAgKi9cblxuLy8gREVGQVVMVCBDT05GSUdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBRdWVyeUJ1aWxkZXIuZGVmYXVsdHMoe1xuICAgICAgICBtb25nb09wZXJhdG9yczoge1xuICAgICAgICAgICAgZXF1YWw6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZbMF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90X2VxdWFsOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRuZSc6IHZbMF19O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRpbic6IHZ9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdF9pbjogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckbmluJzogdn07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVzczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckbHQnOiB2WzBdfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZXNzX29yX2VxdWFsOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRsdGUnOiB2WzBdfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmVhdGVyOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRndCc6IHZbMF19O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyZWF0ZXJfb3JfZXF1YWw6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJGd0ZSc6IHZbMF19O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJldHdlZW46IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJGd0ZSc6IHZbMF0sICckbHRlJzogdlsxXX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90X2JldHdlZW46IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJGx0JzogdlswXSwgJyRndCc6IHZbMV19O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZ2luc193aXRoOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRyZWdleCc6ICdeJyArIFV0aWxzLmVzY2FwZVJlZ0V4cCh2WzBdKX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90X2JlZ2luc193aXRoOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRyZWdleCc6ICdeKD8hJyArIFV0aWxzLmVzY2FwZVJlZ0V4cCh2WzBdKSArICcpJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJHJlZ2V4JzogVXRpbHMuZXNjYXBlUmVnRXhwKHZbMF0pfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RfY29udGFpbnM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsnJHJlZ2V4JzogJ14oKD8hJyArIFV0aWxzLmVzY2FwZVJlZ0V4cCh2WzBdKSArICcpLikqJCcsICckb3B0aW9ucyc6ICdzJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kc193aXRoOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRyZWdleCc6IFV0aWxzLmVzY2FwZVJlZ0V4cCh2WzBdKSArICckJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90X2VuZHNfd2l0aDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyckcmVnZXgnOiAnKD88IScgKyBVdGlscy5lc2NhcGVSZWdFeHAodlswXSkgKyAnKSQnfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc19lbXB0eTogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNfbm90X2VtcHR5OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRuZSc6ICcnfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc19udWxsOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzX25vdF9udWxsOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7JyRuZSc6IG51bGx9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1vbmdvUnVsZU9wZXJhdG9yczoge1xuICAgICAgICAgICAgJG5lOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHYgPSB2LiRuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAndmFsJzogdixcbiAgICAgICAgICAgICAgICAgICAgJ29wJzogdiA9PT0gbnVsbCA/ICdpc19ub3RfbnVsbCcgOiAodiA9PT0gJycgPyAnaXNfbm90X2VtcHR5JyA6ICdub3RfZXF1YWwnKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXE6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbCc6IHYsXG4gICAgICAgICAgICAgICAgICAgICdvcCc6IHYgPT09IG51bGwgPyAnaXNfbnVsbCcgOiAodiA9PT0gJycgPyAnaXNfZW1wdHknIDogJ2VxdWFsJylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRyZWdleDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB2ID0gdi4kcmVnZXg7XG4gICAgICAgICAgICAgICAgaWYgKHYuc2xpY2UoMCwgNCkgPT0gJ14oPyEnICYmIHYuc2xpY2UoLTEpID09ICcpJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiB2LnNsaWNlKDQsIC0xKSwgJ29wJzogJ25vdF9iZWdpbnNfd2l0aCd9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2LnNsaWNlKDAsIDUpID09ICdeKCg/IScgJiYgdi5zbGljZSgtNSkgPT0gJykuKSokJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiB2LnNsaWNlKDUsIC01KSwgJ29wJzogJ25vdF9jb250YWlucyd9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2LnNsaWNlKDAsIDQpID09ICcoPzwhJyAmJiB2LnNsaWNlKC0yKSA9PSAnKSQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuc2xpY2UoNCwgLTIpLCAnb3AnOiAnbm90X2VuZHNfd2l0aCd9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2LnNsaWNlKC0xKSA9PSAnJCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi5zbGljZSgwLCAtMSksICdvcCc6ICdlbmRzX3dpdGgnfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodi5zbGljZSgwLCAxKSA9PSAnXicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi5zbGljZSgxKSwgJ29wJzogJ2JlZ2luc193aXRoJ307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiB2LCAnb3AnOiAnY29udGFpbnMnfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmV0d2VlbjogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiBbdi4kZ3RlLCB2LiRsdGVdLCAnb3AnOiAnYmV0d2Vlbid9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdF9iZXR3ZWVuOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IFt2LiRsdCwgdi4kZ3RdLCAnb3AnOiAnbm90X2JldHdlZW4nfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkaW46IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi4kaW4sICdvcCc6ICdpbid9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRuaW46IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi4kbmluLCAnb3AnOiAnbm90X2luJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJGx0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuJGx0LCAnb3AnOiAnbGVzcyd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRsdGU6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsndmFsJzogdi4kbHRlLCAnb3AnOiAnbGVzc19vcl9lcXVhbCd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRndDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyd2YWwnOiB2LiRndCwgJ29wJzogJ2dyZWF0ZXInfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkZ3RlOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7J3ZhbCc6IHYuJGd0ZSwgJ29wJzogJ2dyZWF0ZXJfb3JfZXF1YWwnfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbi8vIFBVQkxJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUXVlcnlCdWlsZGVyLmV4dGVuZCh7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgcnVsZXMgYXMgTW9uZ29EQiBxdWVyeVxuICAgICAgICAgKiBAdGhyb3dzIFVuZGVmaW5lZE1vbmdvQ29uZGl0aW9uRXJyb3IsIFVuZGVmaW5lZE1vbmdvT3BlcmF0b3JFcnJvclxuICAgICAgICAgKiBAcGFyYW0gZGF0YSB7b2JqZWN0fSAob3B0aW9uYWwpIHJ1bGVzXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldE1vbmdvOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IChkYXRhID09PSB1bmRlZmluZWQpID8gdGhpcy5nZXRSdWxlcygpIDogZGF0YTtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuY29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29uZGl0aW9uID0gc2VsZi5zZXR0aW5ncy5kZWZhdWx0X2NvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFsnQU5EJywgJ09SJ10uaW5kZXhPZihkYXRhLmNvbmRpdGlvbi50b1VwcGVyQ2FzZSgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZE1vbmdvQ29uZGl0aW9uJywgJ1VuYWJsZSB0byBidWlsZCBNb25nb0RCIHF1ZXJ5IHdpdGggY29uZGl0aW9uIFwiezB9XCInLCBkYXRhLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGRhdGEucnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5ydWxlcyAmJiBydWxlLnJ1bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2gocGFyc2UocnVsZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1kYiA9IHNlbGYuc2V0dGluZ3MubW9uZ29PcGVyYXRvcnNbcnVsZS5vcGVyYXRvcl07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlID0gc2VsZi5nZXRPcGVyYXRvckJ5VHlwZShydWxlLm9wZXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1kYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZE1vbmdvT3BlcmF0b3InLCAnVW5rbm93biBNb25nb0RCIG9wZXJhdGlvbiBmb3Igb3BlcmF0b3IgXCJ7MH1cIicsIHJ1bGUub3BlcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlLm5iX2lucHV0cyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHJ1bGUudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZS52YWx1ZSA9IFtydWxlLnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlLnZhbHVlLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goVXRpbHMuY2hhbmdlVHlwZSh2LCBydWxlLnR5cGUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0W3J1bGUuZmllbGRdID0gbWRiLmNhbGwoc2VsZiwgdmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByZXMgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNbJyQnICsgZGF0YS5jb25kaXRpb24udG9Mb3dlckNhc2UoKV0gPSBwYXJ0cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0oZGF0YSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0IE1vbmdvREIgb2JqZWN0IHRvIHJ1bGVzXG4gICAgICAgICAqIEB0aHJvd3MgTW9uZ29QYXJzZUVycm9yLCBVbmRlZmluZWRNb25nb0NvbmRpdGlvbkVycm9yLCBVbmRlZmluZWRNb25nb09wZXJhdG9yRXJyb3JcbiAgICAgICAgICogQHBhcmFtIGRhdGEge29iamVjdH0gcXVlcnkgb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGdldFJ1bGVzRnJvbU1vbmdvOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgICckYW5kJzogJ0FORCcsXG4gICAgICAgICAgICAgICAgJyRvcic6ICdPUidcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciB0b3BLZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9wS2V5cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNb25nb1BhcnNlJywgJ0ludmFsaWQgTW9uZ29EQiBxdWVyeSBmb3JtYXQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFjb25kaXRpb25zW3RvcEtleXNbMF0udG9Mb3dlckNhc2UoKV0pIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1VuZGVmaW5lZE1vbmdvQ29uZGl0aW9uJywgJ1VuYWJsZSB0byBidWlsZCBNb25nb0RCIHF1ZXJ5IHdpdGggY29uZGl0aW9uIFwiezB9XCInLCB0b3BLZXlzWzBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcnVsZXMgPSBkYXRhW3RvcEtleXNbMF1dO1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgcnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJ1bGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25zW2tleXNbMF0udG9Mb3dlckNhc2UoKV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2gocGFyc2UocnVsZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0ga2V5c1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJ1bGVbZmllbGRdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlcmF0b3IgPSBkZXRlcm1pbmVNb25nb09wZXJhdG9yKHZhbHVlLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdNb25nb1BhcnNlJywgJ0ludmFsaWQgTW9uZ29EQiBxdWVyeSBmb3JtYXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1kYnJsID0gc2VsZi5zZXR0aW5ncy5tb25nb1J1bGVPcGVyYXRvcnNbb3BlcmF0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1kYnJsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignVW5kZWZpbmVkTW9uZ29PcGVyYXRvcicsICdKU09OIFJ1bGUgb3BlcmF0aW9uIHVua25vd24gZm9yIG9wZXJhdG9yIFwiezB9XCInLCBvcGVyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcFZhbCA9IG1kYnJsLmNhbGwoc2VsZiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNlbGYuY2hhbmdlKCdnZXRNb25nb0RCRmllbGRJRCcsIGZpZWxkLCB2YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBvcFZhbC5vcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3BWYWwudmFsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5jb25kaXRpb24gPSBjb25kaXRpb25zW3RvcEtleXNbMF0udG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIHJlcy5ydWxlcyA9IHBhcnRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfShkYXRhKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCBydWxlcyBmcm9tIE1vbmdvREIgb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHtvYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZXRSdWxlc0Zyb21Nb25nbzogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UnVsZXModGhpcy5nZXRSdWxlc0Zyb21Nb25nbyhkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEZpbmQgd2hpY2ggb3BlcmF0b3IgaXMgdXNlZCBpbiBhIE1vbmdvREIgc3ViLW9iamVjdFxuICAgICAqIEBwYXJhbSB7bWl4ZWR9IHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gICAgICogQHJldHVybiB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZXRlcm1pbmVNb25nb09wZXJhdG9yKHZhbHVlLCBmaWVsZCkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YXIgc3Via2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHN1YmtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YmtleXNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuJGd0ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLiRsdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2JldHdlZW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuJGx0ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuJGd0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdub3RfYmV0d2Vlbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLiRyZWdleCAhPT0gdW5kZWZpbmVkKSB7IC8vIG9wdGlvbmFsICRvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJHJlZ2V4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2VxJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciBTb3J0YWJsZVxuICAgICAqIEVuYWJsZXMgZHJhZyAmIGRyb3Agc29ydCBvZiBydWxlcy5cbiAgICAgKi9cblxuICAgIFNlbGVjdG9ycy5ydWxlX2FuZF9ncm91cF9jb250YWluZXJzID0gU2VsZWN0b3JzLnJ1bGVfY29udGFpbmVyICsgJywgJyArIFNlbGVjdG9ycy5ncm91cF9jb250YWluZXI7XG5cbiAgICBRdWVyeUJ1aWxkZXIuZGVmaW5lKCdzb3J0YWJsZScsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0IEhUTUw1IGRyYWcgYW5kIGRyb3BcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub24oJ2FmdGVySW5pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyBjb25maWd1cmUgalF1ZXJ5IHRvIHVzZSBkYXRhVHJhbnNmZXJcbiAgICAgICAgICAgICQuZXZlbnQucHJvcHMucHVzaCgnZGF0YVRyYW5zZmVyJyk7XG5cbiAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlcjtcbiAgICAgICAgICAgIHZhciBzcmM7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IGUuYnVpbGRlcjtcblxuICAgICAgICAgICAgLy8gb25seSBhZGQgXCJkcmFnZ2FibGVcIiBhdHRyaWJ1dGUgd2hlbiBob3ZlcmluZyBkcmFnIGhhbmRsZVxuICAgICAgICAgICAgLy8gcHJldmVudGluZyB0ZXh0IHNlbGVjdCBidWcgaW4gRmlyZWZveFxuICAgICAgICAgICAgc2VsZi4kZWwub24oJ21vdXNlb3Zlci5xdWVyeUJ1aWxkZXInLCAnLmRyYWctaGFuZGxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsLmZpbmQoU2VsZWN0b3JzLnJ1bGVfYW5kX2dyb3VwX2NvbnRhaW5lcnMpLmF0dHIoJ2RyYWdnYWJsZScsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLiRlbC5vbignbW91c2VvdXQucXVlcnlCdWlsZGVyJywgJy5kcmFnLWhhbmRsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2FuZF9ncm91cF9jb250YWluZXJzKS5yZW1vdmVBdHRyKCdkcmFnZ2FibGUnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkcmFnc3RhcnQ6IGNyZWF0ZSBwbGFjZWhvbGRlciBhbmQgaGlkZSBjdXJyZW50IGVsZW1lbnRcbiAgICAgICAgICAgIHNlbGYuJGVsLm9uKCdkcmFnc3RhcnQucXVlcnlCdWlsZGVyJywgJ1tkcmFnZ2FibGVdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgLy8gbm90aWZ5IGRyYWcgYW5kIGRyb3AgKG9ubHkgZHVtbXkgdGV4dClcbiAgICAgICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2RyYWcnKTtcblxuICAgICAgICAgICAgICAgIHNyYyA9IE1vZGVsKGUudGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIC8vIENocm9tZSBnbGl0Y2hzXG4gICAgICAgICAgICAgICAgLy8gLSBoZWxwZXIgaW52aXNpYmxlIGlmIGhpZGRlbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgIC8vIC0gXCJkcmFnZW5kXCIgaXMgY2FsbGVkIGltbWVkaWF0ZWx5IGlmIHdlIG1vZGlmeSB0aGUgRE9NIGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwaCA9ICQoJzxkaXYgY2xhc3M9XCJydWxlLXBsYWNlaG9sZGVyXCI+Jm5ic3A7PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBoLmNzcygnbWluLWhlaWdodCcsIHNyYy4kZWwuaGVpZ2h0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyID0gc3JjLnBhcmVudC5hZGRSdWxlKHBoLCBzcmMuZ2V0UG9zKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNyYy4kZWwuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGRyYWdlbnRlcjogbW92ZSB0aGUgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIHNlbGYuJGVsLm9uKCdkcmFnZW50ZXIucXVlcnlCdWlsZGVyJywgJ1tkcmFnZ2FibGVdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICBtb3ZlU29ydGFibGVUb1RhcmdldChwbGFjZWhvbGRlciwgJChlLnRhcmdldCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkcmFnb3ZlcjogcHJldmVudCBnbGl0Y2hlc1xuICAgICAgICAgICAgc2VsZi4kZWwub24oJ2RyYWdvdmVyLnF1ZXJ5QnVpbGRlcicsICdbZHJhZ2dhYmxlXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZHJvcDogbW92ZSBjdXJyZW50IGVsZW1lbnRcbiAgICAgICAgICAgIHNlbGYuJGVsLm9uKCdkcm9wLnF1ZXJ5QnVpbGRlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBtb3ZlU29ydGFibGVUb1RhcmdldChzcmMsICQoZS50YXJnZXQpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBkcmFnZW5kOiBzaG93IGN1cnJlbnQgZWxlbWVudCBhbmQgZGVsZXRlIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICBzZWxmLiRlbC5vbignZHJhZ2VuZC5xdWVyeUJ1aWxkZXInLCAnW2RyYWdnYWJsZV0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgc3JjLiRlbC5zaG93KCk7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIuZHJvcCgpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWwuZmluZChTZWxlY3RvcnMucnVsZV9hbmRfZ3JvdXBfY29udGFpbmVycykucmVtb3ZlQXR0cignZHJhZ2dhYmxlJyk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXIoJ2FmdGVyTW92ZScsIHNyYyk7XG5cbiAgICAgICAgICAgICAgICBzcmMgPSBwbGFjZWhvbGRlciA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBkcmFnIGhhbmRsZSBmcm9tIG5vbi1zb3J0YWJsZSBydWxlc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbigncGFyc2VSdWxlRmxhZ3MuZmlsdGVyJywgZnVuY3Rpb24gKGZsYWdzKSB7XG4gICAgICAgICAgICBpZiAoZmxhZ3MudmFsdWUubm9fc29ydGFibGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZsYWdzLnZhbHVlLm5vX3NvcnRhYmxlID0gb3B0aW9ucy5kZWZhdWx0X25vX3NvcnRhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9uKCdhZnRlckFwcGx5UnVsZUZsYWdzJywgZnVuY3Rpb24gKGUsIHJ1bGUpIHtcbiAgICAgICAgICAgIGlmIChydWxlLmZsYWdzLm5vX3NvcnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgcnVsZS4kZWwuZmluZCgnLmRyYWctaGFuZGxlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgZHJhZyBoYW5kbGUgZnJvbSBub24tc29ydGFibGUgZ3JvdXBzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uKCdwYXJzZUdyb3VwRmxhZ3MuZmlsdGVyJywgZnVuY3Rpb24gKGZsYWdzKSB7XG4gICAgICAgICAgICBpZiAoZmxhZ3MudmFsdWUubm9fc29ydGFibGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZsYWdzLnZhbHVlLm5vX3NvcnRhYmxlID0gb3B0aW9ucy5kZWZhdWx0X25vX3NvcnRhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9uKCdhZnRlckFwcGx5R3JvdXBGbGFncycsIGZ1bmN0aW9uIChlLCBncm91cCkge1xuICAgICAgICAgICAgaWYgKGdyb3VwLmZsYWdzLm5vX3NvcnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuJGVsLmZpbmQoJy5kcmFnLWhhbmRsZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTW9kaWZ5IHRlbXBsYXRlc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbignZ2V0R3JvdXBUZW1wbGF0ZS5maWx0ZXInLCBmdW5jdGlvbiAoaCwgbGV2ZWwpIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGggPSAkKGgudmFsdWUpO1xuICAgICAgICAgICAgICAgICRoLmZpbmQoU2VsZWN0b3JzLmNvbmRpdGlvbl9jb250YWluZXIpLmFmdGVyKCc8ZGl2IGNsYXNzPVwiZHJhZy1oYW5kbGVcIj48aSBjbGFzcz1cIicgKyBvcHRpb25zLmljb24gKyAnXCI+PC9pPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIGgudmFsdWUgPSAkaC5wcm9wKCdvdXRlckhUTUwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignZ2V0UnVsZVRlbXBsYXRlLmZpbHRlcicsIGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICB2YXIgJGggPSAkKGgudmFsdWUpO1xuICAgICAgICAgICAgJGguZmluZChTZWxlY3RvcnMucnVsZV9oZWFkZXIpLmFmdGVyKCc8ZGl2IGNsYXNzPVwiZHJhZy1oYW5kbGVcIj48aSBjbGFzcz1cIicgKyBvcHRpb25zLmljb24gKyAnXCI+PC9pPjwvZGl2PicpO1xuICAgICAgICAgICAgaC52YWx1ZSA9ICRoLnByb3AoJ291dGVySFRNTCcpO1xuICAgICAgICB9KTtcbiAgICB9LCB7XG4gICAgICAgIGRlZmF1bHRfbm9fc29ydGFibGU6IGZhbHNlLFxuICAgICAgICBpY29uOiAnZ2x5cGhpY29uIGdseXBoaWNvbi1zb3J0J1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTW92ZSBhbiBlbGVtZW50IChwbGFjZWhvbGRlciBvciBhY3R1YWwgb2JqZWN0KSBkZXBlbmRpbmcgb24gYWN0aXZlIHRhcmdldFxuICAgICAqIEBwYXJhbSB7Tm9kZX1cbiAgICAgKiBAcGFyYW0ge2pRdWVyeX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtb3ZlU29ydGFibGVUb1RhcmdldChlbGVtZW50LCB0YXJnZXQpIHtcbiAgICAgICAgdmFyIHBhcmVudDtcblxuICAgICAgICAvLyBvbiBydWxlXG4gICAgICAgIHBhcmVudCA9IHRhcmdldC5jbG9zZXN0KFNlbGVjdG9ycy5ydWxlX2NvbnRhaW5lcik7XG4gICAgICAgIGlmIChwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtZW50Lm1vdmVBZnRlcihNb2RlbChwYXJlbnQpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9uIGdyb3VwIGhlYWRlclxuICAgICAgICBwYXJlbnQgPSB0YXJnZXQuY2xvc2VzdChTZWxlY3RvcnMuZ3JvdXBfaGVhZGVyKTtcbiAgICAgICAgaWYgKHBhcmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IHRhcmdldC5jbG9zZXN0KFNlbGVjdG9ycy5ncm91cF9jb250YWluZXIpO1xuICAgICAgICAgICAgZWxlbWVudC5tb3ZlQXRCZWdpbihNb2RlbChwYXJlbnQpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9uIGdyb3VwXG4gICAgICAgIHBhcmVudCA9IHRhcmdldC5jbG9zZXN0KFNlbGVjdG9ycy5ncm91cF9jb250YWluZXIpO1xuICAgICAgICBpZiAocGFyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudC5tb3ZlQXRFbmQoTW9kZWwocGFyZW50KSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIVxuICAgICAqIGpRdWVyeSBRdWVyeUJ1aWxkZXIgU1FMIFN1cHBvcnRcbiAgICAgKiBBbGxvd3MgdG8gZXhwb3J0IHJ1bGVzIGFzIGEgU1FMIFdIRVJFIHN0YXRlbWVudCBhcyB3ZWxsIGFzIHBvcHVsYXRpbmcgdGhlIGJ1aWxkZXIgZnJvbSBhbiBTUUwgcXVlcnkuXG4gICAgICovXG5cbi8vIERFRkFVTFQgQ09ORklHXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUXVlcnlCdWlsZGVyLmRlZmF1bHRzKHtcbiAgICAgICAgLyogb3BlcmF0b3JzIGZvciBpbnRlcm5hbCAtPiBTUUwgY29udmVyc2lvbiAqL1xuICAgICAgICBzcWxPcGVyYXRvcnM6IHtcbiAgICAgICAgICAgIGVxdWFsOiB7b3A6ICc9ID8nfSxcbiAgICAgICAgICAgIG5vdF9lcXVhbDoge29wOiAnIT0gPyd9LFxuICAgICAgICAgICAgaW46IHtvcDogJ0lOKD8pJywgc2VwOiAnLCAnfSxcbiAgICAgICAgICAgIG5vdF9pbjoge29wOiAnTk9UIElOKD8pJywgc2VwOiAnLCAnfSxcbiAgICAgICAgICAgIGxlc3M6IHtvcDogJzwgPyd9LFxuICAgICAgICAgICAgbGVzc19vcl9lcXVhbDoge29wOiAnPD0gPyd9LFxuICAgICAgICAgICAgZ3JlYXRlcjoge29wOiAnPiA/J30sXG4gICAgICAgICAgICBncmVhdGVyX29yX2VxdWFsOiB7b3A6ICc+PSA/J30sXG4gICAgICAgICAgICBiZXR3ZWVuOiB7b3A6ICdCRVRXRUVOID8nLCBzZXA6ICcgQU5EICd9LFxuICAgICAgICAgICAgbm90X2JldHdlZW46IHtvcDogJ05PVCBCRVRXRUVOID8nLCBzZXA6ICcgQU5EICd9LFxuICAgICAgICAgICAgYmVnaW5zX3dpdGg6IHtvcDogJ0xJS0UoPyknLCBtb2Q6ICd7MH0lJ30sXG4gICAgICAgICAgICBub3RfYmVnaW5zX3dpdGg6IHtvcDogJ05PVCBMSUtFKD8pJywgbW9kOiAnezB9JSd9LFxuICAgICAgICAgICAgY29udGFpbnM6IHtvcDogJ0xJS0UoPyknLCBtb2Q6ICclezB9JSd9LFxuICAgICAgICAgICAgbm90X2NvbnRhaW5zOiB7b3A6ICdOT1QgTElLRSg/KScsIG1vZDogJyV7MH0lJ30sXG4gICAgICAgICAgICBlbmRzX3dpdGg6IHtvcDogJ0xJS0UoPyknLCBtb2Q6ICclezB9J30sXG4gICAgICAgICAgICBub3RfZW5kc193aXRoOiB7b3A6ICdOT1QgTElLRSg/KScsIG1vZDogJyV7MH0nfSxcbiAgICAgICAgICAgIGlzX2VtcHR5OiB7b3A6ICc9IFxcJ1xcJyd9LFxuICAgICAgICAgICAgaXNfbm90X2VtcHR5OiB7b3A6ICchPSBcXCdcXCcnfSxcbiAgICAgICAgICAgIGlzX251bGw6IHtvcDogJ0lTIE5VTEwnfSxcbiAgICAgICAgICAgIGlzX25vdF9udWxsOiB7b3A6ICdJUyBOT1QgTlVMTCd9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyogb3BlcmF0b3JzIGZvciBTUUwgLT4gaW50ZXJuYWwgY29udmVyc2lvbiAqL1xuICAgICAgICBzcWxSdWxlT3BlcmF0b3I6IHtcbiAgICAgICAgICAgICc9JzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWw6IHYsXG4gICAgICAgICAgICAgICAgICAgIG9wOiB2ID09PSAnJyA/ICdpc19lbXB0eScgOiAnZXF1YWwnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnIT0nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbDogdixcbiAgICAgICAgICAgICAgICAgICAgb3A6IHYgPT09ICcnID8gJ2lzX25vdF9lbXB0eScgOiAnbm90X2VxdWFsJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0xJS0UnOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIGlmICh2LnNsaWNlKDAsIDEpID09ICclJyAmJiB2LnNsaWNlKC0xKSA9PSAnJScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogdi5zbGljZSgxLCAtMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcDogJ2NvbnRhaW5zJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2LnNsaWNlKDAsIDEpID09ICclJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsOiB2LnNsaWNlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3A6ICdlbmRzX3dpdGgnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHYuc2xpY2UoLTEpID09ICclJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsOiB2LnNsaWNlKDAsIC0xKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wOiAnYmVnaW5zX3dpdGgnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignU1FMUGFyc2UnLCAnSW52YWxpZCB2YWx1ZSBmb3IgTElLRSBvcGVyYXRvciBcInswfVwiJywgdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdJTic6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IHYsIG9wOiAnaW4nfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnTk9UIElOJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3ZhbDogdiwgb3A6ICdub3RfaW4nfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnPCc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IHYsIG9wOiAnbGVzcyd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICc8PSc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IHYsIG9wOiAnbGVzc19vcl9lcXVhbCd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICc+JzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3ZhbDogdiwgb3A6ICdncmVhdGVyJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJz49JzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge3ZhbDogdiwgb3A6ICdncmVhdGVyX29yX2VxdWFsJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0JFVFdFRU4nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiB2LCBvcDogJ2JldHdlZW4nfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnTk9UIEJFVFdFRU4nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiB2LCBvcDogJ25vdF9iZXR3ZWVuJ307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ0lTJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignU1FMUGFyc2UnLCAnSW52YWxpZCB2YWx1ZSBmb3IgSVMgb3BlcmF0b3InKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IG51bGwsIG9wOiAnaXNfbnVsbCd9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdJUyBOT1QnOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIGlmICh2ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdTUUxQYXJzZScsICdJbnZhbGlkIHZhbHVlIGZvciBJUyBvcGVyYXRvcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge3ZhbDogbnVsbCwgb3A6ICdpc19ub3RfbnVsbCd9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qIHN0YXRlbWVudHMgZm9yIGludGVybmFsIC0+IFNRTCBjb252ZXJzaW9uICovXG4gICAgICAgIHNxbFN0YXRlbWVudHM6IHtcbiAgICAgICAgICAgICdxdWVzdGlvbl9tYXJrJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIChydWxlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc/JztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICdudW1iZXJlZCc6IGZ1bmN0aW9uIChjaGFyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGFyIHx8IGNoYXIubGVuZ3RoID4gMSkgY2hhciA9ICckJztcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIChydWxlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFyICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnbmFtZWQnOiBmdW5jdGlvbiAoY2hhcikge1xuICAgICAgICAgICAgICAgIGlmICghY2hhciB8fCBjaGFyLmxlbmd0aCA+IDEpIGNoYXIgPSAnOic7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAocnVsZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5kZXhlc1tydWxlLmZpZWxkXSkgaW5kZXhlc1tydWxlLmZpZWxkXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gcnVsZS5maWVsZCArICdfJyArIChpbmRleGVzW3J1bGUuZmllbGRdKyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFyICsga2V5O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qIHN0YXRlbWVudHMgZm9yIFNRTCAtPiBpbnRlcm5hbCBjb252ZXJzaW9uICovXG4gICAgICAgIHNxbFJ1bGVTdGF0ZW1lbnQ6IHtcbiAgICAgICAgICAgICdxdWVzdGlvbl9tYXJrJzogZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdiA9PSAnPycgPyB2YWx1ZXNbaW5kZXgrK10gOiB2O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlc2M6IGZ1bmN0aW9uIChzcWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzcWwucmVwbGFjZSgvXFw/L2csICdcXCc/XFwnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ251bWJlcmVkJzogZnVuY3Rpb24gKHZhbHVlcywgY2hhcikge1xuICAgICAgICAgICAgICAgIGlmICghY2hhciB8fCBjaGFyLmxlbmd0aCA+IDEpIGNoYXIgPSAnJCc7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4MSA9IG5ldyBSZWdFeHAoJ15cXFxcJyArIGNoYXIgKyAnWzAtOV0rJCcpO1xuICAgICAgICAgICAgICAgIHZhciByZWdleDIgPSBuZXcgUmVnRXhwKCdcXFxcJyArIGNoYXIgKyAnKFswLTldKyknLCAnZycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2V4MS50ZXN0KHYpID8gdmFsdWVzW3Yuc2xpY2UoMSkgLSAxXSA6IHY7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVzYzogZnVuY3Rpb24gKHNxbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNxbC5yZXBsYWNlKHJlZ2V4MiwgJ1xcJycgKyAoY2hhciA9PSAnJCcgPyAnJCQnIDogY2hhcikgKyAnJDFcXCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnbmFtZWQnOiBmdW5jdGlvbiAodmFsdWVzLCBjaGFyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGFyIHx8IGNoYXIubGVuZ3RoID4gMSkgY2hhciA9ICc6JztcbiAgICAgICAgICAgICAgICB2YXIgcmVnZXgxID0gbmV3IFJlZ0V4cCgnXlxcXFwnICsgY2hhcik7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4MiA9IG5ldyBSZWdFeHAoJ1xcXFwnICsgY2hhciArICcoJyArIE9iamVjdC5rZXlzKHZhbHVlcykuam9pbignfCcpICsgJyknLCAnZycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2V4MS50ZXN0KHYpID8gdmFsdWVzW3Yuc2xpY2UoMSldIDogdjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXNjOiBmdW5jdGlvbiAoc3FsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3FsLnJlcGxhY2UocmVnZXgyLCAnXFwnJyArIChjaGFyID09ICckJyA/ICckJCcgOiBjaGFyKSArICckMVxcJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbi8vIFBVQkxJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUXVlcnlCdWlsZGVyLmV4dGVuZCh7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgcnVsZXMgYXMgU1FMIHF1ZXJ5XG4gICAgICAgICAqIEB0aHJvd3MgVW5kZWZpbmVkU1FMQ29uZGl0aW9uRXJyb3IsIFVuZGVmaW5lZFNRTE9wZXJhdG9yRXJyb3JcbiAgICAgICAgICogQHBhcmFtIHN0bXQge2Jvb2xlYW58c3RyaW5nfSB1c2UgcHJlcGFyZWQgc3RhdGVtZW50cyAtIGZhbHNlLCAncXVlc3Rpb25fbWFyaycsICdudW1iZXJlZCcsICdudW1iZXJlZChAKScsICduYW1lZCcsICduYW1lZChAKSdcbiAgICAgICAgICogQHBhcmFtIG5sIHtib29sfSBvdXRwdXQgd2l0aCBuZXcgbGluZXNcbiAgICAgICAgICogQHBhcmFtIGRhdGEge29iamVjdH0gKG9wdGlvbmFsKSBydWxlc1xuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRTUUw6IGZ1bmN0aW9uIChzdG10LCBubCwgZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IChkYXRhID09PSB1bmRlZmluZWQpID8gdGhpcy5nZXRSdWxlcygpIDogZGF0YTtcbiAgICAgICAgICAgIG5sID0gKG5sID09PSB0cnVlKSA/ICdcXG4nIDogJyAnO1xuXG4gICAgICAgICAgICBpZiAoc3RtdCA9PT0gdHJ1ZSkgc3RtdCA9ICdxdWVzdGlvbl9tYXJrJztcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RtdCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBnZXRTdG10Q29uZmlnKHN0bXQpO1xuICAgICAgICAgICAgICAgIHN0bXQgPSB0aGlzLnNldHRpbmdzLnNxbFN0YXRlbWVudHNbY29uZmlnWzFdXShjb25maWdbMl0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBzcWwgPSAoZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghZGF0YS5jb25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jb25kaXRpb24gPSBzZWxmLnNldHRpbmdzLmRlZmF1bHRfY29uZGl0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoWydBTkQnLCAnT1InXS5pbmRleE9mKGRhdGEuY29uZGl0aW9uLnRvVXBwZXJDYXNlKCkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignVW5kZWZpbmVkU1FMQ29uZGl0aW9uJywgJ1VuYWJsZSB0byBidWlsZCBTUUwgcXVlcnkgd2l0aCBjb25kaXRpb24gXCJ7MH1cIicsIGRhdGEuY29uZGl0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZGF0YS5ydWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlLnJ1bGVzICYmIHJ1bGUucnVsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCgnKCcgKyBubCArIHBhcnNlKHJ1bGUpICsgbmwgKyAnKScgKyBubCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3FsID0gc2VsZi5zZXR0aW5ncy5zcWxPcGVyYXRvcnNbcnVsZS5vcGVyYXRvcl07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlID0gc2VsZi5nZXRPcGVyYXRvckJ5VHlwZShydWxlLm9wZXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3FsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignVW5kZWZpbmVkU1FMT3BlcmF0b3InLCAnVW5rbm93biBTUUwgb3BlcmF0aW9uIGZvciBvcGVyYXRvciBcInswfVwiJywgcnVsZS5vcGVyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGUubmJfaW5wdXRzICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEocnVsZS52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlLnZhbHVlID0gW3J1bGUudmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUudmFsdWUuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHNxbC5zZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS50eXBlID09ICdpbnRlZ2VyJyB8fCBydWxlLnR5cGUgPT0gJ2RvdWJsZScgfHwgcnVsZS50eXBlID09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IFV0aWxzLmNoYW5nZVR5cGUodiwgcnVsZS50eXBlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghc3RtdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IFV0aWxzLmVzY2FwZVN0cmluZyh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcWwubW9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gVXRpbHMuZm10KHNxbC5tb2QsIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0bXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHN0bXQuYWRkKHJ1bGUsIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9ICdcXCcnICsgdiArICdcXCcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSB2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2gocnVsZS5maWVsZCArICcgJyArIHNxbC5vcC5yZXBsYWNlKC9cXD8vLCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydHMuam9pbignICcgKyBkYXRhLmNvbmRpdGlvbiArIG5sKTtcbiAgICAgICAgICAgIH0oZGF0YSkpO1xuXG4gICAgICAgICAgICBpZiAoc3RtdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNxbDogc3FsLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHN0bXQucnVuKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3FsOiBzcWxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0IFNRTCB0byBydWxlc1xuICAgICAgICAgKiBAdGhyb3dzIENvbmZpZ0Vycm9yLCBTUUxQYXJzZUVycm9yLCBVbmRlZmluZWRTUUxPcGVyYXRvckVycm9yXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHtvYmplY3R9IHF1ZXJ5IG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gc3RtdCB7Ym9vbGVhbnxzdHJpbmd9IHVzZSBwcmVwYXJlZCBzdGF0ZW1lbnRzIC0gZmFsc2UsICdxdWVzdGlvbl9tYXJrJywgJ251bWJlcmVkJywgJ251bWJlcmVkKEApJywgJ25hbWVkJywgJ25hbWVkKEApJ1xuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBnZXRSdWxlc0Zyb21TUUw6IGZ1bmN0aW9uIChkYXRhLCBzdG10KSB7XG4gICAgICAgICAgICBpZiAoISgnU1FMUGFyc2VyJyBpbiB3aW5kb3cpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ01pc3NpbmdMaWJyYXJ5JywgJ1NRTFBhcnNlciBpcyByZXF1aXJlZCB0byBwYXJzZSBTUUwgcXVlcmllcy4gR2V0IGl0IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL21pc3RpYzEwMC9zcWwtcGFyc2VyJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHtzcWw6IGRhdGF9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RtdCA9PT0gdHJ1ZSkgc3RtdCA9ICdxdWVzdGlvbl9tYXJrJztcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RtdCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBnZXRTdG10Q29uZmlnKHN0bXQpO1xuICAgICAgICAgICAgICAgIHN0bXQgPSB0aGlzLnNldHRpbmdzLnNxbFJ1bGVTdGF0ZW1lbnRbY29uZmlnWzFdXShkYXRhLnBhcmFtcywgY29uZmlnWzJdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0bXQpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnNxbCA9IHN0bXQuZXNjKGRhdGEuc3FsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuc3FsLnRvVXBwZXJDYXNlKCkuaW5kZXhPZignU0VMRUNUJykgIT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRhLnNxbCA9ICdTRUxFQ1QgKiBGUk9NIHRhYmxlIFdIRVJFICcgKyBkYXRhLnNxbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IFNRTFBhcnNlci5wYXJzZShkYXRhLnNxbCk7XG5cbiAgICAgICAgICAgIGlmICghcGFyc2VkLndoZXJlKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1NRTFBhcnNlJywgJ05vIFdIRVJFIGNsYXVzZSBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3V0ID0ge1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdGhpcy5zZXR0aW5ncy5kZWZhdWx0X2NvbmRpdGlvbixcbiAgICAgICAgICAgICAgICBydWxlczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3VyciA9IG91dDtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIGZsYXR0ZW4oZGF0YSwgaSkge1xuICAgICAgICAgICAgICAgIC8vIGl0J3MgYSBub2RlXG4gICAgICAgICAgICAgICAgaWYgKFsnQU5EJywgJ09SJ10uaW5kZXhPZihkYXRhLm9wZXJhdGlvbi50b1VwcGVyQ2FzZSgpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgc3ViLWdyb3VwIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IHRoZSBzYW1lIGFuZCBpdCdzIG5vdCB0aGUgZmlyc3QgbGV2ZWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwICYmIGN1cnIuY29uZGl0aW9uICE9IGRhdGEub3BlcmF0aW9uLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnIucnVsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBzZWxmLnNldHRpbmdzLmRlZmF1bHRfY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVzOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnIgPSBjdXJyLnJ1bGVzW2N1cnIucnVsZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJyLmNvbmRpdGlvbiA9IGRhdGEub3BlcmF0aW9uLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgICAgICAgICAvLyBzb21lIG1hZ2ljICFcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSBjdXJyO1xuICAgICAgICAgICAgICAgICAgICBmbGF0dGVuKGRhdGEubGVmdCwgaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyciA9IG5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGZsYXR0ZW4oZGF0YS5yaWdodCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGl0J3MgYSBsZWFmXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlZnQudmFsdWUgPT09IHVuZGVmaW5lZCB8fCBkYXRhLnJpZ2h0LnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmVycm9yKCdTUUxQYXJzZScsICdNaXNzaW5nIGZpZWxkIGFuZC9vciB2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNQbGFpbk9iamVjdChkYXRhLnJpZ2h0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuZXJyb3IoJ1NRTFBhcnNlJywgJ1ZhbHVlIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB7MH0uJywgZGF0YS5sZWZ0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0FycmF5KGRhdGEucmlnaHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGEucmlnaHQudmFsdWUubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YS5yaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBhY3R1YWwgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdG10KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubWFwKHN0bXQucGFyc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBzdG10LnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgb3BlcmF0b3JcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wZXJhdG9yID0gZGF0YS5vcGVyYXRpb24udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09ICc8PicpIG9wZXJhdG9yID0gJyE9JztcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3Fscmw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PSAnTk9UIExJS0UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcWxybCA9IHNlbGYuc2V0dGluZ3Muc3FsUnVsZU9wZXJhdG9yWydMSUtFJ107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcWxybCA9IHNlbGYuc2V0dGluZ3Muc3FsUnVsZU9wZXJhdG9yW29wZXJhdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcWxybCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5lcnJvcignVW5kZWZpbmVkU1FMT3BlcmF0b3InLCAnSW52YWxpZCBTUUwgb3BlcmF0aW9uIFwiezB9XCIuJywgZGF0YS5vcGVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wVmFsID0gc3FscmwuY2FsbCh0aGlzLCB2YWx1ZSwgZGF0YS5vcGVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0b3IgPT0gJ05PVCBMSUtFJykgb3BWYWwub3AgPSAnbm90XycgKyBvcFZhbC5vcDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdF92YWx1ZSA9IGRhdGEubGVmdC52YWx1ZXMuam9pbignLicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN1cnIucnVsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogc2VsZi5jaGFuZ2UoJ2dldFNRTEZpZWxkSUQnLCBsZWZ0X3ZhbHVlLCB2YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogbGVmdF92YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBvcFZhbC5vcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcFZhbC52YWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfShwYXJzZWQud2hlcmUuY29uZGl0aW9ucywgMCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgcnVsZXMgZnJvbSBTUUxcbiAgICAgICAgICogQHBhcmFtIGRhdGEge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNldFJ1bGVzRnJvbVNRTDogZnVuY3Rpb24gKGRhdGEsIHN0bXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UnVsZXModGhpcy5nZXRSdWxlc0Zyb21TUUwoZGF0YSwgc3RtdCkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRTdG10Q29uZmlnKHN0bXQpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHN0bXQubWF0Y2goLyhxdWVzdGlvbl9tYXJrfG51bWJlcmVkfG5hbWVkKSg/OlxcKCguKVxcKSk/Lyk7XG4gICAgICAgIGlmICghY29uZmlnKSBjb25maWcgPSBbbnVsbCwgJ3F1ZXN0aW9uX21hcmsnLCB1bmRlZmluZWRdO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuXG4gICAgLyohXG4gICAgICogalF1ZXJ5IFF1ZXJ5QnVpbGRlciBVbmlxdWUgRmlsdGVyXG4gICAgICogQWxsb3dzIHRvIGRlZmluZSBzb21lIGZpbHRlcnMgYXMgXCJ1bmlxdWVcIjogaWUgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIG9ubHkgb25lIHJ1bGUsIGdsb2JhbGx5IG9yIGluIHRoZSBzYW1lIGdyb3VwLlxuICAgICAqL1xuXG4gICAgUXVlcnlCdWlsZGVyLmRlZmluZSgndW5pcXVlLWZpbHRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMudXNlZF9maWx0ZXJzID0ge307XG5cbiAgICAgICAgdGhpcy5vbignYWZ0ZXJVcGRhdGVSdWxlRmlsdGVyJywgdGhpcy51cGRhdGVEaXNhYmxlZEZpbHRlcnMpO1xuICAgICAgICB0aGlzLm9uKCdhZnRlckRlbGV0ZVJ1bGUnLCB0aGlzLnVwZGF0ZURpc2FibGVkRmlsdGVycyk7XG4gICAgICAgIHRoaXMub24oJ2FmdGVyQ3JlYXRlUnVsZUZpbHRlcnMnLCB0aGlzLmFwcGx5RGlzYWJsZWRGaWx0ZXJzKTtcbiAgICAgICAgdGhpcy5vbignYWZ0ZXJSZXNldCcsIHRoaXMuY2xlYXJEaXNhYmxlZEZpbHRlcnMpO1xuICAgICAgICB0aGlzLm9uKCdhZnRlckNsZWFyJywgdGhpcy5jbGVhckRpc2FibGVkRmlsdGVycyk7XG4gICAgfSk7XG5cbiAgICBRdWVyeUJ1aWxkZXIuZXh0ZW5kKHtcbiAgICAgICAgdXBkYXRlRGlzYWJsZWRGaWx0ZXJzOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSBlID8gZS5idWlsZGVyIDogdGhpcztcblxuICAgICAgICAgICAgc2VsZi5zdGF0dXMudXNlZF9maWx0ZXJzID0ge307XG5cbiAgICAgICAgICAgIGlmICghc2VsZi5tb2RlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZ2V0IHVzZWQgZmlsdGVyc1xuICAgICAgICAgICAgKGZ1bmN0aW9uIHdhbGsoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBncm91cC5lYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmZpbHRlciAmJiBydWxlLmZpbHRlci51bmlxdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5zdGF0dXMudXNlZF9maWx0ZXJzW3J1bGUuZmlsdGVyLmlkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdHVzLnVzZWRfZmlsdGVyc1tydWxlLmZpbHRlci5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmZpbHRlci51bmlxdWUgPT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdHVzLnVzZWRfZmlsdGVyc1tydWxlLmZpbHRlci5pZF0ucHVzaChydWxlLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgd2Fsayhncm91cCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KHNlbGYubW9kZWwucm9vdCkpO1xuXG4gICAgICAgICAgICBzZWxmLmFwcGx5RGlzYWJsZWRGaWx0ZXJzKGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyRGlzYWJsZWRGaWx0ZXJzOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSBlID8gZS5idWlsZGVyIDogdGhpcztcblxuICAgICAgICAgICAgc2VsZi5zdGF0dXMudXNlZF9maWx0ZXJzID0ge307XG5cbiAgICAgICAgICAgIHNlbGYuYXBwbHlEaXNhYmxlZEZpbHRlcnMoZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXBwbHlEaXNhYmxlZEZpbHRlcnM6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IGUgPyBlLmJ1aWxkZXIgOiB0aGlzO1xuXG4gICAgICAgICAgICAvLyByZS1lbmFibGUgZXZlcnl0aGluZ1xuICAgICAgICAgICAgc2VsZi4kZWwuZmluZChTZWxlY3RvcnMuZmlsdGVyX2NvbnRhaW5lciArICcgb3B0aW9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIGRpc2FibGUgc29tZVxuICAgICAgICAgICAgJC5lYWNoKHNlbGYuc3RhdHVzLnVzZWRfZmlsdGVycywgZnVuY3Rpb24gKGZpbHRlcklkLCBncm91cHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbC5maW5kKFNlbGVjdG9ycy5maWx0ZXJfY29udGFpbmVyICsgJyBvcHRpb25bdmFsdWU9XCInICsgZmlsdGVySWQgKyAnXCJdOm5vdCg6c2VsZWN0ZWQpJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuJGVsLmZpbmQoU2VsZWN0b3JzLmZpbHRlcl9jb250YWluZXIgKyAnIG9wdGlvblt2YWx1ZT1cIicgKyBmaWx0ZXJJZCArICdcIl06bm90KDpzZWxlY3RlZCknKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgU2VsZWN0cGlja2VyXG4gICAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5wbHVnaW5zICYmIHNlbGYuc2V0dGluZ3MucGx1Z2luc1snYnQtc2VsZWN0cGlja2VyJ10pIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbC5maW5kKFNlbGVjdG9ycy5ydWxlX2ZpbHRlcikuc2VsZWN0cGlja2VyKCdyZW5kZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvKiFcbiAgICAgKiBqUXVlcnkgUXVlcnlCdWlsZGVyIDIuMy4zXG4gICAgICogTG9jYWxlOiBFbmdsaXNoIChlbilcbiAgICAgKiBBdXRob3I6IERhbWllbiBcIk1pc3RpY1wiIFNvcmVsLCBodHRwOi8vd3d3LnN0cmFuZ2VwbGFuZXQuZnJcbiAgICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQpXG4gICAgICovXG5cbiAgICBRdWVyeUJ1aWxkZXIucmVnaW9uYWxbJ2VuJ10gPSB7XG4gICAgICAgIFwiX19sb2NhbGVcIjogXCJFbmdsaXNoIChlbilcIixcbiAgICAgICAgXCJfX2F1dGhvclwiOiBcIkRhbWllbiBcXFwiTWlzdGljXFxcIiBTb3JlbCwgaHR0cDovL3d3dy5zdHJhbmdlcGxhbmV0LmZyXCIsXG4gICAgICAgIFwiYWRkX3J1bGVcIjogXCJBZGQgcnVsZVwiLFxuICAgICAgICBcImFkZF9ncm91cFwiOiBcIkFkZCBncm91cFwiLFxuICAgICAgICBcImRlbGV0ZV9ydWxlXCI6IFwiRGVsZXRlXCIsXG4gICAgICAgIFwiZGVsZXRlX2dyb3VwXCI6IFwiRGVsZXRlXCIsXG4gICAgICAgIFwiY29uZGl0aW9uc1wiOiB7XG4gICAgICAgICAgICBcIkFORFwiOiBcIkFORFwiLFxuICAgICAgICAgICAgXCJPUlwiOiBcIk9SXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcGVyYXRvcnNcIjoge1xuICAgICAgICAgICAgXCJlcXVhbFwiOiBcImVxdWFsXCIsXG4gICAgICAgICAgICBcIm5vdF9lcXVhbFwiOiBcIm5vdCBlcXVhbFwiLFxuICAgICAgICAgICAgXCJpblwiOiBcImluXCIsXG4gICAgICAgICAgICBcIm5vdF9pblwiOiBcIm5vdCBpblwiLFxuICAgICAgICAgICAgXCJsZXNzXCI6IFwibGVzc1wiLFxuICAgICAgICAgICAgXCJsZXNzX29yX2VxdWFsXCI6IFwibGVzcyBvciBlcXVhbFwiLFxuICAgICAgICAgICAgXCJncmVhdGVyXCI6IFwiZ3JlYXRlclwiLFxuICAgICAgICAgICAgXCJncmVhdGVyX29yX2VxdWFsXCI6IFwiZ3JlYXRlciBvciBlcXVhbFwiLFxuICAgICAgICAgICAgXCJiZXR3ZWVuXCI6IFwiYmV0d2VlblwiLFxuICAgICAgICAgICAgXCJub3RfYmV0d2VlblwiOiBcIm5vdCBiZXR3ZWVuXCIsXG4gICAgICAgICAgICBcImJlZ2luc193aXRoXCI6IFwiYmVnaW5zIHdpdGhcIixcbiAgICAgICAgICAgIFwibm90X2JlZ2luc193aXRoXCI6IFwiZG9lc24ndCBiZWdpbiB3aXRoXCIsXG4gICAgICAgICAgICBcImNvbnRhaW5zXCI6IFwiY29udGFpbnNcIixcbiAgICAgICAgICAgIFwibm90X2NvbnRhaW5zXCI6IFwiZG9lc24ndCBjb250YWluXCIsXG4gICAgICAgICAgICBcImVuZHNfd2l0aFwiOiBcImVuZHMgd2l0aFwiLFxuICAgICAgICAgICAgXCJub3RfZW5kc193aXRoXCI6IFwiZG9lc24ndCBlbmQgd2l0aFwiLFxuICAgICAgICAgICAgXCJpc19lbXB0eVwiOiBcImlzIGVtcHR5XCIsXG4gICAgICAgICAgICBcImlzX25vdF9lbXB0eVwiOiBcImlzIG5vdCBlbXB0eVwiLFxuICAgICAgICAgICAgXCJpc19udWxsXCI6IFwiaXMgbnVsbFwiLFxuICAgICAgICAgICAgXCJpc19ub3RfbnVsbFwiOiBcImlzIG5vdCBudWxsXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlcnJvcnNcIjoge1xuICAgICAgICAgICAgXCJub19maWx0ZXJcIjogXCJObyBmaWx0ZXIgc2VsZWN0ZWRcIixcbiAgICAgICAgICAgIFwiZW1wdHlfZ3JvdXBcIjogXCJUaGUgZ3JvdXAgaXMgZW1wdHlcIixcbiAgICAgICAgICAgIFwicmFkaW9fZW1wdHlcIjogXCJObyB2YWx1ZSBzZWxlY3RlZFwiLFxuICAgICAgICAgICAgXCJjaGVja2JveF9lbXB0eVwiOiBcIk5vIHZhbHVlIHNlbGVjdGVkXCIsXG4gICAgICAgICAgICBcInNlbGVjdF9lbXB0eVwiOiBcIk5vIHZhbHVlIHNlbGVjdGVkXCIsXG4gICAgICAgICAgICBcInN0cmluZ19lbXB0eVwiOiBcIkVtcHR5IHZhbHVlXCIsXG4gICAgICAgICAgICBcInN0cmluZ19leGNlZWRfbWluX2xlbmd0aFwiOiBcIk11c3QgY29udGFpbiBhdCBsZWFzdCB7MH0gY2hhcmFjdGVyc1wiLFxuICAgICAgICAgICAgXCJzdHJpbmdfZXhjZWVkX21heF9sZW5ndGhcIjogXCJNdXN0IG5vdCBjb250YWluIG1vcmUgdGhhbiB7MH0gY2hhcmFjdGVyc1wiLFxuICAgICAgICAgICAgXCJzdHJpbmdfaW52YWxpZF9mb3JtYXRcIjogXCJJbnZhbGlkIGZvcm1hdCAoezB9KVwiLFxuICAgICAgICAgICAgXCJudW1iZXJfbmFuXCI6IFwiTm90IGEgbnVtYmVyXCIsXG4gICAgICAgICAgICBcIm51bWJlcl9ub3RfaW50ZWdlclwiOiBcIk5vdCBhbiBpbnRlZ2VyXCIsXG4gICAgICAgICAgICBcIm51bWJlcl9ub3RfZG91YmxlXCI6IFwiTm90IGEgcmVhbCBudW1iZXJcIixcbiAgICAgICAgICAgIFwibnVtYmVyX2V4Y2VlZF9taW5cIjogXCJNdXN0IGJlIGdyZWF0ZXIgdGhhbiB7MH1cIixcbiAgICAgICAgICAgIFwibnVtYmVyX2V4Y2VlZF9tYXhcIjogXCJNdXN0IGJlIGxvd2VyIHRoYW4gezB9XCIsXG4gICAgICAgICAgICBcIm51bWJlcl93cm9uZ19zdGVwXCI6IFwiTXVzdCBiZSBhIG11bHRpcGxlIG9mIHswfVwiLFxuICAgICAgICAgICAgXCJkYXRldGltZV9lbXB0eVwiOiBcIkVtcHR5IHZhbHVlXCIsXG4gICAgICAgICAgICBcImRhdGV0aW1lX2ludmFsaWRcIjogXCJJbnZhbGlkIGRhdGUgZm9ybWF0ICh7MH0pXCIsXG4gICAgICAgICAgICBcImRhdGV0aW1lX2V4Y2VlZF9taW5cIjogXCJNdXN0IGJlIGFmdGVyIHswfVwiLFxuICAgICAgICAgICAgXCJkYXRldGltZV9leGNlZWRfbWF4XCI6IFwiTXVzdCBiZSBiZWZvcmUgezB9XCIsXG4gICAgICAgICAgICBcImJvb2xlYW5fbm90X3ZhbGlkXCI6IFwiTm90IGEgYm9vbGVhblwiLFxuICAgICAgICAgICAgXCJvcGVyYXRvcl9ub3RfbXVsdGlwbGVcIjogXCJPcGVyYXRvciB7MH0gY2Fubm90IGFjY2VwdCBtdWx0aXBsZSB2YWx1ZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcImludmVydFwiOiBcIkludmVydFwiXG4gICAgfTtcblxuICAgIFF1ZXJ5QnVpbGRlci5kZWZhdWx0cyh7bGFuZ19jb2RlOiAnZW4nfSk7XG59KSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG53aW5kb3cuU1FMUGFyc2VyID0gcmVxdWlyZSgnQHNwcnlrZXIvc3FsLXBhcnNlci1taXN0aWMvYnJvd3Nlci9zcWwtcGFyc2VyJyk7XG5yZXF1aXJlKCdAc3ByeWtlci9qcXVlcnktcXVlcnktYnVpbGRlcicpO1xuXG5mdW5jdGlvbiBTcHJ5a2VyUXVlcnlCdWlsZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5idWlsZGVyID0gbnVsbDtcbiAgICB0aGlzLmRpc3BsYXlRdWVyeUJ1aWxkZXIgPSB0cnVlO1xuICAgIHRoaXMuZ2V0RmlsdGVyc1VybCA9IG9wdGlvbnMuYWpheFVybDtcbiAgICB0aGlzLnNxbCA9IG9wdGlvbnMuc3FsUXVlcnk7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBvcHRpb25zLmlucHV0RWxlbWVudDtcbiAgICB0aGlzLnRhcmdldEVsZW1lbnQgPSBvcHRpb25zLnRhcmdldEVsZW1lbnQ7XG4gICAgdGhpcy5sYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgJ0J1aWxkIFF1ZXJ5JztcbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuYnVpbGRlciA9ICQoc2VsZi50YXJnZXRFbGVtZW50KTtcbiAgICAgICAgc2VsZi5jcmVhdGVCdWlsZGVyKCk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgaWYgKG9wdGlvbnMuZGlzYWJsZVZhbGlkYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgc2VsZi5idWlsZGVyLm9uKCd2YWxpZGF0aW9uRXJyb3IucXVlcnlCdWlsZGVyJywgZnVuY3Rpb24gKGUsIHJ1bGUsIGVycm9yLCB2YWx1ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblNwcnlrZXJRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZUJ1aWxkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgJC5nZXQoc2VsZi5nZXRGaWx0ZXJzVXJsKS5kb25lKGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG4gICAgICAgIHNlbGYuYnVpbGRlci5xdWVyeUJ1aWxkZXIoe1xuICAgICAgICAgICAgZmlsdGVyczogZmlsdGVycyxcbiAgICAgICAgICAgIHNxbE9wZXJhdG9yczogc2VsZi5nZXRTcWxPcGVyYXRvcnMoKSxcbiAgICAgICAgICAgIHNxbFJ1bGVPcGVyYXRvcjogc2VsZi5nZXRTcWxSdWxlT3BlcmF0b3JzKCksXG4gICAgICAgICAgICBhbGxvd19lbXB0eTogdHJ1ZSxcbiAgICAgICAgICAgIGRpc3BsYXlfZW1wdHlfZmlsdGVyOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5idWlsZGVyLnByZXBlbmQoJzxsYWJlbCBjbGFzcz1cImNvbnRyb2wtbGFiZWwgcXVlcnktYnVpbGRlci1sYWJlbFwiPicgKyBzZWxmLmxhYmVsICsgJzwvbGFiZWw+Jyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5zcWwgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuc3FsICE9PSAnJykge1xuICAgICAgICAgICAgc2VsZi5idWlsZGVyLnF1ZXJ5QnVpbGRlcignc2V0UnVsZXNGcm9tU1FMJywgc2VsZi5zcWwpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5TcHJ5a2VyUXVlcnlCdWlsZGVyLnByb3RvdHlwZS50b2dnbGVCdXR0b24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGlucHV0RWxlbWVudENvbnRhaW5lciA9ICQoc2VsZi5pbnB1dEVsZW1lbnQpLnBhcmVudCgpO1xuICAgIHZhciBsYWJlbCA9ICcnO1xuICAgIHZhciBidXR0b24gPSAkKGV2ZW50LnRhcmdldCk7XG5cbiAgICBpZiAoISFzZWxmLmRpc3BsYXlRdWVyeUJ1aWxkZXIpIHtcbiAgICAgICAgc2VsZi5zYXZlUXVlcnkoKTtcbiAgICAgICAgaW5wdXRFbGVtZW50Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgc2VsZi5idWlsZGVyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgc2VsZi5idWlsZGVyLnF1ZXJ5QnVpbGRlcignZGVzdHJveScpO1xuICAgICAgICBzZWxmLmRpc3BsYXlRdWVyeUJ1aWxkZXIgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5idWlsZGVyLmNoaWxkcmVuKCcucXVlcnktYnVpbGRlci1sYWJlbCcpLnJlbW92ZSgpO1xuICAgICAgICBsYWJlbCA9IGJ1dHRvbi5kYXRhKCdsYWJlbC1xdWVyeS1idWlsZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRFbGVtZW50Q29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgc2VsZi5idWlsZGVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgc2VsZi5kaXNwbGF5UXVlcnlCdWlsZGVyID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5zcWwgPSAkKHNlbGYuaW5wdXRFbGVtZW50KS52YWwoKTtcbiAgICAgICAgc2VsZi5jcmVhdGVCdWlsZGVyKCk7XG4gICAgICAgIGxhYmVsID0gYnV0dG9uLmRhdGEoJ2xhYmVsLXBsYWluLXF1ZXJ5Jyk7XG4gICAgfVxuICAgIGJ1dHRvbi50ZXh0KGxhYmVsKTtcbn07XG5cblNwcnlrZXJRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldFNxbE9wZXJhdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluczoge1xuICAgICAgICAgICAgb3A6ICdDT05UQUlOUyA/JyxcbiAgICAgICAgICAgIG1vZDogJ3swfScsXG4gICAgICAgIH0sXG4gICAgICAgIG5vdF9jb250YWluczoge1xuICAgICAgICAgICAgb3A6ICdET0VTIE5PVCBDT05UQUlOID8nLFxuICAgICAgICAgICAgbW9kOiAnezB9JyxcbiAgICAgICAgfSxcbiAgICAgICAgaW46IHtcbiAgICAgICAgICAgIG9wOiAnSVMgSU4gPycsXG4gICAgICAgICAgICBzZXA6ICcsICcsXG4gICAgICAgIH0sXG4gICAgICAgIG5vdF9pbjoge1xuICAgICAgICAgICAgb3A6ICdJUyBOT1QgSU4gPycsXG4gICAgICAgICAgICBzZXA6ICcsICcsXG4gICAgICAgIH0sXG4gICAgfTtcbn07XG5cblNwcnlrZXJRdWVyeUJ1aWxkZXIucHJvdG90eXBlLmdldFNxbFJ1bGVPcGVyYXRvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgQ09OVEFJTlM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbDogdixcbiAgICAgICAgICAgICAgICBvcDogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICdET0VTIE5PVCBDT05UQUlOJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsOiB2LFxuICAgICAgICAgICAgICAgIG9wOiAnbm90X2NvbnRhaW5zJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICdJUyBJTic6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbDogdixcbiAgICAgICAgICAgICAgICBvcDogJ2luJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICdJUyBOT1QgSU4nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWw6IHYsXG4gICAgICAgICAgICAgICAgb3A6ICdub3RfaW4nLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICB9O1xufTtcblxuU3ByeWtlclF1ZXJ5QnVpbGRlci5wcm90b3R5cGUuc2F2ZVF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pbnB1dEVsZW1lbnQucGFyZW50KCkuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc3RhdHVzID0gdGhpcy5idWlsZGVyLnF1ZXJ5QnVpbGRlcignZ2V0UnVsZXMnKSB8fCB7fTtcblxuICAgIGlmICghc3RhdHVzLnJ1bGVzIHx8ICFzdGF0dXMucnVsZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0RWxlbWVudC52YWwoJycpO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB0aGlzLmJ1aWxkZXIucXVlcnlCdWlsZGVyKCdnZXRTUUwnLCBmYWxzZSk7XG4gICAgaWYgKHJlc3VsdCAhPSAnJykge1xuICAgICAgICB0aGlzLmJ1aWxkZXIucXVlcnlCdWlsZGVyKCd2YWxpZGF0ZScpO1xuICAgIH1cbiAgICB0aGlzLmlucHV0RWxlbWVudC52YWwocmVzdWx0LnNxbCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcnlrZXJRdWVyeUJ1aWxkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBTcHJ5a2VyUXVlcnlCdWlsZGVyID0gcmVxdWlyZSgnLi9zcHJ5a2VyLXF1ZXJ5LWJ1aWxkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXRFbGVtZW50SWQsIHRhcmdldEVsZW1lbnRJZCwgZGlzYWJsZVZhbGlkYXRpb24pIHtcbiAgICB2YXIgaW5wdXRFbGVtZW50ID0gJChpbnB1dEVsZW1lbnRJZCk7XG4gICAgJChpbnB1dEVsZW1lbnQpLnBhcmVudCgpLmFkZENsYXNzKCdoaWRkZW4nKTtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBpbnB1dEVsZW1lbnQ6IGlucHV0RWxlbWVudCxcbiAgICAgICAgc3FsUXVlcnk6IGlucHV0RWxlbWVudC52YWwoKSxcbiAgICAgICAgYWpheFVybDogaW5wdXRFbGVtZW50LmRhdGEoJ3VybCcpLFxuICAgICAgICBsYWJlbDogaW5wdXRFbGVtZW50LmRhdGEoJ2xhYmVsJyksXG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IHRhcmdldEVsZW1lbnRJZCxcbiAgICAgICAgZGlzYWJsZVZhbGlkYXRpb246IGRpc2FibGVWYWxpZGF0aW9uIHx8IGZhbHNlLFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFNwcnlrZXJRdWVyeUJ1aWxkZXIob3B0aW9ucyk7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3FsRmFjdG9yeSA9IHJlcXVpcmUoJy4vbGlicy9zcWwtZmFjdG9yeScpO1xuXG5yZXF1aXJlKCdqcXVlcnktZGF0ZXRpbWVwaWNrZXInKTtcbnJlcXVpcmUoJy4uLy4uL3Nhc3MvbWFpbi5zY3NzJyk7XG5cbmZ1bmN0aW9uIHNldERpc2NvdW50QW1vdW50U3ltYm9sKCkge1xuICAgIHZhciB2YWx1ZSA9ICQodGhpcykudmFsKCk7XG4gICAgdmFyICRhbW91bnRBZGRvbiA9ICQoJyNkaXNjb3VudF9kaXNjb3VudENhbGN1bGF0b3JfYW1vdW50ICsgLmlucHV0LWdyb3VwLWFkZG9uJyk7XG5cbiAgICBpZiAoL3BlcmNlbnQvaS50ZXN0KHZhbHVlKSkge1xuICAgICAgICAkYW1vdW50QWRkb24uaHRtbCgnJiMzNzsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkYW1vdW50QWRkb24uaHRtbCgnJmV1cm87Jyk7XG4gICAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNxbENhbGN1bGF0aW9uQnVpbGRlciA9IFNxbEZhY3RvcnkoXG4gICAgICAgICcjZGlzY291bnRfZGlzY291bnRDYWxjdWxhdG9yX2NvbGxlY3Rvcl9xdWVyeV9zdHJpbmcnLFxuICAgICAgICAnI2J1aWxkZXJfY2FsY3VsYXRpb24nLFxuICAgICk7XG4gICAgdmFyIHNxbENvbmRpdGlvbkJ1aWxkZXIgPSBTcWxGYWN0b3J5KFxuICAgICAgICAnI2Rpc2NvdW50X2Rpc2NvdW50Q29uZGl0aW9uX2RlY2lzaW9uX3J1bGVfcXVlcnlfc3RyaW5nJyxcbiAgICAgICAgJyNidWlsZGVyX2NvbmRpdGlvbicsXG4gICAgICAgIHRydWUsXG4gICAgKTtcbiAgICB2YXIgaXNRdWVyeVN0cmluZ0NvbGxlY3RvclNlbGVjdGVkID0gJCgnI2Rpc2NvdW50X2Rpc2NvdW50Q2FsY3VsYXRvcl9jb2xsZWN0b3JTdHJhdGVneVR5cGVfMCcpLmlzKCc6Y2hlY2tlZCcpO1xuXG4gICAgJCgnI2NyZWF0ZS1kaXNjb3VudC1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChpc1F1ZXJ5U3RyaW5nQ29sbGVjdG9yU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHNxbENhbGN1bGF0aW9uQnVpbGRlci5zYXZlUXVlcnkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNxbENvbmRpdGlvbkJ1aWxkZXIuc2F2ZVF1ZXJ5KCk7XG5cbiAgICAgICAgJCgnI2Rpc2NvdW50LWZvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcblxuICAgICQoJyNidG4tY2FsY3VsYXRpb24tZ2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNxbENhbGN1bGF0aW9uQnVpbGRlci50b2dnbGVCdXR0b24oZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgJCgnI2J0bi1jb25kaXRpb24tZ2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNxbENvbmRpdGlvbkJ1aWxkZXIudG9nZ2xlQnV0dG9uKGV2ZW50KTtcbiAgICB9KTtcblxuICAgIHNldERpc2NvdW50QW1vdW50U3ltYm9sLmFwcGx5KCQoJyNkaXNjb3VudF9kaXNjb3VudENhbGN1bGF0b3JfY2FsY3VsYXRvcl9wbHVnaW4nKSk7XG4gICAgJCgnI2Rpc2NvdW50X2Rpc2NvdW50Q2FsY3VsYXRvcl9jYWxjdWxhdG9yX3BsdWdpbicpLm9uKCdjaGFuZ2UnLCBzZXREaXNjb3VudEFtb3VudFN5bWJvbCk7XG5cbiAgICB2YXIgJGlucHV0RnJvbSA9ICQoJyNkaXNjb3VudF9kaXNjb3VudEdlbmVyYWxfdmFsaWRfZnJvbScpO1xuICAgIHZhciAkaW5wdXRUbyA9ICQoJyNkaXNjb3VudF9kaXNjb3VudEdlbmVyYWxfdmFsaWRfdG8nKTtcbiAgICB2YXIgZGVmYXVsdERhdGVGb3JtYXQgPSAnZC5tLlkgSDppJztcbiAgICB2YXIgaW5wdXRGcm9tRm9ybWF0ID0gJGlucHV0RnJvbS5kYXRhKCdmb3JtYXQnKSB8fCBkZWZhdWx0RGF0ZUZvcm1hdDtcbiAgICB2YXIgaW5wdXRUb0Zvcm1hdCA9ICRpbnB1dFRvLmRhdGEoJ2Zvcm1hdCcpIHx8IGRlZmF1bHREYXRlRm9ybWF0O1xuXG4gICAgJGlucHV0RnJvbS5kYXRldGltZXBpY2tlcih7XG4gICAgICAgIGZvcm1hdDogaW5wdXRGcm9tRm9ybWF0LFxuICAgICAgICBkZWZhdWx0VGltZTogJzAwOjAwJyxcbiAgICAgICAgdG9kYXlCdXR0b246IGZhbHNlLFxuICAgICAgICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghJGlucHV0VG8udmFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgbWF4RGF0ZTogJGlucHV0VG8uZGF0ZXRpbWVwaWNrZXIoJ2dldFZhbHVlJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEkaW5wdXRUby52YWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9ICRpbnB1dEZyb20uZGF0ZXRpbWVwaWNrZXIoJ2dldFZhbHVlJyk7XG4gICAgICAgICAgICB2YXIgZW5kRGF0ZSA9ICRpbnB1dFRvLmRhdGV0aW1lcGlja2VyKCdnZXRWYWx1ZScpO1xuICAgICAgICAgICAgaWYgKHN0YXJ0RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICAkaW5wdXRUby5kYXRldGltZXBpY2tlcih7IHZhbHVlOiBzdGFydERhdGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAkaW5wdXRUby5kYXRldGltZXBpY2tlcih7XG4gICAgICAgIGZvcm1hdDogaW5wdXRUb0Zvcm1hdCxcbiAgICAgICAgZGVmYXVsdFRpbWU6ICcwMDowMCcsXG4gICAgICAgIHRvZGF5QnV0dG9uOiBmYWxzZSxcbiAgICAgICAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISRpbnB1dEZyb20udmFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgbWluRGF0ZTogJGlucHV0RnJvbS5kYXRldGltZXBpY2tlcignZ2V0VmFsdWUnKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISRpbnB1dEZyb20udmFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdGFydERhdGUgPSAkaW5wdXRGcm9tLmRhdGV0aW1lcGlja2VyKCdnZXRWYWx1ZScpO1xuICAgICAgICAgICAgdmFyIGVuZERhdGUgPSAkaW5wdXRUby5kYXRldGltZXBpY2tlcignZ2V0VmFsdWUnKTtcbiAgICAgICAgICAgIGlmIChzdGFydERhdGUgPiBlbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgJGlucHV0RnJvbS5kYXRldGltZXBpY2tlcih7IHZhbHVlOiBlbmREYXRlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgJCgnI2Rpc2NvdW50X2Rpc2NvdW50Q2FsY3VsYXRvcl9jb2xsZWN0b3JTdHJhdGVneVR5cGUgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAkKCcjY29sbGVjdG9yLXR5cGUtJyArICQoZWxlbWVudCkudmFsKCkpLmhpZGUoKTtcbiAgICAgICAgaWYgKCQoZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQoJyNjb2xsZWN0b3ItdHlwZS0nICsgJChlbGVtZW50KS52YWwoKSkuc2hvdygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjZGlzY291bnRfZGlzY291bnRDYWxjdWxhdG9yX2NvbGxlY3RvclN0cmF0ZWd5VHlwZSBpbnB1dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAkKCcjZGlzY291bnRfZGlzY291bnRDYWxjdWxhdG9yX2NvbGxlY3RvclN0cmF0ZWd5VHlwZSBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKCcjY29sbGVjdG9yLXR5cGUtJyArICQoZWxlbWVudCkudmFsKCkpLmhpZGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2NvbGxlY3Rvci10eXBlLScgKyAkKGV2ZW50LnRhcmdldCkudmFsKCkpLnNob3coKTtcbiAgICB9KTtcblxuICAgICQoJyNkaXNjb3VudF9kaXNjb3VudENhbGN1bGF0b3JfY2FsY3VsYXRvcl9wbHVnaW4nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICQoJy5kaXNjb3VudC1jYWxjdWxhdGlvbi1pbnB1dC10eXBlJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgYWN0aXZlQ2FsY3VsYXRvcklucHV0VHlwZSA9ICQoJyNkaXNjb3VudF9kaXNjb3VudENhbGN1bGF0b3JfY2FsY3VsYXRvcl9wbHVnaW4gOnNlbGVjdGVkJykuZGF0YShcbiAgICAgICAgICAgICdjYWxjdWxhdG9yLWlucHV0LXR5cGUnLFxuICAgICAgICApO1xuICAgICAgICAkKCcjJyArIGFjdGl2ZUNhbGN1bGF0b3JJbnB1dFR5cGUpLnNob3coKTtcbiAgICB9KTtcblxuICAgIHZhciBhY3RpdmVDYWxjdWxhdG9ySW5wdXRUeXBlID0gJCgnI2Rpc2NvdW50X2Rpc2NvdW50Q2FsY3VsYXRvcl9jYWxjdWxhdG9yX3BsdWdpbiA6c2VsZWN0ZWQnKS5kYXRhKFxuICAgICAgICAnY2FsY3VsYXRvci1pbnB1dC10eXBlJyxcbiAgICApO1xuICAgICQoJyMnICsgYWN0aXZlQ2FsY3VsYXRvcklucHV0VHlwZSkuc2hvdygpO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluJyk7XG4iLCIvKiFcbiAqIFNRTFBhcnNlciAxLjIuM1xuICogQ29weXJpZ2h0IDIwMTItMjAxNSBBbmR5IEtlbnQgPGFuZHlAZm9yd2FyZC5jby51az5cbiAqIENvcHlyaWdodCAyMDE1LTIwMTggRGFtaWVuIFwiTWlzdGljXCIgU29yZWwgKGh0dHBzOi8vd3d3LnN0cmFuZ2VwbGFuZXQuZnIpXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQpXG4gKi9cbihmdW5jdGlvbihyb290KSB7XG4gIHZhciBTUUxQYXJzZXIgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiByZXF1aXJlKHBhdGgpeyByZXR1cm4gcmVxdWlyZVtwYXRoXTsgfVxuICAgIHJlcXVpcmVbJy4vbGV4ZXInXSA9IG5ldyBmdW5jdGlvbigpIHtcbiAgdmFyIGV4cG9ydHMgPSB0aGlzO1xuICAvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuOC4wXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBMZXhlcjtcblxuICBMZXhlciA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgQk9PTEVBTiwgREJMU1RSSU5HLCBMSVRFUkFMLCBNQVRILCBNQVRIX01VTFRJLCBOVU1CRVIsIFBBUkFNRVRFUiwgU0VQQVJBVE9SLCBTUUxfQkVUV0VFTlMsIFNRTF9DT05ESVRJT05BTFMsIFNRTF9GVU5DVElPTlMsIFNRTF9PUEVSQVRPUlMsIFNRTF9TT1JUX09SREVSUywgU1RBUiwgU1RSSU5HLCBTVUJfU0VMRUNUX09QLCBTVUJfU0VMRUNUX1VOQVJZX09QLCBXSElURVNQQUNFO1xuXG4gICAgZnVuY3Rpb24gTGV4ZXIoc3FsLCBvcHRzKSB7XG4gICAgICB2YXIgYnl0ZXNDb25zdW1lZCwgaTtcbiAgICAgIGlmIChvcHRzID09IG51bGwpIHtcbiAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgfVxuICAgICAgdGhpcy5zcWwgPSBzcWw7XG4gICAgICB0aGlzLnByZXNlcnZlV2hpdGVzcGFjZSA9IG9wdHMucHJlc2VydmVXaGl0ZXNwYWNlIHx8IGZhbHNlO1xuICAgICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICAgIHRoaXMuY3VycmVudExpbmUgPSAxO1xuICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0ID0gMDtcbiAgICAgIGkgPSAwO1xuICAgICAgd2hpbGUgKHRoaXMuY2h1bmsgPSBzcWwuc2xpY2UoaSkpIHtcbiAgICAgICAgYnl0ZXNDb25zdW1lZCA9IHRoaXMua2V5d29yZFRva2VuKCkgfHwgdGhpcy5zdGFyVG9rZW4oKSB8fCB0aGlzLmJvb2xlYW5Ub2tlbigpIHx8IHRoaXMuZnVuY3Rpb25Ub2tlbigpIHx8IHRoaXMud2luZG93RXh0ZW5zaW9uKCkgfHwgdGhpcy5zb3J0T3JkZXJUb2tlbigpIHx8IHRoaXMuc2VwZXJhdG9yVG9rZW4oKSB8fCB0aGlzLm9wZXJhdG9yVG9rZW4oKSB8fCB0aGlzLm51bWJlclRva2VuKCkgfHwgdGhpcy5tYXRoVG9rZW4oKSB8fCB0aGlzLmRvdFRva2VuKCkgfHwgdGhpcy5jb25kaXRpb25hbFRva2VuKCkgfHwgdGhpcy5iZXR3ZWVuVG9rZW4oKSB8fCB0aGlzLnN1YlNlbGVjdE9wVG9rZW4oKSB8fCB0aGlzLnN1YlNlbGVjdFVuYXJ5T3BUb2tlbigpIHx8IHRoaXMuc3RyaW5nVG9rZW4oKSB8fCB0aGlzLnBhcmFtZXRlclRva2VuKCkgfHwgdGhpcy5wYXJlbnNUb2tlbigpIHx8IHRoaXMud2hpdGVzcGFjZVRva2VuKCkgfHwgdGhpcy5saXRlcmFsVG9rZW4oKTtcbiAgICAgICAgaWYgKGJ5dGVzQ29uc3VtZWQgPCAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTk9USElORyBDT05TVU1FRDogU3RvcHBlZCBhdCAtICdcIiArICh0aGlzLmNodW5rLnNsaWNlKDAsIDMwKSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICAgICAgaSArPSBieXRlc0NvbnN1bWVkO1xuICAgICAgICB0aGlzLmN1cnJlbnRPZmZzZXQgKz0gYnl0ZXNDb25zdW1lZDtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9rZW4oJ0VPRicsICcnKTtcbiAgICAgIHRoaXMucG9zdFByb2Nlc3MoKTtcbiAgICB9XG5cbiAgICBMZXhlci5wcm90b3R5cGUucG9zdFByb2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBuZXh0X3Rva2VuLCB0b2tlbiwgX2ksIF9sZW4sIF9yZWYsIF9yZXN1bHRzO1xuICAgICAgX3JlZiA9IHRoaXMudG9rZW5zO1xuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XG4gICAgICAgIHRva2VuID0gX3JlZltpXTtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAnU1RBUicpIHtcbiAgICAgICAgICBuZXh0X3Rva2VuID0gdGhpcy50b2tlbnNbaSArIDFdO1xuICAgICAgICAgIGlmICghKG5leHRfdG9rZW5bMF0gPT09ICdTRVBBUkFUT1InIHx8IG5leHRfdG9rZW5bMF0gPT09ICdGUk9NJykpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godG9rZW5bMF0gPSAnTUFUSF9NVUxUSScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUudG9rZW4gPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5zLnB1c2goW25hbWUsIHZhbHVlLCB0aGlzLmN1cnJlbnRMaW5lLCB0aGlzLmN1cnJlbnRPZmZzZXRdKTtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLnRva2VuaXplRnJvbVN0cmluZ1JlZ2V4ID0gZnVuY3Rpb24obmFtZSwgcmVnZXgsIHBhcnQsIGxlbmd0aFBhcnQsIG91dHB1dCkge1xuICAgICAgdmFyIG1hdGNoLCBwYXJ0TWF0Y2g7XG4gICAgICBpZiAocGFydCA9PSBudWxsKSB7XG4gICAgICAgIHBhcnQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGxlbmd0aFBhcnQgPT0gbnVsbCkge1xuICAgICAgICBsZW5ndGhQYXJ0ID0gcGFydDtcbiAgICAgIH1cbiAgICAgIGlmIChvdXRwdXQgPT0gbnVsbCkge1xuICAgICAgICBvdXRwdXQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCEobWF0Y2ggPSByZWdleC5leGVjKHRoaXMuY2h1bmspKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHBhcnRNYXRjaCA9IG1hdGNoW3BhcnRdLnJlcGxhY2UoLycnL2csIFwiJ1wiKTtcbiAgICAgIGlmIChvdXRwdXQpIHtcbiAgICAgICAgdGhpcy50b2tlbihuYW1lLCBwYXJ0TWF0Y2gpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoW2xlbmd0aFBhcnRdLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLnRva2VuaXplRnJvbVJlZ2V4ID0gZnVuY3Rpb24obmFtZSwgcmVnZXgsIHBhcnQsIGxlbmd0aFBhcnQsIG91dHB1dCkge1xuICAgICAgdmFyIG1hdGNoLCBwYXJ0TWF0Y2g7XG4gICAgICBpZiAocGFydCA9PSBudWxsKSB7XG4gICAgICAgIHBhcnQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGxlbmd0aFBhcnQgPT0gbnVsbCkge1xuICAgICAgICBsZW5ndGhQYXJ0ID0gcGFydDtcbiAgICAgIH1cbiAgICAgIGlmIChvdXRwdXQgPT0gbnVsbCkge1xuICAgICAgICBvdXRwdXQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCEobWF0Y2ggPSByZWdleC5leGVjKHRoaXMuY2h1bmspKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHBhcnRNYXRjaCA9IG1hdGNoW3BhcnRdO1xuICAgICAgaWYgKG91dHB1dCkge1xuICAgICAgICB0aGlzLnRva2VuKG5hbWUsIHBhcnRNYXRjaCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hbbGVuZ3RoUGFydF0ubGVuZ3RoO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUudG9rZW5pemVGcm9tV29yZCA9IGZ1bmN0aW9uKG5hbWUsIHdvcmQpIHtcbiAgICAgIHZhciBtYXRjaCwgbWF0Y2hlcjtcbiAgICAgIGlmICh3b3JkID09IG51bGwpIHtcbiAgICAgICAgd29yZCA9IG5hbWU7XG4gICAgICB9XG4gICAgICB3b3JkID0gdGhpcy5yZWdleEVzY2FwZSh3b3JkKTtcbiAgICAgIG1hdGNoZXIgPSAvXlxcdyskLy50ZXN0KHdvcmQpID8gbmV3IFJlZ0V4cChcIl4oXCIgKyB3b3JkICsgXCIpXFxcXGJcIiwgJ2lnJykgOiBuZXcgUmVnRXhwKFwiXihcIiArIHdvcmQgKyBcIilcIiwgJ2lnJyk7XG4gICAgICBtYXRjaCA9IG1hdGNoZXIuZXhlYyh0aGlzLmNodW5rKTtcbiAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICB0aGlzLnRva2VuKG5hbWUsIG1hdGNoWzFdKTtcbiAgICAgIHJldHVybiBtYXRjaFsxXS5sZW5ndGg7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS50b2tlbml6ZUZyb21MaXN0ID0gZnVuY3Rpb24obmFtZSwgbGlzdCkge1xuICAgICAgdmFyIGVudHJ5LCByZXQsIF9pLCBfbGVuO1xuICAgICAgcmV0ID0gMDtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gbGlzdC5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBlbnRyeSA9IGxpc3RbX2ldO1xuICAgICAgICByZXQgPSB0aGlzLnRva2VuaXplRnJvbVdvcmQobmFtZSwgZW50cnkpO1xuICAgICAgICBpZiAocmV0ID4gMCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUua2V5d29yZFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdTRUxFQ1QnKSB8fCB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ0lOU0VSVCcpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnSU5UTycpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnREVGQVVMVCcpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnVkFMVUVTJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdESVNUSU5DVCcpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnRlJPTScpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnV0hFUkUnKSB8fCB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ0dST1VQJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdPUkRFUicpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnQlknKSB8fCB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ0hBVklORycpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnTElNSVQnKSB8fCB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ0pPSU4nKSB8fCB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ0xFRlQnKSB8fCB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ1JJR0hUJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdJTk5FUicpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnT1VURVInKSB8fCB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ09OJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdBUycpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnQ0FTRScpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnV0hFTicpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnVEhFTicpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnRUxTRScpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnRU5EJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdVTklPTicpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnQUxMJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdMSU1JVCcpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnT0ZGU0VUJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdGRVRDSCcpIHx8IHRoaXMudG9rZW5pemVGcm9tV29yZCgnUk9XJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdST1dTJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdPTkxZJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdORVhUJykgfHwgdGhpcy50b2tlbml6ZUZyb21Xb3JkKCdGSVJTVCcpO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUuZG90VG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuaXplRnJvbVdvcmQoJ0RPVCcsICcuJyk7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5vcGVyYXRvclRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21MaXN0KCdPUEVSQVRPUicsIFNRTF9PUEVSQVRPUlMpO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUubWF0aFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21MaXN0KCdNQVRIJywgTUFUSCkgfHwgdGhpcy50b2tlbml6ZUZyb21MaXN0KCdNQVRIX01VTFRJJywgTUFUSF9NVUxUSSk7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5jb25kaXRpb25hbFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21MaXN0KCdDT05ESVRJT05BTCcsIFNRTF9DT05ESVRJT05BTFMpO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUuYmV0d2VlblRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21MaXN0KCdCRVRXRUVOJywgU1FMX0JFVFdFRU5TKTtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLnN1YlNlbGVjdE9wVG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuaXplRnJvbUxpc3QoJ1NVQl9TRUxFQ1RfT1AnLCBTVUJfU0VMRUNUX09QKTtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLnN1YlNlbGVjdFVuYXJ5T3BUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5pemVGcm9tTGlzdCgnU1VCX1NFTEVDVF9VTkFSWV9PUCcsIFNVQl9TRUxFQ1RfVU5BUllfT1ApO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUuZnVuY3Rpb25Ub2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5pemVGcm9tTGlzdCgnRlVOQ1RJT04nLCBTUUxfRlVOQ1RJT05TKTtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLnNvcnRPcmRlclRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21MaXN0KCdESVJFQ1RJT04nLCBTUUxfU09SVF9PUkRFUlMpO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUuYm9vbGVhblRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21MaXN0KCdCT09MRUFOJywgQk9PTEVBTik7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5zdGFyVG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuaXplRnJvbVJlZ2V4KCdTVEFSJywgU1RBUik7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5zZXBlcmF0b3JUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5pemVGcm9tUmVnZXgoJ1NFUEFSQVRPUicsIFNFUEFSQVRPUik7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5saXRlcmFsVG9rZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuaXplRnJvbVJlZ2V4KCdMSVRFUkFMJywgTElURVJBTCwgMSwgMCk7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5udW1iZXJUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5pemVGcm9tUmVnZXgoJ05VTUJFUicsIE5VTUJFUik7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5wYXJhbWV0ZXJUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5pemVGcm9tUmVnZXgoJ1BBUkFNRVRFUicsIFBBUkFNRVRFUiwgMSwgMCk7XG4gICAgfTtcblxuICAgIExleGVyLnByb3RvdHlwZS5zdHJpbmdUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5pemVGcm9tU3RyaW5nUmVnZXgoJ1NUUklORycsIFNUUklORywgMSwgMCkgfHwgdGhpcy50b2tlbml6ZUZyb21SZWdleCgnREJMU1RSSU5HJywgREJMU1RSSU5HLCAxLCAwKTtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLnBhcmVuc1Rva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbml6ZUZyb21SZWdleCgnTEVGVF9QQVJFTicsIC9eXFwoLykgfHwgdGhpcy50b2tlbml6ZUZyb21SZWdleCgnUklHSFRfUEFSRU4nLCAvXlxcKS8pO1xuICAgIH07XG5cbiAgICBMZXhlci5wcm90b3R5cGUud2luZG93RXh0ZW5zaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbWF0Y2g7XG4gICAgICBtYXRjaCA9IC9eXFwuKHdpbik6KGxlbmd0aHx0aW1lKS9pLmV4ZWModGhpcy5jaHVuayk7XG4gICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgdGhpcy50b2tlbignV0lORE9XJywgbWF0Y2hbMV0pO1xuICAgICAgdGhpcy50b2tlbignV0lORE9XX0ZVTkNUSU9OJywgbWF0Y2hbMl0pO1xuICAgICAgcmV0dXJuIG1hdGNoWzBdLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLndoaXRlc3BhY2VUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1hdGNoLCBuZXdsaW5lcywgcGFydE1hdGNoO1xuICAgICAgaWYgKCEobWF0Y2ggPSBXSElURVNQQUNFLmV4ZWModGhpcy5jaHVuaykpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgcGFydE1hdGNoID0gbWF0Y2hbMF07XG4gICAgICBpZiAodGhpcy5wcmVzZXJ2ZVdoaXRlc3BhY2UpIHtcbiAgICAgICAgdGhpcy50b2tlbignV0hJVEVTUEFDRScsIHBhcnRNYXRjaCk7XG4gICAgICB9XG4gICAgICBuZXdsaW5lcyA9IHBhcnRNYXRjaC5tYXRjaCgvXFxuL2csICcnKTtcbiAgICAgIHRoaXMuY3VycmVudExpbmUgKz0gKG5ld2xpbmVzICE9IG51bGwgPyBuZXdsaW5lcy5sZW5ndGggOiB2b2lkIDApIHx8IDA7XG4gICAgICByZXR1cm4gcGFydE1hdGNoLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgTGV4ZXIucHJvdG90eXBlLnJlZ2V4RXNjYXBlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCBcIlxcXFwkJlwiKTtcbiAgICB9O1xuXG4gICAgU1FMX0ZVTkNUSU9OUyA9IFsnQVZHJywgJ0NPVU5UJywgJ01JTicsICdNQVgnLCAnU1VNJ107XG5cbiAgICBTUUxfU09SVF9PUkRFUlMgPSBbJ0FTQycsICdERVNDJ107XG5cbiAgICBTUUxfT1BFUkFUT1JTID0gWyc9JywgJyE9JywgJz49JywgJz4nLCAnPD0nLCAnPD4nLCAnPCcsICdMSUtFJywgJ0NPTlRBSU5TJywgJ0RPRVMgTk9UIENPTlRBSU4nLCAnSVMgSU4nLCAnSVMgTk9UIElOJ107XG5cbiAgICBTVUJfU0VMRUNUX09QID0gWydBTlknLCAnQUxMJywgJ1NPTUUnXTtcblxuICAgIFNVQl9TRUxFQ1RfVU5BUllfT1AgPSBbJ0VYSVNUUyddO1xuXG4gICAgU1FMX0NPTkRJVElPTkFMUyA9IFsnQU5EJywgJ09SJ107XG5cbiAgICBTUUxfQkVUV0VFTlMgPSBbJ0JFVFdFRU4nLCAnTk9UIEJFVFdFRU4nXTtcblxuICAgIEJPT0xFQU4gPSBbJ1RSVUUnLCAnRkFMU0UnLCAnTlVMTCddO1xuXG4gICAgTUFUSCA9IFsnKycsICctJywgJ3x8JywgJyYmJ107XG5cbiAgICBNQVRIX01VTFRJID0gWycvJywgJyonXTtcblxuICAgIFNUQVIgPSAvXlxcKi87XG5cbiAgICBTRVBBUkFUT1IgPSAvXiwvO1xuXG4gICAgV0hJVEVTUEFDRSA9IC9eWyBcXG5cXHJdKy87XG5cbiAgICBMSVRFUkFMID0gL15gPyhbYS16X1xcLV1bYS16MC05X1xcLV17MCx9KFxcOihudW1iZXJ8ZmxvYXR8c3RyaW5nfGRhdGV8Ym9vbGVhbikpPylgPy9pO1xuXG4gICAgUEFSQU1FVEVSID0gL15cXCQoW2EtejAtOV9dKyhcXDoobnVtYmVyfGZsb2F0fHN0cmluZ3xkYXRlfGJvb2xlYW4pKT8pLztcblxuICAgIE5VTUJFUiA9IC9eWystXT9bMC05XSsoXFwuWzAtOV0rKT8vO1xuXG4gICAgU1RSSU5HID0gL14nKCg/OlteXFxcXCddKz98XFxcXC58JycpKiknKD8hJykvO1xuXG4gICAgREJMU1RSSU5HID0gL15cIihbXlxcXFxcIl0qKD86XFxcXC5bXlxcXFxcIl0qKSopXCIvO1xuXG4gICAgcmV0dXJuIExleGVyO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy50b2tlbml6ZSA9IGZ1bmN0aW9uKHNxbCwgb3B0cykge1xuICAgIHJldHVybiAobmV3IExleGVyKHNxbCwgb3B0cykpLnRva2VucztcbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcblxufTtyZXF1aXJlWycuL2NvbXBpbGVkX3BhcnNlciddID0gbmV3IGZ1bmN0aW9uKCkge1xuICB2YXIgZXhwb3J0cyA9IHRoaXM7XG4gIC8qIHBhcnNlciBnZW5lcmF0ZWQgYnkgamlzb24gMC40LjE1ICovXG4vKlxuICBSZXR1cm5zIGEgUGFyc2VyIG9iamVjdCBvZiB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcblxuICBQYXJzZXI6IHtcbiAgICB5eToge31cbiAgfVxuXG4gIFBhcnNlci5wcm90b3R5cGU6IHtcbiAgICB5eToge30sXG4gICAgdHJhY2U6IGZ1bmN0aW9uKCksXG4gICAgc3ltYm9sc186IHthc3NvY2lhdGl2ZSBsaXN0OiBuYW1lID09PiBudW1iZXJ9LFxuICAgIHRlcm1pbmFsc186IHthc3NvY2lhdGl2ZSBsaXN0OiBudW1iZXIgPT0+IG5hbWV9LFxuICAgIHByb2R1Y3Rpb25zXzogWy4uLl0sXG4gICAgcGVyZm9ybUFjdGlvbjogZnVuY3Rpb24gYW5vbnltb3VzKHl5dGV4dCwgeXlsZW5nLCB5eWxpbmVubywgeXksIHl5c3RhdGUsICQkLCBfJCksXG4gICAgdGFibGU6IFsuLi5dLFxuICAgIGRlZmF1bHRBY3Rpb25zOiB7Li4ufSxcbiAgICBwYXJzZUVycm9yOiBmdW5jdGlvbihzdHIsIGhhc2gpLFxuICAgIHBhcnNlOiBmdW5jdGlvbihpbnB1dCksXG5cbiAgICBsZXhlcjoge1xuICAgICAgICBFT0Y6IDEsXG4gICAgICAgIHBhcnNlRXJyb3I6IGZ1bmN0aW9uKHN0ciwgaGFzaCksXG4gICAgICAgIHNldElucHV0OiBmdW5jdGlvbihpbnB1dCksXG4gICAgICAgIGlucHV0OiBmdW5jdGlvbigpLFxuICAgICAgICB1bnB1dDogZnVuY3Rpb24oc3RyKSxcbiAgICAgICAgbW9yZTogZnVuY3Rpb24oKSxcbiAgICAgICAgbGVzczogZnVuY3Rpb24obiksXG4gICAgICAgIHBhc3RJbnB1dDogZnVuY3Rpb24oKSxcbiAgICAgICAgdXBjb21pbmdJbnB1dDogZnVuY3Rpb24oKSxcbiAgICAgICAgc2hvd1Bvc2l0aW9uOiBmdW5jdGlvbigpLFxuICAgICAgICB0ZXN0X21hdGNoOiBmdW5jdGlvbihyZWdleF9tYXRjaF9hcnJheSwgcnVsZV9pbmRleCksXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCksXG4gICAgICAgIGxleDogZnVuY3Rpb24oKSxcbiAgICAgICAgYmVnaW46IGZ1bmN0aW9uKGNvbmRpdGlvbiksXG4gICAgICAgIHBvcFN0YXRlOiBmdW5jdGlvbigpLFxuICAgICAgICBfY3VycmVudFJ1bGVzOiBmdW5jdGlvbigpLFxuICAgICAgICB0b3BTdGF0ZTogZnVuY3Rpb24oKSxcbiAgICAgICAgcHVzaFN0YXRlOiBmdW5jdGlvbihjb25kaXRpb24pLFxuXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHJhbmdlczogYm9vbGVhbiAgICAgICAgICAgKG9wdGlvbmFsOiB0cnVlID09PiB0b2tlbiBsb2NhdGlvbiBpbmZvIHdpbGwgaW5jbHVkZSBhIC5yYW5nZVtdIG1lbWJlcilcbiAgICAgICAgICAgIGZsZXg6IGJvb2xlYW4gICAgICAgICAgICAgKG9wdGlvbmFsOiB0cnVlID09PiBmbGV4LWxpa2UgbGV4aW5nIGJlaGF2aW91ciB3aGVyZSB0aGUgcnVsZXMgYXJlIHRlc3RlZCBleGhhdXN0aXZlbHkgdG8gZmluZCB0aGUgbG9uZ2VzdCBtYXRjaClcbiAgICAgICAgICAgIGJhY2t0cmFja19sZXhlcjogYm9vbGVhbiAgKG9wdGlvbmFsOiB0cnVlID09PiBsZXhlciByZWdleGVzIGFyZSB0ZXN0ZWQgaW4gb3JkZXIgYW5kIGZvciBlYWNoIG1hdGNoaW5nIHJlZ2V4IHRoZSBhY3Rpb24gY29kZSBpcyBpbnZva2VkOyB0aGUgbGV4ZXIgdGVybWluYXRlcyB0aGUgc2NhbiB3aGVuIGEgdG9rZW4gaXMgcmV0dXJuZWQgYnkgdGhlIGFjdGlvbiBjb2RlKVxuICAgICAgICB9LFxuXG4gICAgICAgIHBlcmZvcm1BY3Rpb246IGZ1bmN0aW9uKHl5LCB5eV8sICRhdm9pZGluZ19uYW1lX2NvbGxpc2lvbnMsIFlZX1NUQVJUKSxcbiAgICAgICAgcnVsZXM6IFsuLi5dLFxuICAgICAgICBjb25kaXRpb25zOiB7YXNzb2NpYXRpdmUgbGlzdDogbmFtZSA9PT4gc2V0fSxcbiAgICB9XG4gIH1cblxuXG4gIHRva2VuIGxvY2F0aW9uIGluZm8gKEAkLCBfJCwgZXRjLik6IHtcbiAgICBmaXJzdF9saW5lOiBuLFxuICAgIGxhc3RfbGluZTogbixcbiAgICBmaXJzdF9jb2x1bW46IG4sXG4gICAgbGFzdF9jb2x1bW46IG4sXG4gICAgcmFuZ2U6IFtzdGFydF9udW1iZXIsIGVuZF9udW1iZXJdICAgICAgICh3aGVyZSB0aGUgbnVtYmVycyBhcmUgaW5kZXhlcyBpbnRvIHRoZSBpbnB1dCBzdHJpbmcsIHJlZ3VsYXIgemVyby1iYXNlZClcbiAgfVxuXG5cbiAgdGhlIHBhcnNlRXJyb3IgZnVuY3Rpb24gcmVjZWl2ZXMgYSAnaGFzaCcgb2JqZWN0IHdpdGggdGhlc2UgbWVtYmVycyBmb3IgbGV4ZXIgYW5kIHBhcnNlciBlcnJvcnM6IHtcbiAgICB0ZXh0OiAgICAgICAgKG1hdGNoZWQgdGV4dClcbiAgICB0b2tlbjogICAgICAgKHRoZSBwcm9kdWNlZCB0ZXJtaW5hbCB0b2tlbiwgaWYgYW55KVxuICAgIGxpbmU6ICAgICAgICAoeXlsaW5lbm8pXG4gIH1cbiAgd2hpbGUgcGFyc2VyIChncmFtbWFyKSBlcnJvcnMgd2lsbCBhbHNvIHByb3ZpZGUgdGhlc2UgbWVtYmVycywgaS5lLiBwYXJzZXIgZXJyb3JzIGRlbGl2ZXIgYSBzdXBlcnNldCBvZiBhdHRyaWJ1dGVzOiB7XG4gICAgbG9jOiAgICAgICAgICh5eWxsb2MpXG4gICAgZXhwZWN0ZWQ6ICAgIChzdHJpbmcgZGVzY3JpYmluZyB0aGUgc2V0IG9mIGV4cGVjdGVkIHRva2VucylcbiAgICByZWNvdmVyYWJsZTogKGJvb2xlYW46IFRSVUUgd2hlbiB0aGUgcGFyc2VyIGhhcyBhIGVycm9yIHJlY292ZXJ5IHJ1bGUgYXZhaWxhYmxlIGZvciB0aGlzIHBhcnRpY3VsYXIgZXJyb3IpXG4gIH1cbiovXG52YXIgcGFyc2VyID0gKGZ1bmN0aW9uKCl7XG52YXIgbz1mdW5jdGlvbihrLHYsbyxsKXtmb3Iobz1vfHx7fSxsPWsubGVuZ3RoO2wtLTtvW2tbbF1dPXYpO3JldHVybiBvfSwkVjA9WzEsOF0sJFYxPVs1LDI2XSwkVjI9WzEsMTRdLCRWMz1bMSwxM10sJFY0PVs1LDI2LDMxLDQyXSwkVjU9WzEsMTddLCRWNj1bNSwyNiwzMSw0Miw0NSw2Ml0sJFY3PVsxLDI3XSwkVjg9WzEsMjldLCRWOT1bMSw0MF0sJFZhPVsxLDQyXSwkVmI9WzEsNDZdLCRWYz1bMSw0N10sJFZkPVsxLDQzXSwkVmU9WzEsNDRdLCRWZj1bMSw0MV0sJFZnPVsxLDQ1XSwkVmg9WzEsMjVdLCRWaT1bNSwyNiwzMV0sJFZqPVs1LDI2LDMxLDQyLDQ1XSwkVms9WzEsNTldLCRWbD1bMTgsNDNdLCRWbT1bMSw2Ml0sJFZuPVsxLDYzXSwkVm89WzEsNjRdLCRWcD1bMSw2NV0sJFZxPVsxLDY2XSwkVnI9WzUsMTgsMjMsMjYsMzEsMzQsMzcsMzgsNDEsNDIsNDMsNDUsNjIsNjQsNjUsNjYsNjcsNjgsNzAsNzgsODEsODIsODNdLCRWcz1bNSwxOCwyMywyNiwzMSwzNCwzNywzOCw0MSw0Miw0Myw0NCw0NSw1MSw2Miw2NCw2NSw2Niw2Nyw2OCw3MCw3MSw3OCw4MSw4Miw4Myw4OSw5MCw5MSw5Miw5Myw5NCw5Nl0sJFZ0PVsxLDc0XSwkVnU9WzEsNzddLCRWdj1bMiw5M10sJFZ3PVsxLDkxXSwkVng9WzEsOTJdLCRWeT1bNSwxOCwyMywyNiwzMSwzNCwzNywzOCw0MSw0Miw0Myw0NSw2Miw2NCw2NSw2Niw2Nyw2OCw3MCw3OCw4MSw4Miw4Myw4OSw5MCw5MSw5Miw5Myw5NCw5Nl0sJFZ6PVs3OCw4MSw4M10sJFZBPVsxLDExNl0sJFZCPVs1LDI2LDMxLDQyLDQzLDQ0XSwkVkM9WzEsMTI0XSwkVkQ9WzUsMjYsMzEsNDIsNDMsNDUsNjRdLCRWRT1bNSwyNiwzMSw0MSw0Miw0NSw2Ml0sJFZGPVsxLDEyN10sJFZHPVsxLDEyOF0sJFZIPVsxLDEyOV0sJFZJPVs1LDI2LDMxLDM0LDM1LDM3LDM4LDQxLDQyLDQ1LDYyXSwkVko9WzUsMTgsMjMsMjYsMzEsMzQsMzcsMzgsNDEsNDIsNDMsNDUsNjIsNjQsNzAsNzgsODEsODIsODNdLCRWSz1bNSwyNiwzMSwzNCwzNywzOCw0MSw0Miw0NSw2Ml0sJFZMPVs1LDI2LDMxLDQyLDU2LDU4XTtcbnZhciBwYXJzZXIgPSB7dHJhY2U6IGZ1bmN0aW9uIHRyYWNlICgpIHsgfSxcbnl5OiB7fSxcbnN5bWJvbHNfOiB7XCJlcnJvclwiOjIsXCJSb290XCI6MyxcIlF1ZXJ5XCI6NCxcIkVPRlwiOjUsXCJTZWxlY3RRdWVyeVwiOjYsXCJVbmlvbnNcIjo3LFwiU2VsZWN0V2l0aExpbWl0UXVlcnlcIjo4LFwiQmFzaWNTZWxlY3RRdWVyeVwiOjksXCJTZWxlY3RcIjoxMCxcIk9yZGVyQ2xhdXNlXCI6MTEsXCJHcm91cENsYXVzZVwiOjEyLFwiTGltaXRDbGF1c2VcIjoxMyxcIlNlbGVjdENsYXVzZVwiOjE0LFwiV2hlcmVDbGF1c2VcIjoxNSxcIlNFTEVDVFwiOjE2LFwiRmllbGRzXCI6MTcsXCJGUk9NXCI6MTgsXCJUYWJsZVwiOjE5LFwiRElTVElOQ1RcIjoyMCxcIkpvaW5zXCI6MjEsXCJMaXRlcmFsXCI6MjIsXCJBU1wiOjIzLFwiTEVGVF9QQVJFTlwiOjI0LFwiTGlzdFwiOjI1LFwiUklHSFRfUEFSRU5cIjoyNixcIldJTkRPV1wiOjI3LFwiV0lORE9XX0ZVTkNUSU9OXCI6MjgsXCJOdW1iZXJcIjoyOSxcIlVuaW9uXCI6MzAsXCJVTklPTlwiOjMxLFwiQUxMXCI6MzIsXCJKb2luXCI6MzMsXCJKT0lOXCI6MzQsXCJPTlwiOjM1LFwiRXhwcmVzc2lvblwiOjM2LFwiTEVGVFwiOjM3LFwiUklHSFRcIjozOCxcIklOTkVSXCI6MzksXCJPVVRFUlwiOjQwLFwiV0hFUkVcIjo0MSxcIkxJTUlUXCI6NDIsXCJTRVBBUkFUT1JcIjo0MyxcIk9GRlNFVFwiOjQ0LFwiT1JERVJcIjo0NSxcIkJZXCI6NDYsXCJPcmRlckFyZ3NcIjo0NyxcIk9mZnNldENsYXVzZVwiOjQ4LFwiT3JkZXJBcmdcIjo0OSxcIlZhbHVlXCI6NTAsXCJESVJFQ1RJT05cIjo1MSxcIk9mZnNldFJvd3NcIjo1MixcIkZldGNoQ2xhdXNlXCI6NTMsXCJST1dcIjo1NCxcIlJPV1NcIjo1NSxcIkZFVENIXCI6NTYsXCJGSVJTVFwiOjU3LFwiT05MWVwiOjU4LFwiTkVYVFwiOjU5LFwiR3JvdXBCYXNpY0NsYXVzZVwiOjYwLFwiSGF2aW5nQ2xhdXNlXCI6NjEsXCJHUk9VUFwiOjYyLFwiQXJndW1lbnRMaXN0XCI6NjMsXCJIQVZJTkdcIjo2NCxcIk1BVEhcIjo2NSxcIk1BVEhfTVVMVElcIjo2NixcIk9QRVJBVE9SXCI6NjcsXCJCRVRXRUVOXCI6NjgsXCJCZXR3ZWVuRXhwcmVzc2lvblwiOjY5LFwiQ09ORElUSU9OQUxcIjo3MCxcIlNVQl9TRUxFQ1RfT1BcIjo3MSxcIlN1YlNlbGVjdEV4cHJlc3Npb25cIjo3MixcIlNVQl9TRUxFQ1RfVU5BUllfT1BcIjo3MyxcIldoaXRlcGFjZUxpc3RcIjo3NCxcIkNhc2VTdGF0ZW1lbnRcIjo3NSxcIkNBU0VcIjo3NixcIkNhc2VXaGVuc1wiOjc3LFwiRU5EXCI6NzgsXCJDYXNlRWxzZVwiOjc5LFwiQ2FzZVdoZW5cIjo4MCxcIldIRU5cIjo4MSxcIlRIRU5cIjo4MixcIkVMU0VcIjo4MyxcIlN0cmluZ1wiOjg0LFwiRnVuY3Rpb25cIjo4NSxcIlVzZXJGdW5jdGlvblwiOjg2LFwiQm9vbGVhblwiOjg3LFwiUGFyYW1ldGVyXCI6ODgsXCJOVU1CRVJcIjo4OSxcIkJPT0xFQU5cIjo5MCxcIlBBUkFNRVRFUlwiOjkxLFwiU1RSSU5HXCI6OTIsXCJEQkxTVFJJTkdcIjo5MyxcIkxJVEVSQUxcIjo5NCxcIkRPVFwiOjk1LFwiRlVOQ1RJT05cIjo5NixcIkFnZ3JlZ2F0ZUFyZ3VtZW50TGlzdFwiOjk3LFwiQ2FzZVwiOjk4LFwiRmllbGRcIjo5OSxcIlNUQVJcIjoxMDAsXCIkYWNjZXB0XCI6MCxcIiRlbmRcIjoxfSxcbnRlcm1pbmFsc186IHsyOlwiZXJyb3JcIiw1OlwiRU9GXCIsMTY6XCJTRUxFQ1RcIiwxODpcIkZST01cIiwyMDpcIkRJU1RJTkNUXCIsMjM6XCJBU1wiLDI0OlwiTEVGVF9QQVJFTlwiLDI2OlwiUklHSFRfUEFSRU5cIiwyNzpcIldJTkRPV1wiLDI4OlwiV0lORE9XX0ZVTkNUSU9OXCIsMzE6XCJVTklPTlwiLDMyOlwiQUxMXCIsMzQ6XCJKT0lOXCIsMzU6XCJPTlwiLDM3OlwiTEVGVFwiLDM4OlwiUklHSFRcIiwzOTpcIklOTkVSXCIsNDA6XCJPVVRFUlwiLDQxOlwiV0hFUkVcIiw0MjpcIkxJTUlUXCIsNDM6XCJTRVBBUkFUT1JcIiw0NDpcIk9GRlNFVFwiLDQ1OlwiT1JERVJcIiw0NjpcIkJZXCIsNTE6XCJESVJFQ1RJT05cIiw1NDpcIlJPV1wiLDU1OlwiUk9XU1wiLDU2OlwiRkVUQ0hcIiw1NzpcIkZJUlNUXCIsNTg6XCJPTkxZXCIsNTk6XCJORVhUXCIsNjI6XCJHUk9VUFwiLDY0OlwiSEFWSU5HXCIsNjU6XCJNQVRIXCIsNjY6XCJNQVRIX01VTFRJXCIsNjc6XCJPUEVSQVRPUlwiLDY4OlwiQkVUV0VFTlwiLDcwOlwiQ09ORElUSU9OQUxcIiw3MTpcIlNVQl9TRUxFQ1RfT1BcIiw3MzpcIlNVQl9TRUxFQ1RfVU5BUllfT1BcIiw3NjpcIkNBU0VcIiw3ODpcIkVORFwiLDgxOlwiV0hFTlwiLDgyOlwiVEhFTlwiLDgzOlwiRUxTRVwiLDg5OlwiTlVNQkVSXCIsOTA6XCJCT09MRUFOXCIsOTE6XCJQQVJBTUVURVJcIiw5MjpcIlNUUklOR1wiLDkzOlwiREJMU1RSSU5HXCIsOTQ6XCJMSVRFUkFMXCIsOTU6XCJET1RcIiw5NjpcIkZVTkNUSU9OXCIsOTg6XCJDYXNlXCIsMTAwOlwiU1RBUlwifSxcbnByb2R1Y3Rpb25zXzogWzAsWzMsMl0sWzQsMV0sWzQsMl0sWzYsMV0sWzYsMV0sWzksMV0sWzksMl0sWzksMl0sWzksM10sWzgsMl0sWzEwLDFdLFsxMCwyXSxbMTQsNF0sWzE0LDVdLFsxNCw1XSxbMTQsNl0sWzE5LDFdLFsxOSwyXSxbMTksM10sWzE5LDNdLFsxOSwzXSxbMTksNF0sWzE5LDZdLFs3LDFdLFs3LDJdLFszMCwyXSxbMzAsM10sWzIxLDFdLFsyMSwyXSxbMzMsNF0sWzMzLDVdLFszMyw1XSxbMzMsNl0sWzMzLDZdLFszMyw2XSxbMzMsNl0sWzE1LDJdLFsxMywyXSxbMTMsNF0sWzEzLDRdLFsxMSwzXSxbMTEsNF0sWzQ3LDFdLFs0NywzXSxbNDksMV0sWzQ5LDJdLFs0OCwyXSxbNDgsM10sWzUyLDJdLFs1MiwyXSxbNTMsNF0sWzUzLDRdLFsxMiwxXSxbMTIsMl0sWzYwLDNdLFs2MSwyXSxbMzYsM10sWzM2LDNdLFszNiwzXSxbMzYsM10sWzM2LDNdLFszNiwzXSxbMzYsNV0sWzM2LDNdLFszNiwyXSxbMzYsMV0sWzM2LDFdLFszNiwxXSxbMzYsMV0sWzY5LDNdLFs3NSwzXSxbNzUsNF0sWzgwLDRdLFs3NywyXSxbNzcsMV0sWzc5LDJdLFs3MiwzXSxbNTAsMV0sWzUwLDFdLFs1MCwxXSxbNTAsMV0sWzUwLDFdLFs1MCwxXSxbNTAsMV0sWzc0LDJdLFs3NCwyXSxbMjUsMV0sWzI5LDFdLFs4NywxXSxbODgsMV0sWzg0LDFdLFs4NCwxXSxbMjIsMV0sWzIyLDNdLFs4NSw0XSxbODYsM10sWzg2LDRdLFs4Niw0XSxbOTcsMV0sWzk3LDJdLFs2MywxXSxbNjMsM10sWzE3LDFdLFsxNywzXSxbOTksMV0sWzk5LDFdLFs5OSwzXV0sXG5wZXJmb3JtQWN0aW9uOiBmdW5jdGlvbiBhbm9ueW1vdXMoeXl0ZXh0LCB5eWxlbmcsIHl5bGluZW5vLCB5eSwgeXlzdGF0ZSAvKiBhY3Rpb25bMV0gKi8sICQkIC8qIHZzdGFjayAqLywgXyQgLyogbHN0YWNrICovKSB7XG4vKiB0aGlzID09IHl5dmFsICovXG5cbnZhciAkMCA9ICQkLmxlbmd0aCAtIDE7XG5zd2l0Y2ggKHl5c3RhdGUpIHtcbmNhc2UgMTpcbnJldHVybiB0aGlzLiQgPSAkJFskMC0xXTtcbmJyZWFrO1xuY2FzZSAyOiBjYXNlIDQ6IGNhc2UgNTogY2FzZSA2OiBjYXNlIDExOiBjYXNlIDUzOiBjYXNlIDY2OiBjYXNlIDY4OiBjYXNlIDY5OiBjYXNlIDc4OiBjYXNlIDc5OiBjYXNlIDgwOiBjYXNlIDgxOiBjYXNlIDgyOiBjYXNlIDgzOiBjYXNlIDg0OlxudGhpcy4kID0gJCRbJDBdO1xuYnJlYWs7XG5jYXNlIDM6XG50aGlzLiQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICQkWyQwLTFdLnVuaW9ucyA9ICQkWyQwXTtcbiAgICAgICAgcmV0dXJuICQkWyQwLTFdO1xuICAgICAgfSgpKTtcbmJyZWFrO1xuY2FzZSA3OlxudGhpcy4kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAkJFskMC0xXS5vcmRlciA9ICQkWyQwXTtcbiAgICAgICAgcmV0dXJuICQkWyQwLTFdO1xuICAgICAgfSgpKTtcbmJyZWFrO1xuY2FzZSA4OlxudGhpcy4kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAkJFskMC0xXS5ncm91cCA9ICQkWyQwXTtcbiAgICAgICAgcmV0dXJuICQkWyQwLTFdO1xuICAgICAgfSgpKTtcbmJyZWFrO1xuY2FzZSA5OlxudGhpcy4kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAkJFskMC0yXS5ncm91cCA9ICQkWyQwLTFdO1xuICAgICAgICAkJFskMC0yXS5vcmRlciA9ICQkWyQwXTtcbiAgICAgICAgcmV0dXJuICQkWyQwLTJdO1xuICAgICAgfSgpKTtcbmJyZWFrO1xuY2FzZSAxMDpcbnRoaXMuJCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgJCRbJDAtMV0ubGltaXQgPSAkJFskMF07XG4gICAgICAgIHJldHVybiAkJFskMC0xXTtcbiAgICAgIH0oKSk7XG5icmVhaztcbmNhc2UgMTI6XG50aGlzLiQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICQkWyQwLTFdLndoZXJlID0gJCRbJDBdO1xuICAgICAgICByZXR1cm4gJCRbJDAtMV07XG4gICAgICB9KCkpO1xuYnJlYWs7XG5jYXNlIDEzOlxudGhpcy4kID0gbmV3IHl5LlNlbGVjdCgkJFskMC0yXSwgJCRbJDBdLCBmYWxzZSk7XG5icmVhaztcbmNhc2UgMTQ6XG50aGlzLiQgPSBuZXcgeXkuU2VsZWN0KCQkWyQwLTJdLCAkJFskMF0sIHRydWUpO1xuYnJlYWs7XG5jYXNlIDE1OlxudGhpcy4kID0gbmV3IHl5LlNlbGVjdCgkJFskMC0zXSwgJCRbJDAtMV0sIGZhbHNlLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDE2OlxudGhpcy4kID0gbmV3IHl5LlNlbGVjdCgkJFskMC0zXSwgJCRbJDAtMV0sIHRydWUsICQkWyQwXSk7XG5icmVhaztcbmNhc2UgMTc6XG50aGlzLiQgPSBuZXcgeXkuVGFibGUoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSAxODpcbnRoaXMuJCA9IG5ldyB5eS5UYWJsZSgkJFskMC0xXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSAxOTpcbnRoaXMuJCA9IG5ldyB5eS5UYWJsZSgkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSAyMDogY2FzZSA0OTogY2FzZSA1MDogY2FzZSA1MTogY2FzZSA1MjogY2FzZSA1NzpcbnRoaXMuJCA9ICQkWyQwLTFdO1xuYnJlYWs7XG5jYXNlIDIxOiBjYXNlIDc3OlxudGhpcy4kID0gbmV3IHl5LlN1YlNlbGVjdCgkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMjI6XG50aGlzLiQgPSBuZXcgeXkuU3ViU2VsZWN0KCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDIzOlxudGhpcy4kID0gbmV3IHl5LlRhYmxlKCQkWyQwLTVdLCBudWxsLCAkJFskMC00XSwgJCRbJDAtM10sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAyNDogY2FzZSAyODogY2FzZSA0MzogY2FzZSA3NTogY2FzZSAxMDE6IGNhc2UgMTAzOlxudGhpcy4kID0gWyQkWyQwXV07XG5icmVhaztcbmNhc2UgMjU6IGNhc2UgMjk6IGNhc2UgNzQ6XG50aGlzLiQgPSAkJFskMC0xXS5jb25jYXQoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSAyNjpcbnRoaXMuJCA9IG5ldyB5eS5VbmlvbigkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDI3OlxudGhpcy4kID0gbmV3IHl5LlVuaW9uKCQkWyQwXSwgdHJ1ZSk7XG5icmVhaztcbmNhc2UgMzA6XG50aGlzLiQgPSBuZXcgeXkuSm9pbigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSAzMTpcbnRoaXMuJCA9IG5ldyB5eS5Kb2luKCQkWyQwLTJdLCAkJFskMF0sICdMRUZUJyk7XG5icmVhaztcbmNhc2UgMzI6XG50aGlzLiQgPSBuZXcgeXkuSm9pbigkJFskMC0yXSwgJCRbJDBdLCAnUklHSFQnKTtcbmJyZWFrO1xuY2FzZSAzMzpcbnRoaXMuJCA9IG5ldyB5eS5Kb2luKCQkWyQwLTJdLCAkJFskMF0sICdMRUZUJywgJ0lOTkVSJyk7XG5icmVhaztcbmNhc2UgMzQ6XG50aGlzLiQgPSBuZXcgeXkuSm9pbigkJFskMC0yXSwgJCRbJDBdLCAnUklHSFQnLCAnSU5ORVInKTtcbmJyZWFrO1xuY2FzZSAzNTpcbnRoaXMuJCA9IG5ldyB5eS5Kb2luKCQkWyQwLTJdLCAkJFskMF0sICdMRUZUJywgJ09VVEVSJyk7XG5icmVhaztcbmNhc2UgMzY6XG50aGlzLiQgPSBuZXcgeXkuSm9pbigkJFskMC0yXSwgJCRbJDBdLCAnUklHSFQnLCAnT1VURVInKTtcbmJyZWFrO1xuY2FzZSAzNzpcbnRoaXMuJCA9IG5ldyB5eS5XaGVyZSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDM4OlxudGhpcy4kID0gbmV3IHl5LkxpbWl0KCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzk6XG50aGlzLiQgPSBuZXcgeXkuTGltaXQoJCRbJDBdLCAkJFskMC0yXSk7XG5icmVhaztcbmNhc2UgNDA6XG50aGlzLiQgPSBuZXcgeXkuTGltaXQoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDE6XG50aGlzLiQgPSBuZXcgeXkuT3JkZXIoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0MjpcbnRoaXMuJCA9IG5ldyB5eS5PcmRlcigkJFskMC0xXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0NDogY2FzZSAxMDI6IGNhc2UgMTA0OlxudGhpcy4kID0gJCRbJDAtMl0uY29uY2F0KCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDU6XG50aGlzLiQgPSBuZXcgeXkuT3JkZXJBcmd1bWVudCgkJFskMF0sICdBU0MnKTtcbmJyZWFrO1xuY2FzZSA0NjpcbnRoaXMuJCA9IG5ldyB5eS5PcmRlckFyZ3VtZW50KCQkWyQwLTFdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDQ3OlxudGhpcy4kID0gbmV3IHl5Lk9mZnNldCgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDQ4OlxudGhpcy4kID0gbmV3IHl5Lk9mZnNldCgkJFskMC0xXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA1NDpcbnRoaXMuJCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgJCRbJDAtMV0uaGF2aW5nID0gJCRbJDBdO1xuICAgICAgICByZXR1cm4gJCRbJDAtMV07XG4gICAgICB9KCkpO1xuYnJlYWs7XG5jYXNlIDU1OlxudGhpcy4kID0gbmV3IHl5Lkdyb3VwKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNTY6XG50aGlzLiQgPSBuZXcgeXkuSGF2aW5nKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNTg6IGNhc2UgNTk6IGNhc2UgNjA6IGNhc2UgNjE6IGNhc2UgNjI6IGNhc2UgNjQ6XG50aGlzLiQgPSBuZXcgeXkuT3AoJCRbJDAtMV0sICQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDYzOlxudGhpcy4kID0gbmV3IHl5Lk9wKCQkWyQwLTNdLCAkJFskMC00XSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDY1OlxudGhpcy4kID0gbmV3IHl5LlVuYXJ5T3AoJCRbJDAtMV0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNjc6XG50aGlzLiQgPSBuZXcgeXkuV2hpdGVwYWNlTGlzdCgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDcwOlxudGhpcy4kID0gbmV3IHl5LkJldHdlZW5PcChbJCRbJDAtMl0sICQkWyQwXV0pO1xuYnJlYWs7XG5jYXNlIDcxOlxudGhpcy4kID0gbmV3IHl5LkNhc2UoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDcyOlxudGhpcy4kID0gbmV3IHl5LkNhc2UoJCRbJDAtMl0sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSA3MzpcbnRoaXMuJCA9IG5ldyB5eS5DYXNlV2hlbigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA3NjpcbnRoaXMuJCA9IG5ldyB5eS5DYXNlRWxzZSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg1OlxudGhpcy4kID0gWyQkWyQwLTFdLCAkJFskMF1dO1xuYnJlYWs7XG5jYXNlIDg2OlxudGhpcy4kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAkJFskMC0xXS5wdXNoKCQkWyQwXSk7XG4gICAgICAgIHJldHVybiAkJFskMC0xXTtcbiAgICAgIH0oKSk7XG5icmVhaztcbmNhc2UgODc6XG50aGlzLiQgPSBuZXcgeXkuTGlzdFZhbHVlKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgODg6XG50aGlzLiQgPSBuZXcgeXkuTnVtYmVyVmFsdWUoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA4OTpcbnRoaXMuJCA9IG5ldyB5eS5Cb29sZWFuVmFsdWUoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA5MDpcbnRoaXMuJCA9IG5ldyB5eS5QYXJhbWV0ZXJWYWx1ZSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDkxOlxudGhpcy4kID0gbmV3IHl5LlN0cmluZ1ZhbHVlKCQkWyQwXSwgXCInXCIpO1xuYnJlYWs7XG5jYXNlIDkyOlxudGhpcy4kID0gbmV3IHl5LlN0cmluZ1ZhbHVlKCQkWyQwXSwgJ1wiJyk7XG5icmVhaztcbmNhc2UgOTM6XG50aGlzLiQgPSBuZXcgeXkuTGl0ZXJhbFZhbHVlKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgOTQ6XG50aGlzLiQgPSBuZXcgeXkuTGl0ZXJhbFZhbHVlKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDk1OlxudGhpcy4kID0gbmV3IHl5LkZ1bmN0aW9uVmFsdWUoJCRbJDAtM10sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSA5NjpcbnRoaXMuJCA9IG5ldyB5eS5GdW5jdGlvblZhbHVlKCQkWyQwLTJdLCBudWxsLCB0cnVlKTtcbmJyZWFrO1xuY2FzZSA5NzogY2FzZSA5ODpcbnRoaXMuJCA9IG5ldyB5eS5GdW5jdGlvblZhbHVlKCQkWyQwLTNdLCAkJFskMC0xXSwgdHJ1ZSk7XG5icmVhaztcbmNhc2UgOTk6XG50aGlzLiQgPSBuZXcgeXkuQXJndW1lbnRMaXN0VmFsdWUoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSAxMDA6XG50aGlzLiQgPSBuZXcgeXkuQXJndW1lbnRMaXN0VmFsdWUoJCRbJDBdLCB0cnVlKTtcbmJyZWFrO1xuY2FzZSAxMDU6XG50aGlzLiQgPSBuZXcgeXkuU3RhcigpO1xuYnJlYWs7XG5jYXNlIDEwNjpcbnRoaXMuJCA9IG5ldyB5eS5GaWVsZCgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDEwNzpcbnRoaXMuJCA9IG5ldyB5eS5GaWVsZCgkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xufVxufSxcbnRhYmxlOiBbezM6MSw0OjIsNjozLDg6NCw5OjUsMTA6NiwxNDo3LDE2OiRWMH0sezE6WzNdfSx7NTpbMSw5XX0sbygkVjEsWzIsMl0sezc6MTAsMTM6MTEsMzA6MTIsMzE6JFYyLDQyOiRWM30pLG8oJFY0LFsyLDRdKSxvKCRWNCxbMiw1XSksbygkVjQsWzIsNl0sezExOjE1LDEyOjE2LDYwOjE4LDQ1OiRWNSw2MjpbMSwxOV19KSxvKCRWNixbMiwxMV0sezE1OjIwLDQxOlsxLDIxXX0pLHsxNzoyMiwyMDpbMSwyM10sMjI6MzMsMjQ6JFY3LDI5OjM0LDM2OjI2LDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnLDk5OjI0LDEwMDokVmh9LHsxOlsyLDFdfSxvKCRWMSxbMiwzXSx7MzA6NDgsMzE6JFYyfSksbygkVjQsWzIsMTBdKSxvKCRWaSxbMiwyNF0pLHsyOTo0OSw4OTokVmF9LHs2OjUwLDg6NCw5OjUsMTA6NiwxNDo3LDE2OiRWMCwzMjpbMSw1MV19LG8oJFY0LFsyLDddKSxvKCRWNCxbMiw4XSx7MTE6NTIsNDU6JFY1fSksezQ2OlsxLDUzXX0sbygkVmosWzIsNTNdLHs2MTo1NCw2NDpbMSw1NV19KSx7NDY6WzEsNTZdfSxvKCRWNixbMiwxMl0pLHsyMjozMywyNDokVjcsMjk6MzQsMzY6NTcsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LHsxODpbMSw1OF0sNDM6JFZrfSx7MTc6NjAsMjI6MzMsMjQ6JFY3LDI5OjM0LDM2OjI2LDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnLDk5OjI0LDEwMDokVmh9LG8oJFZsLFsyLDEwM10pLG8oJFZsLFsyLDEwNV0pLG8oJFZsLFsyLDEwNl0sezIzOlsxLDYxXSw2NTokVm0sNjY6JFZuLDY3OiRWbyw2ODokVnAsNzA6JFZxfSksezQ6NjgsNjozLDg6NCw5OjUsMTA6NiwxNDo3LDE2OiRWMCwyMjozMywyNDokVjcsMjk6MzQsMzY6NjcsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LG8oJFZyLFsyLDY5XSx7MjI6MzMsMjk6MzQsODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksNTA6NzAsNzE6WzEsNjldLDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30pLHsyNDpbMSw3Ml0sNzI6NzF9LG8oJFZyLFsyLDY2XSksbygkVnIsWzIsNjddLHsyMjozMywyOTozNCw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw1MDo3Myw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9KSxvKCRWcixbMiw2OF0pLG8oJFZzLFsyLDc4XSx7OTU6JFZ0fSksbygkVnMsWzIsNzldKSxvKCRWcyxbMiw4MF0pLG8oJFZzLFsyLDgxXSksbygkVnMsWzIsODJdKSxvKCRWcyxbMiw4M10pLG8oJFZzLFsyLDg0XSksezc3Ojc1LDgwOjc2LDgxOiRWdX0sbyhbNSwxOCwyMywyNiwzMSwzNCwzNywzOCw0MSw0Miw0Myw0NCw0NSw1MSw2Miw2NCw2NSw2Niw2Nyw2OCw3MCw3MSw3OCw4MSw4Miw4Myw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Nl0sJFZ2LHsyNDpbMSw3OF19KSxvKFs1LDE4LDIzLDI2LDMxLDM0LDM3LDM4LDQxLDQyLDQzLDQ0LDQ1LDUxLDU0LDU1LDYyLDY0LDY1LDY2LDY3LDY4LDcwLDcxLDc4LDgxLDgyLDgzLDg5LDkwLDkxLDkyLDkzLDk0LDk2XSxbMiw4OF0pLG8oJFZzLFsyLDkxXSksbygkVnMsWzIsOTJdKSx7MjQ6WzEsNzldfSxvKCRWcyxbMiw4OV0pLG8oJFZzLFsyLDkwXSksbygkVmksWzIsMjVdKSxvKCRWNCxbMiwzOF0sezQzOlsxLDgwXSw0NDpbMSw4MV19KSxvKCRWaSxbMiwyNl0sezEzOjExLDQyOiRWM30pLHs2OjgyLDg6NCw5OjUsMTA6NiwxNDo3LDE2OiRWMH0sbygkVjQsWzIsOV0pLHsyMjozMywyOTozNCw0Nzo4Myw0OTo4NCw1MDo4NSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LG8oJFZqLFsyLDU0XSksezIyOjMzLDI0OiRWNywyOTozNCwzNjo4Niw1MDoyOCw3MjozMCw3MzokVjgsNzQ6MzEsNzU6MzIsNzY6JFY5LDg0OjM1LDg1OjM2LDg2OjM3LDg3OjM4LDg4OjM5LDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30sezIyOjMzLDI0OiRWNywyOTozNCwzNjo4OCw1MDoyOCw2Mzo4Nyw3MjozMCw3MzokVjgsNzQ6MzEsNzU6MzIsNzY6JFY5LDg0OjM1LDg1OjM2LDg2OjM3LDg3OjM4LDg4OjM5LDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30sbygkVjYsWzIsMzddLHs2NTokVm0sNjY6JFZuLDY3OiRWbyw2ODokVnAsNzA6JFZxfSksezE5Ojg5LDIyOjkwLDI0OiRWdyw5NDokVnh9LHsyMjozMywyNDokVjcsMjk6MzQsMzY6MjYsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmcsOTk6OTMsMTAwOiRWaH0sezE4OlsxLDk0XSw0MzokVmt9LHsyMjo5NSw5NDokVnh9LHsyMjozMywyNDokVjcsMjk6MzQsMzY6OTYsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LHsyMjozMywyNDokVjcsMjk6MzQsMzY6OTcsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LHsyMjozMywyNDokVjcsMjk6MzQsMzY6OTgsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LHsyMjozMywyNDokVjcsMjk6MzQsMzY6MTAwLDUwOjI4LDY5Ojk5LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSx7MjI6MzMsMjQ6JFY3LDI5OjM0LDM2OjEwMSw1MDoyOCw3MjozMCw3MzokVjgsNzQ6MzEsNzU6MzIsNzY6JFY5LDg0OjM1LDg1OjM2LDg2OjM3LDg3OjM4LDg4OjM5LDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30sezI2OlsxLDEwMl0sNjU6JFZtLDY2OiRWbiw2NzokVm8sNjg6JFZwLDcwOiRWcX0sezI2OlsxLDEwM119LHsyNDpbMSwxMDRdLDcyOjEwNX0sbygkVnksWzIsODVdKSxvKCRWcixbMiw2NV0pLHs0OjY4LDY6Myw4OjQsOTo1LDEwOjYsMTQ6NywxNjokVjB9LG8oJFZ5LFsyLDg2XSksezk0OlsxLDEwNl19LHs3ODpbMSwxMDddLDc5OjEwOCw4MDoxMDksODE6JFZ1LDgzOlsxLDExMF19LG8oJFZ6LFsyLDc1XSksezIyOjMzLDI0OiRWNywyOTozNCwzNjoxMTEsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LHsyMDokVkEsMjI6MzMsMjQ6JFY3LDI2OlsxLDExMl0sMjk6MzQsMzY6ODgsNTA6MjgsNjM6MTE1LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnLDk3OjExMyw5ODpbMSwxMTRdfSx7MjA6JFZBLDIyOjMzLDI0OiRWNywyOTozNCwzNjo4OCw1MDoyOCw2MzoxMTUsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmcsOTc6MTE3fSx7Mjk6MTE4LDg5OiRWYX0sezI5OjExOSw4OTokVmF9LG8oJFZpLFsyLDI3XSx7MTM6MTEsNDI6JFYzfSksbygkVjQsWzIsNDFdLHs0ODoxMjAsNDM6WzEsMTIxXSw0NDpbMSwxMjJdfSksbygkVkIsWzIsNDNdKSxvKCRWQixbMiw0NV0sezUxOlsxLDEyM119KSxvKCRWaixbMiw1Nl0sezY1OiRWbSw2NjokVm4sNjc6JFZvLDY4OiRWcCw3MDokVnF9KSxvKFs1LDI2LDMxLDQyLDQ1LDY0XSxbMiw1NV0sezQzOiRWQ30pLG8oJFZELFsyLDEwMV0sezY1OiRWbSw2NjokVm4sNjc6JFZvLDY4OiRWcCw3MDokVnF9KSxvKCRWRSxbMiwxM10sezIxOjEyNSwzMzoxMjYsMzQ6JFZGLDM3OiRWRywzODokVkh9KSxvKCRWSSxbMiwxN10sezIyOjEzMCwyMzpbMSwxMzFdLDI3OlsxLDEzMl0sOTQ6JFZ4LDk1OiRWdH0pLHs0OjEzNCw2OjMsODo0LDk6NSwxMDo2LDE0OjcsMTY6JFYwLDIyOjMzLDI0OiRWNywyNToxMzMsMjk6MzQsMzY6ODgsNTA6MjgsNjM6MTM1LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSxvKFs1LDE4LDIzLDI2LDI3LDMxLDM0LDM1LDM3LDM4LDQxLDQyLDQzLDQ1LDYyLDk0LDk1XSwkVnYpLG8oJFZsLFsyLDEwNF0pLHsxOToxMzYsMjI6OTAsMjQ6JFZ3LDk0OiRWeH0sbygkVmwsWzIsMTA3XSx7OTU6JFZ0fSksbyhbNSwxOCwyMywyNiwzMSwzNCwzNywzOCw0MSw0Miw0Myw0NSw2Miw2NCw2NSw2Nyw3MCw3OCw4MSw4Miw4M10sWzIsNThdLHs2NjokVm4sNjg6JFZwfSksbyhbNSwxOCwyMywyNiwzMSwzNCwzNywzOCw0MSw0Miw0Myw0NSw2Miw2NCw2NSw2Niw2Nyw3MCw3OCw4MSw4Miw4M10sWzIsNTldLHs2ODokVnB9KSxvKFs1LDE4LDIzLDI2LDMxLDM0LDM3LDM4LDQxLDQyLDQzLDQ1LDYyLDY0LDY3LDcwLDc4LDgxLDgyLDgzXSxbMiw2MF0sezY1OiRWbSw2NjokVm4sNjg6JFZwfSksbygkVnIsWzIsNjFdKSx7NjU6JFZtLDY2OiRWbiw2NzokVm8sNjg6JFZwLDcwOlsxLDEzN119LG8oJFZKLFsyLDYyXSx7NjU6JFZtLDY2OiRWbiw2NzokVm8sNjg6JFZwfSksbygkVnIsWzIsNTddKSxvKCRWcixbMiw3N10pLHs0OjY4LDY6Myw4OjQsOTo1LDEwOjYsMTQ6NywxNjokVjAsMjI6MzMsMjQ6JFY3LDI1OjEzOCwyOTozNCwzNjo4OCw1MDoyOCw2MzoxMzUsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LG8oJFZyLFsyLDY0XSksbyhbNSwxOCwyMywyNiwyNywzMSwzNCwzNSwzNywzOCw0MSw0Miw0Myw0NCw0NSw1MSw2Miw2NCw2NSw2Niw2Nyw2OCw3MCw3MSw3OCw4MSw4Miw4Myw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Nl0sWzIsOTRdKSxvKCRWcixbMiw3MV0pLHs3ODpbMSwxMzldfSxvKCRWeixbMiw3NF0pLHsyMjozMywyNDokVjcsMjk6MzQsMzY6MTQwLDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSx7NjU6JFZtLDY2OiRWbiw2NzokVm8sNjg6JFZwLDcwOiRWcSw4MjpbMSwxNDFdfSxvKCRWcyxbMiw5Nl0pLHsyNjpbMSwxNDJdfSx7MjY6WzEsMTQzXX0sezI2OlsyLDk5XSw0MzokVkN9LHsyMjozMywyNDokVjcsMjk6MzQsMzY6ODgsNTA6MjgsNjM6MTQ0LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSx7MjY6WzEsMTQ1XX0sbygkVjQsWzIsMzldKSxvKCRWNCxbMiw0MF0pLG8oJFY0LFsyLDQyXSksezIyOjMzLDI5OjM0LDQ5OjE0Niw1MDo4NSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LHsyOToxNDgsNTI6MTQ3LDg5OiRWYX0sbygkVkIsWzIsNDZdKSx7MjI6MzMsMjQ6JFY3LDI5OjM0LDM2OjE0OSw1MDoyOCw3MjozMCw3MzokVjgsNzQ6MzEsNzU6MzIsNzY6JFY5LDg0OjM1LDg1OjM2LDg2OjM3LDg3OjM4LDg4OjM5LDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30sbygkVkUsWzIsMTVdLHszMzoxNTAsMzQ6JFZGLDM3OiRWRywzODokVkh9KSxvKCRWSyxbMiwyOF0pLHsxOToxNTEsMjI6OTAsMjQ6JFZ3LDk0OiRWeH0sezM0OlsxLDE1Ml0sMzk6WzEsMTUzXSw0MDpbMSwxNTRdfSx7MzQ6WzEsMTU1XSwzOTpbMSwxNTZdLDQwOlsxLDE1N119LG8oJFZJLFsyLDE4XSx7OTU6JFZ0fSksezIyOjE1OCw5NDokVnh9LHsyODpbMSwxNTldfSx7MjY6WzEsMTYwXX0sezI2OlsxLDE2MV19LHsyNjpbMiw4N10sNDM6JFZDfSxvKCRWRSxbMiwxNF0sezMzOjEyNiwyMToxNjIsMzQ6JFZGLDM3OiRWRywzODokVkh9KSx7MjI6MzMsMjQ6JFY3LDI5OjM0LDM2OjE2Myw1MDoyOCw3MjozMCw3MzokVjgsNzQ6MzEsNzU6MzIsNzY6JFY5LDg0OjM1LDg1OjM2LDg2OjM3LDg3OjM4LDg4OjM5LDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30sezI2OlsxLDE2NF19LG8oJFZyLFsyLDcyXSksezY1OiRWbSw2NjokVm4sNjc6JFZvLDY4OiRWcCw3MDokVnEsNzg6WzIsNzZdfSx7MjI6MzMsMjQ6JFY3LDI5OjM0LDM2OjE2NSw1MDoyOCw3MjozMCw3MzokVjgsNzQ6MzEsNzU6MzIsNzY6JFY5LDg0OjM1LDg1OjM2LDg2OjM3LDg3OjM4LDg4OjM5LDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30sbygkVnMsWzIsOTddKSxvKCRWcyxbMiw5OF0pLHsyNjpbMiwxMDBdLDQzOiRWQ30sbygkVnMsWzIsOTVdKSxvKCRWQixbMiw0NF0pLG8oJFY0LFsyLDQ3XSx7NTM6MTY2LDU2OlsxLDE2N119KSx7NTQ6WzEsMTY4XSw1NTpbMSwxNjldfSxvKCRWRCxbMiwxMDJdLHs2NTokVm0sNjY6JFZuLDY3OiRWbyw2ODokVnAsNzA6JFZxfSksbygkVkssWzIsMjldKSx7MzU6WzEsMTcwXX0sezE5OjE3MSwyMjo5MCwyNDokVncsOTQ6JFZ4fSx7MzQ6WzEsMTcyXX0sezM0OlsxLDE3M119LHsxOToxNzQsMjI6OTAsMjQ6JFZ3LDk0OiRWeH0sezM0OlsxLDE3NV19LHszNDpbMSwxNzZdfSxvKCRWSSxbMiwxOV0sezk1OiRWdH0pLHsyNDpbMSwxNzddfSxvKCRWSSxbMiwyMF0pLG8oJFZJLFsyLDIxXSx7MjI6MTc4LDk0OiRWeH0pLG8oJFZFLFsyLDE2XSx7MzM6MTUwLDM0OiRWRiwzNzokVkcsMzg6JFZIfSksbygkVkosWzIsNzBdLHs2NTokVm0sNjY6JFZuLDY3OiRWbyw2ODokVnB9KSxvKCRWcixbMiw2M10pLG8oJFZ6LFsyLDczXSx7NjU6JFZtLDY2OiRWbiw2NzokVm8sNjg6JFZwLDcwOiRWcX0pLG8oJFY0LFsyLDQ4XSksezU3OlsxLDE3OV0sNTk6WzEsMTgwXX0sbygkVkwsWzIsNDldKSxvKCRWTCxbMiw1MF0pLHsyMjozMywyNDokVjcsMjk6MzQsMzY6MTgxLDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSx7MzU6WzEsMTgyXX0sezE5OjE4MywyMjo5MCwyNDokVncsOTQ6JFZ4fSx7MTk6MTg0LDIyOjkwLDI0OiRWdyw5NDokVnh9LHszNTpbMSwxODVdfSx7MTk6MTg2LDIyOjkwLDI0OiRWdyw5NDokVnh9LHsxOToxODcsMjI6OTAsMjQ6JFZ3LDk0OiRWeH0sezI5OjE4OCw4OTokVmF9LG8oJFZJLFsyLDIyXSx7OTU6JFZ0fSksezI5OjE0OCw1MjoxODksODk6JFZhfSx7Mjk6MTQ4LDUyOjE5MCw4OTokVmF9LG8oJFZLLFsyLDMwXSx7NjU6JFZtLDY2OiRWbiw2NzokVm8sNjg6JFZwLDcwOiRWcX0pLHsyMjozMywyNDokVjcsMjk6MzQsMzY6MTkxLDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSx7MzU6WzEsMTkyXX0sezM1OlsxLDE5M119LHsyMjozMywyNDokVjcsMjk6MzQsMzY6MTk0LDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSx7MzU6WzEsMTk1XX0sezM1OlsxLDE5Nl19LHsyNjpbMSwxOTddfSx7NTg6WzEsMTk4XX0sezU4OlsxLDE5OV19LG8oJFZLLFsyLDMxXSx7NjU6JFZtLDY2OiRWbiw2NzokVm8sNjg6JFZwLDcwOiRWcX0pLHsyMjozMywyNDokVjcsMjk6MzQsMzY6MjAwLDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSx7MjI6MzMsMjQ6JFY3LDI5OjM0LDM2OjIwMSw1MDoyOCw3MjozMCw3MzokVjgsNzQ6MzEsNzU6MzIsNzY6JFY5LDg0OjM1LDg1OjM2LDg2OjM3LDg3OjM4LDg4OjM5LDg5OiRWYSw5MDokVmIsOTE6JFZjLDkyOiRWZCw5MzokVmUsOTQ6JFZmLDk2OiRWZ30sbygkVkssWzIsMzJdLHs2NTokVm0sNjY6JFZuLDY3OiRWbyw2ODokVnAsNzA6JFZxfSksezIyOjMzLDI0OiRWNywyOTozNCwzNjoyMDIsNTA6MjgsNzI6MzAsNzM6JFY4LDc0OjMxLDc1OjMyLDc2OiRWOSw4NDozNSw4NTozNiw4NjozNyw4NzozOCw4ODozOSw4OTokVmEsOTA6JFZiLDkxOiRWYyw5MjokVmQsOTM6JFZlLDk0OiRWZiw5NjokVmd9LHsyMjozMywyNDokVjcsMjk6MzQsMzY6MjAzLDUwOjI4LDcyOjMwLDczOiRWOCw3NDozMSw3NTozMiw3NjokVjksODQ6MzUsODU6MzYsODY6MzcsODc6MzgsODg6MzksODk6JFZhLDkwOiRWYiw5MTokVmMsOTI6JFZkLDkzOiRWZSw5NDokVmYsOTY6JFZnfSxvKCRWSSxbMiwyM10pLG8oJFY0LFsyLDUxXSksbygkVjQsWzIsNTJdKSxvKCRWSyxbMiwzM10sezY1OiRWbSw2NjokVm4sNjc6JFZvLDY4OiRWcCw3MDokVnF9KSxvKCRWSyxbMiwzNV0sezY1OiRWbSw2NjokVm4sNjc6JFZvLDY4OiRWcCw3MDokVnF9KSxvKCRWSyxbMiwzNF0sezY1OiRWbSw2NjokVm4sNjc6JFZvLDY4OiRWcCw3MDokVnF9KSxvKCRWSyxbMiwzNl0sezY1OiRWbSw2NjokVm4sNjc6JFZvLDY4OiRWcCw3MDokVnF9KV0sXG5kZWZhdWx0QWN0aW9uczogezk6WzIsMV19LFxucGFyc2VFcnJvcjogZnVuY3Rpb24gcGFyc2VFcnJvciAoc3RyLCBoYXNoKSB7XG4gICAgaWYgKGhhc2gucmVjb3ZlcmFibGUpIHtcbiAgICAgICAgdGhpcy50cmFjZShzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzdHIpO1xuICAgIH1cbn0sXG5wYXJzZTogZnVuY3Rpb24gcGFyc2UoaW5wdXQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsIHN0YWNrID0gWzBdLCB0c3RhY2sgPSBbXSwgdnN0YWNrID0gW251bGxdLCBsc3RhY2sgPSBbXSwgdGFibGUgPSB0aGlzLnRhYmxlLCB5eXRleHQgPSAnJywgeXlsaW5lbm8gPSAwLCB5eWxlbmcgPSAwLCByZWNvdmVyaW5nID0gMCwgVEVSUk9SID0gMiwgRU9GID0gMTtcbiAgICB2YXIgYXJncyA9IGxzdGFjay5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGxleGVyID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmxleGVyKTtcbiAgICB2YXIgc2hhcmVkU3RhdGUgPSB7IHl5OiB7fSB9O1xuICAgIGZvciAodmFyIGsgaW4gdGhpcy55eSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMueXksIGspKSB7XG4gICAgICAgICAgICBzaGFyZWRTdGF0ZS55eVtrXSA9IHRoaXMueXlba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV4ZXIuc2V0SW5wdXQoaW5wdXQsIHNoYXJlZFN0YXRlLnl5KTtcbiAgICBzaGFyZWRTdGF0ZS55eS5sZXhlciA9IGxleGVyO1xuICAgIHNoYXJlZFN0YXRlLnl5LnBhcnNlciA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiBsZXhlci55eWxsb2MgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbGV4ZXIueXlsbG9jID0ge307XG4gICAgfVxuICAgIHZhciB5eWxvYyA9IGxleGVyLnl5bGxvYztcbiAgICBsc3RhY2sucHVzaCh5eWxvYyk7XG4gICAgdmFyIHJhbmdlcyA9IGxleGVyLm9wdGlvbnMgJiYgbGV4ZXIub3B0aW9ucy5yYW5nZXM7XG4gICAgaWYgKHR5cGVvZiBzaGFyZWRTdGF0ZS55eS5wYXJzZUVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucGFyc2VFcnJvciA9IHNoYXJlZFN0YXRlLnl5LnBhcnNlRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJzZUVycm9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLnBhcnNlRXJyb3I7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvcFN0YWNrKG4pIHtcbiAgICAgICAgc3RhY2subGVuZ3RoID0gc3RhY2subGVuZ3RoIC0gMiAqIG47XG4gICAgICAgIHZzdGFjay5sZW5ndGggPSB2c3RhY2subGVuZ3RoIC0gbjtcbiAgICAgICAgbHN0YWNrLmxlbmd0aCA9IGxzdGFjay5sZW5ndGggLSBuO1xuICAgIH1cbiAgICBfdG9rZW5fc3RhY2s6XG4gICAgICAgIGZ1bmN0aW9uIGxleCgpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgICAgIHRva2VuID0gbGV4ZXIubGV4KCkgfHwgRU9GO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHNlbGYuc3ltYm9sc19bdG9rZW5dIHx8IHRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG4gICAgdmFyIHN5bWJvbCwgcHJlRXJyb3JTeW1ib2wsIHN0YXRlLCBhY3Rpb24sIGEsIHIsIHl5dmFsID0ge30sIHAsIGxlbiwgbmV3U3RhdGUsIGV4cGVjdGVkO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHN0YXRlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRBY3Rpb25zW3N0YXRlXSkge1xuICAgICAgICAgICAgYWN0aW9uID0gdGhpcy5kZWZhdWx0QWN0aW9uc1tzdGF0ZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3ltYm9sID09PSBudWxsIHx8IHR5cGVvZiBzeW1ib2wgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBsZXgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGlvbiA9IHRhYmxlW3N0YXRlXSAmJiB0YWJsZVtzdGF0ZV1bc3ltYm9sXTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3VuZGVmaW5lZCcgfHwgIWFjdGlvbi5sZW5ndGggfHwgIWFjdGlvblswXSkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJTdHIgPSAnJztcbiAgICAgICAgICAgICAgICBleHBlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAocCBpbiB0YWJsZVtzdGF0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGVybWluYWxzX1twXSAmJiBwID4gVEVSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZC5wdXNoKCdcXCcnICsgdGhpcy50ZXJtaW5hbHNfW3BdICsgJ1xcJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsZXhlci5zaG93UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyU3RyID0gJ1BhcnNlIGVycm9yIG9uIGxpbmUgJyArICh5eWxpbmVubyArIDEpICsgJzpcXG4nICsgbGV4ZXIuc2hvd1Bvc2l0aW9uKCkgKyAnXFxuRXhwZWN0aW5nICcgKyBleHBlY3RlZC5qb2luKCcsICcpICsgJywgZ290IFxcJycgKyAodGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sKSArICdcXCcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVyclN0ciA9ICdQYXJzZSBlcnJvciBvbiBsaW5lICcgKyAoeXlsaW5lbm8gKyAxKSArICc6IFVuZXhwZWN0ZWQgJyArIChzeW1ib2wgPT0gRU9GID8gJ2VuZCBvZiBpbnB1dCcgOiAnXFwnJyArICh0aGlzLnRlcm1pbmFsc19bc3ltYm9sXSB8fCBzeW1ib2wpICsgJ1xcJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlRXJyb3IoZXJyU3RyLCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGxleGVyLm1hdGNoLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBsZXhlci55eWxpbmVubyxcbiAgICAgICAgICAgICAgICAgICAgbG9jOiB5eWxvYyxcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25bMF0gaW5zdGFuY2VvZiBBcnJheSAmJiBhY3Rpb24ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJzZSBFcnJvcjogbXVsdGlwbGUgYWN0aW9ucyBwb3NzaWJsZSBhdCBzdGF0ZTogJyArIHN0YXRlICsgJywgdG9rZW46ICcgKyBzeW1ib2wpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uWzBdKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHN0YWNrLnB1c2goc3ltYm9sKTtcbiAgICAgICAgICAgIHZzdGFjay5wdXNoKGxleGVyLnl5dGV4dCk7XG4gICAgICAgICAgICBsc3RhY2sucHVzaChsZXhlci55eWxsb2MpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChhY3Rpb25bMV0pO1xuICAgICAgICAgICAgc3ltYm9sID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghcHJlRXJyb3JTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICB5eWxlbmcgPSBsZXhlci55eWxlbmc7XG4gICAgICAgICAgICAgICAgeXl0ZXh0ID0gbGV4ZXIueXl0ZXh0O1xuICAgICAgICAgICAgICAgIHl5bGluZW5vID0gbGV4ZXIueXlsaW5lbm87XG4gICAgICAgICAgICAgICAgeXlsb2MgPSBsZXhlci55eWxsb2M7XG4gICAgICAgICAgICAgICAgaWYgKHJlY292ZXJpbmcgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY292ZXJpbmctLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN5bWJvbCA9IHByZUVycm9yU3ltYm9sO1xuICAgICAgICAgICAgICAgIHByZUVycm9yU3ltYm9sID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBsZW4gPSB0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzFdO1xuICAgICAgICAgICAgeXl2YWwuJCA9IHZzdGFja1t2c3RhY2subGVuZ3RoIC0gbGVuXTtcbiAgICAgICAgICAgIHl5dmFsLl8kID0ge1xuICAgICAgICAgICAgICAgIGZpcnN0X2xpbmU6IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gKGxlbiB8fCAxKV0uZmlyc3RfbGluZSxcbiAgICAgICAgICAgICAgICBsYXN0X2xpbmU6IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ubGFzdF9saW5lLFxuICAgICAgICAgICAgICAgIGZpcnN0X2NvbHVtbjogbHN0YWNrW2xzdGFjay5sZW5ndGggLSAobGVuIHx8IDEpXS5maXJzdF9jb2x1bW4sXG4gICAgICAgICAgICAgICAgbGFzdF9jb2x1bW46IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ubGFzdF9jb2x1bW5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgeXl2YWwuXyQucmFuZ2UgPSBbXG4gICAgICAgICAgICAgICAgICAgIGxzdGFja1tsc3RhY2subGVuZ3RoIC0gKGxlbiB8fCAxKV0ucmFuZ2VbMF0sXG4gICAgICAgICAgICAgICAgICAgIGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ucmFuZ2VbMV1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgciA9IHRoaXMucGVyZm9ybUFjdGlvbi5hcHBseSh5eXZhbCwgW1xuICAgICAgICAgICAgICAgIHl5dGV4dCxcbiAgICAgICAgICAgICAgICB5eWxlbmcsXG4gICAgICAgICAgICAgICAgeXlsaW5lbm8sXG4gICAgICAgICAgICAgICAgc2hhcmVkU3RhdGUueXksXG4gICAgICAgICAgICAgICAgYWN0aW9uWzFdLFxuICAgICAgICAgICAgICAgIHZzdGFjayxcbiAgICAgICAgICAgICAgICBsc3RhY2tcbiAgICAgICAgICAgIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZW4pIHtcbiAgICAgICAgICAgICAgICBzdGFjayA9IHN0YWNrLnNsaWNlKDAsIC0xICogbGVuICogMik7XG4gICAgICAgICAgICAgICAgdnN0YWNrID0gdnN0YWNrLnNsaWNlKDAsIC0xICogbGVuKTtcbiAgICAgICAgICAgICAgICBsc3RhY2sgPSBsc3RhY2suc2xpY2UoMCwgLTEgKiBsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzBdKTtcbiAgICAgICAgICAgIHZzdGFjay5wdXNoKHl5dmFsLiQpO1xuICAgICAgICAgICAgbHN0YWNrLnB1c2goeXl2YWwuXyQpO1xuICAgICAgICAgICAgbmV3U3RhdGUgPSB0YWJsZVtzdGFja1tzdGFjay5sZW5ndGggLSAyXV1bc3RhY2tbc3RhY2subGVuZ3RoIC0gMV1dO1xuICAgICAgICAgICAgc3RhY2sucHVzaChuZXdTdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59fTtcblxuZnVuY3Rpb24gUGFyc2VyICgpIHtcbiAgdGhpcy55eSA9IHt9O1xufVxuUGFyc2VyLnByb3RvdHlwZSA9IHBhcnNlcjtwYXJzZXIuUGFyc2VyID0gUGFyc2VyO1xucmV0dXJuIG5ldyBQYXJzZXI7XG59KSgpO1xuXG5cbmlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG5leHBvcnRzLnBhcnNlciA9IHBhcnNlcjtcbmV4cG9ydHMuUGFyc2VyID0gcGFyc2VyLlBhcnNlcjtcbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBwYXJzZXIucGFyc2UuYXBwbHkocGFyc2VyLCBhcmd1bWVudHMpOyB9O1xuZXhwb3J0cy5tYWluID0gZnVuY3Rpb24gY29tbW9uanNNYWluIChhcmdzKSB7XG4gICAgaWYgKCFhcmdzWzFdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2FnZTogJythcmdzWzBdKycgRklMRScpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICAgIHZhciBzb3VyY2UgPSByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhyZXF1aXJlKCdwYXRoJykubm9ybWFsaXplKGFyZ3NbMV0pLCBcInV0ZjhcIik7XG4gICAgcmV0dXJuIGV4cG9ydHMucGFyc2VyLnBhcnNlKHNvdXJjZSk7XG59O1xuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGV4cG9ydHMubWFpbihwcm9jZXNzLmFyZ3Yuc2xpY2UoMSkpO1xufVxufVxufTtyZXF1aXJlWycuL25vZGVzJ10gPSBuZXcgZnVuY3Rpb24oKSB7XG4gIHZhciBleHBvcnRzID0gdGhpcztcbiAgLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjguMFxuKGZ1bmN0aW9uKCkge1xuICB2YXIgQXJndW1lbnRMaXN0VmFsdWUsIEJldHdlZW5PcCwgQ2FzZSwgQ2FzZUVsc2UsIENhc2VXaGVuLCBGaWVsZCwgRnVuY3Rpb25WYWx1ZSwgR3JvdXAsIEhhdmluZywgSm9pbiwgTGltaXQsIExpc3RWYWx1ZSwgTGl0ZXJhbFZhbHVlLCBOdW1iZXJWYWx1ZSwgT2Zmc2V0LCBPcCwgT3JkZXIsIE9yZGVyQXJndW1lbnQsIFBhcmFtZXRlclZhbHVlLCBTZWxlY3QsIFN0YXIsIFN0cmluZ1ZhbHVlLCBTdWJTZWxlY3QsIFRhYmxlLCBVbmFyeU9wLCBVbmlvbiwgV2hlcmUsIFdoaXRlcGFjZUxpc3QsIGluZGVudDtcblxuICBpbmRlbnQgPSBmdW5jdGlvbihzdHIpIHtcbiAgICB2YXIgbGluZTtcbiAgICByZXR1cm4gKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfaSwgX2xlbiwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgICBfcmVmID0gc3RyLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBsaW5lID0gX3JlZltfaV07XG4gICAgICAgIF9yZXN1bHRzLnB1c2goXCIgIFwiICsgbGluZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSkoKSkuam9pbihcIlxcblwiKTtcbiAgfTtcblxuICBleHBvcnRzLlNlbGVjdCA9IFNlbGVjdCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTZWxlY3QoZmllbGRzLCBzb3VyY2UsIGRpc3RpbmN0LCBqb2lucywgdW5pb25zKSB7XG4gICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgdGhpcy5kaXN0aW5jdCA9IGRpc3RpbmN0ICE9IG51bGwgPyBkaXN0aW5jdCA6IGZhbHNlO1xuICAgICAgdGhpcy5qb2lucyA9IGpvaW5zICE9IG51bGwgPyBqb2lucyA6IFtdO1xuICAgICAgdGhpcy51bmlvbnMgPSB1bmlvbnMgIT0gbnVsbCA/IHVuaW9ucyA6IFtdO1xuICAgICAgdGhpcy5vcmRlciA9IG51bGw7XG4gICAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICAgIHRoaXMud2hlcmUgPSBudWxsO1xuICAgICAgdGhpcy5saW1pdCA9IG51bGw7XG4gICAgfVxuXG4gICAgU2VsZWN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGpvaW4sIHJldCwgdW5pb24sIF9pLCBfaiwgX2xlbiwgX2xlbjEsIF9yZWYsIF9yZWYxO1xuICAgICAgcmV0ID0gW1wiU0VMRUNUIFwiICsgKHRoaXMuZmllbGRzLmpvaW4oJywgJykpXTtcbiAgICAgIHJldC5wdXNoKGluZGVudChcIkZST00gXCIgKyB0aGlzLnNvdXJjZSkpO1xuICAgICAgX3JlZiA9IHRoaXMuam9pbnM7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgam9pbiA9IF9yZWZbX2ldO1xuICAgICAgICByZXQucHVzaChpbmRlbnQoam9pbi50b1N0cmluZygpKSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy53aGVyZSkge1xuICAgICAgICByZXQucHVzaChpbmRlbnQodGhpcy53aGVyZS50b1N0cmluZygpKSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICByZXQucHVzaChpbmRlbnQodGhpcy5ncm91cC50b1N0cmluZygpKSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcmRlcikge1xuICAgICAgICByZXQucHVzaChpbmRlbnQodGhpcy5vcmRlci50b1N0cmluZygpKSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5saW1pdCkge1xuICAgICAgICByZXQucHVzaChpbmRlbnQodGhpcy5saW1pdC50b1N0cmluZygpKSk7XG4gICAgICB9XG4gICAgICBfcmVmMSA9IHRoaXMudW5pb25zO1xuICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjEubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgIHVuaW9uID0gX3JlZjFbX2pdO1xuICAgICAgICByZXQucHVzaCh1bmlvbi50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQuam9pbihcIlxcblwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNlbGVjdDtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuU3ViU2VsZWN0ID0gU3ViU2VsZWN0ID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFN1YlNlbGVjdChzZWxlY3QsIG5hbWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ID0gc2VsZWN0O1xuICAgICAgdGhpcy5uYW1lID0gbmFtZSAhPSBudWxsID8gbmFtZSA6IG51bGw7XG4gICAgICBudWxsO1xuICAgIH1cblxuICAgIFN1YlNlbGVjdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXQ7XG4gICAgICByZXQgPSBbXTtcbiAgICAgIHJldC5wdXNoKCcoJyk7XG4gICAgICByZXQucHVzaChpbmRlbnQodGhpcy5zZWxlY3QudG9TdHJpbmcoKSkpO1xuICAgICAgcmV0LnB1c2godGhpcy5uYW1lID8gXCIpIFwiICsgKHRoaXMubmFtZS50b1N0cmluZygpKSA6IFwiKVwiKTtcbiAgICAgIHJldHVybiByZXQuam9pbihcIlxcblwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFN1YlNlbGVjdDtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuSm9pbiA9IEpvaW4gPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gSm9pbihyaWdodCwgY29uZGl0aW9ucywgc2lkZSwgbW9kZSkge1xuICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9ucyAhPSBudWxsID8gY29uZGl0aW9ucyA6IG51bGw7XG4gICAgICB0aGlzLnNpZGUgPSBzaWRlICE9IG51bGwgPyBzaWRlIDogbnVsbDtcbiAgICAgIHRoaXMubW9kZSA9IG1vZGUgIT0gbnVsbCA/IG1vZGUgOiBudWxsO1xuICAgICAgbnVsbDtcbiAgICB9XG5cbiAgICBKb2luLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJldDtcbiAgICAgIHJldCA9ICcnO1xuICAgICAgaWYgKHRoaXMuc2lkZSAhPSBudWxsKSB7XG4gICAgICAgIHJldCArPSBcIlwiICsgdGhpcy5zaWRlICsgXCIgXCI7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlICE9IG51bGwpIHtcbiAgICAgICAgcmV0ICs9IFwiXCIgKyB0aGlzLm1vZGUgKyBcIiBcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQgKyAoXCJKT0lOIFwiICsgdGhpcy5yaWdodCArIFwiXFxuXCIpICsgaW5kZW50KFwiT04gXCIgKyB0aGlzLmNvbmRpdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gSm9pbjtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuVW5pb24gPSBVbmlvbiA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBVbmlvbihxdWVyeSwgYWxsKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICB0aGlzLmFsbCA9IGFsbCAhPSBudWxsID8gYWxsIDogZmFsc2U7XG4gICAgICBudWxsO1xuICAgIH1cblxuICAgIFVuaW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFsbDtcbiAgICAgIGFsbCA9IHRoaXMuYWxsID8gJyBBTEwnIDogJyc7XG4gICAgICByZXR1cm4gXCJVTklPTlwiICsgYWxsICsgXCJcXG5cIiArICh0aGlzLnF1ZXJ5LnRvU3RyaW5nKCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gVW5pb247XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLkxpdGVyYWxWYWx1ZSA9IExpdGVyYWxWYWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBMaXRlcmFsVmFsdWUodmFsdWUsIHZhbHVlMikge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZTIgPSB2YWx1ZTIgIT0gbnVsbCA/IHZhbHVlMiA6IG51bGw7XG4gICAgICBpZiAodGhpcy52YWx1ZTIpIHtcbiAgICAgICAgdGhpcy5uZXN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWUudmFsdWVzO1xuICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKHZhbHVlMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5lc3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IFt0aGlzLnZhbHVlXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBMaXRlcmFsVmFsdWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ocXVvdGUpIHtcbiAgICAgIGlmIChxdW90ZSA9PSBudWxsKSB7XG4gICAgICAgIHF1b3RlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChxdW90ZSkge1xuICAgICAgICByZXR1cm4gXCJgXCIgKyAodGhpcy52YWx1ZXMuam9pbignYC5gJykpICsgXCJgXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJcIiArICh0aGlzLnZhbHVlcy5qb2luKCcuJykpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gTGl0ZXJhbFZhbHVlO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5TdHJpbmdWYWx1ZSA9IFN0cmluZ1ZhbHVlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFN0cmluZ1ZhbHVlKHZhbHVlLCBxdW90ZVR5cGUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMucXVvdGVUeXBlID0gcXVvdGVUeXBlICE9IG51bGwgPyBxdW90ZVR5cGUgOiBcIicnXCI7XG4gICAgICBudWxsO1xuICAgIH1cblxuICAgIFN0cmluZ1ZhbHVlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVzY2FwZWQ7XG4gICAgICBlc2NhcGVkID0gdGhpcy5xdW90ZVR5cGUgPT09IFwiJ1wiID8gdGhpcy52YWx1ZS5yZXBsYWNlKC8oXnxbXlxcXFxdKScvZywgXCIkMScnXCIpIDogdGhpcy52YWx1ZTtcbiAgICAgIHJldHVybiBcIlwiICsgdGhpcy5xdW90ZVR5cGUgKyBlc2NhcGVkICsgdGhpcy5xdW90ZVR5cGU7XG4gICAgfTtcblxuICAgIHJldHVybiBTdHJpbmdWYWx1ZTtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuTnVtYmVyVmFsdWUgPSBOdW1iZXJWYWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBOdW1iZXJWYWx1ZSh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgTnVtYmVyVmFsdWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZS50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTnVtYmVyVmFsdWU7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLkxpc3RWYWx1ZSA9IExpc3RWYWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBMaXN0VmFsdWUodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgTGlzdFZhbHVlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiKFwiICsgKHRoaXMudmFsdWUuam9pbignLCAnKSkgKyBcIilcIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIExpc3RWYWx1ZTtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuV2hpdGVwYWNlTGlzdCA9IFdoaXRlcGFjZUxpc3QgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gV2hpdGVwYWNlTGlzdCh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgbnVsbDtcbiAgICB9XG5cbiAgICBXaGl0ZXBhY2VMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUubWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIGV4cG9ydHMuTGl0ZXJhbFZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgfSkuam9pbignICcpO1xuICAgIH07XG5cbiAgICByZXR1cm4gV2hpdGVwYWNlTGlzdDtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuUGFyYW1ldGVyVmFsdWUgPSBQYXJhbWV0ZXJWYWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBQYXJhbWV0ZXJWYWx1ZSh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5pbmRleCA9IHBhcnNlSW50KHZhbHVlLnN1YnN0cigxKSwgMTApIC0gMTtcbiAgICB9XG5cbiAgICBQYXJhbWV0ZXJWYWx1ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIiRcIiArIHRoaXMudmFsdWU7XG4gICAgfTtcblxuICAgIHJldHVybiBQYXJhbWV0ZXJWYWx1ZTtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuQXJndW1lbnRMaXN0VmFsdWUgPSBBcmd1bWVudExpc3RWYWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBBcmd1bWVudExpc3RWYWx1ZSh2YWx1ZSwgZGlzdGluY3QpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZGlzdGluY3QgPSBkaXN0aW5jdCAhPSBudWxsID8gZGlzdGluY3QgOiBmYWxzZTtcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgQXJndW1lbnRMaXN0VmFsdWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5kaXN0aW5jdCkge1xuICAgICAgICByZXR1cm4gXCJESVNUSU5DVCBcIiArICh0aGlzLnZhbHVlLmpvaW4oJywgJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyAodGhpcy52YWx1ZS5qb2luKCcsICcpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEFyZ3VtZW50TGlzdFZhbHVlO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5Cb29sZWFuVmFsdWUgPSBMaXRlcmFsVmFsdWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gTGl0ZXJhbFZhbHVlKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBzd2l0Y2ggKHZhbHVlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICBjYXNlICd0cnVlJzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgTGl0ZXJhbFZhbHVlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ05VTEwnO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gTGl0ZXJhbFZhbHVlO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5GdW5jdGlvblZhbHVlID0gRnVuY3Rpb25WYWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBGdW5jdGlvblZhbHVlKG5hbWUsIF9hcmd1bWVudHMsIHVkZikge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXNbXCJhcmd1bWVudHNcIl0gPSBfYXJndW1lbnRzICE9IG51bGwgPyBfYXJndW1lbnRzIDogbnVsbDtcbiAgICAgIHRoaXMudWRmID0gdWRmICE9IG51bGwgPyB1ZGYgOiBmYWxzZTtcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgRnVuY3Rpb25WYWx1ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzW1wiYXJndW1lbnRzXCJdKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgKHRoaXMubmFtZS50b1VwcGVyQ2FzZSgpKSArIFwiKFwiICsgKHRoaXNbXCJhcmd1bWVudHNcIl0udG9TdHJpbmcoKSkgKyBcIilcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgKHRoaXMubmFtZS50b1VwcGVyQ2FzZSgpKSArIFwiKClcIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEZ1bmN0aW9uVmFsdWU7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLkNhc2UgPSBDYXNlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIENhc2Uod2hlbnMsIF9lbHNlKSB7XG4gICAgICB0aGlzLndoZW5zID0gd2hlbnM7XG4gICAgICB0aGlzW1wiZWxzZVwiXSA9IF9lbHNlO1xuICAgIH1cblxuICAgIENhc2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgd2hlbnNTdHI7XG4gICAgICB3aGVuc1N0ciA9IHRoaXMud2hlbnMubWFwKGZ1bmN0aW9uKHcpIHtcbiAgICAgICAgcmV0dXJuIHcudG9TdHJpbmcoKTtcbiAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgIGlmICh0aGlzW1wiZWxzZVwiXSkge1xuICAgICAgICByZXR1cm4gXCJDQVNFIFwiICsgd2hlbnNTdHIgKyBcIiBcIiArICh0aGlzW1wiZWxzZVwiXS50b1N0cmluZygpKSArIFwiIEVORFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiQ0FTRSBcIiArIHdoZW5zU3RyICsgXCIgRU5EXCI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBDYXNlO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5DYXNlV2hlbiA9IENhc2VXaGVuID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIENhc2VXaGVuKHdoZW5Db25kaXRpb24sIHJlc0NvbmRpdGlvbikge1xuICAgICAgdGhpcy53aGVuQ29uZGl0aW9uID0gd2hlbkNvbmRpdGlvbjtcbiAgICAgIHRoaXMucmVzQ29uZGl0aW9uID0gcmVzQ29uZGl0aW9uO1xuICAgIH1cblxuICAgIENhc2VXaGVuLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiV0hFTiBcIiArIHRoaXMud2hlbkNvbmRpdGlvbiArIFwiIFRIRU4gXCIgKyB0aGlzLnJlc0NvbmRpdGlvbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENhc2VXaGVuO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5DYXNlRWxzZSA9IENhc2VFbHNlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIENhc2VFbHNlKGVsc2VDb25kaXRpb24pIHtcbiAgICAgIHRoaXMuZWxzZUNvbmRpdGlvbiA9IGVsc2VDb25kaXRpb247XG4gICAgfVxuXG4gICAgQ2FzZUVsc2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJFTFNFIFwiICsgdGhpcy5lbHNlQ29uZGl0aW9uO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ2FzZUVsc2U7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLk9yZGVyID0gT3JkZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gT3JkZXIob3JkZXJpbmdzLCBvZmZzZXQpIHtcbiAgICAgIHRoaXMub3JkZXJpbmdzID0gb3JkZXJpbmdzO1xuICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgfVxuXG4gICAgT3JkZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKFwiT1JERVIgQlkgXCIgKyAodGhpcy5vcmRlcmluZ3Muam9pbignLCAnKSkpICsgKHRoaXMub2Zmc2V0ID8gXCJcXG5cIiArIHRoaXMub2Zmc2V0LnRvU3RyaW5nKCkgOiBcIlwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE9yZGVyO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5PcmRlckFyZ3VtZW50ID0gT3JkZXJBcmd1bWVudCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBPcmRlckFyZ3VtZW50KHZhbHVlLCBkaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uICE9IG51bGwgPyBkaXJlY3Rpb24gOiAnQVNDJztcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgT3JkZXJBcmd1bWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIlwiICsgdGhpcy52YWx1ZSArIFwiIFwiICsgdGhpcy5kaXJlY3Rpb247XG4gICAgfTtcblxuICAgIHJldHVybiBPcmRlckFyZ3VtZW50O1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5PZmZzZXQgPSBPZmZzZXQgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gT2Zmc2V0KHJvd19jb3VudCwgbGltaXQpIHtcbiAgICAgIHRoaXMucm93X2NvdW50ID0gcm93X2NvdW50O1xuICAgICAgdGhpcy5saW1pdCA9IGxpbWl0O1xuICAgICAgbnVsbDtcbiAgICB9XG5cbiAgICBPZmZzZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKFwiT0ZGU0VUIFwiICsgdGhpcy5yb3dfY291bnQgKyBcIiBST1dTXCIpICsgKHRoaXMubGltaXQgPyBcIlxcbkZFVENIIE5FWFQgXCIgKyB0aGlzLmxpbWl0ICsgXCIgUk9XUyBPTkxZXCIgOiBcIlwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE9mZnNldDtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuTGltaXQgPSBMaW1pdCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBMaW1pdCh2YWx1ZSwgb2Zmc2V0KSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgTGltaXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKFwiTElNSVQgXCIgKyB0aGlzLnZhbHVlKSArICh0aGlzLm9mZnNldCA/IFwiXFxuT0ZGU0VUIFwiICsgdGhpcy5vZmZzZXQgOiBcIlwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIExpbWl0O1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5UYWJsZSA9IFRhYmxlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFRhYmxlKG5hbWUsIGFsaWFzLCB3aW4sIHdpbkZuLCB3aW5BcmcpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLmFsaWFzID0gYWxpYXMgIT0gbnVsbCA/IGFsaWFzIDogbnVsbDtcbiAgICAgIHRoaXMud2luID0gd2luICE9IG51bGwgPyB3aW4gOiBudWxsO1xuICAgICAgdGhpcy53aW5GbiA9IHdpbkZuICE9IG51bGwgPyB3aW5GbiA6IG51bGw7XG4gICAgICB0aGlzLndpbkFyZyA9IHdpbkFyZyAhPSBudWxsID8gd2luQXJnIDogbnVsbDtcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgVGFibGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy53aW4pIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLm5hbWUgKyBcIi5cIiArIHRoaXMud2luICsgXCI6XCIgKyB0aGlzLndpbkZuICsgXCIoXCIgKyB0aGlzLndpbkFyZyArIFwiKVwiO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmFsaWFzKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5uYW1lICsgXCIgQVMgXCIgKyB0aGlzLmFsaWFzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZS50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gVGFibGU7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLkdyb3VwID0gR3JvdXAgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gR3JvdXAoZmllbGRzKSB7XG4gICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgIHRoaXMuaGF2aW5nID0gbnVsbDtcbiAgICB9XG5cbiAgICBHcm91cC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXQ7XG4gICAgICByZXQgPSBbXCJHUk9VUCBCWSBcIiArICh0aGlzLmZpZWxkcy5qb2luKCcsICcpKV07XG4gICAgICBpZiAodGhpcy5oYXZpbmcpIHtcbiAgICAgICAgcmV0LnB1c2godGhpcy5oYXZpbmcudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0LmpvaW4oXCJcXG5cIik7XG4gICAgfTtcblxuICAgIHJldHVybiBHcm91cDtcblxuICB9KSgpO1xuXG4gIGV4cG9ydHMuV2hlcmUgPSBXaGVyZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBXaGVyZShjb25kaXRpb25zKSB7XG4gICAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zO1xuICAgICAgbnVsbDtcbiAgICB9XG5cbiAgICBXaGVyZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIldIRVJFIFwiICsgdGhpcy5jb25kaXRpb25zO1xuICAgIH07XG5cbiAgICByZXR1cm4gV2hlcmU7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLkhhdmluZyA9IEhhdmluZyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBIYXZpbmcoY29uZGl0aW9ucykge1xuICAgICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9ucztcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgSGF2aW5nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiSEFWSU5HIFwiICsgdGhpcy5jb25kaXRpb25zO1xuICAgIH07XG5cbiAgICByZXR1cm4gSGF2aW5nO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5PcCA9IE9wID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIE9wKG9wZXJhdGlvbiwgbGVmdCwgcmlnaHQpIHtcbiAgICAgIHRoaXMub3BlcmF0aW9uID0gb3BlcmF0aW9uO1xuICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgT3AucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCIoXCIgKyB0aGlzLmxlZnQgKyBcIiBcIiArICh0aGlzLm9wZXJhdGlvbi50b1VwcGVyQ2FzZSgpKSArIFwiIFwiICsgdGhpcy5yaWdodCArIFwiKVwiO1xuICAgIH07XG5cbiAgICByZXR1cm4gT3A7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLlVuYXJ5T3AgPSBVbmFyeU9wID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFVuYXJ5T3Aob3BlcmF0b3IsIG9wZXJhbmQpIHtcbiAgICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgIHRoaXMub3BlcmFuZCA9IG9wZXJhbmQ7XG4gICAgICBudWxsO1xuICAgIH1cblxuICAgIFVuYXJ5T3AucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCIoXCIgKyAodGhpcy5vcGVyYXRvci50b1VwcGVyQ2FzZSgpKSArIFwiIFwiICsgdGhpcy5vcGVyYW5kICsgXCIpXCI7XG4gICAgfTtcblxuICAgIHJldHVybiBVbmFyeU9wO1xuXG4gIH0pKCk7XG5cbiAgZXhwb3J0cy5CZXR3ZWVuT3AgPSBCZXR3ZWVuT3AgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gQmV0d2Vlbk9wKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICBudWxsO1xuICAgIH1cblxuICAgIEJldHdlZW5PcC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIlwiICsgKHRoaXMudmFsdWUuam9pbignIEFORCAnKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBCZXR3ZWVuT3A7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLkZpZWxkID0gRmllbGQgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRmllbGQoZmllbGQsIG5hbWUpIHtcbiAgICAgIHRoaXMuZmllbGQgPSBmaWVsZDtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWUgIT0gbnVsbCA/IG5hbWUgOiBudWxsO1xuICAgICAgbnVsbDtcbiAgICB9XG5cbiAgICBGaWVsZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmZpZWxkICsgXCIgQVMgXCIgKyB0aGlzLm5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZC50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRmllbGQ7XG5cbiAgfSkoKTtcblxuICBleHBvcnRzLlN0YXIgPSBTdGFyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFN0YXIoKSB7XG4gICAgICBudWxsO1xuICAgIH1cblxuICAgIFN0YXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJyonO1xuICAgIH07XG5cbiAgICBTdGFyLnByb3RvdHlwZS5zdGFyID0gdHJ1ZTtcblxuICAgIHJldHVybiBTdGFyO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG5cbn07cmVxdWlyZVsnLi9wYXJzZXInXSA9IG5ldyBmdW5jdGlvbigpIHtcbiAgdmFyIGV4cG9ydHMgPSB0aGlzO1xuICAvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuOC4wXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBidWlsZFBhcnNlcjtcblxuICBidWlsZFBhcnNlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJzZXI7XG4gICAgcGFyc2VyID0gcmVxdWlyZSgnLi9jb21waWxlZF9wYXJzZXInKS5wYXJzZXI7XG4gICAgcGFyc2VyLmxleGVyID0ge1xuICAgICAgbGV4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRhZywgX3JlZjtcbiAgICAgICAgX3JlZiA9IHRoaXMudG9rZW5zW3RoaXMucG9zKytdIHx8IFsnJ10sIHRhZyA9IF9yZWZbMF0sIHRoaXMueXl0ZXh0ID0gX3JlZlsxXSwgdGhpcy55eWxpbmVubyA9IF9yZWZbMl07XG4gICAgICAgIHJldHVybiB0YWc7XG4gICAgICB9LFxuICAgICAgc2V0SW5wdXQ6IGZ1bmN0aW9uKHRva2Vucykge1xuICAgICAgICB0aGlzLnRva2VucyA9IHRva2VucztcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zID0gMDtcbiAgICAgIH0sXG4gICAgICB1cGNvbWluZ0lucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9XG4gICAgfTtcbiAgICBwYXJzZXIueXkgPSByZXF1aXJlKCcuL25vZGVzJyk7XG4gICAgcmV0dXJuIHBhcnNlcjtcbiAgfTtcblxuICBleHBvcnRzLnBhcnNlciA9IGJ1aWxkUGFyc2VyKCk7XG5cbiAgZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBidWlsZFBhcnNlcigpLnBhcnNlKHN0cik7XG4gIH07XG5cbn0pLmNhbGwodGhpcyk7XG5cbn07cmVxdWlyZVsnLi9zcWxfcGFyc2VyJ10gPSBuZXcgZnVuY3Rpb24oKSB7XG4gIHZhciBleHBvcnRzID0gdGhpcztcbiAgLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjguMFxuKGZ1bmN0aW9uKCkge1xuICBleHBvcnRzLmxleGVyID0gcmVxdWlyZSgnLi9sZXhlcicpO1xuXG4gIGV4cG9ydHMucGFyc2VyID0gcmVxdWlyZSgnLi9wYXJzZXInKTtcblxuICBleHBvcnRzLm5vZGVzID0gcmVxdWlyZSgnLi9ub2RlcycpO1xuXG4gIGV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbihzcWwpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5wYXJzZXIucGFyc2UoZXhwb3J0cy5sZXhlci50b2tlbml6ZShzcWwpKTtcbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcblxufTtcbiAgICByZXR1cm4gcmVxdWlyZVsnLi9zcWxfcGFyc2VyJ11cbiAgfSgpO1xuXG4gIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIFNRTFBhcnNlciB9KTtcbiAgfSBlbHNlIHsgcm9vdC5TUUxQYXJzZXIgPSBTUUxQYXJzZXIgfVxufSh0aGlzKSk7XG4iLCIvLyBkb1QuanNcbi8vIDIwMTEtMjAxNCwgTGF1cmEgRG9rdG9yb3ZhLCBodHRwczovL2dpdGh1Yi5jb20vb2xhZG8vZG9UXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBkb1QgPSB7XG5cdFx0bmFtZTogXCJkb1RcIixcblx0XHR2ZXJzaW9uOiBcIjEuMS4xXCIsXG5cdFx0dGVtcGxhdGVTZXR0aW5nczoge1xuXHRcdFx0ZXZhbHVhdGU6ICAgIC9cXHtcXHsoW1xcc1xcU10rPyhcXH0/KSspXFx9XFx9L2csXG5cdFx0XHRpbnRlcnBvbGF0ZTogL1xce1xcez0oW1xcc1xcU10rPylcXH1cXH0vZyxcblx0XHRcdGVuY29kZTogICAgICAvXFx7XFx7IShbXFxzXFxTXSs/KVxcfVxcfS9nLFxuXHRcdFx0dXNlOiAgICAgICAgIC9cXHtcXHsjKFtcXHNcXFNdKz8pXFx9XFx9L2csXG5cdFx0XHR1c2VQYXJhbXM6ICAgLyhefFteXFx3JF0pZGVmKD86XFwufFxcW1tcXCdcXFwiXSkoW1xcdyRcXC5dKykoPzpbXFwnXFxcIl1cXF0pP1xccypcXDpcXHMqKFtcXHckXFwuXSt8XFxcIlteXFxcIl0rXFxcInxcXCdbXlxcJ10rXFwnfFxce1teXFx9XStcXH0pL2csXG5cdFx0XHRkZWZpbmU6ICAgICAgL1xce1xceyMjXFxzKihbXFx3XFwuJF0rKVxccyooXFw6fD0pKFtcXHNcXFNdKz8pI1xcfVxcfS9nLFxuXHRcdFx0ZGVmaW5lUGFyYW1zOi9eXFxzKihbXFx3JF0rKTooW1xcc1xcU10rKS8sXG5cdFx0XHRjb25kaXRpb25hbDogL1xce1xce1xcPyhcXD8pP1xccyooW1xcc1xcU10qPylcXHMqXFx9XFx9L2csXG5cdFx0XHRpdGVyYXRlOiAgICAgL1xce1xce35cXHMqKD86XFx9XFx9fChbXFxzXFxTXSs/KVxccypcXDpcXHMqKFtcXHckXSspXFxzKig/OlxcOlxccyooW1xcdyRdKykpP1xccypcXH1cXH0pL2csXG5cdFx0XHR2YXJuYW1lOlx0XCJpdFwiLFxuXHRcdFx0c3RyaXA6XHRcdHRydWUsXG5cdFx0XHRhcHBlbmQ6XHRcdHRydWUsXG5cdFx0XHRzZWxmY29udGFpbmVkOiBmYWxzZSxcblx0XHRcdGRvTm90U2tpcEVuY29kZWQ6IGZhbHNlXG5cdFx0fSxcblx0XHR0ZW1wbGF0ZTogdW5kZWZpbmVkLCAvL2ZuLCBjb21waWxlIHRlbXBsYXRlXG5cdFx0Y29tcGlsZTogIHVuZGVmaW5lZCwgLy9mbiwgZm9yIGV4cHJlc3Ncblx0XHRsb2c6IHRydWVcblx0fSwgX2dsb2JhbHM7XG5cblx0ZG9ULmVuY29kZUhUTUxTb3VyY2UgPSBmdW5jdGlvbihkb05vdFNraXBFbmNvZGVkKSB7XG5cdFx0dmFyIGVuY29kZUhUTUxSdWxlcyA9IHsgXCImXCI6IFwiJiMzODtcIiwgXCI8XCI6IFwiJiM2MDtcIiwgXCI+XCI6IFwiJiM2MjtcIiwgJ1wiJzogXCImIzM0O1wiLCBcIidcIjogXCImIzM5O1wiLCBcIi9cIjogXCImIzQ3O1wiIH0sXG5cdFx0XHRtYXRjaEhUTUwgPSBkb05vdFNraXBFbmNvZGVkID8gL1smPD5cIidcXC9dL2cgOiAvJig/ISM/XFx3KzspfDx8PnxcInwnfFxcLy9nO1xuXHRcdHJldHVybiBmdW5jdGlvbihjb2RlKSB7XG5cdFx0XHRyZXR1cm4gY29kZSA/IGNvZGUudG9TdHJpbmcoKS5yZXBsYWNlKG1hdGNoSFRNTCwgZnVuY3Rpb24obSkge3JldHVybiBlbmNvZGVIVE1MUnVsZXNbbV0gfHwgbTt9KSA6IFwiXCI7XG5cdFx0fTtcblx0fTtcblxuXHRfZ2xvYmFscyA9IChmdW5jdGlvbigpeyByZXR1cm4gdGhpcyB8fCAoMCxldmFsKShcInRoaXNcIik7IH0oKSk7XG5cblx0LyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGRvVDtcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpe3JldHVybiBkb1Q7fSk7XG5cdH0gZWxzZSB7XG5cdFx0X2dsb2JhbHMuZG9UID0gZG9UO1xuXHR9XG5cblx0dmFyIHN0YXJ0ZW5kID0ge1xuXHRcdGFwcGVuZDogeyBzdGFydDogXCInKyhcIiwgICAgICBlbmQ6IFwiKSsnXCIsICAgICAgc3RhcnRlbmNvZGU6IFwiJytlbmNvZGVIVE1MKFwiIH0sXG5cdFx0c3BsaXQ6ICB7IHN0YXJ0OiBcIic7b3V0Kz0oXCIsIGVuZDogXCIpO291dCs9J1wiLCBzdGFydGVuY29kZTogXCInO291dCs9ZW5jb2RlSFRNTChcIiB9XG5cdH0sIHNraXAgPSAvJF4vO1xuXG5cdGZ1bmN0aW9uIHJlc29sdmVEZWZzKGMsIGJsb2NrLCBkZWYpIHtcblx0XHRyZXR1cm4gKCh0eXBlb2YgYmxvY2sgPT09IFwic3RyaW5nXCIpID8gYmxvY2sgOiBibG9jay50b1N0cmluZygpKVxuXHRcdC5yZXBsYWNlKGMuZGVmaW5lIHx8IHNraXAsIGZ1bmN0aW9uKG0sIGNvZGUsIGFzc2lnbiwgdmFsdWUpIHtcblx0XHRcdGlmIChjb2RlLmluZGV4T2YoXCJkZWYuXCIpID09PSAwKSB7XG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZyg0KTtcblx0XHRcdH1cblx0XHRcdGlmICghKGNvZGUgaW4gZGVmKSkge1xuXHRcdFx0XHRpZiAoYXNzaWduID09PSBcIjpcIikge1xuXHRcdFx0XHRcdGlmIChjLmRlZmluZVBhcmFtcykgdmFsdWUucmVwbGFjZShjLmRlZmluZVBhcmFtcywgZnVuY3Rpb24obSwgcGFyYW0sIHYpIHtcblx0XHRcdFx0XHRcdGRlZltjb2RlXSA9IHthcmc6IHBhcmFtLCB0ZXh0OiB2fTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoIShjb2RlIGluIGRlZikpIGRlZltjb2RlXT0gdmFsdWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bmV3IEZ1bmN0aW9uKFwiZGVmXCIsIFwiZGVmWydcIitjb2RlK1wiJ109XCIgKyB2YWx1ZSkoZGVmKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0fSlcblx0XHQucmVwbGFjZShjLnVzZSB8fCBza2lwLCBmdW5jdGlvbihtLCBjb2RlKSB7XG5cdFx0XHRpZiAoYy51c2VQYXJhbXMpIGNvZGUgPSBjb2RlLnJlcGxhY2UoYy51c2VQYXJhbXMsIGZ1bmN0aW9uKG0sIHMsIGQsIHBhcmFtKSB7XG5cdFx0XHRcdGlmIChkZWZbZF0gJiYgZGVmW2RdLmFyZyAmJiBwYXJhbSkge1xuXHRcdFx0XHRcdHZhciBydyA9IChkK1wiOlwiK3BhcmFtKS5yZXBsYWNlKC8nfFxcXFwvZywgXCJfXCIpO1xuXHRcdFx0XHRcdGRlZi5fX2V4cCA9IGRlZi5fX2V4cCB8fCB7fTtcblx0XHRcdFx0XHRkZWYuX19leHBbcnddID0gZGVmW2RdLnRleHQucmVwbGFjZShuZXcgUmVnRXhwKFwiKF58W15cXFxcdyRdKVwiICsgZGVmW2RdLmFyZyArIFwiKFteXFxcXHckXSlcIiwgXCJnXCIpLCBcIiQxXCIgKyBwYXJhbSArIFwiJDJcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHMgKyBcImRlZi5fX2V4cFsnXCIrcncrXCInXVwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHZhciB2ID0gbmV3IEZ1bmN0aW9uKFwiZGVmXCIsIFwicmV0dXJuIFwiICsgY29kZSkoZGVmKTtcblx0XHRcdHJldHVybiB2ID8gcmVzb2x2ZURlZnMoYywgdiwgZGVmKSA6IHY7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiB1bmVzY2FwZShjb2RlKSB7XG5cdFx0cmV0dXJuIGNvZGUucmVwbGFjZSgvXFxcXCgnfFxcXFwpL2csIFwiJDFcIikucmVwbGFjZSgvW1xcclxcdFxcbl0vZywgXCIgXCIpO1xuXHR9XG5cblx0ZG9ULnRlbXBsYXRlID0gZnVuY3Rpb24odG1wbCwgYywgZGVmKSB7XG5cdFx0YyA9IGMgfHwgZG9ULnRlbXBsYXRlU2V0dGluZ3M7XG5cdFx0dmFyIGNzZSA9IGMuYXBwZW5kID8gc3RhcnRlbmQuYXBwZW5kIDogc3RhcnRlbmQuc3BsaXQsIG5lZWRodG1sZW5jb2RlLCBzaWQgPSAwLCBpbmR2LFxuXHRcdFx0c3RyICA9IChjLnVzZSB8fCBjLmRlZmluZSkgPyByZXNvbHZlRGVmcyhjLCB0bXBsLCBkZWYgfHwge30pIDogdG1wbDtcblxuXHRcdHN0ciA9IChcInZhciBvdXQ9J1wiICsgKGMuc3RyaXAgPyBzdHIucmVwbGFjZSgvKF58XFxyfFxcbilcXHQqICt8ICtcXHQqKFxccnxcXG58JCkvZyxcIiBcIilcblx0XHRcdFx0XHQucmVwbGFjZSgvXFxyfFxcbnxcXHR8XFwvXFwqW1xcc1xcU10qP1xcKlxcLy9nLFwiXCIpOiBzdHIpXG5cdFx0XHQucmVwbGFjZSgvJ3xcXFxcL2csIFwiXFxcXCQmXCIpXG5cdFx0XHQucmVwbGFjZShjLmludGVycG9sYXRlIHx8IHNraXAsIGZ1bmN0aW9uKG0sIGNvZGUpIHtcblx0XHRcdFx0cmV0dXJuIGNzZS5zdGFydCArIHVuZXNjYXBlKGNvZGUpICsgY3NlLmVuZDtcblx0XHRcdH0pXG5cdFx0XHQucmVwbGFjZShjLmVuY29kZSB8fCBza2lwLCBmdW5jdGlvbihtLCBjb2RlKSB7XG5cdFx0XHRcdG5lZWRodG1sZW5jb2RlID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuIGNzZS5zdGFydGVuY29kZSArIHVuZXNjYXBlKGNvZGUpICsgY3NlLmVuZDtcblx0XHRcdH0pXG5cdFx0XHQucmVwbGFjZShjLmNvbmRpdGlvbmFsIHx8IHNraXAsIGZ1bmN0aW9uKG0sIGVsc2VjYXNlLCBjb2RlKSB7XG5cdFx0XHRcdHJldHVybiBlbHNlY2FzZSA/XG5cdFx0XHRcdFx0KGNvZGUgPyBcIic7fWVsc2UgaWYoXCIgKyB1bmVzY2FwZShjb2RlKSArIFwiKXtvdXQrPSdcIiA6IFwiJzt9ZWxzZXtvdXQrPSdcIikgOlxuXHRcdFx0XHRcdChjb2RlID8gXCInO2lmKFwiICsgdW5lc2NhcGUoY29kZSkgKyBcIil7b3V0Kz0nXCIgOiBcIic7fW91dCs9J1wiKTtcblx0XHRcdH0pXG5cdFx0XHQucmVwbGFjZShjLml0ZXJhdGUgfHwgc2tpcCwgZnVuY3Rpb24obSwgaXRlcmF0ZSwgdm5hbWUsIGluYW1lKSB7XG5cdFx0XHRcdGlmICghaXRlcmF0ZSkgcmV0dXJuIFwiJzt9IH0gb3V0Kz0nXCI7XG5cdFx0XHRcdHNpZCs9MTsgaW5kdj1pbmFtZSB8fCBcImlcIitzaWQ7IGl0ZXJhdGU9dW5lc2NhcGUoaXRlcmF0ZSk7XG5cdFx0XHRcdHJldHVybiBcIic7dmFyIGFyclwiK3NpZCtcIj1cIitpdGVyYXRlK1wiO2lmKGFyclwiK3NpZCtcIil7dmFyIFwiK3ZuYW1lK1wiLFwiK2luZHYrXCI9LTEsbFwiK3NpZCtcIj1hcnJcIitzaWQrXCIubGVuZ3RoLTE7d2hpbGUoXCIraW5kditcIjxsXCIrc2lkK1wiKXtcIlxuXHRcdFx0XHRcdCt2bmFtZStcIj1hcnJcIitzaWQrXCJbXCIraW5kditcIis9MV07b3V0Kz0nXCI7XG5cdFx0XHR9KVxuXHRcdFx0LnJlcGxhY2UoYy5ldmFsdWF0ZSB8fCBza2lwLCBmdW5jdGlvbihtLCBjb2RlKSB7XG5cdFx0XHRcdHJldHVybiBcIic7XCIgKyB1bmVzY2FwZShjb2RlKSArIFwib3V0Kz0nXCI7XG5cdFx0XHR9KVxuXHRcdFx0KyBcIic7cmV0dXJuIG91dDtcIilcblx0XHRcdC5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKS5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JykucmVwbGFjZSgvXFxyL2csIFwiXFxcXHJcIilcblx0XHRcdC5yZXBsYWNlKC8oXFxzfDt8XFx9fF58XFx7KW91dFxcKz0nJzsvZywgJyQxJykucmVwbGFjZSgvXFwrJycvZywgXCJcIik7XG5cdFx0XHQvLy5yZXBsYWNlKC8oXFxzfDt8XFx9fF58XFx7KW91dFxcKz0nJ1xcKy9nLCckMW91dCs9Jyk7XG5cblx0XHRpZiAobmVlZGh0bWxlbmNvZGUpIHtcblx0XHRcdGlmICghYy5zZWxmY29udGFpbmVkICYmIF9nbG9iYWxzICYmICFfZ2xvYmFscy5fZW5jb2RlSFRNTCkgX2dsb2JhbHMuX2VuY29kZUhUTUwgPSBkb1QuZW5jb2RlSFRNTFNvdXJjZShjLmRvTm90U2tpcEVuY29kZWQpO1xuXHRcdFx0c3RyID0gXCJ2YXIgZW5jb2RlSFRNTCA9IHR5cGVvZiBfZW5jb2RlSFRNTCAhPT0gJ3VuZGVmaW5lZCcgPyBfZW5jb2RlSFRNTCA6IChcIlxuXHRcdFx0XHQrIGRvVC5lbmNvZGVIVE1MU291cmNlLnRvU3RyaW5nKCkgKyBcIihcIiArIChjLmRvTm90U2tpcEVuY29kZWQgfHwgJycpICsgXCIpKTtcIlxuXHRcdFx0XHQrIHN0cjtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBuZXcgRnVuY3Rpb24oYy52YXJuYW1lLCBzdHIpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5cdFx0XHRpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpIGNvbnNvbGUubG9nKFwiQ291bGQgbm90IGNyZWF0ZSBhIHRlbXBsYXRlIGZ1bmN0aW9uOiBcIiArIHN0cik7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH1cblx0fTtcblxuXHRkb1QuY29tcGlsZSA9IGZ1bmN0aW9uKHRtcGwsIGRlZikge1xuXHRcdHJldHVybiBkb1QudGVtcGxhdGUodG1wbCwgbnVsbCwgZGVmKTtcblx0fTtcbn0oKSk7XG4iLCJ2YXIgRGF0ZUZvcm1hdHRlcjshZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgRCxzLHIsYSxuO0Q9ZnVuY3Rpb24oZSx0KXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZSYmXCJzdHJpbmdcIj09dHlwZW9mIHQmJmUudG9Mb3dlckNhc2UoKT09PXQudG9Mb3dlckNhc2UoKX0scz1mdW5jdGlvbihlLHQsYSl7dmFyIG49YXx8XCIwXCIscj1lLnRvU3RyaW5nKCk7cmV0dXJuIHIubGVuZ3RoPHQ/cyhuK3IsdCk6cn0scj1mdW5jdGlvbihlKXt2YXIgdCxhO2ZvcihlPWV8fHt9LHQ9MTt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKWlmKGE9YXJndW1lbnRzW3RdKWZvcih2YXIgbiBpbiBhKWEuaGFzT3duUHJvcGVydHkobikmJihcIm9iamVjdFwiPT10eXBlb2YgYVtuXT9yKGVbbl0sYVtuXSk6ZVtuXT1hW25dKTtyZXR1cm4gZX0sYT1mdW5jdGlvbihlLHQpe2Zvcih2YXIgYT0wO2E8dC5sZW5ndGg7YSsrKWlmKHRbYV0udG9Mb3dlckNhc2UoKT09PWUudG9Mb3dlckNhc2UoKSlyZXR1cm4gYTtyZXR1cm4tMX0sbj17ZGF0ZVNldHRpbmdzOntkYXlzOltcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLGRheXNTaG9ydDpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIl0sbW9udGhzOltcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSxtb250aHNTaG9ydDpbXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCJdLG1lcmlkaWVtOltcIkFNXCIsXCJQTVwiXSxvcmRpbmFsOmZ1bmN0aW9uKGUpe3ZhciB0PWUlMTAsYT17MTpcInN0XCIsMjpcIm5kXCIsMzpcInJkXCJ9O3JldHVybiAxIT09TWF0aC5mbG9vcihlJTEwMC8xMCkmJmFbdF0/YVt0XTpcInRoXCJ9fSxzZXBhcmF0b3JzOi9bIFxcLStcXC9cXC5UOkBdL2csdmFsaWRQYXJ0czovW2REamxOU3d6V0ZtTW50TG9ZeWFBQmdHaEhpc3VlVElPUFpjclVdL2csaW50UGFydHM6L1tkandOem1ueVloSGdHaXNdL2csdHpQYXJ0czovXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZyx0ekNsaXA6L1teLStcXGRBLVpdL2d9LChEYXRlRm9ybWF0dGVyPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsYT1yKG4sZSk7dC5kYXRlU2V0dGluZ3M9YS5kYXRlU2V0dGluZ3MsdC5zZXBhcmF0b3JzPWEuc2VwYXJhdG9ycyx0LnZhbGlkUGFydHM9YS52YWxpZFBhcnRzLHQuaW50UGFydHM9YS5pbnRQYXJ0cyx0LnR6UGFydHM9YS50elBhcnRzLHQudHpDbGlwPWEudHpDbGlwfSkucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpEYXRlRm9ybWF0dGVyLGdldE1vbnRoOmZ1bmN0aW9uKGUpe3ZhciB0O3JldHVybiAwPT09KHQ9YShlLHRoaXMuZGF0ZVNldHRpbmdzLm1vbnRoc1Nob3J0KSsxKSYmKHQ9YShlLHRoaXMuZGF0ZVNldHRpbmdzLm1vbnRocykrMSksdH0scGFyc2VEYXRlOmZ1bmN0aW9uKGUsdCl7dmFyIGEsbixyLG8saSxzLGQsdSxsLGYsYz10aGlzLG09ITEsaD0hMSxnPWMuZGF0ZVNldHRpbmdzLHA9e2RhdGU6bnVsbCx5ZWFyOm51bGwsbW9udGg6bnVsbCxkYXk6bnVsbCxob3VyOjAsbWluOjAsc2VjOjB9O2lmKCFlKXJldHVybiBudWxsO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBlO2lmKFwiVVwiPT09dClyZXR1cm4ocj1wYXJzZUludChlKSk/bmV3IERhdGUoMWUzKnIpOmU7c3dpdGNoKHR5cGVvZiBlKXtjYXNlXCJudW1iZXJcIjpyZXR1cm4gbmV3IERhdGUoZSk7Y2FzZVwic3RyaW5nXCI6YnJlYWs7ZGVmYXVsdDpyZXR1cm4gbnVsbH1pZighKGE9dC5tYXRjaChjLnZhbGlkUGFydHMpKXx8MD09PWEubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBmb3JtYXQgZGVmaW5pdGlvbi5cIik7Zm9yKG49ZS5yZXBsYWNlKGMuc2VwYXJhdG9ycyxcIlxcMFwiKS5zcGxpdChcIlxcMFwiKSxyPTA7cjxuLmxlbmd0aDtyKyspc3dpdGNoKG89bltyXSxpPXBhcnNlSW50KG8pLGFbcl0pe2Nhc2VcInlcIjpjYXNlXCJZXCI6aWYoIWkpcmV0dXJuIG51bGw7bD1vLmxlbmd0aCxwLnllYXI9Mj09PWw/cGFyc2VJbnQoKGk8NzA/XCIyMFwiOlwiMTlcIikrbyk6aSxtPSEwO2JyZWFrO2Nhc2VcIm1cIjpjYXNlXCJuXCI6Y2FzZVwiTVwiOmNhc2VcIkZcIjppZihpc05hTihpKSl7aWYoISgwPChzPWMuZ2V0TW9udGgobykpKSlyZXR1cm4gbnVsbDtwLm1vbnRoPXN9ZWxzZXtpZighKDE8PWkmJmk8PTEyKSlyZXR1cm4gbnVsbDtwLm1vbnRoPWl9bT0hMDticmVhaztjYXNlXCJkXCI6Y2FzZVwialwiOmlmKCEoMTw9aSYmaTw9MzEpKXJldHVybiBudWxsO3AuZGF5PWksbT0hMDticmVhaztjYXNlXCJnXCI6Y2FzZVwiaFwiOmlmKGY9bltkPS0xPGEuaW5kZXhPZihcImFcIik/YS5pbmRleE9mKFwiYVwiKTotMTxhLmluZGV4T2YoXCJBXCIpP2EuaW5kZXhPZihcIkFcIik6LTFdLC0xPGQpdT1EKGYsZy5tZXJpZGllbVswXSk/MDpEKGYsZy5tZXJpZGllbVsxXSk/MTI6LTEsMTw9aSYmaTw9MTImJi0xPHU/cC5ob3VyPWkrdS0xOjA8PWkmJmk8PTIzJiYocC5ob3VyPWkpO2Vsc2V7aWYoISgwPD1pJiZpPD0yMykpcmV0dXJuIG51bGw7cC5ob3VyPWl9aD0hMDticmVhaztjYXNlXCJHXCI6Y2FzZVwiSFwiOmlmKCEoMDw9aSYmaTw9MjMpKXJldHVybiBudWxsO3AuaG91cj1pLGg9ITA7YnJlYWs7Y2FzZVwiaVwiOmlmKCEoMDw9aSYmaTw9NTkpKXJldHVybiBudWxsO3AubWluPWksaD0hMDticmVhaztjYXNlXCJzXCI6aWYoISgwPD1pJiZpPD01OSkpcmV0dXJuIG51bGw7cC5zZWM9aSxoPSEwfWlmKCEwPT09bSYmcC55ZWFyJiZwLm1vbnRoJiZwLmRheSlwLmRhdGU9bmV3IERhdGUocC55ZWFyLHAubW9udGgtMSxwLmRheSxwLmhvdXIscC5taW4scC5zZWMsMCk7ZWxzZXtpZighMCE9PWgpcmV0dXJuIG51bGw7cC5kYXRlPW5ldyBEYXRlKDAsMCwwLHAuaG91cixwLm1pbixwLnNlYywwKX1yZXR1cm4gcC5kYXRlfSxndWVzc0RhdGU6ZnVuY3Rpb24oZSx0KXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSlyZXR1cm4gZTt2YXIgYSxuLHIsbyxpLHMsZD1lLnJlcGxhY2UodGhpcy5zZXBhcmF0b3JzLFwiXFwwXCIpLnNwbGl0KFwiXFwwXCIpLHU9dC5tYXRjaCh0aGlzLnZhbGlkUGFydHMpLGw9bmV3IERhdGUsZj0wO2lmKCEvXltkam1uXS9nLnRlc3QodVswXSkpcmV0dXJuIGU7Zm9yKHI9MDtyPGQubGVuZ3RoO3IrKyl7aWYoZj0yLGk9ZFtyXSxzPXBhcnNlSW50KGkuc3Vic3RyKDAsMikpLGlzTmFOKHMpKXJldHVybiBudWxsO3N3aXRjaChyKXtjYXNlIDA6XCJtXCI9PT11WzBdfHxcIm5cIj09PXVbMF0/bC5zZXRNb250aChzLTEpOmwuc2V0RGF0ZShzKTticmVhaztjYXNlIDE6XCJtXCI9PT11WzBdfHxcIm5cIj09PXVbMF0/bC5zZXREYXRlKHMpOmwuc2V0TW9udGgocy0xKTticmVhaztjYXNlIDI6aWYobj1sLmdldEZ1bGxZZWFyKCksZj0oYT1pLmxlbmd0aCk8ND9hOjQsIShuPXBhcnNlSW50KGE8ND9uLnRvU3RyaW5nKCkuc3Vic3RyKDAsNC1hKStpOmkuc3Vic3RyKDAsNCkpKSlyZXR1cm4gbnVsbDtsLnNldEZ1bGxZZWFyKG4pO2JyZWFrO2Nhc2UgMzpsLnNldEhvdXJzKHMpO2JyZWFrO2Nhc2UgNDpsLnNldE1pbnV0ZXMocyk7YnJlYWs7Y2FzZSA1Omwuc2V0U2Vjb25kcyhzKX0wPChvPWkuc3Vic3RyKGYpKS5sZW5ndGgmJmQuc3BsaWNlKHIrMSwwLG8pfXJldHVybiBsfSxwYXJzZUZvcm1hdDpmdW5jdGlvbihlLG4pe3ZhciBhLHQ9dGhpcyxyPXQuZGF0ZVNldHRpbmdzLG89L1xcXFw/KC4/KS9naSxpPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGFbZV0/YVtlXSgpOnR9O3JldHVybiBhPXtkOmZ1bmN0aW9uKCl7cmV0dXJuIHMoYS5qKCksMil9LEQ6ZnVuY3Rpb24oKXtyZXR1cm4gci5kYXlzU2hvcnRbYS53KCldfSxqOmZ1bmN0aW9uKCl7cmV0dXJuIG4uZ2V0RGF0ZSgpfSxsOmZ1bmN0aW9uKCl7cmV0dXJuIHIuZGF5c1thLncoKV19LE46ZnVuY3Rpb24oKXtyZXR1cm4gYS53KCl8fDd9LHc6ZnVuY3Rpb24oKXtyZXR1cm4gbi5nZXREYXkoKX0sejpmdW5jdGlvbigpe3ZhciBlPW5ldyBEYXRlKGEuWSgpLGEubigpLTEsYS5qKCkpLHQ9bmV3IERhdGUoYS5ZKCksMCwxKTtyZXR1cm4gTWF0aC5yb3VuZCgoZS10KS84NjRlNSl9LFc6ZnVuY3Rpb24oKXt2YXIgZT1uZXcgRGF0ZShhLlkoKSxhLm4oKS0xLGEuaigpLWEuTigpKzMpLHQ9bmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLDAsNCk7cmV0dXJuIHMoMStNYXRoLnJvdW5kKChlLXQpLzg2NGU1LzcpLDIpfSxGOmZ1bmN0aW9uKCl7cmV0dXJuIHIubW9udGhzW24uZ2V0TW9udGgoKV19LG06ZnVuY3Rpb24oKXtyZXR1cm4gcyhhLm4oKSwyKX0sTTpmdW5jdGlvbigpe3JldHVybiByLm1vbnRoc1Nob3J0W24uZ2V0TW9udGgoKV19LG46ZnVuY3Rpb24oKXtyZXR1cm4gbi5nZXRNb250aCgpKzF9LHQ6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IERhdGUoYS5ZKCksYS5uKCksMCkuZ2V0RGF0ZSgpfSxMOmZ1bmN0aW9uKCl7dmFyIGU9YS5ZKCk7cmV0dXJuIGUlND09MCYmZSUxMDAhPTB8fGUlNDAwPT0wPzE6MH0sbzpmdW5jdGlvbigpe3ZhciBlPWEubigpLHQ9YS5XKCk7cmV0dXJuIGEuWSgpKygxMj09PWUmJnQ8OT8xOjE9PT1lJiY5PHQ/LTE6MCl9LFk6ZnVuY3Rpb24oKXtyZXR1cm4gbi5nZXRGdWxsWWVhcigpfSx5OmZ1bmN0aW9uKCl7cmV0dXJuIGEuWSgpLnRvU3RyaW5nKCkuc2xpY2UoLTIpfSxhOmZ1bmN0aW9uKCl7cmV0dXJuIGEuQSgpLnRvTG93ZXJDYXNlKCl9LEE6ZnVuY3Rpb24oKXt2YXIgZT1hLkcoKTwxMj8wOjE7cmV0dXJuIHIubWVyaWRpZW1bZV19LEI6ZnVuY3Rpb24oKXt2YXIgZT0zNjAwKm4uZ2V0VVRDSG91cnMoKSx0PTYwKm4uZ2V0VVRDTWludXRlcygpLGE9bi5nZXRVVENTZWNvbmRzKCk7cmV0dXJuIHMoTWF0aC5mbG9vcigoZSt0K2ErMzYwMCkvODYuNCklMWUzLDMpfSxnOmZ1bmN0aW9uKCl7cmV0dXJuIGEuRygpJTEyfHwxMn0sRzpmdW5jdGlvbigpe3JldHVybiBuLmdldEhvdXJzKCl9LGg6ZnVuY3Rpb24oKXtyZXR1cm4gcyhhLmcoKSwyKX0sSDpmdW5jdGlvbigpe3JldHVybiBzKGEuRygpLDIpfSxpOmZ1bmN0aW9uKCl7cmV0dXJuIHMobi5nZXRNaW51dGVzKCksMil9LHM6ZnVuY3Rpb24oKXtyZXR1cm4gcyhuLmdldFNlY29uZHMoKSwyKX0sdTpmdW5jdGlvbigpe3JldHVybiBzKDFlMypuLmdldE1pbGxpc2Vjb25kcygpLDYpfSxlOmZ1bmN0aW9uKCl7cmV0dXJuL1xcKCguKilcXCkvLmV4ZWMoU3RyaW5nKG4pKVsxXXx8XCJDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZVwifSxJOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBEYXRlKGEuWSgpLDApLURhdGUuVVRDKGEuWSgpLDApIT1uZXcgRGF0ZShhLlkoKSw2KS1EYXRlLlVUQyhhLlkoKSw2KT8xOjB9LE86ZnVuY3Rpb24oKXt2YXIgZT1uLmdldFRpbWV6b25lT2Zmc2V0KCksdD1NYXRoLmFicyhlKTtyZXR1cm4oMDxlP1wiLVwiOlwiK1wiKStzKDEwMCpNYXRoLmZsb29yKHQvNjApK3QlNjAsNCl9LFA6ZnVuY3Rpb24oKXt2YXIgZT1hLk8oKTtyZXR1cm4gZS5zdWJzdHIoMCwzKStcIjpcIitlLnN1YnN0cigzLDIpfSxUOmZ1bmN0aW9uKCl7cmV0dXJuKFN0cmluZyhuKS5tYXRjaCh0LnR6UGFydHMpfHxbXCJcIl0pLnBvcCgpLnJlcGxhY2UodC50ekNsaXAsXCJcIil8fFwiVVRDXCJ9LFo6ZnVuY3Rpb24oKXtyZXR1cm4gNjAqLW4uZ2V0VGltZXpvbmVPZmZzZXQoKX0sYzpmdW5jdGlvbigpe3JldHVyblwiWS1tLWRcXFxcVEg6aTpzUFwiLnJlcGxhY2UobyxpKX0scjpmdW5jdGlvbigpe3JldHVyblwiRCwgZCBNIFkgSDppOnMgT1wiLnJlcGxhY2UobyxpKX0sVTpmdW5jdGlvbigpe3JldHVybiBuLmdldFRpbWUoKS8xZTN8fDB9fSxpKGUsZSl9LGZvcm1hdERhdGU6ZnVuY3Rpb24oZSx0KXt2YXIgYSxuLHIsbyxpLHM9XCJcIjtpZihcInN0cmluZ1wiPT10eXBlb2YgZSYmIShlPXRoaXMucGFyc2VEYXRlKGUsdCkpKXJldHVybiBudWxsO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXtmb3Iocj10Lmxlbmd0aCxhPTA7YTxyO2ErKylcIlNcIiE9PShpPXQuY2hhckF0KGEpKSYmXCJcXFxcXCIhPT1pJiYoMDxhJiZcIlxcXFxcIj09PXQuY2hhckF0KGEtMSk/cys9aToobz10aGlzLnBhcnNlRm9ybWF0KGksZSksYSE9PXItMSYmdGhpcy5pbnRQYXJ0cy50ZXN0KGkpJiZcIlNcIj09PXQuY2hhckF0KGErMSkmJihuPXBhcnNlSW50KG8pfHwwLG8rPXRoaXMuZGF0ZVNldHRpbmdzLm9yZGluYWwobikpLHMrPW8pKTtyZXR1cm4gc31yZXR1cm5cIlwifX19KCk7dmFyIGRhdGV0aW1lcGlja2VyRmFjdG9yeT1mdW5jdGlvbihMKXtcInVzZSBzdHJpY3RcIjt2YXIgcz17aTE4bjp7YXI6e21vbnRoczpbXCLZg9in2YbZiNmGINin2YTYq9in2YbZilwiLFwi2LTYqNin2LdcIixcItii2LDYp9ixXCIsXCLZhtmK2LPYp9mGXCIsXCLZhdin2YrZiFwiLFwi2K3YstmK2LHYp9mGXCIsXCLYqtmF2YjYslwiLFwi2KLYqFwiLFwi2KPZitmE2YjZhFwiLFwi2KrYtNix2YrZhiDYp9mE2KPZiNmEXCIsXCLYqti02LHZitmGINin2YTYq9in2YbZilwiLFwi2YPYp9mG2YjZhiDYp9mE2KPZiNmEXCJdLGRheU9mV2Vla1Nob3J0OltcItmGXCIsXCLYq1wiLFwi2LlcIixcItiuXCIsXCLYrFwiLFwi2LNcIixcItitXCJdLGRheU9mV2VlazpbXCLYp9mE2KPYrdivXCIsXCLYp9mE2KfYq9mG2YrZhlwiLFwi2KfZhNir2YTYp9ir2KfYoVwiLFwi2KfZhNij2LHYqNi52KfYoVwiLFwi2KfZhNiu2YXZitizXCIsXCLYp9mE2KzZhdi52KlcIixcItin2YTYs9io2KpcIixcItin2YTYo9it2K9cIl19LHJvOnttb250aHM6W1wiSWFudWFyaWVcIixcIkZlYnJ1YXJpZVwiLFwiTWFydGllXCIsXCJBcHJpbGllXCIsXCJNYWlcIixcIkl1bmllXCIsXCJJdWxpZVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1icmllXCIsXCJPY3RvbWJyaWVcIixcIk5vaWVtYnJpZVwiLFwiRGVjZW1icmllXCJdLGRheU9mV2Vla1Nob3J0OltcIkR1XCIsXCJMdVwiLFwiTWFcIixcIk1pXCIsXCJKb1wiLFwiVmlcIixcIlPDolwiXSxkYXlPZldlZWs6W1wiRHVtaW5pY8SDXCIsXCJMdW5pXCIsXCJNYXLFo2lcIixcIk1pZXJjdXJpXCIsXCJKb2lcIixcIlZpbmVyaVwiLFwiU8OibWLEg3TEg1wiXX0saWQ6e21vbnRoczpbXCJKYW51YXJpXCIsXCJGZWJydWFyaVwiLFwiTWFyZXRcIixcIkFwcmlsXCIsXCJNZWlcIixcIkp1bmlcIixcIkp1bGlcIixcIkFndXN0dXNcIixcIlNlcHRlbWJlclwiLFwiT2t0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlc2VtYmVyXCJdLGRheU9mV2Vla1Nob3J0OltcIk1pblwiLFwiU2VuXCIsXCJTZWxcIixcIlJhYlwiLFwiS2FtXCIsXCJKdW1cIixcIlNhYlwiXSxkYXlPZldlZWs6W1wiTWluZ2d1XCIsXCJTZW5pblwiLFwiU2VsYXNhXCIsXCJSYWJ1XCIsXCJLYW1pc1wiLFwiSnVtYXRcIixcIlNhYnR1XCJdfSxpczp7bW9udGhzOltcIkphbsO6YXJcIixcIkZlYnLDumFyXCIsXCJNYXJzXCIsXCJBcHLDrWxcIixcIk1hw61cIixcIkrDum7DrVwiLFwiSsO6bMOtXCIsXCLDgWfDunN0XCIsXCJTZXB0ZW1iZXJcIixcIk9rdMOzYmVyXCIsXCJOw7N2ZW1iZXJcIixcIkRlc2VtYmVyXCJdLGRheU9mV2Vla1Nob3J0OltcIlN1blwiLFwiTcOhblwiLFwiw55yacOwXCIsXCJNacOwXCIsXCJGaW1cIixcIkbDtnNcIixcIkxhdVwiXSxkYXlPZldlZWs6W1wiU3VubnVkYWd1clwiLFwiTcOhbnVkYWd1clwiLFwiw55yacOwanVkYWd1clwiLFwiTWnDsHZpa3VkYWd1clwiLFwiRmltbXR1ZGFndXJcIixcIkbDtnN0dWRhZ3VyXCIsXCJMYXVnYXJkYWd1clwiXX0sYmc6e21vbnRoczpbXCLQr9C90YPQsNGA0LhcIixcItCk0LXQstGA0YPQsNGA0LhcIixcItCc0LDRgNGCXCIsXCLQkNC/0YDQuNC7XCIsXCLQnNCw0LlcIixcItCu0L3QuFwiLFwi0K7Qu9C4XCIsXCLQkNCy0LPRg9GB0YJcIixcItCh0LXQv9GC0LXQvNCy0YDQuFwiLFwi0J7QutGC0L7QvNCy0YDQuFwiLFwi0J3QvtC10LzQstGA0LhcIixcItCU0LXQutC10LzQstGA0LhcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wi0J3QtFwiLFwi0J/QvVwiLFwi0JLRglwiLFwi0KHRgFwiLFwi0KfRglwiLFwi0J/RglwiLFwi0KHQsVwiXSxkYXlPZldlZWs6W1wi0J3QtdC00LXQu9GPXCIsXCLQn9C+0L3QtdC00LXQu9C90LjQulwiLFwi0JLRgtC+0YDQvdC40LpcIixcItCh0YDRj9C00LBcIixcItCn0LXRgtCy0YrRgNGC0YrQulwiLFwi0J/QtdGC0YrQulwiLFwi0KHRitCx0L7RgtCwXCJdfSxmYTp7bW9udGhzOltcItmB2LHZiNix2K/bjNmGXCIsXCLYp9ix2K/bjNio2YfYtNiqXCIsXCLYrtix2K/Yp9ivXCIsXCLYqtuM2LFcIixcItmF2LHYr9in2K9cIixcIti02YfYsduM2YjYsVwiLFwi2YXZh9ixXCIsXCLYotio2KfZhlwiLFwi2KLYsNixXCIsXCLYr9uMXCIsXCLYqNmH2YXZhlwiLFwi2KfYs9mB2YbYr1wiXSxkYXlPZldlZWtTaG9ydDpbXCLbjNqp2LTZhtio2YdcIixcItiv2YjYtNmG2KjZh1wiLFwi2LPZhyDYtNmG2KjZh1wiLFwi2obZh9in2LHYtNmG2KjZh1wiLFwi2b7Zhtis2LTZhtio2YdcIixcItis2YXYudmHXCIsXCLYtNmG2KjZh1wiXSxkYXlPZldlZWs6W1wi24zaqeKAjNi02YbYqNmHXCIsXCLYr9mI2LTZhtio2YdcIixcItiz2YfigIzYtNmG2KjZh1wiLFwi2obZh9in2LHYtNmG2KjZh1wiLFwi2b7Zhtis4oCM2LTZhtio2YdcIixcItis2YXYudmHXCIsXCLYtNmG2KjZh1wiLFwi24zaqeKAjNi02YbYqNmHXCJdfSxydTp7bW9udGhzOltcItCv0L3QstCw0YDRjFwiLFwi0KTQtdCy0YDQsNC70YxcIixcItCc0LDRgNGCXCIsXCLQkNC/0YDQtdC70YxcIixcItCc0LDQuVwiLFwi0JjRjtC90YxcIixcItCY0Y7Qu9GMXCIsXCLQkNCy0LPRg9GB0YJcIixcItCh0LXQvdGC0Y/QsdGA0YxcIixcItCe0LrRgtGP0LHRgNGMXCIsXCLQndC+0Y/QsdGA0YxcIixcItCU0LXQutCw0LHRgNGMXCJdLGRheU9mV2Vla1Nob3J0OltcItCS0YFcIixcItCf0L1cIixcItCS0YJcIixcItCh0YBcIixcItCn0YJcIixcItCf0YJcIixcItCh0LFcIl0sZGF5T2ZXZWVrOltcItCS0L7RgdC60YDQtdGB0LXQvdGM0LVcIixcItCf0L7QvdC10LTQtdC70YzQvdC40LpcIixcItCS0YLQvtGA0L3QuNC6XCIsXCLQodGA0LXQtNCwXCIsXCLQp9C10YLQstC10YDQs1wiLFwi0J/Rj9GC0L3QuNGG0LBcIixcItCh0YPQsdCx0L7RgtCwXCJdfSx1azp7bW9udGhzOltcItCh0ZbRh9C10L3RjFwiLFwi0JvRjtGC0LjQuVwiLFwi0JHQtdGA0LXQt9C10L3RjFwiLFwi0JrQstGW0YLQtdC90YxcIixcItCi0YDQsNCy0LXQvdGMXCIsXCLQp9C10YDQstC10L3RjFwiLFwi0JvQuNC/0LXQvdGMXCIsXCLQodC10YDQv9C10L3RjFwiLFwi0JLQtdGA0LXRgdC10L3RjFwiLFwi0JbQvtCy0YLQtdC90YxcIixcItCb0LjRgdGC0L7Qv9Cw0LRcIixcItCT0YDRg9C00LXQvdGMXCJdLGRheU9mV2Vla1Nob3J0OltcItCd0LTQu1wiLFwi0J/QvdC0XCIsXCLQktGC0YBcIixcItCh0YDQtFwiLFwi0KfRgtCyXCIsXCLQn9GC0L1cIixcItCh0LHRglwiXSxkYXlPZldlZWs6W1wi0J3QtdC00ZbQu9GPXCIsXCLQn9C+0L3QtdC00ZbQu9C+0LpcIixcItCS0ZbQstGC0L7RgNC+0LpcIixcItCh0LXRgNC10LTQsFwiLFwi0KfQtdGC0LLQtdGAXCIsXCLQnyfRj9GC0L3QuNGG0Y9cIixcItCh0YPQsdC+0YLQsFwiXX0sZW46e21vbnRoczpbXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCJdLGRheU9mV2VlazpbXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXX0sZWw6e21vbnRoczpbXCLOmc6xzr3Ov8+FzqzPgc65zr/PglwiLFwizqbOtc6yz4HOv8+FzqzPgc65zr/PglwiLFwizpzOrM+Bz4TOuc6/z4JcIixcIs6Rz4DPgc6vzrvOuc6/z4JcIixcIs6czqzOuc6/z4JcIixcIs6Zzr/Pjc69zrnOv8+CXCIsXCLOmc6/z43Ou865zr/PglwiLFwizpHPjc6zzr/Phc+Dz4TOv8+CXCIsXCLOo861z4DPhM6tzrzOss+BzrnOv8+CXCIsXCLOn866z4TPjs6yz4HOuc6/z4JcIixcIs6dzr/Orc68zrLPgc65zr/PglwiLFwizpTOtc66zq3OvM6yz4HOuc6/z4JcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wizprPhc+BXCIsXCLOlM61z4VcIixcIs6kz4HOuVwiLFwizqTOtc+EXCIsXCLOoM61zrxcIixcIs6gzrHPgVwiLFwizqPOsc6yXCJdLGRheU9mV2VlazpbXCLOms+Fz4HOuc6xzrrOrlwiLFwizpTOtc+Fz4TOrc+BzrFcIixcIs6kz4HOr8+EzrdcIixcIs6kzrXPhM6sz4HPhM63XCIsXCLOoM6tzrzPgM+EzrdcIixcIs6gzrHPgc6xz4POus61z4XOrlwiLFwizqPOrM6yzrLOsc+Ezr9cIl19LGRlOnttb250aHM6W1wiSmFudWFyXCIsXCJGZWJydWFyXCIsXCJNw6RyelwiLFwiQXByaWxcIixcIk1haVwiLFwiSnVuaVwiLFwiSnVsaVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9rdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZXplbWJlclwiXSxkYXlPZldlZWtTaG9ydDpbXCJTb1wiLFwiTW9cIixcIkRpXCIsXCJNaVwiLFwiRG9cIixcIkZyXCIsXCJTYVwiXSxkYXlPZldlZWs6W1wiU29ubnRhZ1wiLFwiTW9udGFnXCIsXCJEaWVuc3RhZ1wiLFwiTWl0dHdvY2hcIixcIkRvbm5lcnN0YWdcIixcIkZyZWl0YWdcIixcIlNhbXN0YWdcIl19LG5sOnttb250aHM6W1wiamFudWFyaVwiLFwiZmVicnVhcmlcIixcIm1hYXJ0XCIsXCJhcHJpbFwiLFwibWVpXCIsXCJqdW5pXCIsXCJqdWxpXCIsXCJhdWd1c3R1c1wiLFwic2VwdGVtYmVyXCIsXCJva3RvYmVyXCIsXCJub3ZlbWJlclwiLFwiZGVjZW1iZXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiem9cIixcIm1hXCIsXCJkaVwiLFwid29cIixcImRvXCIsXCJ2clwiLFwiemFcIl0sZGF5T2ZXZWVrOltcInpvbmRhZ1wiLFwibWFhbmRhZ1wiLFwiZGluc2RhZ1wiLFwid29lbnNkYWdcIixcImRvbmRlcmRhZ1wiLFwidnJpamRhZ1wiLFwiemF0ZXJkYWdcIl19LHRyOnttb250aHM6W1wiT2Nha1wiLFwixZ51YmF0XCIsXCJNYXJ0XCIsXCJOaXNhblwiLFwiTWF5xLFzXCIsXCJIYXppcmFuXCIsXCJUZW1tdXpcIixcIkHEn3VzdG9zXCIsXCJFeWzDvGxcIixcIkVraW1cIixcIkthc8SxbVwiLFwiQXJhbMSxa1wiXSxkYXlPZldlZWtTaG9ydDpbXCJQYXpcIixcIlB0c1wiLFwiU2FsXCIsXCLDh2FyXCIsXCJQZXJcIixcIkN1bVwiLFwiQ3RzXCJdLGRheU9mV2VlazpbXCJQYXphclwiLFwiUGF6YXJ0ZXNpXCIsXCJTYWzEsVwiLFwiw4dhcsWfYW1iYVwiLFwiUGVyxZ9lbWJlXCIsXCJDdW1hXCIsXCJDdW1hcnRlc2lcIl19LGZyOnttb250aHM6W1wiSmFudmllclwiLFwiRsOpdnJpZXJcIixcIk1hcnNcIixcIkF2cmlsXCIsXCJNYWlcIixcIkp1aW5cIixcIkp1aWxsZXRcIixcIkFvw7t0XCIsXCJTZXB0ZW1icmVcIixcIk9jdG9icmVcIixcIk5vdmVtYnJlXCIsXCJEw6ljZW1icmVcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiRGltXCIsXCJMdW5cIixcIk1hclwiLFwiTWVyXCIsXCJKZXVcIixcIlZlblwiLFwiU2FtXCJdLGRheU9mV2VlazpbXCJkaW1hbmNoZVwiLFwibHVuZGlcIixcIm1hcmRpXCIsXCJtZXJjcmVkaVwiLFwiamV1ZGlcIixcInZlbmRyZWRpXCIsXCJzYW1lZGlcIl19LGVzOnttb250aHM6W1wiRW5lcm9cIixcIkZlYnJlcm9cIixcIk1hcnpvXCIsXCJBYnJpbFwiLFwiTWF5b1wiLFwiSnVuaW9cIixcIkp1bGlvXCIsXCJBZ29zdG9cIixcIlNlcHRpZW1icmVcIixcIk9jdHVicmVcIixcIk5vdmllbWJyZVwiLFwiRGljaWVtYnJlXCJdLGRheU9mV2Vla1Nob3J0OltcIkRvbVwiLFwiTHVuXCIsXCJNYXJcIixcIk1pw6lcIixcIkp1ZVwiLFwiVmllXCIsXCJTw6FiXCJdLGRheU9mV2VlazpbXCJEb21pbmdvXCIsXCJMdW5lc1wiLFwiTWFydGVzXCIsXCJNacOpcmNvbGVzXCIsXCJKdWV2ZXNcIixcIlZpZXJuZXNcIixcIlPDoWJhZG9cIl19LHRoOnttb250aHM6W1wi4Lih4LiB4Lij4Liy4LiE4LihXCIsXCLguIHguLjguKHguKDguLLguJ7guLHguJnguJjguYxcIixcIuC4oeC4teC4meC4suC4hOC4oVwiLFwi4LmA4Lih4Lip4Liy4Lii4LiZXCIsXCLguJ7guKTguKnguKDguLLguITguKFcIixcIuC4oeC4tOC4luC4uOC4meC4suC4ouC4mVwiLFwi4LiB4Lij4LiB4LiO4Liy4LiE4LihXCIsXCLguKrguLTguIfguKvguLLguITguKFcIixcIuC4geC4seC4meC4ouC4suC4ouC4mVwiLFwi4LiV4Li44Lil4Liy4LiE4LihXCIsXCLguJ7guKTguKjguIjguLTguIHguLLguKLguJlcIixcIuC4mOC4seC4meC4p+C4suC4hOC4oVwiXSxkYXlPZldlZWtTaG9ydDpbXCLguK3guLIuXCIsXCLguIguXCIsXCLguK0uXCIsXCLguJ4uXCIsXCLguJ7guKQuXCIsXCLguKguXCIsXCLguKouXCJdLGRheU9mV2VlazpbXCLguK3guLLguJfguLTguJXguKLguYxcIixcIuC4iOC4seC4meC4l+C4o+C5jFwiLFwi4Lit4Lix4LiH4LiE4Liy4LijXCIsXCLguJ7guLjguJhcIixcIuC4nuC4pOC4q+C4seC4qlwiLFwi4Lio4Li44LiB4Lij4LmMXCIsXCLguYDguKrguLLguKPguYxcIixcIuC4reC4suC4l+C4tOC4leC4ouC5jFwiXX0scGw6e21vbnRoczpbXCJzdHljemXFhFwiLFwibHV0eVwiLFwibWFyemVjXCIsXCJrd2llY2llxYRcIixcIm1halwiLFwiY3plcndpZWNcIixcImxpcGllY1wiLFwic2llcnBpZcWEXCIsXCJ3cnplc2llxYRcIixcInBhxbpkemllcm5pa1wiLFwibGlzdG9wYWRcIixcImdydWR6aWXFhFwiXSxkYXlPZldlZWtTaG9ydDpbXCJuZFwiLFwicG5cIixcInd0XCIsXCLFm3JcIixcImN6XCIsXCJwdFwiLFwic2JcIl0sZGF5T2ZXZWVrOltcIm5pZWR6aWVsYVwiLFwicG9uaWVkemlhxYJla1wiLFwid3RvcmVrXCIsXCLFm3JvZGFcIixcImN6d2FydGVrXCIsXCJwacSFdGVrXCIsXCJzb2JvdGFcIl19LHB0Onttb250aHM6W1wiSmFuZWlyb1wiLFwiRmV2ZXJlaXJvXCIsXCJNYXLDp29cIixcIkFicmlsXCIsXCJNYWlvXCIsXCJKdW5ob1wiLFwiSnVsaG9cIixcIkFnb3N0b1wiLFwiU2V0ZW1icm9cIixcIk91dHVicm9cIixcIk5vdmVtYnJvXCIsXCJEZXplbWJyb1wiXSxkYXlPZldlZWtTaG9ydDpbXCJEb21cIixcIlNlZ1wiLFwiVGVyXCIsXCJRdWFcIixcIlF1aVwiLFwiU2V4XCIsXCJTYWJcIl0sZGF5T2ZXZWVrOltcIkRvbWluZ29cIixcIlNlZ3VuZGFcIixcIlRlcsOnYVwiLFwiUXVhcnRhXCIsXCJRdWludGFcIixcIlNleHRhXCIsXCJTw6FiYWRvXCJdfSxjaDp7bW9udGhzOltcIuS4gOaciFwiLFwi5LqM5pyIXCIsXCLkuInmnIhcIixcIuWbm+aciFwiLFwi5LqU5pyIXCIsXCLlha3mnIhcIixcIuS4g+aciFwiLFwi5YWr5pyIXCIsXCLkuZ3mnIhcIixcIuWNgeaciFwiLFwi5Y2B5LiA5pyIXCIsXCLljYHkuozmnIhcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wi5pelXCIsXCLkuIBcIixcIuS6jFwiLFwi5LiJXCIsXCLlm5tcIixcIuS6lFwiLFwi5YWtXCJdfSxzZTp7bW9udGhzOltcIkphbnVhcmlcIixcIkZlYnJ1YXJpXCIsXCJNYXJzXCIsXCJBcHJpbFwiLFwiTWFqXCIsXCJKdW5pXCIsXCJKdWxpXCIsXCJBdWd1c3RpXCIsXCJTZXB0ZW1iZXJcIixcIk9rdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSxkYXlPZldlZWtTaG9ydDpbXCJTw7ZuXCIsXCJNw6VuXCIsXCJUaXNcIixcIk9uc1wiLFwiVG9yXCIsXCJGcmVcIixcIkzDtnJcIl19LGttOnttb250aHM6W1wi4Z6Y4Z6A4Z6a4Z624oCLXCIsXCLhnoDhnrvhnpjhn5Lhnpfhn4hcIixcIuGemOGet+Gek+GetuKAi1wiLFwi4Z6Y4Z+B4Z6f4Z624oCLXCIsXCLhnqfhnp/hnpfhnrbigItcIixcIuGemOGet+GekOGeu+Gek+GetuKAi1wiLFwi4Z6A4Z6A4Z+S4Z6A4Z6K4Z624oCLXCIsXCLhnp/hnrjhnqDhnrbigItcIixcIuGegOGeieGfkuGeieGetuKAi1wiLFwi4Z6P4Z674Z6b4Z624oCLXCIsXCLhnpzhnrfhnoXhn5LhnobhnrfhnoDhnrZcIixcIuGekuGfkuGek+GevOKAi1wiXSxkYXlPZldlZWtTaG9ydDpbXCLhnqLhnrbhnpHhnrfigItcIixcIuGeheGfkOGek+GfkuGekeKAi1wiLFwi4Z6i4Z6E4Z+S4Z6C4Z624Z6a4oCLXCIsXCLhnpbhnrvhnpLigItcIixcIuGeluGfkuGemuGeoOKAi+KAi1wiLFwi4Z6f4Z674Z6A4Z+S4Z6a4oCLXCIsXCLhnp/hn4Xhnprhn41cIl0sZGF5T2ZXZWVrOltcIuGeouGetuGekeGet+Gej+GfkuGemeKAi1wiLFwi4Z6F4Z+Q4Z6T4Z+S4Z6R4oCLXCIsXCLhnqLhnoThn5LhnoLhnrbhnprigItcIixcIuGeluGeu+GekuKAi1wiLFwi4Z6W4Z+S4Z6a4Z6g4Z6f4Z+S4Z6U4Z6P4Z634Z+N4oCLXCIsXCLhnp/hnrvhnoDhn5LhnprigItcIixcIuGen+GfheGemuGfjVwiXX0sa3I6e21vbnRoczpbXCIx7JuUXCIsXCIy7JuUXCIsXCIz7JuUXCIsXCI07JuUXCIsXCI17JuUXCIsXCI27JuUXCIsXCI37JuUXCIsXCI47JuUXCIsXCI57JuUXCIsXCIxMOyblFwiLFwiMTHsm5RcIixcIjEy7JuUXCJdLGRheU9mV2Vla1Nob3J0OltcIuydvFwiLFwi7JuUXCIsXCLtmZRcIixcIuyImFwiLFwi66qpXCIsXCLquIhcIixcIu2GoFwiXSxkYXlPZldlZWs6W1wi7J287JqU7J28XCIsXCLsm5TsmpTsnbxcIixcIu2ZlOyalOydvFwiLFwi7IiY7JqU7J28XCIsXCLrqqnsmpTsnbxcIixcIuq4iOyalOydvFwiLFwi7Yag7JqU7J28XCJdfSxpdDp7bW9udGhzOltcIkdlbm5haW9cIixcIkZlYmJyYWlvXCIsXCJNYXJ6b1wiLFwiQXByaWxlXCIsXCJNYWdnaW9cIixcIkdpdWdub1wiLFwiTHVnbGlvXCIsXCJBZ29zdG9cIixcIlNldHRlbWJyZVwiLFwiT3R0b2JyZVwiLFwiTm92ZW1icmVcIixcIkRpY2VtYnJlXCJdLGRheU9mV2Vla1Nob3J0OltcIkRvbVwiLFwiTHVuXCIsXCJNYXJcIixcIk1lclwiLFwiR2lvXCIsXCJWZW5cIixcIlNhYlwiXSxkYXlPZldlZWs6W1wiRG9tZW5pY2FcIixcIkx1bmVkw6xcIixcIk1hcnRlZMOsXCIsXCJNZXJjb2xlZMOsXCIsXCJHaW92ZWTDrFwiLFwiVmVuZXJkw6xcIixcIlNhYmF0b1wiXX0sZGE6e21vbnRoczpbXCJKYW51YXJcIixcIkZlYnJ1YXJcIixcIk1hcnRzXCIsXCJBcHJpbFwiLFwiTWFqXCIsXCJKdW5pXCIsXCJKdWxpXCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2t0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLGRheU9mV2Vla1Nob3J0OltcIlPDuG5cIixcIk1hblwiLFwiVGlyXCIsXCJPbnNcIixcIlRvclwiLFwiRnJlXCIsXCJMw7hyXCJdLGRheU9mV2VlazpbXCJzw7huZGFnXCIsXCJtYW5kYWdcIixcInRpcnNkYWdcIixcIm9uc2RhZ1wiLFwidG9yc2RhZ1wiLFwiZnJlZGFnXCIsXCJsw7hyZGFnXCJdfSxubzp7bW9udGhzOltcIkphbnVhclwiLFwiRmVicnVhclwiLFwiTWFyc1wiLFwiQXByaWxcIixcIk1haVwiLFwiSnVuaVwiLFwiSnVsaVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9rdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZXNlbWJlclwiXSxkYXlPZldlZWtTaG9ydDpbXCJTw7huXCIsXCJNYW5cIixcIlRpclwiLFwiT25zXCIsXCJUb3JcIixcIkZyZVwiLFwiTMO4clwiXSxkYXlPZldlZWs6W1wiU8O4bmRhZ1wiLFwiTWFuZGFnXCIsXCJUaXJzZGFnXCIsXCJPbnNkYWdcIixcIlRvcnNkYWdcIixcIkZyZWRhZ1wiLFwiTMO4cmRhZ1wiXX0samE6e21vbnRoczpbXCIx5pyIXCIsXCIy5pyIXCIsXCIz5pyIXCIsXCI05pyIXCIsXCI15pyIXCIsXCI25pyIXCIsXCI35pyIXCIsXCI45pyIXCIsXCI55pyIXCIsXCIxMOaciFwiLFwiMTHmnIhcIixcIjEy5pyIXCJdLGRheU9mV2Vla1Nob3J0OltcIuaXpVwiLFwi5pyIXCIsXCLngatcIixcIuawtFwiLFwi5pyoXCIsXCLph5FcIixcIuWcn1wiXSxkYXlPZldlZWs6W1wi5pel5pucXCIsXCLmnIjmm5xcIixcIueBq+abnFwiLFwi5rC05pucXCIsXCLmnKjmm5xcIixcIumHkeabnFwiLFwi5Zyf5pucXCJdfSx2aTp7bW9udGhzOltcIlRow6FuZyAxXCIsXCJUaMOhbmcgMlwiLFwiVGjDoW5nIDNcIixcIlRow6FuZyA0XCIsXCJUaMOhbmcgNVwiLFwiVGjDoW5nIDZcIixcIlRow6FuZyA3XCIsXCJUaMOhbmcgOFwiLFwiVGjDoW5nIDlcIixcIlRow6FuZyAxMFwiLFwiVGjDoW5nIDExXCIsXCJUaMOhbmcgMTJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiQ05cIixcIlQyXCIsXCJUM1wiLFwiVDRcIixcIlQ1XCIsXCJUNlwiLFwiVDdcIl0sZGF5T2ZXZWVrOltcIkNo4bunIG5o4bqtdFwiLFwiVGjhu6kgaGFpXCIsXCJUaOG7qSBiYVwiLFwiVGjhu6kgdMawXCIsXCJUaOG7qSBuxINtXCIsXCJUaOG7qSBzw6F1XCIsXCJUaOG7qSBi4bqjeVwiXX0sc2w6e21vbnRoczpbXCJKYW51YXJcIixcIkZlYnJ1YXJcIixcIk1hcmVjXCIsXCJBcHJpbFwiLFwiTWFqXCIsXCJKdW5palwiLFwiSnVsaWpcIixcIkF2Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPa3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiTmVkXCIsXCJQb25cIixcIlRvclwiLFwiU3JlXCIsXCLEjGV0XCIsXCJQZXRcIixcIlNvYlwiXSxkYXlPZldlZWs6W1wiTmVkZWxqYVwiLFwiUG9uZWRlbGpla1wiLFwiVG9yZWtcIixcIlNyZWRhXCIsXCLEjGV0cnRla1wiLFwiUGV0ZWtcIixcIlNvYm90YVwiXX0sY3M6e21vbnRoczpbXCJMZWRlblwiLFwiw5pub3JcIixcIkLFmWV6ZW5cIixcIkR1YmVuXCIsXCJLdsSbdGVuXCIsXCLEjGVydmVuXCIsXCLEjGVydmVuZWNcIixcIlNycGVuXCIsXCJaw6HFmcOtXCIsXCLFmMOtamVuXCIsXCJMaXN0b3BhZFwiLFwiUHJvc2luZWNcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiTmVcIixcIlBvXCIsXCLDmnRcIixcIlN0XCIsXCLEjHRcIixcIlDDoVwiLFwiU29cIl19LGh1Onttb250aHM6W1wiSmFudcOhclwiLFwiRmVicnXDoXJcIixcIk3DoXJjaXVzXCIsXCLDgXByaWxpc1wiLFwiTcOhanVzXCIsXCJKw7puaXVzXCIsXCJKw7psaXVzXCIsXCJBdWd1c3p0dXNcIixcIlN6ZXB0ZW1iZXJcIixcIk9rdMOzYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiVmFcIixcIkjDqVwiLFwiS2VcIixcIlN6ZVwiLFwiQ3NcIixcIlDDqVwiLFwiU3pvXCJdLGRheU9mV2VlazpbXCJ2YXPDoXJuYXBcIixcImjDqXRmxZFcIixcImtlZGRcIixcInN6ZXJkYVwiLFwiY3PDvHTDtnJ0w7ZrXCIsXCJww6ludGVrXCIsXCJzem9tYmF0XCJdfSxhejp7bW9udGhzOltcIllhbnZhclwiLFwiRmV2cmFsXCIsXCJNYXJ0XCIsXCJBcHJlbFwiLFwiTWF5XCIsXCJJeXVuXCIsXCJJeXVsXCIsXCJBdnF1c3RcIixcIlNlbnR5YWJyXCIsXCJPa3R5YWJyXCIsXCJOb3lhYnJcIixcIkRla2FiclwiXSxkYXlPZldlZWtTaG9ydDpbXCJCXCIsXCJCZVwiLFwiw4dhXCIsXCLDh1wiLFwiQ2FcIixcIkNcIixcIsWeXCJdLGRheU9mV2VlazpbXCJCYXphclwiLFwiQmF6YXIgZXJ0yZlzaVwiLFwiw4fJmXLFn8mZbmLJmSBheMWfYW3EsVwiLFwiw4fJmXLFn8mZbmLJmVwiLFwiQ8O8bcmZIGF4xZ9hbcSxXCIsXCJDw7xtyZlcIixcIsWeyZluYsmZXCJdfSxiczp7bW9udGhzOltcIkphbnVhclwiLFwiRmVicnVhclwiLFwiTWFydFwiLFwiQXByaWxcIixcIk1halwiLFwiSnVuXCIsXCJKdWxcIixcIkF2Z3VzdFwiLFwiU2VwdGVtYmFyXCIsXCJPa3RvYmFyXCIsXCJOb3ZlbWJhclwiLFwiRGVjZW1iYXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiTmVkXCIsXCJQb25cIixcIlV0b1wiLFwiU3JpXCIsXCLEjGV0XCIsXCJQZXRcIixcIlN1YlwiXSxkYXlPZldlZWs6W1wiTmVkamVsamFcIixcIlBvbmVkamVsamFrXCIsXCJVdG9yYWtcIixcIlNyaWplZGFcIixcIsSMZXR2cnRha1wiLFwiUGV0YWtcIixcIlN1Ym90YVwiXX0sY2E6e21vbnRoczpbXCJHZW5lclwiLFwiRmVicmVyXCIsXCJNYXLDp1wiLFwiQWJyaWxcIixcIk1haWdcIixcIkp1bnlcIixcIkp1bGlvbFwiLFwiQWdvc3RcIixcIlNldGVtYnJlXCIsXCJPY3R1YnJlXCIsXCJOb3ZlbWJyZVwiLFwiRGVzZW1icmVcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiRGdcIixcIkRsXCIsXCJEdFwiLFwiRGNcIixcIkRqXCIsXCJEdlwiLFwiRHNcIl0sZGF5T2ZXZWVrOltcIkRpdW1lbmdlXCIsXCJEaWxsdW5zXCIsXCJEaW1hcnRzXCIsXCJEaW1lY3Jlc1wiLFwiRGlqb3VzXCIsXCJEaXZlbmRyZXNcIixcIkRpc3NhYnRlXCJdfSxcImVuLUdCXCI6e21vbnRoczpbXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCJdLGRheU9mV2VlazpbXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXX0sZXQ6e21vbnRoczpbXCJKYWFudWFyXCIsXCJWZWVicnVhclwiLFwiTcOkcnRzXCIsXCJBcHJpbGxcIixcIk1haVwiLFwiSnV1bmlcIixcIkp1dWxpXCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2t0b29iZXJcIixcIk5vdmVtYmVyXCIsXCJEZXRzZW1iZXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiUFwiLFwiRVwiLFwiVFwiLFwiS1wiLFwiTlwiLFwiUlwiLFwiTFwiXSxkYXlPZldlZWs6W1wiUMO8aGFww6RldlwiLFwiRXNtYXNww6RldlwiLFwiVGVpc2lww6RldlwiLFwiS29sbWFww6RldlwiLFwiTmVsamFww6RldlwiLFwiUmVlZGVcIixcIkxhdXDDpGV2XCJdfSxldTp7bW9udGhzOltcIlVydGFycmlsYVwiLFwiT3RzYWlsYVwiLFwiTWFydHhvYVwiLFwiQXBpcmlsYVwiLFwiTWFpYXR6YVwiLFwiRWthaW5hXCIsXCJVenRhaWxhXCIsXCJBYnV6dHVhXCIsXCJJcmFpbGFcIixcIlVycmlhXCIsXCJBemFyb2FcIixcIkFiZW5kdWFcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiSWcuXCIsXCJBbC5cIixcIkFyLlwiLFwiQXouXCIsXCJPZy5cIixcIk9yLlwiLFwiTGEuXCJdLGRheU9mV2VlazpbXCJJZ2FuZGVhXCIsXCJBc3RlbGVoZW5hXCIsXCJBc3RlYXJ0ZWFcIixcIkFzdGVhemtlbmFcIixcIk9zdGVndW5hXCIsXCJPc3RpcmFsYVwiLFwiTGFydW5iYXRhXCJdfSxmaTp7bW9udGhzOltcIlRhbW1pa3V1XCIsXCJIZWxtaWt1dVwiLFwiTWFhbGlza3V1XCIsXCJIdWh0aWt1dVwiLFwiVG91a29rdXVcIixcIktlc8Oka3V1XCIsXCJIZWluw6RrdXVcIixcIkVsb2t1dVwiLFwiU3l5c2t1dVwiLFwiTG9rYWt1dVwiLFwiTWFycmFza3V1XCIsXCJKb3VsdWt1dVwiXSxkYXlPZldlZWtTaG9ydDpbXCJTdVwiLFwiTWFcIixcIlRpXCIsXCJLZVwiLFwiVG9cIixcIlBlXCIsXCJMYVwiXSxkYXlPZldlZWs6W1wic3VubnVudGFpXCIsXCJtYWFuYW50YWlcIixcInRpaXN0YWlcIixcImtlc2tpdmlpa2tvXCIsXCJ0b3JzdGFpXCIsXCJwZXJqYW50YWlcIixcImxhdWFudGFpXCJdfSxnbDp7bW9udGhzOltcIlhhblwiLFwiRmViXCIsXCJNYXpcIixcIkFiclwiLFwiTWFpXCIsXCJYdW5cIixcIlh1bFwiLFwiQWdvXCIsXCJTZXRcIixcIk91dFwiLFwiTm92XCIsXCJEZWNcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiRG9tXCIsXCJMdW5cIixcIk1hclwiLFwiTWVyXCIsXCJYb3ZcIixcIlZlblwiLFwiU2FiXCJdLGRheU9mV2VlazpbXCJEb21pbmdvXCIsXCJMdW5zXCIsXCJNYXJ0ZXNcIixcIk3DqXJjb3Jlc1wiLFwiWG92ZXNcIixcIlZlbnJlc1wiLFwiU8OhYmFkb1wiXX0saHI6e21vbnRoczpbXCJTaWplxI1hbmpcIixcIlZlbGphxI1hXCIsXCJPxb51amFrXCIsXCJUcmF2YW5qXCIsXCJTdmliYW5qXCIsXCJMaXBhbmpcIixcIlNycGFualwiLFwiS29sb3ZvelwiLFwiUnVqYW5cIixcIkxpc3RvcGFkXCIsXCJTdHVkZW5pXCIsXCJQcm9zaW5hY1wiXSxkYXlPZldlZWtTaG9ydDpbXCJOZWRcIixcIlBvblwiLFwiVXRvXCIsXCJTcmlcIixcIsSMZXRcIixcIlBldFwiLFwiU3ViXCJdLGRheU9mV2VlazpbXCJOZWRqZWxqYVwiLFwiUG9uZWRqZWxqYWtcIixcIlV0b3Jha1wiLFwiU3JpamVkYVwiLFwixIxldHZydGFrXCIsXCJQZXRha1wiLFwiU3Vib3RhXCJdfSxrbzp7bW9udGhzOltcIjHsm5RcIixcIjLsm5RcIixcIjPsm5RcIixcIjTsm5RcIixcIjXsm5RcIixcIjbsm5RcIixcIjfsm5RcIixcIjjsm5RcIixcIjnsm5RcIixcIjEw7JuUXCIsXCIxMeyblFwiLFwiMTLsm5RcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wi7J28XCIsXCLsm5RcIixcIu2ZlFwiLFwi7IiYXCIsXCLrqqlcIixcIuq4iFwiLFwi7YagXCJdLGRheU9mV2VlazpbXCLsnbzsmpTsnbxcIixcIuyblOyalOydvFwiLFwi7ZmU7JqU7J28XCIsXCLsiJjsmpTsnbxcIixcIuuqqeyalOydvFwiLFwi6riI7JqU7J28XCIsXCLthqDsmpTsnbxcIl19LGx0Onttb250aHM6W1wiU2F1c2lvXCIsXCJWYXNhcmlvXCIsXCJLb3ZvXCIsXCJCYWxhbmTFvmlvXCIsXCJHZWd1xb7El3NcIixcIkJpcsW+ZWxpb1wiLFwiTGllcG9zXCIsXCJSdWdwasWrxI1pb1wiLFwiUnVnc8SXam9cIixcIlNwYWxpb1wiLFwiTGFwa3JpxI1pb1wiLFwiR3J1b2TFvmlvXCJdLGRheU9mV2Vla1Nob3J0OltcIlNla1wiLFwiUGlyXCIsXCJBbnRcIixcIlRyZVwiLFwiS2V0XCIsXCJQZW5cIixcIsWgZcWhXCJdLGRheU9mV2VlazpbXCJTZWttYWRpZW5pc1wiLFwiUGlybWFkaWVuaXNcIixcIkFudHJhZGllbmlzXCIsXCJUcmXEjWlhZGllbmlzXCIsXCJLZXR2aXJ0YWRpZW5pc1wiLFwiUGVua3RhZGllbmlzXCIsXCLFoGXFoXRhZGllbmlzXCJdfSxsdjp7bW9udGhzOltcIkphbnbEgXJpc1wiLFwiRmVicnXEgXJpc1wiLFwiTWFydHNcIixcIkFwcsSrbGlzIFwiLFwiTWFpanNcIixcIkrFq25panNcIixcIkrFq2xpanNcIixcIkF1Z3VzdHNcIixcIlNlcHRlbWJyaXNcIixcIk9rdG9icmlzXCIsXCJOb3ZlbWJyaXNcIixcIkRlY2VtYnJpc1wiXSxkYXlPZldlZWtTaG9ydDpbXCJTdlwiLFwiUHJcIixcIk90XCIsXCJUclwiLFwiQ3RcIixcIlBrXCIsXCJTdFwiXSxkYXlPZldlZWs6W1wiU3bEk3RkaWVuYVwiLFwiUGlybWRpZW5hXCIsXCJPdHJkaWVuYVwiLFwiVHJlxaFkaWVuYVwiLFwiQ2V0dXJ0ZGllbmFcIixcIlBpZWt0ZGllbmFcIixcIlNlc3RkaWVuYVwiXX0sbWs6e21vbnRoczpbXCLRmNCw0L3Rg9Cw0YDQuFwiLFwi0YTQtdCy0YDRg9Cw0YDQuFwiLFwi0LzQsNGA0YJcIixcItCw0L/RgNC40LtcIixcItC80LDRmFwiLFwi0ZjRg9C90LhcIixcItGY0YPQu9C4XCIsXCLQsNCy0LPRg9GB0YJcIixcItGB0LXQv9GC0LXQvNCy0YDQuFwiLFwi0L7QutGC0L7QvNCy0YDQuFwiLFwi0L3QvtC10LzQstGA0LhcIixcItC00LXQutC10LzQstGA0LhcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wi0L3QtdC0XCIsXCLQv9C+0L1cIixcItCy0YLQvlwiLFwi0YHRgNC1XCIsXCLRh9C10YJcIixcItC/0LXRglwiLFwi0YHQsNCxXCJdLGRheU9mV2VlazpbXCLQndC10LTQtdC70LBcIixcItCf0L7QvdC10LTQtdC70L3QuNC6XCIsXCLQktGC0L7RgNC90LjQulwiLFwi0KHRgNC10LTQsFwiLFwi0KfQtdGC0LLRgNGC0L7QulwiLFwi0J/QtdGC0L7QulwiLFwi0KHQsNCx0L7RgtCwXCJdfSxtbjp7bW9udGhzOltcIjEt0YAg0YHQsNGAXCIsXCIyLdGAINGB0LDRgFwiLFwiMy3RgCDRgdCw0YBcIixcIjQt0YAg0YHQsNGAXCIsXCI1LdGAINGB0LDRgFwiLFwiNi3RgCDRgdCw0YBcIixcIjct0YAg0YHQsNGAXCIsXCI4LdGAINGB0LDRgFwiLFwiOS3RgCDRgdCw0YBcIixcIjEwLdGAINGB0LDRgFwiLFwiMTEt0YAg0YHQsNGAXCIsXCIxMi3RgCDRgdCw0YBcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wi0JTQsNCyXCIsXCLQnNGP0LNcIixcItCb0YXQsFwiLFwi0J/Sr9GAXCIsXCLQkdGB0L1cIixcItCR0Y/QvFwiLFwi0J3Rj9C8XCJdLGRheU9mV2VlazpbXCLQlNCw0LLQsNCwXCIsXCLQnNGP0LPQvNCw0YBcIixcItCb0YXQsNCz0LLQsFwiLFwi0J/Sr9GA0Y3QslwiLFwi0JHQsNCw0YHQsNC9XCIsXCLQkdGP0LzQsdCwXCIsXCLQndGP0LxcIl19LFwicHQtQlJcIjp7bW9udGhzOltcIkphbmVpcm9cIixcIkZldmVyZWlyb1wiLFwiTWFyw6dvXCIsXCJBYnJpbFwiLFwiTWFpb1wiLFwiSnVuaG9cIixcIkp1bGhvXCIsXCJBZ29zdG9cIixcIlNldGVtYnJvXCIsXCJPdXR1YnJvXCIsXCJOb3ZlbWJyb1wiLFwiRGV6ZW1icm9cIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiRG9tXCIsXCJTZWdcIixcIlRlclwiLFwiUXVhXCIsXCJRdWlcIixcIlNleFwiLFwiU8OhYlwiXSxkYXlPZldlZWs6W1wiRG9taW5nb1wiLFwiU2VndW5kYVwiLFwiVGVyw6dhXCIsXCJRdWFydGFcIixcIlF1aW50YVwiLFwiU2V4dGFcIixcIlPDoWJhZG9cIl19LHNrOnttb250aHM6W1wiSmFudcOhclwiLFwiRmVicnXDoXJcIixcIk1hcmVjXCIsXCJBcHLDrWxcIixcIk3DoWpcIixcIkrDum5cIixcIkrDumxcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPa3TDs2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLGRheU9mV2Vla1Nob3J0OltcIk5lXCIsXCJQb1wiLFwiVXRcIixcIlN0XCIsXCLFoHRcIixcIlBpXCIsXCJTb1wiXSxkYXlPZldlZWs6W1wiTmVkZcS+YVwiLFwiUG9uZGVsb2tcIixcIlV0b3Jva1wiLFwiU3RyZWRhXCIsXCLFoHR2cnRva1wiLFwiUGlhdG9rXCIsXCJTb2JvdGFcIl19LHNxOnttb250aHM6W1wiSmFuYXJcIixcIlNoa3VydFwiLFwiTWFyc1wiLFwiUHJpbGxcIixcIk1halwiLFwiUWVyc2hvclwiLFwiS29ycmlrXCIsXCJHdXNodFwiLFwiU2h0YXRvclwiLFwiVGV0b3JcIixcIk7Dq250b3JcIixcIkRoamV0b3JcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiRGllXCIsXCJIw6tuXCIsXCJNYXJcIixcIk3Dq3JcIixcIkVualwiLFwiUHJlXCIsXCJTaHR1XCJdLGRheU9mV2VlazpbXCJFIERpZWxcIixcIkUgSMOrbsOrXCIsXCJFIE1hcnTEk1wiLFwiRSBNw6tya3Vyw6tcIixcIkUgRW5qdGVcIixcIkUgUHJlbXRlXCIsXCJFIFNodHVuw6tcIl19LFwic3ItWVVcIjp7bW9udGhzOltcIkphbnVhclwiLFwiRmVicnVhclwiLFwiTWFydFwiLFwiQXByaWxcIixcIk1halwiLFwiSnVuXCIsXCJKdWxcIixcIkF2Z3VzdFwiLFwiU2VwdGVtYmFyXCIsXCJPa3RvYmFyXCIsXCJOb3ZlbWJhclwiLFwiRGVjZW1iYXJcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wiTmVkXCIsXCJQb25cIixcIlV0b1wiLFwiU3JlXCIsXCLEjWV0XCIsXCJQZXRcIixcIlN1YlwiXSxkYXlPZldlZWs6W1wiTmVkZWxqYVwiLFwiUG9uZWRlbGpha1wiLFwiVXRvcmFrXCIsXCJTcmVkYVwiLFwixIxldHZydGFrXCIsXCJQZXRha1wiLFwiU3Vib3RhXCJdfSxzcjp7bW9udGhzOltcItGY0LDQvdGD0LDRgFwiLFwi0YTQtdCx0YDRg9Cw0YBcIixcItC80LDRgNGCXCIsXCLQsNC/0YDQuNC7XCIsXCLQvNCw0ZhcIixcItGY0YPQvVwiLFwi0ZjRg9C7XCIsXCLQsNCy0LPRg9GB0YJcIixcItGB0LXQv9GC0LXQvNCx0LDRgFwiLFwi0L7QutGC0L7QsdCw0YBcIixcItC90L7QstC10LzQsdCw0YBcIixcItC00LXRhtC10LzQsdCw0YBcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wi0L3QtdC0XCIsXCLQv9C+0L1cIixcItGD0YLQvlwiLFwi0YHRgNC1XCIsXCLRh9C10YJcIixcItC/0LXRglwiLFwi0YHRg9CxXCJdLGRheU9mV2VlazpbXCLQndC10LTQtdGZ0LBcIixcItCf0L7QvdC10LTQtdGZ0LDQulwiLFwi0KPRgtC+0YDQsNC6XCIsXCLQodGA0LXQtNCwXCIsXCLQp9C10YLQstGA0YLQsNC6XCIsXCLQn9C10YLQsNC6XCIsXCLQodGD0LHQvtGC0LBcIl19LHN2Onttb250aHM6W1wiSmFudWFyaVwiLFwiRmVicnVhcmlcIixcIk1hcnNcIixcIkFwcmlsXCIsXCJNYWpcIixcIkp1bmlcIixcIkp1bGlcIixcIkF1Z3VzdGlcIixcIlNlcHRlbWJlclwiLFwiT2t0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLGRheU9mV2Vla1Nob3J0OltcIlPDtm5cIixcIk3DpW5cIixcIlRpc1wiLFwiT25zXCIsXCJUb3JcIixcIkZyZVwiLFwiTMO2clwiXSxkYXlPZldlZWs6W1wiU8O2bmRhZ1wiLFwiTcOlbmRhZ1wiLFwiVGlzZGFnXCIsXCJPbnNkYWdcIixcIlRvcnNkYWdcIixcIkZyZWRhZ1wiLFwiTMO2cmRhZ1wiXX0sXCJ6aC1UV1wiOnttb250aHM6W1wi5LiA5pyIXCIsXCLkuozmnIhcIixcIuS4ieaciFwiLFwi5Zub5pyIXCIsXCLkupTmnIhcIixcIuWFreaciFwiLFwi5LiD5pyIXCIsXCLlhavmnIhcIixcIuS5neaciFwiLFwi5Y2B5pyIXCIsXCLljYHkuIDmnIhcIixcIuWNgeS6jOaciFwiXSxkYXlPZldlZWtTaG9ydDpbXCLml6VcIixcIuS4gFwiLFwi5LqMXCIsXCLkuIlcIixcIuWbm1wiLFwi5LqUXCIsXCLlha1cIl0sZGF5T2ZXZWVrOltcIuaYn+acn+aXpVwiLFwi5pif5pyf5LiAXCIsXCLmmJ/mnJ/kuoxcIixcIuaYn+acn+S4iVwiLFwi5pif5pyf5ZubXCIsXCLmmJ/mnJ/kupRcIixcIuaYn+acn+WFrVwiXX0semg6e21vbnRoczpbXCLkuIDmnIhcIixcIuS6jOaciFwiLFwi5LiJ5pyIXCIsXCLlm5vmnIhcIixcIuS6lOaciFwiLFwi5YWt5pyIXCIsXCLkuIPmnIhcIixcIuWFq+aciFwiLFwi5Lmd5pyIXCIsXCLljYHmnIhcIixcIuWNgeS4gOaciFwiLFwi5Y2B5LqM5pyIXCJdLGRheU9mV2Vla1Nob3J0OltcIuaXpVwiLFwi5LiAXCIsXCLkuoxcIixcIuS4iVwiLFwi5ZubXCIsXCLkupRcIixcIuWFrVwiXSxkYXlPZldlZWs6W1wi5pif5pyf5pelXCIsXCLmmJ/mnJ/kuIBcIixcIuaYn+acn+S6jFwiLFwi5pif5pyf5LiJXCIsXCLmmJ/mnJ/lm5tcIixcIuaYn+acn+S6lFwiLFwi5pif5pyf5YWtXCJdfSx1Zzp7bW9udGhzOltcIjEt2KbYp9mKXCIsXCIyLdim2KfZilwiLFwiMy3Yptin2YpcIixcIjQt2KbYp9mKXCIsXCI1Ldim2KfZilwiLFwiNi3Yptin2YpcIixcIjct2KbYp9mKXCIsXCI4Ldim2KfZilwiLFwiOS3Yptin2YpcIixcIjEwLdim2KfZilwiLFwiMTEt2KbYp9mKXCIsXCIxMi3Yptin2YpcIl0sZGF5T2ZXZWVrOltcItmK25XZg9i025XZhtio25VcIixcItiv24jYtNuV2YbYqNuVXCIsXCLYs9uV2YrYtNuV2YbYqNuVXCIsXCLahtin2LHYtNuV2YbYqNuVXCIsXCLZvtuV2YrYtNuV2YbYqNuVXCIsXCLYrNuI2YXblVwiLFwi2LTbldmG2KjblVwiXX0saGU6e21vbnRoczpbXCLXmdeg15XXkNeoXCIsXCLXpNeR16jXldeQ16hcIixcItee16jXpVwiLFwi15DXpNeo15nXnFwiLFwi157XkNeZXCIsXCLXmdeV16DXmVwiLFwi15nXldec15lcIixcIteQ15XXkteV16HXmFwiLFwi16HXpNeY157XkdeoXCIsXCLXkNeV16fXmNeV15HXqFwiLFwi16DXldeR157XkdeoXCIsXCLXk9em157XkdeoXCJdLGRheU9mV2Vla1Nob3J0OltcIteQJ1wiLFwi15EnXCIsXCLXkidcIixcIteTJ1wiLFwi15QnXCIsXCLXlSdcIixcItep15HXqlwiXSxkYXlPZldlZWs6W1wi16jXkNep15XXn1wiLFwi16nXoNeZXCIsXCLXqdec15nXqdeZXCIsXCLXqNeR15nXoteZXCIsXCLXl9ee15nXqdeZXCIsXCLXqdeZ16nXmVwiLFwi16nXkdeqXCIsXCLXqNeQ16nXldefXCJdfSxoeTp7bW9udGhzOltcItWA1bjWgtW21b7VodaAXCIsXCLVk9Wl1b/WgNW+1aHWgFwiLFwi1YTVodaA1b9cIixcItSx1brWgNWr1axcIixcItWE1aHVtdWr1b1cIixcItWA1bjWgtW21avVvVwiLFwi1YDVuNaC1azVq9W9XCIsXCLVldWj1bjVvdW/1bjVvVwiLFwi1Y3VpdW61b/VpdW01aLVpdaAXCIsXCLVgNW41a/Vv9Wl1bTVotWl1oBcIixcItWG1bjVtdWl1bTVotWl1oBcIixcItS01aXVr9W/1aXVtNWi1aXWgFwiXSxkYXlPZldlZWtTaG9ydDpbXCLUv9WrXCIsXCLUtdaA1a9cIixcItS11oDWhFwiLFwi1YnVuNaAXCIsXCLVgNW21aNcIixcItWI1oLWgNWiXCIsXCLVh9Wi1alcIl0sZGF5T2ZXZWVrOltcItS/1avWgNWh1a/Vq1wiLFwi1LXWgNWv1bjWgtW31aHVotWp1atcIixcItS11oDVpdaE1bfVodWi1anVq1wiLFwi1YnVuNaA1aXWhNW31aHVotWp1atcIixcItWA1avVttWj1bfVodWi1anVq1wiLFwi1YjWgtaA1aLVodWpXCIsXCLVh9Wh1aLVodWpXCJdfSxrZzp7bW9udGhzOltcItKu0YfRgtKv0L0g0LDQudGLXCIsXCLQkdC40YDQtNC40L0g0LDQudGLXCIsXCLQltCw0LvQs9Cw0L0g0JrRg9GA0LDQvVwiLFwi0KfRi9C9INCa0YPRgNCw0L1cIixcItCR0YPQs9GDXCIsXCLQmtGD0LvQttCwXCIsXCLQotC10LrQtVwiLFwi0JHQsNGIINCe0L7QvdCwXCIsXCLQkNGP0Log0J7QvtC90LBcIixcItCi0L7Qs9GD0LfQtNGD0L0g0LDQudGLXCIsXCLQltC10YLQuNC90LjQvSDQsNC50YtcIixcItCR0LXRiNGC0LjQvSDQsNC50YtcIl0sZGF5T2ZXZWVrU2hvcnQ6W1wi0JbQtdC6XCIsXCLQlNKv0LlcIixcItCo0LXQuVwiLFwi0KjQsNGAXCIsXCLQkdC10LlcIixcItCW0YPQvFwiLFwi0JjRiNC1XCJdLGRheU9mV2VlazpbXCLQltC10LrRiNC10LzQsVwiLFwi0JTSr9C50YjTqdC80LFcIixcItCo0LXQudGI0LXQvNCxXCIsXCLQqNCw0YDRiNC10LzQsVwiLFwi0JHQtdC50YjQtdC80LHQuFwiLFwi0JbRg9C80LBcIixcItCY0YjQtdC90LFcIl19LHJtOnttb250aHM6W1wiU2NoYW5lclwiLFwiRmF2cmVyXCIsXCJNYXJzXCIsXCJBdnJpZ2xcIixcIk1hdGdcIixcIlplcmNsYWR1clwiLFwiRmFuYWR1clwiLFwiQXZ1c3RcIixcIlNldHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLGRheU9mV2Vla1Nob3J0OltcIkR1XCIsXCJHbGlcIixcIk1hXCIsXCJNZVwiLFwiR2llXCIsXCJWZVwiLFwiU29cIl0sZGF5T2ZXZWVrOltcIkR1bWVuZ2lhXCIsXCJHbGluZGVzZGlcIixcIk1hcmRpXCIsXCJNZXNlbW5hXCIsXCJHaWV2Z2lhXCIsXCJWZW5kZXJkaVwiLFwiU29uZGFcIl19LGthOnttb250aHM6W1wi4YOY4YOQ4YOc4YOV4YOQ4YOg4YOYXCIsXCLhg5fhg5Thg5Hhg5Thg6Dhg5Xhg5Dhg5rhg5hcIixcIuGDm+GDkOGDoOGDouGDmFwiLFwi4YOQ4YOe4YOg4YOY4YOa4YOYXCIsXCLhg5vhg5Dhg5jhg6Hhg5hcIixcIuGDmOGDleGDnOGDmOGDoeGDmFwiLFwi4YOY4YOV4YOa4YOY4YOh4YOYXCIsXCLhg5Dhg5Lhg5Xhg5jhg6Hhg6Lhg51cIixcIuGDoeGDlOGDpeGDouGDlOGDm+GDkeGDlOGDoOGDmFwiLFwi4YOd4YOl4YOi4YOd4YOb4YOR4YOU4YOg4YOYXCIsXCLhg5zhg53hg5Thg5vhg5Hhg5Thg6Dhg5hcIixcIuGDk+GDlOGDmeGDlOGDm+GDkeGDlOGDoOGDmFwiXSxkYXlPZldlZWtTaG9ydDpbXCLhg5nhg5VcIixcIuGDneGDoOGDqFwiLFwi4YOh4YOQ4YOb4YOoXCIsXCLhg53hg5fhg65cIixcIuGDruGDo+GDl1wiLFwi4YOe4YOQ4YOgXCIsXCLhg6jhg5Dhg5FcIl0sZGF5T2ZXZWVrOltcIuGDmeGDleGDmOGDoOGDkFwiLFwi4YOd4YOg4YOo4YOQ4YOR4YOQ4YOX4YOYXCIsXCLhg6Hhg5Dhg5vhg6jhg5Dhg5Hhg5Dhg5fhg5hcIixcIuGDneGDl+GDruGDqOGDkOGDkeGDkOGDl+GDmFwiLFwi4YOu4YOj4YOX4YOo4YOQ4YOR4YOQ4YOX4YOYXCIsXCLhg57hg5Dhg6Dhg5Dhg6Hhg5nhg5Thg5Xhg5hcIixcIuGDqOGDkOGDkeGDkOGDl+GDmFwiXX19LG93bmVyRG9jdW1lbnQ6ZG9jdW1lbnQsY29udGVudFdpbmRvdzp3aW5kb3csdmFsdWU6XCJcIixydGw6ITEsZm9ybWF0OlwiWS9tL2QgSDppXCIsZm9ybWF0VGltZTpcIkg6aVwiLGZvcm1hdERhdGU6XCJZL20vZFwiLHN0YXJ0RGF0ZTohMSxzdGVwOjYwLG1vbnRoQ2hhbmdlU3Bpbm5lcjohMCxjbG9zZU9uRGF0ZVNlbGVjdDohMSxjbG9zZU9uVGltZVNlbGVjdDohMCxjbG9zZU9uV2l0aG91dENsaWNrOiEwLGNsb3NlT25JbnB1dENsaWNrOiEwLG9wZW5PbkZvY3VzOiEwLHRpbWVwaWNrZXI6ITAsZGF0ZXBpY2tlcjohMCx3ZWVrczohMSxkZWZhdWx0VGltZTohMSxkZWZhdWx0RGF0ZTohMSxtaW5EYXRlOiExLG1heERhdGU6ITEsbWluVGltZTohMSxtYXhUaW1lOiExLG1pbkRhdGVUaW1lOiExLG1heERhdGVUaW1lOiExLGFsbG93VGltZXM6W10sb3BlbmVkOiExLGluaXRUaW1lOiEwLGlubGluZTohMSx0aGVtZTpcIlwiLHRvdWNoTW92ZWRUaHJlc2hvbGQ6NSxvblNlbGVjdERhdGU6ZnVuY3Rpb24oKXt9LG9uU2VsZWN0VGltZTpmdW5jdGlvbigpe30sb25DaGFuZ2VNb250aDpmdW5jdGlvbigpe30sb25HZXRXZWVrT2ZZZWFyOmZ1bmN0aW9uKCl7fSxvbkNoYW5nZVllYXI6ZnVuY3Rpb24oKXt9LG9uQ2hhbmdlRGF0ZVRpbWU6ZnVuY3Rpb24oKXt9LG9uU2hvdzpmdW5jdGlvbigpe30sb25DbG9zZTpmdW5jdGlvbigpe30sb25HZW5lcmF0ZTpmdW5jdGlvbigpe30sd2l0aG91dENvcHlyaWdodDohMCxpbnZlcnNlQnV0dG9uOiExLGhvdXJzMTI6ITEsbmV4dDpcInhkc29mdF9uZXh0XCIscHJldjpcInhkc29mdF9wcmV2XCIsZGF5T2ZXZWVrU3RhcnQ6MCxwYXJlbnRJRDpcImJvZHlcIix0aW1lSGVpZ2h0SW5UaW1lUGlja2VyOjI1LHRpbWVwaWNrZXJTY3JvbGxiYXI6ITAsdG9kYXlCdXR0b246ITAscHJldkJ1dHRvbjohMCxuZXh0QnV0dG9uOiEwLGRlZmF1bHRTZWxlY3Q6ITAsc2Nyb2xsTW9udGg6ITAsc2Nyb2xsVGltZTohMCxzY3JvbGxJbnB1dDohMCxsYXp5SW5pdDohMSxtYXNrOiExLHZhbGlkYXRlT25CbHVyOiEwLGFsbG93Qmxhbms6ITAseWVhclN0YXJ0OjE5NTAseWVhckVuZDoyMDUwLG1vbnRoU3RhcnQ6MCxtb250aEVuZDoxMSxzdHlsZTpcIlwiLGlkOlwiXCIsZml4ZWQ6ITEscm91bmRUaW1lOlwicm91bmRcIixjbGFzc05hbWU6XCJcIix3ZWVrZW5kczpbXSxoaWdobGlnaHRlZERhdGVzOltdLGhpZ2hsaWdodGVkUGVyaW9kczpbXSxhbGxvd0RhdGVzOltdLGFsbG93RGF0ZVJlOm51bGwsZGlzYWJsZWREYXRlczpbXSxkaXNhYmxlZFdlZWtEYXlzOltdLHllYXJPZmZzZXQ6MCxiZWZvcmVTaG93RGF5Om51bGwsZW50ZXJMaWtlVGFiOiEwLHNob3dBcHBseUJ1dHRvbjohMSxpbnNpZGVQYXJlbnQ6ITF9LEU9bnVsbCxuPW51bGwsUj1cImVuXCIsYT17bWVyaWRpZW06W1wiQU1cIixcIlBNXCJdfSxyPWZ1bmN0aW9uKCl7dmFyIGU9cy5pMThuW1JdLHQ9e2RheXM6ZS5kYXlPZldlZWssZGF5c1Nob3J0OmUuZGF5T2ZXZWVrU2hvcnQsbW9udGhzOmUubW9udGhzLG1vbnRoc1Nob3J0OkwubWFwKGUubW9udGhzLGZ1bmN0aW9uKGUpe3JldHVybiBlLnN1YnN0cmluZygwLDMpfSl9O1wiZnVuY3Rpb25cIj09dHlwZW9mIERhdGVGb3JtYXR0ZXImJihFPW49bmV3IERhdGVGb3JtYXR0ZXIoe2RhdGVTZXR0aW5nczpMLmV4dGVuZCh7fSxhLHQpfSkpfSxvPXttb21lbnQ6e2RlZmF1bHRfb3B0aW9uczp7Zm9ybWF0OlwiWVlZWS9NTS9ERCBISDptbVwiLGZvcm1hdERhdGU6XCJZWVlZL01NL0REXCIsZm9ybWF0VGltZTpcIkhIOm1tXCJ9LGZvcm1hdHRlcjp7cGFyc2VEYXRlOmZ1bmN0aW9uKGUsdCl7aWYoaSh0KSlyZXR1cm4gbi5wYXJzZURhdGUoZSx0KTt2YXIgYT1tb21lbnQoZSx0KTtyZXR1cm4hIWEuaXNWYWxpZCgpJiZhLnRvRGF0ZSgpfSxmb3JtYXREYXRlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGkodCk/bi5mb3JtYXREYXRlKGUsdCk6bW9tZW50KGUpLmZvcm1hdCh0KX0sZm9ybWF0TWFzazpmdW5jdGlvbihlKXtyZXR1cm4gZS5yZXBsYWNlKC9ZezR9L2csXCI5OTk5XCIpLnJlcGxhY2UoL1l7Mn0vZyxcIjk5XCIpLnJlcGxhY2UoL017Mn0vZyxcIjE5XCIpLnJlcGxhY2UoL0R7Mn0vZyxcIjM5XCIpLnJlcGxhY2UoL0h7Mn0vZyxcIjI5XCIpLnJlcGxhY2UoL217Mn0vZyxcIjU5XCIpLnJlcGxhY2UoL3N7Mn0vZyxcIjU5XCIpfX19fTtMLmRhdGV0aW1lcGlja2VyPXtzZXRMb2NhbGU6ZnVuY3Rpb24oZSl7dmFyIHQ9cy5pMThuW2VdP2U6XCJlblwiO1IhPT10JiYoUj10LHIoKSl9LHNldERhdGVGb3JtYXR0ZXI6ZnVuY3Rpb24oZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUmJm8uaGFzT3duUHJvcGVydHkoZSkpe3ZhciB0PW9bZV07TC5leHRlbmQocyx0LmRlZmF1bHRfb3B0aW9ucyksRT10LmZvcm1hdHRlcn1lbHNlIEU9ZX19O3ZhciB0PXtSRkNfMjgyMjpcIkQsIGQgTSBZIEg6aTpzIE9cIixBVE9NOlwiWS1tLWRUSDppOnNQXCIsSVNPXzg2MDE6XCJZLW0tZFRIOmk6c09cIixSRkNfODIyOlwiRCwgZCBNIHkgSDppOnMgT1wiLFJGQ184NTA6XCJsLCBkLU0teSBIOmk6cyBUXCIsUkZDXzEwMzY6XCJELCBkIE0geSBIOmk6cyBPXCIsUkZDXzExMjM6XCJELCBkIE0gWSBIOmk6cyBPXCIsUlNTOlwiRCwgZCBNIFkgSDppOnMgT1wiLFczQzpcIlktbS1kVEg6aTpzUFwifSxpPWZ1bmN0aW9uKGUpe3JldHVybi0xIT09T2JqZWN0LnZhbHVlcyh0KS5pbmRleE9mKGUpfTtmdW5jdGlvbiBtKGUsdCxhKXt0aGlzLmRhdGU9ZSx0aGlzLmRlc2M9dCx0aGlzLnN0eWxlPWF9TC5leHRlbmQoTC5kYXRldGltZXBpY2tlcix0KSxyKCksd2luZG93LmdldENvbXB1dGVkU3R5bGV8fCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZT1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5lbD1hLHRoaXMuZ2V0UHJvcGVydHlWYWx1ZT1mdW5jdGlvbihlKXt2YXIgdD0vKC0oW2Etel0pKS9nO3JldHVyblwiZmxvYXRcIj09PWUmJihlPVwic3R5bGVGbG9hdFwiKSx0LnRlc3QoZSkmJihlPWUucmVwbGFjZSh0LGZ1bmN0aW9uKGUsdCxhKXtyZXR1cm4gYS50b1VwcGVyQ2FzZSgpfSkpLGEuY3VycmVudFN0eWxlW2VdfHxudWxsfSx0aGlzfSksQXJyYXkucHJvdG90eXBlLmluZGV4T2Z8fChBcnJheS5wcm90b3R5cGUuaW5kZXhPZj1mdW5jdGlvbihlLHQpe3ZhciBhLG47Zm9yKGE9dHx8MCxuPXRoaXMubGVuZ3RoO2E8bjthKz0xKWlmKHRoaXNbYV09PT1lKXJldHVybiBhO3JldHVybi0xfSksRGF0ZS5wcm90b3R5cGUuY291bnREYXlzSW5Nb250aD1mdW5jdGlvbigpe3JldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksdGhpcy5nZXRNb250aCgpKzEsMCkuZ2V0RGF0ZSgpfSxMLmZuLnhkc29mdFNjcm9sbGVyPWZ1bmN0aW9uKHAsRCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBvLGkscyxkLHUsbD1MKHRoaXMpLGE9ZnVuY3Rpb24oZSl7dmFyIHQsYT17eDowLHk6MH07cmV0dXJuXCJ0b3VjaHN0YXJ0XCI9PT1lLnR5cGV8fFwidG91Y2htb3ZlXCI9PT1lLnR5cGV8fFwidG91Y2hlbmRcIj09PWUudHlwZXx8XCJ0b3VjaGNhbmNlbFwiPT09ZS50eXBlPyh0PWUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdfHxlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0sYS54PXQuY2xpZW50WCxhLnk9dC5jbGllbnRZKTpcIm1vdXNlZG93blwiIT09ZS50eXBlJiZcIm1vdXNldXBcIiE9PWUudHlwZSYmXCJtb3VzZW1vdmVcIiE9PWUudHlwZSYmXCJtb3VzZW92ZXJcIiE9PWUudHlwZSYmXCJtb3VzZW91dFwiIT09ZS50eXBlJiZcIm1vdXNlZW50ZXJcIiE9PWUudHlwZSYmXCJtb3VzZWxlYXZlXCIhPT1lLnR5cGV8fChhLng9ZS5jbGllbnRYLGEueT1lLmNsaWVudFkpLGF9LGY9MTAwLG49ITEscj0wLGM9MCxtPTAsdD0hMSxoPTAsZz1mdW5jdGlvbigpe307XCJoaWRlXCIhPT1EPyhMKHRoaXMpLmhhc0NsYXNzKFwieGRzb2Z0X3Njcm9sbGVyX2JveFwiKXx8KG89bC5jaGlsZHJlbigpLmVxKDApLGk9bFswXS5jbGllbnRIZWlnaHQscz1vWzBdLm9mZnNldEhlaWdodCxkPUwoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfc2Nyb2xsYmFyXCI+PC9kaXY+JyksdT1MKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X3Njcm9sbGVyXCI+PC9kaXY+JyksZC5hcHBlbmQodSksbC5hZGRDbGFzcyhcInhkc29mdF9zY3JvbGxlcl9ib3hcIikuYXBwZW5kKGQpLGc9ZnVuY3Rpb24oZSl7dmFyIHQ9YShlKS55LXIraDt0PDAmJih0PTApLHQrdVswXS5vZmZzZXRIZWlnaHQ+bSYmKHQ9bS11WzBdLm9mZnNldEhlaWdodCksbC50cmlnZ2VyKFwic2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyXCIsW2Y/dC9mOjBdKX0sdS5vbihcInRvdWNoc3RhcnQueGRzb2Z0X3Njcm9sbGVyIG1vdXNlZG93bi54ZHNvZnRfc2Nyb2xsZXJcIixmdW5jdGlvbihlKXtpfHxsLnRyaWdnZXIoXCJyZXNpemVfc2Nyb2xsLnhkc29mdF9zY3JvbGxlclwiLFtEXSkscj1hKGUpLnksaD1wYXJzZUludCh1LmNzcyhcIm1hcmdpbi10b3BcIiksMTApLG09ZFswXS5vZmZzZXRIZWlnaHQsXCJtb3VzZWRvd25cIj09PWUudHlwZXx8XCJ0b3VjaHN0YXJ0XCI9PT1lLnR5cGU/KHAub3duZXJEb2N1bWVudCYmTChwLm93bmVyRG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoXCJ4ZHNvZnRfbm9zZWxlY3RcIiksTChbcC5vd25lckRvY3VtZW50LmJvZHkscC5jb250ZW50V2luZG93XSkub24oXCJ0b3VjaGVuZCBtb3VzZXVwLnhkc29mdF9zY3JvbGxlclwiLGZ1bmN0aW9uIGUoKXtMKFtwLm93bmVyRG9jdW1lbnQuYm9keSxwLmNvbnRlbnRXaW5kb3ddKS5vZmYoXCJ0b3VjaGVuZCBtb3VzZXVwLnhkc29mdF9zY3JvbGxlclwiLGUpLm9mZihcIm1vdXNlbW92ZS54ZHNvZnRfc2Nyb2xsZXJcIixnKS5yZW1vdmVDbGFzcyhcInhkc29mdF9ub3NlbGVjdFwiKX0pLEwocC5vd25lckRvY3VtZW50LmJvZHkpLm9uKFwibW91c2Vtb3ZlLnhkc29mdF9zY3JvbGxlclwiLGcpKToodD0hMCxlLnN0b3BQcm9wYWdhdGlvbigpLGUucHJldmVudERlZmF1bHQoKSl9KS5vbihcInRvdWNobW92ZVwiLGZ1bmN0aW9uKGUpe3QmJihlLnByZXZlbnREZWZhdWx0KCksZyhlKSl9KS5vbihcInRvdWNoZW5kIHRvdWNoY2FuY2VsXCIsZnVuY3Rpb24oKXt0PSExLGg9MH0pLGwub24oXCJzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXJcIixmdW5jdGlvbihlLHQpe2l8fGwudHJpZ2dlcihcInJlc2l6ZV9zY3JvbGwueGRzb2Z0X3Njcm9sbGVyXCIsW3QsITBdKSx0PTE8dD8xOnQ8MHx8aXNOYU4odCk/MDp0LHUuY3NzKFwibWFyZ2luLXRvcFwiLGYqdCksc2V0VGltZW91dChmdW5jdGlvbigpe28uY3NzKFwibWFyZ2luVG9wXCIsLXBhcnNlSW50KChvWzBdLm9mZnNldEhlaWdodC1pKSp0LDEwKSl9LDEwKX0pLm9uKFwicmVzaXplX3Njcm9sbC54ZHNvZnRfc2Nyb2xsZXJcIixmdW5jdGlvbihlLHQsYSl7dmFyIG4scjtpPWxbMF0uY2xpZW50SGVpZ2h0LHM9b1swXS5vZmZzZXRIZWlnaHQscj0obj1pL3MpKmRbMF0ub2Zmc2V0SGVpZ2h0LDE8bj91LmhpZGUoKToodS5zaG93KCksdS5jc3MoXCJoZWlnaHRcIixwYXJzZUludCgxMDxyP3I6MTAsMTApKSxmPWRbMF0ub2Zmc2V0SGVpZ2h0LXVbMF0ub2Zmc2V0SGVpZ2h0LCEwIT09YSYmbC50cmlnZ2VyKFwic2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyXCIsW3R8fE1hdGguYWJzKHBhcnNlSW50KG8uY3NzKFwibWFyZ2luVG9wXCIpLDEwKSkvKHMtaSldKSl9KSxsLm9uKFwibW91c2V3aGVlbFwiLGZ1bmN0aW9uKGUpe3ZhciB0PU1hdGguYWJzKHBhcnNlSW50KG8uY3NzKFwibWFyZ2luVG9wXCIpLDEwKSk7cmV0dXJuKHQtPTIwKmUuZGVsdGFZKTwwJiYodD0wKSxsLnRyaWdnZXIoXCJzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXJcIixbdC8ocy1pKV0pLGUuc3RvcFByb3BhZ2F0aW9uKCksITF9KSxsLm9uKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKGUpe249YShlKSxjPU1hdGguYWJzKHBhcnNlSW50KG8uY3NzKFwibWFyZ2luVG9wXCIpLDEwKSl9KSxsLm9uKFwidG91Y2htb3ZlXCIsZnVuY3Rpb24oZSl7aWYobil7ZS5wcmV2ZW50RGVmYXVsdCgpO3ZhciB0PWEoZSk7bC50cmlnZ2VyKFwic2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyXCIsWyhjLSh0Lnktbi55KSkvKHMtaSldKX19KSxsLm9uKFwidG91Y2hlbmQgdG91Y2hjYW5jZWxcIixmdW5jdGlvbigpe249ITEsYz0wfSkpLGwudHJpZ2dlcihcInJlc2l6ZV9zY3JvbGwueGRzb2Z0X3Njcm9sbGVyXCIsW0RdKSk6bC5maW5kKFwiLnhkc29mdF9zY3JvbGxiYXJcIikuaGlkZSgpfSl9LEwuZm4uZGF0ZXRpbWVwaWNrZXI9ZnVuY3Rpb24oSCxhKXt2YXIgbixyLG89dGhpcyxwPTE3LEQ9MTMseT0yNyx2PTM3LGI9Mzgsaz0zOSx4PTQwLFQ9OSxTPTExNixNPTY1LHc9Njcsaj04NixKPTkwLHo9ODksST0hMSxOPUwuaXNQbGFpbk9iamVjdChIKXx8IUg/TC5leHRlbmQoITAse30scyxIKTpMLmV4dGVuZCghMCx7fSxzKSxpPTA7cmV0dXJuIG49ZnVuY3Rpb24oTyl7dmFyIHQsbixhLHIsVyxoLF89TCgnPGRpdiBjbGFzcz1cInhkc29mdF9kYXRldGltZXBpY2tlciB4ZHNvZnRfbm9zZWxlY3RcIj48L2Rpdj4nKSxlPUwoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfY29weXJpZ2h0XCI+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly94ZHNvZnQubmV0L2pxcGx1Z2lucy9kYXRldGltZXBpY2tlci9cIj54ZHNvZnQubmV0PC9hPjwvZGl2PicpLGc9TCgnPGRpdiBjbGFzcz1cInhkc29mdF9kYXRlcGlja2VyIGFjdGl2ZVwiPjwvZGl2PicpLEY9TCgnPGRpdiBjbGFzcz1cInhkc29mdF9tb250aHBpY2tlclwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieGRzb2Z0X3ByZXZcIj48L2J1dHRvbj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInhkc29mdF90b2RheV9idXR0b25cIj48L2J1dHRvbj48ZGl2IGNsYXNzPVwieGRzb2Z0X2xhYmVsIHhkc29mdF9tb250aFwiPjxzcGFuPjwvc3Bhbj48aT48L2k+PC9kaXY+PGRpdiBjbGFzcz1cInhkc29mdF9sYWJlbCB4ZHNvZnRfeWVhclwiPjxzcGFuPjwvc3Bhbj48aT48L2k+PC9kaXY+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ4ZHNvZnRfbmV4dFwiPjwvYnV0dG9uPjwvZGl2PicpLEM9TCgnPGRpdiBjbGFzcz1cInhkc29mdF9jYWxlbmRhclwiPjwvZGl2PicpLG89TCgnPGRpdiBjbGFzcz1cInhkc29mdF90aW1lcGlja2VyIGFjdGl2ZVwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieGRzb2Z0X3ByZXZcIj48L2J1dHRvbj48ZGl2IGNsYXNzPVwieGRzb2Z0X3RpbWVfYm94XCI+PC9kaXY+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ4ZHNvZnRfbmV4dFwiPjwvYnV0dG9uPjwvZGl2PicpLHU9by5maW5kKFwiLnhkc29mdF90aW1lX2JveFwiKS5lcSgwKSxQPUwoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfdGltZV92YXJpYW50XCI+PC9kaXY+JyksaT1MKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInhkc29mdF9zYXZlX3NlbGVjdGVkIGJsdWUtZ3JhZGllbnQtYnV0dG9uXCI+U2F2ZSBTZWxlY3RlZDwvYnV0dG9uPicpLFk9TCgnPGRpdiBjbGFzcz1cInhkc29mdF9zZWxlY3QgeGRzb2Z0X21vbnRoc2VsZWN0XCI+PGRpdj48L2Rpdj48L2Rpdj4nKSxBPUwoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfc2VsZWN0IHhkc29mdF95ZWFyc2VsZWN0XCI+PGRpdj48L2Rpdj48L2Rpdj4nKSxzPSExLGQ9MDtOLmlkJiZfLmF0dHIoXCJpZFwiLE4uaWQpLE4uc3R5bGUmJl8uYXR0cihcInN0eWxlXCIsTi5zdHlsZSksTi53ZWVrcyYmXy5hZGRDbGFzcyhcInhkc29mdF9zaG93d2Vla3NcIiksTi5ydGwmJl8uYWRkQ2xhc3MoXCJ4ZHNvZnRfcnRsXCIpLF8uYWRkQ2xhc3MoXCJ4ZHNvZnRfXCIrTi50aGVtZSksXy5hZGRDbGFzcyhOLmNsYXNzTmFtZSksRi5maW5kKFwiLnhkc29mdF9tb250aCBzcGFuXCIpLmFmdGVyKFkpLEYuZmluZChcIi54ZHNvZnRfeWVhciBzcGFuXCIpLmFmdGVyKEEpLEYuZmluZChcIi54ZHNvZnRfbW9udGgsLnhkc29mdF95ZWFyXCIpLm9uKFwidG91Y2hzdGFydCBtb3VzZWRvd24ueGRzb2Z0XCIsZnVuY3Rpb24oZSl7dmFyIHQsYSxuPUwodGhpcykuZmluZChcIi54ZHNvZnRfc2VsZWN0XCIpLmVxKDApLHI9MCxvPTAsaT1uLmlzKFwiOnZpc2libGVcIik7Zm9yKEYuZmluZChcIi54ZHNvZnRfc2VsZWN0XCIpLmhpZGUoKSxXLmN1cnJlbnRUaW1lJiYocj1XLmN1cnJlbnRUaW1lW0wodGhpcykuaGFzQ2xhc3MoXCJ4ZHNvZnRfbW9udGhcIik/XCJnZXRNb250aFwiOlwiZ2V0RnVsbFllYXJcIl0oKSksbltpP1wiaGlkZVwiOlwic2hvd1wiXSgpLHQ9bi5maW5kKFwiZGl2Lnhkc29mdF9vcHRpb25cIiksYT0wO2E8dC5sZW5ndGgmJnQuZXEoYSkuZGF0YShcInZhbHVlXCIpIT09cjthKz0xKW8rPXRbMF0ub2Zmc2V0SGVpZ2h0O3JldHVybiBuLnhkc29mdFNjcm9sbGVyKE4sby8obi5jaGlsZHJlbigpWzBdLm9mZnNldEhlaWdodC1uWzBdLmNsaWVudEhlaWdodCkpLGUuc3RvcFByb3BhZ2F0aW9uKCksITF9KTt2YXIgbD1mdW5jdGlvbihlKXt2YXIgdD1lLm9yaWdpbmFsRXZlbnQsYT10LnRvdWNoZXM/dC50b3VjaGVzWzBdOnQ7dGhpcy50b3VjaFN0YXJ0UG9zaXRpb249dGhpcy50b3VjaFN0YXJ0UG9zaXRpb258fGE7dmFyIG49TWF0aC5hYnModGhpcy50b3VjaFN0YXJ0UG9zaXRpb24uY2xpZW50WC1hLmNsaWVudFgpLHI9TWF0aC5hYnModGhpcy50b3VjaFN0YXJ0UG9zaXRpb24uY2xpZW50WS1hLmNsaWVudFkpO01hdGguc3FydChuKm4rcipyKT5OLnRvdWNoTW92ZWRUaHJlc2hvbGQmJih0aGlzLnRvdWNoTW92ZWQ9ITApfTtmdW5jdGlvbiBmKCl7dmFyIGUsdD0hMTtyZXR1cm4gTi5zdGFydERhdGU/dD1XLnN0clRvRGF0ZShOLnN0YXJ0RGF0ZSk6KHQ9Ti52YWx1ZXx8KE8mJk8udmFsJiZPLnZhbCgpP08udmFsKCk6XCJcIikpPyh0PVcuc3RyVG9EYXRlVGltZSh0KSxOLnllYXJPZmZzZXQmJih0PW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKS1OLnllYXJPZmZzZXQsdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpLHQuZ2V0SG91cnMoKSx0LmdldE1pbnV0ZXMoKSx0LmdldFNlY29uZHMoKSx0LmdldE1pbGxpc2Vjb25kcygpKSkpOk4uZGVmYXVsdERhdGUmJih0PVcuc3RyVG9EYXRlVGltZShOLmRlZmF1bHREYXRlKSxOLmRlZmF1bHRUaW1lJiYoZT1XLnN0cnRvdGltZShOLmRlZmF1bHRUaW1lKSx0LnNldEhvdXJzKGUuZ2V0SG91cnMoKSksdC5zZXRNaW51dGVzKGUuZ2V0TWludXRlcygpKSkpLHQmJlcuaXNWYWxpZERhdGUodCk/Xy5kYXRhKFwiY2hhbmdlZFwiLCEwKTp0PVwiXCIsdHx8MH1mdW5jdGlvbiBjKG0pe3ZhciBoPWZ1bmN0aW9uKGUsdCl7dmFyIGE9ZS5yZXBsYWNlKC8oW1xcW1xcXVxcL1xce1xcfVxcKFxcKVxcLVxcLlxcK117MX0pL2csXCJcXFxcJDFcIikucmVwbGFjZSgvXy9nLFwie2RpZ2l0K31cIikucmVwbGFjZSgvKFswLTldezF9KS9nLFwie2RpZ2l0JDF9XCIpLnJlcGxhY2UoL1xce2RpZ2l0KFswLTldezF9KVxcfS9nLFwiWzAtJDFfXXsxfVwiKS5yZXBsYWNlKC9cXHtkaWdpdFtcXCtdXFx9L2csXCJbMC05X117MX1cIik7cmV0dXJuIG5ldyBSZWdFeHAoYSkudGVzdCh0KX0sZz1mdW5jdGlvbihlLHQpe2lmKCEoZT1cInN0cmluZ1wiPT10eXBlb2YgZXx8ZSBpbnN0YW5jZW9mIFN0cmluZz9tLm93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZSk6ZSkpcmV0dXJuITE7aWYoZS5jcmVhdGVUZXh0UmFuZ2Upe3ZhciBhPWUuY3JlYXRlVGV4dFJhbmdlKCk7cmV0dXJuIGEuY29sbGFwc2UoITApLGEubW92ZUVuZChcImNoYXJhY3RlclwiLHQpLGEubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsdCksYS5zZWxlY3QoKSwhMH1yZXR1cm4hIWUuc2V0U2VsZWN0aW9uUmFuZ2UmJihlLnNldFNlbGVjdGlvblJhbmdlKHQsdCksITApfTttLm1hc2smJk8ub2ZmKFwia2V5ZG93bi54ZHNvZnRcIiksITA9PT1tLm1hc2smJihFLmZvcm1hdE1hc2s/bS5tYXNrPUUuZm9ybWF0TWFzayhtLmZvcm1hdCk6bS5tYXNrPW0uZm9ybWF0LnJlcGxhY2UoL1kvZyxcIjk5OTlcIikucmVwbGFjZSgvRi9nLFwiOTk5OVwiKS5yZXBsYWNlKC9tL2csXCIxOVwiKS5yZXBsYWNlKC9kL2csXCIzOVwiKS5yZXBsYWNlKC9IL2csXCIyOVwiKS5yZXBsYWNlKC9pL2csXCI1OVwiKS5yZXBsYWNlKC9zL2csXCI1OVwiKSksXCJzdHJpbmdcIj09PUwudHlwZShtLm1hc2spJiYoaChtLm1hc2ssTy52YWwoKSl8fChPLnZhbChtLm1hc2sucmVwbGFjZSgvWzAtOV0vZyxcIl9cIikpLGcoT1swXSwwKSksTy5vbihcInBhc3RlLnhkc29mdFwiLGZ1bmN0aW9uKGUpe3ZhciB0PShlLmNsaXBib2FyZERhdGF8fGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhfHx3aW5kb3cuY2xpcGJvYXJkRGF0YSkuZ2V0RGF0YShcInRleHRcIiksYT10aGlzLnZhbHVlLG49dGhpcy5zZWxlY3Rpb25TdGFydDtyZXR1cm4gYT1hLnN1YnN0cigwLG4pK3QrYS5zdWJzdHIobit0Lmxlbmd0aCksbis9dC5sZW5ndGgsaChtLm1hc2ssYSk/KHRoaXMudmFsdWU9YSxnKHRoaXMsbikpOlwiXCI9PT1MLnRyaW0oYSk/dGhpcy52YWx1ZT1tLm1hc2sucmVwbGFjZSgvWzAtOV0vZyxcIl9cIik6Ty50cmlnZ2VyKFwiZXJyb3JfaW5wdXQueGRzb2Z0XCIpLGUucHJldmVudERlZmF1bHQoKSwhMX0pLE8ub24oXCJrZXlkb3duLnhkc29mdFwiLGZ1bmN0aW9uKGUpe3ZhciB0LGE9dGhpcy52YWx1ZSxuPWUud2hpY2gscj10aGlzLnNlbGVjdGlvblN0YXJ0LG89dGhpcy5zZWxlY3Rpb25FbmQsaT1yIT09bztpZig0ODw9biYmbjw9NTd8fDk2PD1uJiZuPD0xMDV8fDg9PT1ufHw0Nj09PW4pe2Zvcih0PTg9PT1ufHw0Nj09PW4/XCJfXCI6U3RyaW5nLmZyb21DaGFyQ29kZSg5Njw9biYmbjw9MTA1P24tNDg6biksOD09PW4mJnImJiFpJiYoci09MSk7Oyl7dmFyIHM9bS5tYXNrLnN1YnN0cihyLDEpLGQ9cjxtLm1hc2subGVuZ3RoLHU9MDxyO2lmKCEoL1teMC05X10vLnRlc3QocykmJmQmJnUpKWJyZWFrO3IrPTghPT1ufHxpPzE6LTF9aWYoZS5tZXRhS2V5JiYoaT0hKHI9MCkpLGkpe3ZhciBsPW8tcixmPW0ubWFzay5yZXBsYWNlKC9bMC05XS9nLFwiX1wiKSxjPWYuc3Vic3RyKHIsbCkuc3Vic3RyKDEpO2E9YS5zdWJzdHIoMCxyKSsodCtjKSthLnN1YnN0cihyK2wpfWVsc2V7YT1hLnN1YnN0cigwLHIpK3QrYS5zdWJzdHIocisxKX1pZihcIlwiPT09TC50cmltKGEpKWE9ZjtlbHNlIGlmKHI9PT1tLm1hc2subGVuZ3RoKXJldHVybiBlLnByZXZlbnREZWZhdWx0KCksITE7Zm9yKHIrPTg9PT1uPzA6MTsvW14wLTlfXS8udGVzdChtLm1hc2suc3Vic3RyKHIsMSkpJiZyPG0ubWFzay5sZW5ndGgmJjA8cjspcis9OD09PW4/MDoxO2gobS5tYXNrLGEpPyh0aGlzLnZhbHVlPWEsZyh0aGlzLHIpKTpcIlwiPT09TC50cmltKGEpP3RoaXMudmFsdWU9bS5tYXNrLnJlcGxhY2UoL1swLTldL2csXCJfXCIpOk8udHJpZ2dlcihcImVycm9yX2lucHV0Lnhkc29mdFwiKX1lbHNlIGlmKC0xIT09W00sdyxqLEosel0uaW5kZXhPZihuKSYmSXx8LTEhPT1beSxiLHgsdixrLFMscCxULERdLmluZGV4T2YobikpcmV0dXJuITA7cmV0dXJuIGUucHJldmVudERlZmF1bHQoKSwhMX0pKX1GLmZpbmQoXCIueGRzb2Z0X3NlbGVjdFwiKS54ZHNvZnRTY3JvbGxlcihOKS5vbihcInRvdWNoc3RhcnQgbW91c2Vkb3duLnhkc29mdFwiLGZ1bmN0aW9uKGUpe3ZhciB0PWUub3JpZ2luYWxFdmVudDt0aGlzLnRvdWNoTW92ZWQ9ITEsdGhpcy50b3VjaFN0YXJ0UG9zaXRpb249dC50b3VjaGVzP3QudG91Y2hlc1swXTp0LGUuc3RvcFByb3BhZ2F0aW9uKCksZS5wcmV2ZW50RGVmYXVsdCgpfSkub24oXCJ0b3VjaG1vdmVcIixcIi54ZHNvZnRfb3B0aW9uXCIsbCkub24oXCJ0b3VjaGVuZCBtb3VzZWRvd24ueGRzb2Z0XCIsXCIueGRzb2Z0X29wdGlvblwiLGZ1bmN0aW9uKCl7aWYoIXRoaXMudG91Y2hNb3ZlZCl7dm9pZCAwIT09Vy5jdXJyZW50VGltZSYmbnVsbCE9PVcuY3VycmVudFRpbWV8fChXLmN1cnJlbnRUaW1lPVcubm93KCkpO3ZhciBlPVcuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKTtXJiZXLmN1cnJlbnRUaW1lJiZXLmN1cnJlbnRUaW1lW0wodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoXCJ4ZHNvZnRfbW9udGhzZWxlY3RcIik/XCJzZXRNb250aFwiOlwic2V0RnVsbFllYXJcIl0oTCh0aGlzKS5kYXRhKFwidmFsdWVcIikpLEwodGhpcykucGFyZW50KCkucGFyZW50KCkuaGlkZSgpLF8udHJpZ2dlcihcInhjaGFuZ2UueGRzb2Z0XCIpLE4ub25DaGFuZ2VNb250aCYmTC5pc0Z1bmN0aW9uKE4ub25DaGFuZ2VNb250aCkmJk4ub25DaGFuZ2VNb250aC5jYWxsKF8sVy5jdXJyZW50VGltZSxfLmRhdGEoXCJpbnB1dFwiKSksZSE9PVcuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSYmTC5pc0Z1bmN0aW9uKE4ub25DaGFuZ2VZZWFyKSYmTi5vbkNoYW5nZVllYXIuY2FsbChfLFcuY3VycmVudFRpbWUsXy5kYXRhKFwiaW5wdXRcIikpfX0pLF8uZ2V0VmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gVy5nZXRDdXJyZW50VGltZSgpfSxfLnNldE9wdGlvbnM9ZnVuY3Rpb24oZSl7dmFyIGw9e307Tj1MLmV4dGVuZCghMCx7fSxOLGUpLGUuYWxsb3dUaW1lcyYmTC5pc0FycmF5KGUuYWxsb3dUaW1lcykmJmUuYWxsb3dUaW1lcy5sZW5ndGgmJihOLmFsbG93VGltZXM9TC5leHRlbmQoITAsW10sZS5hbGxvd1RpbWVzKSksZS53ZWVrZW5kcyYmTC5pc0FycmF5KGUud2Vla2VuZHMpJiZlLndlZWtlbmRzLmxlbmd0aCYmKE4ud2Vla2VuZHM9TC5leHRlbmQoITAsW10sZS53ZWVrZW5kcykpLGUuYWxsb3dEYXRlcyYmTC5pc0FycmF5KGUuYWxsb3dEYXRlcykmJmUuYWxsb3dEYXRlcy5sZW5ndGgmJihOLmFsbG93RGF0ZXM9TC5leHRlbmQoITAsW10sZS5hbGxvd0RhdGVzKSksZS5hbGxvd0RhdGVSZSYmXCJbb2JqZWN0IFN0cmluZ11cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlLmFsbG93RGF0ZVJlKSYmKE4uYWxsb3dEYXRlUmU9bmV3IFJlZ0V4cChlLmFsbG93RGF0ZVJlKSksZS5oaWdobGlnaHRlZERhdGVzJiZMLmlzQXJyYXkoZS5oaWdobGlnaHRlZERhdGVzKSYmZS5oaWdobGlnaHRlZERhdGVzLmxlbmd0aCYmKEwuZWFjaChlLmhpZ2hsaWdodGVkRGF0ZXMsZnVuY3Rpb24oZSx0KXt2YXIgYSxuPUwubWFwKHQuc3BsaXQoXCIsXCIpLEwudHJpbSkscj1uZXcgbShFLnBhcnNlRGF0ZShuWzBdLE4uZm9ybWF0RGF0ZSksblsxXSxuWzJdKSxvPUUuZm9ybWF0RGF0ZShyLmRhdGUsTi5mb3JtYXREYXRlKTt2b2lkIDAhPT1sW29dPyhhPWxbb10uZGVzYykmJmEubGVuZ3RoJiZyLmRlc2MmJnIuZGVzYy5sZW5ndGgmJihsW29dLmRlc2M9YStcIlxcblwiK3IuZGVzYyk6bFtvXT1yfSksTi5oaWdobGlnaHRlZERhdGVzPUwuZXh0ZW5kKCEwLFtdLGwpKSxlLmhpZ2hsaWdodGVkUGVyaW9kcyYmTC5pc0FycmF5KGUuaGlnaGxpZ2h0ZWRQZXJpb2RzKSYmZS5oaWdobGlnaHRlZFBlcmlvZHMubGVuZ3RoJiYobD1MLmV4dGVuZCghMCxbXSxOLmhpZ2hsaWdodGVkRGF0ZXMpLEwuZWFjaChlLmhpZ2hsaWdodGVkUGVyaW9kcyxmdW5jdGlvbihlLHQpe3ZhciBhLG4scixvLGkscyxkO2lmKEwuaXNBcnJheSh0KSlhPXRbMF0sbj10WzFdLHI9dFsyXSxkPXRbM107ZWxzZXt2YXIgdT1MLm1hcCh0LnNwbGl0KFwiLFwiKSxMLnRyaW0pO2E9RS5wYXJzZURhdGUodVswXSxOLmZvcm1hdERhdGUpLG49RS5wYXJzZURhdGUodVsxXSxOLmZvcm1hdERhdGUpLHI9dVsyXSxkPXVbM119Zm9yKDthPD1uOylvPW5ldyBtKGEscixkKSxpPUUuZm9ybWF0RGF0ZShhLE4uZm9ybWF0RGF0ZSksYS5zZXREYXRlKGEuZ2V0RGF0ZSgpKzEpLHZvaWQgMCE9PWxbaV0/KHM9bFtpXS5kZXNjKSYmcy5sZW5ndGgmJm8uZGVzYyYmby5kZXNjLmxlbmd0aCYmKGxbaV0uZGVzYz1zK1wiXFxuXCIrby5kZXNjKTpsW2ldPW99KSxOLmhpZ2hsaWdodGVkRGF0ZXM9TC5leHRlbmQoITAsW10sbCkpLGUuZGlzYWJsZWREYXRlcyYmTC5pc0FycmF5KGUuZGlzYWJsZWREYXRlcykmJmUuZGlzYWJsZWREYXRlcy5sZW5ndGgmJihOLmRpc2FibGVkRGF0ZXM9TC5leHRlbmQoITAsW10sZS5kaXNhYmxlZERhdGVzKSksZS5kaXNhYmxlZFdlZWtEYXlzJiZMLmlzQXJyYXkoZS5kaXNhYmxlZFdlZWtEYXlzKSYmZS5kaXNhYmxlZFdlZWtEYXlzLmxlbmd0aCYmKE4uZGlzYWJsZWRXZWVrRGF5cz1MLmV4dGVuZCghMCxbXSxlLmRpc2FibGVkV2Vla0RheXMpKSwhTi5vcGVuJiYhTi5vcGVuZWR8fE4uaW5saW5lfHxPLnRyaWdnZXIoXCJvcGVuLnhkc29mdFwiKSxOLmlubGluZSYmKHM9ITAsXy5hZGRDbGFzcyhcInhkc29mdF9pbmxpbmVcIiksTy5hZnRlcihfKS5oaWRlKCkpLE4uaW52ZXJzZUJ1dHRvbiYmKE4ubmV4dD1cInhkc29mdF9wcmV2XCIsTi5wcmV2PVwieGRzb2Z0X25leHRcIiksTi5kYXRlcGlja2VyP2cuYWRkQ2xhc3MoXCJhY3RpdmVcIik6Zy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSxOLnRpbWVwaWNrZXI/by5hZGRDbGFzcyhcImFjdGl2ZVwiKTpvLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLE4udmFsdWUmJihXLnNldEN1cnJlbnRUaW1lKE4udmFsdWUpLE8mJk8udmFsJiZPLnZhbChXLnN0cikpLGlzTmFOKE4uZGF5T2ZXZWVrU3RhcnQpP04uZGF5T2ZXZWVrU3RhcnQ9MDpOLmRheU9mV2Vla1N0YXJ0PXBhcnNlSW50KE4uZGF5T2ZXZWVrU3RhcnQsMTApJTcsTi50aW1lcGlja2VyU2Nyb2xsYmFyfHx1Lnhkc29mdFNjcm9sbGVyKE4sXCJoaWRlXCIpLE4ubWluRGF0ZSYmL15bXFwrXFwtXSguKikkLy50ZXN0KE4ubWluRGF0ZSkmJihOLm1pbkRhdGU9RS5mb3JtYXREYXRlKFcuc3RyVG9EYXRlVGltZShOLm1pbkRhdGUpLE4uZm9ybWF0RGF0ZSkpLE4ubWF4RGF0ZSYmL15bXFwrXFwtXSguKikkLy50ZXN0KE4ubWF4RGF0ZSkmJihOLm1heERhdGU9RS5mb3JtYXREYXRlKFcuc3RyVG9EYXRlVGltZShOLm1heERhdGUpLE4uZm9ybWF0RGF0ZSkpLE4ubWluRGF0ZVRpbWUmJi9eXFwrKC4qKSQvLnRlc3QoTi5taW5EYXRlVGltZSkmJihOLm1pbkRhdGVUaW1lPVcuc3RyVG9EYXRlVGltZShOLm1pbkRhdGVUaW1lKS5kYXRlRm9ybWF0KE4uZm9ybWF0RGF0ZSkpLE4ubWF4RGF0ZVRpbWUmJi9eXFwrKC4qKSQvLnRlc3QoTi5tYXhEYXRlVGltZSkmJihOLm1heERhdGVUaW1lPVcuc3RyVG9EYXRlVGltZShOLm1heERhdGVUaW1lKS5kYXRlRm9ybWF0KE4uZm9ybWF0RGF0ZSkpLGkudG9nZ2xlKE4uc2hvd0FwcGx5QnV0dG9uKSxGLmZpbmQoXCIueGRzb2Z0X3RvZGF5X2J1dHRvblwiKS5jc3MoXCJ2aXNpYmlsaXR5XCIsTi50b2RheUJ1dHRvbj9cInZpc2libGVcIjpcImhpZGRlblwiKSxGLmZpbmQoXCIuXCIrTi5wcmV2KS5jc3MoXCJ2aXNpYmlsaXR5XCIsTi5wcmV2QnV0dG9uP1widmlzaWJsZVwiOlwiaGlkZGVuXCIpLEYuZmluZChcIi5cIitOLm5leHQpLmNzcyhcInZpc2liaWxpdHlcIixOLm5leHRCdXR0b24/XCJ2aXNpYmxlXCI6XCJoaWRkZW5cIiksYyhOKSxOLnZhbGlkYXRlT25CbHVyJiZPLm9mZihcImJsdXIueGRzb2Z0XCIpLm9uKFwiYmx1ci54ZHNvZnRcIixmdW5jdGlvbigpe2lmKE4uYWxsb3dCbGFuayYmKCFMLnRyaW0oTCh0aGlzKS52YWwoKSkubGVuZ3RofHxcInN0cmluZ1wiPT10eXBlb2YgTi5tYXNrJiZMLnRyaW0oTCh0aGlzKS52YWwoKSk9PT1OLm1hc2sucmVwbGFjZSgvWzAtOV0vZyxcIl9cIikpKUwodGhpcykudmFsKG51bGwpLF8uZGF0YShcInhkc29mdF9kYXRldGltZVwiKS5lbXB0eSgpO2Vsc2V7dmFyIGU9RS5wYXJzZURhdGUoTCh0aGlzKS52YWwoKSxOLmZvcm1hdCk7aWYoZSlMKHRoaXMpLnZhbChFLmZvcm1hdERhdGUoZSxOLmZvcm1hdCkpO2Vsc2V7dmFyIHQ9K1tMKHRoaXMpLnZhbCgpWzBdLEwodGhpcykudmFsKClbMV1dLmpvaW4oXCJcIiksYT0rW0wodGhpcykudmFsKClbMl0sTCh0aGlzKS52YWwoKVszXV0uam9pbihcIlwiKTshTi5kYXRlcGlja2VyJiZOLnRpbWVwaWNrZXImJjA8PXQmJnQ8MjQmJjA8PWEmJmE8NjA/TCh0aGlzKS52YWwoW3QsYV0ubWFwKGZ1bmN0aW9uKGUpe3JldHVybiA5PGU/ZTpcIjBcIitlfSkuam9pbihcIjpcIikpOkwodGhpcykudmFsKEUuZm9ybWF0RGF0ZShXLm5vdygpLE4uZm9ybWF0KSl9Xy5kYXRhKFwieGRzb2Z0X2RhdGV0aW1lXCIpLnNldEN1cnJlbnRUaW1lKEwodGhpcykudmFsKCkpfV8udHJpZ2dlcihcImNoYW5nZWRhdGV0aW1lLnhkc29mdFwiKSxfLnRyaWdnZXIoXCJjbG9zZS54ZHNvZnRcIil9KSxOLmRheU9mV2Vla1N0YXJ0UHJldj0wPT09Ti5kYXlPZldlZWtTdGFydD82Ok4uZGF5T2ZXZWVrU3RhcnQtMSxfLnRyaWdnZXIoXCJ4Y2hhbmdlLnhkc29mdFwiKS50cmlnZ2VyKFwiYWZ0ZXJPcGVuLnhkc29mdFwiKX0sXy5kYXRhKFwib3B0aW9uc1wiLE4pLm9uKFwidG91Y2hzdGFydCBtb3VzZWRvd24ueGRzb2Z0XCIsZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCksZS5wcmV2ZW50RGVmYXVsdCgpLEEuaGlkZSgpLFkuaGlkZSgpLCExfSksdS5hcHBlbmQoUCksdS54ZHNvZnRTY3JvbGxlcihOKSxfLm9uKFwiYWZ0ZXJPcGVuLnhkc29mdFwiLGZ1bmN0aW9uKCl7dS54ZHNvZnRTY3JvbGxlcihOKX0pLF8uYXBwZW5kKGcpLmFwcGVuZChvKSwhMCE9PU4ud2l0aG91dENvcHlyaWdodCYmXy5hcHBlbmQoZSksZy5hcHBlbmQoRikuYXBwZW5kKEMpLmFwcGVuZChpKSxOLmluc2lkZVBhcmVudD9MKE8pLnBhcmVudCgpLmFwcGVuZChfKTpMKE4ucGFyZW50SUQpLmFwcGVuZChfKSxXPW5ldyBmdW5jdGlvbigpe3ZhciByPXRoaXM7ci5ub3c9ZnVuY3Rpb24oZSl7dmFyIHQsYSxuPW5ldyBEYXRlO3JldHVybiFlJiZOLmRlZmF1bHREYXRlJiYodD1yLnN0clRvRGF0ZVRpbWUoTi5kZWZhdWx0RGF0ZSksbi5zZXRGdWxsWWVhcih0LmdldEZ1bGxZZWFyKCkpLG4uc2V0TW9udGgodC5nZXRNb250aCgpKSxuLnNldERhdGUodC5nZXREYXRlKCkpKSxuLnNldEZ1bGxZZWFyKG4uZ2V0RnVsbFllYXIoKSksIWUmJk4uZGVmYXVsdFRpbWUmJihhPXIuc3RydG90aW1lKE4uZGVmYXVsdFRpbWUpLG4uc2V0SG91cnMoYS5nZXRIb3VycygpKSxuLnNldE1pbnV0ZXMoYS5nZXRNaW51dGVzKCkpLG4uc2V0U2Vjb25kcyhhLmdldFNlY29uZHMoKSksbi5zZXRNaWxsaXNlY29uZHMoYS5nZXRNaWxsaXNlY29uZHMoKSkpLG59LHIuaXNWYWxpZERhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IERhdGVdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkmJiFpc05hTihlLmdldFRpbWUoKSl9LHIuc2V0Q3VycmVudFRpbWU9ZnVuY3Rpb24oZSx0KXtcInN0cmluZ1wiPT10eXBlb2YgZT9yLmN1cnJlbnRUaW1lPXIuc3RyVG9EYXRlVGltZShlKTpyLmlzVmFsaWREYXRlKGUpP3IuY3VycmVudFRpbWU9ZTplfHx0fHwhTi5hbGxvd0JsYW5rfHxOLmlubGluZT9yLmN1cnJlbnRUaW1lPXIubm93KCk6ci5jdXJyZW50VGltZT1udWxsLF8udHJpZ2dlcihcInhjaGFuZ2UueGRzb2Z0XCIpfSxyLmVtcHR5PWZ1bmN0aW9uKCl7ci5jdXJyZW50VGltZT1udWxsfSxyLmdldEN1cnJlbnRUaW1lPWZ1bmN0aW9uKCl7cmV0dXJuIHIuY3VycmVudFRpbWV9LHIubmV4dE1vbnRoPWZ1bmN0aW9uKCl7dm9pZCAwIT09ci5jdXJyZW50VGltZSYmbnVsbCE9PXIuY3VycmVudFRpbWV8fChyLmN1cnJlbnRUaW1lPXIubm93KCkpO3ZhciBlLHQ9ci5jdXJyZW50VGltZS5nZXRNb250aCgpKzE7cmV0dXJuIDEyPT09dCYmKHIuY3VycmVudFRpbWUuc2V0RnVsbFllYXIoci5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpKzEpLHQ9MCksZT1yLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCksci5jdXJyZW50VGltZS5zZXREYXRlKE1hdGgubWluKG5ldyBEYXRlKHIuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSx0KzEsMCkuZ2V0RGF0ZSgpLHIuY3VycmVudFRpbWUuZ2V0RGF0ZSgpKSksci5jdXJyZW50VGltZS5zZXRNb250aCh0KSxOLm9uQ2hhbmdlTW9udGgmJkwuaXNGdW5jdGlvbihOLm9uQ2hhbmdlTW9udGgpJiZOLm9uQ2hhbmdlTW9udGguY2FsbChfLFcuY3VycmVudFRpbWUsXy5kYXRhKFwiaW5wdXRcIikpLGUhPT1yLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkmJkwuaXNGdW5jdGlvbihOLm9uQ2hhbmdlWWVhcikmJk4ub25DaGFuZ2VZZWFyLmNhbGwoXyxXLmN1cnJlbnRUaW1lLF8uZGF0YShcImlucHV0XCIpKSxfLnRyaWdnZXIoXCJ4Y2hhbmdlLnhkc29mdFwiKSx0fSxyLnByZXZNb250aD1mdW5jdGlvbigpe3ZvaWQgMCE9PXIuY3VycmVudFRpbWUmJm51bGwhPT1yLmN1cnJlbnRUaW1lfHwoci5jdXJyZW50VGltZT1yLm5vdygpKTt2YXIgZT1yLmN1cnJlbnRUaW1lLmdldE1vbnRoKCktMTtyZXR1cm4tMT09PWUmJihyLmN1cnJlbnRUaW1lLnNldEZ1bGxZZWFyKHIuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKS0xKSxlPTExKSxyLmN1cnJlbnRUaW1lLnNldERhdGUoTWF0aC5taW4obmV3IERhdGUoci5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpLGUrMSwwKS5nZXREYXRlKCksci5jdXJyZW50VGltZS5nZXREYXRlKCkpKSxyLmN1cnJlbnRUaW1lLnNldE1vbnRoKGUpLE4ub25DaGFuZ2VNb250aCYmTC5pc0Z1bmN0aW9uKE4ub25DaGFuZ2VNb250aCkmJk4ub25DaGFuZ2VNb250aC5jYWxsKF8sVy5jdXJyZW50VGltZSxfLmRhdGEoXCJpbnB1dFwiKSksXy50cmlnZ2VyKFwieGNoYW5nZS54ZHNvZnRcIiksZX0sci5nZXRXZWVrT2ZZZWFyPWZ1bmN0aW9uKGUpe2lmKE4ub25HZXRXZWVrT2ZZZWFyJiZMLmlzRnVuY3Rpb24oTi5vbkdldFdlZWtPZlllYXIpKXt2YXIgdD1OLm9uR2V0V2Vla09mWWVhci5jYWxsKF8sZSk7aWYodm9pZCAwIT09dClyZXR1cm4gdH12YXIgYT1uZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCksMCwxKTtyZXR1cm4gNCE9PWEuZ2V0RGF5KCkmJmEuc2V0TW9udGgoMCwxKyg0LWEuZ2V0RGF5KCkrNyklNyksTWF0aC5jZWlsKCgoZS1hKS84NjRlNSthLmdldERheSgpKzEpLzcpfSxyLnN0clRvRGF0ZVRpbWU9ZnVuY3Rpb24oZSl7dmFyIHQsYSxuPVtdO3JldHVybiBlJiZlIGluc3RhbmNlb2YgRGF0ZSYmci5pc1ZhbGlkRGF0ZShlKT9lOigobj0vXihbKy1dezF9KSguKikkLy5leGVjKGUpKSYmKG5bMl09RS5wYXJzZURhdGUoblsyXSxOLmZvcm1hdERhdGUpKSxhPW4mJm5bMl0/KHQ9blsyXS5nZXRUaW1lKCktNmU0Km5bMl0uZ2V0VGltZXpvbmVPZmZzZXQoKSxuZXcgRGF0ZShyLm5vdyghMCkuZ2V0VGltZSgpK3BhcnNlSW50KG5bMV0rXCIxXCIsMTApKnQpKTplP0UucGFyc2VEYXRlKGUsTi5mb3JtYXQpOnIubm93KCksci5pc1ZhbGlkRGF0ZShhKXx8KGE9ci5ub3coKSksYSl9LHIuc3RyVG9EYXRlPWZ1bmN0aW9uKGUpe2lmKGUmJmUgaW5zdGFuY2VvZiBEYXRlJiZyLmlzVmFsaWREYXRlKGUpKXJldHVybiBlO3ZhciB0PWU/RS5wYXJzZURhdGUoZSxOLmZvcm1hdERhdGUpOnIubm93KCEwKTtyZXR1cm4gci5pc1ZhbGlkRGF0ZSh0KXx8KHQ9ci5ub3coITApKSx0fSxyLnN0cnRvdGltZT1mdW5jdGlvbihlKXtpZihlJiZlIGluc3RhbmNlb2YgRGF0ZSYmci5pc1ZhbGlkRGF0ZShlKSlyZXR1cm4gZTt2YXIgdD1lP0UucGFyc2VEYXRlKGUsTi5mb3JtYXRUaW1lKTpyLm5vdyghMCk7cmV0dXJuIHIuaXNWYWxpZERhdGUodCl8fCh0PXIubm93KCEwKSksdH0sci5zdHI9ZnVuY3Rpb24oKXt2YXIgZT1OLmZvcm1hdDtyZXR1cm4gTi55ZWFyT2Zmc2V0JiYoZT0oZT1lLnJlcGxhY2UoXCJZXCIsci5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpK04ueWVhck9mZnNldCkpLnJlcGxhY2UoXCJ5XCIsU3RyaW5nKHIuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKStOLnllYXJPZmZzZXQpLnN1YnN0cmluZygyLDQpKSksRS5mb3JtYXREYXRlKHIuY3VycmVudFRpbWUsZSl9LHIuY3VycmVudFRpbWU9dGhpcy5ub3coKX0saS5vbihcInRvdWNoZW5kIGNsaWNrXCIsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpLF8uZGF0YShcImNoYW5nZWRcIiwhMCksVy5zZXRDdXJyZW50VGltZShmKCkpLE8udmFsKFcuc3RyKCkpLF8udHJpZ2dlcihcImNsb3NlLnhkc29mdFwiKX0pLEYuZmluZChcIi54ZHNvZnRfdG9kYXlfYnV0dG9uXCIpLm9uKFwidG91Y2hlbmQgbW91c2Vkb3duLnhkc29mdFwiLGZ1bmN0aW9uKCl7Xy5kYXRhKFwiY2hhbmdlZFwiLCEwKSxXLnNldEN1cnJlbnRUaW1lKDAsITApLF8udHJpZ2dlcihcImFmdGVyT3Blbi54ZHNvZnRcIil9KS5vbihcImRibGNsaWNrLnhkc29mdFwiLGZ1bmN0aW9uKCl7dmFyIGUsdCxhPVcuZ2V0Q3VycmVudFRpbWUoKTthPW5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSxhLmdldE1vbnRoKCksYS5nZXREYXRlKCkpLGU9Vy5zdHJUb0RhdGUoTi5taW5EYXRlKSxhPChlPW5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSxlLmdldE1vbnRoKCksZS5nZXREYXRlKCkpKXx8KHQ9Vy5zdHJUb0RhdGUoTi5tYXhEYXRlKSwodD1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCksdC5nZXRNb250aCgpLHQuZ2V0RGF0ZSgpKSk8YXx8KE8udmFsKFcuc3RyKCkpLE8udHJpZ2dlcihcImNoYW5nZVwiKSxfLnRyaWdnZXIoXCJjbG9zZS54ZHNvZnRcIikpKX0pLEYuZmluZChcIi54ZHNvZnRfcHJldiwueGRzb2Z0X25leHRcIikub24oXCJ0b3VjaGVuZCBtb3VzZWRvd24ueGRzb2Z0XCIsZnVuY3Rpb24oKXt2YXIgYT1MKHRoaXMpLG49MCxyPSExOyFmdW5jdGlvbiBlKHQpe2EuaGFzQ2xhc3MoTi5uZXh0KT9XLm5leHRNb250aCgpOmEuaGFzQ2xhc3MoTi5wcmV2KSYmVy5wcmV2TW9udGgoKSxOLm1vbnRoQ2hhbmdlU3Bpbm5lciYmKHJ8fChuPXNldFRpbWVvdXQoZSx0fHwxMDApKSl9KDUwMCksTChbTi5vd25lckRvY3VtZW50LmJvZHksTi5jb250ZW50V2luZG93XSkub24oXCJ0b3VjaGVuZCBtb3VzZXVwLnhkc29mdFwiLGZ1bmN0aW9uIGUoKXtjbGVhclRpbWVvdXQobikscj0hMCxMKFtOLm93bmVyRG9jdW1lbnQuYm9keSxOLmNvbnRlbnRXaW5kb3ddKS5vZmYoXCJ0b3VjaGVuZCBtb3VzZXVwLnhkc29mdFwiLGUpfSl9KSxvLmZpbmQoXCIueGRzb2Z0X3ByZXYsLnhkc29mdF9uZXh0XCIpLm9uKFwidG91Y2hlbmQgbW91c2Vkb3duLnhkc29mdFwiLGZ1bmN0aW9uKCl7dmFyIG89TCh0aGlzKSxpPTAscz0hMSxkPTExMDshZnVuY3Rpb24gZSh0KXt2YXIgYT11WzBdLmNsaWVudEhlaWdodCxuPVBbMF0ub2Zmc2V0SGVpZ2h0LHI9TWF0aC5hYnMocGFyc2VJbnQoUC5jc3MoXCJtYXJnaW5Ub3BcIiksMTApKTtvLmhhc0NsYXNzKE4ubmV4dCkmJm4tYS1OLnRpbWVIZWlnaHRJblRpbWVQaWNrZXI+PXI/UC5jc3MoXCJtYXJnaW5Ub3BcIixcIi1cIisocitOLnRpbWVIZWlnaHRJblRpbWVQaWNrZXIpK1wicHhcIik6by5oYXNDbGFzcyhOLnByZXYpJiYwPD1yLU4udGltZUhlaWdodEluVGltZVBpY2tlciYmUC5jc3MoXCJtYXJnaW5Ub3BcIixcIi1cIisoci1OLnRpbWVIZWlnaHRJblRpbWVQaWNrZXIpK1wicHhcIiksdS50cmlnZ2VyKFwic2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyXCIsW01hdGguYWJzKHBhcnNlSW50KFBbMF0uc3R5bGUubWFyZ2luVG9wLDEwKS8obi1hKSldKSxkPTEwPGQ/MTA6ZC0xMCxzfHwoaT1zZXRUaW1lb3V0KGUsdHx8ZCkpfSg1MDApLEwoW04ub3duZXJEb2N1bWVudC5ib2R5LE4uY29udGVudFdpbmRvd10pLm9uKFwidG91Y2hlbmQgbW91c2V1cC54ZHNvZnRcIixmdW5jdGlvbiBlKCl7Y2xlYXJUaW1lb3V0KGkpLHM9ITAsTChbTi5vd25lckRvY3VtZW50LmJvZHksTi5jb250ZW50V2luZG93XSkub2ZmKFwidG91Y2hlbmQgbW91c2V1cC54ZHNvZnRcIixlKX0pfSksdD0wLF8ub24oXCJ4Y2hhbmdlLnhkc29mdFwiLGZ1bmN0aW9uKGUpe2NsZWFyVGltZW91dCh0KSx0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT1XLmN1cnJlbnRUaW1lJiZudWxsIT09Vy5jdXJyZW50VGltZXx8KFcuY3VycmVudFRpbWU9Vy5ub3coKSk7Zm9yKHZhciBlLHQsYSxuLHIsbyxpLHMsZCx1LGw9XCJcIixmPW5ldyBEYXRlKFcuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSxXLmN1cnJlbnRUaW1lLmdldE1vbnRoKCksMSwxMiwwLDApLGM9MCxtPVcubm93KCksaD0hMSxnPSExLHA9ITEsRD0hMSx5PVtdLHY9ITAsYj1cIlwiO2YuZ2V0RGF5KCkhPT1OLmRheU9mV2Vla1N0YXJ0OylmLnNldERhdGUoZi5nZXREYXRlKCktMSk7Zm9yKGwrPVwiPHRhYmxlPjx0aGVhZD48dHI+XCIsTi53ZWVrcyYmKGwrPVwiPHRoPjwvdGg+XCIpLGU9MDtlPDc7ZSs9MSlsKz1cIjx0aD5cIitOLmkxOG5bUl0uZGF5T2ZXZWVrU2hvcnRbKGUrTi5kYXlPZldlZWtTdGFydCklN10rXCI8L3RoPlwiO2ZvcihsKz1cIjwvdHI+PC90aGVhZD5cIixsKz1cIjx0Ym9keT5cIiwhMSE9PU4ubWF4RGF0ZSYmKGg9Vy5zdHJUb0RhdGUoTi5tYXhEYXRlKSxoPW5ldyBEYXRlKGguZ2V0RnVsbFllYXIoKSxoLmdldE1vbnRoKCksaC5nZXREYXRlKCksMjMsNTksNTksOTk5KSksITEhPT1OLm1pbkRhdGUmJihnPVcuc3RyVG9EYXRlKE4ubWluRGF0ZSksZz1uZXcgRGF0ZShnLmdldEZ1bGxZZWFyKCksZy5nZXRNb250aCgpLGcuZ2V0RGF0ZSgpKSksITEhPT1OLm1pbkRhdGVUaW1lJiYocD1XLnN0clRvRGF0ZShOLm1pbkRhdGVUaW1lKSxwPW5ldyBEYXRlKHAuZ2V0RnVsbFllYXIoKSxwLmdldE1vbnRoKCkscC5nZXREYXRlKCkscC5nZXRIb3VycygpLHAuZ2V0TWludXRlcygpLHAuZ2V0U2Vjb25kcygpKSksITEhPT1OLm1heERhdGVUaW1lJiYoRD1XLnN0clRvRGF0ZShOLm1heERhdGVUaW1lKSxEPW5ldyBEYXRlKEQuZ2V0RnVsbFllYXIoKSxELmdldE1vbnRoKCksRC5nZXREYXRlKCksRC5nZXRIb3VycygpLEQuZ2V0TWludXRlcygpLEQuZ2V0U2Vjb25kcygpKSksITEhPT1EJiYodT0zMSooMTIqRC5nZXRGdWxsWWVhcigpK0QuZ2V0TW9udGgoKSkrRC5nZXREYXRlKCkpO2M8Vy5jdXJyZW50VGltZS5jb3VudERheXNJbk1vbnRoKCl8fGYuZ2V0RGF5KCkhPT1OLmRheU9mV2Vla1N0YXJ0fHxXLmN1cnJlbnRUaW1lLmdldE1vbnRoKCk9PT1mLmdldE1vbnRoKCk7KXt5PVtdLGMrPTEsYT1mLmdldERheSgpLG49Zi5nZXREYXRlKCkscj1mLmdldEZ1bGxZZWFyKCksTT1mLmdldE1vbnRoKCksbz1XLmdldFdlZWtPZlllYXIoZiksZD1cIlwiLHkucHVzaChcInhkc29mdF9kYXRlXCIpLGk9Ti5iZWZvcmVTaG93RGF5JiZMLmlzRnVuY3Rpb24oTi5iZWZvcmVTaG93RGF5LmNhbGwpP04uYmVmb3JlU2hvd0RheS5jYWxsKF8sZik6bnVsbCxOLmFsbG93RGF0ZVJlJiZcIltvYmplY3QgUmVnRXhwXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKE4uYWxsb3dEYXRlUmUpJiYoTi5hbGxvd0RhdGVSZS50ZXN0KEUuZm9ybWF0RGF0ZShmLE4uZm9ybWF0RGF0ZSkpfHx5LnB1c2goXCJ4ZHNvZnRfZGlzYWJsZWRcIikpLE4uYWxsb3dEYXRlcyYmMDxOLmFsbG93RGF0ZXMubGVuZ3RoJiYtMT09PU4uYWxsb3dEYXRlcy5pbmRleE9mKEUuZm9ybWF0RGF0ZShmLE4uZm9ybWF0RGF0ZSkpJiZ5LnB1c2goXCJ4ZHNvZnRfZGlzYWJsZWRcIik7dmFyIGs9MzEqKDEyKmYuZ2V0RnVsbFllYXIoKStmLmdldE1vbnRoKCkpK2YuZ2V0RGF0ZSgpOyghMSE9PWgmJmg8Znx8ITEhPT1wJiZmPHB8fCExIT09ZyYmZjxnfHwhMSE9PUQmJnU8a3x8aSYmITE9PT1pWzBdKSYmeS5wdXNoKFwieGRzb2Z0X2Rpc2FibGVkXCIpLC0xIT09Ti5kaXNhYmxlZERhdGVzLmluZGV4T2YoRS5mb3JtYXREYXRlKGYsTi5mb3JtYXREYXRlKSkmJnkucHVzaChcInhkc29mdF9kaXNhYmxlZFwiKSwtMSE9PU4uZGlzYWJsZWRXZWVrRGF5cy5pbmRleE9mKGEpJiZ5LnB1c2goXCJ4ZHNvZnRfZGlzYWJsZWRcIiksTy5pcyhcIltkaXNhYmxlZF1cIikmJnkucHVzaChcInhkc29mdF9kaXNhYmxlZFwiKSxpJiZcIlwiIT09aVsxXSYmeS5wdXNoKGlbMV0pLFcuY3VycmVudFRpbWUuZ2V0TW9udGgoKSE9PU0mJnkucHVzaChcInhkc29mdF9vdGhlcl9tb250aFwiKSwoTi5kZWZhdWx0U2VsZWN0fHxfLmRhdGEoXCJjaGFuZ2VkXCIpKSYmRS5mb3JtYXREYXRlKFcuY3VycmVudFRpbWUsTi5mb3JtYXREYXRlKT09PUUuZm9ybWF0RGF0ZShmLE4uZm9ybWF0RGF0ZSkmJnkucHVzaChcInhkc29mdF9jdXJyZW50XCIpLEUuZm9ybWF0RGF0ZShtLE4uZm9ybWF0RGF0ZSk9PT1FLmZvcm1hdERhdGUoZixOLmZvcm1hdERhdGUpJiZ5LnB1c2goXCJ4ZHNvZnRfdG9kYXlcIiksMCE9PWYuZ2V0RGF5KCkmJjYhPT1mLmdldERheSgpJiYtMT09PU4ud2Vla2VuZHMuaW5kZXhPZihFLmZvcm1hdERhdGUoZixOLmZvcm1hdERhdGUpKXx8eS5wdXNoKFwieGRzb2Z0X3dlZWtlbmRcIiksdm9pZCAwIT09Ti5oaWdobGlnaHRlZERhdGVzW0UuZm9ybWF0RGF0ZShmLE4uZm9ybWF0RGF0ZSldJiYodD1OLmhpZ2hsaWdodGVkRGF0ZXNbRS5mb3JtYXREYXRlKGYsTi5mb3JtYXREYXRlKV0seS5wdXNoKHZvaWQgMD09PXQuc3R5bGU/XCJ4ZHNvZnRfaGlnaGxpZ2h0ZWRfZGVmYXVsdFwiOnQuc3R5bGUpLGQ9dm9pZCAwPT09dC5kZXNjP1wiXCI6dC5kZXNjKSxOLmJlZm9yZVNob3dEYXkmJkwuaXNGdW5jdGlvbihOLmJlZm9yZVNob3dEYXkpJiZ5LnB1c2goTi5iZWZvcmVTaG93RGF5KGYpKSx2JiYobCs9XCI8dHI+XCIsdj0hMSxOLndlZWtzJiYobCs9XCI8dGg+XCIrbytcIjwvdGg+XCIpKSxsKz0nPHRkIGRhdGEtZGF0ZT1cIicrbisnXCIgZGF0YS1tb250aD1cIicrTSsnXCIgZGF0YS15ZWFyPVwiJytyKydcIiBjbGFzcz1cInhkc29mdF9kYXRlIHhkc29mdF9kYXlfb2Zfd2VlaycrZi5nZXREYXkoKStcIiBcIit5LmpvaW4oXCIgXCIpKydcIiB0aXRsZT1cIicrZCsnXCI+PGRpdj4nK24rXCI8L2Rpdj48L3RkPlwiLGYuZ2V0RGF5KCk9PT1OLmRheU9mV2Vla1N0YXJ0UHJldiYmKGwrPVwiPC90cj5cIix2PSEwKSxmLnNldERhdGUobisxKX1sKz1cIjwvdGJvZHk+PC90YWJsZT5cIixDLmh0bWwobCksRi5maW5kKFwiLnhkc29mdF9sYWJlbCBzcGFuXCIpLmVxKDApLnRleHQoTi5pMThuW1JdLm1vbnRoc1tXLmN1cnJlbnRUaW1lLmdldE1vbnRoKCldKSxGLmZpbmQoXCIueGRzb2Z0X2xhYmVsIHNwYW5cIikuZXEoMSkudGV4dChXLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkrTi55ZWFyT2Zmc2V0KSxNPWI9XCJcIjt2YXIgeD0wO2lmKCExIT09Ti5taW5UaW1lKXt2YXIgVD1XLnN0cnRvdGltZShOLm1pblRpbWUpO3g9NjAqVC5nZXRIb3VycygpK1QuZ2V0TWludXRlcygpfXZhciBTPTE0NDA7aWYoITEhPT1OLm1heFRpbWUpe1Q9Vy5zdHJ0b3RpbWUoTi5tYXhUaW1lKTtTPTYwKlQuZ2V0SG91cnMoKStULmdldE1pbnV0ZXMoKX1pZighMSE9PU4ubWluRGF0ZVRpbWUpe1Q9Vy5zdHJUb0RhdGVUaW1lKE4ubWluRGF0ZVRpbWUpO2lmKEUuZm9ybWF0RGF0ZShXLmN1cnJlbnRUaW1lLE4uZm9ybWF0RGF0ZSk9PT1FLmZvcm1hdERhdGUoVCxOLmZvcm1hdERhdGUpKXt2YXIgTT02MCpULmdldEhvdXJzKCkrVC5nZXRNaW51dGVzKCk7eDxNJiYoeD1NKX19aWYoITEhPT1OLm1heERhdGVUaW1lKXtUPVcuc3RyVG9EYXRlVGltZShOLm1heERhdGVUaW1lKTtpZihFLmZvcm1hdERhdGUoVy5jdXJyZW50VGltZSxOLmZvcm1hdERhdGUpPT09RS5mb3JtYXREYXRlKFQsTi5mb3JtYXREYXRlKSkoTT02MCpULmdldEhvdXJzKCkrVC5nZXRNaW51dGVzKCkpPFMmJihTPU0pfWlmKHM9ZnVuY3Rpb24oZSx0KXt2YXIgYSxuPVcubm93KCkscj1OLmFsbG93VGltZXMmJkwuaXNBcnJheShOLmFsbG93VGltZXMpJiZOLmFsbG93VGltZXMubGVuZ3RoO24uc2V0SG91cnMoZSksZT1wYXJzZUludChuLmdldEhvdXJzKCksMTApLG4uc2V0TWludXRlcyh0KSx0PXBhcnNlSW50KG4uZ2V0TWludXRlcygpLDEwKSx5PVtdO3ZhciBvPTYwKmUrdDsoTy5pcyhcIltkaXNhYmxlZF1cIil8fFM8PW98fG88eCkmJnkucHVzaChcInhkc29mdF9kaXNhYmxlZFwiKSwoYT1uZXcgRGF0ZShXLmN1cnJlbnRUaW1lKSkuc2V0SG91cnMocGFyc2VJbnQoVy5jdXJyZW50VGltZS5nZXRIb3VycygpLDEwKSkscnx8YS5zZXRNaW51dGVzKE1hdGhbTi5yb3VuZFRpbWVdKFcuY3VycmVudFRpbWUuZ2V0TWludXRlcygpL04uc3RlcCkqTi5zdGVwKSwoTi5pbml0VGltZXx8Ti5kZWZhdWx0U2VsZWN0fHxfLmRhdGEoXCJjaGFuZ2VkXCIpKSYmYS5nZXRIb3VycygpPT09cGFyc2VJbnQoZSwxMCkmJighciYmNTk8Ti5zdGVwfHxhLmdldE1pbnV0ZXMoKT09PXBhcnNlSW50KHQsMTApKSYmKE4uZGVmYXVsdFNlbGVjdHx8Xy5kYXRhKFwiY2hhbmdlZFwiKT95LnB1c2goXCJ4ZHNvZnRfY3VycmVudFwiKTpOLmluaXRUaW1lJiZ5LnB1c2goXCJ4ZHNvZnRfaW5pdF90aW1lXCIpKSxwYXJzZUludChtLmdldEhvdXJzKCksMTApPT09cGFyc2VJbnQoZSwxMCkmJnBhcnNlSW50KG0uZ2V0TWludXRlcygpLDEwKT09PXBhcnNlSW50KHQsMTApJiZ5LnB1c2goXCJ4ZHNvZnRfdG9kYXlcIiksYis9JzxkaXYgY2xhc3M9XCJ4ZHNvZnRfdGltZSAnK3kuam9pbihcIiBcIikrJ1wiIGRhdGEtaG91cj1cIicrZSsnXCIgZGF0YS1taW51dGU9XCInK3QrJ1wiPicrRS5mb3JtYXREYXRlKG4sTi5mb3JtYXRUaW1lKStcIjwvZGl2PlwifSxOLmFsbG93VGltZXMmJkwuaXNBcnJheShOLmFsbG93VGltZXMpJiZOLmFsbG93VGltZXMubGVuZ3RoKWZvcihjPTA7YzxOLmFsbG93VGltZXMubGVuZ3RoO2MrPTEpcyhXLnN0cnRvdGltZShOLmFsbG93VGltZXNbY10pLmdldEhvdXJzKCksTT1XLnN0cnRvdGltZShOLmFsbG93VGltZXNbY10pLmdldE1pbnV0ZXMoKSk7ZWxzZSBmb3IoZT1jPTA7YzwoTi5ob3VyczEyPzEyOjI0KTtjKz0xKWZvcihlPTA7ZTw2MDtlKz1OLnN0ZXApe3ZhciB3PTYwKmMrZTt3PHh8fChTPD13fHxzKChjPDEwP1wiMFwiOlwiXCIpK2MsTT0oZTwxMD9cIjBcIjpcIlwiKStlKSl9Zm9yKFAuaHRtbChiKSxIPVwiXCIsYz1wYXJzZUludChOLnllYXJTdGFydCwxMCk7Yzw9cGFyc2VJbnQoTi55ZWFyRW5kLDEwKTtjKz0xKUgrPSc8ZGl2IGNsYXNzPVwieGRzb2Z0X29wdGlvbiAnKyhXLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCk9PT1jP1wieGRzb2Z0X2N1cnJlbnRcIjpcIlwiKSsnXCIgZGF0YS12YWx1ZT1cIicrYysnXCI+JysoYytOLnllYXJPZmZzZXQpK1wiPC9kaXY+XCI7Zm9yKEEuY2hpbGRyZW4oKS5lcSgwKS5odG1sKEgpLGM9cGFyc2VJbnQoTi5tb250aFN0YXJ0LDEwKSxIPVwiXCI7Yzw9cGFyc2VJbnQoTi5tb250aEVuZCwxMCk7Yys9MSlIKz0nPGRpdiBjbGFzcz1cInhkc29mdF9vcHRpb24gJysoVy5jdXJyZW50VGltZS5nZXRNb250aCgpPT09Yz9cInhkc29mdF9jdXJyZW50XCI6XCJcIikrJ1wiIGRhdGEtdmFsdWU9XCInK2MrJ1wiPicrTi5pMThuW1JdLm1vbnRoc1tjXStcIjwvZGl2PlwiO1kuY2hpbGRyZW4oKS5lcSgwKS5odG1sKEgpLEwoXykudHJpZ2dlcihcImdlbmVyYXRlLnhkc29mdFwiKX0sMTApLGUuc3RvcFByb3BhZ2F0aW9uKCl9KS5vbihcImFmdGVyT3Blbi54ZHNvZnRcIixmdW5jdGlvbigpe3ZhciBlLHQsYSxuO04udGltZXBpY2tlciYmKFAuZmluZChcIi54ZHNvZnRfY3VycmVudFwiKS5sZW5ndGg/ZT1cIi54ZHNvZnRfY3VycmVudFwiOlAuZmluZChcIi54ZHNvZnRfaW5pdF90aW1lXCIpLmxlbmd0aCYmKGU9XCIueGRzb2Z0X2luaXRfdGltZVwiKSxlPyh0PXVbMF0uY2xpZW50SGVpZ2h0LChhPVBbMF0ub2Zmc2V0SGVpZ2h0KS10PChuPVAuZmluZChlKS5pbmRleCgpKk4udGltZUhlaWdodEluVGltZVBpY2tlcisxKSYmKG49YS10KSx1LnRyaWdnZXIoXCJzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXJcIixbcGFyc2VJbnQobiwxMCkvKGEtdCldKSk6dS50cmlnZ2VyKFwic2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyXCIsWzBdKSl9KSxuPTAsQy5vbihcInRvdWNoZW5kIGNsaWNrLnhkc29mdFwiLFwidGRcIixmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpLG4rPTE7dmFyIHQ9TCh0aGlzKSxhPVcuY3VycmVudFRpbWU7aWYobnVsbD09YSYmKFcuY3VycmVudFRpbWU9Vy5ub3coKSxhPVcuY3VycmVudFRpbWUpLHQuaGFzQ2xhc3MoXCJ4ZHNvZnRfZGlzYWJsZWRcIikpcmV0dXJuITE7YS5zZXREYXRlKDEpLGEuc2V0RnVsbFllYXIodC5kYXRhKFwieWVhclwiKSksYS5zZXRNb250aCh0LmRhdGEoXCJtb250aFwiKSksYS5zZXREYXRlKHQuZGF0YShcImRhdGVcIikpLF8udHJpZ2dlcihcInNlbGVjdC54ZHNvZnRcIixbYV0pLE8udmFsKFcuc3RyKCkpLE4ub25TZWxlY3REYXRlJiZMLmlzRnVuY3Rpb24oTi5vblNlbGVjdERhdGUpJiZOLm9uU2VsZWN0RGF0ZS5jYWxsKF8sVy5jdXJyZW50VGltZSxfLmRhdGEoXCJpbnB1dFwiKSxlKSxfLmRhdGEoXCJjaGFuZ2VkXCIsITApLF8udHJpZ2dlcihcInhjaGFuZ2UueGRzb2Z0XCIpLF8udHJpZ2dlcihcImNoYW5nZWRhdGV0aW1lLnhkc29mdFwiKSwoMTxufHwhMD09PU4uY2xvc2VPbkRhdGVTZWxlY3R8fCExPT09Ti5jbG9zZU9uRGF0ZVNlbGVjdCYmIU4udGltZXBpY2tlcikmJiFOLmlubGluZSYmXy50cmlnZ2VyKFwiY2xvc2UueGRzb2Z0XCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtuPTB9LDIwMCl9KSxQLm9uKFwidG91Y2hzdGFydFwiLFwiZGl2XCIsZnVuY3Rpb24oZSl7dGhpcy50b3VjaE1vdmVkPSExfSkub24oXCJ0b3VjaG1vdmVcIixcImRpdlwiLGwpLm9uKFwidG91Y2hlbmQgY2xpY2sueGRzb2Z0XCIsXCJkaXZcIixmdW5jdGlvbihlKXtpZighdGhpcy50b3VjaE1vdmVkKXtlLnN0b3BQcm9wYWdhdGlvbigpO3ZhciB0PUwodGhpcyksYT1XLmN1cnJlbnRUaW1lO2lmKG51bGw9PWEmJihXLmN1cnJlbnRUaW1lPVcubm93KCksYT1XLmN1cnJlbnRUaW1lKSx0Lmhhc0NsYXNzKFwieGRzb2Z0X2Rpc2FibGVkXCIpKXJldHVybiExO2Euc2V0SG91cnModC5kYXRhKFwiaG91clwiKSksYS5zZXRNaW51dGVzKHQuZGF0YShcIm1pbnV0ZVwiKSksXy50cmlnZ2VyKFwic2VsZWN0Lnhkc29mdFwiLFthXSksXy5kYXRhKFwiaW5wdXRcIikudmFsKFcuc3RyKCkpLE4ub25TZWxlY3RUaW1lJiZMLmlzRnVuY3Rpb24oTi5vblNlbGVjdFRpbWUpJiZOLm9uU2VsZWN0VGltZS5jYWxsKF8sVy5jdXJyZW50VGltZSxfLmRhdGEoXCJpbnB1dFwiKSxlKSxfLmRhdGEoXCJjaGFuZ2VkXCIsITApLF8udHJpZ2dlcihcInhjaGFuZ2UueGRzb2Z0XCIpLF8udHJpZ2dlcihcImNoYW5nZWRhdGV0aW1lLnhkc29mdFwiKSwhMCE9PU4uaW5saW5lJiYhMD09PU4uY2xvc2VPblRpbWVTZWxlY3QmJl8udHJpZ2dlcihcImNsb3NlLnhkc29mdFwiKX19KSxnLm9uKFwibW91c2V3aGVlbC54ZHNvZnRcIixmdW5jdGlvbihlKXtyZXR1cm4hTi5zY3JvbGxNb250aHx8KGUuZGVsdGFZPDA/Vy5uZXh0TW9udGgoKTpXLnByZXZNb250aCgpLCExKX0pLE8ub24oXCJtb3VzZXdoZWVsLnhkc29mdFwiLGZ1bmN0aW9uKGUpe3JldHVybiFOLnNjcm9sbElucHV0fHwoIU4uZGF0ZXBpY2tlciYmTi50aW1lcGlja2VyPygwPD0oYT1QLmZpbmQoXCIueGRzb2Z0X2N1cnJlbnRcIikubGVuZ3RoP1AuZmluZChcIi54ZHNvZnRfY3VycmVudFwiKS5lcSgwKS5pbmRleCgpOjApK2UuZGVsdGFZJiZhK2UuZGVsdGFZPFAuY2hpbGRyZW4oKS5sZW5ndGgmJihhKz1lLmRlbHRhWSksUC5jaGlsZHJlbigpLmVxKGEpLmxlbmd0aCYmUC5jaGlsZHJlbigpLmVxKGEpLnRyaWdnZXIoXCJtb3VzZWRvd25cIiksITEpOk4uZGF0ZXBpY2tlciYmIU4udGltZXBpY2tlcj8oZy50cmlnZ2VyKGUsW2UuZGVsdGFZLGUuZGVsdGFYLGUuZGVsdGFZXSksTy52YWwmJk8udmFsKFcuc3RyKCkpLF8udHJpZ2dlcihcImNoYW5nZWRhdGV0aW1lLnhkc29mdFwiKSwhMSk6dm9pZCAwKX0pLF8ub24oXCJjaGFuZ2VkYXRldGltZS54ZHNvZnRcIixmdW5jdGlvbihlKXtpZihOLm9uQ2hhbmdlRGF0ZVRpbWUmJkwuaXNGdW5jdGlvbihOLm9uQ2hhbmdlRGF0ZVRpbWUpKXt2YXIgdD1fLmRhdGEoXCJpbnB1dFwiKTtOLm9uQ2hhbmdlRGF0ZVRpbWUuY2FsbChfLFcuY3VycmVudFRpbWUsdCxlKSxkZWxldGUgTi52YWx1ZSx0LnRyaWdnZXIoXCJjaGFuZ2VcIil9fSkub24oXCJnZW5lcmF0ZS54ZHNvZnRcIixmdW5jdGlvbigpe04ub25HZW5lcmF0ZSYmTC5pc0Z1bmN0aW9uKE4ub25HZW5lcmF0ZSkmJk4ub25HZW5lcmF0ZS5jYWxsKF8sVy5jdXJyZW50VGltZSxfLmRhdGEoXCJpbnB1dFwiKSkscyYmKF8udHJpZ2dlcihcImFmdGVyT3Blbi54ZHNvZnRcIikscz0hMSl9KS5vbihcImNsaWNrLnhkc29mdFwiLGZ1bmN0aW9uKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCl9KSxhPTAsaD1mdW5jdGlvbihlLHQpe2Rve2lmKCEoZT1lLnBhcmVudE5vZGUpfHwhMT09PXQoZSkpYnJlYWt9d2hpbGUoXCJIVE1MXCIhPT1lLm5vZGVOYW1lKX0scj1mdW5jdGlvbigpe3ZhciBlLHQsYSxuLHIsbyxpLHMsZCx1LGwsZixjO2lmKGU9KHM9Xy5kYXRhKFwiaW5wdXRcIikpLm9mZnNldCgpLHQ9c1swXSx1PVwidG9wXCIsYT1lLnRvcCt0Lm9mZnNldEhlaWdodC0xLG49ZS5sZWZ0LHI9XCJhYnNvbHV0ZVwiLGQ9TChOLmNvbnRlbnRXaW5kb3cpLndpZHRoKCksZj1MKE4uY29udGVudFdpbmRvdykuaGVpZ2h0KCksYz1MKE4uY29udGVudFdpbmRvdykuc2Nyb2xsVG9wKCksTi5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aC1lLmxlZnQ8Zy5wYXJlbnQoKS5vdXRlcldpZHRoKCEwKSl7dmFyIG09Zy5wYXJlbnQoKS5vdXRlcldpZHRoKCEwKS10Lm9mZnNldFdpZHRoO24tPW19XCJydGxcIj09PXMucGFyZW50KCkuY3NzKFwiZGlyZWN0aW9uXCIpJiYobi09Xy5vdXRlcldpZHRoKCktcy5vdXRlcldpZHRoKCkpLE4uZml4ZWQ/KGEtPWMsbi09TChOLmNvbnRlbnRXaW5kb3cpLnNjcm9sbExlZnQoKSxyPVwiZml4ZWRcIik6KGk9ITEsaCh0LGZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT09ZSYmKFwiZml4ZWRcIj09PU4uY29udGVudFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGUpLmdldFByb3BlcnR5VmFsdWUoXCJwb3NpdGlvblwiKT8hKGk9ITApOnZvaWQgMCl9KSxpJiYhTi5pbnNpZGVQYXJlbnQ/KHI9XCJmaXhlZFwiLGErXy5vdXRlckhlaWdodCgpPmYrYz8odT1cImJvdHRvbVwiLGE9ZitjLWUudG9wKTphLT1jKTphK19bMF0ub2Zmc2V0SGVpZ2h0PmYrYyYmKGE9ZS50b3AtX1swXS5vZmZzZXRIZWlnaHQrMSksYTwwJiYoYT0wKSxuK3Qub2Zmc2V0V2lkdGg+ZCYmKG49ZC10Lm9mZnNldFdpZHRoKSksbz1fWzBdLGgobyxmdW5jdGlvbihlKXtpZihcInJlbGF0aXZlXCI9PT1OLmNvbnRlbnRXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlKS5nZXRQcm9wZXJ0eVZhbHVlKFwicG9zaXRpb25cIikmJmQ+PWUub2Zmc2V0V2lkdGgpcmV0dXJuIG4tPShkLWUub2Zmc2V0V2lkdGgpLzIsITF9KSxsPXtwb3NpdGlvbjpyLGxlZnQ6Ti5pbnNpZGVQYXJlbnQ/dC5vZmZzZXRMZWZ0Om4sdG9wOlwiXCIsYm90dG9tOlwiXCJ9LE4uaW5zaWRlUGFyZW50P2xbdV09dC5vZmZzZXRUb3ArdC5vZmZzZXRIZWlnaHQ6bFt1XT1hLF8uY3NzKGwpfSxfLm9uKFwib3Blbi54ZHNvZnRcIixmdW5jdGlvbihlKXt2YXIgdD0hMDtOLm9uU2hvdyYmTC5pc0Z1bmN0aW9uKE4ub25TaG93KSYmKHQ9Ti5vblNob3cuY2FsbChfLFcuY3VycmVudFRpbWUsXy5kYXRhKFwiaW5wdXRcIiksZSkpLCExIT09dCYmKF8uc2hvdygpLHIoKSxMKE4uY29udGVudFdpbmRvdykub2ZmKFwicmVzaXplLnhkc29mdFwiLHIpLm9uKFwicmVzaXplLnhkc29mdFwiLHIpLE4uY2xvc2VPbldpdGhvdXRDbGljayYmTChbTi5vd25lckRvY3VtZW50LmJvZHksTi5jb250ZW50V2luZG93XSkub24oXCJ0b3VjaHN0YXJ0IG1vdXNlZG93bi54ZHNvZnRcIixmdW5jdGlvbiBlKCl7Xy50cmlnZ2VyKFwiY2xvc2UueGRzb2Z0XCIpLEwoW04ub3duZXJEb2N1bWVudC5ib2R5LE4uY29udGVudFdpbmRvd10pLm9mZihcInRvdWNoc3RhcnQgbW91c2Vkb3duLnhkc29mdFwiLGUpfSkpfSkub24oXCJjbG9zZS54ZHNvZnRcIixmdW5jdGlvbihlKXt2YXIgdD0hMDtGLmZpbmQoXCIueGRzb2Z0X21vbnRoLC54ZHNvZnRfeWVhclwiKS5maW5kKFwiLnhkc29mdF9zZWxlY3RcIikuaGlkZSgpLE4ub25DbG9zZSYmTC5pc0Z1bmN0aW9uKE4ub25DbG9zZSkmJih0PU4ub25DbG9zZS5jYWxsKF8sVy5jdXJyZW50VGltZSxfLmRhdGEoXCJpbnB1dFwiKSxlKSksITE9PT10fHxOLm9wZW5lZHx8Ti5pbmxpbmV8fF8uaGlkZSgpLGUuc3RvcFByb3BhZ2F0aW9uKCl9KS5vbihcInRvZ2dsZS54ZHNvZnRcIixmdW5jdGlvbigpe18uaXMoXCI6dmlzaWJsZVwiKT9fLnRyaWdnZXIoXCJjbG9zZS54ZHNvZnRcIik6Xy50cmlnZ2VyKFwib3Blbi54ZHNvZnRcIil9KS5kYXRhKFwiaW5wdXRcIixPKSxkPTAsXy5kYXRhKFwieGRzb2Z0X2RhdGV0aW1lXCIsVyksXy5zZXRPcHRpb25zKE4pLFcuc2V0Q3VycmVudFRpbWUoZigpKSxPLmRhdGEoXCJ4ZHNvZnRfZGF0ZXRpbWVwaWNrZXJcIixfKS5vbihcIm9wZW4ueGRzb2Z0IGZvY3VzaW4ueGRzb2Z0IG1vdXNlZG93bi54ZHNvZnQgdG91Y2hzdGFydFwiLGZ1bmN0aW9uKCl7Ty5pcyhcIjpkaXNhYmxlZFwiKXx8Ty5kYXRhKFwieGRzb2Z0X2RhdGV0aW1lcGlja2VyXCIpLmlzKFwiOnZpc2libGVcIikmJk4uY2xvc2VPbklucHV0Q2xpY2t8fE4ub3Blbk9uRm9jdXMmJihjbGVhclRpbWVvdXQoZCksZD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Ty5pcyhcIjpkaXNhYmxlZFwiKXx8KHM9ITAsVy5zZXRDdXJyZW50VGltZShmKCksITApLE4ubWFzayYmYyhOKSxfLnRyaWdnZXIoXCJvcGVuLnhkc29mdFwiKSl9LDEwMCkpfSkub24oXCJrZXlkb3duLnhkc29mdFwiLGZ1bmN0aW9uKGUpe3ZhciB0LGE9ZS53aGljaDtyZXR1cm4tMSE9PVtEXS5pbmRleE9mKGEpJiZOLmVudGVyTGlrZVRhYj8odD1MKFwiaW5wdXQ6dmlzaWJsZSx0ZXh0YXJlYTp2aXNpYmxlLGJ1dHRvbjp2aXNpYmxlLGE6dmlzaWJsZVwiKSxfLnRyaWdnZXIoXCJjbG9zZS54ZHNvZnRcIiksdC5lcSh0LmluZGV4KHRoaXMpKzEpLmZvY3VzKCksITEpOi0xIT09W1RdLmluZGV4T2YoYSk/KF8udHJpZ2dlcihcImNsb3NlLnhkc29mdFwiKSwhMCk6dm9pZCAwfSkub24oXCJibHVyLnhkc29mdFwiLGZ1bmN0aW9uKCl7Xy50cmlnZ2VyKFwiY2xvc2UueGRzb2Z0XCIpfSl9LHI9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRhKFwieGRzb2Z0X2RhdGV0aW1lcGlja2VyXCIpO3QmJih0LmRhdGEoXCJ4ZHNvZnRfZGF0ZXRpbWVcIixudWxsKSx0LnJlbW92ZSgpLGUuZGF0YShcInhkc29mdF9kYXRldGltZXBpY2tlclwiLG51bGwpLm9mZihcIi54ZHNvZnRcIiksTChOLmNvbnRlbnRXaW5kb3cpLm9mZihcInJlc2l6ZS54ZHNvZnRcIiksTChbTi5jb250ZW50V2luZG93LE4ub3duZXJEb2N1bWVudC5ib2R5XSkub2ZmKFwibW91c2Vkb3duLnhkc29mdCB0b3VjaHN0YXJ0XCIpLGUudW5tb3VzZXdoZWVsJiZlLnVubW91c2V3aGVlbCgpKX0sTChOLm93bmVyRG9jdW1lbnQpLm9mZihcImtleWRvd24ueGRzb2Z0Y3RybCBrZXl1cC54ZHNvZnRjdHJsXCIpLm9mZihcImtleWRvd24ueGRzb2Z0Y21kIGtleXVwLnhkc29mdGNtZFwiKS5vbihcImtleWRvd24ueGRzb2Z0Y3RybFwiLGZ1bmN0aW9uKGUpe2Uua2V5Q29kZT09PXAmJihJPSEwKX0pLm9uKFwia2V5dXAueGRzb2Z0Y3RybFwiLGZ1bmN0aW9uKGUpe2Uua2V5Q29kZT09PXAmJihJPSExKX0pLm9uKFwia2V5ZG93bi54ZHNvZnRjbWRcIixmdW5jdGlvbihlKXs5MT09PWUua2V5Q29kZSYmITB9KS5vbihcImtleXVwLnhkc29mdGNtZFwiLGZ1bmN0aW9uKGUpezkxPT09ZS5rZXlDb2RlJiYhMX0pLHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciB0LGU9TCh0aGlzKS5kYXRhKFwieGRzb2Z0X2RhdGV0aW1lcGlja2VyXCIpO2lmKGUpe2lmKFwic3RyaW5nXCI9PT1MLnR5cGUoSCkpc3dpdGNoKEgpe2Nhc2VcInNob3dcIjpMKHRoaXMpLnNlbGVjdCgpLmZvY3VzKCksZS50cmlnZ2VyKFwib3Blbi54ZHNvZnRcIik7YnJlYWs7Y2FzZVwiaGlkZVwiOmUudHJpZ2dlcihcImNsb3NlLnhkc29mdFwiKTticmVhaztjYXNlXCJ0b2dnbGVcIjplLnRyaWdnZXIoXCJ0b2dnbGUueGRzb2Z0XCIpO2JyZWFrO2Nhc2VcImRlc3Ryb3lcIjpyKEwodGhpcykpO2JyZWFrO2Nhc2VcInJlc2V0XCI6dGhpcy52YWx1ZT10aGlzLmRlZmF1bHRWYWx1ZSx0aGlzLnZhbHVlJiZlLmRhdGEoXCJ4ZHNvZnRfZGF0ZXRpbWVcIikuaXNWYWxpZERhdGUoRS5wYXJzZURhdGUodGhpcy52YWx1ZSxOLmZvcm1hdCkpfHxlLmRhdGEoXCJjaGFuZ2VkXCIsITEpLGUuZGF0YShcInhkc29mdF9kYXRldGltZVwiKS5zZXRDdXJyZW50VGltZSh0aGlzLnZhbHVlKTticmVhaztjYXNlXCJ2YWxpZGF0ZVwiOmUuZGF0YShcImlucHV0XCIpLnRyaWdnZXIoXCJibHVyLnhkc29mdFwiKTticmVhaztkZWZhdWx0OmVbSF0mJkwuaXNGdW5jdGlvbihlW0hdKSYmKG89ZVtIXShhKSl9ZWxzZSBlLnNldE9wdGlvbnMoSCk7cmV0dXJuIDB9XCJzdHJpbmdcIiE9PUwudHlwZShIKSYmKCFOLmxhenlJbml0fHxOLm9wZW58fE4uaW5saW5lP24oTCh0aGlzKSk6KHQ9TCh0aGlzKSkub24oXCJvcGVuLnhkc29mdCBmb2N1c2luLnhkc29mdCBtb3VzZWRvd24ueGRzb2Z0IHRvdWNoc3RhcnRcIixmdW5jdGlvbiBlKCl7dC5pcyhcIjpkaXNhYmxlZFwiKXx8dC5kYXRhKFwieGRzb2Z0X2RhdGV0aW1lcGlja2VyXCIpfHwoY2xlYXJUaW1lb3V0KGkpLGk9c2V0VGltZW91dChmdW5jdGlvbigpe3QuZGF0YShcInhkc29mdF9kYXRldGltZXBpY2tlclwiKXx8bih0KSx0Lm9mZihcIm9wZW4ueGRzb2Z0IGZvY3VzaW4ueGRzb2Z0IG1vdXNlZG93bi54ZHNvZnQgdG91Y2hzdGFydFwiLGUpLnRyaWdnZXIoXCJvcGVuLnhkc29mdFwiKX0sMTAwKSl9KSl9KSxvfSxMLmZuLmRhdGV0aW1lcGlja2VyLmRlZmF1bHRzPXN9OyFmdW5jdGlvbihlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImpxdWVyeVwiLFwianF1ZXJ5LW1vdXNld2hlZWxcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwianF1ZXJ5XCIpKTplKGpRdWVyeSl9KGRhdGV0aW1lcGlja2VyRmFjdG9yeSksZnVuY3Rpb24oZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJqcXVlcnlcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZTplKGpRdWVyeSl9KGZ1bmN0aW9uKGMpe3ZhciBtLGgsZT1bXCJ3aGVlbFwiLFwibW91c2V3aGVlbFwiLFwiRE9NTW91c2VTY3JvbGxcIixcIk1vek1vdXNlUGl4ZWxTY3JvbGxcIl0sdD1cIm9ud2hlZWxcImluIGRvY3VtZW50fHw5PD1kb2N1bWVudC5kb2N1bWVudE1vZGU/W1wid2hlZWxcIl06W1wibW91c2V3aGVlbFwiLFwiRG9tTW91c2VTY3JvbGxcIixcIk1vek1vdXNlUGl4ZWxTY3JvbGxcIl0sZz1BcnJheS5wcm90b3R5cGUuc2xpY2U7aWYoYy5ldmVudC5maXhIb29rcylmb3IodmFyIGE9ZS5sZW5ndGg7YTspYy5ldmVudC5maXhIb29rc1tlWy0tYV1dPWMuZXZlbnQubW91c2VIb29rczt2YXIgcD1jLmV2ZW50LnNwZWNpYWwubW91c2V3aGVlbD17dmVyc2lvbjpcIjMuMS4xMlwiLHNldHVwOmZ1bmN0aW9uKCl7aWYodGhpcy5hZGRFdmVudExpc3RlbmVyKWZvcih2YXIgZT10Lmxlbmd0aDtlOyl0aGlzLmFkZEV2ZW50TGlzdGVuZXIodFstLWVdLG4sITEpO2Vsc2UgdGhpcy5vbm1vdXNld2hlZWw9bjtjLmRhdGEodGhpcyxcIm1vdXNld2hlZWwtbGluZS1oZWlnaHRcIixwLmdldExpbmVIZWlnaHQodGhpcykpLGMuZGF0YSh0aGlzLFwibW91c2V3aGVlbC1wYWdlLWhlaWdodFwiLHAuZ2V0UGFnZUhlaWdodCh0aGlzKSl9LHRlYXJkb3duOmZ1bmN0aW9uKCl7aWYodGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKWZvcih2YXIgZT10Lmxlbmd0aDtlOyl0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodFstLWVdLG4sITEpO2Vsc2UgdGhpcy5vbm1vdXNld2hlZWw9bnVsbDtjLnJlbW92ZURhdGEodGhpcyxcIm1vdXNld2hlZWwtbGluZS1oZWlnaHRcIiksYy5yZW1vdmVEYXRhKHRoaXMsXCJtb3VzZXdoZWVsLXBhZ2UtaGVpZ2h0XCIpfSxnZXRMaW5lSGVpZ2h0OmZ1bmN0aW9uKGUpe3ZhciB0PWMoZSksYT10W1wib2Zmc2V0UGFyZW50XCJpbiBjLmZuP1wib2Zmc2V0UGFyZW50XCI6XCJwYXJlbnRcIl0oKTtyZXR1cm4gYS5sZW5ndGh8fChhPWMoXCJib2R5XCIpKSxwYXJzZUludChhLmNzcyhcImZvbnRTaXplXCIpLDEwKXx8cGFyc2VJbnQodC5jc3MoXCJmb250U2l6ZVwiKSwxMCl8fDE2fSxnZXRQYWdlSGVpZ2h0OmZ1bmN0aW9uKGUpe3JldHVybiBjKGUpLmhlaWdodCgpfSxzZXR0aW5nczp7YWRqdXN0T2xkRGVsdGFzOiEwLG5vcm1hbGl6ZU9mZnNldDohMH19O2Z1bmN0aW9uIG4oZSl7dmFyIHQsYT1lfHx3aW5kb3cuZXZlbnQsbj1nLmNhbGwoYXJndW1lbnRzLDEpLHI9MCxvPTAsaT0wLHM9MCxkPTA7aWYoKGU9Yy5ldmVudC5maXgoYSkpLnR5cGU9XCJtb3VzZXdoZWVsXCIsXCJkZXRhaWxcImluIGEmJihpPS0xKmEuZGV0YWlsKSxcIndoZWVsRGVsdGFcImluIGEmJihpPWEud2hlZWxEZWx0YSksXCJ3aGVlbERlbHRhWVwiaW4gYSYmKGk9YS53aGVlbERlbHRhWSksXCJ3aGVlbERlbHRhWFwiaW4gYSYmKG89LTEqYS53aGVlbERlbHRhWCksXCJheGlzXCJpbiBhJiZhLmF4aXM9PT1hLkhPUklaT05UQUxfQVhJUyYmKG89LTEqaSxpPTApLHI9MD09PWk/bzppLFwiZGVsdGFZXCJpbiBhJiYocj1pPS0xKmEuZGVsdGFZKSxcImRlbHRhWFwiaW4gYSYmKG89YS5kZWx0YVgsMD09PWkmJihyPS0xKm8pKSwwIT09aXx8MCE9PW8pe2lmKDE9PT1hLmRlbHRhTW9kZSl7dmFyIHU9Yy5kYXRhKHRoaXMsXCJtb3VzZXdoZWVsLWxpbmUtaGVpZ2h0XCIpO3IqPXUsaSo9dSxvKj11fWVsc2UgaWYoMj09PWEuZGVsdGFNb2RlKXt2YXIgbD1jLmRhdGEodGhpcyxcIm1vdXNld2hlZWwtcGFnZS1oZWlnaHRcIik7cio9bCxpKj1sLG8qPWx9aWYodD1NYXRoLm1heChNYXRoLmFicyhpKSxNYXRoLmFicyhvKSksKCFofHx0PGgpJiZ5KGEsaD10KSYmKGgvPTQwKSx5KGEsdCkmJihyLz00MCxvLz00MCxpLz00MCkscj1NYXRoWzE8PXI/XCJmbG9vclwiOlwiY2VpbFwiXShyL2gpLG89TWF0aFsxPD1vP1wiZmxvb3JcIjpcImNlaWxcIl0oby9oKSxpPU1hdGhbMTw9aT9cImZsb29yXCI6XCJjZWlsXCJdKGkvaCkscC5zZXR0aW5ncy5ub3JtYWxpemVPZmZzZXQmJnRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KXt2YXIgZj10aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3M9ZS5jbGllbnRYLWYubGVmdCxkPWUuY2xpZW50WS1mLnRvcH1yZXR1cm4gZS5kZWx0YVg9byxlLmRlbHRhWT1pLGUuZGVsdGFGYWN0b3I9aCxlLm9mZnNldFg9cyxlLm9mZnNldFk9ZCxlLmRlbHRhTW9kZT0wLG4udW5zaGlmdChlLHIsbyxpKSxtJiZjbGVhclRpbWVvdXQobSksbT1zZXRUaW1lb3V0KEQsMjAwKSwoYy5ldmVudC5kaXNwYXRjaHx8Yy5ldmVudC5oYW5kbGUpLmFwcGx5KHRoaXMsbil9fWZ1bmN0aW9uIEQoKXtoPW51bGx9ZnVuY3Rpb24geShlLHQpe3JldHVybiBwLnNldHRpbmdzLmFkanVzdE9sZERlbHRhcyYmXCJtb3VzZXdoZWVsXCI9PT1lLnR5cGUmJnQlMTIwPT0wfWMuZm4uZXh0ZW5kKHttb3VzZXdoZWVsOmZ1bmN0aW9uKGUpe3JldHVybiBlP3RoaXMuYmluZChcIm1vdXNld2hlZWxcIixlKTp0aGlzLnRyaWdnZXIoXCJtb3VzZXdoZWVsXCIpfSx1bm1vdXNld2hlZWw6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMudW5iaW5kKFwibW91c2V3aGVlbFwiLGUpfX0pfSk7IiwiLyohXG4gKiBqUXVlcnkuZXh0ZW5kZXh0IDEuMC4wXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxOSBEYW1pZW4gXCJNaXN0aWNcIiBTb3JlbCAoaHR0cDovL3d3dy5zdHJhbmdlcGxhbmV0LmZyKVxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUKVxuICogXG4gKiBCYXNlZCBvbiBqUXVlcnkuZXh0ZW5kIGJ5IGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZhY3Rvcnkocm9vdC5qUXVlcnkpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQuZXh0ZW5kZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG4gICAgICAgICAgICBpID0gMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgICAgICBkZWVwID0gZmFsc2UsXG4gICAgICAgICAgICBhcnJheU1vZGUgPSAnZGVmYXVsdCc7XG5cbiAgICAgICAgLy8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIGRlZXAgPSB0YXJnZXQ7XG5cbiAgICAgICAgICAgIC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpKytdIHx8IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGFycmF5IG1vZGUgcGFyYW1ldGVyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBhcnJheU1vZGUgPSB0YXJnZXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChhcnJheU1vZGUgIT09ICdjb25jYXQnICYmIGFycmF5TW9kZSAhPT0gJ3JlcGxhY2UnICYmIGFycmF5TW9kZSAhPT0gJ2V4dGVuZCcpIHtcbiAgICAgICAgICAgICAgICBhcnJheU1vZGUgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNraXAgdGhlIHN0cmluZyBwYXJhbVxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzW2krK10gfHwge307XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgISQuaXNGdW5jdGlvbih0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuICAgICAgICAgICAgaWYgKChvcHRpb25zID0gYXJndW1lbnRzW2ldKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIFNwZWNpYWwgb3BlcmF0aW9ucyBmb3IgYXJyYXlzXG4gICAgICAgICAgICAgICAgaWYgKCQuaXNBcnJheShvcHRpb25zKSAmJiBhcnJheU1vZGUgIT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHRhcmdldCAmJiAkLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldCA6IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJyYXlNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbmNhdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBjbG9uZS5jb25jYXQoJC5leHRlbmQoZGVlcCwgW10sIG9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gJC5leHRlbmQoZGVlcCwgW10sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXh0ZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSAkLmlzQXJyYXkoZSkgPyBbXSA6IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZVtpXSA9ICQuZXh0ZW5kZXh0KGRlZXAsIGFycmF5TW9kZSwgY2xvbmVbaV0gfHwgdHlwZSwgZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNsb25lLmluZGV4T2YoZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lLnB1c2goZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGNsb25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcHkgPSBvcHRpb25zW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycgfHwgdGFyZ2V0ID09PSBjb3B5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZXAgJiYgY29weSAmJiAoICQuaXNQbGFpbk9iamVjdChjb3B5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb3B5SXNBcnJheSA9ICQuaXNBcnJheShjb3B5KSkgKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYyA9IHRhcmdldFtuYW1lXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSBwcm9wZXIgdHlwZSBmb3IgdGhlIHNvdXJjZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY29weUlzQXJyYXkgJiYgIUFycmF5LmlzQXJyYXkoIHNyYyApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoICFjb3B5SXNBcnJheSAmJiAhJC5pc1BsYWluT2JqZWN0KCBzcmMgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHNyYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29weUlzQXJyYXkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9ICQuZXh0ZW5kZXh0KGRlZXAsIGFycmF5TW9kZSwgY2xvbmUsIGNvcHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3B5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBjb3B5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3RcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xufSkpO1xuIiwiLyohXG4gKiBqUXVlcnkgTW91c2V3aGVlbCAzLjEuMTNcbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlMgc3R5bGUgZm9yIEJyb3dzZXJpZnlcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHRvRml4ICA9IFsnd2hlZWwnLCAnbW91c2V3aGVlbCcsICdET01Nb3VzZVNjcm9sbCcsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJ10sXG4gICAgICAgIHRvQmluZCA9ICggJ29ud2hlZWwnIGluIGRvY3VtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50TW9kZSA+PSA5ICkgP1xuICAgICAgICAgICAgICAgICAgICBbJ3doZWVsJ10gOiBbJ21vdXNld2hlZWwnLCAnRG9tTW91c2VTY3JvbGwnLCAnTW96TW91c2VQaXhlbFNjcm9sbCddLFxuICAgICAgICBzbGljZSAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICAgIG51bGxMb3dlc3REZWx0YVRpbWVvdXQsIGxvd2VzdERlbHRhO1xuXG4gICAgaWYgKCAkLmV2ZW50LmZpeEhvb2tzICkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IHRvRml4Lmxlbmd0aDsgaTsgKSB7XG4gICAgICAgICAgICAkLmV2ZW50LmZpeEhvb2tzWyB0b0ZpeFstLWldIF0gPSAkLmV2ZW50Lm1vdXNlSG9va3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3BlY2lhbCA9ICQuZXZlbnQuc3BlY2lhbC5tb3VzZXdoZWVsID0ge1xuICAgICAgICB2ZXJzaW9uOiAnMy4xLjEyJyxcblxuICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IHRvQmluZC5sZW5ndGg7IGk7ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoIHRvQmluZFstLWldLCBoYW5kbGVyLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1vdXNld2hlZWwgPSBoYW5kbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGxpbmUgaGVpZ2h0IGFuZCBwYWdlIGhlaWdodCBmb3IgdGhpcyBwYXJ0aWN1bGFyIGVsZW1lbnRcbiAgICAgICAgICAgICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcsIHNwZWNpYWwuZ2V0TGluZUhlaWdodCh0aGlzKSk7XG4gICAgICAgICAgICAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnLCBzcGVjaWFsLmdldFBhZ2VIZWlnaHQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuICAgICAgICAgICAgICAgIGZvciAoIHZhciBpID0gdG9CaW5kLmxlbmd0aDsgaTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggdG9CaW5kWy0taV0sIGhhbmRsZXIsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ubW91c2V3aGVlbCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCB0aGUgZGF0YSB3ZSBhZGRlZCB0byB0aGUgZWxlbWVudFxuICAgICAgICAgICAgJC5yZW1vdmVEYXRhKHRoaXMsICdtb3VzZXdoZWVsLWxpbmUtaGVpZ2h0Jyk7XG4gICAgICAgICAgICAkLnJlbW92ZURhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRMaW5lSGVpZ2h0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pLFxuICAgICAgICAgICAgICAgICRwYXJlbnQgPSAkZWxlbVsnb2Zmc2V0UGFyZW50JyBpbiAkLmZuID8gJ29mZnNldFBhcmVudCcgOiAncGFyZW50J10oKTtcbiAgICAgICAgICAgIGlmICghJHBhcmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KCRwYXJlbnQuY3NzKCdmb250U2l6ZScpLCAxMCkgfHwgcGFyc2VJbnQoJGVsZW0uY3NzKCdmb250U2l6ZScpLCAxMCkgfHwgMTY7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0UGFnZUhlaWdodDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkuaGVpZ2h0KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIGFkanVzdE9sZERlbHRhczogdHJ1ZSwgLy8gc2VlIHNob3VsZEFkanVzdE9sZERlbHRhcygpIGJlbG93XG4gICAgICAgICAgICBub3JtYWxpemVPZmZzZXQ6IHRydWUgIC8vIGNhbGxzIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmb3IgZWFjaCBldmVudFxuICAgICAgICB9XG4gICAgfTtcblxuICAgICQuZm4uZXh0ZW5kKHtcbiAgICAgICAgbW91c2V3aGVlbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbiA/IHRoaXMuYmluZCgnbW91c2V3aGVlbCcsIGZuKSA6IHRoaXMudHJpZ2dlcignbW91c2V3aGVlbCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVubW91c2V3aGVlbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVuYmluZCgnbW91c2V3aGVlbCcsIGZuKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIHZhciBvcmdFdmVudCAgID0gZXZlbnQgfHwgd2luZG93LmV2ZW50LFxuICAgICAgICAgICAgYXJncyAgICAgICA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGRlbHRhICAgICAgPSAwLFxuICAgICAgICAgICAgZGVsdGFYICAgICA9IDAsXG4gICAgICAgICAgICBkZWx0YVkgICAgID0gMCxcbiAgICAgICAgICAgIGFic0RlbHRhICAgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0WCAgICA9IDAsXG4gICAgICAgICAgICBvZmZzZXRZICAgID0gMDtcbiAgICAgICAgZXZlbnQgPSAkLmV2ZW50LmZpeChvcmdFdmVudCk7XG4gICAgICAgIGV2ZW50LnR5cGUgPSAnbW91c2V3aGVlbCc7XG5cbiAgICAgICAgLy8gT2xkIHNjaG9vbCBzY3JvbGx3aGVlbCBkZWx0YVxuICAgICAgICBpZiAoICdkZXRhaWwnICAgICAgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWSA9IG9yZ0V2ZW50LmRldGFpbCAqIC0xOyAgICAgIH1cbiAgICAgICAgaWYgKCAnd2hlZWxEZWx0YScgIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVkgPSBvcmdFdmVudC53aGVlbERlbHRhOyAgICAgICB9XG4gICAgICAgIGlmICggJ3doZWVsRGVsdGFZJyBpbiBvcmdFdmVudCApIHsgZGVsdGFZID0gb3JnRXZlbnQud2hlZWxEZWx0YVk7ICAgICAgfVxuICAgICAgICBpZiAoICd3aGVlbERlbHRhWCcgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWCA9IG9yZ0V2ZW50LndoZWVsRGVsdGFYICogLTE7IH1cblxuICAgICAgICAvLyBGaXJlZm94IDwgMTcgaG9yaXpvbnRhbCBzY3JvbGxpbmcgcmVsYXRlZCB0byBET01Nb3VzZVNjcm9sbCBldmVudFxuICAgICAgICBpZiAoICdheGlzJyBpbiBvcmdFdmVudCAmJiBvcmdFdmVudC5heGlzID09PSBvcmdFdmVudC5IT1JJWk9OVEFMX0FYSVMgKSB7XG4gICAgICAgICAgICBkZWx0YVggPSBkZWx0YVkgKiAtMTtcbiAgICAgICAgICAgIGRlbHRhWSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgZGVsdGEgdG8gYmUgZGVsdGFZIG9yIGRlbHRhWCBpZiBkZWx0YVkgaXMgMCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdGl5XG4gICAgICAgIGRlbHRhID0gZGVsdGFZID09PSAwID8gZGVsdGFYIDogZGVsdGFZO1xuXG4gICAgICAgIC8vIE5ldyBzY2hvb2wgd2hlZWwgZGVsdGEgKHdoZWVsIGV2ZW50KVxuICAgICAgICBpZiAoICdkZWx0YVknIGluIG9yZ0V2ZW50ICkge1xuICAgICAgICAgICAgZGVsdGFZID0gb3JnRXZlbnQuZGVsdGFZICogLTE7XG4gICAgICAgICAgICBkZWx0YSAgPSBkZWx0YVk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAnZGVsdGFYJyBpbiBvcmdFdmVudCApIHtcbiAgICAgICAgICAgIGRlbHRhWCA9IG9yZ0V2ZW50LmRlbHRhWDtcbiAgICAgICAgICAgIGlmICggZGVsdGFZID09PSAwICkgeyBkZWx0YSAgPSBkZWx0YVggKiAtMTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm8gY2hhbmdlIGFjdHVhbGx5IGhhcHBlbmVkLCBubyByZWFzb24gdG8gZ28gYW55IGZ1cnRoZXJcbiAgICAgICAgaWYgKCBkZWx0YVkgPT09IDAgJiYgZGVsdGFYID09PSAwICkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBOZWVkIHRvIGNvbnZlcnQgbGluZXMgYW5kIHBhZ2VzIHRvIHBpeGVscyBpZiB3ZSBhcmVuJ3QgYWxyZWFkeSBpbiBwaXhlbHNcbiAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDAgaXMgYnkgcGl4ZWxzLCBub3RoaW5nIHRvIGRvXG4gICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMSBpcyBieSBsaW5lc1xuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcbiAgICAgICAgaWYgKCBvcmdFdmVudC5kZWx0YU1vZGUgPT09IDEgKSB7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9ICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcpO1xuICAgICAgICAgICAgZGVsdGEgICo9IGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVkgKj0gbGluZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWCAqPSBsaW5lSGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKCBvcmdFdmVudC5kZWx0YU1vZGUgPT09IDIgKSB7XG4gICAgICAgICAgICB2YXIgcGFnZUhlaWdodCA9ICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1wYWdlLWhlaWdodCcpO1xuICAgICAgICAgICAgZGVsdGEgICo9IHBhZ2VIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVkgKj0gcGFnZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWCAqPSBwYWdlSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RvcmUgbG93ZXN0IGFic29sdXRlIGRlbHRhIHRvIG5vcm1hbGl6ZSB0aGUgZGVsdGEgdmFsdWVzXG4gICAgICAgIGFic0RlbHRhID0gTWF0aC5tYXgoIE1hdGguYWJzKGRlbHRhWSksIE1hdGguYWJzKGRlbHRhWCkgKTtcblxuICAgICAgICBpZiAoICFsb3dlc3REZWx0YSB8fCBhYnNEZWx0YSA8IGxvd2VzdERlbHRhICkge1xuICAgICAgICAgICAgbG93ZXN0RGVsdGEgPSBhYnNEZWx0YTtcblxuICAgICAgICAgICAgLy8gQWRqdXN0IG9sZGVyIGRlbHRhcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmICggc2hvdWxkQWRqdXN0T2xkRGVsdGFzKG9yZ0V2ZW50LCBhYnNEZWx0YSkgKSB7XG4gICAgICAgICAgICAgICAgbG93ZXN0RGVsdGEgLz0gNDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGp1c3Qgb2xkZXIgZGVsdGFzIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAoIHNob3VsZEFkanVzdE9sZERlbHRhcyhvcmdFdmVudCwgYWJzRGVsdGEpICkge1xuICAgICAgICAgICAgLy8gRGl2aWRlIGFsbCB0aGUgdGhpbmdzIGJ5IDQwIVxuICAgICAgICAgICAgZGVsdGEgIC89IDQwO1xuICAgICAgICAgICAgZGVsdGFYIC89IDQwO1xuICAgICAgICAgICAgZGVsdGFZIC89IDQwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGEgd2hvbGUsIG5vcm1hbGl6ZWQgdmFsdWUgZm9yIHRoZSBkZWx0YXNcbiAgICAgICAgZGVsdGEgID0gTWF0aFsgZGVsdGEgID49IDEgPyAnZmxvb3InIDogJ2NlaWwnIF0oZGVsdGEgIC8gbG93ZXN0RGVsdGEpO1xuICAgICAgICBkZWx0YVggPSBNYXRoWyBkZWx0YVggPj0gMSA/ICdmbG9vcicgOiAnY2VpbCcgXShkZWx0YVggLyBsb3dlc3REZWx0YSk7XG4gICAgICAgIGRlbHRhWSA9IE1hdGhbIGRlbHRhWSA+PSAxID8gJ2Zsb29yJyA6ICdjZWlsJyBdKGRlbHRhWSAvIGxvd2VzdERlbHRhKTtcblxuICAgICAgICAvLyBOb3JtYWxpc2Ugb2Zmc2V0WCBhbmQgb2Zmc2V0WSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICggc3BlY2lhbC5zZXR0aW5ncy5ub3JtYWxpemVPZmZzZXQgJiYgdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gYm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgICAgICAgICBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIGJvdW5kaW5nUmVjdC50b3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgaW5mb3JtYXRpb24gdG8gdGhlIGV2ZW50IG9iamVjdFxuICAgICAgICBldmVudC5kZWx0YVggPSBkZWx0YVg7XG4gICAgICAgIGV2ZW50LmRlbHRhWSA9IGRlbHRhWTtcbiAgICAgICAgZXZlbnQuZGVsdGFGYWN0b3IgPSBsb3dlc3REZWx0YTtcbiAgICAgICAgZXZlbnQub2Zmc2V0WCA9IG9mZnNldFg7XG4gICAgICAgIGV2ZW50Lm9mZnNldFkgPSBvZmZzZXRZO1xuICAgICAgICAvLyBHbyBhaGVhZCBhbmQgc2V0IGRlbHRhTW9kZSB0byAwIHNpbmNlIHdlIGNvbnZlcnRlZCB0byBwaXhlbHNcbiAgICAgICAgLy8gQWx0aG91Z2ggdGhpcyBpcyBhIGxpdHRsZSBvZGQgc2luY2Ugd2Ugb3ZlcndyaXRlIHRoZSBkZWx0YVgvWVxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHdpdGggbm9ybWFsaXplZCBkZWx0YXMuXG4gICAgICAgIGV2ZW50LmRlbHRhTW9kZSA9IDA7XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGFuZCBkZWx0YSB0byB0aGUgZnJvbnQgb2YgdGhlIGFyZ3VtZW50c1xuICAgICAgICBhcmdzLnVuc2hpZnQoZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSk7XG5cbiAgICAgICAgLy8gQ2xlYXJvdXQgbG93ZXN0RGVsdGEgYWZ0ZXIgc29tZXRpbWUgdG8gYmV0dGVyXG4gICAgICAgIC8vIGhhbmRsZSBtdWx0aXBsZSBkZXZpY2UgdHlwZXMgdGhhdCBnaXZlIGRpZmZlcmVudFxuICAgICAgICAvLyBhIGRpZmZlcmVudCBsb3dlc3REZWx0YVxuICAgICAgICAvLyBFeDogdHJhY2twYWQgPSAzIGFuZCBtb3VzZSB3aGVlbCA9IDEyMFxuICAgICAgICBpZiAobnVsbExvd2VzdERlbHRhVGltZW91dCkgeyBjbGVhclRpbWVvdXQobnVsbExvd2VzdERlbHRhVGltZW91dCk7IH1cbiAgICAgICAgbnVsbExvd2VzdERlbHRhVGltZW91dCA9IHNldFRpbWVvdXQobnVsbExvd2VzdERlbHRhLCAyMDApO1xuXG4gICAgICAgIHJldHVybiAoJC5ldmVudC5kaXNwYXRjaCB8fCAkLmV2ZW50LmhhbmRsZSkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbnVsbExvd2VzdERlbHRhKCkge1xuICAgICAgICBsb3dlc3REZWx0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvdWxkQWRqdXN0T2xkRGVsdGFzKG9yZ0V2ZW50LCBhYnNEZWx0YSkge1xuICAgICAgICAvLyBJZiB0aGlzIGlzIGFuIG9sZGVyIGV2ZW50IGFuZCB0aGUgZGVsdGEgaXMgZGl2aXNhYmxlIGJ5IDEyMCxcbiAgICAgICAgLy8gdGhlbiB3ZSBhcmUgYXNzdW1pbmcgdGhhdCB0aGUgYnJvd3NlciBpcyB0cmVhdGluZyB0aGlzIGFzIGFuXG4gICAgICAgIC8vIG9sZGVyIG1vdXNlIHdoZWVsIGV2ZW50IGFuZCB0aGF0IHdlIHNob3VsZCBkaXZpZGUgdGhlIGRlbHRhc1xuICAgICAgICAvLyBieSA0MCB0byB0cnkgYW5kIGdldCBhIG1vcmUgdXNhYmxlIGRlbHRhRmFjdG9yLlxuICAgICAgICAvLyBTaWRlIG5vdGUsIHRoaXMgYWN0dWFsbHkgaW1wYWN0cyB0aGUgcmVwb3J0ZWQgc2Nyb2xsIGRpc3RhbmNlXG4gICAgICAgIC8vIGluIG9sZGVyIGJyb3dzZXJzIGFuZCBjYW4gY2F1c2Ugc2Nyb2xsaW5nIHRvIGJlIHNsb3dlciB0aGFuIG5hdGl2ZS5cbiAgICAgICAgLy8gVHVybiB0aGlzIG9mZiBieSBzZXR0aW5nICQuZXZlbnQuc3BlY2lhbC5tb3VzZXdoZWVsLnNldHRpbmdzLmFkanVzdE9sZERlbHRhcyB0byBmYWxzZS5cbiAgICAgICAgcmV0dXJuIHNwZWNpYWwuc2V0dGluZ3MuYWRqdXN0T2xkRGVsdGFzICYmIG9yZ0V2ZW50LnR5cGUgPT09ICdtb3VzZXdoZWVsJyAmJiBhYnNEZWx0YSAlIDEyMCA9PT0gMDtcbiAgICB9XG5cbn0pKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJTUUxQYXJzZXIiLCJyZXF1aXJlIiwiU3ByeWtlclF1ZXJ5QnVpbGRlciIsIm9wdGlvbnMiLCJzZWxmIiwiYnVpbGRlciIsImRpc3BsYXlRdWVyeUJ1aWxkZXIiLCJnZXRGaWx0ZXJzVXJsIiwiYWpheFVybCIsInNxbCIsInNxbFF1ZXJ5IiwiaW5wdXRFbGVtZW50IiwidGFyZ2V0RWxlbWVudCIsImxhYmVsIiwiaW5pdCIsIiQiLCJjcmVhdGVCdWlsZGVyIiwiZGlzYWJsZVZhbGlkYXRpb24iLCJvbiIsImUiLCJydWxlIiwiZXJyb3IiLCJ2YWx1ZSIsInByZXZlbnREZWZhdWx0IiwicHJvdG90eXBlIiwiZ2V0IiwiZG9uZSIsImZpbHRlcnMiLCJxdWVyeUJ1aWxkZXIiLCJzcWxPcGVyYXRvcnMiLCJnZXRTcWxPcGVyYXRvcnMiLCJzcWxSdWxlT3BlcmF0b3IiLCJnZXRTcWxSdWxlT3BlcmF0b3JzIiwiYWxsb3dfZW1wdHkiLCJkaXNwbGF5X2VtcHR5X2ZpbHRlciIsInByZXBlbmQiLCJ0b2dnbGVCdXR0b24iLCJldmVudCIsImlucHV0RWxlbWVudENvbnRhaW5lciIsInBhcmVudCIsImJ1dHRvbiIsInRhcmdldCIsInNhdmVRdWVyeSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjaGlsZHJlbiIsInJlbW92ZSIsImRhdGEiLCJ2YWwiLCJ0ZXh0IiwiY29udGFpbnMiLCJvcCIsIm1vZCIsIm5vdF9jb250YWlucyIsImluIiwic2VwIiwibm90X2luIiwiQ09OVEFJTlMiLCJ2IiwiRE9FUyBOT1QgQ09OVEFJTiIsIklTIElOIiwiSVMgTk9UIElOIiwiaGFzQ2xhc3MiLCJzdGF0dXMiLCJydWxlcyIsImxlbmd0aCIsInJlc3VsdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbnB1dEVsZW1lbnRJZCIsInRhcmdldEVsZW1lbnRJZCIsIlNxbEZhY3RvcnkiLCJzZXREaXNjb3VudEFtb3VudFN5bWJvbCIsIiRhbW91bnRBZGRvbiIsInRlc3QiLCJodG1sIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNxbENhbGN1bGF0aW9uQnVpbGRlciIsInNxbENvbmRpdGlvbkJ1aWxkZXIiLCJpc1F1ZXJ5U3RyaW5nQ29sbGVjdG9yU2VsZWN0ZWQiLCJpcyIsInByb3AiLCJzdWJtaXQiLCJhcHBseSIsIiRpbnB1dEZyb20iLCIkaW5wdXRUbyIsImRlZmF1bHREYXRlRm9ybWF0IiwiaW5wdXRGcm9tRm9ybWF0IiwiaW5wdXRUb0Zvcm1hdCIsImRhdGV0aW1lcGlja2VyIiwiZm9ybWF0IiwiZGVmYXVsdFRpbWUiLCJ0b2RheUJ1dHRvbiIsIm9uU2hvdyIsInNldE9wdGlvbnMiLCJtYXhEYXRlIiwib25DbG9zZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJtaW5EYXRlIiwiZWFjaCIsImluZGV4IiwiZWxlbWVudCIsImhpZGUiLCJzaG93IiwiYWN0aXZlQ2FsY3VsYXRvcklucHV0VHlwZSJdLCJzb3VyY2VSb290IjoiIn0=