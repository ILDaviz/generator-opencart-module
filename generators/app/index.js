'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

// Variable ambient
var classify_format, 
underscore_format, 
titleize_format, 
oc_version,
mod_type;
// Location
var VQMOD_DIR = 'upload/vqmod/xml/',
OCMOD_DIR = 'upload/';

module.exports = yeoman.generators.Base.extend({
    prompting: function() {

        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.blue('Opencart Module') + ' starter generator! V3.0'
        ));

        var prompts = [{
            type: 'input',
            name: 'module_name',
            message: 'What name would you like for your module?',
            default: this.appname
        }, {
            type: 'list',
            name: 'version opencart',
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
                name: 'Dashboard',
                value: 'dashboard'
            },{
                name: 'Module',
                value: 'module'
            }/**, 
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
            }**/
            ],
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

        switch (mod_type) {
            /**
             * CREATE DASHBOARD MODULE
             */
            case 'dashboard':
                if( oc_version == '3.x' ) {
                    // ADMIN
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_view.twig'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.twig'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                }

                if( oc_version == '2.x' ) {
                    // ADMIN
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_view.tpl'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                }

                if( oc_version == '1.5' ) {
                    // ADMIN
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_view.tpl'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                }
                
                break;
            /**
             * CREATE MODULE
             */
            case 'module':

                if( oc_version == '3.x' ) {
                    // ADMIN
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_view.twig'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.twig'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    // CATALOG
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__view.twig'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.twig'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                }

                if( oc_version == '2.x' ) {
                    // ADMIN
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_view.tpl'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    // CATALOG
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__view.tpl'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                }

                if( oc_version == '1.5' ) {
                    // ADMIN
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_admin_view.tpl'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'admin').replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    // CATALOG
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog_controller.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__model.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__langauge.php'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.php'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                    this.fs.copyTpl(
                        // Estract item
                        this.templatePath(oc_version + '/' + mod_type + '/_catalog__view.tpl'),
                        // Get location and copy
                        this.destinationPath(_s('upload/%c%/controller/extension/%t%/').replaceAll('%c%', 'catalog').replaceAll('%t%', mod_type).value() + underscore_format + '.tpl'), {
                            classified_name: classify_format,
                            module_type: mod_type
                        }
                    );
                }

                break;

 /*           case 'payment':

                break;

            case 'shipping':

                break;

            case 'feed':

                break;

            case 'core':

                break;
*/
        
            default:
                break;
        }


        // OCMOD
        if(this.props.ocmod == true) {
            this.fs.copyTpl(
                this.templatePath(oc_version + '/_install.xml'),
                this.destinationPath(OCMOD_DIR + underscore_format + '.xml'), {
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