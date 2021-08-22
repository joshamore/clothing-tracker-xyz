import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const CoreContainer = styled.div`
  margin-bottom: 8px;
`;

const ChangeDate = ({ date, setDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <CoreContainer>
      {showDatePicker ? (
        <p>TODO</p>
      ) : (
        <Button onClick={() => setShowDatePicker(true)}>
          Not worn today? Set Date
        </Button>
      )}
    </CoreContainer>
  );
};

export default ChangeDate;
