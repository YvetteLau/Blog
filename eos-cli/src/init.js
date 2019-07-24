import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

let init = async (templateName, projectName) => {
    //项目不存在
    if (!fs.existsSync(projectName)) {
        //命令行交互
        inquirer.prompt([
            {
                name: 'description',
                message: 'Please enter the project description: '
            },
            {
                name: 'author',
                message: 'Please enter the author name: '
            }
        ]).then(async (answer) => {
            //下载模板 选择模板
            //通过配置文件，获取模板信息
            let loading = ora('downloading template ...');
            loading.start();
            downloadLocal(templateName, projectName).then(() => {
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                if(fs.existsSync(fileName)){
                    const data = fs.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    //修改项目文件夹中 package.json 文件
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    console.log(symbol.success, chalk.green('Project initialization finished!'));
                }
            }, () => {
                loading.fail();
            });
        });
    }else {
        //项目已经存在
        console.log(symbol.error, chalk.red('The project already exists'));
    }
}

module.exports = init;