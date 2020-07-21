import {commands, ExtensionContext, StatusBarItem, window, StatusBarAlignment} from 'vscode';

export default class ServerStatusBarItem{
    isRunning: boolean;
    statusBarItem: StatusBarItem;

    constructor(){
        this.isRunning = false;
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 100);
        this.stop();
        this.statusBarItem.show();
    }
    

    start(){
        this.isRunning = true;
        this.statusBarItem.command = 'twDevServer.stop';
        this.statusBarItem.text = '$(stop-circle) TW Dv Svr';
        this.statusBarItem.tooltip = 'Click to stop Tw Dev Server';
        //this.statusBarItem.show();
    }

    stop(){
        this.isRunning = false;
        this.statusBarItem.command = 'twDevServer.start';
        this.statusBarItem.text = '$(play-circle) TW Dv Svr';
        this.statusBarItem.tooltip = 'Click to start Tw Dev Server';
        //this.statusBarItem.show();
    }
}