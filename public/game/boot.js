const RenJSConfig =  {
  'name': 'Quickstart',
  'w': 2560,
  'h': 1440,
  'renderer': Phaser.AUTO, // become renderer
  'scaleMode': Phaser.ScaleManager.SHOW_ALL,
  'loadingScreen': {
    'background': 'game/assets/gui/loaderloaderbackground.png',
    'loadingBar': {
      'asset': 'game/assets/gui/loaderloading-bar.png',
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
  'fonts': 'game/assets/gui/fonts.css',
  'guiConfig': 'game/story/GUI.yaml',
  storyConfig: 'game/story/Config.yaml',
  storySetup: 'game/story/Setup.yaml',
  'storyText': [
    'game/story/Story.yaml'
  ],
  'logChoices': true,
}
//const Hello = new HelloWorld()
const RenJSGame = new RenJS.game(RenJSConfig)
RenJSGame.launch()
