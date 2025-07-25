import { Button, Flex, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { useSnapshot } from "valtio";
import store from "@/store";

export const Settings = () => {
  const snap = useSnapshot(store);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Button shape="circle" onClick={() => setModalVisible(true)}>
        <MdOutlineSettings size={18} />
      </Button>
      <Modal
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
      >
        <Flex justify="center">
          <h2>设置</h2>
        </Flex>
        <Form>
          <Form.Item label="CurseForge API Key">
            <Input
              placeholder="CurseForge API Key"
              value={snap.curseForgeApiKey}
              onChange={(event) => {
                const value = event.currentTarget.value;
                console.info("设置CurseForge API Key: ", value);
                localStorage.setItem("CURSE_FORGE_API_KEY", value);
                store.curseForgeApiKey = value;
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}