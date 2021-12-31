
//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}

//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
  const increaseContrastForm = document.getElementById("increaseContrastForm");
  const decreaseContrastForm = document.getElementById("decreaseContrastForm");
  const InverseForm = document.getElementById("InverseForm");
  //Write your code here for the other forms

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "none";
  } else if (transformType == "Decrease Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "none";
  } else if (transformType == "Increase Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "none";

  } else if  (transformType == "Decrease Contrast"){
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial";
    document.getElementById("InverseInputs").style.display = "none";

  }else {
    // inverse of the image with negative effect
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInputs").style.display = "initial";
  }

  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("result").style.display = "none";
    var ib = document.getElementById("ib").value;
    increaseBrightness(Number(ib))
  });
  //Write your code here for EventListeners for the other forms using the constants you will create in the transform function

  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    document.getElementById("result").style.display = "none";
    var db = document.getElementById("db").value
    decreaseBrightness(Number(db))
  });

  increaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    document.getElementById("result").style.display = "none";
    var O_BrightestD = document.getElementById("O_BrightestD").value
    var O_darkestB = document.getElementById("O_darkestB").value
    var T_DarkestB = document.getElementById("T_DarkestB").value
    var T_BrightestD = document.getElementById("T_BrightestD").value
    
    increaseContrast(Number(O_BrightestD) , Number(O_darkestB),Number(T_DarkestB) ,Number(T_BrightestD) )
  });

  decreaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    document.getElementById("result").style.display = "none";
    var O_BrightestD = document.getElementById("O_BrightestD1").value
    var O_darkestB = document.getElementById("O_darkestB2").value
    var T_DarkestB = document.getElementById("T_DarkestB3").value
    var T_BrightestD = document.getElementById("T_BrightestD4").value
    
    decreaseContrast(Number(O_BrightestD) , Number(O_darkestB),Number(T_DarkestB) ,Number(T_BrightestD) )
  });

  InverseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    document.getElementById("result").style.display = "none";
    inverseEffect();
  });

  //Applies pixel-wise transformations to increase brightness
  function increaseBrightness(ib) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < (img.width * img.height * 4); i += 4) {
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }

  //Write your code here for three more functions for the other transformations

  // Applies pixel-wise to decrease brightness
  function decreaseBrightness(ib) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] - ib;
      if (val < 0) {
        val = 0;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    console.log("done decreasing brightness");
    displayResultImage(img, transformedImage, ctx);

  }

  function increaseContrast(originalBrightestDark , originalDarkestBright , TransBrightestDark , TransDarkestBright) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var valData1;
    var valData2;
    var valData3;
    
    if (originalBrightestDark  == originalDarkestBright){
      document.getElementById("error").style.display = "block";
      return;
    }
    document.getElementById("error").style.display = "none";
    var slope = (TransDarkestBright - TransBrightestDark)/(originalDarkestBright  - originalBrightestDark);

    var c = TransBrightestDark - (slope * originalBrightestDark);
    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      valData1 = rgba[i] * slope + c ;
      valData2 = rgba[i+1] * slope + c ;
      valData3 = rgba[i+2] * slope + c ;
      
      if (valData1 > 255){
        valData1 = 255;
      }else if (valData1 < 0){
        valData1 = 0;
      }

      if (valData2 > 255){
        valData2 = 255;
      }else if (valData1 < 0){
        valData2 = 0;
      }

      if (valData3 > 255){
        valData3 = 255;
      }else if (valData1 < 0){
        valData3 = 0;
      }      
      
      transformedImage.push(valData1, valData2, valData3, rgba[i + 3]);
    }
    console.log("done increaing contrast");
    displayResultImage(img, transformedImage, ctx);

  }


  function decreaseContrast(originalBrightestDark , originalDarkestBright , TransBrightestDark , TransDarkestBright) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var valData1;
    var valData2;
    var valData3;
    
    if (originalBrightestDark  == originalDarkestBright){
      document.getElementById("error").style.display = "block";
      console.log("This is an error");
      return;
    }
    document.getElementById("error").style.display = "none";
    var slope = (TransDarkestBright - TransBrightestDark)/(originalDarkestBright  - originalBrightestDark);
    var c = TransBrightestDark - (slope * originalBrightestDark);

    // Transparent Bright Dark > Transparent Darkest Bright

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      valData1 = rgba[i] * slope + c ;
      valData2 = rgba[i+1] * slope + c ;
      valData3 = rgba[i+2] * slope + c ;
      
      if (valData1 > 255){
        valData1 = 255;
      }else if (valData1 < 0){
        valData1 = 0;
      }

      if (valData2 > 255){
        valData2 = 255;
      }else if (valData1 < 0){
        valData2 = 0;
      }

      if (valData3 > 255){
        valData3 = 255;
      }else if (valData1 < 0){
        valData3 = 0;
      }      
      
      transformedImage.push(valData1, valData2, valData3, rgba[i + 3]);
    }
    console.log("done decreasing contrast");
    displayResultImage(img, transformedImage, ctx);

  }
 
  function inverseEffect () {

    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var valdata1;
    var valData2;
    var valData3;
    document.getElementById("error").style.display = "none";
    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < (img.width * img.height * 4); i += 4) {
      valdata1 =  255 -rgba [i];
      valData2 = 255 - rgba[i+1];
      valData3 = 255 - rgba[i+2];
      
      transformedImage.push(valdata1, valData2, valData3, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);
  }


  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    console.log(rgba);
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }
}  