const skipIntro = function(e) {
    if (e != undefined ) {
        if (e.target.innerText != undefined) {
            if (e.target.innerText.toLowerCase() == "skip intro") {
                e.target.click();
            }
        }
    }
}
const skipOutro = function(e) {
    var a = document.getElementsByClassName("PlayIcon PlayIcon-size-medium");
    if (a.length) {
        a[0].click();
    }
}

const getTitle = function(e) {
    var title = document.getElementsByClassName("ellipsize-text");
    if (title.length) {
        console.log(title[0]);
        chrome.runtime.sendMessage(title[0].innerText);
        chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
            console.log(response, sender);
        });
    }
}
chrome.storage.sync.get(['intro_state', 'outro_state'], function(result) {
   if (result.intro_state) {
       document.addEventListener("transitionend", skipIntro);
   }
   if (result.outro_state) {
        document.addEventListener("transitionend", skipOutro);
   }
});

chrome.storage.onChanged.addListener(function(changes, namespace){
    if (changes.intro_state != undefined) {
        if (!changes.intro_state.new_value)
            document.removeEventListener("transitionend", skipIntro);
        else
            document.addEventListener("transitionend", skipIntro);
    }
    if (changes.outro_state != undefined) {
        if (!changes.outro_state.new_value)
            document.removeEventListener("transitionend", skipOutro);
        else
            document.addEventListener("transitionend", skipOutro);
    }
});