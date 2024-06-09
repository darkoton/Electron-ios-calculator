import { app, BrowserWindow, nativeTheme } from 'electron';
import path from 'path';


const createWindow = () => {
  const win = new BrowserWindow({
    width: 420,
    height: 700,
    autoHideMenuBar: true,
    icon: path.join('images', 'icon.ico'),
    title: 'Calculator',
    resizable: false,
  });

  win.loadFile('./frontend/index.html');
};

nativeTheme.themeSource = 'dark';

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
