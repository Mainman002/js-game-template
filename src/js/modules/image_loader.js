// Used to initialize project images
// export function init(image_dict) {
//     this.image = image_dict;
// }

// Used on objects to display images
export function load(src) {
  const image = new Image;
  image.src = src;
  return image;
}

