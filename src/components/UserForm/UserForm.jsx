import { Formik, Form } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import authSelector from 'redux/auth/authSelector';
import avatarDefault from 'images/profilephotos/avatar-default.png';
import { useSelector, useDispatch } from 'react-redux';
import { AvatarWrapper, ImgAvatar, WrapperField, Label, ProfileField, ImgWrapper } from '../UserData/UserData.styled';
import {
  SubmitBtn,
  Container,
  ErrorMassege,
  InputWrapper,
  EditText,
  EditButton,
  IconCrossSmall,
  IconCheck,
  BtnConfirm,
  BtnDecline,
  ApproveText,
  ApproveContainer,
} from './UserForm.styled';
import { updateUser } from 'redux/auth/operations';

import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import sprite from '../../images/icons.svg';

export const UserForm = ({ toggleModal }) => {
  const [editAvatar, setEditAvatar] = useState(false);
  console.log(editAvatar);
  const user = useSelector(authSelector.userSelector);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const dispatch = useDispatch();

  function peviewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setNewAvatar(reader.result);
      console.log(newAvatar);
    };
  }

  useEffect(() => {
    if (newAvatar) {
      setIsUpdateForm(true);
    }
  }, [newAvatar]);

  const handleChange = e => {
    const file = e.target.files[0];
    setAvatarUrl(file);

    peviewFile(file);
    setEditAvatar(true);
  };

  const initialValues = {
    avatarURL: user?.avatarURL || { avatarDefault },
    name: user?.name || 'Enter your name',
    email: user?.email || 'example@mail.com',
    phone: user?.phone || '+380000000000',
    birthday: user?.birthday || '01.01.2000',
    city: user?.city || 'Kiev',
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    try {
      if (avatarUrl) {
        formData.append('avatar', avatarUrl);
      }
      if (initialValues.name !== values.name && values.name) {
        formData.append('name', values.name);
      }
      if (initialValues.email !== values.email && values.email) {
        formData.append('email', values.email);
      }
      if (initialValues.birthday !== values.birthday && values.birthday) {
        formData.append('birthday', values.birthday);
      }
      if (initialValues.phone !== values.phone) {
        formData.append('phone', values.phone);
      }
      if (initialValues.city !== values.city) formData.append('city', values.city);
      for (const value of formData.values()) {
        console.log('value city', value);
      }
      const res = await dispatch(updateUser(formData));
      console.log(res);
      toggleModal();

      if (res.data.status === '200') {
        toast.success('Profile  updated');
      } else {
        toast.success('Profile successfully updated');
      }
      resetForm();
    } catch (e) {}
  };

  const shema = yup.object().shape({
    name: yup.string().max(16, 'Name must be less than 16 characters').trim().required('Please enter your name'),
    email: yup.string().email('Incorrect email').required('Email is required'),
    phone: yup
      .string()
      .matches(/^\+?3?8?(0\d{9})$/, 'Phone format: +380000000000')
      .max(13, 'Phone format: +380000000000')
      .min(13, 'Phone format: +380000000000'),
    city: yup.string().max(16, 'Name must be less than 16 characters').trim().required('Please enter your city'),
    birthday: yup.date().nullable(),
  });

  return (
    <div>
      <Formik initialValues={initialValues} dirty validationSchema={shema} onSubmit={handleFormSubmit}>
        {({ dirty, errors, touched, values }) => (
          <Form>
            <AvatarWrapper>
              {newAvatar ? (
                <ImgWrapper>
                  <ImgAvatar src={newAvatar} alt="avatar" />
                </ImgWrapper>
              ) : (
                <ImgWrapper>
                  <ImgAvatar src={initialValues.avatarURL} alt="avatar" />
                </ImgWrapper>
              )}
              {editAvatar ? (
                <ApproveContainer>
                  <BtnConfirm
                    onClick={() => {
                      setEditAvatar(false);
                    }}
                  >
                    <IconCheck width={24} height={24}>
                      <use href={`${sprite}#icon-check`}></use>
                    </IconCheck>
                  </BtnConfirm>
                  <ApproveText>Confirm</ApproveText>
                  <BtnDecline
                    onClick={() => {
                      setAvatarUrl(user?.avatarURL || { avatarDefault });
                      setNewAvatar('');
                      setEditAvatar(false);
                    }}
                  >
                    <IconCrossSmall width={24} height={24}>
                      <use href={`${sprite}#icon-cross-small`}></use>
                    </IconCrossSmall>
                  </BtnDecline>
                </ApproveContainer>
              ) : (
                <EditButton>
                  <InputWrapper
                    type="file"
                    id="fileInput"
                    onChange={e => handleChange(e)}
                    accept="image/png, image/jpeg, image/jpg, image/jfif"
                  />
                  <EditText>Edit photo</EditText>
                </EditButton>
              )}
            </AvatarWrapper>
            <Container>
              <WrapperField>
                <Label htmlFor="name"> Name:</Label>

                <ProfileField type="text" name="name" placeholder={initialValues.name} />
              </WrapperField>
              {errors.name && touched.name ? (
                <ErrorMassege>{errors.name}</ErrorMassege>
              ) : !errors.name && touched.name && values.name !== user?.name ? (
                <ErrorMassege>Great</ErrorMassege>
              ) : (
                ''
              )}
            </Container>

            <WrapperField>
              <Label htmlFor="email"> Email:</Label>
              <ProfileField type="email" name="email" placeholder={initialValues.email} />
            </WrapperField>

            <WrapperField>
              <Label htmlFor="date"> Birthday:</Label>
              <ProfileField type="date" name="birthday" />
            </WrapperField>

            <WrapperField>
              <Label htmlFor="phone"> Phone:</Label>
              <ProfileField placeholder={initialValues.phone} type="phone" name="phone" format="dd/mm/yyyy" />
            </WrapperField>

            <WrapperField>
              <Label htmlFor="city"> City:</Label>
              <ProfileField type="text" name="city" placeholder={initialValues.city} />
            </WrapperField>
            {isUpdateForm ? (
              <SubmitBtn type="submit" disabled={dirty || editAvatar}>
                Save
              </SubmitBtn>
            ) : (
              <SubmitBtn type="submit" disabled={!dirty}>
                Save
              </SubmitBtn>
            )}
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
};
