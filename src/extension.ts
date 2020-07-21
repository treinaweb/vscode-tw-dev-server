import {commands, workspace, window, ExtensionContext} from 'vscode';
import * as open from 'open';
import * as Server from './Server';
import ServerStatusBarItem from './ServerStatusBarItem';

let myStatusBarItem: ServerStatusBarItem;


export function activate(context: ExtensionContext) {

	context.subscriptions.push(commands.registerCommand('twDevServer.start', () => {
		Server.start();
		myStatusBarItem.start();
	}));

	context.subscriptions.push(commands.registerCommand('twDevServer.stop', () => {
		Server.stop();
		myStatusBarItem.stop();
	}));

	/*context.subscriptions.push(commands.registerCommand('twDevServer.openFileBrowser', async () => {
		const configurations = workspace.getConfiguration('twDevServer.settings');

		console.log(workspace)
		
		var currentlyOpenTabfilePath = window.activeTextEditor?.document.uri.fsPath;
		var currentlyOpenTabfilePath = window.activeTextEditor?.document.fileName;
		console.log(111,currentlyOpenTabfilePath)

		var a = window.showQuickPick
		console.log(222, a)

		const port = configurations.get('port');

		//await open(`http://localhost:${port}/`);
	}));*/

	context.subscriptions.push(commands.registerCommand('twDevServer.openGUI', async () => {
		await open('https://treinaweb.github.io/tw-dev-server');
	}));

	myStatusBarItem = new ServerStatusBarItem();
	context.subscriptions.push(myStatusBarItem.statusBarItem);
}

export function deactivate() {}