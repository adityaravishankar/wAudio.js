# wAudio.js
[wAudio.js](https://github.com/adityaravishankar/wAudio.js) is a drop-in replacement for the HTML5 Audio object, which uses Web Audio behind the scenes.

It replicates the HTML5 Audio API, but transparently uses the [Web Audio API](http://webaudio.github.io/web-audio-api/) to implement the features, allowing the use of Web Audio with the simpler Audio API. This makes it easy to migrate your HTML5 projects that use Audio to Web Audio, for use on mobile devices.

### Features
* Use Audio object API for Web Audio
* Detect Web Audio support by checking for presence of wAudio object
* Automatic caching of requests for improved performance
* Easily unlock audio playback on Safari, using either `playMutedSound()` method or `mobileAutoEnable` property
* No outside dependencies, just pure JavaScript
* Extremely small - 4KB minified!!

### Browser Compatibility
Tested in the following browsers/versions:
* Google Chrome 7.0+
* Internet Explorer 9.0+
* Firefox 4.0+
* Safari 5.1.4+
* Mobile Safari 6.0+ (after user input, using `playMutedSound()` or `mobileAutoEnable`)
* Opera 12.0+
* Microsoft Edge

# Documentation

### Contents
* [Quick Start](#quick-start)
* [Examples](#examples)
* [Supported API](#supported-api)
  * [Options](#options)
  * [Methods](#methods)
  * [Event Handling](#event-handling)
  * [Global Options](#global-options)
  * [Global Methods](#global-methods)
* [Mobile Playback](#mobile-playback)
* [License](#license)

### Quick Start

* Clone the repo: `git clone https://github.com/adityaravishankar/wAudio.js.git`

In the browser:

```html
<script src="/path/to/wAudio.js"></script>
<script>
    var sound = new wAudio("sound.mp3");

    var sound2 = new wAudio();
    sound2.src = "sound2.mp3";

</script>
```

### Examples

##### Most basic, play an MP3:
```javascript
var sound = new wAudio("sound.mp3");

sound.play();
```

##### More playback options:
```javascript
var sound = new wAudio();
sound.src = "sound.mp3";
sound.volume = 0.6;
sound.autoplay = true;
```

##### Listen for events:
```javascript
var sound = new wAudio("sound.ogg");
sound.addEventListener("canplaythrough", function() {
    console.log("Sound loaded. Playing ...");
    sound.play();
});

```

## Supported API

### Options
#### src `String`
Specifies the URL of the audio file to play.
#### currentSrc `String` `readonly`
Returns the absolute URL of the chosen media resource.
#### currentTime `Number`
Indicates the current playback time in seconds. Setting this value seeks the media to the new time.
#### volume `Number` `1.0`
The playback volume, in the range `0.0` (silent) to `1.0` (loudest).
#### autoplay `Boolean` `false`
Set to `true` to automatically start playback when sound is loaded.
#### muted `Boolean` `false`
Set to `true` to load the audio muted.
<!--#### loop `Boolean` `false`
Set to `true` to automatically loop the sound forever.-->
#### paused `Boolean` `false` `readonly`
Indicates whether the media element is paused.

### Methods
#### play()
Begins playback of the audio.
#### pause()
Pauses playback of the audio.
#### stop()
Stops playback of the audio, resetting `currentTime` to `0`.

## Event Handling
The event handling code emulates DOM events but does not use actual DOM event objects. Currently only three events are supported: `canplay`,  `canplaythrough` and `ended`.

* **canplay**, **canplaythrough**: Fired once audio data has been loaded and audio can start playing.
* **ended**: Fired once audio has played through to the end. Will not fire when `loop` is set to  `true`.

#### addEventListener(type, listener)
Registers the specified listener for event type
* **type**: `String` Name of event to listen for (`canplay`, `canplaythrough`, `ended`).
* **listener**: `Function` Function to call when event is fired.
#### removeEventListener(type, listener)
Removes the event listener previously regisetered with `addEventListener`.
* **type**: `String` Name of event that is being listened for (`canplay`, `canplaythrough`, `ended`).
* **listener**: `Function` Function called when event is fired.
#### dispatchEvent(type)
Dispatches an event, invoking the affected listenes in the appropriate order.
* **type**: `String` Name of event to fire (`canplay`, `canplaythrough`, `ended`).


### Global Options
#### mobileAutoEnable `Boolean` `false`
Automatically attempts to enable audio on mobile devices.

### Global Methods
#### playMutedSound()
Play a short burst of audio with no volume. Useful for activating audio playback on mobile devices.

### Mobile Playback
By default, audio on iOS is locked until a sound is played within a user interaction, and then it plays normally the rest of the page session ([Apple documentation](https://developer.apple.com/library/safari/documentation/audiovideo/conceptual/using_html5_audio_video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html)).

You can call the `playMutedSound()` method inside a touch event to unlock audio playback.

```javascript
// Activate sound inside a touch event
wAudio.playMutedSound();
```

Alternatively, you can set the `mobileAutoEnable` flag to `true` so wAudio tries to automatically unlock mobile audio by playing a muted sound on the first `touchend` event.

```javascript
// Automatically activate sound on the first touch/tap event
wAudio.mobileAutoEnable = true;
```

### License

Copyright (c) 2017 [Aditya Ravi Shankar](https://www.adityaravishankar.com)

Released under the [MIT License](https://github.com/adityaravishankar/wAudio.js/blob/master/LICENSE).