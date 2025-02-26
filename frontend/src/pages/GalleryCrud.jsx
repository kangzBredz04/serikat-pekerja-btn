import { useState, useContext } from "react";
import { AllContext } from "../App";

function GalleryCrud() {
  const { gallery, setGallery } = useContext(AllContext);
  const [newImage, setNewImage] = useState({ imageUrl: "", description: "" });
  const [editingImage, setEditingImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({ ...prev, [name]: value }));
  };

  const addImage = () => {
    setGallery([...gallery, { id: Date.now(), ...newImage }]);
    setNewImage({ imageUrl: "", description: "" });
  };

  const updateImage = (id) => {
    setGallery(
      gallery.map((img) => (img.id === id ? { ...img, ...newImage } : img))
    );
    setEditingImage(null);
    setNewImage({ imageUrl: "", description: "" });
  };

  const deleteImage = (id) => {
    setGallery(gallery.filter((img) => img.id !== id));
  };

  return (
    <div>
      <h1>Gallery CRUD</h1>
      <div>
        <input
          type="text"
          name="imageUrl"
          value={newImage.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="description"
          value={newImage.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button
          onClick={editingImage ? () => updateImage(editingImage) : addImage}
        >
          {editingImage ? "Update Image" : "Add Image"}
        </button>
      </div>
      <ul>
        {gallery.map((img) => (
          <li key={img.id}>
            <img src={img.imageUrl} alt={img.description} width="100" />
            <p>{img.description}</p>
            <button onClick={() => setEditingImage(img.id)}>Edit</button>
            <button onClick={() => deleteImage(img.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GalleryCrud;
