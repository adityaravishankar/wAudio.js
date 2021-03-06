var testLog;

function enableTests() {
    testLog = document.getElementById("test-log");
    document.getElementById("start-tests").disabled = false;
}

function log(text, color) {
    var html = (color ? "<div style=\"color:" + color + "\">" : "<div>");

    text = text || "&nbsp;";
    html += text + "</div>";
    testLog.innerHTML += html;
    testLog.scrollTop = testLog.scrollHeight;
}


var tests = [
    ["Create wAudio Object", function() {
        var sound = new wAudio();
    }],
    ["Play wAudio Object with src in constructor", function() {
        var sound = new wAudio("audio/sound.wav");

        sound.play();
    }],
    ["Play wAudio Object with src specified later", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.play();
    }],
    ["Play wAudio Object using autoplay property", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.autoplay = true;
    }],
    ["Load wAudio muted", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.muted = true;
        sound.play();
    }],
    ["Adjust wAudio volume", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.volume = 0.2;
        sound.play();
    }],

    ["playMutedSound() method", function() {
        wAudio.playMutedSound();
    }],
    ["Check currentSrc property", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        log("currentSrc returned " + sound.currentSrc, "blue");
    }],
    ["Listen to canplaythrough event with addEventListener", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.addEventListener("canplaythrough", function() {
            log("canplaythrough event fired", "blue");
        });
    }],
    ["Listen to ended event with addEventListener", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.play();
        sound.addEventListener("ended", function() {
            log("ended event fired", "blue");
        });
    }],
    ["Test loop attribute and stop method", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.loop = true;
        sound.play();

        setTimeout(function() {
             log("looping audio stopped", "blue");
            sound.stop()
        }, 3000);

        sound.addEventListener("ended", function() {
            log("ended event should not fire", "red");
        });
    }, 3000],
    ["Test loop attribute and pause method", function() {
        var sound = new wAudio();

        sound.src = "audio/sound.wav";
        sound.loop = true;
        sound.play();

        setTimeout(function() {
             log("looping audio paused", "blue");
            sound.pause()
        }, 3000);

        sound.addEventListener("ended", function() {
            log("ended event should not fire", "red");
        });
    }, 3000]
    


];


var index = 0;
var errors = 0;

function startTests() {
    document.getElementById("start-tests").disabled = true;
    log("Starting Test Suite...");
    index = 0;
    runNextTest();
}

function runNextTest() {
    if (index === tests.length) {
        log("");
        if (errors) {
            log(errors + (errors === 1 ? " TEST" : " TESTS") + " FAILED", "red");
        } else {
            log("ALL TESTS PASSED", "green");
        }

        return;
    }

    var test = tests[index];
    var delay = test.length > 2 ? test[2] : 1000;

    log();
    log("Starting Test " + (index + 1) + " : " + test[0]);
    setTimeout(function() {
        try {
            test[1]();
            setTimeout(function() {
                log("PASSED", "green");
                index++;
                runNextTest();
            }, delay);
        } catch(err) {
            log("ERROR: " + err);
            log("FAILED", "red");
            errors++;
            index++;
            runNextTest();
        }
    }, 1000);

}


window.addEventListener("load", enableTests);
