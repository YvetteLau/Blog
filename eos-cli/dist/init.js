'use strict';

var _get = require('./utils/get');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let init = async (templateName, projectName) => {
    //项目不存在
    if (!_fs2.default.existsSync(projectName)) {
        //命令行交互
        _inquirer2.default.prompt([{
            name: 'description',
            message: 'Please enter the project description: '
        }, {
            name: 'author',
            message: 'Please enter the author name: '
        }]).then(async answer => {
            //下载模板 选择模板
            //通过配置文件，获取模板信息
            let loading = (0, _ora2.default)('downloading template ...');
            loading.start();
            (0, _get.downloadLocal)(templateName, projectName).then(() => {
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                if (_fs2.default.existsSync(fileName)) {
                    const data = _fs2.default.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    //修改项目文件夹中 package.json 文件
                    _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
                }
            }, () => {
                loading.fail();
            });
        });
    } else {
        //项目已经存在
        console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
    }
};

module.exports = init;