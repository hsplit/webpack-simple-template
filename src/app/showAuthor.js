(function() {
    let showAuthorHSplit = [65, 85, 84, 72];
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 96) {
            document.addEventListener('keydown', function(event) {
                const indexKeyCode = showAuthorHSplit.indexOf(event.keyCode);
                if (indexKeyCode === -1) {
                    return;
                } else {
                    const temp = showAuthorHSplit[0];
                    showAuthorHSplit[indexKeyCode] = temp;
                    showAuthorHSplit.shift();
                    if (showAuthorHSplit.length === 0) {
                        alert('Author - Helg Split. 05.2018\nhttps://vk.com/h.split\noleg.sak.by@gmail.com');
                        showAuthorHSplit = [65, 85, 84, 72];
                    }
                }
            });
            document.addEventListener('keyup', function(event) {
                if (event.keyCode === 65 || event.keyCode === 85 || event.keyCode === 84 || event.keyCode === 72) {
                    showAuthorHSplit.push(event.keyCode);
                }
            });
        }
    });
}());