import React, { useState } from 'react';
import { Modal, Select, Input, Radio, Button } from 'antd';

const { Option } = Select;

const PopUpWindow = ({ visible, onCancel, onSubmit }) => {
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
    };

    onSubmit(data);
    onCancel();
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
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    </div>
    <div>
      <h3>Style:</h3>
      <Select style={{ width: '100%' }} onChange={handleSecondDropdownChange}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    </div>
    <div>
      <h3>Text Input:</h3>
      <Input.TextArea rows={4} onChange={handleTextInputChange} />
    </div>
  </Modal>;
};

export default PopUpWindow;
