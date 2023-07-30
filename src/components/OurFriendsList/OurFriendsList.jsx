import FriendsItem from 'components/FriendsItem/FriendsItem.jsx';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import friendsSelector from '../../redux/friends/friendsSelector';
import friendsOperations from '../../redux/friends/operations';

import { Wrapper } from './OurFriendsList.styled.js';

const OurFriendsList = () => {
  const friendsStore = useSelector(friendsSelector.selectFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(friendsOperations.fetchFriends());
  }, [dispatch]);

  return (
    <div>
      {friendsStore.items.length && (
        <Wrapper>
          {friendsStore.items.map(({ _id, title, url, addressUrl, imageUrl, address, workDays, phone, email }) => {
            return (
              <li key={_id}>
                <FriendsItem
                  responseByFriends={{
                    title,
                    url,
                    addressUrl,
                    imageUrl,
                    address,
                    workDays,
                    phone,
                    email,
                  }}
                />
              </li>
            );
          })}
        </Wrapper>
      )}
    </div>
  );
};

export default OurFriendsList;
