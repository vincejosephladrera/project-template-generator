#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory path of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the template directory using __dirname
const templateDir = path.join(__dirname, 'template');

function parseArgs() {
	const args = process.argv.slice(2);
	return {
		projectName: args[0] || null,
	};
}

async function askQuestions(defaults = {}) {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'projectName',
			message: 'What is the name of your project?',
			default: defaults.projectName || 'my-new-project',
		},
		{
			type: 'input',
			name: 'author',
			message: 'Who is the author of this project?',
			default: 'Your Name',
		},
		{
			type: 'input',
			name: 'description',
			message: 'What is the description of your project?',
			default: 'A new project',
		},
	]);
	return answers;
}

function copyTemplate(answers) {
	const outputDir = path.join(process.cwd(), answers.projectName);

	// Copy the template directory to the new project folder
	fs.copySync(templateDir, outputDir, {
		filter: () => true,
	});

	// Replace placeholders in the template files
	const packageJsonPath = path.join(outputDir, 'package.json');
	let packageJson = fs.readFileSync(packageJsonPath, 'utf8');
	packageJson = packageJson.replace(/{{projectName}}/g, answers.projectName);
	packageJson = packageJson.replace(/{{author}}/g, answers.author);
	packageJson = packageJson.replace(/{{description}}/g, answers.description);
	fs.writeFileSync(packageJsonPath, packageJson);

	console.log(chalk.green(`Project "${answers.projectName}" created successfully!`));
}

async function generateProject() {
	const cliArgs = parseArgs();
	const answers = await askQuestions(cliArgs);
	copyTemplate(answers);
}

generateProject();
