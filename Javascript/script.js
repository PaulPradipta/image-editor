const fileInput = document.querySelector(".file-input");
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterSlider = document.querySelector(".slider input");
rotateOptions = document.querySelectorAll(".rotate button");
filterValue = document.querySelector(".filter-info .value");
previewImg = document.querySelector(".preview-img img");
chooseImgBtn = document.querySelector(".choose-img");
resetFilterBtn = document.querySelector(".controls .reset-filter");
saveImageBtn = document.querySelector(".save-img");

let brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0",
  hueRotate = "0",
  sepia = "0",
  blurImage = "0"
  contrast = "100";

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilter = () => {
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%) blur(${blurImage}px)`;
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
};

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    } else if (option.id === "hue-rotate") {
      filterSlider.max = "360"
      filterSlider.value = hueRotate
      filterValue.innerText = `${hueRotate}deg`
    } else if(option.id === "sepia") {
      filterSlider.max = "100"
      filterSlider.value = sepia
      filterValue.innerText = `${sepia}%`
    } else if(option.id === "blurImage") {
      filterSlider.max = "20"
      filterSlider.value = blurImage
      filterValue.innerText = `${blurImage}px`
    }
      else {
      filterSlider.max = "200";
      filterSlider.value = contrast;
      filterValue.innerText = `${contrast}%`
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === 'grayscale'){
    grayscale = filterSlider.value;
  } else if(selectedFilter.id === "hue-rotate") {
    hueRotate = filterSlider.value;
  } else if(selectedFilter.id === "sepia") {
    sepia = filterSlider.value;
  } else if(selectedFilter.id === "blurImage") {
    blurImage = filterSlider.value;
  }
  else {
    contrast = filterSlider.value;
  }
  applyFilter();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate = rotate - 90;
    } else if (option.id === "right") {
      rotate = rotate + 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilter();
  });
});

const resetFilters = () => {
    (brightness = "100"),
    (saturation = "100"),
    (inversion = "0"),
    (grayscale = "0"),
    (hueRotate = "0"),
    (sepia = "0"),
    (blurImage = "0"),
    (contrast = "0")

  (rotate = 0), (flipHorizontal = 1), (flipVertical = 1);

  filterOptions[0].click();
  applyFilter();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  context.translate(canvas.width / 2, canvas.height / 2);

  if (rotate !== 0) {
    context.rotate((rotate * Math.PI) / 180);
  }

  context.scale(flipHorizontal, flipVertical);

  context.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height,
  );

  const link = document.createElement("a");
  const url = canvas.toDataURL();
  link.href = url;
  link.download = "sample.png";
  link.click();
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
resetFilterBtn.addEventListener("click", resetFilters);
saveImageBtn.addEventListener("click", saveImage);


