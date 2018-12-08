import React from 'react';
import styled from 'styled-components';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import withValidator from 'HOCS/WithValidator';
import v from 'HELPERS/Validate';
import { createInputHandler } from 'HELPERS';
import BaseForm from 'COMPONENTS/Form/BaseForm';
import BaseButton from 'COMPONENTS/Form/BaseButton';
import Image from 'COMPONENTS/LazyImage';

const thumbnail = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSgBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIABMAGQMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AMLwLGov753kQrKjOsbgHBG5sgYwRxXmwet/L/I9KqtOXzPVLaxgWO1ZZHiM0au/lIoXpnPSu6EbpXZwyTvoYni/WdOsfD+rWsl2r3E8QiRAQfmIzz6cf0rGpe1maUl7ykeA/Y7z+4n/AH9T/GsrI6faPsdd8PF1EavcjUguIbdvLzgOFIK8+3zD/Iq/dabiZyU1bnPS/EFw9p4W1A4eRrezljCDAHCtg8+2K64OKgotanLJvm5uh4tfap/Zs9ulzIJbw3cN3IpTYoVoUwuB6HI/DpUSipbDhK25yP8Abj0cgc56d4fdm8VzyFiXNnFk+vCda55K0DqbvLU2rljqvhLULy/JluBM8O/7vybDxgYFara5h1see6hZwT6VrF9MrPdx2UZWRnJI/eIPX0rSOzM5bow/s0P/ADzWldjsj//Z';
const imageUrl = '/images/restaurant/500/big.jpeg';

class TestPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        password: ''
      }
    };

    this.updateInput = createInputHandler({ stateKey: 'formData' }).bind(this);
  }

  render () {
    const {
      isFormValid,
      validator
    } = this.props;

    const {
      email,
      password
    } = this.state.formData;

    return (
      <div>
        <BaseForm onSubmit={e => e.preventDefault()}>
          <BaseInput
            name='email'
            value={email}
            onChange={this.updateInput}
            validator={validator}
            validate={v.email}
            placeholder='Your email here'
            style={{ marginRight: '20px' }}
            />
          <BaseInput
            name='password'
            value={password}
            onChange={this.updateInput}
            validator={validator}
            validate={v.password}
            placeholder='Your password here'
            />
          <BaseButton
            disabled={!isFormValid}
            style={{ marginLeft: '20px' }}
            >
            login
          </BaseButton>
        </BaseForm>
        <Image
          url={imageUrl}
          thumbnail={thumbnail}
          alt='This is an image'
          />
        {new Array(100).fill(1).map((_, index) => <p key={index}>BLABLA</p>)}
      </div>
    );
  }
};

export default withValidator(TestPage);