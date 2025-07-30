import { Button, Flex, Modal } from "antd";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export const Settings = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button shape="circle" onClick={() => setOpen(true)}>
        <IoSettingsOutline size={20} />
      </Button>
      <Modal
        open={open}
        title={<h2>设置</h2>}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        // width={"60vw"}
      >
        <Flex></Flex>
      </Modal>
    </>
  );
};
