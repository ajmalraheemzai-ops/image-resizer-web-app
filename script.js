const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector("#ratio"),
qualityInput = document.querySelector("#quality"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    previewImg.src = URL.createObjectURL(file);

    previewImg.onload = () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    };
};

widthInput.addEventListener("input", () => {
    if(ratioInput.checked){
        heightInput.value = Math.floor(widthInput.value / ogImageRatio);
    }
});

heightInput.addEventListener("input", () => {
    if(ratioInput.checked){
        widthInput.value = Math.floor(heightInput.value * ogImageRatio);
    }
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.5 : 1;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = "resized-image.jpg";
    a.click();
};

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());