import { useState } from "react";
import { default as ImageUploadingLIB, ImageListType } from "react-images-uploading";

interface ImageUploadingProps {
  onChange: (file?: File) => void;
}

export function ImageUploading({ onChange }: ImageUploadingProps) {
  const [images, setImages] = useState<ImageListType>([]);

  const handleChange = (imageList: ImageListType) => {
    setImages(imageList);
    onChange(imageList[0].file ?? undefined);

  };

  return (
    <div className="App">
      <ImageUploadingLIB
        multiple={false}
        value={images}
        onChange={handleChange}
        acceptType={['jpg', 'gif', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploadingLIB>
    </div>
  );
}
