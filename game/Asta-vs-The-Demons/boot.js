const RenJSConfig =  {
  'name': 'Quickstart',
  'w': 2560,
  'h': 1440,
  'renderer': Phaser.AUTO, // become renderer
  'scaleMode': Phaser.ScaleManager.SHOW_ALL,
  'loadingScreen': {
    'background': 'assets/gui/loaderloaderbackground.png',
    'loadingBar': {
      'asset': 'assets/gui/loaderloading-bar.png',
      'position': {
        'x': 980,
        'y': 875
      },
      'size': {
        'w': 578, //578
        'h': 82
      }
    }
  },
  'fonts': 'assets/gui/fonts.css',
  'guiConfig': 'story/GUI.yaml',
  storyConfig: 'story/Config.yaml',
  storySetup: 'story/Setup.yaml',
  'storyText': [
    'story/Story.yaml'
  ],
  'logChoices': true,
}
//const Hello = new HelloWorld()
const RenJSGame = new RenJS.game(RenJSConfig)
RenJSGame.launch()
