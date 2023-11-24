import {useState} from 'react';
import {Row as ARow} from './Row';
import {SelectDropdown} from './SelectDropdown';
import Modpack from '../domains/Modpack';
import {ModLoader} from '../domains/ModLoader';

interface Props {
  onSave: (modpack: Modpack) => void;
  onCancel: () => void;
}

export function ModpackEditor({
  onSave = (modpack: Modpack) => console.info("保存"),
  onCancel = () => console.info("关闭")
}: Props) {
  // const [modpacks, setModpacks] = useRecoilState(modpacksState);
  // const setModpacks = useSetRecoilState(modpacksState);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");

  const gameVersions = {
    "1.20.1": "Minecraft 1.20.1",
    "1.16.5": "Minecraft 1.16.5",
    "1.12.2": "Minecraft 1.12.2",
    "1.7.10": "Minecraft 1.7.10",
  };
  const [gameVersion, setGameVersion] = useState("1.20.1");

  const modLoaders = {
    "forge": "Forge",
    "fabric": "Fabric",
    "quilt": "Quilt",
    "neo-forge": "NeoForge",
  };
  const [modLoader, setModLoader] = useState("forge");

  const addModpack = () => {
    const modpack = {
      id: id,
      name: name,
      version: version,
      gameVersion: gameVersion,
      loader: modLoader as ModLoader
    } as Modpack;
    onSave(modpack);
  }

  function reset() {}

  return <>
    <div className="modpack-editor">
      <ARow className="row-field">
        <label>ID：</label>
        <div className="row-field-value">
          <input
            className="search-input-field"
            type="text" 
            value={id}
            onInput={(e) => setId(e.currentTarget.value) }
          />
        </div>
      </ARow>
      <ARow className="row-field">
        <label>名称：</label>
        <div className="row-field-value">
          <input
            className="search-input-field"
            type="text" 
            value={name}
            onInput={(e) => setName(e.currentTarget.value) }
          />
        </div>
      </ARow>
      <ARow className="row-field">
        <label>版本：</label>
        <div className="row-field-value">
          <input
            className="search-input-field"
            type="text" 
            value={version} 
            onInput={(e) => setVersion(e.currentTarget.value) }
          />
        </div>
      </ARow>
      <ARow className="row-field">
        <div className="row-field-value">
          <SelectDropdown
            key="mc-version-selector"
            fieldName="MC版本："
            options={gameVersions}
            value={gameVersion}
            onChange={(newValue) => setGameVersion(newValue)}
          />
        </div>
      </ARow>
      <ARow className="row-field">
        <div className="row-field-value">
          <SelectDropdown
            key="mod-loader-selector"
            fieldName="加载器："
            options={modLoaders}
            value={modLoader}
            onChange={(newValue) => setModLoader(newValue)}
          />
        </div>
      </ARow>
      <ARow className="row-buttons">
        <a className="link-btn btn-primary" onClick={addModpack}>保存</a>
        <a className="link-btn btn-primary" onClick={onCancel}>关闭</a>
      </ARow>
    </div>
  </>;
}