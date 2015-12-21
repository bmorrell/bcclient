videojs.plugin('passthroughEvents', function() {
  var player = this;

  // register API ready
  sendToParent(new Date(), "onAPIReady");

  function passthroughEvents_onDurationChange(evt) {
    sendToParent(new Date(), "onDurationChange");
  }

  function passthroughEvents_onEnded(evt) {
    sendToParent(new Date(), "onEnded");
  }

  function passthroughEvents_onError(evt) {
    sendToParent(new Date(), "onError");
  }

  function passthroughEvents_onFirstPlay(evt) {
    sendToParent(new Date(), "onFirstPlay");
  }

  function passthroughEvents_onFullscreenChange(evt) {
    sendToParent(new Date(), "onFullscreenChange");
  }

  function passthroughEvents_onLoadedAllData(evt) {
    sendToParent(new Date(), "onLoadedAllData");
  }

  function passthroughEvents_onLoadedData(evt) {
    sendToParent(new Date(), "onLoadedData");
  }

  function passthroughEvents_onLoadedMetadata(evt) {
    sendToParent(new Date(), "onLoadedMetadata");
  }

  function passthroughEvents_onLoadStart(evt) {
    sendToParent(new Date(), "onLoadStart");
  }

  function passthroughEvents_onPause(evt) {
    sendToParent(new Date(), "onPause");
  }

  function passthroughEvents_onPlay(evt) {
    sendToParent(new Date(), "onPlay");
  }

  function passthroughEvents_onPlaying(evt) {
    sendToParent(new Date(), "onPlaying");
  }

  function passthroughEvents_onProgress(evt) {
    sendToParent(new Date(), "onProgress");
  }

  function passthroughEvents_onTimeUpdate(evt) {
    sendToParent(new Date(), "onTimeUpdate");
  }

  function passthroughEvents_onVolumeChange(evt) {
    sendToParent(new Date(), "onVolumeChange");
  }

  function passthroughEvents_onResize(evt) {
    sendToParent(new Date(), "onResize");
  }

  // register the ones we want
  player.on("play", passthroughEvents_onPlay);
  player.on("playing", passthroughEvents_onPlaying);

  // the rest we don't care about
  /*
  player.on("loadedalldata", passthroughEvents_onLoadedAllData);
  player.on("loadeddata", passthroughEvents_onLoadedData);
  player.on("loadedmetadata", passthroughEvents_onLoadedMetadata);
  player.on("durationchange", passthroughEvents_onDurationChange);
  player.on("ended", passthroughEvents_onEnded);
  player.on("error", passthroughEvents_onError);
  player.on("firstplay", passthroughEvents_onFirstPlay);
  player.on("fullscreenchange", passthroughEvents_onFullscreenChange);
  player.on("loadstart", passthroughEvents_onLoadStart);
  player.on("pause", passthroughEvents_onPause);
  player.on("progress", passthroughEvents_onProgress);
  player.on("timeupdate", passthroughEvents_onTimeUpdate);
  player.on("volumechange", passthroughEvents_onVolumechange);
  player.on("resize", passthroughEvents_onResize);
  */

  // play the video
  sendToParent(new Date(), "onPlayerReady");
  player.play();

  // pass along the date to the parent
  function sendToParent(date, eventName) {
    // compile our date and name
    var dataToSend = {
      time: {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds()
      },
      name: eventName
    };
    var msg = "passthroughEvents::"+(JSON.stringify(dataToSend));
    window.parent.postMessage(msg, "http://solutions.brightcove.com");
  }

  // set up the listener
  window.addEventListener('message', function(event) {
  	if (event.origin.indexOf("http://solutions.brightcove.com") < 0) {
  		console.log("Invalid origin received");
  		return;
  	}
  	// make sure it's from us
  	if (event.data.substring(0,19) != "passthroughEvents::") {
  		console.log("Invalid data received");
        return;
    }
    // now get the actual command (only Play and Pause supported)
    if (event.data.substring(19) == "play") {
    	console.log("play instruction received");
    	player.play();
    }
    else if (event.data.substring(19) == "pause") {
    	console.log("pause instruction received");
    	player.pause();
  	}
  })
});
