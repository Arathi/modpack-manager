import Mod from '../domains/Mod';

interface Props {
  mod: Mod;
}

export function ModInfo({
  mod,
}: Props) {
  return <>
    <div className="mod-info">
      <div className="icon">
        <img
          src={mod.icon}
          width={32}
          height={32}
        />
      </div>
      <div className="info">
        <div>{mod.name}</div>
      </div>
      <div className="button">
        <a className="link-btn btn-primary">
          <svg className="smaller-icon">
            <use href="/images/sprite.svg#icon-download"></use>
          </svg>
        </a>
      </div>
    </div>
  </>;
}