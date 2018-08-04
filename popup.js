var introToggle = document.getElementById('intro');
var outroToggle = document.getElementById('outro');
const intro_onChange = function() {
    chrome.storage.sync.set({'intro_state': introToggle.checked});
}
const outro_onChange = function() {
    chrome.storage.sync.set({'outro_state': outroToggle.checked});    
}
chrome.storage.sync.get(['intro_state', 'outro_state'], function(data){
    introToggle.checked = data.intro_state;
    outroToggle.checked = data.outro_state;
});
introToggle.addEventListener('change', intro_onChange);
outroToggle.addEventListener('change', outro_onChange);