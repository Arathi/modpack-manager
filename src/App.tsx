import './App.less';
import { Row as ARow } from './components/Row';
import { SelectDropdown } from './components/SelectDropdown';
import { ModpackEditor } from './components/ModpackEditor';

import {modpacksSelector, modpackIdSelector } from './store/Modpacks';
import {useRecoilState} from 'recoil';
import React, {useEffect, useState} from 'react';
import Modpack from './domains/Modpack';
import Mod from './domains/Mod';
import {ModInfo} from './components/ModInfo';

function updateSearchResults() {

}

function App() {
  const [modpackId, setModpackId] = useRecoilState(modpackIdSelector);
  const [modpacks, setModpacks] = useRecoilState(modpacksSelector);

  let showModpackEditorInit = false;
  let modpackOptions: any = {};
  if (modpacks.length > 0) {
    for (const modpack of modpacks) {
      modpackOptions[modpack.id] = modpack.name;
    }
  }
  else {
    showModpackEditorInit = true;
  }
  let [showModpackEditor, setShowModpackEditor] = useState(showModpackEditorInit);

  function onSaveModpack(modpack: Modpack) {
    console.info(`保存模组整合包：`, modpack);
    setShowModpackEditor(false);
    setModpacks((current) => [
      ...current,
      modpack,
    ]);
  }

  function onCloseModpackEditor() {
    setShowModpackEditor(false);
  }

  function onNewModpack() {
    setShowModpackEditor(true);
  }

  function onEditModpack() {}

  function onDeleteModpack() {}

  useEffect(() => {
    const timer = setInterval(
      updateSearchResults,
      1000
    );
    return () => {
      clearInterval(timer);
    };
  }, []);

  const firstBlock = () => {
    if (showModpackEditor) {
      return <ModpackEditor
        onSave={onSaveModpack}
        onCancel={onCloseModpackEditor}
      />;
    }
    return <>
      <ARow className="row-field">
        <div className="row-field-value">
          <SelectDropdown
            fieldName="整合包："
            options={modpackOptions}
            value={modpackId}
            onChange={(id) => setModpackId(id)}
          />
        </div>
      </ARow>
      <ARow className="row-buttons">
        <a className="link-btn btn-primary" onClick={onNewModpack}>新建</a>
        <a className="link-btn btn-primary" onClick={onEditModpack}>编辑</a>
        <a className="link-btn btn-primary" onClick={onDeleteModpack}>删除</a>
      </ARow>
    </>
  }

  const modsBlock = () => {
    if (modpackId == undefined) {
      return undefined;
    }

    const mods: Mod[] = [{
      id: "1234",
      author: "mezz",
      name: "Just Enough Items (JEI)",
      icon: "https://media.forgecdn.net/avatars/29/69/635838945588716414.jpeg",
    }, {
      id: "1235",
      author: "DarkhaxDev",
      name: "Bookshelf",
      icon: "https://media.forgecdn.net/avatars/197/186/636890440894617244.png",
    }];

    const modNodes = mods.map((mod) => {
      return <ModInfo
        key={mod.id}
        mod={mod}
      />;
    });

    return <>
      { modNodes }
    </>;
  };

  return (
    <div className="modpack-manager">
      {firstBlock()}
      {modsBlock()}
    </div>
  );
}

export default App;
