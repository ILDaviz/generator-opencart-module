'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

//
var classify_format, underscore_format, titleize_format, oc_version, mod_type;

var CONTROLLER_DIR = 'upload/%c%/controller/%t%/',
    LANGUAGE_DIR = 'upload/%c%/language/english/%t%/',
    MODEL_DIR = 'upload/%c%/model/%t%/',
    ADMIN_VIEW_DIR = 'upload/admin/view/template/%t%/',
    CATALOG_VIEW_DIR = 'upload/catalog/view/theme/default/template/%t%/',
    VQMOD_DIR = 'upload/vqmod/xml/';
    OCMOD_DIR = 'upload/';

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.blue('Opencart Module') + ' starter generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'module_name',
            message: 'What name would you like for your module?',
            default: this.appname
        }, {
            type: 'list',
            name: 'version',
            message: 'What version of Opencart will your module be for?',
            choices: [{
                name: '1.5.x',
                value: '1_5'
            }, {
                name: '2.x',
                value: '2_x'
            }, {
                name: '3.x',
                value: '3_x'
            }],
            default: 1
        }, {
            type: 'list',
            name: 'module_type',
            message: 'What type of module do you want to create?',
            choices: [{
                name: 'Module',
                value: 'module'
            }, 
			{
                name: 'Payment',
                value: 'payment'
            }, 
			{
                name: 'Shipping',
                value: 'shipping'
            }, 
			{
                name: 'Order Total',
                value: 'total'
            }, 
			{
                name: 'Feed',
                value: 'feed'
            }],
            default: 0
        }, {
            type: 'confirm',
            name: 'ocmod',
            message: 'Will the module require ocmod support?',
            default: false
        }
        , {
            type: 'confirm',
            name: 'vqmod',
            message: 'Will the module require vQmod support?',
            default: false
        }];

        this.prompt(prompts, function(props) {
            this.props = props;

            oc_version = this.props.version;
            mod_type = this.props.module_type;
			
            classify_format = _s(mod_type).classify().value() + _s(this.props.module_name).classify().value();
            underscore_format = _s(this.props.module_name).underscored().value();
            titleize_format = _s(this.props.module_name).titleize().value();

            done();
        }.bind(this));
    },

    writing: function() {

        this.log('Working...');

        // ADMIN

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_controller.php'),
            this.destinationPath(_s(CONTROLLER_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_admin_language.php'),
            this.destinationPath(_s(LANGUAGE_DIR).replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        if( oc_version == '3.x' ) {
            // If is new version
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_admin_view.twig'),
                this.destinationPath(_s(ADMIN_VIEW_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.twig'), {
                    underscored_name: underscore_format,
                    module_type: mod_type
                }
            );

        } else {
            // If is old version
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_admin_view.tpl'),
                this.destinationPath(_s(ADMIN_VIEW_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                    underscored_name: underscore_format,
                    module_type: mod_type
                }
            );
        }

        // CATALOG

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_controller.php'),
            this.destinationPath(_s(CONTROLLER_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                underscored_name: underscore_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_language.php'),
            this.destinationPath(_s(LANGUAGE_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                titleized_name: titleize_format,
                module_type: mod_type
            }
        );

        this.fs.copyTpl(
            this.templatePath(oc_version + '/_catalog_model.php'),
            this.destinationPath(_s(MODEL_DIR).replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                classified_name: classify_format,
                module_type: mod_type
            }
        );
        
        if( oc_version == '3.x' ) {
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_catalog_view.twig'),
                this.destinationPath(_s(CATALOG_VIEW_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.twig'), {
                    titleized_name: titleize_format,
                    module_type: mod_type
                }
            );
        } else {
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_catalog_view.tpl'),
                this.destinationPath(_s(CATALOG_VIEW_DIR).replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                    titleized_name: titleize_format,
                    module_type: mod_type
                }
            );
        }

        // OCMOD
        if(this.props.ocmod == true) {
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_install.xml'),
                this.destinationPath(VQMOD_DIR + underscore_format + '.xml'), {
                    titleized_name: titleize_format,
                    underscored_name: underscore_format
                }
            );
        }

        // VQMOD
        if (this.props.vqmod == true) {
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_vqmod.xml'),
                this.destinationPath(VQMOD_DIR + underscore_format + '.xml'), {
                    titleized_name: titleize_format,
                    underscored_name: underscore_format
                }
            );
        }

    },

    end: function() {
        this.log(yosay(
            'Your module starter ' + chalk.blue(titleize_format) + ' has been created successfully!'
        ));
    }
});