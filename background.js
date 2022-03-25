chrome.runtime.onInstalled.addListener(onInstalledHandler);

async function onInstalledHandler(details) {
    chrome.action.onClicked.addListener(onClickedHandler);
    chrome.windows.onBoundsChanged.addListener(onBoundsChangedHandler);
    chrome.windows.onCreated.addListener(onCreatedHandler);
    chrome.windows.onFocusChanged.addListener(onFocusChangedHandler);
    chrome.windows.onRemoved.addListener(onRemovedHandler);
}

async function onClickedHandler(tab) {
    console.log('onClicked: ', tab);
    const windows = await chrome.windows.getAll();
    console.log('All windows: ', windows);
    const window = await chrome.windows.get(tab.windowId);
    console.log('window: ', window);
    if (window.state === 'maximized') {
        // relocateFibonacciSquare(window.top, window.left, window.height, window.width, windows);
        relocateFibonacciSquare(0, 0, window.height, window.width, windows);
    }
}

function relocateFibonacciSquare(top, left, height, width, windows) {
    const window = windows.pop();
    if (window) {
        if (windows.length === 0) {
            chrome.windows.update(window.id, {
                drawAttention: false,
                focused: false,
                top: top,
                left: left,
                height: height,
                width: width,
                state: 'normal'
            });
        } else {
            if (height < width) {
                chrome.windows.update(window.id, {
                    drawAttention: false,
                    focused: false,
                    top: top,
                    left: left,
                    height: height,
                    width: height,
                    state: 'normal'
                });
                left = left + height;
                width = width - height;
            } else {
                chrome.windows.update(window.id, {
                    drawAttention: false,
                    focused: false,
                    top: top,
                    left: left,
                    height: width,
                    width: width,
                    state: 'normal'
                });
                top = top + width;
                height = height - width;
            }
            relocateFibonacciSquare(top, left, height, width, windows);
        }
    }
}

async function onBoundsChangedHandler(window) {
}

async function onCreatedHandler(window) {
}

async function onFocusChangedHandler(windowId) {
}

async function onRemovedHandler(windowId) {
}