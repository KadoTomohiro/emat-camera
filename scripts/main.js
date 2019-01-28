(() => {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let i = 0;
    let localMediaStream = null;

    const hasGetUserMedia = () => {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };

    //エラー
    const onFailSoHard = (e) => {
        console.log('エラー!', e);
    };

    // キャプチャ表示領域生成
    const addImg = () => {
        const imgs = document.querySelector('#imgs');
        const newElement = document.createElement("img");
        imgs.appendChild(newElement);
    };

    const clearCaptures = () => {
        const imgs = document.querySelector('#imgs');
        imgs.querySelectorAll('img').forEach(img => imgs.removeChild(img))
    };

    //カメラ画像キャプチャ
    const snapshot = () => {
        if (localMediaStream) {
            ctx.drawImage(video, 0, 0);
            addImg();
            const imgarea = document.querySelectorAll('img');
            imgarea[i].src = canvas.toDataURL('image/webp');
            i += 1;
        }
    };

    if (hasGetUserMedia()) {
        console.log("カメラ OK");
    } else {
        alert("未対応ブラウザです。");
    }


    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getUserMedia({video: true}, (stream) => {
        video.srcObject = stream;
        localMediaStream = stream;
    }, onFailSoHard);

//ボタンイベント
    document.querySelector("#capture").addEventListener('click', () => {
        snapshot();
    });
    document.querySelector("#stop").addEventListener('click', () => {
        localMediaStream.getTracks().forEach(track => track.stop());
    });
    document.querySelector("video").addEventListener('click', () => {
        snapshot();
    });

    document.querySelector("#clear").addEventListener('click', () => {
        clearCaptures();
    })
})();