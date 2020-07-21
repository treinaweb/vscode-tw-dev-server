import {workspace, window, commands, ExtensionContext} from 'vscode';
// @ts-ignore
import * as twDevServerTerminal from '@treinaweb/tw-dev-server/src/terminal';

type Server = {
    start: Function, stop: Function
} | null;

let myServer: Server = null;

export async function start(){
    const configurations = workspace.getConfiguration('twDevServer.settings');
    const port = configurations.get('port');
    const isTempData = configurations.get('temp');
    const isLive = configurations.get('isLive');
    const isBrowserSync = configurations.get('sync');

    if(myServer){
        myServer.stop();
    }

    const serverType = (isLive || isBrowserSync) ? 'server-live':'server';
    myServer = await import(`@treinaweb/tw-dev-server/src/${serverType}`);
    var workspaceFolders = workspace.workspaceFolders;

    if(workspaceFolders){
        await workspace.saveAll();
        twDevServerTerminal.cliDirectory = workspaceFolders?.[0].uri.fsPath;
        myServer?.start({
            port,
            isTempData,
            showVersion: false,
            visibleData : false,
            isLive,
            isBrowserSync,
        });

        window.showInformationMessage(`Tw Dev Server running on http://localhost:${port}`);
    }
}

export function stop(){
    if(myServer){
        myServer.stop();
        myServer = null;
        window.showInformationMessage('Tw Dev Server Stopped');
    }
}