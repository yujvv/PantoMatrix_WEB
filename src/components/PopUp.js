import React, { useState } from 'react';
import { Modal, Select, Input, Radio, Button } from 'antd';

const { Option } = Select;

const PopUpWindow = ({ visible, onCancel, onSubmit, prompt }) => {
  const [binarySelection, setBinarySelection] = useState(true);
  const [firstDropdownValue, setFirstDropdownValue] = useState(null);
  const [secondDropdownValue, setSecondDropdownValue] = useState(null);
  const [textInputValue, setTextInputValue] = useState(null);



  const handleBinarySelectionChange = (e) => {
    setBinarySelection(e.target.value);
  };

  const handleFirstDropdownChange = (value) => {
    setFirstDropdownValue(value);
  };

  const handleSecondDropdownChange = (value) => {
    setSecondDropdownValue(value);
  };

  const handleTextInputChange = (e) => {
    setTextInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      binarySelection,
      firstDropdownValue,
      secondDropdownValue,
      textInputValue,
      prompt,
    };

    fetch('http://localhost:5000/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          onSubmit(data.text);
          onCancel();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  return <Modal
    open={visible}
    onCancel={onCancel}
    footer={[
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleSubmit}>
        Submit
      </Button>,
    ]}
  >
    <div>
      <h3>Word</h3>
      <Radio.Group onChange={handleBinarySelectionChange} value={binarySelection}>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
    </div>
    <div>
      <h3>Emotion:</h3>
      <Select style={{ width: '100%' }} onChange={handleFirstDropdownChange}>
        <Option value="0">Neutral</Option>
        <Option value="1">Happiness</Option>
        <Option value="2">Anger</Option>
        <Option value="3">Sadness</Option>
        <Option value="4">Contempt</Option>
        <Option value="5">Surprise</Option>
        <Option value="6">Fear</Option>
        <Option value="7">Disgust</Option>
      </Select>
    </div>
    <div>
      <h3>Style:</h3>
      <Select style={{ width: '100%' }} onChange={handleSecondDropdownChange}>
        <Option value="0">Chinese ♂</Option>
        <Option value="1">Chinese ♀</Option>
        <Option value="2">American ♂</Option>
        <Option value="3">American ♀</Option>
        <Option value="4">Japanese ♂</Option>
        <Option value="5">Japanese ♀</Option>
      </Select>
    </div>
    <div>
      <h3>Input:</h3>
      <Input.TextArea rows={4} onChange={handleTextInputChange} />
    </div>
  </Modal>;
};

export default PopUpWindow;
