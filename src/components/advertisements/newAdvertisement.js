import { useState } from 'react';
import Button from '../commons/button/Button';
import Checkbox from '../commons/forms/checkbox/Checkbox';
import Input from '../commons/forms/input/Input';
import InputFile from '../commons/forms/inputFile/InputFile';

const NewAdvertisement = ({ ...props }) => {
  const initialState = {
    name: '',
    description: '',
    price: 0,
    tags: [],
    stock: 0,
    idUser: '',
    custom: false,
    image: '',
  };
  const [advertsData, setAdvertsData] = useState(initialState);

  const handleChange = (event) => {
    if (event.target.name === 'custom') {
      setAdvertsData({ ...advertsData, custom: event.target.checked });
      return;
    }
    if (event.target.name === 'image') {
      setAdvertsData({
        ...advertsData,
        [event.target.name]: event.target.files[0],
      });
      return;
    }
    setAdvertsData({ ...advertsData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', advertsData.name);
    formData.append('description', advertsData.description);
    formData.append('custom', advertsData.custom);
    formData.append('price', advertsData.price);
    formData.append('tags', advertsData.tags);
    formData.append('stock', advertsData.stock);
    formData.append('idUser', advertsData.idUser);
    if (advertsData.image) {
      formData.append('image', advertsData.image);
    }

    //TODO enviar formulario
    console.log(formData.get('image'));
  };

  return (
    <div {...props}>
      <form>
        <Input
          type='text'
          name='name'
          label='Advertisement Name'
          className={'prueba'}
          onChange={handleChange}
          value={advertsData.name}
        />
        <Input
          type='text'
          name='description'
          label='Description'
          className={'prueba'}
          onChange={handleChange}
          value={advertsData.description}
        />
        <Input
          type='number'
          name='price'
          label='Price'
          className={'prueba'}
          onChange={handleChange}
          value={advertsData.price}
        />
        <Input
          type='text'
          name='tags'
          label='Tags'
          className={'prueba'}
          onChange={handleChange}
          value={advertsData.tags}
        />
        <Input
          type='number'
          name='stock'
          label='Stock'
          className={'prueba'}
          onChange={handleChange}
          value={advertsData.stock}
        />
        <Input
          type='hidden'
          name='idUser'
          onChange={handleChange}
          value={advertsData.idUser}
        />
        <Checkbox
          className={'prueba'}
          label='Customized Article'
          name='custom'
          checked={advertsData.custom}
          onChange={handleChange}
        />
        <InputFile
          className={'btn-primary'}
          label='Image file'
          id='image'
          name='image'
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
};
export default NewAdvertisement;
