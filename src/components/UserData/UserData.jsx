import { Formik, Form } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import authSelector from 'redux/auth/authSelector';
import { ModalUserEdit } from '../ModalUserFormData/UserEdit/UserEdit';
import {
  Label,
  AvatarWrapper,
  ProfileTitle,
  ImgAvatar,
  ProfileField,
  WrapperCard,
  WrapperField,
  ImgWrapper,
} from './UserData.styled';
import avatarDefault from '../../images/profilephotos/avatar-default.png';

const UserData = () => {
  const user = useSelector(authSelector.userSelector);
  const initialValues = {
    avatarURL: user?.avatarURL || { avatarDefault },
    name: user?.name || 'Enter your name',
    email: user?.email || 'example@mail.com',
    phone: user?.phone || '+380000000000',
    birthday: user?.birthday || '01.01.2000',
    city: user?.city || 'Kiev',
  };

  return (
    <>
      <WrapperCard>
        <ProfileTitle>My information:</ProfileTitle>
        <div>
          <ModalUserEdit />
          <Formik initialValues={initialValues} enableReinitialize>
            <Form>
              <AvatarWrapper>
                <ImgWrapper>
                  <ImgAvatar src={initialValues.avatarURL} alt="avatar" />
                </ImgWrapper>
              </AvatarWrapper>
              <WrapperField>
                <Label htmlFor="name"> Name:</Label>

                <ProfileField type="text" name="name" placeholder={initialValues.name} readOnly={true} />
              </WrapperField>
              <WrapperField>
                <Label htmlFor="email"> Email:</Label>
                <ProfileField type="email" name="email" placeholder={initialValues.email} readOnly={true} />
              </WrapperField>
              <WrapperField>
                <Label htmlFor="date"> Birthday:</Label>
                <ProfileField type="numder" name="birthday" placeholder={initialValues.birthday} readOnly={true} />
              </WrapperField>
              <WrapperField>
                <Label htmlFor="phone"> Phone:</Label>

                <ProfileField placeholder={initialValues.phone} type="phone" name="phone" readOnly={true} />
              </WrapperField>
              <WrapperField>
                <Label htmlFor="city"> City:</Label>
                <ProfileField type="text" name="city" placeholder={initialValues.city} readOnly={true} />
              </WrapperField>
            </Form>
          </Formik>
        </div>
      </WrapperCard>
    </>
  );
};

export default UserData;
