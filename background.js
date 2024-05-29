// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'saveLink') {
        // Save the link data to storage
        const data = message.data;
        chrome.storage.sync.set({ 'linkData': data }, function() {
            // Send message back to the popup script indicating whether the link was successfully saved
            const success = true; // Assume link was saved successfully
            chrome.runtime.sendMessage({ action: 'linkSaved', success: success });
        });
    }
});