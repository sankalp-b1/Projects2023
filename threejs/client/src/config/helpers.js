// export const downloadCanvasToImage = () => {
//   const canvas = document.querySelector("canvas");
//   const dataURL = canvas.toDataURL();
//   const link = document.createElement("a");

//   link.href = dataURL;
//   link.download = "canvas.png";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// export const reader = (file) =>
//   new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.onload = () => resolve(fileReader.result);
//     fileReader.readAsDataURL(file);
//   });

// export const getContrastingColor = (color) => {
//   // Remove the '#' character if it exists
//   const hex = color.replace("#", "");

//   // Convert the hex string to RGB values
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);

//   // Calculate the brightness of the color
//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;

//   // Return black or white depending on the brightness
//   return brightness > 128 ? "black" : "white";
// };




export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};


// changed with chat gpt ReferenceError....... if we dont write any logic in commented area it woks
// export const render = () => {
//   // Your rendering logic goes here
// };

export const render = (canvas, elements) => {
  const context = canvas.getContext("2d");

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Render each element
  elements.forEach((element) => {
    // Apply element properties to the context
    context.fillStyle = element.color;
    context.strokeStyle = element.borderColor;
    context.lineWidth = element.borderWidth;

    // Draw the element on the canvas
    context.beginPath();
    context.rect(element.x, element.y, element.width, element.height);
    context.closePath();
    context.fill();
    context.stroke();
  });
};

